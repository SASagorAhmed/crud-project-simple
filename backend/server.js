const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

db.connect((err) => {
  if (err) return console.log(err);

  db.query("CREATE DATABASE IF NOT EXISTS united_medical_college_hospital", () => {
    db.query("USE united_medical_college_hospital", () => {

      db.query(`
        CREATE TABLE IF NOT EXISTS patient (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
          age INT,
          disease VARCHAR(100)
        )
      `);
    });
  });
});

app.post("/patients", (req, res) => {
  const { name, age, disease } = req.body;
  db.query(
    "INSERT INTO patient (name, age, disease) VALUES (?, ?, ?)",
    [name, age, disease],
    (err, result) => {
      if (err) return res.json(err);
      res.json("Added");
    }
  );
});

app.get("/patients", (req, res) => {
  db.query("SELECT * FROM patient", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

app.put("/patients/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, disease } = req.body;

  db.query(
    "UPDATE patient SET name=?, age=?, disease=? WHERE id=?",
    [name, age, disease, id],
    (err, result) => {
      if (err) return res.json(err);
      res.json("Updated");
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});