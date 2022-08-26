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
