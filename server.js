const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/:id/:activity/:status", (req, res) => {
  res.send(req.params);
});

app.post("/activity", (req, res) => {
  console.log("body", req.body);

  res.status(201).json(req.body);
});

app.put("/:id", (req, res) => {
  console.log("params", req.params);
  console.log("body", req.body);

  res.status(200).json(req.params, req.body);
});

app.delete("/:id", (req, res) => {
  console.log("params", req.params);

  res.status(200).json(req.params);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
