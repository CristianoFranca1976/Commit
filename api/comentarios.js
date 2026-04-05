import pg from 'pg';
const { Pool } = pg;

// Criamos a conexão manualmente usando a URL que está na sua Vercel
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function handler(request, response) {
  const client = await pool.connect();

  try {
    // 1. Rota para SALVAR (POST)
    if (request.method === 'POST') {
      const { texto } = request.body;
      await client.query('INSERT INTO comentarios (texto) VALUES ($1)', [texto]);
      return response.status(200).json({ mensagem: "Sucesso!" });
    }

    // 2. Rota para LISTAR (GET)
    if (request.method === 'GET') {
      const { rows } = await client.query('SELECT * FROM comentarios ORDER BY id DESC');
      return response.status(200).json(rows);
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: error.message });
  } finally {
    client.release(); // Liberta a conexão para não travar o banco
  }
}

