'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

usersSchema.pre('save', function (next) {
  // console.log('THIS', this);
  let user = this;
  bcrypt.hash(user.password, 5, (error, hash) => {
    if (error) {
      return next(error);
    } else {
      user.password = hash;
      user.confirmPassword = hash;
      next();
    }
  });
});

usersSchema.statics.auth = async function (username, password, next, req) {
  console.log(this);
  const user = await this.findOne({ username: username });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) {
    req.user = user;
    next();
    // res.status(200).json(user);
  }
  else {
    throw new Error('Invalid User');
  }
};

const usersModel = mongoose.model('users', usersSchema);


module.exports = usersModel;