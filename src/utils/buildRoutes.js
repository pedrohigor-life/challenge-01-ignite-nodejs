class BuildRoutes {
  routeParams(path) {
    const regexSelect = /:([a-zA-Z]+)/g;
    const regexInsert = /(?<$1>[a-z0-9-_]+)/;

    const reverseRegex = path.replaceAll(regexSelect, regexInsert);

    const routeParams = new RegExp(`^${reverseRegex}(?<query>\\?(.*))?$`);

    return routeParams;
  }

  queryParams(query) {
    return query
      .substr(1)
      .split("&")
      .reduce((queryParams, param) => {
        const [key, value] = param.split("=");

        queryParams[key] = value;

        return queryParams;
      }, {});
  }
}

export default new BuildRoutes();
