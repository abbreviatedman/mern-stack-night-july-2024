# Fullstack CRUD app

It's time to put all of this course's knowledge together to create a fullstack application! In this lesson, we will create a Fullstack application by creating the back-end and front-end separately. They will communicate via URL requests, and will be in a ready-to-deploy state by the end of it.

## Overview

Before we begin, let's make sure all of the following software is open and ready to use during this process:

- A Browser (Chrome)
- VS Code
- MongoDB Compass
- Postman

## Server setup (back-end)

Let's begin by creating a server. This server will be attached to a database, and will act as an internal API for the front end. During this lesson, we will go back and forth between this folder and the front-end folder that we will create later. It might be helpful to have 2 windows of VS Code open during this.

1. Create a folder called `server`

2. In terminal, navigate into the `server` folder and run command `npm init -y` to create a basic node project. This will generate the `package.json` file.

3. In this folder, create an `index.js` file. This will be the gateway to our server, and contain things such as middleware, routes, etc.

Next, we want to take as little actions as possible, so let's install express and test the server right away.

4. In terminal, use command `npm install express`

5. On `index.js`, import express and write the function to listen to the server:

```js
const express = require("express");
const app = express();

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
```

- In terminal, use command `node index.js`
- If it says "server is listening on port 3001", that means the server is working
- Use `ctrl + c` to shut down the server

Now we want to be safe about where we keep information, like what the port number is.

6. In terminal, use command `npm install dotenv`

7. Create a `.env` file. On it, place the port number:

```
PORT=3001
```

Next, we want to bring this environment variable to the server.

8. On `index.js`, let's update how we're using the port:

```js
require("dotenv").config();

// const PORT = 3001;
const PORT = process.env.PORT;
```

- TEST THE SERVER AGAIN TO SEE IF IT'S WORKING

We want to get some installations out of the way before we continue. That way, we can set up Nodemon and not have to worry about turning the server on and off again continuously.

9. In terminal, use command `npm install morgan mongoose nodemon cors`

10. On `package.json`, take a look at the `"scripts"` property. Add a property next to `"test"`:

```json
"start": "nodemon index.js"
```

The whole `"scripts"` property should look like this now:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
```

This way, we can use `npm run start` in the backend to keep the server on continuously, even if we make changes. In fact...

11. In terminal, use command `npm run start` and leave the server running from now on.

12. Inside of the `server` folder, create a folder called `db` for database.

13. Inside of the folder `db` create a file called `mongodb.js`

On this file, we will define the connection to the database. Before we can do that, let's make sure the connection string is safe.

14. Go to MongoDB Compass and copy your connection string. Place it on your `.env` file like this:

```
MONGODB_URI="mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.<CLUSTER-CODE>.mongodb.net/fullstack-db"
```

Remember to replace everything in the `<>` with what YOUR personal connection string looks like.

15. On `mongodb.js`, set up the connection like this:

```js
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

function connectToMongoDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.log(`DB connection failed: ${error}`);
    });
}

module.exports = connectToMongoDB;
```

To make this work, we need to import this file and run the function where our server does it's listening to requests

16. On `index.js`, import this file:

```js
const connectToMongoDB = require("./db/mongodb");
```

17. Further down on this same file, update the listen method with the database connection:

```js
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);

  connectToMongoDB();
});
```

18. On the imports section of `index.js` make sure to import Morgan so we can keep track of URL requests in the console:

```js
const logger = require("morgan");
```

Imports are at the top of the file, and the listening method is at the bottom. In between those, we should run any middleware

19. Add the following middleware to run Morgan:

```js
app.use(logger("dev"));
```

While we're here, let's add a couple other middleware options to make sure that we can perform POST/PUT requests by properly by reading the data correctly

20. Add the following middleware:

```js
// This will read form data properly
app.use(express.urlencoded({ extended: false }));
// This will read JSON properly
app.use(express.json());
```

We will also run into an issue making requests to/from the server later on when it's tested, so let's take this time to write on our server to prevent these issues.

21. Add the following code between the imports and the middleware:

```js
// Prevent CORS issue
const cors = require("cors");

// Update corsOptions to have ALL origins given access
const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};
```

22. In the middleware section of your code, add the following:

```js
app.use(cors(corsOptions));
```

THIS IS WHAT THE `index.js` FILE SHOULD LOOK LIKE SO FAR:

```js
/*
    Imports
*/
const express = require("express");
const app = express();
// Environment variables
require("dotenv").config();
// Logging any requests w/ colorized status codes
const logger = require("morgan");
// Connection to database
const connectToMongoDB = require("./db/mongodb");
// Prevent CORS issue
const cors = require("cors");

// Update corsOptions to have ALL origins given access
const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};

/*
    Middleware
*/
app.use(logger("dev"));
app.use(cors(corsOptions));
// Read incoming requests property
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*
    Server listening
*/
// const PORT = 3001;
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);

  connectToMongoDB();
});
```

Next we should begin structuring this side of our applications with more folders.

23. In the `server` folder, create the following folders:

- `routes`
- `controllers`
- `models`

24. In the `models` folder, create `McuModel.js`

25. The file `mcu.json` should be included with this README. Move the file `mcu.json` into the `models` folder.

26. On `McuModel.js`, set up the schema for the only collection we're using for this application. The schema should follow the `mcu.json` file since that will serve as our starter data.

`McuModel.js` should look like this:

```js
const mongoose = require("mongoose");

const McuSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  debutFilm: {
    type: String,
  },
  debutYear: {
    type: Number,
  },
});

const Mcu = mongoose.model("Mcu", McuSchema);

