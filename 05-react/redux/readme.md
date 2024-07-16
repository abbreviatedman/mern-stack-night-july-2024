# React: Redux

---

## What this lesson covers:

- Intro
- Setup
- Example

---

## Intro

React Redux is a library for managing the state of your React application. It's useful for large-scale applications where managing state can become complex. Normally, you would concern yourself with having various different states in various different components. This can work with small components or components dedicated to a small task (without needing any contextual data), but certain data will need to be front-end persistent as a user navigates around to sustain a smooth user experience.

Here's how React Redux typically works:

1. **Store**: The Redux store is a single source of truth for your application's state. It holds the entire state tree of your application. You create the store by combining reducers, which are functions that specify how the state should change in response to actions.

2. **Actions**: Actions are payloads of information that describe changes to the state. They are plain JavaScript objects that have a `type` property indicating the type of action being performed. You dispatch actions to the Redux store to trigger state updates.

3. **Reducers**: Reducers are pure functions that specify how the application's state changes in response to actions. Each reducer takes the current state and an action as arguments, and returns the new state. Reducers are combined using the `combineReducers` function provided by Redux.

4. **Provider**: The `<Provider>` component from React Redux is used to provide the Redux store to your React components. You wrap your root component with the `<Provider>` component to make the Redux store available to all components in your application.

5. **Connect**: The `connect` function from React Redux is used to connect React components to the Redux store. It takes two optional arguments: `mapStateToProps` and `mapDispatchToProps`. `mapStateToProps` is used to extract data from the Redux store and pass it as props to the connected component, while `mapDispatchToProps` is used to dispatch actions from the connected component.

## Setup

Use the following command to install the library:

```bash
npm install react-redux @reduxjs/toolkit
```

The folder/file structure should look like this:

```bash
src/
  |- components/
  |- pages/
  |- redux/
  |   |- store.js
  |   |- reducers/
  |   |- actions/
  |   |- middleware/
  |- utils/
  |- App.js
  |- index.js
```

React Redux includes a `<Provider />` component, which makes the redux store available to the rest of your app:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

## Example 1

Let's say we're making a Counter app. Users can read a number counter, and click on buttons to make this number go up or down. After setting up the `index.js` to wrap the App in the Provider, let's set up our `store.js`.

### Store

First, we import `configureStore`:

```jsx
import { configureStore } from "@reduxjs/toolkit";
```

`configureStore` is a function provided by the Redux Toolkit for creating a Redux store with pre-configured options.

Next, we'll define the Reducer Function:

```jsx
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};
```

A Reducer Function is responsible for specifying how the app's state should change in response to dispatched actions. Any reducer functions take 2 parameters:

1. `state`: represents the current state
2. `action`: representing the action being dispatched

Inside this function, a `switch` statement is usually used to provide a clear and concise way to handle different action types within the reducer function. The component that's connected to the store will define on it's end what actions will send what types to this reducer. By default, it will return the state.

Next we have to create the Redux store:

```jsx
const store = configureStore({
  reducer: counterReducer,
});
```

The `configureStore` function accepts an options object as an argument. In this case, we're providing a `reducer` option, which specifies the reducer function (`counterReducer`) to be used to update the state.

After exporting it at the bottom, your total `store.js` should look like this:

```jsx
import { configureStore } from "@reduxjs/toolkit";

// Reducer function
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// Create Redux store
const store = configureStore({
  reducer: counterReducer,
});

export default store;
```

### Component

Now we need our `Counter.js` component to be connected to our store. Here's how that works:

First, we need to import `connect`:

```jsx
import { connect } from "react-redux";
```

`connect` provides your component with access to the Redux store's state via props. You can specify which parts of the state you want your component to have access to using the `mapStateToProps` function.

Next, we should define the component:

```jsx
const Counter = ({ count, increment, decrement }) => (
  <div>
    <h2>Counter: {count}</h2>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
  </div>
);
```

You'll notice that `count`, `increment`, and `decrement` are all props. We need to map these to our Redux store:

```jsx
const mapStateToProps = (state) => ({
  count: state.count,
});
```

Like the name suggests, it will map the props to be state variables that are handled in the store. They're all attached to the `state` object, who's properties we have already defined on `store.js`. The function for state and actions are different, so here is the one for actions:

```jsx
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: "INCREMENT" }),
  decrement: () => dispatch({ type: "DECREMENT" }),
});
```

Here we are giving names to different action types. The lowercase `increment` matches the prop, where the uppercase `INCREMENT` matches the switch statement on `store.js`. Finally before exporting the component, we need to use the `connect` that we imported:

```jsx
const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);
```

The `connect` function takes 2 parameters `mapStateToProps` and `mapDispatchToProps` and returns a higher order component. The returned component is then used to wrap the original `Counter` component, creating a new component (`ConnectedCounter`) that has access to Redux state and dispatch actions as props.

The higher order component `ConnectedCounter` can now be plugged in anywhere (in our case, `App.js`) and it will remain connected to the Redux store.
