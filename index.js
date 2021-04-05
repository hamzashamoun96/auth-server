'use strict';
require('dotenv').config();
// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGODB_URI, options)
.then(()=>{
  require('./src/server.js').startup(process.env.PORT);
})
.catch((e)=>{
  console.log('ERROR_CONNECTION' , e.message)
})

