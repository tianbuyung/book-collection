const fs = require("fs");
const path = require("path")

// const books = JSON.parse(fs.readFileSync(
//     path.join(__dirname, "books.json"),
//     "utf-8")
//     );
// console.log(books);
//console.log(typeof books);

const membacaFile = () =>{
  fs.readFile(
    path.join(__dirname, "books.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.error("Terjadi kesalahan:", err);
        return;
      }
      const books = JSON.parse(data);
      console.log(books);
      // Lakukan tindakan lain dengan data buku di sini
    }
  );

  fs.readFile(
    path.join(__dirname, "logs", "error.txt"),
    "utf-8",
    (err, errors) => {
      if (err) {
        console.error("Terjadi kesalahan:", err);
        return;
      }
      console.log(errors);
    }

  );
  
}  


  module.exports = membacaFile