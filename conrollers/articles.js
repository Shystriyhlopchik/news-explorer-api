const mongoose = require('mongoose');

const Articles = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

// возвращает все статьи пользователя
module.exports.getArticles = (async (req, res, next) => {
  try {
    const articles = await Articles.find({ owner: req.user._id });
    res.send({ data: articles });
  } catch (e) {
    next(e);
  }
});

// создание статьи
module.exports.createArticle = (async (req, res, next) => {
  try {
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;
    const articles = await Articles.create({
      keyword, title, text, date, source, image, link, owner: req.user._id,
    });
    res.send({ data: articles }).status(200);
  } catch (e) {
    next(e);
  }
});

// удаление статьи владельца
module.exports.deleteArticle = (async (req, res, next) => {
  try {
    const article = await (Articles.findById(req.params.id).select('+owner'));
    if (!article) {
      return next(new NotFoundError('Not Found')); // здесь проверка, не удалена ли уже карточка
    }
    if (!article.owner.equals(req.user._id)) {
      return next(new ForbiddenError('Unauthorized')); // passes the data to errorHandler middleware
    }
    const articleDelete = await Articles.findOneAndRemove(req.params.id);
    return res.status(200).send({ message: 'article deleted:', data: articleDelete });
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return next(new NotFoundError('Not Found'));
    }
    return next(e);
  }
});
