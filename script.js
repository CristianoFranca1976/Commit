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
    const dados = await response.json();
    
    const lista = document.getElementById('listaComentarios');
    lista.innerHTML = ''; // Limpa a lista atual

    dados.forEach(item => {
        lista.innerHTML += `<li>${item.texto}</li>`;
    });
}

// Carregar ao abrir a página
listarComentarios();
