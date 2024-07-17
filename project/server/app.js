import express from 'express';
import mongoose from "mongoose";
import mongoSanitize from "express-mongo-sanitize";
import cors from 'cors';

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

const app = express();

app.use(express.static('../public'))
app.use(express.static('../src'))
app.use(express.json());
app.use(cors());

const postsRouter = await import("./routes/posts.js");
const usersRouter = await import("./routes/users.js");
const messagesRouter = await import("./routes/messages.js");
app.use("/api/posts", postsRouter.default);
app.use("/api/users", usersRouter.default);
app.use("/api/messages", messagesRouter.default);
app.use(
  mongoSanitize({
    onSanitize: ({ req, key }) => {
      console.warn(`This request[${key}] is sanitized`, req);
    },
  }),
);

app.listen(5080, () => console.log("Server Started"));

export default app;
