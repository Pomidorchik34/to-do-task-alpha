const btn = document.getElementById("btn");
const editBtn = document.querySelector(".edit");
const input = document.querySelector(".task-name");
const taskList = document.querySelector(".task-list");
const form = document.getElementById("form");
let i = 1;
function validate() {
  if (input.value == "") {
    alert("task can't be without name");
    return false;
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
    const isValid = validate();
    if (isValid == false) {
      return;
    }
    let tasks = getTasks();
    const task = {
      name: input.value,
      id: Date.now(),
      blockId: i,
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    form.reset();

    location.reload();
  });
function createTask(task) {
  i++;
  return `<li class="task" id="${task.blockId}">
          <h1 class="task-heading">${task.name}</h1>
          <div class="task-btns">
            <button id="${task.id}" class="edit">Edit</button>
            <button data-id="${task.id}" class="delete">Delete</button>
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

  const deleteBtns = document.querySelectorAll(".delete");

  deleteBtns.length > 0 &&
    deleteBtns.forEach(function (element) {
      element.addEventListener("click", function (event) {
        event.preventDefault();
        let id = this.getAttribute("data-id");
        console.log(id);
        let isDelete = confirm("Are you want to delete?");
        if (isDelete && id) {
          let copiedTasks = JSON.parse(JSON.stringify(tasks));
          copiedTasks = copiedTasks.filter(function (el) {
            return el.id != id;
          });

          localStorage.setItem("tasks", JSON.stringify(copiedTasks));
          window.location.reload();
        }
      });
    });
});
