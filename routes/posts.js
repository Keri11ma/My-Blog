const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../models/database");

const router = express.Router();
const secret = "mysecret"; // Use environment variables for secret in production

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    req.userId = decoded.id;
    next();
  });
}

// Create a new post
router.post("/", verifyToken, (req, res) => {
  const { title, content } = req.body;
  db.run(
    "INSERT INTO posts (title, content, author) VALUES (?, ?, ?)",
    [title, content, req.userId],
    function (err) {
      if (err) return res.status(500).send("Error creating the post.");
      res.status(200).send({ id: this.lastID });
    }
  );
});

// Update a post
router.put("/:id", verifyToken, (req, res) => {
  const { title, content } = req.body;
  db.run(
    "UPDATE posts SET title = ?, content = ? WHERE id = ? AND author = ?",
    [title, content, req.params.id, req.userId],
    function (err) {
      if (err) return res.status(500).send("Error updating the post.");
      if (this.changes === 0)
        return res.status(404).send("Post not found or not authorized.");
      res.status(200).send("Post updated.");
    }
  );
});

// Delete a post
router.delete("/:id", verifyToken, (req, res) => {
  db.run(
    "DELETE FROM posts WHERE id = ? AND author = ?",
    [req.params.id, req.userId],
    function (err) {
      if (err) return res.status(500).send("Error deleting the post.");
      if (this.changes === 0)
        return res.status(404).send("Post not found or not authorized.");
      res.status(200).send("Post deleted.");
    }
  );
});

// Get all posts
router.get("/", (req, res) => {
  db.all(
    "SELECT posts.id, title, content, username as author FROM posts JOIN users ON posts.author = users.id",
    [],
    (err, rows) => {
      if (err) return res.status(500).send("Error fetching posts.");
      res.status(200).json(rows);
    }
  );
});

module.exports = router;
