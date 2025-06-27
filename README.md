# Book Notes
A web application designed to store all the books that you have read.

#### `Note:` currently the website lacks user registration so anyone can add/edit/delete

## 🔗 [Live Demo](https://book-notes-flame.vercel.app/)

### Installation and usage:
This section describes how you can host this website locally

#### ***`1. Prerequisites`***
* `PostgreSQL`
* `NodeJs`

#### ***`2. Installation`***`
* Clone this repo
```bash
   git clone https://github.com/Adi-Nanda/Book-Notes.git
```
``` bash
   cd Book-Notes
```

* Install packages
```bash
   npm i -y
```

#### ***`3. Configuration`***`
* Open PgAdmin and make a new database named `Book_Notes`
* Create a table using the create table query inside `queries.sql`
* Open `app/index.js` and add your Postgres password inside `cont db = new pg.Pool{....`

#### ***`4. Start the server`***
```bash
 node api/index.js
```
* Open `https://localhost:3000` in your browser

### Future Plans
* Add user registration & login system