import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const bookSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  author: {
    type: String,
    required: true,
    maxlength: 255,
  },
  title: {
    type: String,
    required: true,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
  },
  published_at: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  pageNo: {
    type: Number,
    required: true,
  },
  readed: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: String,
    required: true,
  },
  updated_at: {
    type: Date,
  },
  updated_by: {
    type: String,
  },
});

export default mongoose.model("book", bookSchema, "book");
