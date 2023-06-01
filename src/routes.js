import { randomUUID } from "node:crypto";
import { Database } from "./database/index.js";
import buildRoutes from "./utils/buildRoutes.js";

const database = new Database();

const routes = [
  {
    method: "POST",
    path: buildRoutes.routeParams("/tasks"),
    handle: (req, res) => {
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "GET",
    path: buildRoutes.routeParams("/tasks"),
    handle: (req, res) => {
      const tasks = database.select("tasks");

      return res.writeHead(200).end(JSON.stringify(tasks));
    },
  },
];

export { routes };
