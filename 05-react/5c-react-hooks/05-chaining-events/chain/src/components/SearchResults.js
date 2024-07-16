import VerseText from "./VerseText";

function SearchResults({ results }) {
  return (
    <ul>
      <span>
        Here are the passages that may contain the text you're looking for:
      </span>
      {results.map((resultObj, index) => (
        <VerseText resultObj={resultObj} index={index} />
      ))}
    </ul>
  );
}

export default SearchResults;
