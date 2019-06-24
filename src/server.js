'user strict'

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');

require('dotenv').config();

const server = new Hapi.Server({
  host: 'localhost',
  port: 5000,
  routes: {
    cors: true
  }
})

server.app.db = mongoose.connect(
  'mongodb://localhost/hapihapi', 
  { useNewUrlParser: true}
);

const init = async() => {
  await server.register(
    { plugin: require('./routes/User') },
    {
      routes: {
        prefix: '/users'
      }
    }
  )
  .catch(err => {
    console.log(err);
  });

  await server.start();
  console.log('Server running at : ', server.info.uri);
}

init();