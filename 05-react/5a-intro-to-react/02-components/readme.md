# Components

All the pieces of your web app can be thought of as components. For example let's say you have a web app that allows users to search for different types of wine based on what they like and the app will display matching wine with reviews and links to purchase. The search box can be one component called Search, the area that displays the search results can be another component called Results. Each individual search result can be a component called Wine. Inside each Wine component can be broken down into child components for each part such as Description, Reviews, and Purchase buttons. Essentially components are the individual building blocks of our user interface. React makes it easy to create reusable components can can be copied from project to project. React also ensures that changes to our application state will be displayed in our components. For example when a user clicks the Purchase button component the Cart component should update to show the products in cart count has increased to 1 item in their Cart.

Note: React lets you define components as classes or functions. This course will primarily focus on creating components using functions. It is useful to know this method as at the time of writing this, many existing react applications still use class components. However, more and more new applications are being developed using functional components and React hooks. After this course consider spending some time to learn this alternate way of creating components.

## Class based components

In order to give our class all the super powers of a React Component we must extend our class. Here we will create the simplest possible class component and we will add to it with additional features as we go. Let's create a component for our wine.

```jsx
import React, { Component } from "react";

class Wine extends Component {
  render() {
    return <h2>Graham Beck Chardonnay</h2>;
  }
}
```

React Component classes must contain a render method that returns a single JSX element. In the code above, ours is returning a heading with the name of our wine.

## Import usage

Sometimes we may see developers write their import and extends this way:

```jsx
import React from "react";

class Wine extends React.Component {}
```

However, in order to make our code more simplified, we can take advantage of the `import` commands abilities to give us direct access to `Component` by adding `{ Component }` to our import command.

```jsx
import React, { Component } from "react";

class Wine extends Component {}
```

Both ways shown here will work and in the wild you may see it written both ways.

## Reusing components in other files

In order to be able to use our wine in another component, we must remember to export it. For more on import and export see [https://www.geeksforgeeks.org/es6-import-and-export/](https://www.geeksforgeeks.org/es6-import-and-export/)

```jsx
import React, { Component } from "react";

class Wine extends Component {
  render() {
    return <h2>Graham Beck Chardonnay</h2>;
  }
}

export default Wine;
```

Since we have exported our Wine component we can now import it into another file. Let's say we saved the code above into a file called wine.js Then in another file we can import it. here we are importing from `./` meaning the same folder.

```javascript
import Wine from "./wine";
```

This allows our React components to be organized in separate files and makes them modular and reusable.

## Rendering components

In order to render our class component into our web app we can pass the component to ReactDOM the way we learned before. Imagine this is a separate file so we import in

```jsx
import React from "react";
import ReactDOM from "react-dom";
import Wine from "./wine"; // This is importing our component!

ReactDOM.render(<Wine />, document.getElementById("root")); // This is rendering our component into the DOM.
```

Our component doesn't do very much right now, but in upcoming learning modules we will cover more about class components such as passing values to them via "props" and setting and modifying "state" to allow our component to react to changes in our application. We will also be learning about lifecycle methods that allow us to tap into moments in time when the component mounts, unmounts, or updates, and much more.

## Functional components

React supports functional components that behave similarly but are written a bit different. Let's see what our class component would look like as a functional component.

```jsx
import React from "react";

function Wine() {
  return <h2>Graham Beck Chardonnay</h2>;
}

export default Wine;
```

Pretty cool that was less code. Notice that the JSX can simply be returned without needing to be wrapped in an render method. You might also see developers using arrow function syntax instead:

```jsx
import React from "react";

const Wine = () => {
  return <h2>Graham Beck Chardonnay</h2>;
};

export default Wine;
```

All of these ways of writing functional components will produce the same result. Now you know how to recognize them in code whatever form they may take.

## Nesting components

We can nest one component inside another by including it by name inside a block of JSX code.

```jsx
import React, { Component } from "react";

class Task extends Component {
  render() {
    return <li>Walk the dog</li>;
  }
}

class TaskList extends Component {
  render() {
    return (
      <ul>
        <Task />
      </ul>
    );
  }
}
```

As you can see we nested the Task component inside of the TaskList component. If we tell ReactDOM to render the TaskList component this is what we would see in the browser.

```html
<ul>
  <li>Walk the dog</li>
</ul>
```

This also works the same for functional components

```jsx
import React from 'react';

function Task() {
  return <li>Walk the dog</li>;
}

function TaskList {
  return <ul>
           <Task />
         </ul>;
}
```

Nesting components allows us to separate logic, and to break otherwise complicated components down into smaller more manageable parts and pieces.

Also, don't forget if the components you are nesting are in separate files, use `export` and `import` to make them available in other files.
