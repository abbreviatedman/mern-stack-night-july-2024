import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import "../styles/Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

function Header() {
  const [actualColor, setActualColor] = useState("secondary");
  const [idealColor, setIdealColor] = useState("primary");
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    // console.log(e.target.value)

    if (e.target.value === "Actual") {
      setActualColor("secondary");
      setIdealColor("primary");
      navigate("/");
    } else if (e.target.value === "Ideal") {
      setActualColor("primary");
      setIdealColor("secondary");
      navigate("/ideal");
    }
  }

  return (
    <>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        size="large"
      >
        <Button
          color={actualColor}
          onClick={(e) => handleClick(e)}
          value="Actual"
        >
          Actual BMI
        </Button>
        <Button
          color={idealColor}
          onClick={(e) => handleClick(e)}
          value="Ideal"
        >
          Ideal BMI
        </Button>
      </ButtonGroup>
      <Divider />
    </>
  );
}

export default Header;
