# State

`npx create-react-app state`

Component "state" refers to data declared within a component that is subject to change. When a change occurs, the component is then refreshed and updated with the newly changed "state"

Certain functions that React gives us out of the box allow us to schedule and update to a component’s state object. When state changes, the component responds by re-rendering.

## What is the difference between state and props?

Props (short for “properties”) and state are both plain JavaScript objects. While both hold information that influences the output of render, they are different in one important way: props get passed to the component (similar to function parameters) whereas state is managed within the component. You can think of props as "where am I sending my data?" and you can think of state as "where is my data being saved?". If props are passed from a parent into a children components then the children can't change the value of the props directly. Where as components have full control to change the state.

## Using state in components

In this example we want to display a number that will increase or decrease whenever a button is clicked. First we will just fill in the content to display.

```jsx
function Counter() {
  return (
    <div>
      <h1></h1>
      <button>Count Up</button>
      <button>Count Down</button>
    </div>
  );
}

export default Counter;
```

Now to add state to our component, at the top we have to import `useState`. Use shortcut `imrs` ahd hit **Tab** to get `import React, { useState } from 'react';`. Inside the component we will set up a state variable called `count` to store the number. We shall set it to zero initially.

```jsx
import React, { useState } from "react";

function Counter() {
  // const [stateVariable, setStateVariable] = useState(initialValue)
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1></h1>
      <button>Count Up</button>
      <button>Count Down</button>
    </div>
  );
}

export default Counter;
```

_Note: React reserves the word `state` for this special purpose and will watch state for changes whenever `setState()` is called (in this case, called `setCount()`)._

## Displaying state

In order to display the count inside the `<h1>` we can simply refer to the state variable `count`.

```jsx
function Counter() {
  // const [stateVariable, setStateVariable] = useState(initialValue)
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button>Count Up</button>
      <button>Count Down</button>
    </div>
  );
}
```

## Setting state

In components we use the `setState()` method that is available to us from state variable declaration. The `setState()` method accepts any value to reassign to it's corresponding state variable.

```jsx
function Counter() {
  // const [stateVariable, setStateVariable] = useState(initialValue)
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Count Up</button>
      <button onClick={() => setCount(count - 1)}>Count Down</button>
    </div>
  );
}
```

In the code above, we added the `onClick={}` attribute inside our buttons that will run the arrow function that will call `setCount()`. We will pass in the current value of `count` and `+ 1` or `- 1` to update its value.

React recognizes the change of state and will re-render the component showing the newest count in the `<h1>`.

What happens if we try to change state directly?

```
<button onClick={() => count = count + 1} >Count Up</button>
```

If we do not use the setState method, then react will not update your component when the state changes. So we ALWAYS use the `setState()` method to update our state.

## Using logic to adjust state

Let's pretend we would like the count to never go below zero. To do so we need some conditional logic and our code inside the button is already getting long. Instead let's move the code to a function called countUp and countDown and call those functions from the button's onClick event instead.

```jsx
function Counter() {
  // const [stateVariable, setStateVariable] = useState(initialValue)
  const [count, setCount] = useState(0);

  function countUp() {
    setCount(count + 1);
  }

  function countDown() {
    setCount(count - 1);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={countUp}>Count Up</button>
      <button onClick={countDown}>Count Down</button>
    </div>
  );
}
```

Now for the conditional logic to make sure the number never goes below zero. Wrap the setState with an if conditional to make sure the current count is greater than zero.

```jsx
function countDown() {
  if (count > 0) {
    setCount(count - 1);
  }
}
```

## setState is Asynchronous

When you call `setState()` it takes time to update the state. While its working the rest of your code is still running and moving forward as it works in the background. Let's look at our count function and see what happens if we try to log our state value immediately after calling `setState()`.

```jsx
function countUp() {
  setCount(count + 1);
  console.log(count);
}
```

Refresh the browser, and open the JavaScript console and run this code. Then click the **Count Up** button. We will see the value of count is still at zero. That is because when setState is called console.log is called immediately afterwards and the state was still being updated.

## Review ES6 Spread Operator to update State holding Arrays or Objects

Occasionally we will want update arrays that already contain elements or objects containing many properties and we may only want to update a single property and the spread operator makes this easy without having to type back in all the same information again.

Here is a quick review of the `...` spread operator. It can be used to take an existing array and add another element to it while still preserving the original array. For example,

