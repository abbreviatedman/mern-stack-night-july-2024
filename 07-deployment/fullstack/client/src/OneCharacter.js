import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// 7. All URL's use this instead of letting it be seen on these files
import { API_URL } from "./constants";

function OneCharacter() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState({
    debut: "",
    debutYear: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // 8. Change it here
    fetch(`${API_URL}/getCharacterByName/${name}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then(async (res) => {
      let result = await res.json();
      setCharacter(result.payload);
    });
  }, [name, isEditing]);

  function toggleEditing() {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    console.log("Submitted!");

    const sendBody = {
      debut: character.debut,
      debutYear: character.debutYear,
    };

    // 9. Change it here
    fetch(`${API_URL}/updateCharacter/${character._id}`, {
      method: "put",
      body: JSON.stringify(sendBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then(() => {
      setCharacter((prevState) => ({ ...prevState }));
      setIsEditing(false);
    });
  }

  function handleDelete() {
    // 10. Change it here
    fetch(`${API_URL}/deleteCharacter/${character._id}`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then(() => navigate("/mcu"));
  }

  function updateCharacter({ target }) {
    setCharacter((prevState) => ({
      ...prevState,
      [target.name]: target.value, //dynamically inject property
    }));
  }

  return (
    <>
      <h1>{character.name}</h1>
      <ul>
        <form onSubmit={handleOnSubmit}>
          <li>
            Dubuted in&nbsp;
            {isEditing ? (
              <input
                type="text"
                name="debut"
                value={character.debut}
                onChange={updateCharacter}
              />
            ) : (
              <span>{character.debut}</span>
            )}
          </li>
          <li>
            Released in&nbsp;
            {isEditing ? (
              <input
                type="text"
                name="debutYear"
                value={character.debutYear}
                onChange={updateCharacter}
              />
            ) : (
              <span>{character.debutYear}</span>
            )}
          </li>
          {isEditing ? <button type="submit">Submit edit</button> : <br />}
        </form>
      </ul>
      <button onClick={toggleEditing}>
        {isEditing ? "Stop editing" : "Edit character details"}
      </button>
      <button onClick={handleDelete}>Delete this character</button>
    </>
  );
}

export default OneCharacter;
