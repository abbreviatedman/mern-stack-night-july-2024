/*
    1. Use require() to import the os module
*/
const os = require("os"); // Operating System

/*
    4. Use require() to import the fs module
*/
const fs = require("fs"); // File System

/*
    11. Use require() to import the path module
*/
const path = require("path"); // Path module

/*
    2. Check for the type of operating system
*/
console.log(`Operating System: ${os.type()}`);

/*
    3. Check for the amount of free memory (in bytes)
*/
console.log(`Memory Available (bytes): ${os.freemem()}`);

/*
    5. Read the .txt files
*/
const data = fs.readFileSync("./data.txt", "utf8");
const data2 = fs.readFileSync("./data2.txt", "utf8");

/*
    6. Create a new file, use the .txt files as content
*/
fs.writeFileSync(
  "createNewFile.txt", // name of the new file
  `${data} ${data2}` // content of the new file
);

/*
    7. Read the new file to see if it works
*/
const joinedData = fs.readFileSync("./createNewFile.txt", "utf8");
console.log(`joined data: ${joinedData}`);

/*
    8. Leave a console log to demonstrate asyncronous timing
*/
console.log("Before Async processing");

/*
    9. Read data.txt and respond with it
*/
fs.readFile("./data.txt", "utf8", function (err, result) {
  // 9a. just in case the file isn't there:
  if (err) {
    console.log(err);
    return err;
    // 9b. If the file IS there:
  } else {
    console.log(`asynchronous data.txt: ${result}`);
  }
}); // end of reading data.txt

/*
    10. Leave another console log to demonstrate asyncronous timing
*/
console.log("After Async processing");

/*
    12. Gather the relative file path of test.js
*/
const filePath = path.join("/01.02.os-fs-path", "path-folder", "test.js"); // => /01.02.os-fs-path/path-folder/test.js

/*
    13. Get the base file name from filePath
*/
const base = path.basename(filePath); // => test.js

/*
    14. Check the absolute file path of this file
*/
console.log(__dirname); // => /Users/colinjaffe/code/node-track-walkthrough/01.node-intro/01.02.-OS-FS-path
