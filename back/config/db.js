import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const testDBConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected");
    connection.release();
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
};

export default pool;
