const input = document.querySelector('#input');
const list = document.querySelector('#task-list');

let tasks = []; // the single source of truth for all task data

// ---------- localStorage helpers ----------

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let saved = localStorage.getItem('tasks');
    let check = saved ? JSON.parse(saved) : [];
    return check;
}

// ---------- rendering ----------

function renderTask(taskObj) {
    let taskContent = document.createElement('li');
    taskContent.textContent = taskObj.text;

    let btn = document.createElement('button');
    btn.textContent = 'Delete';
    taskContent.appendChild(btn);

    btn.addEventListener('click', function(e){
        e.stopPropagation();
        taskContent.remove();
    });

    list.appendChild(taskContent);

    taskContent.addEventListener('click', function(){
        taskContent.classList.toggle('completed');
    });
}

// ---------- add task ----------

document.querySelector('#add-btn').addEventListener('click', function(){
    let newTask = { text: input.value, completed: false };
    tasks.push(newTask);
    renderTask(newTask);
    saveTasks();
    input.value = '';
});

// ---------- load on page start ----------

tasks = loadTasks();
tasks.forEach(function(taskObj){
    renderTask(taskObj);
});