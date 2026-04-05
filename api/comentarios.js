import pg from 'pg';
const { Pool } = pg;

// Criamos a conexão usando a variável de ambiente exata que a Vercel cria
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function handler(request, response) {
  const client = await pool.connect();

  try {
    if (request.method === 'POST') {
      const { texto } = request.body;
      await client.query('INSERT INTO comentarios (texto) VALUES ($1)', [texto]);
      return response.status(200).json({ mensagem: "Sucesso!" });
    }

    if (request.method === 'GET') {
      const { rows } = await client.query('SELECT * FROM comentarios ORDER BY id DESC');
      return response.status(200).json(rows);
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  } finally {
    client.release(); // Importante para não travar o banco
  }
}
