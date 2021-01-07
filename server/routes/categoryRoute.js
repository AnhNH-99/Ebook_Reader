import express from "express";
import {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();
router.post("/category", createCategory);
router.get("/category", getAllCategory);
router.get("/category/:category_id", getSingleCategory);
router.put("/category/:category_id", updateCategory);
router.delete("/category/:category_id", deleteCategory);
export default router;
