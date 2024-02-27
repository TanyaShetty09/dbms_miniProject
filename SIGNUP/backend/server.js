const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup"
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
  }
});

app.post('/signup', (req, res) => {
  const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.json("Error");
    }
    return res.json("Success");
  });
});

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  const values = [req.body.email, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error querying data:", err);
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Fail");
    }
  });
});

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
