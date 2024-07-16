# 3C. Relational Databases

---

## What this lesson covers:

- Getting Started
- Albums router
- Controller vs Router
- Users router
- Relational data
- Context

---

<!-- NOTE: PLEASE CHANGE HOW THE COLLECTIONS REFERENCE EACH OTHER, GET RID OF THE OBJECT BRACKETS SURROUNDING THE TYPE -->

## Getting Started

To begin, there should be a package.json provided. This means we can install all the dependencies with one command:

0. Install dependencies
<!-- 0. Install dependencies -->

```
npm install
```

Next, create a `.env` file and type in your MongoDB connection string:

```
MONGODB_URI="mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.<CLUSTER-CODE>.mongodb.net/album-app"
```

Now it's time to test that the server is running:

- Use `node index.js` in the terminal.
- `"server is on port 8080..."` and `"MONGODB CONNECTED"` should show up in the terminal if dependencies were installed
- Use `ctrl + c` to shut down the server

## Albums Router

In these lesson files, there is a FINAL and START version of the `./routes/albums` folder and `./routes/users` folder. We will be writing in the regularly named folders, but you can use the contents of the other folders as a reference.

We will be creating 2 routes for 2 different collections within the same database, and relating the data to each other by leaving a reference.

Let's begin by going to `./routes/albums/albumsModel.js` and setting up to create some albums

1. Set up a album model
<!-- 1. Set up a album model -->

```js
// 1a. Import mongoose
const mongoose = require("mongoose");

// 1b. Create a album schema
const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      default: "",
    },
    artist: {
      type: String,
      lowercase: true,
      required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// 1c. Create the album model
const Album = mongoose.model("Album", albumSchema);

// 1d. Export the album model
module.exports = Album;
```

All we need right now is the `title` and `artist`. `title` stays unique, but `artist` isn't because 1 artist can make many albums. (No 2 albums can have the same title, but 2 albums _can_ have the same artist.) We will return to this file later to relate it to the users.

For now, let's continue to the `./routes/albums/albumsController.js` file

## Controller vs Router

So far, the lessons have shown a larger and larger router file. The purpose of the router is to route clients to the correct webpage or data, depending on the URL used. Now, we introduce controller files that contain all of the necessary functionality behind the routing.

In the `./routes/albums/albumsController.js` file, let's set up the ability to post a book to our database, and get to testing as soon as possible.

2. Begin setting up database functionality
<!-- 2. Begin setting up database functionality -->

```js
// 2a. Import the Album model
const Album = require("./albumsModel");

// 2b. Write functionality to create an album
async function createAlbum(req, res) {
  try {
    await Album.create(req.body);

    res.json({
      message: "success",
      payload: await Album.find({}),
    });
  } catch (error) {
    let errorObj = {
      message: "failure to create album",
      payload: error,
    };

    // server-side error
    console.log(errorObj);

    // client-side error
    res.json(errorObj);
  }
}

// 2c. Export controller functions
module.exports = {
  createAlbum,
};
```

We export it in an object because we will soon be exporting more from this file.

Next, we plug the functionality into the router. This will keep our code cleaner and easier to read.

3. Create a router file
<!-- 3. Create a router file -->

```js
// 3a. Import express, router, and controller functionality
const express = require("express");
const router = express.Router();
const { createAlbum } = require("./albumsController");

// 3b. Route the ability to create an album at localhost:8080/api/albums/create-album
router.post("/create-album", createAlbum);

// 3c. Export the router
module.exports = router;
```

Finally, we plug the router into `index.js` so that we can test this

4. Import the album router
<!-- 4. Import the album router -->

```js
const albumRouter = require("./routes/START-albums/albumsRouter");

app.use("/api/albums", albumRouter);
```

Now we can test this

- Use `node index.js` in the terminal.
- `"server is on port 8080..."` and `"MONGODB CONNECTED"` should show up in the terminal.
- Use Postman to make a POST request at `localhost:8080/api/albums/create-album`. Use the Body tab (raw - text -> JSON) and create an album with a `title` and `artist`
- Use Compass to see the entry
- Use `ctrl + c` to shut down the server

## Users router

To set up the Users router, we will go through the same protocol that we did for the albums.

Model > Controller > Router > index

In `./routes/users/usersModel.js`, write the following:

5. Set up a user model
<!-- 5. Set up a user model -->

```js
// 5a. Import mongoose
const mongoose = require("mongoose");

// 5b. Create a user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 5c. Create the user model
const User = mongoose.model("User", userSchema);

// 5d. Export the User model
module.exports = User;
```

Next, we set up the users controller on `./routes/users/usersController`:

6. Set up users controller
<!-- 6. Set up users controller -->

```js
// 6a. Import the User model
const User = require("./usersModel");

// 6b. Write functionality to create a user
async function createUser(req, res) {
  try {
    await User.create(req.body);

    res.json({
      message: "success",
      payload: await User.find({ username: req.body.username }),
    });
  } catch (error) {
    let errorObj = {
      message: "failure to create user",
      payload: error,
    };

    // server-side error
    console.log(errorObj);

    // client-side error
    res.json(errorObj);
  }
}

// 6c. Export controller functions
module.exports = {
  createUser,
};
```

