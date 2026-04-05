let tasks = JSON.parse(localStorage.getItem('minhasTarefas')) || [];

function addTask() {
    const input = document.getElementById('taskInput');
    if (input.value === '') return;

    const newTask = {
        id: Date.now(),
        text: input.value
    };

    tasks.push(newTask);
    saveAndRender();
    input.value = '';
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}


function saveAndRender() {
    localStorage.setItem('minhasTarefas', JSON.stringify(tasks));
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    tasks.forEach(task => {
        list.innerHTML += `
            <li>
                ${task.text} 
                <button onclick="deleteTask(${task.id})">Remover</button>
            </li>`;
    });
}

// Carregar dados ao abrir a página
saveAndRender();
