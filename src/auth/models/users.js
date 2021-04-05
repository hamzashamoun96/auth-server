'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET


const usersSch = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Adds a virtual field to the schema. We can see it, but it never persists
// So, on every user object ... this.token is now readable!
usersSch.virtual('token').get(function () {
  let tokenObject = {
    username: this.username,
  }
  // console.log('token Object', tokenObject)
  // console.log('hhhhhh',jwt.sign(tokenObject , SECRET))
  return jwt.sign(tokenObject, SECRET)
});

usersSch.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    // console.log(this.username,this.password)
  }
});

// BASIC AUTH
usersSch.statics.authenticateBasic = async function (username, password) {
  // console.log(username,password)
  const user = await this.findOne({ username : username})
  console.log(user,"fewwe")
  const valid = await bcrypt.compare(password, user.password)
  consolee.log('VALID', valid)
  if (valid) {
    return user;
  }
  throw new Error('Invalid User');
}

// BEARER AUTH
usersSch.statics.authenticateWithToken = async function (token) {
  try {
    const parsedToken = jwt.verify(token, process.env.SECRET);
    // console.log('PARSEEDTOKENNNNN', parsedToken)
    const user1 = await this.findOne({ username: parsedToken.username })
    if (user1) {
      // console.log(user1)
      return user1;
    } else {
      throw new Error("User Not Found");
    }
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = mongoose.model('users', usersSch);