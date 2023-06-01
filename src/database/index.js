import fs from "node:fs/promises";
import { title } from "node:process";

/**
 * Definindo a localização do arquivo de banco de dados "db.json"
 */
const databasePath = new URL("../../db.json", import.meta.url);

class Database {
  #database = {};

  /**
   * Escreve e realiza o parse para String no arquivo "db.json" de todos os dados da array "database"
   */
  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  /**
   * Ao ser instanciada a classse de banco de dados irá ler o arquivo "db.json",
   * e adicionar os dados dentro da array database
   */
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
    /**
     * Verifica se o atributo passado para o objeto é uma array, caso seja
     * o objeto é adicionado dentro da array correspondente
     */
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      /**
       * Caso o oatributo passado não for uma array, ele adiciona o mesmo dentro de uma array
       */
      this.#database[table] = [data];
    }

    this.#persist();
  }

  select(table, search) {
    let database = this.#database[table] ?? [];

    if (search) {
      return database.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return database;
  }

  update(table, id, data) {
    let database = this.#database[table] ?? [];

    const taskIndex = database.findIndex((task) => task.id === id);

    if (taskIndex > -1) {
      database[taskIndex].title = data.title
        ? data.title
        : database[taskIndex].title;

      database[taskIndex].description = data.description
        ? data.description
        : database[taskIndex].description;

      this.#persist();
    }
  }
}

export { Database };
