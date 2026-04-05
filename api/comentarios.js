import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  // 1. Rota para SALVAR (POST)
  if (request.method === 'POST') {
    const { texto } = request.body;
    
    try {
      // O comando SQL puro que aprendemos
      await sql`INSERT INTO comentarios (texto) VALUES (${texto});`;
      return response.status(200).json({ mensagem: "Sucesso!" });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  // 2. Rota para LISTAR (GET)
  if (request.method === 'GET') {
    try {
      const { rows } = await sql`SELECT * FROM comentarios ORDER BY id DESC;`;
      return response.status(200).json(rows);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
