import mongoose from "mongoose";
import Category from "../models/category.js";

//Create new category
export function createCategory(req, res) {
  var user = req.cookies.user;
  const category = new Category({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    created_by: user.user_name,
    updated_at: null,
    updated_by: null,
  });
  return category
    .save()
    .then((category_new) => {
      return res.status(201).json({
        success: true,
        message: "New caterory created successfully",
        Catergory: category_new,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}

// Get all category
export function getAllCategory(req, res) {
  Category.find()
    .select("id name")
    .then((categoryies) => {
      return res.status(200).json({
        success: true,
        message: "A list of all category",
        Categorys: categoryies,
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

// Get single category
export function getSingleCategory(req, res) {
  const id = req.params.category_id;
  Category.findById(id)
    .then((category) => {
      return res.status(200).json({
        success: true,
        message: "More on " + category.name,
        Category: category,
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

// Update category
export function updateCategory(req, res) {
  var user = req.cookies.user;
  const id = req.params.category_id;
  const update_object = req.body;
  update_object.updated_by = user.user_name;
  update_object.updated_at = Date.now;
  Category.update({ _id: id }, { $set: update_object })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Category is updated",
        updateCategory: update_object,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try agian.",
      });
    });
}

// Delete category
export function deleteCategory(req, res) {
  const id = req.params.category_id;
  Category.findByIdAndRemove(id)
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Category is deleted",
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try agian.",
      });
    });
}
