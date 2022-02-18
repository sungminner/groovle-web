const express = require("express");
const db = require("./db_info");

const router = express();

router.post("/createsong", (req, res) => {
  title = req.body.title;
  artist = req.body.artist;
  randomKey = req.body.randomKey;
  db.query(
    `INSERT INTO groovle.song (title, artist, createdBy, randomKey, createdAt, songLocation) VALUES ("${title}", "${artist}", 1, "${randomKey}", now(), "here");`,
    function (error, results) {
      if (error) throw error;
      console.log("The solution is: ", results);
      res.send("success!");
    }
  );
});

router.get("/show", (req, res) => {
  db.query("select * from song", function (error, results) {
    if (error) throw error;
    let data = [];
    for (let i = 0; i < results.length; i++) {
      data.push({
        songID: results[i].songID,
        title: results[i].title,
        artist: results[i].artist,
        randomKey: results[i].randomKey,
        description: results[i].description,
      });
    }
    console.log(data);
    res.send(data);
  });
});

router.get("/song/:randomKey", (req, res) => {
  const randomKey = req.params.randomKey;
  db.query(
    `select * from song where randomKey='${randomKey}'`,
    function (error, result) {
      if (error) throw error;
      const data = {
        title: result[0].title,
        artist: result[0].artist,
        description: result[0].description,
      };
      console.log(data);
      res.send(data);
    }
  );
});

router.post("/verifykey", (req, res) => {
  const randomKey = req.params.randomKey;
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

module.exports = router;
