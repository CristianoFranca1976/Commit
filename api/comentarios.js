import pg from 'pg';
const { Pool } = pg;

// Verificação de segurança: se a URL não existir, o servidor avisa em vez de crashar
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL ? process.env.POSTGRES_URL + "?sslmode=require" : "",
});

export default async function handler(request, response) {
  // Se a URL estiver vazia, paramos aqui com um erro claro
  if (!process.env.POSTGRES_URL) {
    return response.status(500).json({ error: "Variável POSTGRES_URL não encontrada no servidor." });
  }

  try {
    const client = await pool.connect();
    
    if (request.method === 'POST') {
      const { texto } = request.body;
      await client.query('INSERT INTO comentarios (texto) VALUES ($1)', [texto]);
      client.release();
      return response.status(200).json({ mensagem: "Sucesso!" });
    }

    if (request.method === 'GET') {
      const { rows } = await client.query('SELECT * FROM comentarios ORDER BY id DESC');
      client.release();
      return response.status(200).json(rows);
    }
  } catch (error) {
    console.error("ERRO DETALHADO:", error.message);
    return response.status(500).json({ error: error.message });
  }
}
