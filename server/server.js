const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser")
const app = express();
const fs = require('fs');
const port = 4000;
const db_table = "nextjs"


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

// Save datetime and image to database
app.post('/capture', (req, res)=> {
  // get the request json
  var { dateTime, path } = req.body;

  // save datetime, imgfile, into the db
  connection.query(`INSERT INTO ${db_table} (date_time, img) VALUES (?, ?);`,
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

// Fetch data
app.get('/show-images', (req, res)=> {
  // Select the last entry from the db
  let array = [];
  connection.query(`SELECT * FROM ${db_table} ORDER BY id DESC LIMIT 10;`,
  (err, results)=> {
      try {
          if (results.length > 0) {
            for ( i=0; i<results.length; i++ ) {
              array.unshift(results[i])
            }
            // send a json response containg the image data (blob)
            res.json({'imgData': array});
      } else {
        res.json({ message: "Something went wrong." });
      }
      } catch {
          res.json({ message: err });
      }
  })
})