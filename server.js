const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Application level middleware
// ini untuk membaca data request dari client dalam bentuk json
app.use(express.json());

// ini route middleware
// ini untuk menampilkan data
app.get("/", (req, res) => {
  console.log("query", req.query); // ini lebih sering ada di method GET

  res.json(req.query);
});

// ini untuk create hal yang baru
app.post("/", (req, res) => {
  console.log("body", req.body); // ini untuk mengirimkan data dari client dalam bentuk json

  res.status(201).json(req.body);
});

// ini untuk update data
app.put("/:userId/:sex", (req, res) => {
  console.log("params", req.params); // params untuk protocol http
  console.log("body", req.body); // ini untuk mengirimkan data dari client dalam bentuk json

  res.status(200).json(req.params, req.body);
});

// ini untuk delete data
app.delete("/:userId", (req, res) => {
  console.log("params", req.params); // params untuk protocol http

  res.status(200).json(req.params);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
