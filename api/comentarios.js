import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    // Teste de conexão direto
    const { rows } = await sql`SELECT NOW();`;
    return res.status(200).json({ status: "Conectado!", data: rows });
  } catch (error) {
    // Se cair aqui, o erro nos Logs da Vercel dirá exatamente o que falta
    console.error("ERRO NO BANCO:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
