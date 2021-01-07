import mongoose from "mongoose";
import md5 from "md5";
import Account from "../models/account.js";

export function requireAccount(req, res, next) {
  const id = req.params.account_id;
  Account.findById(id)
    .then((account) => {
      if (account === null) {
        res.status(500).json({
          success: false,
          message: "This is account does not exist",
        });
        return;
      }
      next();
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "This is account does not exist",
        error: error.message,
      });
    });
}

export function validateLogin(req, res, next) {
  const user_name = req.body.user_name;
  const password = req.body.password;
  var errors = [];
  if (!user_name) {
    errors.push("Invalid User Name");
  }
  if (!password) {
    errors.push("Invalid Password");
  }
  if (errors.length) {
    res.status(500).json({
      success: false,
      message: errors,
    });
    return;
  }
  next();
}

export function validateChangePassword(req, res, next) {
  const password = req.body.password;
  const password_new = req.body.password_new;
  const password_comfirm = req.body.password_comfirm;
  var errors = [];
  if (!password) {
    errors.push("Invalid Password");
  }
  if (!password_new) {
    errors.push("Invalid Password New");
  }
  if (!password_comfirm) {
    errors.push("Invalid Password Comfirm");
  }
  if(password_new !== password_comfirm){
    errors.push("Password confirmation failed");
  }
  if (errors.length) {
    res.status(500).json({
      success: false,
      message: errors,
    });
    return;
  }
  next();
}

export function requireChangePassword(req, res, next) {
  const id = req.params.account_id;
  const password = md5(req.body.password);
  Account.findOne({ _id: id, password: password })
  .then((user) => {
    user = user;
    if (user === null) {
      res.status(500).json({
        success: false,
        message: "Incorrect password",
      });
      return;
    } else {
      next();
    }
  })
  .catch((error) => {
    res.status(500).json({
      success: false,
      message: "Incorrect password",
      error: error.message,
    });
    return;
  });
}
