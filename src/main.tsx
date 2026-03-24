import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TodoProvider } from "./context/TodoContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
        {/* TodoProvider로 App 전체를 감싸서
        여러 컴포넌트가 props 없이 동일한 상태를 공유할 수 있도록 함 */}
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>
);