import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const accountSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  year_of_birth: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
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

export default mongoose.model("account", accountSchema, "account");
