import { tasks, saveTasks, renderTask, loadTasks } from "./taskList.js";


const input = document.querySelector("#input");
document.querySelector("#add-btn").addEventListener("click", function () {
  let newTask = { text: input.value, completed: false };
  tasks.push(newTask);
  renderTask(newTask);
  saveTasks();
  input.value = "";
});

loadTasks().forEach(function(taskObj){;
tasks.push(taskObj)
  renderTask(taskObj);
})