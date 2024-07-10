import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxLength: 140
  },
  date: {
    type: String,
    required: true,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model("Message", messageSchema);
