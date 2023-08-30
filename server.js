const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Application level middleware
// ini untuk membaca data request dari client dalam bentuk json
app.use(express.json());

let db = [
  {
    id: "1",
    activity: "Pelajar",
    status: "Aktif",
  },
  {
    id: "2",
    activity: "Mahasiswa",
    status: "Aktif",
  },
];
// ini route middleware
// ini untuk menampilkan data
app.get("/", (req, res) => {
  res.json("Hello World");
});
app.get("/todo", (req, res) => {
  res.json(db);
});
app.get("/todo/:id", (req, res) => {
  const result = db.filter((val) => {
    return val.id === req.params.id;
  });
  return res.json(result);
});

// ini untuk create hal yang baru
app.post("/todo", (req, res) => {
  const newTodo = {
    id: db.length + 1,
    activity: req.body.activity,
    status: req.body.status,
  };
  db.push(newTodo);
  res.status(201).json(req.body);
});

// ini untuk update data
app.put("/todo/:id", (req, res) => {
  const theTodo = db.filter((val) => {
    return val.id === req.params.id;
  });

  if (theTodo === null) {
    return res.json("Not Found");
  }

  const newTodo = {
    id: theTodo[0].id,
    activity: req.body.activity || theTodo[0].activity,
    status: req.body.status || theTodo[0].status,
  };

  db.push(newTodo);
  res.status(200).json(newTodo);
});

// ini untuk delete data
app.delete("/todo/:id", (req, res) => {
  db = db.filter((val) => {
    return val.id !== req.params.id;
  });
  res.status(200).json(req.params);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
