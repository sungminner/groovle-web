const express = require("express");
const cors = require("cors");
const path = require("path");
const AWS = require("aws-sdk");
const api = require("./routes/index");

const app = express();
const port = 4000;

AWS.config.region = "ap-northeast-2";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", api);
app.use(cors());

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => {
  console.log("Groovle listening");
});
