'use strict';

require('dotenv').config();
// const mongoose = require('mongoose');

// const mongooseOptions = {
//   useNewUrlParser:true,
//   useCreateIndex: true,
// };
// mongoose.connect(process.env.MONGODB_URI, mongooseOptions);
const {server}=require('./src/server.js');
server.start(process.env.PORT);
