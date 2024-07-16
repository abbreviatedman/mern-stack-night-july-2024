# Props

Props (short for properties) provides us a way to pass data into our components. Props are passed to components as a standard JavaScript object so your properties can be labeled with different object keys and they can store any data type that is valid in JavaScript. Let's look at some examples.

- Use command `npx create-react-app props`
- Navigate into the folder with `cd props`
- Start up the server with `npm start`

## Props and components

Let's say we have a main parent component called App and we would like to nest a Greeting component inside of it and change the greeting for different users based on their name. The component can stay the same but the props we pass into it can change dynamically. Let's explore this using components:

```jsx
import "./App.css";

function Greeting(props) {
  return <h1>Hey {props.name}</h1>;
}

function App() {
  return (
    <div className="App">
      <Greeting name="Rick" />
      <Greeting name="Morty" />
      <Greeting name="Summer" />
    </div>
  );
}

export default App;
```

Looking over this code we notice that props are passed to our components as attributes inside our JSX elements. `<Greeting />` represents one instance of a Greeting component. We added the `name="Rick"` attribute inside it so the final result is `<Greeting name="Rick" />`. This modifies the props object so it has a key called `name`. Now behind the scenes the props object would look like this:

```javascript
{
  name: "Rick";
}
```

This is made usable to our component by referring to the `props` object and using standard JavaScript dot notation to refer to the key we choose `props.name`. So again, `<Greeting name="Rick" />` stores the value "Rick" inside of `props.name` and can now be referenced inside the Greeting component.

The end result here is that the browser will display all three greetings each with a different name passed in as a prop.

```html
<div>
  <h1>Hey Rick</h1>
  <h1>Hey Morty</h1>
  <h1>Hey Summer</h1>
</div>
```

## Passing multiple props to the same component

What if wanted to not only pass the name but also the age of each user and whether they are living or dead? We can simply add additional prop attributes as needed.

```jsx
<Greeting name="Rick" age={73} alive={true} />
```

Notice that when passing a string we used `""` quotes, where as we used `{}` curly braces when passing a number. This is because strings are naturally captured in quotes, while curly braces are needed for all other data types because the data is moving in JavaScript and all JavaScript in JSX needs to be wrapped in curly braces.

Now we can update the component to accept these new props.

```jsx
function Greeting(props) {
  return (
    <h1>
      Hey {props.name}, You are {props.age} years old.
      {props.alive
        ? "Congrats on being alive"
        : "You appear to have died on this adventure, better make a clone!"}
    </h1>
  );
}
```

Let's see the full code with different values for each instance of Greeting.

```jsx
import "./App.css";

function Greeting(props) {
  return (
    <h1>
      Hey {props.name}, You are {props.age} years old.{" "}
      {props.alive
        ? "Congratulations on being alive!"
        : "You appear to have died on this adventure, better make a clone!"}
    </h1>
  );
}

function App() {
  return (
    <div className="App">
      <Greeting name="Rick" age={73} alive={true} />
      <Greeting name="Morty" age={13} alive={false} />
      <Greeting name="Summer" age={17} alive={true} />
    </div>
  );
}

export default App;
```

The final result in the browser is:

```html
<div>
  <h1>Hello Rick, You are 73 years old. Congratulations on being alive!</h1>
  <h1>Hello Morty, You are 13 years old. Congratulations on being alive!</h1>
  <h1>
    Hello Summer, You are 17 years old. You appear to have died on this
    adventure, better make a clone!
  </h1>
</div>
```

## Passing objects as props

Aside from passing strings, numbers, boolean values, we can also pass objects, arrays, and functions. First let's look at passing those same props above as a single object.

```jsx
<Greeting person={{ name: "Rick", age: 73, alive: true }} />
```

Remember that props are already an object, and by passing in another one our object will be nested inside of the props object. Now to retrieve these individual props in a class component it would be done like this:

```jsx
function Greeting(props) {
  return (
    <h1>
      Hey {props.person.name}, You are {props.person.age} years old.{" "}
      {props.person.alive
        ? "Congratulations on being alive!"
        : "You appear to have died on this adventure, better make a clone!"}
    </h1>
  );
}
```

## Passing arrays as props

