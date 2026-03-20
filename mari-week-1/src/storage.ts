import { Todo } from "./types";

export function save(todos: Todo[], doneTodos: Todo[]) {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("doneTodos", JSON.stringify(doneTodos));
}

export function load() {
    const savedTodos = localStorage.getItem("todos");
    const savedDone = localStorage.getItem("doneTodos");
    return {
        todos: savedTodos ? JSON.parse(savedTodos) : [],
        doneTodos: savedDone ? JSON.parse(savedDone) : []
    };
}