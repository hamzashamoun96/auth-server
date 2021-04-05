'use strict';

const base64 = require('base-64');
const User = require('../models/users.js');

module.exports = async (req, res, next) => {
// console.log('basic middleware!!!!!!')
  if (!req.headers.authorization) { 
    // console.log('ERRRRRRRRRRRRRRR')
    return _authError(); 
  }

  let basic = req.headers.authorization.split(' ').pop();
  // console.log("BASIC",basic)
  let [user, pass] = base64.decode(basic).split(':');
  // console.log(user , pass)
  try {
    // console.log(user , pass)

    req.user = await User.authenticateBasic(user, pass)
    // console.log(req.user , "FDHDF")
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}