# React Router

React Router is the most popular routing library in React, but it can be a bit complicated to wrap your head around some of the more complex features. That is why in this lesson I will be breaking down everything you need to know about React Router so you can use even the most advanced features with ease. This lesson will be broken down into 4 sections.

1. React Router Basics
2. Advanced Route Definitions
3. Handling Navigation
4. Routers In Depth

---

## 1. React Router Basics

First, create a React project using `npx create-react-app react-router`

Before we start diving into the advanced features of React Router, I first want to talk about the basics of React Router. In order to use React Router on the web you need to run `npm i react-router-dom` to install React Router. This library specifically installs the DOM version of React Router. If you are using React Native you will need to install react-router-native instead. Other than this one small difference the libraries work almost exactly the same.

Once you have this library there are three things you need to do in order to use React Router.

1. 1. Setup your router
1. 2. Define your routes
1. 3. Handle navigation

### 1. 1. Set up your router

The easiest step by far is setting up your router. All you need to do is import the specific router you need and wrap your entire application in that router.

On `index.js`, import `BrowserRouter` and wrap the `App` element in `BrowserRouter` elements:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Here is the import!
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Here is the wrapper! */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

Generally you will import your router in the index.js page of your application and it will wrap your App component. The router works just like a context in React and provides all the necessary information to your application so you can do routing and use all the custom hooks from React Router.

OPTIONAL - You might also see in other applications that use React Router, on the `index.js` they are not wrapping the `App` component in the `BrowserRouter` component. This can happen, but on `App.js` this is an example of how it would be imported:

```jsx
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
```

Then if you render everything in a wrapped `<Router></Router>` component, this will produce the same effect. Both methods work fine, and it is up to you how you want to apply it. For the rest of this lesson however, we would be going with the first method shown where `BrowserRouter` wraps the `App` component on `index.js`

Before getting started, let's create 2 custom components within the `src` folder.

- Create `Home.js`:

```jsx
function Home() {
  return <h1> This is the homepage! </h1>;
}

export default Home;
```

- Create `GameList.js`:

```jsx
function GameList() {
  return <h1> This is the Game List! </h1>;
}

export default GameList;
```

### 1. 2. Define your routes

The next step in React Router is to define your routes. This is generally done at the top level of your application, such as in the `App` component, but can be done anywhere you want.

Here is an example of how it's done on the `App.js` file:

```jsx
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import GameList from "./GameList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<GameList />} />
    </Routes>
  );
}

export default App;
```

Defining routes is as simple as defining a single `Route` component for each route in your application and then putting all those `Route` components in a single `Routes` component. Whenever your URL changes, React Router will look at the routes defined in your Routes component and it will render the content in the element prop of the Route that has a path that matches the URL. In the above example if our URL was `/games` then the GameList component would be rendered.

The `Home.js` file is a functional component that only returns `<h1>This is the home page!</h1>`. The `GameList.js` file is a functional component that only returns `<h1>This is the GameList component</h1>`. We can expand on these components later, but the purpose is just to test the routes for now.

The nice thing about React Router is that when you navigate between pages it will only refresh the content inside your Routes component. All the rest of the content on your page will stay the same which helps with performance and user experience.

- Turn the server on with command `npm start`
- The initial page should load, and you should see text displaying `This is the home page!`
- In the URL bar, add `/games` to the end of the URL. You should see text displaying `This is the GameList component`

### 1. 3. Handling Navigation

The next step to React Router is handling navigation. Normally in an application you would navigate with anchor tags, but React Router uses its own custom `Link` component to handle navigation. This `Link` component is just like an anchor tag that helps ensure all the routing and conditional re-rendering is handled properly, so you can use it just like your would a normal anchor tag.

In `App.js`, make the following updates:

```jsx
// Include 'Link' in this import
import { Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import GameList from "./components/GameList";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameList />} />
      </Routes>
    </>
  );
}

export default App;
```

Note the empty tags `<>...</>` are there so we can return only 1 element in the return statement.

In our example we added two links to the home and games page. You will also notice that we used the `to` prop to set the URL instead of the `href` prop you are used to using with an anchor tag. This is the only difference between the `Link` component and an anchor tag, and is something that you need to remember as it is an easy mistake to accidentally use an `href` prop instead of the `to` prop.

