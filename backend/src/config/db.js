const dotenv = require("dotenv");
dotenv.config();
const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.getConnection()
  .then(() => {
    console.log("Connected to MySQL");
  })
  .catch((err) => {
    console.error("Error connecting to MySQL:", err);
  });

module.exports = connection;
