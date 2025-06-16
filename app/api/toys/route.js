//src: app/api/toys/route.js
import pool from '../../lib/db';
// GET all toys
export async function GET() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM toys');
    return Response.json(result.rows);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch toys' },
      { status: 500 }
    );
  } finally {
    client.release(); // Only release the client, don't end the pool!
  }
}

// ADD new toy
export async function POST(request) {
  const { name, color } = await request.json();
  const client = await pool.connect();
  try {
    await client.query(
      'INSERT INTO toys (name, color) VALUES ($1, $2)',
      [name, color]
    );
    return Response.json(
      { message: 'Toy added successfully!' },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { error: 'Failed to add toy' },
      { status: 500 }
    );
  } finally {
    client.release(); // Only release the client
  }
}