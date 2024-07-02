const btn = document.getElementById("btn");
const editBtn = document.querySelector(".edit");
const deleteBtn = document.querySelector(".delete");
const input = document.querySelector(".task-name");
const taskList = document.querySelector(".task-list");
const form = document.getElementById("form");
function validate() {
  if (input.value == "") {
    return false;
    alert("error");
  }
  return true;
}
function getTasks() {
  let tasks = [];
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
}
btn &&
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const isValid = validate();
    if (isValid == false) {
      return;
    }
    let tasks = getTasks();
    const task = {
      name: input.value,
      id: Date.now(),
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    form.reset();
  });
function createTask() {
  return `        <li class="task">
          <h1 class="task-heading">${task.name}</h1>
          <div class="task-btns">
            <button id="${task.id}">edit</button>
            <button id="${task.id}" >Deleete</button>
          </div>
        </li>`;
}

document.addEventListener("DOMContentLoaded", (event) => {
  let tasks = getTasks();
  console.log(tasks);
  tasks.length > 0 &&
    tasks.forEach((value) => {
      let card = createTask(value);
      taskList.innerHTML += card;
    });
});
