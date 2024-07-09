import express from "express";
import postModel from "../models/post.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const content = req.body.content;
  if (!content || content === undefined || content === "" || content.length > 140) {
    res.status(400).json({ message: "Invalid content" });
    return;
  }
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  const post = new postModel({
    writer: "John Doe",
    content: content,
    date: formattedDate,
  });
  try {
    await post.save();
    res.status(200).json({ id: post._id, message: "Post added successfully"})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  const isRead = req.body.isRead;
  if (isRead === undefined) {
    return res.status(400).send('Bad Request: Missing parameter');
  }
  try {
    await postModel.updateOne({ _id: req.params.id }, { $set: { isRead: isRead } });
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    await postModel.deleteMany();
    res.status(200).json({ message: "Posts deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