Another thing to note about our new code is that the nav we are rending at the top of our page is outside of our `Routes` component which means when we change pages this nav section will not be re-rendered as only the content in the `Routes` component will change when the URL changes.

- Navigate back and forth using the nav bar at the top of the page
- Take note that the URL changes, and the elements that render change, but the nav bar stays the same

---

## 2. Advanced Route Definitions

This is where React Router really gets interesting. There is a lot of cool stuff you can do with routing to make more complex routes, easier to read, and overall much more functional. This can be done through five main techniques.

2. 1. Dynamic Routing
3. 2. Routing Priority
4. 3. Nested Routes
5. 4. Shared Layouts
6. 5. Outlet Context

### 2. 1. Dynamic Routing

The simplest and most common advanced feature in React Router is handling dynamic routes. In our example, let's assume that we want to render out a component for individual gamess in our application. We could hardcode each of those routes, but if we have hundreds of games (or the ability for users to create games), then it is impossible to hardcode all these routes. Instead we need a dynamic route.

First, let's create a component to represet just 1 game by creating `Game.js` within the `src` folder:

```jsx
function Game() {
  return <h1>This is about one game. </h1>;
}

export default Game;
```

- Add this route to your `App.js`

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/games" element={<GameList />} />
  {/* Add this route */}
  <Route path="/games/:id" element={<Game />} />
</Routes>
```

The final route in the above example is a dynamic route that has a dynamic parameter of `:id`. Defining dynamic routes in React Router is as simple as putting a colon in front of whatever you want the dynamic part of your route to be. In our case our dynamic route will match any URL that starts with `/game` and ends with some value. For example, `/games/1`, `/games/gameName`, and `/games/literally-anything` will all match our dynamic route.

For the most part, when you have a dynamic route like this you want to access the dynamic value in your custom component which is where the `useParams` hook comes in.

- Add the following to `./Game.js`:

```jsx
import { useParams } from "react-router-dom";

function Game() {
  const { id } = useParams();

  return <h1>Game {id}</h1>;
}

export default Game;
```

The `useParams` hook takes no parameters and will return an object with keys that match the dynamic parameters in your route. In our case our dynamic parameter is `:id` so the `useParams` hook will return an object that has a key of id and the value of that key will be the actual id in our URL. For example, if our URL was `/games/3` our page would render **Game 3**.

### 2. 2. Routing Priority

When we were just dealing with hard coded routes it was pretty easy to know which route would be rendered, but when dealing with dynamic routes it can be a bit more complicated. Take these routes for example.

- Create `./NewGame.js`:

```jsx
function NewGame() {
  return (
    <form>
      <label>
        This is where you would create a new game:
        <input type="text" name="newGame" />
      </label>
    </form>
  );
}

export default NewGame;
```

- Add this route to your `App.js`

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/games" element={<GameList />} />
  <Route path="/games/:id" element={<Game />} />
  {/* Add this route */}
  <Route path="/games/new" element={<NewGame />} />
</Routes>
```

In older versions of React Router, whichever route was defined first would be the one that is rendered so in our case the `/books/:id` route would be rendered which is obviously not what we want. If we had the URL `/games/new` which route would this match? Technically, we have two routes that match. Both `/games/:id` and `/games/new` will match since the dynamic route will just assume that `new` is the `:id` portion of the URL, so React Router needed another way to determine which route to render. Luckily, version 6 of React Router changed this so now React Router will use an algorithm to determine which route is most likely the one you want. In our case we obviously want to render the `/books/new` route so React Router will select that route for us. The actual way this algorithm works is very similar to CSS specificity since it will try to determine which route that matches our URL is the most specific (has the least amount of dynamic elements) and it will select that route.

While we are on the topic of routing priority I also want to talk about how to create a route that matches anything:

- Create `./NotFound.js`

```jsx
function NotFound() {
  return (
    <>
      <h1>Error: Page Not Found</h1>
    </>
  );
}

export default NotFound;
```

