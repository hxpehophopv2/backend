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
  pool.query('SELECT * FROM user_details', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch data' });
    } else {
      res.json({ message: 'Data fetched successfully', data: result.rows });
    }
})});

app.post('/data', (req, res) => {
  const { name, email } = req.body;
  pool.query('INSERT INTO user_details (name, email) VALUES ($1, $2)', [name, email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to insert data' });
    } else {
      res.json({ message: 'Data inserted successfully' });
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
