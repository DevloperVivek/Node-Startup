const http = require("http");

const server = http.createServer((request, response) => {
  const url = request.url;

  response.setHeader("Content-Type", "text/html");
  if (url === "/home") {
    response.write("<html><head><body>Welcome home</body></head></html>");
    response.end();
  } else if (url === "/about") {
    response.write(
      "<html><head><body>Welcome to About Us page</body></head></html>"
    );
    response.end();
  } else if (url === "/node") {
    response.write(
      "<html><head><body>Welcome to my Node Js project</body></head></html>"
    );
    response.end();
  }
});

server.listen(3000);