Next we set up the users router on `./routes/users/usersRouter`:

7. Set up the users router
<!-- 7. Set up the users router -->

```js
// 7a. Import express, router, and controller functionality
const express = require("express");
const router = express.Router();
const { createUser } = require("./usersController");

// 7b. Route the ability to create a book at localhost:8080/api/users/create-user
router.post("/create-user", createUser);

// 7c. Export the router
module.exports = router;
```

Finally, we plug it into the `index.js` file to test it:

8. Import the user router
<!-- 8. Import the user router -->

```js
const userRouter = require("./routes/START-users/usersRouter");
app.use("/api/users", userRouter);
```

And now we test it:

- Use `node index.js` in the terminal.
- `"server is on port 8080..."` and `"MONGODB CONNECTED"` should show up in the terminal.
- Use Postman to make a POST request at `localhost:8080/api/users/create-user`. Use the Body tab (raw - text -> JSON) and create a user with a `username`
- Use Compass to see the entry
- Use `ctrl + c` to shut down the server

## Relational data

Now that we have 2 collections, it's time to make the data related to each other.

1 User can have many favorite albums. 1 Album can have many user favorites. This is called a **Many-to-Many relationship**

The way this is set up on the server is by updating each model, and place references on each other.

In `./routes/albums/albumsModel.js`, add the following code:

9. Make the albums related to the users
<!-- 9. Make the albums related to the users -->

```js
// 9a. Define an ObjectId variable
const ObjectId = mongoose.Schema.Types.ObjectId;

// 1b. Create an album schema
const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      default: "",
    },
    artist: {
      type: String,
      lowercase: true,
      required: true,
      default: "",
    },
    // 9b. Include userFavorite
    userFavorite: {
      type: [
        {
          type: ObjectId,
          ref: "User",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
```

Note that the type property uses the `[]` hard brackets to indicate that the overall data type is an array, but inside of that, each item will have a type of `ObjectId`.

WARNING: DO NOT GIVE RELATIONAL DATA A "unique" QUALIFIER, IT WILL CAUSE AN ERROR

- `Schema.Types.ObjectId` refers to the MongoDB ObjectId data type
- `ref: "User"` will refer to the user model (`const User = mongoose.model("User", userSchema);` it should match the first argument in the .model method)

We should test this immediately:

- Use `node index.js` in the terminal.
- `"server is on port 8080..."` and `"MONGODB CONNECTED"` should show up in the terminal.
- Use Postman to make a POST request at `localhost:8080/api/albums/create-album`. Use the Body tab (raw - text -> JSON) and create an album with a `title`, `artistName`, and a `userFavorite` in an array. Make sure to grab the ID from the `user` collection
- Use Compass to see the entry
- Use `ctrl + c` to shut down the server

Take note that even the other documents on the albums collection now includes the "userFavorite" array.

Next, we go back into the `./routes/users/usersModel.js` and do the same thing:

10. Make the users related to the albums
<!-- 10. Make the users related to the albums -->

```js
// 10a. Define a Schema variable
const ObjectId = mongoose.Schema.Types.ObjectId;

// 5b. Create a user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      default: "",
    },
    // 10b. Include favoriteAlbums
    favoriteAlbums: {
      type: [
        {
          type: ObjectId,
          ref: "Album",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
```

We should test this immediately:

- Use `node index.js` in the terminal.
- `"server is on port 8080..."` and `"MONGODB CONNECTED"` should show up in the terminal.
- Use Postman to make a POST request at `localhost:8080/api/users/create-user`. Use the Body tab (raw - text -> JSON) and create a user with a `username` and a `favoriteAlbums` in an array. Make sure to grab the ID from the `albums` collection
- Use Compass to see the entry
- Use `ctrl + c` to shut down the server

## Context

This lesson so far has been showing you **HOW** to keep the data related to each other, but not **WHY**. If you take a look at a website like Twitter, you'll notice that you can very easily navigate from a post, to the replies, to the user who replied, to that user's liked posts, to the replies on the new post, etc... This is because the collections on their database have references to each other. When you click "like" on a tweet, traces of your user ID are left on that tweet. This allows any user to pull out the list of likes on any given tweet, and select any user from that list to view their profile. The reference on the schema of each collection will allow you to set that up on the front-end seamlessly.

In this application, there are views provided (in EJS) that demonstrate this concept. In order to get it to work, we need to head back to `index.js`.

11. Plug in the view router

Write the following in `index.js`:

<!-- 11. Plug in the view router -->

```js
const viewRouter = require("./routes/viewRoutes/viewRouter");

app.use("/", viewRouter);
```

Now turn on the server and navigate to `localhost:8080` in the browser. When you click on "Albums" you will see a list of albums you've created. When you click the link to see more about that album, you will see a list of users who have "favorited" that album. If you recall, these users are generated from a list of ID's on the albums collection! As long as you set up your schemas correctly, you can add new features on the front-end to give users a way to navigate around via relational data.

If you would like to keep working on this project, here are bonus files to work on and function to create:

- `./routes/users/usersController.js` - `function addUserFavoriteToAlbum()`
- `./routes/users/usersController.js` - `function getUserAndAlbumsInfo()`
- `./routes/users/usersController.js` - `function deleteUserFavoriteFromAlbum()`
