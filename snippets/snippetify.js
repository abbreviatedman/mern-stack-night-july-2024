const fs = require("fs");
const path = require("path");

const code = fs.readFileSync(path.join(__dirname, "example.js"), "utf8");

const lines = code.split("\n");
// this returns an array, which is the body of any snippet
const quotedLines = lines.map((line, index) => {
  if (index === lines.length - 1) {
    return `"${line}"`;
  } else {
    return `"${line}",`;
  }
});

fs.writeFileSync(
  path.join(__dirname, "snippet-body.js"),
  quotedLines.join("\n")
);
