import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  posts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    required: true,
    default: [],
  },
});

export default mongoose.model("User", userSchema);
