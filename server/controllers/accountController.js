import mongoose from "mongoose";
import md5 from "md5";
import Account from "../models/account.js";
import jwt from "jsonwebtoken";
import {verifyJwtToken} from "../utils.js";
const tokenList = {};

// Create new account
export function createAccount(req, res) {
  const account = new Account({
    _id: mongoose.Types.ObjectId(),
    user_name: req.body.user_name,
    password: md5(req.body.password),
    full_name: req.body.full_name,
    year_of_birth: new Date(req.body.year_of_birth),
    email: req.body.email,
    phone: req.body.phone,
    created_by: req.body.user_name,
    updated_at: null,
    updated_by: null,
  });
  return account
    .save()
    .then((newAccount) => {
      return res.status(201).json({
        success: true,
        message: "New account created successfully",
        Account: newAccount,
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

// Get all account
export function getAllAccount(req, res) {
  console.log(tokenList);
  Account.find()
    .select("id user_name full_name year_of_birth phone email")
    .then((allAccount) => {
      return res.status(200).json({
        success: true,
        message: "A list of all account",
        Accounts: allAccount,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}

// Get single account
export function getSingleAccount(req, res) {
  const id = req.params.account_id;
  Account.findById(id)
    .then((singleAccount) => {
      res.status(200).json({
        success: true,
        message: "More on "+singleAccount.user_name,
        Account: singleAccount,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "This is account does not exist",
        error: error.message,
      });
    });
}

// Update account
export function updateAccount(req, res) {
  var user = req.cookies.user;
  const id = req.params.account_id;
  const updateObject = req.body;
  updateObject.updated_by = user.user_name;
  updateObject.updated_at = Date.now;
  if(req.body.password){
    updateObject.password = md5(req.body.password);
  }
  console.log(req.body.password);
  Account.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Account is updated",
        updateAccount: updateObject,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try agian.",
      });
    });
}

// Delete a account
export function deleteAccount(req, res) {
  const id = req.params.account_id;
  Account.findByIdAndRemove(id)
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Account is deleted",
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try agian.",
      });
    });
}

export function login(req, res) {
  const user = null;
  const user_name = req.body.user_name;
  const password = md5(req.body.password);
  Account.findOne({ user_name: user_name })
    .then((user) => {
      user = user;
      if (user === null) {
        res.status(500).json({
          success: false,
          message: "This is user does not exist",
        });
      } else {
        if (user.password === password) {
          res.cookie("user", user);
          req.session.User = user;
          console.log(req.session.User);
          const accessToken = jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: process.env.TOKEN_LIFE
          });
          const refreshToken = jwt.sign({user: user}, process.env.ACCESS_REFRESH_TOKEN_SECRET,{
            expiresIn: process.env.REFRESH_TOKEN_LIFE
          } );
          tokenList[refreshToken] = user;
          res.status(200).json({
            success: true,
            message: "Logged in successfully",
            accessToken,
             refreshToken
          });
        } else {
          res.status(500).json({
            success: false,
            message: "Incorrect password",
          });
        }
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "This is account does not exist",
        error: error.message,
      });
    });
}

// Change password
export function changePassword(req, res) {
  const id = req.params.account_id;
  const password_new = md5(req.body.password_new);
  Account.findByIdAndUpdate(id,  {password:password_new} )
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Password Changed",
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

// RefreshToken
export function refreshToken(req, res){
  const { refreshToken } = req.body;
  if ((refreshToken) && (refreshToken in tokenList)) {
    try {
      // Kiểm tra mã Refresh token
      verifyJwtToken(refreshToken, process.env.ACCESS_REFRESH_TOKEN_SECRET);
      // Lấy lại thông tin user
      const user = tokenList[refreshToken];
      // Tạo mới mã token và trả lại cho user
      const token = jwt.sign(user, config.secret, {
        expiresIn: config.tokenLife,
      });
      const response = {
        token,
      }
      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(403).json({
        message: 'Invalid refresh token',
      });
    }
  } else {
    res.status(400).json({
      message: 'Invalid request',
    });
  }
}

export function logout(req, res){
  const authHeader = req.headers.authorization;
  const token = req.body.token || req.query.token || req.headers['x-access-token']||authHeader.split(' ')[1];
  if (token) {
    // Xác thực mã token và kiểm tra thời gian hết hạn của mã
    try {
      jwt.destroy(token)
      res.status(200).json({
        success: true,
        message: "logout in successfully",
        accessToken,
         refreshToken
      });
      next();
    } catch (err) {
      // Giải mã gặp lỗi: Không đúng, hết hạn...
      console.error(err);
      return res.status(401).json({
        message: 'Unauthorized access.',
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
}