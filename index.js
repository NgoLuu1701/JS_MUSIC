const express = require("express");
const app = express();
const mongoose = require(`mongoose`);
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
morgan("common");
const cors = require("cors");
const RouterMusic = require("./Router/music");
app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json());
app.use(cors());
const ConnectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB has connect");
  } catch (error) {
    console.log(error);
    process.exit(1); 
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
ConnectDB();

app.use("/Music", RouterMusic);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // * cho phép truy cập từ tất cả các nguồn
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.get("/", (req, res) => {
  res.send("Hi! Đây là phần BE: Restfull API music xử lý logic like comment");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Sever is running port ${port}`);
});
