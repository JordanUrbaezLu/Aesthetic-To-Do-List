//Select DOM Elements
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const sortButton = document.querySelector(".button");
const errorMessage = document.querySelector(".error");


//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
sortButton.addEventListener('click', PrioritySort);

//Functions

function addTodo(e) {
  //Prevent refresh
  e.preventDefault();

  if (todoInput.value.length === 0) {
    document.getElementsByName("input")[0].placeholder = "Error: Invalid Input!"
    return;
  }
  else {
    document.getElementsByName("input")[0].placeholder = "Add To-Do Item...";
  }

  if (todoInput.value.length > 18) {
    todoInput.value ="";
    document.getElementsByName("input")[0].placeholder = "Error: Input too Long!"
    return;
  }
  else {
    document.getElementsByName("input")[0].placeholder = "Add To-Do Item...";
  }

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  var todoPriority = document.querySelector(".priority-options");
  todoDiv.classList.add(todoPriority.value)
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  var span = document.createElement("span")
  span.innerText = "(" + todoPriority.value + ")"
  todoDiv.appendChild(span);

  todoInput.value = "";
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  todoList.appendChild(document.createElement('text'))
  todoList.appendChild(todoDiv);
}

function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function PrioritySort() {
  if (todoList.children.length === 0) {
    return;
  }
  const todos = todoList.childNodes;
  let sortedToDoList = document.createElement("ul")
  sortedToDoList.classList.add("todo-list")

  todos.forEach(function(todo) {
      if (todo.classList !== undefined) {
          if(todo.classList.contains("high-priority")) {
              sortedToDoList.appendChild(document.createElement('text'))
              sortedToDoList.appendChild(todo)
          }         
      }
  })

  todos.forEach(function(todo) {
      if (todo.classList !== undefined) {
          if(todo.classList.contains("medium-priority")) {
              sortedToDoList.appendChild(document.createElement('text'))
              sortedToDoList.appendChild(todo)
          }         
      }
  })

  todos.forEach(function(todo) {
      if (todo.classList !== undefined) {
          if(todo.classList.contains("low-priority")) {
              sortedToDoList.appendChild(document.createElement('text'))
              sortedToDoList.appendChild(todo)
          }         
      }
  })
  sortedToDoList.appendChild(document.createElement('text'))

  while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
  }

  while (sortedToDoList.childNodes.length > 0) {
      todoList.appendChild(sortedToDoList.childNodes[0]);
    }
}
