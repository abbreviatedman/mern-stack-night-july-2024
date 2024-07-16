# Snippets

---

## Overview:

- Intro
- Structure
- How to create a snippet
- index.js
- - IMPORTS
- - MIDDLEWARE
- - ROUTES
- - POWER
- db/mongodb.js
- models/ExampleModel.js
- routes/ExampleRouter.js
- controllers/ExampleController.js

---

## Intro

Snippets will allow us to generate large amounts of code much faster, shortening the development life cycle of our APIs / applications.

Before using snippets to auto-complete some code, let's make sure that we install the necessary dependencies so that testing becomes smooth.

Use the following commands when making any API:

`npm init -y`

`npm install express morgan dotenv mongoose`

Make sure you create your `.env` file to connect your app to your database

## Structure

Once your dependencies are installed, make sure you have the following folders / files prepared

- controllers/
- - ExampleController.js
- db/
- - mongodb.js
- models/
- - ExampleModel.js
- routes/
- - ExampleRouter.js
- index.js
- .env

## How to create a snippet

1. Press `CTRL+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
2. Type "Snippets: Configure user Snippets" and select it
3. Type "Javascript" and select it
4. Create a snippet with the following format:

```js
{
    "Insert-snippet-name-here": {
        "prefix": "insert-prefix-here",
        "body": [
            "insert-line-of-code-here",
            "insert-line-of-code-here",
            "insert-line-of-code-here",
        ],
        "description": "insert-description-here"
    }
}
```

- The snippet name should say what the snippet is being used for
- The prefix is what you type to open up the dropdown menu of snippets
- Each item within the body is a line of code that you want to auto-generate
- The description is just a full description of what the snippet is.

## Generate a snippet from a file

Creating the `body` property of a snippet can be time consuming, because you have to go line-by-line and write it all out. Here is a shortcut way of doing it:

1. Open the file you wish to turn into a snippet. Take a look at any variable names that would be modified upon each use of a snippet, and use `${1:replaceMe}` in place of anything needing to be modified
2. Open `snippetify.js` and modify line 4 to target the file you're trying to turn into a snippet
3. The results will be on a file called `snippet.js`. Select all and copy the entire thing
4. Within `"body": []` paste it

This should shorten the time it takes to create a new snippet out of a template!

## How to use a snippet

1. Begin typing the prefix until you see it highlighted on the drop-down menu that appears.
2. Hit the `tab` key to generate your prepared code
3. Certain variables may be highlighted for you to rename yourself. Those will be specified in each section
4. Use VSCode's "Find and Replace" function to replace any other variable names or phrases as necessary

## index.js

Let's set something up with imports, middleware, and the ability to test servers quickly

Here is each snippet you will need, these will go inside your `javascript.json` where you are adding/editing snippets

### IMPORTS

```js
"MERN-index-imports": {
		"prefix": "server-imp",
		"body": [
			"const express = require('express');",
			"const app = express();",
			"const path = require('path');",
			"const logger = require('morgan')",
			"const connectToMongoDB = require('./db/mongodb');",
			"require('dotenv').config();"
		],
		"description": "Make some basic imports for your backend server in the MERN stack"
	}
```

Nothing too special to take note of here

### MIDDLEWARE

```js
"MERN-index-middleware": {
        "prefix": "server-mid",
        "body": [
			"// Read incoming requests properly",
			"app.use(express.urlencoded({ extended: false }));",
			"app.use(express.json());",
			"// logs requests to the server",
			"app.use(logger('dev'))"
        ],
        "description": "Necessary middleware"
    }
```

Basic middleware. When testing fullstack, make sure to include any code that resolves the CORS issue.

### ROUTES

```js
"MERN-index-routes": {
        "prefix": "server-routes",
        "body": [
            "const ${1:collectionName}Router = require('./routes/${1:collectionName}Router');",
			"// localhost:3001/${1:collectionName}/...",
			"app.use('/${1:collectionName}', ${1:collectionName}Router);"
        ],
        "description": "insert-description-here"
    }
```

Everywhere you see `${1:collectionName}` will automatically be highlighted, so when you hit the `tab` key you can immediately begin typing the name of the data collection that this set of routes refers to.

CAPITALIZE THE FIRST LETTER OF THE COLLECTION NAME TO KEEP CONSISTENCY ACROSS FILES (or use a naming convention that feels convenient to you)

### POWER

```js
"MERN-index-power": {
        "prefix": "server-pow",
        "body": [
            "const PORT = 3001",
            "",
            "app.listen(PORT, () => {",
			"    console.log(`server listening on port 3001`);",
			"",
			"    connectToMongoDB();",
			"});"
        ],
        "description": "this lets us turn the server on"
    }
