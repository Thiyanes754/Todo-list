let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all"; // 'all', 'active', 'completed'

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Filter logic
    if (currentFilter === "active" && task.completed) {
      li.style.display = "none";
    } else if (currentFilter === "completed" && !task.completed) {
      li.style.display = "none";
    }

    if (task.completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleComplete(index);

    const span = document.createElement("span");
    span.textContent = task.text;
    span.style.flex = "1";
    span.style.marginLeft = "10px";

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteTask(index);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

window.onload = renderTasks;
