const axios = require('axios')
module.exports = axios.create({ 
    baseURL: 'https://app.moskitcrm.com',
timeout: 1000,
headers: {'X-Custom-Header': 'foobar'}})