```

Nothing too special to note here

## db/mongodb.js

```js
"MERN-db-mongo": {
		"prefix": "connect-mongo",
		"body": [
			"const mongoose = require('mongoose');",
			"require('dotenv').config()",
			"",
			"function connectToMongoDB(){",
			"    mongoose.connect(process.env.MONGODB_URI)",
			"        .then(() => {",
			"            console.log('MONGODB CONNECTED')",
			"        })",
			"        .catch((e) => {",
			"            console.log(e)",
			"        });",
			"};",
			"",
			"module.exports = connectToMongoDB;"
		],
		"description": "Create the entire db/mongodb.js file. There is nothing to customize here"
	}
```

Nothing to note here, no changes ever need to be made to this file. Just make sure that your `.env` file is in place to be connected

## models/ExampleModel.js

```js
"MERN-model-schema": {
        "prefix": "model-schema",
        "body": [
            "const mongoose = require('mongoose');",
            "",
            "const ${1:model}Schema = new mongoose.Schema(",
			"    {",
			"        ${2:property}: {",
			"            type: String,",
			"            unique: true,",
			"            required: true",
			"        },",
			"    }",
			")",
			"",
			"const ${1:model} = mongoose.model('${1:model}', ${1:model}Schema);",
			"",
			"module.exports = ${1:model};"
        ],
        "description": "Creates an example Model/Schema file, replace the words 'model' with the name of your data collection"
    }
```

Everywhere you see `${1:model}` will automatically be highlighted, so when you hit the `tab` key you can immediately begin typing the name of the data collection that this model is for.

Where you see `${2:property}` is where you should begin specifying the properties for this collection of data.

## routes/ExampleRouter.js

```js
"MERN-router": {
        "prefix": "router-template",
        "body": [
            "const router = require('express').Router();",
			"",
			"const {",
			"    getAll${1:model}s,",
			"    getOne${1:model},",
			"    createOne${1:model},",
			"    deleteOne${1:model},",
			"    updateOne${1:model}",
			"} = require('../controllers/${1:model}Controller');",
			"",
			"// localhost:3001/${1:model}/all${1:model}s",
			"router.get('/all${1:model}s', getAll${1:model}s);",
			"",
			"// localhost:3001/${1:model}/one${1:model}/:${2:params}",
			"router.get('/one${1:model}/:${2:params}', getOne${1:model});",
			"",
			"// localhost:3001/${1:model}/createOne${1:model}",
			"router.post('/createOne${1:model}', createOne${1:model});",
			"",
			"// localhost:3001/${1:model}/deleteOne${1:model}/:${2:params}",
			"router.delete('/deleteOne${1:model}/:${2:params}', deleteOne${1:model});",
			"",
			"// localhost:3001/${1:model}/updateOne${1:model}/:${2:params}",
			"router.put('/updateOne${1:model}/:${2:params}', updateOne${1:model});",
			"",
			"module.exports = router;",
        ],
        "description": "insert-description-here"
    }
