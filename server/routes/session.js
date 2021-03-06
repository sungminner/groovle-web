const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
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

session.get("/getoffset/:sessionid", (req, res) => {
  const sessionid = req.params.sessionid;
  db.query(
    `select syncOffset from session where sessionID='${sessionid}'`,
    function (error, result) {
      if (error) throw error;
      if (result.length === 1) {
        const data = {
          syncOffset: result[0].syncOffset,
        };
        res.send(data);
      } else {
        res.send(false);
      }
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
          syncOffset: results[i].syncOffset,
          filename: results[i].filename,
          instrument: results[i].instrument,
          userID: results[i].userID,
          username: results[i].username,
          picture: results[i].picture,
        });
      }
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
  const offset = req.body.offset;
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
      `UPDATE session SET syncOffset = ${offset}, filename = '${filename}.${extension}' WHERE (sessionID = '${sessionID}');
      UPDATE song SET status = ${newStatus} WHERE (songID = '${songID}');`,
      function (error, results) {
        if (error) throw error;
        console.log("audio file saved!");
        res.send(true);
      }
    );
  });
});

session.post("/editsession", (req, res) => {
  const songID = req.body.songID;
  const sessionID = req.body.sessionID;
  const curStatus = req.body.curStatus;
  const offset = req.body.offset;
  let newStatus;
  if (curStatus === 0 || curStatus === 1) {
    newStatus = 1;
  } else if (curStatus === 2 || curStatus === 3) {
    newStatus = 3;
  }
  db.query(
    `UPDATE session SET syncOffset = ${offset} WHERE (sessionID = '${sessionID}');
    UPDATE song SET status = ${newStatus} WHERE (songID = '${songID}');`,
    function (error, results) {
      if (error) throw error;
      console.log("session edited!");
      res.send(true);
    }
  );
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

session.post("/synthesizeonefile", (req, res) => {
  const filename = req.body.filename;
  const songID = req.body.songID;
  const file = `NAS/session/${filename}`;
  const destination = `NAS/song/${songID}.mp3`;
  fs.copyFile(file, destination, (err) => {
    if (err) throw err;
    db.query(
      `UPDATE song SET status = 2 WHERE (songID = '${songID}');`,
      function (error, results) {
        if (error) throw error;
        console.log("synthesized one file!");
        res.send(true);
      }
    );
  });
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

session.get("/loadsession/:filename", (req, res) => {
  const filename = req.params.filename;
  const file = `../../NAS/session/${filename}`;
  res.sendFile(path.join(__dirname, file));
});

// session.get("/loadsession/:filename", (req, res) => {
//   const filename = req.params.filename;
//   const file = `NAS/session/${filename}`;
//   fs.readFile(file, function (err, result) {
//     res.send(result.toString("base64"));
//   });
// });

module.exports = session;
