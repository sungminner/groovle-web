const express = require("express");
const cors = require("cors");
const db = require("./db_info");

const home = express();

corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

home.use(cors(corsOptions));

home.get("/home", (req, res) => {
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
    res.send(data);
  });
});

module.exports = home;
