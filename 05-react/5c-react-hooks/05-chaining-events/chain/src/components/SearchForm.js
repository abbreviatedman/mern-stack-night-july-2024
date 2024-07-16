function SearchForm({ setSearchInput, handleSubmit }) {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="text" onChange={(e) => setSearchInput(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SearchForm;
