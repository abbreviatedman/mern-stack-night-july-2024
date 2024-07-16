# 2. Hooks + Props lab

---

## Getting Started

- Use command `npx create-react-app hooks-props-lab`

## useState

For this lab, we're going to create a todo-list type of app with front-end CRUD functionality, using useState hooks to keep track of our data

On `App.js`, import useState at the top:

```js
import React, { useState } from "react";
import "./App.css";
```

In between the functional component and the imports, we will hold our initial data:

```js
const pokeData = [
  {
    name: "Pikachu",
  },
  {
    name: "Charizard",
  },
  {
    name: "Nosepass",
  },
];
```

Next, we will keep track of this and handle changing data with useState

```jsx
function App() {
  const [team, setTeam] = useState(pokeData);

  return <div className="App"></div>;
}
```

Note that we are using `useState(pokeData)` to initialize state using the data we declared earlier.

Now, we will display them by mapping over the state:

```jsx
return (
  <div className="App">
    <div style={{ marginTop: 50 }}></div>
    <ul style={{ marginTop: 50 }}>
      My Pokemon Team:
      {team.map((pokemon, index) => (
        <li key={index}>{pokemon.name}</li>
      ))}
    </ul>
  </div>
);
```

Note that each `<li></li>` is getting a key, as per best practice for React.

Next, we will use an input to be able to add to our `team` variable in the state of the App.

```jsx
const [team, setTeam] = useState(pokeData);
// Handles the input form
const [input, setInput] = useState("");

// Handles the form response
function handleOnSubmit(event) {
  // Prevent refreshing the page
  event.preventDefault();

  // Redefine the team by spreading the current state into a new array, and adding a new object on the end using the input in state
  setTeam([...team, { name: input }]);
  // Reset the input field
  setInput("");
}

return (
  <div className="App">
    <div style={{ marginTop: 50 }}>
      <form onSumbit={handleOnSubmit}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
    <ul style={{ marginTop: 50 }}>
      My Pokemon Team:
      {team.map((pokemon, index) => (
        <li key={index}>{pokemon.name}</li>
      ))}
    </ul>
  </div>
);
```

There is a lot happening here, so let's discuss how this works. The input tag's value at all times will be a representation of the state `input`. The `onChange` attribute is redefining the state `input` every single time a new letter is typed in. This way, the input field on the client's end is never standing alone, it is always a representation of the state `input`. Whenever we want to use this value, we don't need to reach into the DOM, we can simply reach the state `input`.

When this form is submitted, it is running the `handleOnSubmit` function. That function is redefining the state `team` by using the current state of `team` and including a new object that is named using state `input`. After that, state `input` is cleared. React will then render the page using this information, the input field will be empty based on state `input`, and the list will be rendered from state `team`.

Next, we will create the ability to delete items off of the list. First, let's write a function to handle it:

```js
function handleDeleteByIndex(target) {
  let filteredArray = team.filter((_, index) => index !== target);
  setTeam(filteredArray);
}
```

In here, the `filteredArray` variable is taking a copy of state `team`, but it is only leaving out a single object where the index matches the index it's given. Then, we use `setTeam(filteredArray)` to redefine state `team` and re-render the page based on this.

Next, we will add a delete button to the map function, so each team member has it's own version of `handleDeleteByIndex` using it's appropriate index:

```jsx
<ul style={{ marginTop: 50 }}>
  My Pokemon Team:
  {team.map((pokemon, index) => (
    <li key={index}>
      {pokemon.name}
      <button
        onClick={() => handleDeleteByIndex(index)}
        style={{ marginLeft: 50 }}
      >
        Delete
      </button>
    </li>
  ))}
</ul>
```

So far, this is what your App.js will look like:

```jsx
import React, { useState } from "react";
import "./App.css";

// initial data
const pokeData = [
  {
    name: "Pikachu",
  },
  {
    name: "Charizard",
  },
  {
    name: "Nosepass",
  },
];

function App() {
  const [team, setTeam] = useState(pokeData);
  const [input, setInput] = useState("");

  function handleOnSubmit(event) {
    event.preventDefault();

    setTeam([...team, { name: input }]);
    setInput("");
  }

  function handleDeleteByIndex(target) {
    let filteredArray = team.filter((_, index) => index !== target);
    setTeam(filteredArray);
  }

  return (
    <div className="App">
      <div style={{ marginTop: 50 }}>
        <form onSubmit={handleOnSubmit}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <ul style={{ marginTop: 50 }}>
        My Pokemon Team:
        {team.map((pokemon, index) => (
          <li key={index}>
            {pokemon.name}
            <button
              onClick={() => handleDeleteByIndex(index)}
              style={{ marginLeft: 50 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

## Refactor into components

Now we should refactor our code to separate our concerns. This form and this list are things that can be re-usable components, depending on the context in the overall application. On `App.js` we will hold our data and state, but we will pass them into the other components as props.

For example, In the case that you're making some sort of "Notes" application, and on such application you can have several files that each contain their own list of items, THIS component could be re-used with the ability to submit new items on the list, and delete unnecessary items. The context will change depending on the needs of the user, but all of the functionality can remain re-usable and dynamic.

Let's begin with the form.

- Create `Form.js` in the src folder:

```jsx
import React from "react";

