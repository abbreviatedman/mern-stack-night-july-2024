# Fire! Fire! Fire!

![bill hader](https://media1.giphy.com/media/3orieLZelMyxenarwQ/giphy.gif)

The realestate market is hot, but we need to make sure it doesn't burn down to the ground. How can we best do that? Let's compile a list of all the firehouses in NYC to make sure that we can keep an eye on things. Oh, and let's build it in react because everyone knows that Mark Zuckerberg is in cahoots with the FDNY.

## Step 1

Use our old friend `create-react-app` to create a react app.

## Step 2

Let's create two components, `House.js` and `HouseList.js`. Be sure to manage your state in App.js.

In `App.js`, Create 2 properties in state, `fireData` and `currentHouse`. Import all of the firehouses and save them in state as `fireData`. We can find all of the firehouse data in the provided json file `firehouse.json`. Leave `currentHouse` as `null` for now. Let's also create a function that selects one firehouse and updates the state `currentHouse`.

## Step 3

`House.js` should be a component that is meant to display the full details of one fire house. In `House.js`, pass the current house as props down and render it to the component IF there is a `currentHouse`. Else, render the words "Select A House"

## Step 4

In `HouseList.js` pass the props of all the firehouses and map over them to render a list of every house. Only display the "FacilityName" property.

Add an onClick function to each of the mapped elements so that the state of current house is updated to the firehouse that is clicked.

## Step 5

Style it. Make the FDNY glimmer like FIRE!!!!  
![fire](https://media2.giphy.com/media/yr7n0u3qzO9nG/giphy.gif)
