const { Router } = require("express");
const router = Router();
const adminMiddleWare = require("../middleware/admin");

router.post("/login", adminMiddleWare, (req, res) => {
  res.send("Admin Auth sucessful");
});

module.exports = router;
