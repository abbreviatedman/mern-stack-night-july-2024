import "./App.css";
import React, { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  function plusOne() {
    setCounter(counter + 1);
    localStorage.setItem("count", JSON.stringify(counter));
  }

  function minusOne() {
    setCounter(counter - 1);
    // localStorage.removeItem("count")
    localStorage.clear();
  }

  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={plusOne}>+</button>
      <button onClick={minusOne}>-</button>
      <h1>local storage: {localStorage.getItem("count")}</h1>
    </div>
  );
}

export default App;
