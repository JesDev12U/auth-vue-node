import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_KEY,
  database: "auth",
});

export default pool;
