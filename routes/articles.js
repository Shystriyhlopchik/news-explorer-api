const articlesRouter = require('express').Router();
const express = require('express');

const app = express();

const { getArticles, createArticle, deleteArticle } = require('../conrollers/articles');

// роутер
articlesRouter.get('/', getArticles);
articlesRouter.post('/', createArticle);
articlesRouter.delete('/:id', deleteArticle);

app.use('/app/articles', articlesRouter);

module.exports = articlesRouter;
