import express from "express";
import pg from "pg";
import path from "path";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

// FIXME: change when adding authorization
// also change the table name "book_info" from every query
dotenv.config();
const db = new pg.Pool({
   connectionString: process.env.CONNECTION_STRING,
   ssl: {
    rejectUnauthorized: false,
   }
})

// Comment out the code above and use the code below for local hosting

// const db = new pg.Pool({
//    database: "Book_Notes",
//    user: "postgres",
//    host: "localhost",
//    password: "",
//    port: 5432
// })

const __dirname = path.resolve();
const app = express();
const port = 3000;

const BOOK_API = "https://openlibrary.org/search.json?limit=40&"; // + "q=the+lord+of";
const COVER_API = "https://covers.openlibrary.org/b/id/"; // + "{id}" + "-S.jpg" // S for small size (M, L)

app.set("view engine", "ejs");

app.use(express.static( path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",async (req, res)=>{
   try{
      const result = await db.query("SELECT * FROM book_info");
      res.render("index.ejs", {books: result.rows});
   } catch(err){
      res.status(500);
      res.sendFile(path.join(__dirname, "./error/error.html"));
      console.log("cannot connect to DB");
      console.log(err);
      return;
   }
});

app.get("/search",async (req,res)=>{
   const {searchText: raw_text, searchFilter: filter} = req.query;
   var text = raw_text.toLowerCase().trim();
   text = (text.split(" ")).join("+");

   try{
      const result = await axios.get(BOOK_API + `${filter}=${text}`);
      const raw_books_data = result.data.docs;
      
      if(raw_books_data.length === 0){
         res.render("search", {
            text: raw_text,
            filter: filter === "q" ? "all" : filter
         });
         return;
      }

      var books = [];
      raw_books_data.forEach(book =>{
         books.push({
            author_name: book.author_name,
            cover_i: book.cover_i,
            first_publish_year: book.first_publish_year,
            title: book.title,
            key: book.key
         });
      });

      res.render("search.ejs", {
         text: raw_text,
         filter: filter === "q" ? "all" : filter,
         books
      });
   } catch(err){
      console.log(err);3 
      res.sendStatus(500);
   }
});

app.get("/new",async (req,res)=>{ // FIXME: update the logic;
   let book = decodeURIComponent(req.query.data);
   book = JSON.parse(book);

   if(!book){
      res.status(500);
      res.sendFile(path.join(__dirname, "./error/error.html"));
      console.log(err);
      return;
   }
   try{
      const result = await db.query("SELECT * FROM book_info WHERE book_key=$1", [book.key]);
      if(result.rows.length === 1){
         const id = result.rows[0]['id'];
         res.redirect(`/book/${id}`);
         return;
      }
   } catch(err){
      console.log(err);
   }
   res.render("new.ejs", {book});
});

app.get("/book/:id", async(req, res)=>{
   const id = req.params.id;
   try{
      const result = await db.query("SELECT * FROM book_info WHERE id=$1", [id]);
      const book = result.rows[0];
      res.render("view_edit.ejs", {book});
      return;
   } catch(err){
      res.status(500);
      res.redirect("/");
      return;
   }
});

app.post("/book", async (req, res)=>{
   const data = req.body;
   const book = JSON.parse(decodeURIComponent(data.book_info));
   const {rating, review} = data;
   console.log(book, rating, review);

   try{
      const result = await db.query("INSERT INTO book_info(book_key, title, author_name, first_publish_year, cover_i, rating, review, date_modified) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
         [book.key, book.title, book.author_name, book.first_publish_year, book.cover_i, rating, review, new Date()]
      )
   } catch(err){
      res.status(500);
      res.sendFile(path.join(__dirname, "./error/error.html"));
      console.log(err);
      return;
   }
   res.redirect("/");
});

app.post("/edit/:id", async(req, res)=>{
   const id = req.params.id;
   var {rating, review} = req.body;
   rating = parseFloat(rating);

   try{
      await db.query("UPDATE book_info SET rating=$1, review=$2 WHERE id=$3", [rating, review, id]);
      res.redirect("/");
      return;
   } catch(err){
      console.log(err);
      res.sendStatus(500);
   }
});

app.post("/delete/:id",async (req,res)=>{
   const id = req.params.id
   try{
      await db.query("DELETE FROM book_info WHERE id=$1", [id]);
      res.redirect("/");
      return;
   } catch(err){
      res.status(500);
      res.sendFile(path.join(__dirname, "./error/error.html"));
      console.log(err);
      return;
   }
});

app.listen(port, ()=>{
   console.log(`Server running on http://localhost:${port}`);
})