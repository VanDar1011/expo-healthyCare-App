const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const paymentRouter = require("./router/paymentRouter");
//
const cors = require("cors");
dotenv.config();
//
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/payments", paymentRouter);
//
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
