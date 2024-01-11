const bcrypt = require("bcrypt");
const { User } = require("../db");

const userMiddleware = async (req, res, next) => {
  const { username, password } = req.body.credential;
  try {
    const user = await User.findOne({ userName: username });
    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }
    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      next();
    } else {
      return res.status(401).json({ message: "Authentication Failed" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something Happened During Authentication" });
  }
};

module.exports = userMiddleware;
