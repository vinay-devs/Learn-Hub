const JWT_SECRET = "secret";
const jwt = require("jsonwebtoken");

const adminAuthCheck = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const checkResult = jwt.verify(token, JWT_SECRET);
    if (checkResult.username == "admin" && checkResult.password == "admin") {
      next();
    } else {
      res.status(401).json({ message: "Authentication Token Failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error while checking the Token" });
  }
};

module.exports = { adminAuthCheck };
