const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { v4 } = require("uuid");
const db = require("./db_info");

const session = express();

corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

session.use(cors(corsOptions));

session.post("/createsession", (req, res) => {
  const userID = req.body.userID;
  const songID = req.body.songID;
  db.query(
    `INSERT INTO groovle.session (createdBy, songID, createdAt) VALUES ("${userID}", "${songID}", now());`,
    function (error, results) {
      if (error) throw error;
      console.log("session created!");
      res.send(true);
    }
  );
});

session.get("/session/:songID", (req, res) => {
  const songID = req.params.songID;
  db.query(
    `select * from session left join user on session.createdBy = user.userID where songID='${songID}'`,
    function (error, results) {
      if (error) throw error;
      let data = [];
      for (let i = 0; i < results.length; i++) {
        data.push({
          sessionID: results[i].sessionID,
          createdBy: results[i].createdBy,
          createdAt: results[i].createdAt,
          filename: results[i].filename,
          instrument: results[i].instrument,
          userID: results[i].userID,
          username: results[i].username,
          picture: results[i].picture,
        });
      }
      console.log(data);
      res.send(data);
    }
  );
});

session.post("/uploadsessionfile", (req, res) => {
  const songID = req.body.songID;
  const sessionID = req.body.sessionID;
  const curStatus = req.body.curStatus;
  const data = req.body.data;
  const extension = req.body.extension;
  const filename = v4();
  let newStatus;
  if (curStatus === 0 || curStatus === 1) {
    newStatus = 1;
  } else if (curStatus === 2 || curStatus === 3) {
    newStatus = 3;
  }
  const file = Buffer.from(data, "base64");
  fs.writeFile(`NAS/session/${filename}.${extension}`, file, (err) => {
    if (err) throw err;
    db.query(
      `UPDATE session SET filename = '${filename}.${extension}' WHERE (sessionID = '${sessionID}');
      UPDATE song SET status = ${newStatus} WHERE (songID = '${songID}');`,
      function (error, results) {
        if (error) throw error;
        console.log("audio file saved!");
        res.send(true);
      }
    );
  });
});

session.post("/deletesession", (req, res) => {
  const songID = req.body.songID;
  const sessionID = req.body.sessionID;
  const curStatus = req.body.curStatus;
  const filename = req.body.filename;
  let newStatus;
  if (curStatus === 0 || curStatus === 1) {
    newStatus = 1;
  } else if (curStatus === 2 || curStatus === 3) {
    newStatus = 3;
  }
  db.query(
    `DELETE FROM session WHERE (sessionID = '${sessionID}');
    UPDATE song SET status = ${newStatus} WHERE (songID = '${songID}');`,
    function (error, results) {
      if (error) throw error;
      if (fs.existsSync(`NAS/session/${filename}`)) {
        fs.unlink(`NAS/session/${filename}`, (err) => {
          if (err) throw err;
          console.log("file deleted!");
        });
      }
      console.log("session deleted!");
      res.send(true);
    }
  );
});

session.get("/playsession/:filename", (req, res) => {
  const filename = req.params.filename;
  const file = `NAS/session/${filename}`;
  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === "ENOENT") {
        // 404 Error if file not found
        return res.sendStatus(404);
      }
      res.end(err);
    }
    var range = req.headers.range;
    if (!range) {
      // 416 Wrong range
      return res.sendStatus(416);
    }
    var positions = range.replace(/bytes=/, "").split("-");
    var start = parseInt(positions[0], 10);
    var total = stats.size;
    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    var chunksize = end - start + 1;

    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "audio/*",
    });

    var stream = fs
      .createReadStream(file, { start: start, end: end })
      .on("open", () => {
        stream.pipe(res);
      })
      .on("error", (err) => {
        res.end(err);
      });
  });
});

module.exports = session;
