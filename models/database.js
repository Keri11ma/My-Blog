const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:"); // For development, use in-memory DB. For production, use a file DB.

db.serialize(() => {
  db.run(
    "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
  );
  db.run(
    "CREATE TABLE posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, author INTEGER, FOREIGN KEY(author) REFERENCES users(id))"
  );
});

module.exports = db;
