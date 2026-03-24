import type { Task } from "../types/todo";

type TodoItemProps = {
  task: Task;
  isDone: boolean;
  onAction: (task: Task) => void;
};

function TodoItem({ task, isDone, onAction }: TodoItemProps) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      <button
        type="button"
        className={
          isDone
            ? "render-container__item-button render-container__item-button--delete"
            : "render-container__item-button render-container__item-button--complete"
        }
        onClick={() => onAction(task)}
      >
        {isDone ? "삭제" : "완료"}
      </button>
    </li>
  );
}

export default TodoItem;