import "./App.css";
import { useState } from "react";
import SearchForm from "./components/SearchForm";
import useAxios from "./hooks/useAxios";
import SearchResults from "./components/SearchResults";

// https://api.biblia.com/v1/bible/search/kjv1900?query=rest&key=1351d54c1103f57380ea27e54ca58747
// bibliaAPI:
//  // Input: Any biblical text
//  // Output: The passage that contains it

//  // bibliaAPI Output =====> bible-api Input

// https://bible-api.com/Isaiah 32:2
// bible-api:
//  // Input: book/chapter
//  // Output: verses

function App() {
  const [searchInput, setSearchInput] = useState("");

  const [setUrl, data, loading, setLoading, error, setAuth] = useAxios();

  function handleSubmit(e) {
    e.preventDefault();

    // console.log(searchInput)
    setUrl(
      `https://api.biblia.com/v1/bible/search/kjv1900?query=${searchInput}&key=1351d54c1103f57380ea27e54ca58747`
    );
    setLoading(true);
  }

  return (
    <div className="App">
      <h1>A Bible Search App!</h1>
      <SearchForm setSearchInput={setSearchInput} handleSubmit={handleSubmit} />
      {!loading && data && <SearchResults results={data.results} />}
      {/* 
        Search Results
          > passage
            click --> verse
      */}
    </div>
  );
}

export default App;
