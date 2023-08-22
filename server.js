// core modules
const EventEmitter = require("events");
const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

// custom modules
const logEvents = require("./logEvents");

class Emitter extends EventEmitter {}

// initialize object
const myEmitter = new Emitter();

// listening for events logging
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    // // basic serve file
    // const data = await fsPromises.readFile(filePath, "utf-8");

    // response.writeHead(200, {
    //   "Content-Type": contentType,
    // });

    // response.end(data);

    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf8" : ""
    );

    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;

    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });

    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit("log", `${err.name}: ${err.message}`, "errLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");

  if (req.url === "/game") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    const filePath = path.join(__dirname, "views", "index.html");
    fs.readFile(filePath, (err, data) => {
      if (err) console.error(err);

      res.end(data);
    });
  }

  // switch (req.url) {
  //   case "/":
  //     res.statusCode = 200;
  //     const filePath = path.join(__dirname, "views", "index.html");
  //     fs.readFile(filePath, (err, data) => {
  //       if (err) console.error(err);

  //       res.end(data);
  //     });
  //     break;
  // }

  

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;

    case ".js":
      contentType = "text/javascript";
      break;

    case ".json":
      contentType = "application/json";
      break;

    case ".jpg":
      contentType = "image/jpeg";
      break;

    case ".png":
      contentType = "image/png";
      break;

    case ".txt":
      contentType = "text/plain";
      break;

    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  // makes .html extension not required in the browser
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    // serve the file
    serveFile(filePath, contentType, res);
  } else {
    // console.log(path.parse(filePath).base);
    switch (path.parse(filePath).base) {
      // 301
    //   case "old-page.html":
    //     res.writeHead(301, { Location: "/new-page.html" });
    //     res.end();
    //     break;

    //   case "www-page.html":
    //     res.writeHead(301, { Location: "/" });
    //     res.end();
    //     break;

      default:
        // serve a 404 response
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});