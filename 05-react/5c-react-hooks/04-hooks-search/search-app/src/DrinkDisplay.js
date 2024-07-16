function DrinkDisplay({ drinks }) {
  return (
    <>
      {drinks.map((oneDrink) => (
        <>
          <h1>Name: {oneDrink.strDrink}</h1>
        </>
      ))}
    </>
  );
}

export default DrinkDisplay;
