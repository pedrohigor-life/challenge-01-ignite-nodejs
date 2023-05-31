import { randomUUID } from "crypto";
import { Database } from "./database";

const database = new Database();

const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
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
];

export { routes };
