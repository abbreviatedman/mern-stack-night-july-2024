# Fullstack practice

---

## Overview

The goal for this practice is to create a simple application that receives data from an external API in the backend (server), and then display it on the front end (client - React). By the end of this practice, you should have an understanding on how these 2 parts coordinate to become a fully functional application

## Getting started - Server-side

1. First, let's deal with the server-side setup. Create a folder called `server` and inside of it, create a file called `index.js`.

2. Using the terminal, navigate into the server folder and use command `npm init -y` to initialize a node project.

3. Next, use command `npm install express` so that we can get to the fastest test point and simply make sure that a server can run.

4. Write the following code on your `index.js`:

```js
const express = require("express");
const app = express();

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
```

5. Test it by running command `node index.js` in the terminal. You should see the console log pop up. Once it works, use `ctrl + c` to turn off the server for now.

6. In terminal, use command `npm install nodemon` so that we can have a server that can run continuously.

7. On your `package.json`, add `"dev": "nodemon index"` to the `"scripts"` property. It should look like this:

```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index"
},
```

8. In terminal, use command `npm run dev` to use nodemon. Now whenever we make changes on the server, it will recompile just like we're used to on React apps

## Giving the Server Functionality

9. Turn the terminal off with `ctrl + c` so that we can install `axios` using command `npm install axios`. Once you do that, you can turn the server back on with command `npm run dev`

10. At the top of `index.js`, make sure to import axios:

```js
const axios = require("axios");
```

11. We're going to use axios to make an API call to "themoviedb.org" and get a list of live action comic book movies from Marvel. To do this, let's create an async function called `getMovieData` that will return with the API's data. Here's what that function looks like:

```js
async function getMovieData(req, res) {
  const fetchedData = await axios.get(
    "http://api.themoviedb.org/3/list/1?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb"
  );

  res.json(fetchedData.data);
}
```

12. Let's set up a route for the server to listen to. If someone makes a GET request to `localhost:3001/api`, then it should return with our list of Marvel movies. Here's what that route looks like:

```js
app.get("/api", getMovieData);
```

13. Use the Postman app to perform a GET request to `localhost:3001/api`. It works if you get back a JSON that begins with the following:

```js
{
    "created_by": "travisbell",
    "description": "The idea behind this list is to collect the live action comic book movies from within the Marvel franchise.",
    "favorite_count": 0,
    "id": "1",
    "items": [...],
}
```

## Getting Started - Client-side

14. For testing fullstack, we want more than one terminal open. In VS code, directly to the left of the trash can icon, you can see a square icon with a line splitting it down the middle. There should be 1 terminal still running nodemon, but let's focus on the second terminal for now.

15. Use command `cd ..` to navigate out of the server folder of the second terminal.

16. Use command `npx create-react-app client` to create the front-end of our full stack app.

17. Use command `cd client`

18. Inside the `src` folder, on `App.js`, delete all of the original code.

19. If you have React Snippets extension in VS Code, you can type `imrse` at the top and hit Tab on your keyboard to import `useEffect` and `useState`. We will be using these hooks, and this is what the import looks like:

```jsx
import React, { useState, useEffect } from "react";
```

20. Below the import, type `ffc` and hit Tab to make a functional component. Type `App` to name and export the function at the same time.

21. Place `<><div>This is the front-end</div></>` inside the empty return statement.

22. Use command `npm start` to test that the front-end is working. If you see the text "This is the front-end" that means it is!

23. Inside the `App` function, above the `return()` statement, we will define a state variable to hold the data that will get retrieved from our server. This is what that looks like:

```jsx
const [backendData, setBackendData] = useState([]);
```

24. Just below the `useState` we will use `useEffect` to fetch for our server data. Here's what that looks like:

```jsx
useEffect(() => {
  fetch("http://localhost:3001/api").then(async (res) => {
    const data = await res.json();
    // Check the browser's console to see this
    console.log(data);
    setBackendData(data.items);
  });
}, []);
```

## CORS issue

Make sure to check your browser's console to see if the data arrived. You may run into an error where the request has been blocked by CORS policy. Cross-origin resource sharing (CORS) is a browser security feature that restricts cross-origin HTTP requests that are initiated from scripts running in the browser. To resolve this, we need to go back to the server.

25. In the server side terminal, shut off the server with command `ctrl + c`.

26. Use command `npm install cors`

27. In the Server folder, on `index.js`, make sure to import `cors`:

```js
const cors = require("cors");
```

28. Set the cors option to see the front-end requests as if they were being made there instead of the back-end:

```js
const corsOptions = {
  // The origin set to * is being set to ANY URL
  origin: "*",
  optionSuccessStatus: 200,
};
```

29. Apply the cors middleware so that it works on every request:

```js
app.use(cors(corsOptions));
```

30. Start up the server again with command `npm run dev`

Now you should at least see the data in the console of your browser

## Displaying the data

31. On the client side, make sure to check if the `backendData.items` exists, to double check that the server side has returned with data. If it has, render each movie title:

```jsx
{
  backendData && backendData.length > 0 ? (
    backendData.map((movie, index) => {
      return (
        <div key={index}>
          <p>{movie.title}</p>
        </div>
      );
    })
  ) : (
    <p>loading...</p>
  );
}
```

This is what the final `App.js` should look like:

```jsx
import React, { useState, useEffect } from "react";

function App() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api").then(async (res) => {
      const data = await res.json();
      // Check the browser's console to see this
      console.log(data);
      setBackendData(data.items);
    });
  }, []);

  return (
    <>
      <div>This is the front-end</div>
      {backendData && backendData.length > 0 ? (
        backendData.map((movie, index) => {
          return (
            <div key={index}>
              <p>{movie.title}</p>
            </div>
          );
        })
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}

export default App;
```

You should see the data rendered in the browser! Overall, this should serve as an example as to how the front-end and back-end coordinate in order to make a full-stack application.

## Environment Variables

There are some variables that you may want hidden from the public, such as the URLs to each half of your application (the back-end half that's responsible for managing your data, and the front-end half which is responsible for giving users an interface). The way you heep these things hidden while your app still functions is by using a `.env` file. Your environment variables will not only be responsible for holding a link to your database, but there should also be a link on the front-end that points to the back-end. When you deploy your application, you will be managing your environment variables to re-align your servers based on how they're set up on the cloud.

On the server-side, make sure to shut down the server using `crtl + c`

Install the .env library in the terminal, using the command `npm install dotenv`

32. In the root of the server folder, create a file called `.env` Create a variable for your port:

```
PORT=3001
API_URL="http://api.themoviedb.org/3/list/1?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb"
```

33. At the top of your `index.js`, import your environment variables:

```js
require("dotenv").config();
```

34. In your `app.listen()`, include the environment variable you set up:

```js
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
```

Also hide the API URL in the `getMovieData` function:

```js
async function getMovieData(req, res) {
  const fetchedData = await axios.get(process.env.API_URL);

  res.json(fetchedData.data);
}
```

After this you can run command `npm run dev` to turn the server back on and see that this application is still working.

35. In the client folder, create another `.env` file and write the following on it:

```
REACT_APP_API_URL="http://localhost:3001/api"
```

36. In the src folder, create a file called `constants.js` and write the following on it:

```js
export const API_URL = process.env.REACT_APP_API_URL;
```

37. On `App.js`, import the URL at the top:

```js
import { API_URL } from "./constants";
```

38. Modify the `useEffect` on this file to use the `API_URL` to place the URL in the fetch:

```js
useEffect(() => {
  fetch(API_URL).then(async (res) => {
    const data = await res.json();

    console.log(data);

    setBackendData(data.items);
  });
}, []);
```
