const { Router } = require("express");
const router = Router();
const adminMiddleWare = require("../middleware/admin");

const jwt = require("jsonwebtoken");
const { adminAuthCheck } = require("../middleware/adminAuthCheck");
const { User, Course } = require("../db");

router.post("/login", adminMiddleWare, (req, res) => {
  const { username, password } = req.body.credential;

  try {
    const token = jwt.sign({ username, password }, process.env.JWT_SECRET_KEY);
    res.status(200).json({
      message: "Data processed successfully",
      token: token,
      isAdmin: true,
    });
  } catch (error) {
    res.status(500).json({ message: "error with db uploading", err: error });
  }
});

router.get("/adminData", adminAuthCheck, (req, res) => {
  try {
    const token = req.headers.authorization;
    const { username } = jwt.decode(token);
    res.status(200).json(username);
  } catch (error) {
    res.status(400).json({ message: "Token Not Found" });
  }
});

router.get("/getAllUsers", adminAuthCheck, async (req, res) => {
  const users = await User.find({}, "userName email");
  res.json(users);
});

router.delete("/deleteUser/:id", adminAuthCheck, async (req, res) => {
  try {
    const id = req.params.id.split(":")[1];
    const userDelete = await User.deleteOne({ _id: id });
    res.json({ userDelete });
  } catch (error) {
    res.status(500).json({ message: "Error while Deleteting" });
  }
});

router.get("/getAllCourses", adminAuthCheck, async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ message: "Error while Getting All Courses" });
  }
});

router.delete("/deleteCourse/:id", adminAuthCheck, async (req, res) => {
  try {
    const id = req.params.id.split(":")[1];
    const courseDelete = await Course.deleteOne({ _id: id });
    res.status(200).json({
      message: "Course Deleted Succesfully",
      courseDelete: courseDelete,
    });
  } catch (err) {
    res.status(400).json({ message: "Error while deleting the course" });
  }
});

router.post("/addCourse", adminAuthCheck, async (req, res) => {
  try {
    const { title, image } = req.body;
    const course = await Course.create({
      title: title,
      image: image,
    });
    res
      .status(200)
      .json({ message: "New Course Created", courseId: course._id });
  } catch (error) {
    res.status(400).json({ message: "Error while creating new Course" });
  }
});
module.exports = router;
