var mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3307,
  password: "tjdals123",
  database: "groovle",
});

db.connect();
module.exports = db;
