const config = require("../config.js");

const verifyToken = (req, res) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    res.status(403).send({
      message: "No token provided!",
    });
    return false
  }

  if (token !== config.X_ACCESS_TOKEN) {
    res.status(401).send({
      message: "Unauthorised!",
    });
    return false

  } else if (token === config.X_ACCESS_TOKEN) {
    return true

  } else { 
    res.status(503).send({
      message: "Something went wrong"
    })
    return false
  } 
}

const auth = {
  verifyToken: verifyToken
}

module.exports = auth
