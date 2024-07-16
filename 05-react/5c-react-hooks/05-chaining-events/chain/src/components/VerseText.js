import useAxios from "../hooks/useAxios";
import { useState } from "react";

function VerseText({ resultObj, index }) {
  const [showingText, setShowingText] = useState(false);

  const [setUrl, data, loading, setLoading, error, setAuth] = useAxios();

  function generateVerse(title) {
    // console.log(title)

    if (showingText) {
      setShowingText(false);
    } else {
      setUrl(`https://bible-api.com/${title}`);
      setLoading(true);
      setShowingText(true);
    }
  }

  return (
    <li key={index}>
      <span onClick={() => generateVerse(resultObj.title)}>
        {resultObj.title}
      </span>
      <>{!loading && data && showingText && <p>{data.text}</p>}</>
    </li>
  );
}

export default VerseText;
