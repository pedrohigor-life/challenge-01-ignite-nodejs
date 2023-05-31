import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  /**
   * Apartir daqui á aplicação, está pronta para receber arquivos JSON
   */
  await json(req, res);

  /**
   * Retorna a rota correspondente
   */
  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });

  /**
   * Caso exista uma rota correspondente, o método handle() é acionado
   */
  if (route) {
    return route.handle(req, res);
  }

  /**
   * Caso não seja encontrado nenhuma rota, o servidor retornará o status code 404
   */
  return res.writeHead(404).end();
});

server.listen(3333, () => {
  console.log(`Server is running -> http://localhost:3333`);
});
