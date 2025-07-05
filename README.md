# BookNotes

BookNotes is an open-source web application for managing and organizing your book notes. It features Google authentication, book management, and a user-friendly interface for creating, searching, and editing notes. Built with Node.js, Express, EJS, and PostgreSQL, BookNotes is designed for personal and collaborative use.

## Features
- Google OAuth authentication
- Add, edit, and delete book notes
- Responsive UI with EJS templates
- PostgreSQL database integration

## Project Structure
```
API_USED.txt
index.js
package.json
queries.sql
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
   git clone https://github.com/yourusername/BookNotes.git
   cd BookNotes
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your PostgreSQL database in `config/postgres.config.js`. Make sure to create the required databases and tables as specified in `queries.sql`.
4. Set up environment variables as needed (e.g., Google OAuth credentials).
5. Start the application:
   ```bash
   npm start
   ```