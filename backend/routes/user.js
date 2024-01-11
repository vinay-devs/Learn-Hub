const { Router } = require("express");
const { User, Course } = require("../db");
const router = Router();
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const authCheck = require("../middleware/authcheck");
const JWT_SECRET = "secret";

const usernameSchema = zod.string().min(4).max(10);
const passwordSchema = zod.string().min(6);
const emailSchema = zod.string().email();

router.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body.credential;
    const user = await User.findOne({ email: email });
    try {
      usernameSchema.parse(userName);
      emailSchema.parse(email);
      passwordSchema.parse(password);
    } catch (error) {
      res.status(400).json({ message: "Invalid input data" });
    }

    try {
      if (!user) {
        bcrypt.hash(password, 10, (err, hash) => {
          if (!err) {
            User.create({
              userName: userName,
              email: email,
              password: hash,
            });
            res.status(200).json({ message: "Successfully SignUp" });
          }
        });
      } else {
        res
          .status(400)
          .json({ message: "Email Id is already Exists . Please Login" });
      }
    } catch (error) {
      res.status(400).json({ message: "Error while Hashing the Password" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error with database Uploading" });
  }
});

router.post("/login", userMiddleware, async (req, res) => {
  const { username, password } = req.body.credential;
  try {
    usernameSchema.parse(username);
    passwordSchema.parse(password);
  } catch (error) {
    res.status(400).json({ message: "Invalid input data" });
  }

  try {
    const token = jwt.sign({ username, password }, JWT_SECRET);
    res
      .status(200)
      .json({ message: "Data processed successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: "error with db uploading", err: error });
  }
});

router.get("/dashboard", authCheck, (req, res) => {
  console.log("hey");
});
module.exports = router;
