import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();           // โหลด .env ก่อนอื่น

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || process.env.DB_HOST, // ชื่อ
  ssl: { rejectUnauthorized: false },
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

async function createTable() {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS user_details (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100)
    )`);                        // เอาคำว่า "query" ออก
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  }
}

createTable();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
