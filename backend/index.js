const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 5500;
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

app.use(bodyParser.json());
app.use(cors());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req) => {
  console.log(req);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
