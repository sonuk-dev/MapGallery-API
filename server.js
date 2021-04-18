const config = require('./config/development.json');
const mongoConnect = require('./libs/mongo-connection');

mongoConnect(config);