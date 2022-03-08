const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { default: axios } = require("axios");
const db = require("./db_info");
const { v4 } = require("uuid");

const router = express();

corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
router.use(cors(corsOptions));

router.post("/createuser", async (req, res) => {
  const googleID = req.body.googleID.split("").reverse().join("");
  const username = req.body.username;
  const uname = req.body.name;
  db.query(
    `INSERT INTO groovle.user (googleID, username, name, registeredAt) VALUES ("${googleID}", "${username}", "${uname}", now());`,
    function (error, results) {
      if (error) throw error;
      console.log("user created!");
      res.send(true);
    }
  );
});

router.post("/updateuser", async (req, res) => {
  const googleID = req.body.id.split("").reverse().join("");
  const key = req.body.key;
  const value = req.body.value;
  db.query(
    `UPDATE user SET ${key} = '${value}' WHERE (googleID = '${googleID}');`,
    function (error, results) {
      if (error) throw error;
      console.log("user updated!");
      res.send(true);
    }
  );
});

router.post("/login", async (req, res) => {
  const tokenId = req.body.tokenId;
  await axios
    .get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`)
    .then((response) => {
      db.query(
        `select count(*) as cnt from user where googleID="${response.data.sub}"`,
        function (error, result) {
          if (error) throw error;
          if (result[0].cnt === 1) {
            console.log("user logged in!");
            res.send({
              id: response.data.sub.split("").reverse().join(""),
            });
          } else {
            console.log("no user!");
            res.send(false);
          }
        }
      );
    });
});

router.get("/userbyid/:id", (req, res) => {
  const googleID = req.params.id.split("").reverse().join("");
  db.query(
    `select * from user where googleID='${googleID}'`,
    function (error, result) {
      if (error) throw error;
      if (result.length === 1) {
        //id값에 해당하는 user가 있으면 userObj 반환, 없으면 false 반환
        const data = {
          userID: result[0].userID,
          username: result[0].username,
          name: result[0].name,
          picture: result[0].picture,
          mainSession: result[0].mainSession,
          bio: result[0].bio,
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
  const title = req.body.title;
  const artist = req.body.artist;
  const randomKey = req.body.randomKey;
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
          songID: result[0].songID,
          title: result[0].title,
          artist: result[0].artist,
          description: result[0].description,
          createdBy: result[0].createdBy,
          synthReady: result[0].synthReady,
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

router.get("/session/:songID", (req, res) => {
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

router.post("/createsession", (req, res) => {
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

router.post("/uploadsessionfile", (req, res) => {
  const sessionID = req.body.sessionID;
  const data = req.body.data;
  const extension = req.body.extension;
  const filename = v4();
  const file = Buffer.from(data, "base64");
  fs.writeFile(`NAS/session/${filename}.${extension}`, file, (err) => {
    if (err) throw err;
    db.query(
      `UPDATE session SET filename = '${filename}.${extension}' WHERE (sessionID = '${sessionID}');`,
      function (error, results) {
        if (error) throw error;
        console.log("audio file saved!");
        res.send(true);
      }
    );
  });
});

router.get("/playsession/:filename", (req, res) => {
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

module.exports = router;
