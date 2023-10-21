const express = require('express');
const authenRouter = express.Router();
const authenController = require('../contoller/authentic');
const jwt = require('jsonwebtoken');

authenRouter.post('/api/login',authenController.login)
authenRouter.post('/api/register',authenController.register)


module.exports = authenRouter;
