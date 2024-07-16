/*
    1. Write a Try-Catch block where the `try` statement has no errors
*/
// try {
//     console.log("this is the try block");
// } catch (error) {
//     console.log("This is the catch block");
//     console.log(error);
// }

/*
    2. Write a Try-Catch block where the `try` statement has an error
*/
// try {
//     consooooooo000le.log("this is the try block");
// } catch (error) {
//     console.log("This is the catch block");
//     console.log(error);
// }

/*
    3. Write a Try-Catch block with `throw` statements to define the error
*/
// let loadedDice;
// while (loadedDice !== 4) {
//     loadedDice = Math.ceil(Math.random() * 6);
//     // console.log(dice);

//     try {
//         if (loadedDice < 4) throw "dice rolled too low"
//         if (loadedDice > 4) throw "dice rolled too high"
//         console.log(loadedDice);
//     } catch (error) {
//         console.log(error);
//     }
// }

/*
    4. Import the `prompt-sync` module
*/
const prompt = require("prompt-sync")();

/*
    5. Store the user input in a variable called `password`
*/
let password = prompt("Store a password 4 characters long or longer: ");

/*
    6. Write a Try-Catch block to check the length of the password
*/
try {
  if (password.length < 4) throw "password too short!";
  console.log("This password is acceptable");
} catch (error) {
  console.log(error);
}
