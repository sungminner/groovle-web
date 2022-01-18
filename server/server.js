const express = require("express");
const cors = require("cors");
const path = require("path");
const maria = require("../src/db_info");
const AWS = require("aws-sdk");

const app = express();
const port = 4000;

AWS.config.region = "ap-northeast-2";

maria.connect();
maria.query("show databases", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});
maria.end();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => {
  console.log("Groovle listening");
});
