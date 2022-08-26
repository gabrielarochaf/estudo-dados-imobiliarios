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

const Moskit = (msgSuccess) => {
  function get() {
    return api.get("/v2");
  }

  function send(url, body) {
    return api.post(url, body);
  }

  async function gravaLead(lead) {
    try {
      const { name, email, phone } = lead;

      const url = "/v2/contacts";
      const body = {
        name: name,
        createdBy: { id: 78890 },
        responsible: { id: 78890 },
        emails: email ? [{ address: email }] : null,
        phones: phone ? [{ number: phone }] : null,
      };

      const response = await send(url, body);

      return {
        ...lead,
        id: response.data.id,
        contentLead: response.data,
      };
    } catch (error) {
      console.log("gravaLead", error);
      throw error;
    }
  }

  async function gravaNegocio(lead) {
    try {
      const { id, name, href, leadText, contentLead } = lead;

      const url = "/v2/deals";
      const body = {
        name,
        createdBy: { id: 78890 },
        responsible: { id: 78890 },
        stage: { id: 232891 },
        status: "OPEN",
        contacts: [{ id: id }],
        // entityCustomFields: [
        //   { id: config.id_link, textValue: href },
        //   { id: config.id_tag, textValue: leadText }
        // ]
      };

      const response = await send(url, body);

      return {
        ...lead,
        id: response.data.id,
        contentLead,
        contentDeals: response.data,
      };
    } catch (error) {
      console.log("gravaNegocio", error);
      throw error;
    }
  }

  async function gravaNotas({ id, description, contentLead, contentDeals }) {
    try {
      const url = `/v2/deals/${id}/notes`;
      const body = {
        description: description,
        user: {
          id: 78890,
        },
      };

      const { data } = await send(url, body);

      if (msgSuccess) return msgSuccess;

      //   return {
      //     contentLead,
      //     contentDeals,
      //     contentNotes: data
      //   }

      return {
        id: contentLead.id,
        name: contentLead.name,
        createAt: contentLead.dateCreated,
      };
    } catch (error) {
      console.log("gravaNotas", error);
      throw error;
    }
  }

  return {
    get() {
      return get();
    },

    send(lead) {
      const pipeline = pipe(gravaLead, gravaNegocio, gravaNotas);
      return pipeline(lead);
    },
  };
};

module.exports = Moskit;
