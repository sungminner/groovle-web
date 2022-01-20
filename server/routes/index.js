const express = require("express");
const router = express();
const db = require("./db_info");

router.post("/test", (req, res) => {
  console.log("test called");

  testtext = req.body.testtext;
  console.log(testtext);

  db.query(
    `INSERT INTO groovle.test (data) VALUES ("${testtext}")`,
    function (error, results) {
      if (error) throw error;
      console.log("The solution is: ", results);
    }
  );
});

router.get("/test", (req, res) => {
  db.query("select * from test", function (error, results) {
    if (error) throw error;
    console.log("The solution is: ", results);
    res.send(results);
  });
});

module.exports = router;
