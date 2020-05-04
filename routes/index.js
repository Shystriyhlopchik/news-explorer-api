const express = require('express');

const appRouter = require('express').Router();
const users = require('./users');
const articles = require('./articles');

const app = express();

// роутер
appRouter
  .use('/users', users)
  .use('/articles', articles)
  .use('*', (req, res) => {
    res.send('404 Not Found');
  });

app.use('/app', appRouter);

module.exports = appRouter;
