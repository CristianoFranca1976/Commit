import { createPool } from '@vercel/postgres';

export default async function handler(request, response) {
  // Criamos a ligação aqui dentro para garantir que ele lê as variáveis novas
  const db = createPool();

  if (request.method === 'POST') {
    const { texto } = request.body;
    try {
      await db.sql`INSERT INTO comentarios (texto) VALUES (${texto});`;
      return response.status(200).json({ mensagem: "Sucesso!" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: error.message });
    }
  }

  if (request.method === 'GET') {
    try {
      const { rows } = await db.sql`SELECT * FROM comentarios ORDER BY id DESC;`;
      return response.status(200).json(rows);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: error.message });
    }
  }
}
