import express from "express";
import mongoose from "mongoose";
import  mongoSanitize from 'express-mongo-sanitize';

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

  // this is to sanitize the request body
  // this will remove all the keys starting with $ and . from the request body
  // it is important to use this to prevent NoSQL injection
  // Not so important for this lab, could be tested in the next one
  app.use(
    mongoSanitize({
      onSanitize: ({ req, key }) => {
        console.warn(`This request[${key}] is sanitized`, req);
      },
    }),
  );

  app.listen(3000, () => console.log("Server Started"));
};
startServer();

export default app;
