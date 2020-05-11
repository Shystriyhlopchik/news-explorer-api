const Articles = require('../models/user');
const NotFoundError = require('../errors/not-found-err');


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
    const article = await Articles.findById(req.params.id);
    if ((!article) && (!article.owner.equals(req.user._id))) { // проверка наличия карты и автора
      throw new NotFoundError('404 Not Found');
    }
    const articleDelete = await Articles.findOneAndRemove(req.params.id);
    return res.status(200).send({ message: 'article deleted:', data: articleDelete });
  } catch (e) {
    next(e);
  }
});
