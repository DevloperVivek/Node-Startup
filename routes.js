const fs = require("fs");

const requestHandler = (request, response) => {
  const url = request.url;
  const method = request.method;

  if (url === "/") {
    fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
      response.write("<html>");
      response.write("<head><title>Enter Message</title></head>");
      response.write(`<body>${data}</body>`);
      response.write(
        '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
      );
      response.write("</html>");
      return response.end();
    });
  } else if (url === "/message" && method === "POST") {
    const body = [];
    request.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, () => {
        response.statusCode = 302;
        response.setHeader("Location", "/");
        return response.end();
      });
    });
  } else {
    response.setHeader("Content-Type", "text/html");
    response.write("<html><head><body>Welcome home</body></head></html>");
    response.end();
  }
};

module.exports = {
  headers: requestHandler,
  someText: "Hard Coded Text",
};
