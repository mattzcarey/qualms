// Qualms BACKEND

//Imports
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const mysql = require("mysql");

//Secret database stuff, don't share -_-
const db = mysql.createPool({
  host: "ls-7747fafb702e9b0e95827d986e35040c609dd263.cztwonmsggwh.eu-west-2.rds.amazonaws.com",
  user: "reactUser",
  password: "RandomPass1234",
  database: "qualms",
});

//Setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Get Methods - requests that the client make to us.

app.get("/", (req, res) => {
  res.send("Hello, you shouldn't be here.");
});

//Get Venues
app.get("/api/getvenues", (req, res) => {
  const sqlSelect = "SELECT venuename from venues;";
  db.query(sqlSelect, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//Add venues (will be removed from production)
app.post("/api/addvenue", (req, res) => {
  const venueName = req.body.venuename;
  const sqlInsert = "INSERT INTO venues (venuename) VALUES (?);";
  db.query(sqlInsert, [venueName], (err, result) => {
    res.send(result + err);
  });
});

//Send qualm
app.post("/api/sendqualm", (req, res) => {
  const feedback = req.body.feedback;
  const venue = req.body.venue;
  console.log("Request to insert: " + feedback + " about " + venue);
  const sqlInsert =
    "INSERT INTO feedbackTable (qualmtext, venues_venuename) VALUES (?, ?);";
  db.query(sqlInsert, [feedback, venue], (err, result) => {
    console.log(result + ":" + err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
