# Lesson 1B: Built-in Modules

---

## What this lesson covers:

- How to interact with the Operating System
- How to read & create files
- How to sync files together
- How to use file paths

---

### What is OS?

- OS refers to the Operating System
- OS is a built-in node module used to provide information about the computer operating system.
- OS will rarely be used, but it is important to know.

In order for `os` to be used, it needs to be imported from Node's built in modules using `require()`:

1. Use require() to import the os module

```js
const os = require("os"); // Operating System
```

`os` is a powerful tool that can be used to check your local computer for things such as the name of the Operating System, the release version, how much memory is on the device, etc.

If you set up a link that will download an installation setup file, it would be easier on the user if their operating system was checked for its type before being handed a **.msi** file or **.pkg** file. Here is how you check for the type:

2. Check for the type of operating system

```js
console.log(`Operating System: ${os.type()}`);
```

- `Darwin` means it's a MacOS
- `Windows_NT` means it's a Windows OS
- `Linux` means it's a Linux OS

This next function will display how much memory (CPU) is available to use right now (in bandwidth, not storage size. It's not the size of the vault, it's the size of the door). Here is an example of checking for that:

3. Check for the amount of free memory (in bytes)

```js
console.log(`Memory Available (bytes): ${os.freemem()}`);
```

<!-- There are 1,000,000 bytes in 1 Megabyte. Move the decimal place 7 times to the left to convert it into Megabytes -->

If the amount of free memory is less than what the installation holds, the installer should warn the user and cancel the installation.

### What is FS?

The Node.js file system module allows you to work with the file system on your computer. Here are some common uses for the File System module:

- Create files - `fs.writeFileSync()`
- Read files - `fs.readFileSync()` or `fs.readFile()`
- Update files - `fs.rename()`
- Delete files - `fs.unlinkSync()`

This is how you include the File System module:

4. Use require() to import the fs module

```js
const fs = require("fs"); // File System
```

In order for an application to read files and properly serve them to a client, the `fs.readFileSync(path, encoding)` method must be used and stored in a variable:

5. Read the .txt files

```js
const data = fs.readFileSync("./data.txt", "utf8");
const data2 = fs.readFileSync("./data2.txt", "utf8");
```

If you `console.log(data)`, you will see the contents of the **.txt** file.

You are also able to write new files with `fs.writeFileSync(filename, data, encoding)`, and write the content of the files immediately:

6. Create a new file, use the .txt files as content

```js
fs.writeFileSync(
  "createNewFile.txt", // name of the new file
  `${data} ${data2}` // content of the new file
);
```

When you open **createNewFile.txt** you can see that the contents of the other files have been written on it! Just in case you want to make sure of it, you can read the new file:

7. Read the new file to see if it works

```js
const joinedData = fs.readFileSync("./createNewFile.txt", "utf8");
console.log(`joined data: ${joinedData}`);
```

It's also possible to take actions on the files you read upon reading it, but this process is asynchronous. This means that a process will begin, and actions will only take place once the preceding action has been completed. In order to demonstrate this, let's first leave a console log:

8. Leave a console log to demonstrate asyncronous timing

```js
console.log("Before Async processing");
```

Now it's time to use the `fs.readFile(filename, encoding, callback_function)` method to perform an asynchronous process.

9. Read data.txt and respond with it

```js
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
```

If we run this file at this point, it isn't clear how long `fs.readFile()` took to process. Leave another log below to see how this works:

10. Leave another console log to demonstrate asyncronous timing

```js
console.log("After Async processing");
```

If you notice, both the "before" and "after" console logs show up before `fs.readFile()` is complete. This is because when the file is run, it's compiled from top to bottom. When `fs.readFile()` is performed, each event is waiting on the result of the previous event.

### What is Path?

The Path module provides a way of working with directories and file paths. The methods we will be learning are:

- `path.join()` - returns a relative path
- `path.basename()` - returns the base of a file path
- `__dirname` - returns the direct path to THIS file
- `path.resolve()` - returns the absolute path

This is how you include the Path module:

11. Use require() to import the path module

```js
const path = require("path"); // Path module
```

Included in these files is a **path-folder**. Let's gather the relative file path for the file in that folder:

12. Gather the relative file path of test.js

```js
const filePath = path.join("/01.02.Built-in-Modules", "path-folder", "test.js"); // => /01.02.os-fs-path/path-folder/test.js
```

Now that we have the filepath, we can get the name of the base file:

13. Get the base file name from filePath

```js
const base = path.basename(filePath); // => test.js
```

If we needed the absolute file path to this current file, this is how we would get it:

14. Check the absolute file path of this file

```js
console.log(__dirname); // => /Users/colinjaffe/code/node-track-walkthrough/01.node-intro/01.02.-OS-FS-path
```
