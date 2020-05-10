const articlesRouter = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../conrollers/articles');
const { createArticleValidation, idValidation } = require('../middlewares/validation');


// роуты
articlesRouter.get('/', getArticles)
  .post('/', createArticleValidation, createArticle)
  .delete('/:id', idValidation, deleteArticle);


module.exports = articlesRouter;
