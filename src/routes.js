import { randomUUID } from "node:crypto";
import { Database } from "./database/index.js";
import { routeParams } from "./utils/buildRoutes.js";

const database = new Database();

const routes = [
  {
    method: "POST",
    path: routeParams("/tasks"),
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
    path: routeParams("/tasks"),
    handle: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res.writeHead(200).end(JSON.stringify(tasks));
    },
  },

  {
    method: "PUT",
    path: routeParams("/tasks/:id"),
    handle: (req, res) => {
      const { id } = req.params;
      const data = req.body;

      database.update("tasks", id, data);

      return res.writeHead(200).end();
    },
  },
];

export { routes };
