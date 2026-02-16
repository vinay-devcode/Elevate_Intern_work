const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


document.addEventListener("DOMContentLoaded", loadTasks);


addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  createTaskElement(taskText);

  saveTask(taskText);

  taskInput.value = "";
}


function createTaskElement(taskText, completed = false) {

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  if (completed) {
    span.classList.add("completed");
  }

 
  span.addEventListener("click", function () {
    span.classList.toggle("completed");
    updateLocalStorage();
  });

 
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}


function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push({ text: taskText, completed: false });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
}


function updateLocalStorage() {
  const tasks = [];

  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.querySelector("span").classList.contains("completed");

    tasks.push({ text, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}