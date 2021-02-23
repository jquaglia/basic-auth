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
      // user.confirmPassword = hash;
      next();
    }
  });
});

// usersSchema.pre('save', async function () {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 5);
//   }
// });

usersSchema.statics.auth = async function (username, password) {
  // console.log(this);
  const user = await this.findOne({ username: username });
  const valid = await bcrypt.compare(password, user.password);

  if (valid){
    return user;
  } else {
    throw new Error('User Validation Error');
  }
  // if (valid) {
  //   req.user = user;
  //   next();
  //   // res.status(200).json(user);
  // }
  // else {
  //   next('Invalid User');
  // }
};

usersSchema.validate = function () {

};

const usersModel = mongoose.model('users', usersSchema);


module.exports = usersModel;