const fs = require("fs");
const path = require("path")

const books = JSON.parse(fs.readFileSync(
    path.join(__dirname, "books.json"),
    "utf-8")
    );
console.log(books);
console.log(typeof books);


const errors = fs.readFileSync(
    path.join(__dirname, "logs", "error.txt"),
    "utf-8"
);
console.log(errors);