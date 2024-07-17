import express from "express";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET = "mysecret";

// create account, /api/users/signup, POST
// login, /api/users/login, POST
// lgoout, /api/users/logout, POST
// add friend, /api/users/friends/:id, POST, use the user id from the token
// delete friend, /api/users/friends/:id, DELETE, use the user id from the token
// get friends, /api/users/friends, GET, use the user id from the token
//
// // Middleware to authenticate the token
// const authenticateToken = (req: Request, res: Response, next: Function) => {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).send('Access denied');
//
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
//     (req as any).userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(400).send('Invalid token');
//   }
// };

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const user = new userModel({
    // name: name,
    username: username,
    password: password,
  });

  try {
    await user.save();
    res.status(200).send("User created successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred. Please try again later.");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    const rightPassword = await user.comparePassword(password);
    console.log(rightPassword);
    console.log(!user);
    if (!user || !rightPassword) {
      return res.status(401).send({ msg: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.status(200).send({ token });
  } catch (err) {
    // if username not found
    res.status(401).send({ msg: "Invalid username or password" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // const user = await userModel.findById(id).populate("friends");
    const user = await userModel.findById(id);
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred. Please try again later.");
  }
});

router.get("/", async (req, res) => {
  const id = jwt.decode(req.headers.authorization.split(" ")[1]).id;
  try {
    // const user = await userModel.findById(id).populate("friends");
    const user = await userModel.findById(id);
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred. Please try again later.");
  }
});

router.get("/search/:prefix", async (req, res) => {
  const { prefix } = req.params;
  console.log("prefix:", prefix);
  try {
    const users = await userModel.find({ username: { $regex: prefix } });
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred. Please try again later.");
  }
});

router.post("/add/:id", async (req, res) => {
  const { id } = req.params;
  const userId = jwt.decode(req.headers.authorization.split(" ")[1]).id;
  console.log(userId);
  console.log(id);
  try {
    const firstUser = await userModel.findById({ _id: userId });
    const secondUser = await userModel.findById({ _id: id });
    firstUser.friends.push(secondUser);
    secondUser.friends.push(firstUser);
    await firstUser.save();
    await secondUser.save();
    res.status(200).send({ msg: "Friend added successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "An error occurred. Please try again later." });
  }
});

export default router;
