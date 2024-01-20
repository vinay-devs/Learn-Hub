const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../db");

const authCheck = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const checkResult = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findOne({ userName: checkResult.username });
      const passwordCheck = await bcrypt.compare(
        checkResult.password,
        user.password
      );

      if (passwordCheck) {
        next();
      } else {
        res.status(401).json({ message: "Authentication Token Failed" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error while checking the Token" });
    }
  } else {
    res.status(400).json({ message: "Token is not present" });
  }
};

module.exports = authCheck;
