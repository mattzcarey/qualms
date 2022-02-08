// Qualms BACKEND

//Imports
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const mysql = require("mysql");
const config = require("./config.js");
const auth = require("./middleware/auth");
const Axios = require("axios");
const { response } = require("express");

//Secret database stuff
const db = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});

//Setup Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Import routes
//To do
//const authRouter = require("./routes/auth")

//Setup routes
//app.use("/api/auth..etc", authRouter)

//Get Methods - requests that the client make to us.
app.get("/", (req, res) => {
  res.send("Hello, you shouldn't be here.");
});

//Get Venues
app.get("/getvenues", (req, res) => {
  const sqlSelect = "SELECT venuename from venues;";
  db.query(sqlSelect, (err, result) => {
    res.status(200).send(result);
  });
});

//Add venues (need api key)
app.post("/addvenue", (req, res) => {
  const venueName = req.body.venuename;
  const sqlInsert = "INSERT INTO venues (venuename) VALUES (?);";

  if (!venueName) {
    res.status(418).send({ message: "Need non-empty venueName" });
    return;
  }

  //check api token
  if (auth.verifyToken(req, res)) {
    console.log("API token approved");
    db.query(sqlInsert, [venueName], (err, result) => {
      res.send(result + err);
    });
  } else (
    console.log("token bad")
  )
});

//Send qualm
app.post("/sendqualm", async (req, res) => {

  const human = await validateHuman(req.body.token);

  if (!human) {
    console.log('ReCaptcha calls bot.')
    res.status(400);
    res.json({ errors: ['Potential bot spotted'] });
    return;
  }

  const feedback = req.body.feedback;
  const venue = req.body.venue;
  const score = req.body.score;
  console.log("Request to insert: " + feedback + " about " + venue);
  const sqlInsert =
    "INSERT INTO feedbackTable (qualmtext, venues_venuename, score) VALUES (?, ?, ?);";
  db.query(sqlInsert, [feedback, venue, score], (err, result) => {
    console.log(result + ":" + err);
  });
  res.send("Success")
});

async function validateHuman(reToken) {
  const secret = config.CAPTCHA_SECRET_KEY;
  const response = await Axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${reToken}`
  );
  //const data = response.json();
  isHuman = response.data.success
  return isHuman
  //return false
}

app.listen(config.SERVER_PORT, () => {
  console.log(`Server listening on port ${config.SERVER_PORT}`);
});
