// This component can be plugged in anywhere, but the following must be set up on the parent component:
// 1. a function called 'handleSubmit' that uses the search word
// 2. const [searchWord, setSearchWord] = useState("")

// When using this component, you must hand down props like this:
// <SearchInput handleSubmit={handleSubmit} searchWord={searchWord} setSearchWord={setSearchWord} />

function SearchInput({ handleSubmit, searchWord, setSearchWord }) {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      />
    </form>
  );
}

export default SearchInput;
