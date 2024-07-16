import "./App.css";
import useAxios from "./hooks/useAxios";
import React, { useState } from "react";
// THIS IS AN EXAMPLE OF USING AN API KEY

function App() {
  const [setUrl, data, loading, setLoading, error, setAuth] = useAxios();

  function handleOnSubmit(e) {
    // prevent from refreshing the page
    e.preventDefault();

    // nrqJsqG1dJV7NH4dCGID
    // `Bearer _-key-_` is what is required for THIS API AND THIS ONE ONLY
    setAuth("Bearer nrqJsqG1dJV7NH4dCGID");
    setUrl(`https://the-one-api.dev/v2/movie/`);
    setLoading(true);
  }

  return (
    <div className="App">
      <h1>This is now a LORD OF THE RINGS app!</h1>
      <form onSubmit={handleOnSubmit}>
        <button type="submit">See All Movies</button>
      </form>
      {!loading &&
        data &&
        data.docs.map((movie) => (
          <div>
            <h1 key={movie._id}>name: {movie.name}</h1>
          </div>
        ))}
    </div>
  );
}

export default App;
