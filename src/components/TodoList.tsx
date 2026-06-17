import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

function TodoList() {
  const { todos, completeTask } = useTodo();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul className="render-container__list">
        {todos.map((task) => {
          return (
            <TodoItem
              key={task.id}
              task={task}
              isDone={false}
              onAction={completeTask}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;