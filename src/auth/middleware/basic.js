'use strict';

// const bcrypt = require('bcrypt');
const base64 = require('base-64');

const usersModel = require('../models/users-model.js');
// const Users = new usersModel(usersModel.usersModel);


async function headers(req, res, next) {
  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password

  try {
    usersModel.auth(username, password, next, req);
    // const user = await usersModel.findOne({ username: username });
    // const valid = await bcrypt.compare(password, user.password);
    // if (valid) {
    //   req.user = user;
    //   next();
    //   // res.status(200).json(user);
    // }
    // else {
    //   throw new Error('Invalid User');
    // }
  } catch (error) { res.status(403).send('Invalid Login'); }
}


module.exports = headers;