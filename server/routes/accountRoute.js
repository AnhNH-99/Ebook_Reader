import express from "express";
import {
  createAccount,
  getAllAccount,
  getSingleAccount,
  updateAccount,
  deleteAccount,
  login,
  changePassword,
} from "../controllers/accountController.js";

import {
  requireAccount,
  validateLogin,
  validateChangePassword,
  requireChangePassword,
} from "../validates/accountValidate.js";

const router = express.Router();

router.put("/account/:account_id", requireAccount, updateAccount);
router.get("/account", getAllAccount);
router.get("/account/:account_id", getSingleAccount);
router.post("/account", createAccount);
router.put("/account/changepassword/:account_id", validateChangePassword, requireAccount, requireChangePassword, changePassword);
router.delete("/account/:account_id", requireAccount, deleteAccount);
export default router;
