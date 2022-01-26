const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `../${process.env.NODE_ENV}.env`),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  DB_HOST: process.env.DB_HOST,
  SERVER_PORT: process.env.SERVER_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  X_ACCESS_TOKEN: process.env.X_ACCESS_TOKEN,
  CAPTCHA_SECRET_KEY: process.env.CAPTCHA_SECRET_KEY
};
