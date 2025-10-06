// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client
const { MongoClient } = require("mongodb");

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = "mongodb://localhost:27017";

// Database and collection names
const dbName = "plp_bookstore";
const collectionName = "books";

// Sample book data
const books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: "J. B. Lippincott & Co.",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: "Secker & Warburg",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: "Charles Scribner's Sons",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    published_year: 1932,
    price: 11.5,
    in_stock: false,
    pages: 311,
    publisher: "Chatto & Windus",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: "George Allen & Unwin",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: "Little, Brown and Company",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: "T. Egerton, Whitehall",
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: "Allen & Unwin",
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    genre: "Political Satire",
    published_year: 1945,
    price: 8.5,
    in_stock: false,
    pages: 112,
    publisher: "Secker & Warburg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: "HarperOne",
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    genre: "Adventure",
    published_year: 1851,
    price: 12.5,
    in_stock: false,
    pages: 635,
    publisher: "Harper & Brothers",
  },
  {
    title: "Wuthering Heights",
    author: "Emily Brontë",
    genre: "Gothic Fiction",
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: "Thomas Cautley Newby",
  },
];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB server");

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(
        `Collection already contains ${count} documents. Dropping collection...`
      );
      await collection.drop();
      console.log("Collection dropped successfully");
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(
      `${result.insertedCount} books were successfully inserted into the database`
    );

    // Display the inserted books
    console.log("\nInserted books:");
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(
        `${index + 1}. "${book.title}" by ${book.author} (${
          book.published_year
        })`
      );
    });

    //===================
    // TASK 2
    //===================

    // Find all books in a specific genre - Adventure
    console.log("\nBooks in the Adventure genre:");
    const adventureBooks = await collection
      .find({
        genre: "Adventure",
      })
      .toArray();
    adventureBooks.forEach((book) => {
      console.log(`${book.title} by ${book.author}`);
    });

    // Find books published after the year 2010
    console.log("\nBooks published after 1950:");
    const recentBooks = await collection
      .find({
        published_year: { $gt: 1950 },
      })
      .toArray();
    recentBooks.forEach((book) => {
      console.log(`${book.title} (${book.published_year})`);
    });

    // Find books by a specific author - Jane Austen
    console.log("\nBook(s) by Jane Austen:");
    const austenBooks = await collection
      .find({
        author: "Jane Austen",
      })
      .toArray();
    austenBooks.forEach((book) => {
      console.log(`${book.title} by ${book.author}`);
    });

    // Update the price of a specific book
    const updatePrice = await collection.updateOne(
      { title: "The Great Gatsby"},
      { $set: { price: 16.99 } }
    );

    console.log(
      `Matched ${updatePrice.matchedCount}, Modified ${updatePrice.modifiedCount}`
    );

    const updatedBook = await collection.findOne({ title: "The Great Gatsby" });
    console.log(updatedBook);

    // Delete a book by its title
    console.log("\nDelete 1984 by George Orwell");
    const deleteBook = await collection.deleteOne({
      title: "1984",
    });
    console.log(`Deleted ${deleteBook.deletedCount} document(s)`);

    //===================
    // TASK 3
    //===================

    // Find books both in stock and published after 1950
    console.log("\nBooks in stock and published after 1950:");
    const inStock = await collection
      .find({
        in_stock: true,
        published_year: { $gt: 1950 },
      })
      .toArray();
    inStock.forEach((book) => {
      console.log(`${book.title} by ${book.author} ($${book.price})`);
    });

    // Using projection to return only title, author and price
    console.log("\nProjection to show title, author and price:");
    const projectedBooks = await collection
      .find(
        { genre: "Fiction" },
        { projection: { title: 1, author: 1, price: 1, _id: 0 } }
      )
      .toArray();
    projectedBooks.forEach((book) => {
      console.log(`${book.title} by ${book.author} and price $${book.price}`);
    });

    // Sorting by price - ascending
    console.log("\nBooks sorted in ascending order:");
    const booksAsc = await collection
      .find({}, { projection: { title: 1, price: 1, _id: 0 } })
      .sort({ price: 1 })
      .toArray();
    booksAsc.forEach((book) => {
      console.log(`${book.title}: $${book.price}`);
    });

    // Sorting by price - descending
    console.log("\nBooks sorted in ascending order:");
    const booksdesc = await collection
      .find({}, { projection: { title: 1, price: 1, _id: 0 } })
      .sort({ price: -1 })
      .toArray();
    booksdesc.forEach((book) => {
      console.log(`${book.title}: $${book.price}`);
    });

    //Pagination - 5 books per page
    console.log("\n Pagination (5 books per page):");
    const booksPerPage = 5;
    const totalPages = 3;

    for (let page = 1; page <= totalPages; page++) {
      const skipCount = (page - 1) * booksPerPage;
      console.log(`Page ${page}:`);

      const paginations = await collection
        .find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } })
        .sort({ title: 1 })
        .limit(booksPerPage)
        .skip(skipCount)
        .toArray();

      paginations.forEach((book) => {
        console.log(`${book.title} by ${book.author}`);
      });
      console.log();
    }

    //===================
    // TASK 4
    //===================

    // Calculate average price of the books by genre
    console.log("\nAverage price of books by genre:");
    const avgPriceByGenre = await collection
      .aggregate([
        {
          $group: {
            _id: "$genre",
            averagePrice: { $avg: "$price" },
            bookCount: { $sum: 1 },
          },
        },
        {
          $sort: { averagePrice: -1 },
        },
        {
          $project: {
            _id: 0,
            genre: "$_id",
            averagePrice: { $round: ["$averagePrice", 2] },
            numberOfBooks: "$bookCount",
          },
        },
      ])
      .toArray();
    avgPriceByGenre.forEach((result) => {
      console.log(
        `${result.genre}: $${result.averagePrice} (${result.numberOfBooks} books)`
      );
    });

    // Find the author with the most books
    console.log("\nAuthor with most books:");
    const topAuthor = await collection
      .aggregate([
        {
          $group: {
            _id: "$author",
            bookCount: { $sum: 1 },
            books: { $push: "$title" },
          },
        },
        {
          $sort: { bookCount: -1 },
        },
        {
          $limit: 1,
        },
        {
          $project: {
            _id: 0,
            author: "$_id",
            totalBooks: "$bookCount",
            bookTitles: "$books",
          },
        },
      ])
      .toArray();
    topAuthor.forEach((result) => {
      console.log(`${result.author}: ${result.totalBooks} books`);
      result.bookTitles.forEach((title) => {
        console.log(`*${title}`);
      });
    });

    // Group books by publication decade
    console.log("\nBooks grouped by publication decade:");
    const booksByDecade = await collection
      .aggregate([
        {
          $project: {
            title: 1,
            author: 1,
            published_year: 1,
            decade: {
              $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10],
            },
          },
        },
        {
          $group: {
            _id: "$decade",
            bookCount: { $sum: 1 },
            books: {
              $push: {
                title: "$title",
                year: "$published_year",
              },
            },
          },
        },
        {
          $sort: { _id: -1 },
        },
        {
          $project: {
            _id: 0,
            decade: { $concat: [{ $toString: "$_id" }, "s"] },
            numberOfBooks: "$bookCount",
            bookList: "$books",
          },
        },
      ])
      .toArray();
    booksByDecade.forEach((result) => {
      console.log(`${result.decade}: ${result.numberOfBooks} books`);
      result.bookList.forEach((book) => {
        console.log(`*${book.title} (${book.year})`);
      });
    });

    //===================
    // TASK 5
    //===================

    // Create index on the title field
    console.log("\nCreate index on the title field:");
    await collection.createIndex({ title: 1 });
    console.log(`Index created on title`);

    // Create compound index on author and published_year
    console.log("\nCreateing compound index on author and published_year:");
    await collection.createIndex({ author: 1, published_year: -1 });
    console.log(`Compound index created`);

    // Display the created indexes
    const indexes = await collection.indexes();
    indexes.forEach((index) => {
      console.log(`${index.name}: ${JSON.stringify(index.key)}`);
    });

    // Use explain() to demonstrate performance improvement
    console.log("\nPerformance Analysis with explain():");
    // Query on a non-indexed field
    const explainGenre = await collection
      .find({ genre: "Adventure" })
      .explain("executionStats");
    console.log(
      `Execution time: ${explainGenre.executionStats.executionTimeMillis}ms`
    );
    console.log(
      `Documents examined: ${explainGenre.executionStats.totalDocsExamined}`
    );
    console.log(`Documents returned: ${explainGenre.executionStats.nReturned}`);
    console.log(`Stage: ${explainGenre.executionStats.executionStages.stage}`);

    //Query on an indexed title
    const explainTitle = await collection
      .find({ title: "The Great Gatsby" })
      .explain("executionStats");
    console.log(
      `Execution time: ${explainTitle.executionStats.executionTimeMillis}ms`
    );
    console.log(
      `Documents examined: ${explainTitle.executionStats.totalDocsExamined}`
    );
    console.log(`Documents returned: ${explainTitle.executionStats.nReturned}`);
    console.log(`Stage: ${explainTitle.executionStats.executionStages.stage}`);

    //Query on a compound index
    const explainCompound = await collection
      .find({
        author: "J.R.R. Tolkien",
        published_year: { $gte: 1950 },
      })
      .explain("executionStats");
    console.log(
      `Execution time: ${explainCompound.executionStats.executionTimeMillis}ms`
    );
    console.log(
      `Documents examined: ${explainCompound.executionStats.totalDocsExamined}`
    );
    console.log(
      `Documents returned: ${explainCompound.executionStats.nReturned}`
    );
    console.log(
      `Stage: ${explainCompound.executionStats.executionStages.stage}`
    );
  } catch (err) {
    console.error("Error occurred:", err);
  } finally {
    // Close the connection
    await client.close();
    console.log("Connection closed");
  }
}

// Run the function
insertBooks().catch(console.error);

/*
 * Example MongoDB queries you can try after running this script:
 *
 * 1. Find all books:
 *    db.books.find()
 *
 * 2. Find books by a specific author:
 *    db.books.find({ author: "George Orwell" })
 *
 * 3. Find books published after 1950:
 *    db.books.find({ published_year: { $gt: 1950 } })
 *
 * 4. Find books in a specific genre:
 *    db.books.find({ genre: "Fiction" })
 *
 * 5. Find in-stock books:
 *    db.books.find({ in_stock: true })
 */
