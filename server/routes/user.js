const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const db = require("./db_info");

const user = express();

corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

user.use(cors(corsOptions));

user.post("/createuser", async (req, res) => {
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

user.post("/updateuser", async (req, res) => {
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

user.post("/login", async (req, res) => {
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

user.get("/userbyid/:id", (req, res) => {
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
        res.send(data);
      } else {
        res.send(false);
      }
    }
  );
});

module.exports = user;
