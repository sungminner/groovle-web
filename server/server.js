const express = require("express");
const path = require("path");
const api = require("./routes/index");

const app = express();
const port = 80;
// const port = 4000;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: false }));

app.use("/api", api);

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(port, () => {
  console.log("Groovle listening");
});
