//src: app/api/toys/[id]/route.js
import pool from '../../../lib/db';

export async function GET(_, { params }) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM toys WHERE id = $1',
      [params.id]
    );
    return Response.json(result.rows[0]);
  } finally {
    client.release();
  }
}

export async function PUT(request, { params }) {
  const { name, color } = await request.json();
  const client = await pool.connect();
  try {
    await client.query(
      'UPDATE toys SET name=$1, color=$2 WHERE id=$3',
      [name, color, params.id]
    );
    return Response.json({ message: 'Toy updated!' });
  } finally {
    client.release();
  }
}

export async function DELETE(_, { params }) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM toys WHERE id = $1', [params.id]);
    return Response.json({ message: 'Toy deleted!' });
  } finally {
    client.release();
  }
}