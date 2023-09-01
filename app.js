const http = require("http");

const server = http.createServer((request, response) => {
  console.log(request);
  console.log("Vivek");
});

server.listen(3000);
