const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const db_table = "ta2x"

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cpet17", //change this into custom database name
});

// throw error if connection failed
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to Database!");
});

//insert method using GET
//req.query... 'shortned'
//users2 is the table name
app.get("/insert", (req, res) => {
  connection.query(
    `INSERT INTO ${db_table} (dt) VALUES (?);`,
    [
      req.query.f,
      req.query.l,
      req.query.p,
      req.query.a1,
      req.query.a2,
      req.query.e,
    ],
    function () {
      try {
        console.log(req.query);
        res.send("INSERTED SUCCESSFULLY");
      } catch (err) {
        res.send(Error, `${err}`);
      }
    }
  );
});

// listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});