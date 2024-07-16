# Props Exercise

![Exercise Preview](https://i.imgur.com/p3AtNe8.png)

## Exercise overview

We are going to make an archive page for a blog site that displays a list of recent articles.

## Set up a new Create-React-App project

1. Open VS code and then open your terminal from the menus at the top of the screen under `View > Terminal` or use the shortcut key **Ctrl+`**.

2. In Terminal type `npx create-react-app travel-blog`. Here we are naming our project travel-blog. Wait while a new project is setup... It will display "Happy hacking!" when it's done.

3. Then in Terminal type `cd travel-blog` to enter the project folder.

## Install Bootstrap

4. Next let's import Bootstrap a front-end framework that provides CSS code to make our project beautiful. In terminal type `npm i bootstrap@5.2.3`. This will install the package into our project.

## Start Node Test Server

5. In terminal type `npm start` to start a node test server this should open a new tab in your browser to **localhost:3000**.

## Import Bootstrap

6. Then in VS Code, open the **/src/index.js** file and import the bootstrap css like by typing the following line `import 'bootstrap/dist/css/bootstrap.css';` placing it just after the import for ReactDOM and just before our import for **Index.css**. This way we can override the bootstrap styles with our own inside Index.css if we wish to.

## Exercise Assets

7. Move the image files from the current folder outside the create-react-app project folder into the create-react-app folder `public`—this way the images will be accessible to your application.

## Creating the App Component

8. Open **/src/App.js**. This file is an example component that create-react-app starts with. You can delete everything in this file. Create a basic App function with an empty return, and then export it at the bottom—this way, you won't forget to export it later (a common oversight).

```jsx
function App() {
  return ()
}

export default App;
```

9. Create a `<div>` inside of the `return()` statement.

10. Add `className="App container-fluid"` into the `<div>` element. This will apply some CSS styles to it.

```jsx
function App() {
  return (
    <div className="App container-fluid"></div>
  );
}

export default App;
```

11. Then, inside the `<div>`, create a heading `<h1>My Travel Blog</h1>`.

```jsx
function App() {
  return (
    <div className="App container-fluid">
      <h1>My Travel Blog</h1>
    </div>
  );
}
```

12. Save the file and visit the browser to make sure our heading is appearing.

13. Back inside **/src/App.js** below our heading place `<div className="row"></div>`.

```jsx
function App() {
  return (
    <div className="App container-fluid">
      <h1>My Travel Blog</h1>
      <div className="row"></div>
    </div>
  );
}
```

## Creating the Article Component

14. In VS Code in the File Explorer to the left right click on the **/src/** folder and select **New File**. Name the file `Article.js`.

15. Open **/src/Article.js** and create a function called `Article` with an empty return, and then export it at the bottom—this way, you won't forget to export it later (a common oversight).

``` js
function Article() {
  return ();
}

export default Article;
```

16. Add a `<div>` to the inside of the `return()` statement.

17. Inside the `<div>` add the class `className="article col-4"`.

18. Inside the div let's write some place filler text `Hello I'm An Article!`.

```jsx
function Article() {
  return (
    <div className="article col-4">Hey I'm an article!</div>
  )
}

export default Article;
```

19. Let's try to import this Article into our App component. Open **/src/App.js** again and after we import React create a new line to import our Article `import Article from './Article';`. Also import the App.css with `import './App.css';`

20. Then inside of the `<div className="row">` refer to your Article component as `<Article />`.

```jsx
import Article from "./Article";
import "./App.css";

function App() {
  return (
    <div className="App container-fluid">
      <h1>My Travel Blog</h1>
      <div className="row">
        <Article />
      </div>
    </div>
  );
}

export default App;
```

21. Save and check the browser and you should see the text "Hello I'm An Article!".

## Adding Prop Data

22. Now that we know our App component can see our Article component, let's add some made up dummy data. This data often comes from a database, but for now we are just going to add it as a property of our component to make things simple. On `App.js`, inside your function before the render method paste in the following code:

```javascript
articles = [
  {
    id: 1,
    title: "Taiwan's Hidden Treasures",
    body: "You could spend months exploring Taiwan's Buddhist temples, villages, cities, and mountains and still barely scratch the surface of all the island has to offer.",
    img: "/taiwan.jpg",
  },
  {
    id: 2,
    title: "High Culture In Sao Paulo",
    body: "The largest city in South America, Sao Paulo's cuisine and art is as multinational as its diverse population of ten million people.",
    img: "/sao-paulo.jpg",
  },
  {
    id: 3,
    title: "Bonaire Is Scuba Heaven",
    body: "Bonaire is one of the top diving destinations in the world. Known as the shore dive capital of the world, it has great accessibility to its reefs.",
    img: "/bonaire.jpg",
  },
];
```

This is what it looks like inside your component:

```jsx
function App() {
  let articles = [
    {
      id: 1,
      title: "Taiwan's Hidden Treasures",
      body: "You could spend months exploring Taiwan's Buddhist temples, villages, cities, and mountains and still barely scratch the surface of all the island has to offer.",
      img: "/taiwan.jpg",
    },
    {
      id: 2,
      title: "High Culture In Sao Paulo",
      body: "The largest city in South America, Sao Paulo's cuisine and art is as multinational as its diverse population of ten million people.",
      img: "/sao-paulo.jpg",
    },
    {
      id: 3,
      title: "Bonaire Is Scuba Heaven",
      body: "Bonaire is one of the top diving destinations in the world. Known as the shore dive capital of the world, it has great accessibility to its reefs.",
      img: "/bonaire.jpg",
    },
  ];

  return (
    <div className="App container-fluid">
      <h1>My Travel Blog</h1>
      <div className="row">
        <Article />
      </div>
    </div>
  );
}
```

Notice that our data is named `articles` and contains an array with three objects inside that hold the content for each article.

## Using Map To Create Many Articles From An Array Of Data

23. Instead of loading just one `<Article />` component, we would like to loop over the articles array and create an article for each item in the array. the `map` function makes this easy to write

```jsx
function App() {
  let articles = []; // data was shortened to conserve space

  return (
    <div className="App container-fluid">
      <h1>My Travel Blog</h1>
      <div className="row">
        {articles.map((oneArticle) => (
          <Article />
        ))}
      </div>
    </div>
  );
}
```

24. Save and check the browser. You should see the text "Hello I'm An Article!" appearing 3 times.

## Passing Data As Props

25. Let's use props to pass the articles data from our App component down into our Article component. The map function receives a call back function which we have written as an arrow function. The argument we pass in is the name we want to call each element that is returned from the articles array. I chose to call it `oneArticle` as it represents just one article. Then inside the `<Article />` component we add the attribute for `key=""` (a unique identifier that React uses) and a prop we are creating called `content=""` to pass the article content into.

```jsx
function App() {
  let articles = []; // data was shortened to conserve space

  return (
    <div className="App container-fluid">
      <h1>My Travel Blog</h1>
      <div className="row">
        {articles.map((oneArticle) => (
          <Article key={oneArticle.id} content={oneArticle} />
        ))}
      </div>
    </div>
  );
}
```

We must pass the `key=""` attribute a unique label, we decided to use the id property that is found inside each element of the articles array.

26. Head back to **/src/Article.js**. Let's remove the text that says "Hello I'm An Article!" and replace it with 3 elements an `<img>` image, `<h2>` a heading, and a `<p>` paragraph.

```jsx
function Article(props) {
  return (
    <div className="article col-4">
      <img />
      <h2></h2>
      <p></p>
    </div>
  );
}

export default Article;
```

27. Give the image element a class style, a src attribute, and also an alt attribute like so `<img className="img-fluid" src={} alt="featured" />`. In order to display the correct img source url we will refer to the props object that has a property we passed in called `contents`.

```jsx
<img className="img-fluid" src={props.content.img} alt="featured" />
```

If you are not sure what to type to get to a particular property you can always look over the articles array again that is inside **/src/App.js**

28. For the heading we will reference the `title` property.

```jsx
<h2>{props.content.title}</h2>
```

29. For the paragraph we want to insert the text that's stored inside the props `body` property.

```jsx
<p>{props.content.body}</p>
```

Here is the completed code for Article.js

```jsx
function Article(props) {
  return (
    <div className="article col-4">
      <img className="img-fluid" src={props.content.img} alt="featured" />
      <h2>{props.content.title}</h2>
      <p>{props.content.body}</p>
    </div>
  );
}

export default Article;
```

Here is the finished code for App.js

```jsx
import Article from "./Article";
import "./App.css";

function App() {
  let articles = [
    {
      id: 1,
      title: "Taiwan's Hidden Treasures",
      body: "You could spend months exploring Taiwan's Buddhist temples, villages, cities, and mountains and still barely scratch the surface of all the island has to offer.",
      img: "/taiwan.jpg",
    },
    {
      id: 2,
      title: "High Culture In Sao Paulo",
      body: "The largest city in South America, Sao Paulo's cuisine and art is as multinational as its diverse population of ten million people.",
      img: "/sao-paulo.jpg",
    },
    {
      id: 3,
      title: "Bonaire Is Scuba Heaven",
      body: "Bonaire is one of the top diving destinations in the world. Known as the shore dive capital of the world, it has great accessibility to its reefs.",
      img: "/bonaire.jpg",
    },
  ];

  return (
    <div className="App container-fluid">
      <h1>My Travel Blog</h1>
      <div className="row">
        {articles.map((oneArticle) => (
          <Article key={oneArticle.id} content={oneArticle} />
        ))}
      </div>
    </div>
  );
}

export default App;
```

And the completed code for `index.js`, where we've only added the bootstrap line:

``` js
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

30. Save all your files and check in the browser. You should A travel blog site page that has a heading and three columns one for each article.

31. Congrats! You're done.
