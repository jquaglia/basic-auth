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

  console.log('FISH', username, password);
  try {
    const validUser = await usersModel.auth(username, password);
    // const user = await usersModel.findOne({ username: username });
    // const valid = await bcrypt.compare(password, user.password);
    if (validUser) {
      req.user = validUser;
      next();
      // res.status(200).json(user);
    }
    else {
      // throw new Error('Invalid User');
      next('Invalid User');
    }
  } catch (error) {
    // res.status(403).send('Invalid Login'); 
    next('Invalid Login');
  }
}


module.exports = headers;