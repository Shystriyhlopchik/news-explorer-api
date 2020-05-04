const usersRouter = require('express').Router();
const express = require('express');

const app = express();

const { getUsers } = require('../conrollers/users');

usersRouter.get('/me', getUsers);// возврврат всех пользователей

app.use('/app/users', usersRouter);

module.exports = usersRouter;
