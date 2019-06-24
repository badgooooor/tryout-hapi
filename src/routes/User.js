'use strict'
const UserController = require('../controllers/UserController');

exports.routes = [
  {
    method: 'POST',
    path: '/users/register',
    options: {
      handler: UserController.register,
      description: "Register new user!",
      tags: ['api', 'users']
    }
  },
  {
    method: 'POST',
    path: '/users/login',
    options: {
      handler: UserController.login,
      description: "Login user!",
      notes: "Returns a token if login successful",
      tags: ['api', 'users']
    }
  },
  {
    method: 'GET',
    path: '/users/profile',
    options: {
      handler: UserController.profile,
      description: "Login user!",
      notes: "Parse authorization token",
      tags: ['api', 'users']
    }
  },
]