```

Everywhere you see `${1:model}` will automatically be highlighted, so you can immediately begin typing the name of the data collection that these routes are referring to.

Where you see `${2:params}` is where you can hit tab to replace this with the property you are using to identify specific documents in your data collection

## controlers/ExampleController.js

```js
"MERN-controller": {
        "prefix": "controller-template",
        "body": [
            "const ${1:collectionName} = require('../models/${1:collectionName}Model');",
			"",
			"async function getAll${1:collectionName}s (req, res) {",
			"    try {",
			"        let results = await ${1:collectionName}.find({});",
			"",
			"        res.json({",
			"            message: 'success',",
			"            payload: results",
			"        })",
			"    } catch (error) {",
			"        let errorObj = {",
			"            message: 'get all ${1:collectionName} failure',",
			"            payload: error",
			"        }",
			"",
			"        console.log(errorObj)",
			"",
			"        res.json(errorObj)",
			"    }",
			"}",
			"",
			"async function getOne${1:collectionName} (req, res) {",
			"    try {",
			"        let result = await ${1:collectionName}.findOne({${2:propertyName}: req.params.${2:propertyName}});",
			"",
			"        res.json({",
			"            message: 'success',",
			"            payload: result",
			"        })",
			"    } catch (error) {",
			"        let errorObj = {",
			"            message: 'get ONE ${1:collectionName} failure',",
			"            payload: error",
			"        }",
			"",
			"        console.log(errorObj)",
			"",
			"        res.json(errorObj)",
			"    }",
			"}",
			"",
			"async function createOne${1:collectionName}(req, res){",
			"    try {",
			"        // Accepting the front-end form data from the client to generate the document",
			"        let new${1:collectionName} = req.body",
			"",
			"",
			"",
			"        // post the new document to the ${1:collectionName} collection",
			"        await ${1:collectionName}.create(new${1:collectionName});",
			"",
			"        res.json({",
			"            message: 'success',",
			"            payload: new${1:collectionName}",
			"        });",
			"    } catch (error) {",
			"        let errorObj = {",
			"            message: 'create one ${1:collectionName} failure',",
			"            payload: error",
			"        }",
			"",
			"        console.log(errorObj);",
			"",
			"        res.json(errorObj);",
			"    }",
			"}",
			"",
			"async function deleteOne${1:collectionName}(req, res) {",
			"    try {",
			"        await ${1:collectionName}.deleteOne({ ${2:propertyName}: req.params.${2:propertyName} });",
			"",
			"        res.json({",
			"            message: 'success',",
			"            payload: req.params.${2:propertyName}",
			"        })",
			"    } catch (error) {",
			"        let errorObj = {",
			"            message: 'delete one ${1:collectionName} failure',",
			"            payload: error",
			"        }",
			"",
			"        console.log(errorObj);",
			"",
			"        res.json(errorObj);",
			"    }",
			"}",
			"",
			"async function updateOne${1:collectionName}(req, res){",
			"    try {",
			"        let target${1:collectionName} = await ${1:collectionName}.findOne({ ${2:propertyName}: req.params.${2:propertyName} })",
			"",
			"        // ternaries avoid inputting undefined values",
			"        let updated${1:collectionName} = {",
			"            ${2:propertyName}: req.body.${2:propertyName} ? req.body.${2:propertyName} : target${1:collectionName}.${2:propertyName},",
			"        }",
			"",
			"        await ${1:collectionName}.updateOne(",
			"            { ${2:propertyName}: req.params.${2:propertyName} },",
			"            { $$set: updated${1:collectionName} },",
			"            { upsert: true }",
			"        )",
			"",
			"        res.json({",
			"            message: 'success',",
			"            payload: updated${1:collectionName}",
			"        });",
			"    } catch (error) {",
			"        let errorObj = {",
			"            message: 'update one ${1:collectionName} failure',",
			"            payload: error",
			"        }",
			"",
			"        console.log(errorObj);",
			"",
			"        res.json(errorObj);",
			"    }",
			"}",
			"",
			"module.exports = {",
			"    getAll${1:collectionName}s,",
			"    getOne${1:collectionName},",
			"    createOne${1:collectionName}, ",
			"    deleteOne${1:collectionName},",
			"    updateOne${1:collectionName}",
			"}",
        ],
        "description": "Replace 'collectionName' with the name of the data collection that is being controlled. Replace 'propertyName' with the different properties from the data that can be used to find/update/delete from the database. Make sure to look carefully at the create/update functions, as generating a new document depends on the original Model"
    },
