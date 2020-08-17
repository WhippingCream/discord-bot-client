const axios = require("axios");
const {
  api: { server },
} = require("../config");

module.exports = async ({ method, path, params }) => {
  //   return `${server}${path}`;
  const result = await axios({
    method,
    url: `${server}${path}`,
    params,
  });
  return JSON.stringify(result.data);
};
