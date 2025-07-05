import { Router } from "express";
import booksController from "#controllers/books.controller";

const booksRoute = Router();

booksRoute.get("/", booksController.home);

booksRoute.get("/search", booksController.search);

booksRoute.get("/new", booksController.newBook);

booksRoute.get("/book/:id", booksController.getBook);

booksRoute.post("/book", booksController.insertBookData);

booksRoute.post("/edit/:id", booksController.editBookData);

booksRoute.post("/delete/:id", booksController.deleteBookData);

export default booksRoute;