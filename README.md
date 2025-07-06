# BookNotes

### [Live Demo](https://book-notes-gold.vercel.app/)

BookNotes is an open-source web application for managing and organizing your book notes. It features Google authentication, book management, and a user-friendly interface for creating, searching, and editing notes. Built with Node.js, Express, EJS, and PostgreSQL, BookNotes is designed for personal and collaborative use.

## Features
- Google OAuth authentication
- Add, edit, and delete book notes
- Responsive UI with EJS templates
- PostgreSQL database integration

## Tech Used
- Node.js
- Express.js
- PostgreSQL

### Other Packages
- EJS
- Passport.js (Google OAuth)
- express-session
- pg (node-postgres)
- connect-pg-simple
- Axios
- Other dependencies as listed in `package.json`

## Project Structure
```
API_USED.txt
index.js
package.json
queries.sql
SAMPLE.env
vercel.json
config/
constants/
controllers/
middlewares/
models/
public/
routes/
utils/
views/
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/CyberRonin901/Book-Notes.git
   cd Book-Notes
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your PostgreSQL database in `config/postgres.config.js`. Make sure to create the required databases and tables as specified in `queries.sql`.
4. Set up environment variables as needed (e.g., Google OAuth credentials) refer to `SAMPLE.env`.
5. Start the application:
   ```bash
   npm start
   ```