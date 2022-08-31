const http = require("http");

const getHomePageHandler = (req, res, endRequest) => {
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify({ message: "hello world!" }), endRequest);
};

const notFoundHandler = (req, res, endRequest) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Page not found!" }), endRequest);
};

const postTodoHandler = (req, res, endRequest) => {
  let bodyString = "";
  req.on("data", (chunk) => {
    bodyString += chunk.toString();
  });

  req.on("end", () => {
    const bodyObj = JSON.parse(bodyString);
    console.log(bodyObj);

    res.write("DOne!", endRequest);
  });
};

const server = http.createServer((req, res) => {
  const endRequest = () => {
    res.end();
  };

  if (req.url === "/home" && req.method === "GET") {
    return getHomePageHandler(req, res, endRequest);
  }

  if (
    req.url === "/todo" &&
    req.method === "POST" &&
    req.headers["content-type"].toLowerCase() === "application/json"
  ) {
    return postTodoHandler(req, res, endRequest);
  }

  return notFoundHandler(req, res, endRequest);
});

server.listen(3000, () => {
  console.log("Server started listening!");
});