module.exports = Mcu;
```

Right now, MongoDB Compass shouldn't be showing the database just yet, so let's make sure to create it now before we write any requests to the server. This way, by the time we perform our first GET request, we will get back our starter data

27. In MongoDB Compase, create a new database called `fullstack-db`. If your connection string on the `.env` file ends with a differently named database (the name comes after the `.net/`), make sure to name it the same.

28. The collection name should be `mcus`

29. Select the `mcus` collection, click the green `Add data` button, click `select file` and upload the `mcu.json` from the `models` folder.

You should see all 19 entries in Compass now!

We should now make routes to perform a GET request and see this collection in Postman.

30. In the `controllers` folder, create a file called `McuController.js`

On this file, we will write functions that communicate with our database. These functions will be used as a response to URL requests.

31. Import the `McuModel` onto this file

```js
const Mcu = require("../models/McuModel");
```

This way we have access to the database.

32. Write a function that responds with the entire collection of characters:

```js
async function getAllCharacters(req, res) {
  try {
    let result = await Mcu.find({});

    res.json({
      message: "success",
      payload: result,
    });
  } catch (error) {
    res.json({
      message: "failure",
      payload: `getAllCharacters error: ${error}`,
    });
  }
}
```

This should be familiar enough, we are using `Mcu.find({});` with no search criteria so that it returns with the entire collection.

33. Make sure to export this function:

```js
module.exports = {
  getAllCharacters,
};
```

It's written like this so that we can add more exports to it later.

Next, we should create route so that there is a URL extention being listened to, that will respond to requests with the function we just wrote.

34. In the `routes` folder, create a file called `mcuRouter.js`

35. Set up the express router and export it:

```js
const express = require("express");
const router = express.Router();

// ...

module.exports = router;
```

36. Now let's make sure we plug the controller into the router:

```js
const { getAllCharacters } = require("../controllers/McuController");
```

Make sure this goes directly underneath the Router imports. Again, The controller imports are written this way so we can easily import other functions later

37. Above the export, let's write the first route:

```js
// localhost:3001/api/allCharacters
router.get("/allCharacters", getAllCharacters);
```

Finally, the last thing to do is to plug the router into our `index.js` file.

38. In between the Middleware and Server Listening sections, on the `index.js` file, set the routes up:

```js
const McuRouter = require("./routes/McuRouter");
// localhost:3001/api/.....
app.use("/api", McuRouter);
```

As a reminder, here are how requests are handled throughout the server:

- A request is made to `localhost:3001/api/allCharacters`
- Our `index.js` file sees that the URL begins with `localhost:3001/api` and hands over the rest of the request to `./routes/McuRouter.js`
- `./routes/mcuRouter.js` sees that the URL extension is `/allCharacters`, so it uses the `getAllCharacters` function from `./controllers/McuController.js`
- `./controllers/McuController.js` Uses the model to make a request to the database when `await Mcu.find({})` occurs
- Summary:
- Request > index > router > controller > model > MongoDB

Now it's time to test this route!

39. Use Postman to make a GET request to `localhost:3001/api/allCharacters`

You should see all of the characters listed in the `payload` property of the response!

## Client setup (front-end)

This section might be easier with a second window of VSCode open. If you're adjusted to using 2 terminal windows in the same instance of VSCode, this is also acceptable. The idea is to keep the server running in one window, and work on creating & running the front end on another. The rest of this section will assume you have 2 windows of VSCode open, with their own terminals open.

40. In the folder that contains the `server` folder, open the terminal and use command `npx create-react-app client` to build out a basic React app.

41. Use command `cd client` followed by `npm start` to make sure that this works, and that you can see `localhost:3000` in your browser.

42. Shut down the server for now using `ctrl + c`. Use command `npm install react-router-dom axios dotenv` and once it's done, start the server back up with `npm start`

We're going to be using `react-router-dom` to manage front-end URL changes

43. Erase what is originally on `App.js` so we can write it ourselves.

44. If you don't already have it, make sure that your VS code has an extension called **"Simple React Snippets" by Burke Holland**. Type `imrse` and hit `tab` to import useEffect and useState, which looks like this:

```jsx
import React, { useState, useEffect } from "react";
```

45. Type `ffc` and hit `tab` to create a functional component. Immediately type `App` so that you name the function and the export at the same time. Overall it should look like this:

```jsx
function App() {
  return (  );
}

export default App;
```

46. Fill the return statement with empty tags `<></>`. This is a placeholder, it assures that the return statement ultimately only returns 1 element.

47. Inside the empty tags, add an `<h1>` tag that says "This is an MCU app, see what year each hero debuted."

48. Above the return statement, initialize a state variable called `serverData` using `useState`. It should look like this:

```jsx
const [serverData, setServerData] = useState([]);
```

This is going to contain the list of characters from our database, which we will get when we perform a URL request to the server. Before we do that, we want to keep the URL safe in an environment variable.

49. Inside the `client` folder, create a file called `.env`

50. On the `.env` file, type the following:

```env
REACT_APP_API_URL="http://localhost:3001/api"
```

This way, whenever we make URL requests, we already have the base URL and only need to specify the URL extensions.

The other benefit of this is that the local version will always make requests to the local version of the server. When it's deployed, the environment variables on the deployed version will be modified to always make requests to the deployed server.

51. In the `src` folder, create a file called `constants.js`

52. On `constants.js`, write the following:

```jsx
export const API_URL = process.env.REACT_APP_API_URL;
```

This file immediately exports our environment variable. This way, we only import `constants.js` on files where we need the URL.

53. At the top of `App.js`, import the URL:

```jsx
import { API_URL } from "./constants";
```

Now we'll use this URL to make a request to our local server and see if it's being caught on the front-end.

54. At the top of `App.js`, import axios:

```jsx
import axios from "axios";
```

55. Between the `useState` and return statement, write a `useEffect` that will run only once on component load, and perform a URL request to get back an array of characters:

```jsx
useEffect(() => {
  axios
    .get(`${API_URL}/allCharacters`)
    .then(async (res) => {
      console.log(res.data.payload);
      setServerData(res.data.payload);
    })
    .catch((e) => console.log(e));
}, []);
```

Note that inside the `axios.get`, we're plugging in the `API_URL` that is hidden as an environment variable. We write in the `/allMcus` URL extension because that's the route we wrote to get back all the characters in our database.

It's also useful to note that the response from axios comes with some meta data, so the real response is in the `data` property. Also, the way we decided to response with data from the server is to have the raw response in the `payload` property. This is why the response is `res.data.payload`.

Once you save the file, check the console in the browser to see the data!

Before we move on to the next step, take a look at what `App.js` should look like so far:

```jsx
import React, { useState, useEffect } from "react";
import { API_URL } from "./constants";
import axios from "axios";

