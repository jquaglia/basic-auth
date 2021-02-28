'use strict';

const express = require('express');
// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
const router = express.Router();

const usersModel = require('./models/users-model.js');
const basicAuth = require('./middleware/basic.js');

router.post('/signup', createSignUp);
router.post('/signin', basicAuth, createSignIn);


// let encodedString = base64.encode('Jason:secret');
// console.log(encodedString);

async function createSignUp(req, res, next) {
  try {
    // req.body.password = await bcrypt.hash(req.body.password, 5);
    const user = usersModel(req.body);
    const record = await user.save(req.body);
    res.status(201).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
 
}

async function createSignIn(req, res, next) {
  console.log(req.user);
  res.status(200).json({user: req.user});
}

module.exports = router;