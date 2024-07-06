import express from "express";
import mongoose from "mongoose";

const app = express();

const startServer = async () => {
  mongoose
    .connect("mongodb://localhost:27017/testdb", {
      family: 4,
    })
    .then(() => {
      console.log("connection successfully ");
    })
    .catch((err) => {
      console.log("connection error", err);
    });

  const db = mongoose.connection;
  db.on("error", (error) => console.error("DB connection error:", error));
  db.once("open", () => console.log("DB connection open"));

  app.use(express.json());

  const postsRouter = await import("./routes/posts.js");
  app.use("/posts", postsRouter.default);

  app.listen(3000, () => console.log("Server Started"));
};
startServer();

export default app;