function App() {
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/allCharacters`)
      .then(async (res) => {
        console.log(res.data.payload);
        setServerData(res.data.payload);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <h1>This is an MCU app, see what year each hero debuted.</h1>
    </>
  );
}

export default App;
```

Now let's display the data on the page for the first time.

56. Under the `<h1>`, let's write a turnary operator that will map over the state variable `serverData` if our axios call returns with the data:

```jsx
{
  serverData.length > 0 ? (
    serverData.map((character) => {
      return <li key={character._id}>{character.name}</li>;
    })
  ) : (
    <h1>loading...</h1>
  );
}
```

When the page initially loads, we will see this "loading screen" (the `<h1>`) first because `serverData` will initally be an empty array with a length of 0. Once the `useEffect` runs and axios returns with data from our database via the server, then `serverData` will have a length greater than 0 and it will be mapped over to render a list of characters.

Also note that the key property inside the `<li>` tag is being passed the character's `_id` property from MongoDB. This is best practice because it will always be unique.

## Scaling the application

Now that our `App.js` is expanding, it's time to start separating our concerns. We want the main `App.js` component to be an overview of the application, and we can have a separate component that will get all of our data and display it.

57. In the `src` folder, create a file called `AllCharacters.js`

58. On `AllCharacters.js` use `imrse` to import `useState` and `useEffect`:

```jsx
import React, { useState, useEffect } from `react`;
```

59. Now use `ffc` to create a functional component and type "AllCharacters" to name & export the function properly:

```jsx
function AllCharacters() {
    return (  );
}

export default AllCharacters;
```

60. Inside the empty return statement, place a `<ul></ul>` element

61. From `App.js`, cut out the following line of code and move it to `AllCharacters.js` on the inside of the component, above the return statement:

```jsx
const [serverData, setServerData] = useState([]);
```

The reason for this is because we're going to do the axios call only when this `AllCharacters` component gets rendered, so the data should be received & held on our new component.

62. Cut the following imports from `App.js` and move it into `AllCharacters.js`:

```jsx
import { API_URL } from "./constants";
import axios from "axios";
```

These imports, as usual, belong on the top of the page.

63. Cut the following `useEffect` from `App.js` and move it into `AllCharacters.js` above the return statement:

```jsx
useEffect(() => {
  axios
    .get(`${API_URL}/allCharacters`)
    .then(async (res) => {
      console.log(res.data.payload);
      setServerData(res.data.payload);
    })
    .catch((e) => console.log(e));
}, []);
```

As we know, because of the empty `[]` as a second argument to `useEffect`, the axios call will happen as soon as the component loads, and holds the data in the `serverData` state variable.

64. Cut the following turnary operator from `App.js` and move it into `AllCharacters.js` inside of the `<ul>` tag:

```jsx
{
  serverData.length > 0 ? (
    serverData.map((character) => <li key={character._id}>{character.name}</li>)
  ) : (
    <h1>loading...</h1>
  );
}
```

Now it will render inside this component instead of in the main `App.js`

The `AllCharacters.js` should now overall look like this:

```jsx
import React, { useState, useEffect } from "react";
import { API_URL } from "./constants";
import axios from "axios";

function AllCharacters() {
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/allCharacters`)
      .then(async (res) => {
        setServerData(res.data.payload);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <ul>
      {serverData.length > 0 ? (
        serverData.map((character) => (
          <li key={character._id}>{character.name}</li>
        ))
      ) : (
        <h1>loading...</h1>
      )}
    </ul>
  );
}

export default AllCharacters;
```

And this is what your `App.js` should look like so far:

```jsx
function App() {
  return (
    <>
      <h1>This is an MCU app, see what year each hero debuted.</h1>
    </>
  );
}

export default App;
```

Now let's display this component through the `App.js` component

65. At the top of `App.js`, import the component we just created:

```jsx
import AllCharacters from "./AllCharacters";
```

66. On `App.js` under the `<h1>` tag, display the `AllCharacters` component:

```jsx
return (
  <>
    <h1>This is an MCU app, see what year each hero debuted.</h1>
    <AllCharacters />
  </>
);
```

At this point, you should see all the characters listed in the browser!

At this point, we should only render components when the user decides to see it. We will now be applying React Router functionality, so that we can properly link to different components

67. On `index.js`, import BrowserRouter and wrap the `App` component in `BrowserRouter` component tags:

```jsx
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Here! */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* Here! */}
  </React.StrictMode>
);
```

This way, everything in our application is within the context of using BrowserRouter.

Let's begin by defining some of our routes

68. On `App.js`, first make sure to import `Routes`, `Route` and `Link` at the top:

```jsx
import { Routes, Route, Link } from "react-router-dom";
```

69. As a reminder, the defined routes still belong inside of the return statement on `App.js`. Below the `AllCharacters` component, we can define our routes:

```jsx
<Routes>
  <Route path="/mcu" element={<AllCharacters />} />
</Routes>
```

70. Under the `<h1>` tag, erase the `AllCharacters` component and replace it with a `<nav>` with links so that when a user clicks the link, the list of characters will show up:

```jsx
<h1>This is an MCU app, see what year each super hero debuted.</h1>
<nav>
     <ul>
       <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/mcu">
              See All Characters
            </Link>
          </li>
    </ul>
</nav>
```

Overall, your `App.js` should now look like this:

```jsx
import { Routes, Route, Link } from "react-router-dom";
import AllCharacters from "./AllCharacters";

function App() {
  return (
    <>
      <h1>This is an MCU app, see what year each super hero debuted.</h1>
      <nav>
        <ul>
          <li>
            <Link to="/mcu">See all characters</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/mcu" element={<AllCharacters />} />
      </Routes>
    </>
  );
}

export default App;
```

Now when you go to the browser, only after you click the link is when the front-end will send a URL request to the back-end.

If you notice in the browser's console, you will get a warning that there are no routes that match "/" which is the base URL of our website. Let's build out a `Home` component so that we can toggle back and forth between something like a "landing page" and our list of characters.

71. In the `src` folder, create a file called `Home.js`

72. On `Home.js`, create the following functional component:

```jsx
function Home() {
  return (
    <>
      <h1>Click on a link to get started!</h1>
    </>
  );
}

export default Home;
```

73. On `App.js`, import the `Home` component and create a route and link for it.

Here's the import:

```jsx
import Home from "./Home";
```

Here is the link:

```jsx
<li>
  <Link to="/">Home</Link>
