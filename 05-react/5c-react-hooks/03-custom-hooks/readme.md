# Custom Hooks

Hooks are reusable functions.

When you have component logic that needs to be used by multiple components, we can extract that logic into a custom Hook.

Custom Hooks should start with "use", for example `useFetch`

## Getting started

- Use command `npx create-react-app custom-hooks`

On the following file, we are fetching data into our `App.js` and displaying it.

We will use `JSONPlaceholder` service to fetch fake data. This service is great for testing applications when there is no existing data.

Use the `JSONPlaceholder` service to fetch fake "todo" items and display the titles on the page:

```jsx
import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      {data &&
        data.map((item) => {
          return <p key={item.id}>{item.title}</p>;
        })}
    </div>
  );
}

export default App;
```

The "data &&" before the map is a conditional statement that checks if the data variable is truthy. If it is truthy, the code inside the curly braces will be executed. This is done to prevent the map function from running on a null or undefined data variable, which would cause an error. It is a way of checking if the data has been successfully fetched before trying to map over it.

## Refactor code

The fetch logic may be needed in other components as well, so we will extract that into a custom Hook.

Move the fetch logic to a new file to be used as a custom Hook.

- Create `./hooks/useFetch.js`

```jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data];
}

export default useFetch;
```

Now `App.js` should look like this:

```jsx
import useFetch from "./hooks/useFetch";

function App() {
  const [data] = useFetch("https://jsonplaceholder.typicode.com/todos");

  return (
    <div>
      {data &&
        data.map((item) => {
          return <p key={item.id}>{item.title}</p>;
        })}
    </div>
  );
}

export default App;
```

Now we have our custom Hook on `useFetch.js` containing all of the logic needed to fetch our data.

We removed the hard-coded URL and replaced it with a variable that can be passed to the custom Hook.

The Hook returns our data, to be used and rendered however we like on this page.

## Reuse the Custom Hook

- In the `src` folder, create a component called `Memes.js`

- In `index.js`, change the imports so that we render the Memes component instead:

```js
// import App from './App';
import App from "./Memes";
```

Now let's make sure this component can be re-used to retrieve data from an API. On `Memes.js`, build out a component that will import useFetch and render something with the data that comes back:

```jsx
import useFetch from "./hooks/useFetch";

function Memes() {
  const [data] = useFetch("https://api.imgflip.com/get_memes");

  return (
    <ul>
      <h1>MEMES</h1>
      {data &&
        data.data.memes.map((meme) => {
          return (
            <li key={meme.id}>
              {meme.name}
              <img src={meme.url} alt={meme.name} />
            </li>
          );
        })}
    </ul>
  );
}

export default Memes;
```

If you go to `https://api.imgflip.com/get_memes` in the browser, or use the URL to perform a GET request via the Postman app, you will see that the data that's returned is an object with the property `data`. Within that property is another property called `memes` which is the array that we want to work with. This is why `data.data.memes.map()` is used, because we want to parse the API results and map over the array that's available.

Each item in the array gives a unique ID which is useful for giving each `<li>` a key. We are then rendering the name of the meme, and the image.

## Loading Screen

You may have trouble getting data back in time to render it, so let's add something to the useFetch custom hook to make sure that you only try to render the API data **AFTER** the fetch promise returns with data.

First, let's update the `./hooks/useFetch`:

```jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, [url]);

  return [data, isLoading];
}

export default useFetch;
```

Here, we added a state variable `isLoading`. This is a boolean which will be passed to any component that uses the useFetch hook, where `true` means that you are still waiting for the data and `false` means that the data has arrived.

Now, let's take a look at how the `isLoading` is applied on the component that tries to use useFetch:

```jsx
import useFetch from "./hooks/useFetch";
import "./App.css";

function Pokemon() {
  const [data, isLoading] = useFetch(
    "https://pokeapi.co/api/v2/pokemon/pikachu"
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <h1> All about the pokemon {data.name}</h1>
      <ul>
        Moves:
        {data.moves.map((oneMove, index) => {
          return <li key={index}>{oneMove.move.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default Pokemon;
```

Before arriving at the return statement that will render the component, we are using an if statement.

- If `isLoading` is set to true, we can return some sort of loading screen!
- If `isLoading` gets set to false, it's safe to say that we can render a component based on this data, so the second return statement will run instead.

## Try it yourself!

- Look up a free API where the data looks interesting to render! Here are a couple of links to help:
- - `https://github.com/public-apis/public-apis`
- - `https://free-apis.github.io/#/browse`

- Create your own component, and name it something appropriate to the API being used
- On `index.js`, update the import to use your custom component
- Use the useFetch custom hook to retrieve the data
- Render something with the data that is returned
