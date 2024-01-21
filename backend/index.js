require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 5500;
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://learn-hub-client.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
