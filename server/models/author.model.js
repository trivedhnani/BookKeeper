const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "name should not be empty"],
  },
  age: {
    type: Number,
    required: true,
    min: [0, "Age cannot be less than zero"],
  },
  //   books: [{ type: mongoose.Schema.ObjectId, ref: "Book" }],
});
const Author = new mongoose.model("Author", authorSchema);
module.exports = Author;