function Form({ handleOnSubmit, setInput, input }) {
  return (
    <div style={{ marginTop: 50 }}>
      <form onSubmit={handleOnSubmit}>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
```

Next, let's do the list

- Create `List.js` in the src folder:

```jsx
import React from "react";

function List({ team, handleDeleteByIndex }) {
  return (
    <ul style={{ marginTop: 50 }}>
      My Pokemon Team:
      {team.map((pokemon, index) => (
        <li key={index}>
          {pokemon.name}
          <button
            onClick={() => handleDeleteByIndex(index)}
            style={{ marginLeft: 50 }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default List;
```

Finally, on `App.js` we should import these components at the top:

```jsx
import Form from "./Form";
import List from "./List";
```

And we should render the components by passing in the appropriate variables/functions as props:

```jsx
return (
  <div className="App">
    <Form handleOnSubmit={handleOnSubmit} input={input} setInput={setInput} />
    <List team={team} handleDeleteByIndex={handleDeleteByIndex} />
  </div>
);
```

Isn't this code easier to read now? Separating things into components makes sure your code is clean and easy to follow!

Now let's give the `List.js` the ability to edit one list item at a time. We will begin by adding the following to `App.js`:

```jsx
const [editMode, setEditMode] = useState(false);

function handleDoubleClick() {
  console.log(`editing is set to ${editMode ? true : false}`);

  setEditMode((prevState) => {
    return !prevState;
  });
}
```

And make sure to pass this into the List component:

```jsx
<List
  team={team}
  handleDeleteByIndex={handleDeleteByIndex}
  editMode={editMode}
  handleDoubleClick={handleDoubleClick}
/>
```

Now, we need to render either an input field, or a span element depending on the state of `edit` on `App.js`.

On `List.js` make the following changes:

```jsx
function List({ team, handleDeleteByIndex, editMode, handleDoubleClick }) {
  return (
    <ul style={{ marginTop: 50 }}>
      My Pokemon Team:
      {team.map((pokemon, index) => (
        <li key={index}>
          {editMode ? (
            <input type="text" defaultValue={pokemon.name} />
          ) : (
            <span onDoubleClick={handleDoubleClick}>{pokemon.name}</span>
          )}
          <button
            onClick={() => handleDeleteByIndex(index)}
            style={{ marginLeft: 50 }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

Next we're going to handle the ability to save these edits back to the team. First, on `App.js`, let's write a function to handle it if a user presses Enter during the edit state:

```js
function handleOnKeypress(event, index) {
  if (event.key === "Enter") {
    setEditMode((prevState) => {
      return !prevState;
    });

    const newArray = [...team];
    newArray[index].name = event.target.value;
    setTeam(newArray);
  }
}
```

Don't forget to pass this into the List component!

```jsx
<List
  team={team}
  handleDeleteByIndex={handleDeleteByIndex}
  edit={edit}
  handleDoubleClick={handleDoubleClick}
  handleOnKeypress={handleOnKeypress}
/>
```

Now on `List.js`, make sure to import these props and use them on the input:

```jsx
<input
  type="text"
  defaultValue={pokemon.name}
  onKeyDown={(e) => handleOnKeypress(e, index)}
/>
```

You may notice that when you double click something on the list, ALL of the list items become something you can edit. This is because the state variable `editMode` is on the `App.js` level, meaning it's at the top level. If the whole application is in `editMode`, then all items can be edited. We need to refactor this code such that only 1 item at a time enters `editMode` when it is clicked. To do this, we need to create a new component to represent 1 list item, and contain the state variable `editMode` in there.

Below, I will show the completed version of each file:

COMPLETED `App.js`

```jsx
import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import List from "./components/List";

function App() {
  const pokeData = [
    {
      name: "Pikachu",
    },
    {
      name: "Charizard",
    },
    {
      name: "Nosepass",
    },
  ];

  const [team, setTeam] = useState(pokeData);

  const [input, setInput] = useState("");

  function handleOnSubmit(event) {
    // prevent refreshing
    event.preventDefault();

    setTeam([...team, { name: input }]);

    setInput("");
  }

  function handleDeleteByIndex(target) {
    let filteredArray = team.filter((_, index) => index !== target);
    setTeam(filteredArray);
  }

  return (
    <div className="App">
      <Form input={input} handleOnSubmit={handleOnSubmit} setInput={setInput} />
      <List
        team={team}
        handleDeleteByIndex={handleDeleteByIndex}
        setTeam={setTeam}
      />
    </div>
  );
}

export default App;
```

COMPLETED `List.js`

```jsx
import Item from "./Item";
import "../App.css";

function List({ team, handleDeleteByIndex, setTeam }) {
  return (
    <ul style={{ marginTop: 50 }}>
      My Pokemon Team:
      {team.map((pokemon, index) => (
        <li key={index}>
          <Item pokemon={pokemon} team={team} setTeam={setTeam} index={index} />
          <button
            onClick={() => handleDeleteByIndex(index)}
            style={{ marginLeft: 50 }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default List;
```

COMPLETED `Item.js`

```jsx
import React, { useState } from "react";

function Item({ pokemon, team, setTeam, index }) {
  const [editMode, setEditMode] = useState(false);

  function handleDoubleClick() {
    console.log(`editing is set to ${editMode}`);

    setEditMode((prevState) => {
      return !prevState;
    });
  }

  function handleOnKeyPress(event, index) {
    if (event.key === "Enter") {
      setEditMode((prevState) => {
        return !prevState;
      });

      const newArray = [...team];
      newArray[index].name = event.target.value;
      setTeam(newArray);
    }
  }

  return (
    <div>
      {editMode ? (
        <input
          type="text"
          defaultValue={pokemon.name}
          onKeyDown={(e) => handleOnKeyPress(e, index)}
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{pokemon.name}</span>
      )}
    </div>
  );
}

export default Item;
```

Here is a short explanation of each `CRUD` feature, and how the data flows from one component to the next

### `C`reate a new pokemon:

- <------handleOnSubmit()--- input
- `App.js` ----------------- `Form.js`

### `R`ead pokemon:

- --team-------team.map()------pokemon-->
- `App.js` --- `List.js` ----- `Item.js`

### `U`pdate a pokemon:

- <--team------------------handleOnKeyPress()----editMode--
- `App.js` --- `List.js` ---------------------- `Item.js`

### `D`elete a pokemon:

- <--team-----handleDeleteByIndex()
- `App.js` ------- `List.js`