</li>
```

And here's the route:

```jsx
<Route path="/" element={<Home />}>
```

Now you can toggle back and forth! Notice that you'll see **"Loading..."** for a moment, whenever you click **"See all characters"**. Feel free to replace this loading screen with any loading screen component of choice

## C/CRUD - Server-side Create functionality

Currently, this is a fullstack application with the ability to read directly from a database, through a server we created. In terms of CRUD functionality, we have the Read so far. Let's go back to the server-side and make the Create functionality

The 2 files we're going to look at are:

- `mcuController.js`
- `mcuRouter.js`

This is because all we need to do is write the database functionality on the Controller, and define the URL Route on the Router.

74. On `mcuController.js`, write a function that creates a character to the database:

```jsx
async function createOneCharacter(req, res) {
  try {
    let newCharacter = req.body;

    await Mcu.create(newCharacter);

    res.json({
      message: "success",
      payload: newCharacter,
    });
  } catch (error) {
    let errorObj = {
      message: "createOneCharacters failure",
      payload: error,
    };

    res.json(errorObj);
    console.log(errorObj);
  }
}
```

The first thing to do is to is to make a `newCharacter` object that will capture all the details about the character from the body of the request. Then, send that to the database using `await Mcu.create(newCharacter);`. Finally, respond with the newly created character with a success message, to let you know that the data now exists in MongoDB.

75. Make sure to export this function at the bottom of the page:

```jsx
module.exports = {
  getAllMcus,
  createOneCharacter,
};
```

76. On `McuRouter.js`, import the function and define the route to be a POST request at URL extension `'/oneMcu/:name'`:

Here is the import:

```js
const {
  getAllMcus,
  createOneCharacter,
} = require("../controller/McuController");
```

Here is the defined route:

```js
router.post("/createOneCharacter", createOneCharacter);
```

77. Open up the Postman app, and make a POST request to `localhost:3001/Mcu/createOneCharacter`. Make sure that you open up the body tab, and type in JSON an object with character details to test it. For example:

```js
{
    "name": "America Chavez",
    "debutFilm": "Dr. Strange: Multiverse of Madness",
    "debutYear": 2022
}
```

When you make the request, you should see the object in the response! You can also double check with MongoDB Compass to see this new character in the `mcus` collection.

Now that the back-end is tested, we just need to add a route to the front-end and allow users of this application to create a character

## C/CRUD - Client-side Create functionality

For the user to be able to create a document of data and send it to the database, they will need a form on the front-end. We will create a component that contains that form, and set it up to send a body of data to our server in the same way we just tested it in Postman.

78. In the `src` folder, create a file called `CreateCharacter.js`

79. Use the `imrs` snippet to import `useState`:

```jsx
import React, { useState } from `react`;
```

80. Use the `ffc` snippet to create a function component called `CreateCharacter`:

```jsx
function CreateCharacter() {
    return (

    );
}

export default CreateCharacter;
```

81. Inside the empty return statement, place a `<form></form>` tag.

Next, we're going to need state variables to temporarily hold character data. When we send the data from here, we will refer to these state variables as the values.

82. Create a state variable for `name`, `debut`, and `debutYear`. These can all be completed in a single object:

```jsx
const [character, setCharacter] = useState({
  name: "",
  debutFilm: "",
  debutYear: 0,
});
```

As a user fills out the form, these state variables should be updated with the values of the inputs. Let's begin setting that up

83. Inside the `<form>` tags, create inputs that will set the state variables to it's own input:

```jsx
<label>Name</label>
<input value={character.name} onChange={(e) => setCharacter({...character, name: e.target.value})}/>
<br /><br />
<label>DebutFilm</label>
<input value={character.debutFilm} onChange={(e) => setCharacter({...character, debutFilm: e.target.value})}/>
<br /><br />
<label>DebutYear</label>
<input value={character.debutYear} onChange={(e) => setCharacter({...character, debutYear: e.target.value})}/>
<br /><br />
```

When we do something like `onChange={(e) => setCharacter({...character, debutFilm: e.target.value})}`, each key stroke is temporarily saved into it's state variable. It make it easy to keep track of what the user is typing in at all times.

Before we make sure that it works, let's add a route to this component and test our ability to render the form itself.

84. On `App.js`, import the component we just created & define a route that will render this form:

Here is the import:

```jsx
import CreateCharacter from "./CreateCharacter";
```

Here is the defined route:

```jsx
<Route path="/mcu/create" element={<CreateCharacter />} />
```

Now let's make a link to this so users can easily reach it

85. Create a link to this new route:

```jsx
<li>
  <Link to="/mcu/create">Create a new MCU character</Link>
