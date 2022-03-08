const express = require("express");
const cors = require("cors");
const path = require("path");
const { PythonShell } = require("python-shell");
const api = require("./routes/index");

const app = express();
const port = 80;
// const port = 4000;

corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: false }));

app.use("/api", api);

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.post("/synthesize", (req, res) => {
  console.log("synthesize called");
  songID = req.body.songID;

  const options = {
    mode: "text",
    pythonPath: "/usr/bin/python3",
    scriptPath: "/home/groovle/groovle-web/server/python",
    // pythonPath: "C:/Users/sm185/anaconda3/python.exe",
    // scriptPath: "C:/Users/sm185/Desktop/code/react/groovle-web/server/python",
    pythonOptions: ["-u"], // get print results in real-time
    args: ["synthesize", songID],
  };

  PythonShell.run("main.py", options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log("results: %j", results);
    // 결과 받으면 합성 끝났다고 클라이언트에 표시
  });
});

app.listen(port, () => {
  console.log("Groovle listening");
});
