const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

require('dotenv').config();

exports.register = (req, h) => {
  if(!req.payload.email) {
    return h.response({ error: 'Email is required.'}).code(400);
  }

  if(!req.payload.password) {
    return h.response({ error: 'Password is required.'}).code(400);
  }

  let userData = {
    firstName: req.payload.firstName,
    lastName: req.payload.lastName,
    email:req.payload.email,
    password: req.payload.password
  };

  return User.findOne({ email: req.payload.email })
  .then(user => {
    if(!user) {
      bcrypt.hash(req.payload.password, 10, (err, hash) => {
        userData.password = hash;
        return User.create(userData)
          .then(user => {
            return h.response({ status: user.email + "is registered!"});
          })
          .catch(err => {SECRET
            return h.response({ error: err });
          });
      });
      return h.response({ status : userData.email + " is registered!"});
    } else {
      return h.response({ error: 'User already exists' });
    }
  })
}

exports.login = (req, h) => {
  if(!req.payload.email) {
    return h.response({ error: 'Email/Password is required.' }).code(400);
  }

  if(!req.payload.password) {
    return h.response({ error: 'Email/Password is required.' }).code(400);
  }

  return User.findOne({ email: req.payload.email })
    .then(user => {
      if(user) {
        if(bcrypt.compareSync(req.payload.password, user.password)) {
          const payload = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }

          let token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: 1440
          });

          return h.response({ token: token}).code(200);
        } else {
          return h.response({ error: 'User does not exist.'});
        }
      } else {
        return h.response({ error: 'User does not exist.' });
      }
    })
    .catch(err => {
      return h.response({ error: err });
    })
}

exports.profile = (req, h) => {
  const decoded = jwt.verify(
    req.headers.authorization,
    process.env.SECRET
  );

  return User.findOne({
    _id: mongoose.Types.ObjectId(decoded.id)
  })
    .then(user => {
      if(user) {
        return h.response({ user: user}).code(200);
      } else {
        return h.response({ error: 'User does not exist.' })
      }
    })
    .catch(err => {
      return h.response({ error: err});
    })

}