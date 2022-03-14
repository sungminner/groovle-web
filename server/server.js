const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const { PythonShell } = require("python-shell");
const api = require("./routes/index");
const db = require("./routes/db_info");

const app = express();

corsOptions = {
  origin: "https://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: false }));

app.use("/api", api);

app.use(express.static(path.join(__dirname, "../build")));

app.get(
  "/.well-known/pki-validation/1A0F678C7018399D9138998C36DA54A1.txt",
  (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        "../.well-known/pki-validation",
        "1A0F678C7018399D9138998C36DA54A1.txt"
      )
    );
  }
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.post("/synthesize", (req, res) => {
  console.log("synthesize called");
  files = req.body.files;
  songID = req.body.songID;

  const options = {
    mode: "text",
    pythonPath: "/usr/bin/python3",
    scriptPath: "/home/groovle/groovle-web/server/python",
    // pythonPath: "C:/Users/sm185/anaconda3/python.exe",
    // scriptPath: "C:/Users/sm185/Desktop/code/react/groovle-web/server/python",
    pythonOptions: ["-u"], // get print results in real-time
    args: ["synthesize", JSON.stringify(files), songID],
  };

  PythonShell.run("main.py", options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log("results: %j", results);
    if (results[1] === "True") {
      db.query(
        `UPDATE song SET synthReady = 1 WHERE (songID = '${songID}');`,
        function (error, results) {
          if (error) throw error;
          console.log("synthesized!");
          res.send(true);
        }
      );
    }
    // 결과 받으면 합성 끝났다고 클라이언트에 표시
  });
});

const options = {
  cert: fs.readFileSync(path.join(__dirname, "ssl/certificate.crt")),
  ca: fs.readFileSync(path.join(__dirname, "ssl/ca_bundle.crt")),
  key: fs.readFileSync(path.join(__dirname, "ssl/private.key")),
};

const httpServer = http.createServer((req, res) => {
  res.statusCode = 301;
  res.setHeader("Location", `https://groovle.site${req.url}`);
  res.end();
});

httpServer.listen(80, () => {
  console.log("Groovle listening 80");
});

const httpsServer = https.createServer(options, app);

httpsServer.listen(443, () => {
  console.log("Groovle listening 443");
});
