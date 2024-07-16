import "./App.css";
import useAxios from "./hooks/useAxios";
import React, { useState } from "react";
// THIS IS AN EXAMPLE OF A SEARCH

function App() {
  const [pokemonInput, setPokemonInput] = useState("");

  const [setUrl, data, loading, setLoading, error] = useAxios();

  function handleOnSubmit(e) {
    // prevent from refreshing the page
    e.preventDefault();

    // console.log(pokemonInput)
    setUrl(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`);
    setLoading(true);
  }

  // total chain of events:
  // 1. A user types into the search bar (tracked by a state variable)
  // 2. User submits the text
  // 3. onSubmit, The text gets placed in a URL, and sent to useAxios. setLoading(true) to trigger the useEffect on the useAxios side
  // 4. useAxios performs a GET request to the submitted URL. It returns with `data`, `loading`, and `error` based on success/failure
  // 5. Back on the component side, the `data` is rendered (!loading && data)

  return (
    <div className="App">
      <h1>This is a Shiny Pokemon app!</h1>
      <form onSubmit={handleOnSubmit}>
        <input type="text" onChange={(e) => setPokemonInput(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {!loading && data && (
        <div>
          <h1>My Shiny pokemon {data.name}!!!</h1>
          <h2>Pokedex No. {data.id}</h2>
          <img
            src={data.sprites.other.home.front_shiny}
            alt={`shiny ${data.name}`}
          />
        </div>
      )}
    </div>
  );
}

export default App;
