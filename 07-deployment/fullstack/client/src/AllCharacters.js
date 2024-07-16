// imrse
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// 4. Import the API URL from our ./constants.js
import { API_URL } from "./constants";
// 5. `npm install axios` and import it
import axios from "axios";

function AllCharacters() {
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    // 6. with Axios, you don't need to specify headers, which will clean up the code.
    axios
      .get(`${API_URL}/allCharacters`)
      .then(async (res) => {
        setServerData(res.data.payload);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <ul>
      {serverData.length > 0 ? (
        serverData.map((character) => (
          <li key={character._id}>
            <Link to={`/mcu/${character.name}`}>{character.name}</Link>
          </li>
        ))
      ) : (
        <h1>loading...</h1>
      )}
    </ul>
  );
}

export default AllCharacters;
