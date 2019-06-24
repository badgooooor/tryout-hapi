'use strict'
const UserController = require('../controllers/UserController');
process.env.SECRET = 'secret';

exports.plugin = {
  register: (server, options, next) => {
    server.route({
      method: 'POST',
      path: '/register',
      handler: UserController.register
    }),
    server.route({
      method: 'POST',
      path: '/login',
      handler: UserController.login
    }),
    server.route({
      method: 'GET',
      path: '/profile',
      handler: UserController.profile
    })
  },
  name: "users"
}