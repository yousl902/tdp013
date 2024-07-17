import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  onPage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    // required: true,
    maxLength: 140,
  },
  date: {
    type: String,
    // required: true,
    default: Date.now,
  },
  seenBy: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    // required: true,
    default: [],
  },
});

export default mongoose.model("Post", postSchema);
