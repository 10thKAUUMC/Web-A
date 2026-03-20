import { save, load } from "./storage.js";
const todoForm = document.getElementById("form");
const todoInput = document.getElementById("input");
const todoList = document.getElementById("list");
const doneList = document.getElementById("done-list");
const initialData = load();
let todos = initialData.todos;
let doneTodos = initialData.doneTodos;
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text)
        return;
    const newTodo = {
        id: Date.now(),
        text
    };
    todos.push(newTodo);
    todoInput.value = "";
    render();
});
function createTodoElement(todo, isDone) {
    const li = document.createElement("li");
    li.className = "render-container__item";
    li.textContent = todo.text;
    const button = document.createElement("button");
    if (isDone) {
        button.textContent = "삭제";
        button.style.backgroundColor = "#dc3545";
        button.onclick = () => {
            doneTodos = doneTodos.filter(t => t.id !== todo.id);
            render();
        };
    }
    else {
        button.textContent = "완료";
        button.style.backgroundColor = "#28a745";
        button.onclick = () => {
            todos = todos.filter(t => t.id !== todo.id);
            doneTodos.push(todo);
            render();
        };
    }
    li.appendChild(button);
    return li;
}
function render() {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    todos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo, false));
    });
    doneTodos.forEach(todo => {
        doneList.appendChild(createTodoElement(todo, true));
    });
    save(todos, doneTodos);
}
render();
