# React: TypeScript

---

## What this lesson covers:

---

## Intro

TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing and other features to the language, enabling developers to catch errors early in the development process and write more scalable and maintainable code. TypeScript is widely adopted in modern web development projects, particularly in large-scale applications where type safety and tooling support are crucial.

## Setup

Using TypeScript is an option when using the `create-react-app`. Use the following command in the terminal to activate this option:

```bash
npx create-react-app my-app --template typescript
```

When using this option, you can still plug in your `.js` files and it works the same way. However, it doesn't work in the other direction (if you don't use the TypeScript option, you cannot use `.ts` files).

## With vs Without TypeScript

Here is a simple To-Do list app written without TypeScript:

```jsx
import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new to-do"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Here is a simple To-Do list app written with TypeScript:

```tsx
import React, { useState } from "react";

interface Todo {
  text: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue }]);
      setInputValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new to-do"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

## Features

In TypeScript, any time you define a default value or an expected value of any kind, you must also define it's datatype. This applies to defining variables using `useState`, defining parameters within function definitions, or declaring interface (making your own type)

### useState

In React, the `useState` hook is commonly used to define and manage state variables. When using TypeScript, you can explicitly specify the type of state variable that `useState` manages. For example:

```tsx
import React, { useState } from "react";

const [count, setCount] = useState<number>(0); // `count` will hold a number
const [text, setText] = useState<string>(""); // `text` will hold a string
const [isComplete, setIsComplete] = useState<boolean>(false); // `isComplete` will hold a boolean
```

### Parameters

When defining functions in TypeScript, you can specify the types of function parameters to enforce type safety and provide documentation for developers using your code. For example:

```tsx
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}

greet("Alice"); // Output: Hello, Alice!
```

### interface

You can also define your own datatypes using keyword `interface`.

In TypeScript, the `interface` keyword is used to define a new type. In this case, `Todo` is an interface that defines the structure of an object representing a todo item.

```tsx
interface Todo {
  text: string;
}
```

By defining this interface, you're specifying the shape of objects that are considered to be todos in your application. This can be useful for type-checking and ensuring consistency throughout your codebase.

In this case, it is a schema for objects that are stored in our state variable:

```tsx
const [todos, setTodos] = useState<Todo[]>([]);
```

The `<Todo[]>` is to indicate that the variables in the `todos` array are expected to match the interface `Todo`.
