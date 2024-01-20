const { Router } = require("express");
const { User, Course } = require("../db");
const router = Router();
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const authCheck = require("../middleware/authcheck");

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
    const token = jwt.sign({ username, password }, process.env.JWT_SECRET_KEY);
    res
      .status(200)
      .json({ message: "Data processed successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: "error with db uploading", err: error });
  }
});

router.get("/userdata", authCheck, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const userData = jwt.decode(token);
    const user = await User.findOne({ userName: userData.username });
    res.status(200).json({
      username: user.userName,
      email: user.email,
      purchasedCourse: user.purchasedCourse,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/allCourses", authCheck, async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/addToPurchased", authCheck, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { username } = jwt.decode(token);
    const { id } = req.body;
    const userData = await User.findOne({ userName: username });

    if (userData.purchasedCourse.includes(id)) {
      return res
        .status(400)
        .json({ message: "You have already Bought the Course" });
    }

    await User.updateOne(
      { userName: username },
      {
        $push: { purchasedCourse: id },
      }
    );
    res.status(200).json({ message: "Successfully Bought the Course" });
  } catch (err) {
    res.json(err);
  }
});

router.get("/getCourseData", authCheck, async (req, res) => {
  try {
    const purchasedData = req.query.purchasedData;
    const course = await Course.find({ _id: { $in: purchasedData } });
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ message: "Error while Taking Data From Database" });
  }
});

router.delete("/deleteCourse/:id", authCheck, async (req, res) => {
  const token = req.headers.authorization;
  const { username } = jwt.decode(token);
  const id = req.params.id;
  await User.updateOne(
    { userName: username },
    { $pull: { purchasedCourse: id } }
  );
  res.status(200).json({ message: "Successfully Deleted" });
});
module.exports = router;
