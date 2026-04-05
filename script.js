// Função para ENVIAR um comentário
async function enviarComentario() {
    const input = document.getElementById('comentarioInput');
    const texto = input.value;

    await fetch('/api/comentarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: texto })
    });

    input.value = ''; // Limpa o campo
    listarComentarios(); // Atualiza a lista no ecrã
}

// Função para LISTAR os comentários vindos do banco
async function listarComentarios() {
    const response = await fetch('/api/comentarios');
    
    // Se der erro 500, vamos ver o texto do erro antes de tentar converter para JSON
    if (!response.ok) {
        const erroTexto = await response.text();
        console.error("Erro do Servidor:", erroTexto);
        return;
    }

    const dados = await response.json();
    // ... resto do código
}


// Carregar ao abrir a página
listarComentarios();