```

Everywhere you see `${1:collectionName}` will automatically be highlighted, so when you hit the `tab` key you can immediately begin typing the name of the data collection that these functions are referring to.

Where you see `${2:propertyName}` is where you should use VSCode's "Find and Replace" function to replace this with the property you are using to identify specific documents in your data collection

## controllers/userController.js

```js
"Argon2-controller": {
        "prefix": "argon2-controls",
        "body": [
            "const User = require('../models/userModel')",
            "const argon2 = require('argon2')",
            "",
			"async function createUser(req, res) {",
			"    try {",
			"        // temporarily hold password",
			"        let userPassword = req.body.password",
			"",
			"        // encrypt password",
			"        const sentPassword = await argon2.hash(userPassword)",
			"",
			"        // generate new user document",
			"        let newUser = {",
			"            username: req.body.username,",
			"            password: sentPassword",
			"        }",
			"",
			"        // insert document into the database",
			"        await User.create(newUser)",
			"",
			"        res.json({",
			"            message: 'success',",
			"            payload: newUser",
			"        })",
			"    } catch (error) {",
			"        let errorObj = {",
			"            message: 'create user failure',",
			"            payload: error",
			"        }",
			"",
			"        res.json(errorObj)",
			"        console.log(errorObj)",
			"    }",
			"}",
			"",
			"async function verifyPassword(req, res) {",
			"    try {",
			"        // hold username & password individually",
			"        let incomingUsername = req.body.username",
			"        let incomingPassword = req.body.password",
			"",
			"        // find the target user",
			"        let foundUser = await User.findOne({ username: incomingUsername })",
			"",
			"        // compare passwords",
			"        const isCorrectPassword = await argon2.verify(foundUser.password, incomingPassword)",
			"",
			"        // respond based on password correctness",
			"        if (isCorrectPassword) {",
			"            res.json({",
			"                message: 'verify password success',",
			"                payload: 'logged in!'",
			"            })",
			"        } else {",
			"            res.json({",
			"                message: 'verify password success',",
			"                payload: 'Please check your password and try again'",
			"            })",
			"        }",
			"    } catch (error) {",
			"        let errorObj = {",
			"            message: 'verify password failure',",
			"            payload: error",
			"        }",
			"",
			"        res.json(errorObj)",
			"        console.log(errorObj)",
			"    }",
			"}",
			"",
			"async function updatePassword(req, res) {",
			"    try {",
			"        // capture all necessary info",
			"        const { username, oldPassword, newPassword } = req.body",
			"",
			"        // Target the correct user",
			"        let foundUser = await User.findOne({ username: username })",
			"",
			"        // Verify the original password is correct",
			"        let isCorrectPassword = await argon2.verify(foundUser.password, oldPassword)",
			"",
			"        // Double check that the new password isn't the same as the old one",
			"        let isSamePassword = await argon2.verify(foundUser.password, newPassword)",
			"",
			"        // respond accordingly",
			"        if (isCorrectPassword && !isSamePassword) {",
			"            const newSafePassword = await argon2.hash(newPassword)",
			"",
			"            foundUser.password = newSafePassword",
			"",
			"            await foundUser.save()",
			"            res.json({",
			"                message: 'update password success',",
			"                payload: 'Your password has been updated!'",
			"            })",
			"        } else if (isSamePassword) {",
			"            res.json({",
			"                message: 'update password success',",
			"                payload: 'New password must be different from the old password'",
			"            })",
			"        } else {",
			"            res.json({",
			"                message: 'update password success',",
			"                payload: 'Original password is incorrect, please check the spelling and try again'",
			"            })",
			"        }",
			"    } catch (error) {",
			"        let errorObj = {",
			"            message: 'update password failure',",
			"            payload: error",
			"        }",
			"",
			"        res.json(errorObj)",
			"        console.log(errorObj)",
			"    }",
			"}",
			"",
			"module.exports = {",
			"    createUser,",
			"    verifyPassword,",
			"    updatePassword",
			"}"
        ],
        "description": "password encryption controller. verifyPassword() can be used as part of a login process, make sure to coordinate properly with whatever login method you're using"
    },
```

## models/userModel.js

```js
"User-model": {
        "prefix": "user-model",
        "body": [
            "const mongoose = require('mongoose')",
            "",
            "const userSchema = new mongoose.Schema(",
			"    {",
			"        username: {",
			"            type: String,",
			"            required: true,",
			"            unique: true",
			"        },",
			"        password: {",
			"            type: String,",
			"            required: true",
			"        }",
			"    }",
			")",
			"",
			"const User = mongoose.model('User', userSchema)",
			"",
			"module.exports = User"
        ],
        "description": "User model with mongoose, can coordinate with argon2/bcrypt for password encryption"
    },
```

## routes/userRouter.js

```js
"User-router": {
        "prefix": "user-router",
        "body": [
            "const router = require('express').Router()",
            "",
            "const {",
			"    createUser,",
			"    verifyPassword,",
			"    updatePassword",
			"} = require('../controllers/userController')",
			"",
			"// localhost:3001/api/createUser",
			"router.post('/createUser', createUser)",
			"",
			"// localhost:3001/api/verifyPassword",
			"router.post('/verifyPassword', verifyPassword)",
			"",
			"// localhost:3001/api/updatePassword",
			"router.put('/updatePassword', updatePassword)",
			"",
			"module.exports = router"
        ],
        "description": "This connects with the user-controller snippet"
    }
```
