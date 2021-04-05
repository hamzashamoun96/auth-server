'use strict';

const users = require('../models/users.js')

module.exports = async (req, res, next) => {
  // console.log('bearer middleware')
  try {

    if (!req.headers.authorization) {
      console.log('invalid ddddddd')
      next('Invalid Login')
    }

    const token = req.headers.authorization.split(' ').pop();
    // console.log('TOKENNNN', token)
    const validUser = await users.authenticateWithToken(token);
// console.log(validUser,'Valid_USER')
    req.user = validUser;
    req.token = validUser.token;
    // console.log('REQ__USER', req.user)
    // console.log('REQ__TOKEN', req.token)
next()
  } catch (e) {
    res.status(403).send('Invalid Login');;
  }
}