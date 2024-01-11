const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret";

const authCheck = (req, res, next) => {
  const token = req.headers.authorization;
  const checkResult = jwt.verify(token, JWT_SECRET);
  if (checkResult) {
    next();
  } else {
    res.status(401).json({ message: "Authentication Token Failed" });
  }
};

module.exports = authCheck;
