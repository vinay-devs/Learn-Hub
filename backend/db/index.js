const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL).then((res, err) => {
  if (!err) {
    console.log("connected to db");
  } else {
    console.log(res);
  }
});

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  purchasedCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new mongoose.Schema({
  title: String,
  image: String,
});

const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = { User, Course };
