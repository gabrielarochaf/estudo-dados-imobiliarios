const { pipe } = require("../helpers");
// const api = require('../../config/api')
const axios = require("axios");
// const { username } = require("../../config/database");



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


  function send(url, body) {
    return api.post(url, body);
  }

  async function gravaLead(lead) {
    try {
      const { name, email, phone, userId } = lead;

      const url = "/v2/contacts";
      const body = {
        name: name,
        createdBy: { id: userId },
        responsible: { id: userId },
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
      const { id, name, href, leadText, contentLead, userId } = lead;
   
      const url = "/v2/deals";
      const body = {
        name,
        createdBy: { id: userId },
        responsible: { id: userId },
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

  async function gravaNotas({ id, description, contentLead, contentDeals, userId }) {
    try {
      const url = `/v2/deals/${id}/notes`;
      const body = {
        description: description,
        user: {
          id: userId,
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
        id: contentDeals.id,
        name: contentLead.name,
        createAt: contentLead.dateCreated,
      };
    } catch (error) {
      console.log("gravaNotas", error);
      throw error;
    }
  }

  async function gravaUser(user) {
    try {
      const { name, username, phone, teamId, pipelineId, dashboardId } = user;

      const url = "/v2/users";
      const body = {
        name,
        username,
        phones: phone ? [{ number: phone }] : null,
        active: true,
        levelConfig: false,
        levelExport: false,
        levelBulk: false,
        levelDelete: false,
        levelView: "USER",
        levelEdit: "USER",
        team: { id: teamId}, //48146 },
        defaultPipeline: { id: pipelineId},//52050 },
        defaultDashboard: { id: dashboardId},//47704 },
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


  async function updateUser(user) {
    
      const url = `/v2/users/${user.id}`;
      delete user.id

      // Teste
      delete user.defaultPipeline
      delete user.defaultDashboard

      const body = {
        ...user,
        levelView: "USER",
        levelEdit: "USER",
        timezone: { id: 1 },
      };
  
    try{
      const response = await  api.put(url, body);

      console.log("response", response);

      return {
        ...user,
        id: response.data.id,
      }
    } catch (error) {
      console.log(error);
      throw error;
    }

  }

  return {
    get(resouce) {
      return api.get(`/v2/${resouce}`);
    },

    send(lead) {
      const pipeline = pipe(gravaLead, gravaNegocio, gravaNotas);
      return pipeline(lead);
    },

    user(data){
      return gravaUser(data)
    },

    userAlt(data){
      return updateUser(data)
    },


  };
};

module.exports = Moskit;
