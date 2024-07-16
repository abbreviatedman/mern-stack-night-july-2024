import "./App.css";
import React, { useState } from "react";
import useAxios from "./hooks/useAxios";
import Definition from "./Definition";
import SearchInput from "./SearchInput";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [word, setWord] = useState("");

  const [setUrl, data, loading, setLoading, error] = useAxios();

  function handleSubmit(e) {
    e.preventDefault();

    setWord(searchWord);

    setUrl(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
    setLoading(true);
  }

  return (
    <div className="App">
      <SearchInput
        handleSubmit={handleSubmit}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
      />

      <Definition loading={loading} data={data} word={word} error={error} />
    </div>
  );
}

export default App;
