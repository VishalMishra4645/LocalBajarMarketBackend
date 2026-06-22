const express = require("express");
const { mongoose } = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ quiet: true });
// const multer = require("multer")
const productRouter = require("./router/productRouter");
const userSignUp = require("./router/LogReg.js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/product", productRouter);
app.use("/signUp", userSignUp);

app.get("/", (req, res) => {
  res.send("Hello DP");
});

mongoose
  .connect(process.env.mongoURL)
  .then(() => {
    app.listen(1000, () => {
      console.log("Server is running on port 1000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
