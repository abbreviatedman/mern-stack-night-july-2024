import "./App.css";
import React, { useState, useEffect } from "react";
import Form from "./Form";
import Todo from "./Todo";

function App() {
  const [todos, setTodos] = useState(
    !localStorage.getItem("todos-list")
      ? []
      : JSON.parse(localStorage.getItem("todos-list"))
  );

  useEffect(() => {
    localStorage.setItem("todos-list", JSON.stringify(todos));
  }, [todos]);

  function addTodo(newItem) {
    setTodos([...todos, newItem]);
  }

  function markComplete(index) {
    todos[index].isDone = !todos[index].isDone;
    setTodos([...todos]);
  }

  function deleteOne(index) {
    todos.splice(index, 1);
    setTodos([...todos]);
  }

  function clearCompleted() {
    setTodos(todos.filter((todo) => todo.isDone === false));
  }

  return (
    <div className="App">
      <h1 style={{ color: "#8be9fd" }}>To do or not to do?</h1>
      <br />
      <h1>🧐👇</h1>
      <br />
      <div className="todos-container">
        {todos.map((todo, index) => {
          return (
            <Todo
              key={index}
              todo={todo}
              index={index}
              markComplete={markComplete}
              deleteOne={deleteOne}
            />
          );
        })}
      </div>
      <br />
      <Form addTodo={addTodo} clearCompleted={clearCompleted} />
    </div>
  );
}

export default App;
