const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser")
const app = express();
const port = 4000;
const db = "cpet17";
const db_table = "nextjs";


app.listen(port, () => {
    console.log(`🚀 Server started at http://localhost:${port}`)
})

// create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: `${db}`,
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
    var { dateTime, img } = req.body;
  
    // save datetime, imgfile, into the db
    connection.query(`INSERT INTO ${db_table} (date_time, img) VALUES (?, ?);`,
    [dateTime, img],
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

app.get('/show-images', (req, res)=> {
    // Select the last entry from the db
    connection.query(`SELECT * FROM ${db_table} ORDER BY id DESC LIMIT 1;`,
    (err, results)=> {
        try {
            if (results.length > 0) {
                // send a json response containg the image data (blob)
                res.json({'imgData': results[0]['img']});
        } else {
          res.json({ message: "Something went wrong." });
        }
        } catch {
            res.json({ message: err });
        }
    })
})