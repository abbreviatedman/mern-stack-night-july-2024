import React from "react";
import { connect } from "react-redux";

// React component for Counter
const Counter = ({ count, increment, decrement }) => (
  <div>
    <h2>Counter: {count}</h2>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
  </div>
);

// Map Redux state to component props
const mapStateToProps = (state) => ({
  count: state.count,
});

// Map Redux actions to component props
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: "INCREMENT" }),
  decrement: () => dispatch({ type: "DECREMENT" }),
});

// Connect the Counter component to Redux
const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default ConnectedCounter;
