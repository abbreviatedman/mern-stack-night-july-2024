import Cards from "../components/Cards";
import { useState } from "react";
import Button from "@mui/material/Button";

// A few things to keep in mind here:
// The original version uses a combination system of styles, state veriables, and card components to handle "errors". If you attempt to get results without using every input field, the "state" of the error will be updated to "true" on either gender, age, or height. Any input field that was left empty is then given the className "error", which makes the outline of each field & the input themselves red.
// Since I will be using MUI to handle things like inputs, I will have to do the same, but perform it differently. Similar system, but instead of using my own css files, I will just change properties of the MUI inputs to change their colors
// https://www.cdc.gov/healthyweight/assessing/bmi/index.html#:~:text=Body%20Mass%20Index%20(BMI)%20is,in%20meters%20(or%20feet).
// Page I'm working on: https://calculadora-imc-whiteapp.netlify.app/calcular-peso-ideal

const stylings = {
  // display: "grid",
  // gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  // columnGap: "20px",
  // webkitColumnGap: "20px",
  // rowGap: "10px"
  display: "flex",
  justifyContent: "space-around",
};

function IdealBMI() {
  // GENDER STUFF
  const [genderState, setGenderState] = useState({
    m: false,
    f: false,
    error: true,
  });

  const selectGender = (letter) => {
    if (letter === "m") {
      setGenderState({
        m: true,
        f: false,
        error: false,
      });
    } else if (letter === "f") {
      setGenderState({
        m: false,
        f: true,
        error: false,
      });
    }
  };

  // AGE STUFF
  const [ageState, setAgeState] = useState({
    num: 1,
    error: true,
  });

  const selectAge = (num) => {
    setAgeState({
      num: num,
      error: false,
    });
  };

  // HEIGHT STUFF
  const [heightState, setHeightState] = useState({
    ft: 0,
    in: 0,
    error: true,
  });

  const selectFt = (num) => {
    setHeightState({
      ...heightState,
      ft: num,
      error: false,
    });
  };

  const selectIn = (num) => {
    setHeightState({
      ...heightState,
      in: num,
      error: false,
    });
  };

  // SUBMIT FORM
  const submitIdeal = () => {
    // console.log("gender: ")
    // console.log(genderState)

    // console.log("age: ")
    // console.log(ageState)

    // console.log("height: ")
    // console.log(heightState)

    // initial state has errors built in, which are only switched off when a user chooses a value in it's card
    // Height has 2 inputs, but 0' 0" is a valid height for now... will need to double check when submitting.

    calculateResults();
  };

  // RESULTS STUFF
  const [results, setResults] = useState({
    min: 0,
    max: 0,
    ideal: 0,
  });

  const calculateResults = () => {
    // (lbs / inches / inches) * 703 = 18.5 to 24.9
    // solving for lbs
    let inches = heightState.ft * 12 + heightState.in;

    let minimum = (18.5 / 703) * inches * inches;

    let maximum = (25 / 703) * inches * inches;

    let average = (minimum + maximum) / 2;

    setResults({ ideal: average, min: minimum, max: maximum });
  };

  return (
    <>
      <h1>Calculate your Ideal BMI!</h1>
      <h3>
        For a correct calculation, we need some basic information from you:
      </h3>
      <section style={stylings}>
        <Cards
          cardNum={1}
          text="What is your Gender?"
          numColor={genderState.error ? "error" : "primary"}
          cardType="genderSelect"
          gender={genderState}
          selectGender={selectGender}
        />

        <Cards
          cardNum={2}
          text="What is your Age?"
          numColor={ageState.error ? "error" : "primary"}
          cardType="ageSelect"
          age={ageState}
          selectAge={selectAge}
        />

        <Cards
          cardNum={3}
          text="What is your Height?"
          numColor={heightState.error ? "error" : "primary"}
          cardType="heightSelect"
          height={heightState}
          selectFt={selectFt}
          selectIn={selectIn}
        />
      </section>
      <br />
      <Button onClick={submitIdeal} variant="contained">
        See Results
      </Button>
    </>
  );
}

export default IdealBMI;
