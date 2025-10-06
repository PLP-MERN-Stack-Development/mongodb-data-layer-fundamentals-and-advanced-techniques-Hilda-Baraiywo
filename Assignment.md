# MongoDB Bookstore Assignment

## 📋 Overview

This project demonstrates MongoDB CRUD operations, advanced queries, aggregation pipelines, and indexing. All tasks (2-5) are implemented in a single executable script, insert_books.js.

---

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- MongoDB Shell (mongosh) or MongoDB Compass

---

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/) 

## 📥 Installation

```bash
# Install dependencies
npm install mongodb
```

---

## Configuration

Open `insert_books.js` and update the MongoDB connection string (line 6):

**For Local MongoDB:**
```javascript
const uri = 'mongodb://localhost:27017';
```

**For MongoDB Atlas:**
```javascript
const uri = 'mongodb+srv://username:password@cluster.mongodb.net/';
```
---

## How to Run

```bash
node insert_books.js
```

This single command will:
- Create the `plp_bookstore` database
- Insert 15 books into the `books` collection
- Execute all CRUD operations (Task 2)
- Run advanced queries with projection, sorting, and pagination (Task 3)
- Perform aggregation pipelines (Task 4)
- Create indexes and demonstrate performance improvements (Task 5)

---

## What Gets Executed

### Task 2: CRUD Operations
- Find books by genre, author, and year
- Update book price
- Delete a book

### Task 3: Advanced Queries
- Complex filtering (in stock + published after 2010)
- Projection (specific fields only)
- Sorting (ascending/descending)
- Pagination (5 books per page)

### Task 4: Aggregation Pipelines
- Average price by genre
- Author with most books
- Books grouped by decade

### Task 5: Indexing
- Create single index (title)
- Create compound index (author + published_year)
- Performance analysis with explain()

---

## Verification

After running the script, verify in MongoDB Shell:

```bash
mongosh
use plp_bookstore
db.books.countDocuments()
db.books.getIndexes()
```

**Connection error:**
- Verify MongoDB is running
- Check connection string is correct

**Module not found:**
```bash
npm install mongodb
```
---
## Files included

- `insert_books.js` - Main script with all tasks
- `README.md` - This file
- `package.json` - Dependencies
- `images/` - Output screenshots
