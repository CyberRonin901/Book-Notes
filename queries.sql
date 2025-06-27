CREATE TABLE book_info(
	id SERIAL PRIMARY KEY,
	book_key TEXT UNIQUE NOT NULL,
	title TEXT NOT NULL,
	author_name TEXT[],
	first_publish_year INT,
	cover_i INT,
	rating REAL CHECK (rating >= 0 AND rating <= 10),
	review TEXT,
	date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM book_info

SELECT * FROM book_info WHERE book_key=$1

SELECT * FROM book_info WHERE id=$1

INSERT INTO book_info(book_key, title, author_name, first_publish_year, cover_i, rating, review, date_modified) VALUES($1, $2, $3, $4, $5, $6, $7, $8)

UPDATE book_info SET rating=$1, review=$2 WHERE id=$3

DELETE FROM book_info WHERE id=$1