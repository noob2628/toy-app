// simple-test.js
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query('SELECT NOW() as time')
  .then(res => console.log("✅ Database time:", res.rows[0].time))
  .catch(err => console.error("❌ Connection failed:", err.message))
  .finally(() => pool.end());