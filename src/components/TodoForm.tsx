import type { FormEvent } from "react";
import { useTodo } from "../context/TodoContext";

function TodoForm() {
// Context에서 상태와 함수를 직접 가져옴
// 따라서 App에서 input, setInput, addTodo를 props로 내려줄 필요가 없음
  const { input, setInput, addTodo } = useTodo();

  const getTodoText = (): string => {
    return input.trim();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const text = getTodoText();

    if (text) {
      addTodo(text);
    }
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-container__input"
        placeholder="할 일 입력"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
}

export default TodoForm;