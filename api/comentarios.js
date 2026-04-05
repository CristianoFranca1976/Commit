export default function handler(req, res) {
  const temSenha = process.env.POSTGRES_URL ? "SIM, a senha está aqui!" : "NÃO, a senha sumiu!";
  return res.status(200).json({ status: temSenha, url: process.env.POSTGRES_URL ? "URL encontrada" : "URL vazia" });
}
