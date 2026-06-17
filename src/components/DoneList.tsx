import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

function DoneList() {
  // doneTasks와 deleteTask를 Context에서 직접 사용
  // props-drilling 없이 필요한 데이터만 바로 가져온다
  const { doneTasks, deleteTask } = useTodo();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
      <ul className="render-container__list">
        {doneTasks.map((task) => {
          return (
            <TodoItem
              key={task.id}
              task={task}
              isDone={true}
              onAction={deleteTask}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default DoneList;