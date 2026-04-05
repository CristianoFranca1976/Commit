import { db } from '@vercel/postgres'; // Mudamos de 'sql' para 'db'

export default async function handler(request, response) {
  const client = await db.connect(); // Isto força a ligação usando as variáveis do painel

  if (request.method === 'POST') {
    const { texto } = request.body;
    try {
      await client.sql`INSERT INTO comentarios (texto) VALUES (${texto});`;
      return response.status(200).json({ mensagem: "Sucesso!" });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  if (request.method === 'GET') {
    try {
      const { rows } = await client.sql`SELECT * FROM comentarios ORDER BY id DESC;`;
      return response.status(200).json(rows);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
