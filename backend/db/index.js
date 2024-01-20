const mongoose = require("mongoose");

try {
  mongoose
    .connect(
      "mongodb+srv://vinaydevs:jqF-phGAETG_W6F@cluster0.rdf1mnc.mongodb.net/CourseSellingWeb"
    )
    .then((res, err) => {
      if (!err) {
        console.log("connected to db");
      } else {
        console.log(res);
      }
    });
} catch (error) {
  console.log("Error while Connecting To Database");
}

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
