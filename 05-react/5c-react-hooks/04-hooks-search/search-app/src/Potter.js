import "./App.css";
import useAxios from "./hooks/useAxios";
import React, { useState } from "react";
// THIS IS AN EXAMPLE OF USING A DROP DOWN MENU

function App() {
  const [houseInput, setHouseInput] = useState("");

  const [setUrl, data, loading, setLoading, error] = useAxios();

  function handleOnSubmit(e) {
    // prevent from refreshing the page
    e.preventDefault();

    setUrl(`https://hp-api.onrender.com/api/characters/house/${houseInput}`);
    setLoading(true);
  }

  return (
    <div className="App">
      <h1>This is now a HARRY POTTER app!</h1>
      <form onSubmit={handleOnSubmit}>
        <select
          value={houseInput}
          onChange={(e) => setHouseInput(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="gryffindor">gryffindor</option>
          <option value="slytherin">slytherin</option>
          <option value="hufflepuff">hufflepuff</option>
          <option value="ravenclaw">ravenclaw</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {!loading &&
        data &&
        data.map((char) => (
          <div>
            <h1>name: {char.name}</h1>
            <img src={char.image} alt={char.name} key={char.id} />
          </div>
        ))}
    </div>
  );
}

export default App;