- Add this route to your `App.js`

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/games" element={<GameList />} />
  <Route path="/games/:id" element={<Game />} />
  <Route path="/games/new" element={<NewGame />} />
  {/* Add this route */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

A `*` will match anything at all which makes it perfect for things like a 404 page. A route that contains a `*` will also be less specific than anything else so you will never accidentally match a `*` route when another route would have also matched.

Make sure before testing, to update your imports and add the new links on your `App.js`. Here is what that file should currently look at:

```jsx
import { Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import GameList from "./GameList";
// New imports
import Game from "./Game";
import NewGame from "./NewGame";
import NotFound from "./NotFound";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          {/* New Links */}
          <li>
            <Link to="/games/1">Game 1</Link>
          </li>
          <li>
            <Link to="/games/new">New Game</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameList />} />
        {/* New Routes */}
        <Route path="/games/:id" element={<Game />} />
        <Route path="/games/new" element={<NewGame />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
```

- Test your new URL routes using the navbar.
- Make sure you test the dynamic route with various params. Use `%20` as a space to test how it would look with spaces!
- Test `localhost:3000/gibberish` or any other unused URL extension to test the NotFound component.

### 2. 3. Nested Routes

Finally, we have come to how they handle route nesting. In the above example we have three routes that start with /games so we can nest those routes inside of each other to clean up our routes:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/games">
    <Route index element={<GameList />} />
    <Route path=":id" element={<Game />} />
    <Route path="new" element={<NewGame />} />
  </Route>
  <Route path="*" element={<NotFound />} />
</Routes>
```

This nesting is pretty simple to do. All you need to do is make a parent `Route` that has the `path` prop set to the shared path for all your child `Route` components. Then inside the parent `Route` you can put all the child `Route` components. The only difference is that the `path` prop of the child `Route` components no longer includes the shared `/games` route. Also, the route for `/games` is replaced with a `Route` component that has no `path` prop, but instead has an `index` prop. All this is saying is that the path of the index `Route` is the same as the parent `Route`.

Now if this is all you could do with nested routes it would be only marginally useful, but the true power of nested routes comes in how it handles shared layouts.

### 2. 4. Shared Layouts

Let's imagine that we want to render a nav section with links to each game as well the new game form from any of our game pages. To do this normally we would need to make a shared component to store this navigation, and then import that into every single game related component. This is a bit of a pain, though, so React Router created its own solution to solve this problem. If you pass an `element` prop to a parent route it will render that component for every single child `Route` which means you can put a shared nav or other shared components on every child page with ease.

- Modify the routes on `App.js`:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/games" element={<GameList />}>
    <Route path=":id" element={<Game />} />
    <Route path="new" element={<NewGame />} />
  </Route>
  <Route path="*" element={<NotFound />} />
</Routes>
```

- Modify `./GameList.js`:

```jsx
import { Link, Outlet } from "react-router-dom";

function GameList() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/games/1">Game 1</Link>
          </li>
          <li>
            <Link to="/games/2">Game 2</Link>
          </li>
          <li>
            <Link to="/games/Chess">Chess</Link>
          </li>
          <li>
            <Link to="/games/new">Create a new game</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

export default GameList;
```

The way our new code will work is whenever we match a route inside the `/game` parent `Route`, it will render the `GameList` component which contains our shared navigation. Then whichever child `Route` is matched will be rendered wherever the `Outlet` component is placed inside our layout component. The `Outlet` component is essentially a placeholder component that will render whatever our current page's content is. This structure is incredibly useful and makes sharing code between routes incredibly easy.

### 2. 5. Outlet Context

The final important thing to know about `Outlet` components is they can take in a `context` prop which will work just like React context.

```jsx
import { Link, Outlet } from "react-router-dom";

function GameList() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/games/1">Game 1</Link>
          </li>
          <li>
            <Link to="/games/2">Game 2</Link>
          </li>
          <li>
            <Link to="/games/new">New Game</Link>
          </li>
        </ul>
      </nav>

      <Outlet context={{ hello: "world" }} />
    </>
  );
}

export default GameList;
```

```jsx
import { useParams, useOutletContext } from "react-router-dom";

function Game() {
  const { id } = useParams();
  // Import it at the top, and create a variable to hold it here
  const context = useOutletContext();

  return (
    // Then, display the context like this
    <h1>
      Game {id} {context.hello}{" "}
    </h1>
  );
}

export default Game;
```

As you can see from this example, we are passing down a context value of `{ hello: "world" }` and then in our child component we are using the `useOutletContext` hook to access the value for our context. This is a pretty common pattern to use since often you will have shared data between all your child components which is the ideal use case for this context.
