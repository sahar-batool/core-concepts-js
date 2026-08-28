const list = document.querySelector("#task-list");

export let tasks = [];

export function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks() {
  let saved = localStorage.getItem("tasks");
  let check = saved ? JSON.parse(saved) : [];
  return check;
}

export function renderTask(taskObj) {
  let taskContent = document.createElement("li");

  let textSpan = document.createElement("span");
  textSpan.textContent = taskObj.text;
  taskContent.appendChild(textSpan);

  if (taskObj.completed) {
    taskContent.classList.add("completed");
  }

  let btn = document.createElement("button");
  btn.textContent = "Delete";
  taskContent.appendChild(btn);

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    taskContent.remove();
    tasks = tasks.filter(function (t) {
      return t !== taskObj;
    });
    saveTasks();
  });

  list.appendChild(taskContent);

  taskContent.addEventListener("click", function () {
    taskObj.completed = !taskObj.completed;
    taskContent.classList.toggle("completed");
    saveTasks();
  });
}