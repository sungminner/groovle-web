var mysql = require("mysql");

var maria = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3307,
  password: "tjdals123",
  database: "groovle",
});

module.exports = maria;
