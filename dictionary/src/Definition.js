function Definition({ loading, data, word, error }) {
  // This should display before any word is searched for
  if (!word) {
    return <h1>Search for a word</h1>;
  }

  // This only displays between searching and getting back either data or error
  if (loading && !data) {
    return <h1>Loading...</h1>;
  }

  // This displays if you search for an incorrect word/term
  if (error) {
    return <h1>An error has occured</h1>;
  }

  // This displays various definitons of the searched word
  return (
    <>
      <h1>{data[0].word}</h1>

      <br />

      <div>
        {data[0].phonetics.map((text, index) => (
          <span key={index}> {text.text} </span>
        ))}
      </div>

      <br />

      <div>
        {data[0].meanings.map((meaning, index) => (
          <div key={meaning.partOfSpeech}>
            <h2>{meaning.partOfSpeech}</h2>

            <br />

            {meaning.definitions.map((obj, index) => (
              <ul key={index}>
                <li>{obj.definition}</li>
              </ul>
            ))}
          </div>
        ))}
      </div>

      <div>
        {data[0].sourceUrls.map((source, index) => (
          <span key={index}>
            Source: <a href={source}> {source} </a>
          </span>
        ))}
      </div>
    </>
  );
}

export default Definition;
