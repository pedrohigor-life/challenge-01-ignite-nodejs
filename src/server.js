import http from "http";

const server = http.createServer(async (req, res) => {});

server.listen(3333, () => {
  console.log(`Server is running -> http:localhost:3333`);
});
