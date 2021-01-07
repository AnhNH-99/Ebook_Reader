import express from "express";
import {
  login,
  logout
} from "../controllers/accountController.js";

import {
  validateLogin,
} from "../validates/accountValidate.js";

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/logout", logout);
export default router;