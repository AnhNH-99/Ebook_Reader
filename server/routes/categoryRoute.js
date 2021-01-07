import express from "express";
import {
    createCategory,
    getAllCategory,
    getSingleCategory
  } from "../controllers/categoryController.js";

  const router = express.Router();
  router.post("/category", createCategory);
  router.get("/category", getAllCategory);
  router.get("/category/:category_id", getSingleCategory);
  export default router;