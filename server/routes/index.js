const express = require("express");
const db = require("./db_info");

const router = express();

router.post("/test", (req, res) => {
  console.log("test called");

  testtext = req.body.testtext;
  console.log(testtext);

  db.query(
    `INSERT INTO groovle.test (data) VALUES ("${testtext}")`,
    function (error, results) {
      if (error) throw error;
      console.log("The solution is: ", results);
      res.send(results);
    }
  );
});

router.get("/show", (req, res) => {
  db.query("select * from test", function (error, results) {
    if (error) throw error;
    console.log("The solution is: ", results);
    res.send(results[1].data);
  });
});

module.exports = router;
