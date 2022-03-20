const express = require("express");
const fs = require("fs");
const cors = require("cors");
const db = require("./db_info");

const song = express();

corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

song.use(cors(corsOptions));

song.post("/createsong", (req, res) => {
  const title = req.body.title;
  const artist = req.body.artist;
  const createdBy = req.body.createdBy;
  const randomKey = req.body.randomKey;
  db.query(
    `INSERT INTO groovle.song (title, artist, createdBy, randomKey, createdAt, songLocation) VALUES ("${title}", "${artist}", "${createdBy}", "${randomKey}", now(), "here");`,
    function (error, results) {
      if (error) throw error;
      console.log("song created!");
      res.send("success!");
    }
  );
});

song.get("/song/:randomKey", (req, res) => {
  const randomKey = req.params.randomKey;
  db.query(
    `select * from song where randomKey='${randomKey}'`,
    function (error, result) {
      if (error) throw error;
      if (result.length === 1) {
        const data = {
          songID: result[0].songID,
          title: result[0].title,
          artist: result[0].artist,
          status: result[0].status,
          description: result[0].description,
          createdBy: result[0].createdBy,
          randomKey,
        };
        console.log(data);
        res.send(data);
      } else {
        res.send(false);
      }
    }
  );
});

song.get("/songbyid/:songID", (req, res) => {
  const songID = req.params.songID;
  db.query(
    `select * from song where songID='${songID}'`,
    function (error, result) {
      if (error) throw error;
      if (result.length === 1) {
        const data = {
          title: result[0].title,
          artist: result[0].artist,
          randomKey: result[0].randomKey,
        };
        console.log(data);
        res.send(data);
      } else {
        res.send(false);
      }
    }
  );
});

song.post("/verifykey", (req, res) => {
  const randomKey = req.body.key;
  db.query(
    `select count(*) as cnt from song where randomKey='${randomKey}'`,
    function (error, result) {
      if (error) throw error;
      if (result[0].cnt === 0) {
        console.log("key verified!");
        res.send(true);
      } else {
        console.log("key exists!");
        res.send(false);
      }
    }
  );
});

song.get("/playsong/:songid", (req, res) => {
  const songid = req.params.songid;
  const file = `NAS/song/${songid}.mp3`;
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

module.exports = song;
