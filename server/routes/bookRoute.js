import express from "express";
import multer from "multer";
import path from "path";
import {
  createBook,
  getAllBook,
  getsingleBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const storage = multer.diskStorage({
  destination: "./static/uploads/",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

const router = express.Router();
router.post(
  "/book",
  upload.fields([{ name: "file" }, { name: "image" }]),
  createBook
);
router.put(
  "/book/:book_id",
  upload.fields([{ name: "file" }, { name: "image" }]),
  updateBook
);
router.get("/book/", getAllBook);
router.get("/book/:book_id", getsingleBook);
router.delete("/book/:book_id", deleteBook);
export default router;
