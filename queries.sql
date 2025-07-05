CREATE TABLE book_info(
	id SERIAL PRIMARY KEY,
	book_key VARCHAR(50) NOT NULL,
	title TEXT NOT NULL,
	author_name TEXT[],
	first_publish_year INTEGER,
	cover_i INTEGER,
	rating REAL,
	review TEXT,
	date_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id VARCHAR(100) NOT NULL
);

CREATE TABLE user_sessions(
	sid VARCHAR(200) PRIMARY KEY,
	sess JSON NOT NULL,
	expire TIMESTAMP WITH TIME ZONE NOT NULL
)