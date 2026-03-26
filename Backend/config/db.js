const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "02112005",
  database: "QuanLySinhVien",
});

module.exports = pool;