Lets look at accessing props containing arrays

```jsx
<Favorites
  faves={["McNuggies with Szechaun Sauce", "Kalaxian Crystals", "Portal Fluid"]}
/>
```

Then to display the array values in our component we can use the join method to merge them together separated by commas.

```jsx
function Favorites(props) {
  return <p>Your favorite things are: {props.faves.join(", ")}</p>;
}
```

## Iterating data to create a list of components using map

As data gets more complicated you may want to store a series of similar data in an array and then use the map function to iterate over it and display a component for each item in the array. This applies to databases because you can very easily model components after the MongoDB collection you're trying to display.

Before moving on to this next step, make sure to create a `components` folder inside of the `src` folder, and refactor your code so that the `Greeting` and `Favorites` components each get their own file.

First we will add a variable outside of the component to hold an array of data we want to use, but this time I will also include an `id`. This will come in handy later on. Then in the return statement we will use map to iterate our array of characters and for each character `char` we will display a `<Greeting />` component.

```jsx
import "./App.css";
import Greeting from "./components/Greeting";
import Favorites from "./components/Favorites";

let data = [
  {
    id: 1,
    name: "Rick",
    age: 73,
    alive: true,
    favoriteThings: [
      "McNuggies with Szechaun Sauce",
      "Kalaxian Crystals",
      "Portal Fluid",
    ],
  },
  {
    id: 2,
    name: "Morty",
    age: 13,
    alive: false,
    favoriteThings: ["Jessica", "Yummy' Yums", "Eyeholes"],
  },
  {
    id: 3,
    name: "Summer",
    age: 17,
    alive: false,
    favoriteThings: ["Snake Jazz", "Being Queen", "Parties"],
  },
];

function App() {
  return (
    <div className="App">
      {/* <Greeting name="Rick" age={73} alive={true}/> */}
      {/* <Favorites faves={["McNuggies with Szechuan Sauce", "Kalaxian Crystals", "Portal Fluid"]} /> */}
      {/* <Greeting name="Morty" age={13} alive={false}/> */}
      {/* <Greeting name="Summer" age={17} alive={true}/> */}

      <ul>
        {data.map((char) => (
          <Greeting
            key={character.id}
            person={character}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Notice that React requires as a best practice that each Character component must have a unique identifiable `key` attribute. This is where I pass the `char.id` value so each gets a unique number.

## Passing functions as props

Let's say we want to create a button inside our nested component that once clicked will call a function that is inside our parent component. We can pass the function down from our parent component into the child component as a prop.

```jsx
function App() {
  function greet() {
    alert("WUBBALUBBADUBDUB!");
  }

  return (
    <div className="App">
      {/* <Greeting name="Rick" age={73} alive={true}/> */}
      {/* <Favorites faves={["McNuggies with Szechuan Sauce", "Kalaxian Crystals", "Portal Fluid"]} /> */}
      {/* <Greeting name="Morty" age={13} alive={false}/> */}
      {/* <Greeting name="Summer" age={17} alive={true}/> */}

      <ul>
        {data.map((char) => (
          <Greeting
            key={char.id}
            name={char.name}
            greetAlert={greet}
            age={char.age}
            alive={char.alive}
            faves={char.favoriteThings}
          />
        ))}
      </ul>
    </div>
  );
}
```

Make sure you go over to `./components/Greeting.js` and update it to include a button. The button will be responsible for performing the function on click:

```jsx
function Greeting(props) {
  return (
    <div>
      <h1>
        Hey {props.name}, You are {props.age} years old.
        {props.alive
          ? "Congrats on being alive"
          : "You appear to have died on this adventure, better make a clone!"}
      </h1>
      <button onClick={props.greetAlert}>PRESS ME</button>
    </div>
  );
}

export default Greeting;
```

Inside the App component where we are rendering `<Greeting key={char.id} name={char.name} age={char.age} />` we added the prop attribute `greetAlert={greet}` which is storing a function from inside the App component. Then inside of our Greeting component we added `<button onClick={props.greetAlert}>Greet</button>` which created a button that says Greet on it and whose `onClick={}` handler that when clicked on will call `props.greetAlert`. Take some time to look over the code line by line and follow through what happens when a user clicks the button.
