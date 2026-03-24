import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Task } from "../types/todo";

type TodoContextType = {
  input: string;
  todos: Task[];
  doneTasks: Task[];
  setInput: (value: string) => void;
  addTodo: (text: string) => void;
  completeTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const addTodo = (text: string): void => {
    const newTodo: Task = {
      id: Date.now(),
      text,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  const completeTask = (task: Task): void => {
    setTodos((prev) => prev.filter((t) => t.id !== task.id));
    setDoneTasks((prev) => [...prev, task]);
  };

  const deleteTask = (task: Task): void => {
    setDoneTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <TodoContext.Provider
      value={{
        input,
        todos,
        doneTasks,
        setInput,
        addTodo,
        completeTask,
        deleteTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// props-drilling 해결:
// 기존에는 App -> TodoForm / TodoList / DoneList -> TodoItem 으로
// 상태와 함수를 props로 계속 전달해야 할 수 있었다.
// Context를 사용하면 필요한 컴포넌트가 useTodo()로 직접 상태를 가져올 수 있어서
// 중간 컴포넌트가 props를 대신 전달할 필요가 없어진다.

export const useTodo = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodo must be used within TodoProvider");
  }

  return context;
};