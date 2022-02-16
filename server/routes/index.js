const express = require("express");
const db = require("./db_info");

const router = express();

router.post("/test", (req, res) => {
  title = req.body.title;
  artist = req.body.artist;

  db.query(
    `INSERT INTO groovle.song (title, artist, createdBy, randomKey, createdAt, songLocation) VALUES ("${title}", "${artist}", 1, "aajsde", now(), "here");`,
    function (error, results) {
      if (error) throw error;
      console.log("The solution is: ", results);
      res.send(results);
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
      });
    }
    console.log(data);
    res.send(data);
  });
});

module.exports = router;
