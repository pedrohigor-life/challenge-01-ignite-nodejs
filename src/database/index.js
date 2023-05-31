import fs from "node:fs/promises";

/**
 * Definindo a localização do arquivo de banco de dados "db.json"
 */
const databasePath = new URL("../db.json", import.meta.url);

class Database {
  #database = {};

  /**
   * Escreve e realiza o parse para String no arquivo "db.json" de todos os dados da array "database"
   */
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
  }
}

export { Database };
