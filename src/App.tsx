import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import DoneList from "./components/DoneList";

function App() {
  return (
    <div className="todo-page">
      <div className="todo-container">
        <h1 className="todo-container__header">NANA TODO</h1>
        <TodoForm />

        <div className="render-container">
          <TodoList />
          <DoneList />
        </div>
      </div>
    </div>
  );
}

export default App;