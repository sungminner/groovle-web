const express = require("express");
const { default: axios } = require("axios");
const db = require("./db_info");

const router = express();

router.post("/createuser", async (req, res) => {
  tokenId = req.body.tokenId;
  await axios
    .get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`)
    .then((response) => {
      db.query(
        `INSERT INTO groovle.user (googleID, registeredAt) VALUES ("${response.data.sub}", now());`,
        function (error, results) {
          if (error) throw error;
          console.log("user created!");
          res.send({
            id: response.data.sub.split("").reverse().join(""),
          });
        }
      );
    });
});

router.get("/userbyid/:id", (req, res) => {
  const googleID = req.params.id;
  db.query(
    `select * from user where googleID='${googleID}'`,
    function (error, result) {
      if (error) throw error;
      if (result.length === 1) {
        //id값에 해당하는 user가 있으면 userObj 반환, 없으면 false 반환
        const data = {
          name: result[0].name,
          username: result[0].username,
          picture: result[0].picture,
        };
        console.log(data);
        res.send(data);
      } else {
        res.send(false);
      }
    }
  );
});

router.post("/createsong", (req, res) => {
  title = req.body.title;
  artist = req.body.artist;
  randomKey = req.body.randomKey;
  db.query(
    `INSERT INTO groovle.song (title, artist, createdBy, randomKey, createdAt, songLocation) VALUES ("${title}", "${artist}", 1, "${randomKey}", now(), "here");`,
    function (error, results) {
      if (error) throw error;
      console.log("song created!");
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
      if (result.length === 1) {
        const data = {
          title: result[0].title,
          artist: result[0].artist,
          description: result[0].description,
        };
        console.log(data);
        res.send(data);
      } else {
        res.send(false);
      }
    }
  );
});

router.get("/songbyid/:songID", (req, res) => {
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
