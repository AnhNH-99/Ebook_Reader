import mongoose from "mongoose";
import Book from "../models/book.js";
import date from "date-and-time";

// Create book
export function createBook(req, res) {
  console.log(req.files["file"][0].filename);
  console.log(req.files["image"][0].filename);
  var user = req.cookies.user;
  const obj_category = {
    _id: req.body.category_id,
    name: req.body.category_name,
  };
  const book = new Book({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    published_at: req.body.published_at,
    content: req.body.content,
    file: req.files["file"][0].filename,
    image: req.files["image"][0].filename,
    rating: req.body.rating,
    language: req.body.language,
    pageNo: req.body.pageNo,
    readed: req.body.readed,
    category: obj_category,
    created_by: user.user_name,
    updated_at: null,
    updated_by: null,
  });
  return book
    .save()
    .then((book_new) => {
      return res.status(201).json({
        success: true,
        message: "New book created successfully",
        book: book_new,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}

// Get all book
export function getAllBook(req, res) {
  let title = req.query.title;
  let books;
  if (title) {
    books = Book.find({ title: title });
  } else {
    books = Book.find();
  }
  books
    .select(
      "id name author title description published_at content file image rating language pageNo readed category"
    )
    .then((books) => {
      return res.status(200).json({
        success: true,
        message: "A list of book",
        books: books,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}

// Get single book
export function getsingleBook(req, res) {
  const id = req.params.book_id;
  Book.findById(id)
    .then((book) => {
      return res.status(200).json({
        success: true,
        message: "More on " + book.name,
        book: book,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}

// Update book
export function updateBook(req, res) {
  var user = req.cookies.user;
  const id = req.params.book_id;
  const update_object = req.body;
  update_object.updated_by = user.user_name;
  update_object.updated_at = new Date();
  if (req.files["file"]) {
    update_object.file = req.files["file"][0].filename;
  }
  if (req.files["image"]) {
    update_object.image = req.files["image"][0].filename;
  }
  console.log(update_object);
  Book.updateOne({ _id: id }, { $set: update_object })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Book is updated",
        updateBook: update_object,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try agian.",
        error: error.message,
      });
    });
}

// Delete book
export function deleteBook(req, res) {
  const id = req.params.book_id;
  Book.findByIdAndRemove(id)
    .exec()
    .then((book) => {
      return res.status(200).json({
        success: true,
        message: "Book is deleted",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}
