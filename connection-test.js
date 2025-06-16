// connection-test.js
console.log("🐛 Starting connection debug...");

// 1. Manually paste your connection string here (temporarily)
const TEST_URL = "postgres://neondb_owner:npg_Vi5npqtCv8zL@ep-flat-cell-a4ysdzi0-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require";

// 2. Simple connection test
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: TEST_URL,
  ssl: { rejectUnauthorized: false }
});

console.log("🔌 Testing connection to:", TEST_URL.substring(0, 30) + "...");

pool.query('SELECT NOW() as time')
  .then(res => {
    console.log("✅ Success! Database time:", res.rows[0].time);
  })
  .catch(err => {
    console.error("❌ Failed to connect:", err.message);
    console.log("\n🔧 Troubleshooting Tips:");
    console.log("1. Check your connection string is 100% correct");
    console.log("2. Ensure your Neon database is active");
    console.log("3. Try disabling firewall temporarily");
  })
  .finally(() => pool.end());