import { useState, useEffect } from "react";
// `npm install axios` before starting the server
import axios from "axios";

function useAxios() {
  // This holds the result of an API call
  const [data, setData] = useState(null);
  //   This holds the URL that's sent from a component
  const [url, setUrl] = useState("");
  //   This holds an error status based on the results of an axios search
  const [error, setError] = useState(null);
  //   This holds the loading status that's sent from a component
  const [loading, setLoading] = useState(false);

  async function customFetch() {
    try {
      let payload = await axios.get(url);

      setData(payload.data);
      setLoading(false);
      setError(null);
    } catch (e) {
      if (e.response.status === 404) {
        setError("data not found");
        setData(null);
        setLoading(false);
      } else {
        setError(e.message);
        setData(null);
        setLoading(false);
      }
    }
  }

  //   When we use setLoading from another component, this useEffect sees the change in state. If loading is true, then it performs the customFetch function. Else, nothing happens.
  useEffect(() => {
    if (loading) {
      customFetch(url);
    }
  }, [loading]);

  return [setUrl, data, loading, setLoading, error];
}

export default useAxios;
