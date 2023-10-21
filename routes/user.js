const express = require('express');
const userRouter = express.Router();
const UserController = require('../contoller/user.js');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verify');


userRouter.get('/api/user', UserController.getAllUsers);
userRouter.get('/api/user/paginate', UserController.getUsersPaginate);
userRouter.get('/api/user/:id', UserController.getUserById);
userRouter.post('/api/user',verifyToken, UserController.createUser);
userRouter.put('/api/user/:id', verifyToken,UserController.updateUser);
userRouter.delete('/api/user/:id', verifyToken,UserController.deleteUser)

module.exports = userRouter;
