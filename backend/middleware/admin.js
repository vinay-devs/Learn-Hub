const USERNAME = "admin";
const PASSWORD = "admin";
const adminMiddleWare = (req, res, next) => {
  const { username, password } = req.body.credential;
  if (username == USERNAME && password == PASSWORD) {
    next();
  } else {
    res.json({ message: "authentication failed" });
  }
};

module.exports = adminMiddleWare;
