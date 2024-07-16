`npx create-react-app hooks`

# Hooks

Hooks are functions that let you "hook into" React state and lifecycle features from functional components. Hooks don't work inside classes - they let you use React without classes.

Here are the 3 major rules for using hooks:

1. Hooks can only be called inside React function components.
2. Hooks are always called `use`Something
3. Hooks cannot be conditional

## useState

In the `src` folder, create a file called `FavoriteColor.js`. Use the `ffc` snippet to create an empty functional component.

In the `index.js`, comment out the App import and create a new App import like so:

```js
// import App from './App';
import App from "./FavoriteColor";
```

To use the useState Hook, we first need to import it into our component.

```jsx
import React, { useState } from "react";
```

We initialize our state by calling useState in our function component.

useState accepts an initial state and returns two values:

- The current state.
- A function that updates the state.

```jsx
const [color, setColor] = useState("");
```

The first value, color, is our current state.

The second value, setColor, is the function that is used to update our state.

(These names are variables that can be named anything you would like. For the sake of being able to read code easily, try to keep a naming convention similar to what you see above)

We can now include our state anywhere in our component:

```jsx
import React, { useState } from "react";
import "./App.css";

function FavoriteColor() {
  const [color, setColor] = useState("red");

  return (
    <div>
      <h1>My favorite color is {color}!</h1>
    </div>
  );
}

export default FavoriteColor;
```

To update our state, we use our state updater function:

```jsx
<button onClick={() => setColor("blue")}>Blue</button>
```

After adding a few more buttons, your file should look like this:

```jsx
import React, { useState } from "react";
import "./App.css";

function FavoriteColor() {
  const [color, setColor] = useState("red");

  return (
    <div>
      <h1>My favorite color is {color}!</h1>
      <button onClick={() => setColor("blue")}>Blue</button>
      <button onClick={() => setColor("red")}>Red</button>
      <button onClick={() => setColor("pink")}>Pink</button>
      <button onClick={() => setColor("green")}>Green</button>
    </div>
  );
}

export default FavoriteColor;
```

## useState - What can state hold

In the `src` folder, create a file called `Car.js`

In the `index.js`, comment out the App import and create a new App import like so:

```js
// import App from './App';
// import App from './FavoriteColor';
import App from "./Car";
```

The useState Hook can be used to keep track of strings, numbers, booleans, arrays, objects, and any combination of these!

We could create multiple state Hooks to track individual values.

```jsx
import React, { useState } from "react";
import "./App.css";

function Car() {
  const [brand, setBrand] = useState("Ford");
  const [model, setModel] = useState("Mustang");
  const [year, setYear] = useState("1964");
  const [color, setColor] = useState("red");

  return (
    <div>
      <h1>My {brand}</h1>
      <p>
        It is a {color} {model} from {year}.
      </p>
    </div>
  );
}

export default Car;
```

Or, we can just use one state and include an object instead!

```jsx
import React, { useState } from "react";
import "./App.css";

function Car() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red",
  });

  return (
    <div>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
    </div>
  );
}

export default Car;
```

When state is updated, the entire state gets overwritten.

What if we only want to update the color of our car?

If we only called setCar({color: "blue"}), this would remove the brand, model, and year from our state.

We can use the JavaScript spread operator to help us:

```jsx
import React, { useState } from "react";
import "./App.css";

function Car() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red",
  });

  function updateColor() {
    setCar((previousState) => {
      return { ...previousState, color: "blue" };
    });
  }

  return (
    <div>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
      <button onClick={updateColor}>Make it a Blue car!!!</button>
    </div>
  );
}

export default Car;
```

Because we need the current value of state, we pass a function into our setCar function. This function receives the previous value.

We then return an object, spreading the previousState and overwriting only the color.

## useEffect

In the `src` folder, create a file called `Timer.js`

In the `index.js`, comment out the App import and create a new App import like so:

```js
// import App from './App';
// import App from './FavoriteColor';
// import App from './Car';
import App from "./Timer";
```

The useEffect Hook allows you to perform side effects in your components.

Some examples of side effects are: fetching data, directly updating the DOM, and timers.

useEffect accepts two arguments. The second argument is optional.

`useEffect(<function>, <dependency>)`

Let's use a timer as an example.

```jsx
import { useState, useEffect } from "react";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  });

  return <h1>I've rendered {count} times!</h1>;
}

export default Timer;
```

But wait!! It keeps counting even though it should only count once!

useEffect runs on every render. That means that when the count changes, a render happens, which then triggers another effect.

This is not what we want. There are several ways to control when side effects run.

We should always include the second parameter which accepts an array. We can optionally pass dependencies to useEffect in this array.

- No dependency passed:

```js
useEffect(() => {
  //Runs on every render
});
```

- An empty array is passed:

```js
useEffect(() => {
  //Runs only on the first render
}, []);
```

- Props or state values are passed:

```js
useEffect(() => {
  //Runs on the first render
  //And any time any dependency value changes
}, [prop, state]);
```

To fix this issue, let's only run this effect on the initial render.

```jsx
useEffect(() => {
  setTimeout(() => {
    setCount((count) => count + 1);
  }, 1000);
}, []);
```

## useEffect - Dependency

In the `src` folder, create a file called `Counter.js`

In the `index.js`, comment out the App import and create a new App import like so:

```js
// import App from './App';
// import App from './FavoriteColor';
// import App from './Car';
// import App from './Timer';
import App from "./Counter";
```

Here is an example of a useEffect Hook that is dependent on a variable. If the count variable updates, the effect will run again:

```jsx
import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <- add the count variable here

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </div>
  );
}

export default Counter;
```

## useRef

In the `src` folder, create a file called `Tracker.js`

In the `index.js`, comment out the App import and create a new App import like so:

```js
// import App from './App';
// import App from './FavoriteColor';
// import App from './Car';
// import App from './Timer';
// import App from './Counter';
import App from "Tracker.js";
```

The useRef Hook allows you to persist values between renders.

It can be used to store a mutable value that does not cause a re-render when updated.

If we tried to count how many times our application renders using the useState Hook, we would be caught in an infinite loop since this Hook itself causes a re-render.

To avoid this, we can use the useRef Hook:

```jsx
import { useState, useEffect, useRef } from "react";

function Tracker() {
  // Using state to re-render the DOM every input so we can track
  const [inputValue, setInputValue] = useState("");
  // Initial use of useRef
  const count = useRef(0);

  // Any time the DOM renders, update the count.current
  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {count.current}</h1>
    </div>
  );
}

export default Tracker;
```

useRef() only returns one item. It returns an Object called current.

When we initialize useRef we set the initial value: useRef(0).

It's like doing this: `const count = {current: 0}`. We can access the count by using count.current.

## useRef - Tracking state changes

In the `src` folder, create a file called `Tracker2.js`

In the `index.js`, comment out the App import and create a new App import like so:

```js
// import App from './App';
// import App from './FavoriteColor';
// import App from './Car';
// import App from './Timer';
// import App from './Counter';
// import App from 'Tracker.js';
import App from "Tracker2.js";
```

The useRef Hook can also be used to keep track of previous state values.

This is because we are able to persist useRef values between renders:

```jsx
import { useState, useEffect, useRef } from "react";

function Tracker2() {
  const [inputValue, setInputValue] = useState("");
  const previousInputValue = useRef("");

  useEffect(() => {
    previousInputValue.current = inputValue;
  }, [inputValue]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h2>Current Value: {inputValue}</h2>
      <h2>Previous Value: {previousInputValue.current}</h2>
    </div>
  );
}

export default Tracker2;
```

This time we use a combination of useState, useEffect, and useRef to keep track of the previous state.

In the useEffect, we are updating the useRef current value each time the inputValue is updated by entering text into the input field.
