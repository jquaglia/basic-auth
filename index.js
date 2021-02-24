'use strict';

// Start up DB Server
require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server.js');


const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  // useFindAndModify: true,
};

// Start the web server
mongoose.connect(process.env.MONGODB_URI, options)
  .then(() => server.start(process.env.PORT));

// server.start(process.env.PORT);

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// }).then(() => {
//   server.start(process.env.PORT);
// });
