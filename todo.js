let todoList = [];

if (localStorage.getItem("items")) {
  todoList = JSON.parse(localStorage.getItem("items"));
  displayItems();
  toggleClearButton();
}

function addTodo() {
  let inputElement = document.querySelector("#todo-input");
  let dateElement = document.querySelector("#todo-date");
  let todoDate = dateElement.value;
  let todoItem = inputElement.value;

  if (todoItem.trim() === "") {
    alert("Please enter a task");
    return;
  }

  if (todoDate === "") {
    alert("Please select a due date");
    return;
  }

  todoList.push({ item: todoItem, dueDate: todoDate });
  inputElement.value = "";
  dateElement = "";
  localStorage.setItem("items", JSON.stringify(todoList));
  displayItems();
  toggleClearButton();
}

function displayItems() {
  let containerElement = document.querySelector(".todo-container");

  let newHtml = "";

  for (let i = 0; i < todoList.length; i++) {
    let { item, dueDate, completed } = todoList[i];
    let completedClass = completed ? "completed" : "";
    newHtml += `
            <input type="checkbox" onchange="toggleCompletion(${i})" ${
      completed ? "checked" : ""
    }>
            <span class="${completedClass}">${item}</span>
            <span>${dueDate}</span>
            <button class="btn-delete" onclick="deleteItem(${i})">Delete</button>
    `;
  }
  containerElement.innerHTML = newHtml;
}

function toggleCompletion(index) {
  todoList[index].completed = !todoList[index].completed;
  localStorage.setItem("items", JSON.stringify(todoList));
  displayItems();
}

function deleteItem(index) {
  todoList.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(todoList));
  displayItems();
  toggleClearButton();
}

function toggleClearButton() {
  let clearButton = document.getElementById("clear-button");
  if (todoList.length > 0) {
    clearButton.style.display = "block";
  } else {
    clearButton.style.display = "none";
  }
}

function clearAll() {
  todoList.splice(0, todoList.length);
  localStorage.setItem("items", JSON.stringify(todoList));
  displayItems();
  toggleClearButton();
}
