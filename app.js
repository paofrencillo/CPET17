const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser")
const app = express();
const fs = require('fs');
const port = 3000;
const db_table = "ta2x"


// listen to port
app.listen(port);

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/capture', (req, res)=> {
  // get the request json
  var { dateTime, path } = req.body;

  // read file from the path from the json
  // var img = fs.readFileSync(path);
  // console.log(img);

  // save datetime, imgfile, into the db
  connection.query(`INSERT INTO ${db_table} (dt, img) VALUES (?, ?);`,
  [dateTime, path],
  (err, result)=> {
    try {
      if (result.affectedRows > 0) {
        res.json({ data: "Success" });
      } else {
        res.json({ message: "Something went wrong." });
      }
    } catch {
      res.json({ message: err });
    }
  })
})
