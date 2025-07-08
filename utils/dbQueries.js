import PgPool from "#config/postgres.config";

async function fetchAllBooks(user_id) {
   return await PgPool.query("SELECT * FROM book_info WHERE user_id=$1", 
         [user_id]
      ).then(result => result.rows);
}

async function getBookByKey(book_key, user_id) {
   return await PgPool.query("SELECT * FROM book_info WHERE book_key=$1 AND user_id=$2", 
         [book_key, user_id]
      ).then(result => result.rows);
}

async function getBookById(book_id, user_id) {
   return await PgPool.query("SELECT * FROM book_info WHERE id=$1 AND user_id=$2", 
         [book_id, user_id]
      ).then(result => result.rows);
}

async function insertBook(book, rating, review, user_id) {
   return await PgPool.query("INSERT INTO book_info(book_key, title, author_name, first_publish_year, cover_i, rating, review, date_modified, user_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
         [book.key, book.title, book.author_name, book.first_publish_year, book.cover_i, rating, review, new Date(), user_id]
      );
}
async function updateBook(rating, review, book_id, user_id) {
   return await PgPool.query("UPDATE book_info SET rating=$1, review=$2 WHERE id=$3 AND user_id=$4", 
         [rating, review, book_id, user_id]
      );
}

async function deleteBook(book_id, user_id) {
   return await PgPool.query("DELETE FROM book_info WHERE id=$1 AND user_id=$2", 
         [book_id, user_id]
      );
}

export { fetchAllBooks, getBookByKey, getBookById, insertBook, updateBook, deleteBook };