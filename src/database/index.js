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
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }

    return data;
  }
}

export { Database };
