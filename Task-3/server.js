const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory storage
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" }
];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET single book
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book)
    return res.status(404).json({ message: "Book not found" });

  res.json(book);
});

// CREATE book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

// UPDATE book
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book)
    return res.status(404).json({ message: "Book not found" });

  const { title, author } = req.body;

  book.title = title || book.title;
  book.author = author || book.author;

  res.json(book);
});

// DELETE book
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = books.findIndex(b => b.id === id);

  if (index === -1)
    return res.status(404).json({ message: "Book not found" });

  const deleted = books.splice(index, 1);

  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});