const { pipe } = require("../helpers");
// const api = require('../../config/api')
const axios = require("axios");
const { username } = require("../../config/database");
const api = axios.create({
  baseURL: "https://api.moskitcrm.com",
  headers: {
    "Content-Type": "application/json",
    ApiKey: process.env.API_MOSKIT,
    Accept: "application/json",
    "X-Moskit-Origin": "MOSKIT_API_V2",
  },
});

const UsuarioMoskit = (msgSuccess) => {
  function get() {
    return api.get("/v2");
  }

  function send(url, body) {
    return api.post(url, body);
  }
  async function gravaUser(user) {
    try {
      const { name, username, phone } = user;

      const url = "/v2/users";
      const body = {
        name: name,
        username: username,
        phones: phone ? [{ number: phone }] : null,
        active: true,
        levelConfig: false,
        levelExport: false,
        levelBulk: false,
        levelDelete: false,
        levelView: "USER",
        levelEdit: "USER",
        team: { id: 48146 },
        defaultPipeline: { id: 52050 },
        defaultDashboard: { id: 47704 },
        timezone: { id: 1 },
      };
      const response = await send(url, body);
      console.log("response", response);
      if (msgSuccess) return msgSuccess;

      return {
        ...user,
        id: response.data.id,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  return {
    get() {
      return get();
    },
    send(user) {
      const usuario = pipe(gravaUser);
      return usuario(user);
    },
  };
};

module.exports = UsuarioMoskit;
