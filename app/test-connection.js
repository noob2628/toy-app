import pool from "./lib/db";
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("🎉 Connected successfully!");
    console.log("⏳ Checking if toys table exists...");
    
    const res = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'toys'
      );
    `);
    
    console.log("🧸 Toys table exists?", res.rows[0].exists);
    client.release();
  } catch (err) {
    console.error("💥 Connection failed:", err);
  } finally {
    process.exit();
  }
}

testConnection();