</li>
```

Now test it! Click the "Create a new MCU character" link and see that the form shows up.

The next thing we should do is create a function that makes a POST request to our server and send the form data to the database.

86. Import the API URL at the top of `CreateCharacter.js`:

```jsx
import { API_URL } from "./constants";
```

87. On `CreateCharacter.js` above the return statement, create an async function that will post to the database:

```jsx
async function postCharacter() {
  fetch(`${API_URL}/createOneCharacter`, {
    method: "post",
    body: JSON.stringify(character),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then(async (res) => {
      let serverResponse = await res.json();
      console.log(serverResponse);
    })
    .catch((e) => console.log(e));

  setCharacter({
    name: "",
    debutFilm: "",
    debutYear: 0,
  });
}
```

The first thing that happens in this function is creating the character object based on the state variables.

The next thing is that we're performing a fetch request to the back end. The URL to the back end is imported, for security reasons. The second argument to the fetch function is an object with metadata about the request. Here is where we specify that it's a POST request, we are turning the character object into JSON, and the `headers` object is so that we avoid any CORS issues. This is very important for when this project gets deployed.

In the `.then()` method, right now we're just console logging the server's response so that we see if the request works out or not.

Finally, we're resetting all state variables. This will also clear out the form.

The next thing we should do is make sure this function runs when the form is submitted.

88. Create a function called `handleOnSubmit` where we prevent the form from refreshing the page, and we run the `postCharacter()` function:

```jsx
function handleOnSubmit(event) {
  event.preventDefault();

  postCharacter();
}
```

89. Attach this new function to the `<form>` tag:

```jsx
// the onSubmit right here is what you're adding
<form onSubmit={(e) => handleOnSubmit(e)}>
  <label>Name</label>
  <input value={name} onChange={(e) => setName(e.target.value)} />
  <br />
  <br />
  <label>Debut Film</label>
  <input value={debut} onChange={(e) => setDebut(e.target.value)} />
  <br />
  <br />
  <label>Debut Year</label>
  <input value={debutYear} onChange={(e) => setDebutYear(e.target.value)} />
  <br />
  <br />

  {/* This button is also what you're adding */}
  <button type="submit">Submit</button>
</form>
```

Now that we have a button that will submit the form, which will prevent the refresh and run the `postCharacter()` function, and the new character should be written to the database.

Test this!! Fill out the form, click the button, you should see the form fields become empty and you should also see the character in the console. Additionally, when you check with MongoDB Compass, you should see the new character in the `mcus` collection.

Now let's modify this to go to a different page once you've created a character.

90. At the top of `CreateCharacter.js`, import `useNavigate`:

```jsx
import { useNavigate } from "react-router-dom";
```

This is a custom hook from `react-router-dom` that allows you to navigate to a different URL on your application. It's a function that takes a URL extension as it's parameter. Once it's imported, you set it up next to the rest of your `useState` hooks.

91. Set up the `navigate` custom hook:

```jsx
const navigate = useNavigate();
```

92. Inside the `.then()` in the `postCharacter()` function, replace the console log with `navigate` and use it to see all the characters:

```jsx
navigate("/mcu");
```

Overall, your `CreateCharacter.js` should look like this:

```jsx
import React, { useState } from "react";
import { API_URL } from "./constants";
import { useNavigate } from "react-router-dom";

function CreateCharacter() {
  const navigate = useNavigate();

  const [character, setCharacter] = useState({
    name: "",
    debutFilm: "",
    debutYear: 0,
  });

  async function postCharacter() {
    fetch(`${API_URL}/createOneMcu`, {
      method: "post",
      body: JSON.stringify(character),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(async (res) => {
        let serverResponse = await res.json();
        console.log(serverResponse);
        navigate("/mcu");
      })
      .catch((e) => console.log(e));

    setCharacter({
      name: "",
      debutFilm: "",
      debutYear: 0,
    });
  }

  function handleOnSubmit(event) {
    event.preventDefault();

    postCharacter();
  }

  return (
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <label>Name</label>
      <input
        value={character.name}
        onChange={(e) => setCharacter({ ...character, name: e.target.value })}
      />
      <br />
      <br />
      <label>DebutFilm</label>
      <input
        value={character.debutFilm}
        onChange={(e) =>
          setCharacter({ ...character, debutFilm: e.target.value })
        }
      />
      <br />
      <br />
      <label>DebutYear</label>
      <input
        value={character.debutYear}
        onChange={(e) =>
          setCharacter({ ...character, debutYear: e.target.value })
        }
      />
      <br />
      <br />

      <button type="submit">Submit new character</button>
    </form>
  );
}

export default CreateCharacter;
```

Test it by adding a new character! When you're done submitting, you should notice that it takes you to see all the characters, and the new character should be listed at the bottom.

Now that we have half of CRUD functionality completed, let's create a component that will render all the information about one character at a time.

93. In the `src` folder, create a file called `OneCharacter.js`

94. At the top of `OneCharacter.js`, import `useParams`:

```jsx
import { useParams } from "react-router-dom";
```

This is so that we can pass a character name via the URL and use it to get back only that character's information

95. Use the `ffc` snippet and call it `OneCharacter` and fill the return statement with an `<h1>` tag for now:

```jsx
function OneCharacter() {
  return (
    <>
      <h1></h1>
    </>
  );
}

export default OneCharacter;
```

96. Inside the functional component, use `useParams` to capture the name:

```jsx
const { name } = useParams();
```

97. Inside the `<h1>` tag, plug in this parameter:

```jsx
<h1>The character {name} debuted in the film ...</h1>
```

We will come back and complete this file later. For now, let's just create a route to it

98. On `App.js`, import and add a route to the `OneCharacter` component:

Here is the import:

```jsx
import OneCharacter from "./OneCharacter";
```

Here is the defined route:

```jsx
<Route path="/mcu/:name" element={<OneCharacter />} />
```

Now we can render the component. For example, if you go to `localhost:3000/mcu/Captain%20America`, you should see the component with "Captain America" in the title

Let's make a small change to the `CreateCharacter` component so that it goes to this component.

99. On `CreateCharacter.js`, update the `navigate` function:

```jsx
navigate(`/mcu/${serverResponse.payload.name}`);
```

Now when you create a character, it will go to that component based on the name of the character, which is used as a dynamic parameter. We should go to the server-side now and add the ability to get back one character's full information to be displayed on the `OneCharacter` component

## Server-side feature: getCharacterByName

100. On `mcuController.js`, write a function called `getCharacterByName` which will return with the character's document.

```js
async function getCharacterByName(req, res) {
  try {
    let foundCharacter = await Mcu.findOne({ name: req.params.name });

    res.json({
      message: "success",
      payload: foundCharacter,
    });
  } catch (error) {
    let errorObj = {
      message: "getCharacterByName failure",
      payload: error,
    };

    res.json(errorObj);
    console.log(errorObj);
  }
}
```

101. Export this function at the bottom:

```js
module.exports = {
  getAllCharacters,
  createCharacter,
  getCharacterByName,
};
```

102. On `mcuRouter.js`, import this function:

```js
const {
  getAllCharacters,
  createCharacter,
  getCharacterByName,
} = require("../controller/mcuController");
```

103. Now set the route using a dynamic parameter:

```js
// localhost:3001/api/getCharacterByName/:name
router.get("/getCharacterByName/:name", getCharacterByName);
```

Make sure to test this route using Postman!!!!

Once it's tested and it's working, it's time to set this up for the front-end

## Client-side feature: OneCharacter component

104. On `OneCharacter.js`, import `useEffect` and `useState` at the top. Let's also bring in the `API_URL` that we need to contact our back-end server with:

```jsx
import { useState, useEffect } from "react";
import { API_URL } from "./constants";
```

105. Set up state variables to hold the debut film and debut year:

```jsx
const [character, setCharacter] = useState({
  debutFilm: "",
  debutYear: "",
});
```

By default these values are empty, but it will be filled after we make a fetch call inside of a `useEffect`

106. Write a `useEffect` that makes a fetch call to our database via the route we just created:

```jsx
useEffect(() => {
  fetch(`${API_URL}/getCharacterByName/${name}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then(async (res) => {
    let result = await res.json();
    setCharacter(result.payload);
  });
}, [name]);
```

This will run once state variable `name` changes, which is based on the dynamic parameter.

107. Update the `<h1>` tag to use `character.name`:

```js
<h1>{character.name}</h1>
```

This way, when we try to go to `localhost:3000/mcu/Hulk` for example, the text that displays is based on the response from the database instead of the dynamic parameter. If you see "Hulk" show up, that means the character's entire document is being captured on the front-end.

108. Display the movie and year under the `<h1>` tag:

```jsx
<p>Debuted in <span>{character.debutFilm}</span></p>
<p>Released in the year <span>{character.debutYear}</span></p>
```

Now that it works, let's make sure the list of all characters are also links to their own page.

109. At the top of `AllCharacters.js`, import `Link`:

```jsx
import { Link } from "react-router-dom";
```

110. Inside of the map function where we are producing `<li>` tags with the character names, update them to link to the `OneCharacter` component:

```jsx
<Link to={`/mcu/${character.name}`}>{character.name}</Link>
```

Your `AllCharacters.js` page should now look like this:

```jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "./constants";
import axios from "axios";

function AllCharacters() {
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/allCharacters`)
      .then(async (res) => {
        setServerData(res.data.payload);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <ul>
      {serverData.length > 0 ? (
        serverData.map((character) => (
          <li key={character._id}>
            <Link to={`/mcu/${character.name}`}>{character.name}</Link>
          </li>
        ))
      ) : (
        <h1>loading...</h1>
      )}
    </ul>
  );
}

export default AllCharacters;
```

Your `OneCharacter.js` should currently look like this:

```jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "./constants";

function OneCharacter() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState({
    debut: "",
    debutYear: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/getCharacterByName/${name}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then(async (res) => {
      let result = await res.json();
      setCharacter(result.payload);
    });
  }, [name]);

  return (
    <>
      <h1>{character.name}</h1>
      <ul>
        <li>
          Debuted in&nbsp;
          <span>{character.debutFilm}</span>
        </li>
        <li>
          Released in&nbsp;
          <span>{character.debutYear}</span>
        </li>
      </ul>
    </>
  );
}

export default OneCharacter;
```

Now we have an application where we can add MCU characters, and know what film they debuted in and the year it was released. Users have a decent UI where they can navigate around. The next thing to do is to create the ability to update a character, or delete a character.

## U/CRUD - Server-side Update functionality

As usual, to give another functionality to the user, we should start with the back-end and test it. After that's done, we will go to the front-end.

The 2 files we're going to look at are:

- `mcuController.js`
- `mcuRouter.js`

111. On `mcuController.js`, create a function called `updateCharacter`:

```js
async function updateCharacter(req, res) {
  try {
    let targetCharacter = await Mcu.findOne({ _id: req.params.id });

    let updatedCharacter = {
      _id: targetCharacter._id,
      name: targetCharacter.name,
      debutFilm: req.body.debutFilm
        ? req.body.debutFilm
        : targetCharacter.debutFilm,
      debutYear: req.body.debutYear
        ? req.body.debutYear
        : targetCharacter.debutYear,
    };

    await Mcu.updateOne(
      { _id: req.params.id },
      { $set: updatedCharacter },
      { upsert: true }
    );

    res.json({
      message: "success",
      payload: updateCharacter,
    });
  } catch (e) {
    let errorObj = {
      message: "updateCharacter failure",
      payload: error,
    };

    res.json(errorObj);
    console.log(errorObj);
  }
}
```

Here we're targeting the correct character using the unique `_id` that exists on MongoDB. This is best practice, as it is the safest & most accurate way to do it. Then, we create a new character object where we keep the original id and name, but we can change the film & year they debuted. Finally, we contact the database and update the character before responding with a success message.

112. Make sure to export this function at the bottom:

```js
module.exports = {
  getAllCharacters,
  createCharacter,
  getCharacterByName,
  updateCharacter,
};
```

113. On `mcuRouter.js`, import the function we just wrote and create a route for it.

Here is the import:

```js
const {
  getAllCharacters,
  createCharacter,
  getCharacterByName,
  updateCharacter,
} = require("../controller/mcuController");
```

Here is the route:

```js
// localhost:3001/api/updateCharacter/:id
router.put("/updateCharacter/:id", updateCharacter);
```

Make sure to test it with Postman by making the PUT request to `localhost:3001/api/updateCharacter/:id`. You will need to have Mongo Compass open to grab the `_id` of a character in order to target it properly. Also make sure that the properties `debut` and `debutYear` are in the body of the request.

Once it works, let's move on to the front-end so that a user can use this update functionality.

## U/CRUD - Client-side Update functionality

Before we write any code, let's plan out how this is going to work from the user side.

- The user will be on the `OneCharacter` page
- The user will click on a `edit details` button
- The character's details (debut and debutYear) will change from being text, to being input fields
- The user will change the text within the input fields
- The user will click a `save` button
- This will trigger a PUT request to our server
- When the database is updated, it will return with the new data
- The input fields will change back into being text, with the new character data

These changes will all happen on the `OneCharacter` component

113. On `OneCharacter.js`, write a state variable called `isEditing`:

```jsx
const [isEditing, setIsEditing] = useState(false);
```

The idea is that when this is set to false, the character details will be plain text. When it is set to true, it will be an input field.

114. For `character.debut` and `character.debutYear`, write a ternary operator that will render either text or an input based on our state variable `isEditing`:

```jsx
<p>
                Debuted in the film&nbsp;
                {
                    isEditing
                    ?
                    <input type="text" name="debutFilm" value={character.debutFilm}/>
                    :
                    <span>{character.debutFilm}</span>
                }
            </p>
            <p>
                Released in the year&nbsp;
                {
                    isEditing
                    ?
                    <input type="text" name="debutYear" value={character.debutYear}/>
                    :
                    <span>{character.debutYear}</span>
                }
            </p>
```

This is conditional rendering! If `isEditing` is true, render an input because the user is editing. If `isEditing` is false, render plain text.

Now we need a function to have control over this state variable

115. Write a function called `toggleEditing` that will change the value of our state variable back and forth between `true` and `false`:

```jsx
function toggleEditing() {
  isEditing ? setIsEditing(false) : setIsEditing(true);
}
```

It works like a light switch. If `isEditing` is true, it can only be set to `false` when this function runs. If `isEditing` is false, it can only be set to `true` when this function runs.

Now let's create a button to use this function.

116. Below the `<p>` tags, write a button that will use the `toggleEditing` function

```jsx
<button onClick={toggleEditing}>
  {isEditing ? "Stop editing" : "Edit character details"}
</button>
```

Here we're also using a ternary operator to change the text written on the button. This makes it clear to the user what the state is at all times. This also allows the user to cancel editing very easily.

Test this!

Next we need to track what changes the user is making when typing into the input field.

117. Write a function called `updateCharacter` that will change the values in our state variable `character` based on the input fields:

```jsx
function updateCharacter({ target }) {
  setCharacter((prevState) => ({
    ...prevState,
    [target.name]: target.value, //dynamically inject property
  }));
}
```

There are a lot of things happening here, so let's walk through it first.

- The parameters that this function takes will be the input field itself, which is why it's wrapped in `{}` curly brackets. The HTML attributes such as `name` and `value` become properties of this object in JS.
- In any state variable, the `setState` function can take a callback function to make use of it's previous state. In this case, `setCharacter` is making use of it's previous state which is an object that holds the `debutFilm` and `debutYear` properties.
- We use a spread operator to set the state variable to the values it already has, but then we redefine one of the properties with `target.name` and `target.value`. Remember that `target.name` will either be `debutFilm` or `debutYear`, depending on the input field that is currently being typed into. `target.value` will be the value of the input field itself.

For example, let's say we're at `localhost:3000/mcu/Hulk` and we are editing the character details. The `setCharacter` function basically looks like this:

```jsx
setCharacter({
  debut: "The Avengers",
  debutYear: 2012,
});
```

If we type into the input field for `debut` and change the movie name to "Hulk", then the `setCharacter` function is basically doing this:

```jsx
setCharacter({
  debut: "Hulk",
  debutYear: 2012,
});
```

This way, we can use this same function for both input fields.

118. On the input fields, write an `onChange` attribute that uses this function we just wrote:

```jsx
<p>
                Debuted in the film&nbsp;
                {
                    isEditing
                    ?
                    <input type="text" name="debutFilm" value={character.debutFilm} onChange={updateCharacter}/>
                    :
                    <span>{character.debutFilm}</span>
                }
            </p>
            <p>
                Released in the year&nbsp;
                {
                    isEditing
                    ?
                    <input type="text" name="debutYear" value={character.debutYear} onChange={updateCharacter}/>
                    :
                    <span>{character.debutYear}</span>
                }
            </p>
```

Now that it's connected, whenever a user is typing into these fields, the state variables are being dynamically updated. This will make it easier to send the data to our servers by referring to the state variable.

119. Write a function called `handleOnSubmit` that will make a PUT request to our server:

```jsx
function handleOnSubmit(e) {
  e.preventDefault();

  console.log("Submitted!");

  fetch(`${API_URL}/updateCharacter/${character._id}`, {
    method: "put",
    body: JSON.stringify(character),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then(() => {
    setIsEditing(false);
  });
}
```

Again, there's a lot here so let's walk through what is happening

- We are using `e.preventDefault();` because this function will be attached to a form, and we want to prevent refreshing the page
- The console log is useful for knowing when this function runs
- We are sending `debutFilm` and `debutYear` as the body of this request, so we are grabbing those values from our state variable `character`
- We perform a `fetch` to our server, and in the `.then()` we set `isEditing` to false so that the input fields become plain text.

120. Change the `useEffect` so that it runs either when `name` or `isEditing` changes:

```jsx
useEffect(() => {
  // ... shortened for visibility
}, [name, isEditing]);
```

The reason this should be here is because without it, if a user makes changes and submits it, the plain text would show the previous unchanged values once `isEditing` is set to false. The database will properly update, but the user would have to refresh the page to see the changes made. To make the editing feature cleaner overall, this small change makes it so that when a user submits changes, it's reflected in the plain text immediately.

Now that the functionality is ready, let's attach it to a form and give the user the ability to submit.

121. Wrap the `<li>` tags in a `<form>` tag and give it an `onSubmit` attribute that will run the `handleOnSubmit` function

122. Directly above the closing `</form>` tag, write a ternary operator that renders either a button or a break tag depending on the state variable `isEditing`:

```jsx
{
  isEditing ? <button type="submit">Submit edit</button> : <br />;
}
```

So far, the return statement on this component should look like this:

```jsx
return (
  <>
    <h1>{name}</h1>
    <form onSubmit={(e) => handleOnSubmit(e)}>
      <p>
        Debuted in the film&nbsp;
        {isEditing ? (
          <input
            type="text"
            name="debutFilm"
            value={character.debutFilm}
            onChange={updateCharacter}
          />
        ) : (
          <span>{character.debutFilm}</span>
        )}
      </p>
      <p>
        Released in the year&nbsp;
        {isEditing ? (
          <input
            type="text"
            name="debutYear"
            value={character.debutYear}
            onChange={updateCharacter}
          />
        ) : (
          <span>{character.debutYear}</span>
        )}
      </p>
      {isEditing ? <button type="submit">Save Changes</button> : <br />}
    </form>
    <button onClick={toggleIsEditing}>
      {isEditing ? (
        <span>Discard Changes</span>
      ) : (
        <span>Edit Character Details</span>
      )}
    </button>
  </>
);
```

Now we can finally test this on the front end!! When you edit a character's details, make sure to check with Mongo Compass that the database is properly being updated.

We have the `C`reate, `R`ead, and `U`pdate parts of `CRUD`, the final function to add to this is the `D`elete functionality.

## D/CRUD - Server-side Delete Functionality

The 2 files we're going to look at are:

- `mcuController.js`
- `mcuRouter.js`

123. On `mcuController.js`, write a function called `deleteCharacter` that will contact the database and delete a character based on their `_id`:

```js
async function deleteCharacter(req, res) {
  try {
    let targetCharacter = req.params.id;

    let deletedCharacter = await Mcu.deleteOne({ _id: targetCharacter });

    res.json({
      message: "success",
      payload: deletedCharacter,
    });
  } catch (error) {
    let errorObj = {
      message: "deleteCharacter failure",
      payload: error,
    };

    res.json(errorObj);
    console.log(errorObj);
  }
}
```

124. Make sure to export it at the bottom:

```js
module.exports = {
  getAllCharacters,
  createCharacter,
  getCharacterByName,
  updateCharacter,
  deleteCharacter,
};
```

125. On `mcuRouter.js`, import the function we just wrote:

```js
const {
  getAllCharacters,
  createCharacter,
  getCharacterByName,
  updateCharacter,
  deleteCharacter,
} = require("../controller/mcuController");
```

126. Define the route for this function:

```js
router.delete("/deleteCharacter/:id", deleteCharacter);
```

Now test it with Postman by grabbing the `_id` of a character from Mongo Compass and making a DELETE request to `localhost:3001/api/deleteCharacter/:id`

Once it works, let's make it work on the front end

## D/CRUD - Client-side Delete Functionality

On the `OneCharacter.js`, we want the delete to redirect a user back to the list of all characters, so we can see that it's disappeared from the dataset. First let's import `useNavigate` to accomplish this:

`import { useParams, useNavigate } from 'react-router-dom'`

And make sure to set it up within the functional component:

`const navigate = useNavigate()`

126. On `OneCharacter.js`, write a function called `handleDelete` that will make a fetch request to our server and respond by navigating back to the component that renders all characters:

```jsx
function handleDelete() {
  fetch(`${API_URL}/deleteCharacter/${character._id}`, {
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then(() => navigate("/mcu"));
}
```

127. Directly under the edit button, write a button that will run this function when clicked:

```jsx
<button onClick={handleDelete}>Delete this character</button>
```

Test it!!

Here is what the full `OneCharacter.js` should look like:

```jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "./constants";

function OneCharacter() {
  const navigate = useNavigate();

  const { name } = useParams();

  const [character, setCharacter] = useState({
    debutFilm: "",
    debutYear: 0,
  });

  // 1A. the true/false value that users can control - initially false, because reading info goes before editing
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/oneMcu/${name}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then(async (res) => {
      let result = await res.json();
      setCharacter(result.payload);
    });
  }, [name, isEditing]);

  // we can see info about one character.
  // On the backend, we have a route that will accept an object that looks like:
  // {
  //     debutFilm: "Hawkeye",
  //     debutYear: 2021
  // }

  // I want to give the users the ability to do this on the front end. Here's what I imagine they might need:
  // 1. There needs to be a clear difference between "User is reading the values" vs "User is editing the values"
  //  A - some sort of true/false value
  //  B - conditionally render either <span> or <input /> based on the true/false value
  //  C - give the users a button
  //  D - to change this value to true from being false, and vice versa
  //  E - small detail; make the edit button say "discard" when exiting "edit mode"
  // 2. A form (some input fields) to specify the values (the film/year that we want to update)
  //  A - Let users actually type into the input field && KEEP TRACK OF IT (will need it when I send the values to my DB)
  //  B - Use the same function to handle both
  // 3. When the user is ready to submit the form, they click a button, and can read the NEW VALUES
  //  A - Need a function to handle form submission - should send state variable `character` to the backend route
  //  B - surround the input fields in a form, give it a button that runs the `handleOnSubmit`
  //  C - Some sort of behavior to confirm to the user that changes have been made
  //  D - Clean up a bug that keeps the old values, despite clicking "Discard changes"

  // 1D
  function toggleIsEditing() {
    isEditing ? setIsEditing(false) : setIsEditing(true);
  }

  // 2A - REDUNDANT
  // function updateDebutFilm(val){
  //     setCharacter((previousValue) => {
  //         return {
  //             ...previousValue,
  //             debutFilm: val
  //         }
  //     })
  //     console.log(character.debutFilm)
  // }

  // 2A - REDUNDANT
  // function updateDebutYear(val){
  //     setCharacter((previousValue) => {
  //         return {
  //             ...previousValue,
  //             debutYear: val
  //         }
  //     })
  //     console.log(character.debutYear)
  // }

  // 2B
  function updateCharacter(event) {
    // I'm gonna send in the event, which is {}
    // One of the properties of the {} is target
    // target is the element - any attribute on this element is a property of target
    setCharacter((previousValue) => {
      return {
        ...previousValue,
        [event.target.name]: event.target.value,
      };
    });

    console.log(character);
  }

  // 3A
  function handleOnSubmit(e) {
    // prevents refreshing the page, which would cancel all operations
    e.preventDefault();

    console.log("submitted");

    fetch(`${API_URL}/updateOneMcu/${name}`, {
      method: "put",
      body: JSON.stringify(character),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then(() => {
      // 3C
      setIsEditing(false);
    });
  }

  function handleDelete() {
    fetch(`${API_URL}/deleteOneMcu/${name}`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then(() => {
      navigate("/mcu");
    });
  }

  return (
    <>
      <h1>{name}</h1>
      {/* 3B */}
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <p>
          Debuted in the film&nbsp;
          {/* 1B */}
          {isEditing ? (
            <input
              type="text"
              name="debutFilm"
              value={character.debutFilm}
              onChange={(e) => updateCharacter(e)}
            />
          ) : (
            <span>{character.debutFilm}</span>
          )}
        </p>
        <p>
          Released in the year&nbsp;
          {/* 1B */}
          {isEditing ? (
            <input
              type="text"
              name="debutYear"
              value={character.debutYear}
              onChange={(e) => updateCharacter(e)}
            />
          ) : (
            <span>{character.debutYear}</span>
          )}
        </p>
        {isEditing ? <button type="submit">Save Changes</button> : <br />}
      </form>
      {/* 1C */}
      <button onClick={toggleIsEditing}>
        {isEditing ? "Discard changes" : "Edit Character Details"}
      </button>
      <br />
      <button onClick={handleDelete}>ONE CLICK DELETE THIS CHARACTER</button>
    </>
  );
}

export default OneCharacter;
```

Now that it works, **CONGRATULATIONS!!** You've completed a MERN-stack application with full CRUD capabilities!!!

- The server is handling all requests to the database
- The front end is providing a UI for a user to navigate the application

Have fun with this application and celebrate!

