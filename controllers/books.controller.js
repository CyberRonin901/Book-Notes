import axios from "axios";
import { fetchAllBooks, getBookByKey, getBookById, insertBook, updateBook, deleteBook } from "#models/Books.model";
import { BOOK_API } from "#constants/API";

const home = async(req, res)=>{
   await fetchAllBooks(req.user.id)
         .then(booksData => res.render("index.ejs", {books: booksData, user: req.user}))
         .catch(e => {
            console.log(e);
            res.redirect("/error");
         });
}

const search = async(req, res)=>{
   const {searchText: raw_text, searchFilter: filter} = req.query;
   var text = raw_text.toLowerCase().trim();
   text = (text.split(" ")).join("+");

   const result = await axios.get(BOOK_API + `${filter}=${text}`)
                     .then(response => response.data.docs)
                     .catch(e =>{
                        console.log(e);
                        res.redirect("/error");
                     });

   if(result.length === 0){
      res.render("search", {
         text: raw_text,
         filter: filter === "q" ? "all" : filter,
         user: req.user
      });
      return;
   }

   var books = [];
   result.forEach(book =>{
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
      books,
      user: req.user
   });
}

const newBook = async (req,res)=>{
   var book = decodeURIComponent(req.query.data);
   book = JSON.parse(book);

   if(!book){
      res.redirect("/");
      return;
   }

   const result = await getBookByKey(book.key, req.user.id)
                     .catch(e =>{
                        console.log(e);
                        res.redirect("/error");
                     });

   if(result.length === 1){
      const id = result[0]['id'];
      res.redirect(`/books/book/${id}`);
      return;
   }
   res.render("new.ejs", {book, user: req.user});
}

const getBook = async(req, res)=>{
   const id = req.params.id;

   const result = await getBookById(id, req.user.id)
                     .catch(e =>{
                        console.log(e);
                        res.redirect("/error");
                     });

   const book = result[0];
   res.render("view_edit.ejs", {book, user: req.user});
}

const insertBookData = async (req, res)=>{
   const data = req.body;
   const book = JSON.parse(decodeURIComponent(data.book_info));
   const {rating, review} = data;

   await insertBook(book, rating, review, req.user.id)
         .catch(e => console.log(e));
   res.redirect("/books");
}

const editBookData = async(req, res)=>{
   const id = req.params.id;
   var {rating, review} = req.body;
   rating = parseFloat(rating);

   await updateBook(rating, review, id, req.user.id)
         .catch(e => console.log(e));
   res.redirect("/");
}

const deleteBookData = async (req,res)=>{
   const id = req.params.id
   await deleteBook(id, req.user.id)
         .catch(e => console.log(e));;
   res.redirect("/");
}

const booksController = {
   home,
   search,
   newBook,
   getBook,
   insertBookData,
   editBookData,
   deleteBookData,
}

export default booksController;