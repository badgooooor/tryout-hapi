'user strict'

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const mongoose = require('mongoose');

require('dotenv').config();

const UserRoute = require('../src/routes/User');

const server = new Hapi.Server({
  host: 'localhost',
  port: 5000,
  routes: {
    cors: true
  }
})

const swaggerOptions = {
  info: {
    title: 'Hapi-tryout API Documentation',
    version: '1.0.0.1',
  }
}

server.app.db = mongoose.connect(
  'mongodb://localhost/hapihapi', 
  { useNewUrlParser: true}
);

const init = async() => {
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])
  .catch(err => { 
    console.log(err); 
  });

  server.route(UserRoute.routes);
  
  await server.start();
  console.log('Server running at : ', server.info.uri);
}

init();