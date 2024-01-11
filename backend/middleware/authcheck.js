const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";
const bcrypt = require("bcrypt");
const { User } = require("../db");

const authCheck = async (req, res, next) => {
  const token = req.headers.authorization;
  const checkResult = jwt.verify(token, JWT_SECRET);
  try {
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
};

module.exports = authCheck;
