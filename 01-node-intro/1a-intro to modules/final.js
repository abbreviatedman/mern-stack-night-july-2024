/*
    1. Place a console log to test
*/
console.log("Hello World!");

console.log("==============");

/*
    2. Use the require() function to grab sayName from the modules
*/
const sayName = require("./modules/sayName");

/*
    3. Test the module function sayName
*/
sayName("Colin");

/*
    4. Use the require() function to grab { sayHello, sayGoodBye } from the modules
*/
const { sayHello, sayGoodBye } = require("./modules/greetings");

/*
    5. Test the module functions sayHello and sayGoodBye
*/
sayHello("New Colin");
sayGoodBye("Old Colin");
