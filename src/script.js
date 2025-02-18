const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-btn");
const todoList = document.getElementById("todo-list");
const todoEmpty = document.getElementById("todo-empty");

let editMode = false;
let editItem = null;

const BUTTON_TEXTS = {
  ADD: "Add Todo",
  EDIT: "Edit Todo",
};

const CLASSES = {
  todoItem: [
    "flex",
    "justify-between",
    "items-center",
    "p-2",
    "shadow-sm",
    "rounded",
    "w-full",
    "mb-2",
    "bg-white",
    "hover:bg-gray-50",
  ],
  editButton: [
    "px-2",
    "py-1",
    "bg-blue-500",
    "hover:bg-blue-700",
    "text-white",
    "rounded",
    "mr-3",
    "cursor-pointer",
    "transition-colors",
  ],
  deleteButton: [
    "px-2",
    "py-1",
    "bg-red-500",
    "hover:bg-red-600",
    "text-white",
    "rounded",
    "cursor-pointer",
    "transition-colors",
  ],
  todoText: ["flex-1", "text-md", "break-words", "pr-2"],
};

function toggleEmpty() {
  const hasTodos = todoList.children.length > 0;
  todoEmpty.style.display = hasTodos ? "none" : "flex";
}

function handleSubmit(e) {
  e.preventDefault();
  const todoText = todoInput.value.trim();

  if (!todoText) {
    showError("Please enter a todo");
  }

  if (editMode) {
    editTodo(todoText);
  } else {
    addTodo(todoText);
  }
  resetForm();
}

function handleTodoAction(e) {
  const button = e.target.closest("button");
  if (!button) return;

  const todoItem = button.closest("li");
  if (!todoItem) return;

  if (button.innerText === "Edit") {
    startEdit(todoItem);
  } else if (button.innerText === "Delete") {
    deleteTodo(todoItem);
  }
}

function addTodo(todoText) {
  const todoItem = createTodoItem(todoText);
  todoList.append(todoItem);
  toggleEmpty();
}

function startEdit(todoItem) {
  editMode = true;
  editItem = todoItem;
  todoInput.value = todoItem.getElementsByTagName("span")[0].innerText;
  todoInput.focus();
  todoButton.innerText = BUTTON_TEXTS.EDIT;
}

function editTodo(todoText) {
  const textSpan = editItem.getElementsByTagName("span")[0];
  textSpan.innerText = todoText;
  todoButton.innerText = BUTTON_TEXTS.ADD;
  editMode = false;
  editItem = null;
}

function deleteTodo(todoItem) {
  if (confirm("Are you sure you want to delete this todo?")) {
    todoItem.remove();
    toggleEmpty();
  }
}

function createButton({ text, classes, type = "button" }) {
  const button = document.createElement("button");
  button.innerText = text;
  button.type = type;
  button.classList.add(...classes);
  return button;
}

function createTodoItem(todoText) {
  const todoItem = document.createElement("li");
  todoItem.classList.add(...CLASSES.todoItem);

  const textSpan = document.createElement("span");
  textSpan.classList.add(...CLASSES.todoText);
  textSpan.innerText = todoText;

  const editButton = createButton({
    text: "Edit",
    classes: CLASSES.editButton,
  });

  const deleteButton = createButton({
    text: "Delete",
    classes: CLASSES.deleteButton,
  });

  todoItem.append(textSpan, editButton, deleteButton);
  return todoItem;
}

function resetForm() {
  todoInput.value = "";
  todoInput.focus();
}

function showError(error) {
  alert(error);
}

todoForm.addEventListener("submit", handleSubmit);
todoList.addEventListener("click", handleTodoAction);
toggleEmpty();
