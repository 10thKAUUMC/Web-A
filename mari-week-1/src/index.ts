import { Todo } from "./types.js";
import { save, load } from "./storage.js";

// DOM 요소
const todoForm = document.getElementById("form") as HTMLFormElement;
const todoInput = document.getElementById("input") as HTMLInputElement;
const todoList = document.getElementById("list") as HTMLUListElement; // 할 일 목록
const doneList = document.getElementById("done-list") as HTMLUListElement; // 완료 목록 (HTML에 추가 필요)

// 상태 (초기 로드)
const initialData = load();
let todos: Todo[] = initialData.todos;
let doneTodos: Todo[] = initialData.doneTodos;

// 할 일 추가
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    const newTodo: Todo = {
        id: Date.now(),
        text
    };

    todos.push(newTodo);
    todoInput.value = "";
    render();
});

function createTodoElement(todo: Todo, isDone: boolean): HTMLElement {
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
    } else {
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