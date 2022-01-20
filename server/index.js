const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "ls-7747fafb702e9b0e95827d986e35040c609dd263.cztwonmsggwh.eu-west-2.rds.amazonaws.com",
    user: "reactUser",
    password: "RandomPass1234",
    database: "qualms"
})

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get("/venue", (req,res) => {
    const sqlInsert = "INSERT INTO venues (venuename) VALUES ('mcdonalds');"
    db.query(sqlInsert, (err, result) => {
        res.send(result + err);
    })
});

app.get("/", (req,res) => {
    res.send("hello, you shouldn't be here.");
});

app.get("/api/get", (req,res) => {

    const sqlInsert = "INSERT INTO feedbackTable (qualmtext, venues_venuename) VALUES (?, 'mcdonalds');"
    db.query(sqlInsert,[feedback, venue], (err, result) => {
        console.log(result + err);
    })
});

app.post("/api/insert", (req,res) => {
    const feedback = req.body.feedback
    const venue = req.body.venue
    console.log("Request to insert: " + feedback + " about " + venue);
    const sqlInsert = "INSERT INTO feedbackTable (qualmtext, venues_venuename) VALUES (?, 'mcdonalds');"
    db.query(sqlInsert,[feedback, venue], (err, result) => {
        console.log(result + err);
    })
});

app.listen(3001, () => {
    console.log('running on port 3001')
});