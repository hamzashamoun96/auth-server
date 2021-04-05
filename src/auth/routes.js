'use strict';

require('dotenv').config();
const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken')
const User = require('./models/users.js');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js')
// const generator = require('generate-password');
// const bcrypt = require('bcrypt');




authRouter.post('/signup', async (req, res, next) => {
  try {
    let user = new User(req.body);
    const userRecord = await user.save();
    // console.log('USER RECORD',userRecord)
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    // console.log('OUTPUT',output)

    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  // console.log('USER SIGNIN',user)
  res.status(200).json(user);
});

authRouter.get('/users', bearerAuth, async (req, res, next) => {
  // console.log('USERSSSSSSSSSSSSs')
  const users = await User.find({});
  // console.log(users,'USERSSSSSS')
  // console.log(users,'users')
  // console.log(users.username,'user.username')

  const list = users.filter(user => {
    if (user.username === req.user.username) {
      return true
    }
  })
  res.status(200).json(list[0]);
});
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZ2diIsImlhdCI6MTYxNzYzNTExMn0.8RBFxmzFfUFJ5tYr3OlgfCVN3kjth-TDtRiOIv3X2k4
authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  console.log("SERCREEEEEEEEEEEET")
  let token = req.headers.authorization.split(' ').pop()
  console.log('ddddddddd',token)
  let des = jwt.
console.log(des,"DESTROYYYY")
  // const token = req.headers.authorization.split(' ').pop();
  // console.log(token,"TOKKKKKKKK")
  // const newToken = await User.authenticateWithToken(token)
  // console.log(newToken, 'New_TOKEN')


  // let newPassword = generator.generate({
  //   length: 8,
  //   numbers: true
  // })
  // console.log(newPassword, "passssssssssssss")

  // let newPass = await bcrypt.hash(newPassword, 10);
  // // console.log(newPass,"passssssssssssss")

  // let newData = await User.find({ "_id": newToken.id, "username": newToken.username, "password": newToken.password, }).updateOne({
  //   "$set": { "password": `${newPass}` , "token":newToken.token}
  // });

  // console.log(newData, "AAAAAA")
  // // console.log(newToken.token)


  res.status(200).json({
    name:"fghjkl"
    // Name: newToken.username,
    // Your_New_Token: newToken.token,
    // Your_New_Password: newPassword
  })
});


module.exports = authRouter;