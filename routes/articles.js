const articlesRouter = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../conrollers/articles');


// роуты
articlesRouter.get('/', getArticles)
  .post('/', createArticle)
  .delete('/:id', deleteArticle);


module.exports = articlesRouter;
