import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const categorySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
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

export default mongoose.model("category", categorySchema, "category");