```javascript
let fruit = ["Apples", "Oranges"];
// let updatedFruit = [['Apples','Oranges'], 'Bananas]
// let updatedFruit = ['Apples','Oranges', 'Bananas]
let updatedFruit = [...fruit, "Bananas"];
```

In the code above the `...` spread operator takes all the existing elements inside the `fruit` array and puts them into our new `updatedFruit` array, and then we also add `Bananas` as well.

We could have used `fruit.push('Bananas');` and directly added a banana to the first array, but that would mutate the original array. This is a no-no for React state. We never want to mutate our state directly! It is a best practice to create a new variable to store the updated state and then pass that into the `setState()` method.

We can also use the `...` spread operator on Objects as well.

```javascript
let person = { id: 1, name: "Bob", age: 72 };
let updatedPerson = { ...person, age: 73 };
```

This will only change age but also include all of the other properties of `person` as well. So the value of upDated person is now `{ id: 1, name: 'Bob', age: 73 }`.

## setState() and Spread Operators

To demonstrate how this works together with `setState()`, let's create a new component.

- Make a new file in the `src/`folder and call it `Fruits.js`
- Go to `index.js` and import this new component, like so:

```js
// import App from './App';
import App from "./Fruits";
```

What this does is it imports the `Fruits` component and renames it on the `index.js` end, so that it displays a new component instead. We will be using this technique in the future to demonstrate more things about React.

Use shortcut `imrs` at the top of this file to import `useState`, and use shortcut `ffc` to create & name the functional component `Fruits`

Next, we'll create a state variable that is an array data type. This is how it looks:

```js
const [fruits, setFruits] = useState(["Apple", "Orange"]);
```

Inside the `return()` statement, place a `<div>` as a wrapper and place the following inside of it:

```js
<h1>This is everything in the fruit stand: {fruits.join(", ")}</h1>
```

This will display the array as a string. Now we want to add a button that will dynamically add a new fruit to our state variable. We want the ability to make multiple buttons, so we will start by creating a function to change state:

```js
function addFruit(oneFruit) {
  setFruits([...fruits, oneFruit]);
}
```

As you can see, we're using the Spread Operator to place the previous value of the `fruits` state variable into a new array that now contains a new fruit. Remember that it must be done this way, and that `fruits.push()` is an impossibility in React. You can think of it as having a basket of fruit on a shelf. React will not let you place a new fruit into the basket. Instead, it asks that you remove the basket, place a new fruit inside, and then place the basket on the shelf where it once was.

Now let's create a button to add new Apples to our `fruits`:

```js
<button onClick={() => addFruit("Apple")}>Add Apples</button>
```

_Note: If you are using the parameter of a function inside of an `onClick={}`, you must make it a callback function_

If you click on the button, you will see that Apple is repeatedly added to the `h1`! Let's add more buttons to have fun with this.

Your component should look something like this:

```js
import React, { useState } from "react";

function Fruits() {
  const [fruits, setFruits] = useState(["Apple", "Orange"]);

  function addFruit(oneFruit) {
    setFruits([...fruits, oneFruit]);
  }

  return (
    <div>
      <h1>This is everything in the fruit stand: {fruits.join(", ")}</h1>
      <button onClick={() => addFruit("Apple")}>Add Apples</button>
      <button onClick={() => addFruit("Orange")}>Add Oranges</button>
      <button onClick={() => addFruit("Pear")}>Add Pears</button>
      <button onClick={() => addFruit("Peach")}>Add Peaches</button>
    </div>
  );
}

export default Fruits;
```

We can even take this a step further and turn these buttons into it's own component!!! This is what that component, `Button.js`, might look like:

```js
function Button(props) {
  return (
    <button onClick={() => props.addFruit(props.fruit)}>
      Add {props.fruit}
    </button>
  );
}

export default Button;
```

And this is what the updated `Fruits.js` looks like using our new buttons:

```js
import React, { useState } from "react";
import Button from "./Button";

function Fruits() {
  const [fruits, setFruits] = useState(["Apple", "Orange"]);

  function addFruit(oneFruit) {
    setFruits([...fruits, oneFruit]);
  }

  return (
    <div>
      <h1>This is everything in the fruit stand: {fruits.join(", ")}</h1>
      <Button addFruit={addFruit} fruit={"Banana"} />
      <Button addFruit={addFruit} fruit={"Apple"} />
      <Button addFruit={addFruit} fruit={"Orange"} />
      <Button addFruit={addFruit} fruit={"Peach"} />
      <Button addFruit={addFruit} fruit={"Pear"} />
    </div>
  );
}

export default Fruits;
```
