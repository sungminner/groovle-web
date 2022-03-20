var mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "groovle01",
  port: 3300,
  password: "Groovle2022!!",
  database: "groovle",
  multipleStatements: true,
});

// var db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   port: 3307,
//   password: "tjdals123",
//   database: "groovle",
//   multipleStatements: true,
// });

db.connect();
module.exports = db;
