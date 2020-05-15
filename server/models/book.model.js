const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name should not be empty"],
  },
  genre: {
    type: String,
    required: [true, "Genre should not be empty"],
  },
  authorId: String,
});
const Book = new mongoose.model("Book", bookSchema);
module.exports = Book;
