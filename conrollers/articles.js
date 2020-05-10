const Articles = require('../models/user');

// возвращает все статьи
module.exports.getArticles = (async (req, res) => {
  try {
    const articles = await Articles.find({});
    res.send({ data: articles });
  } catch (e) {
    res.send(e);
  }
});

// создание статьи
module.exports.createArticle = (async (req, res) => {
  try {
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;
    const articles = await Articles.create({
      keyword, title, text, date, source, image, link, owner: req.user._id,
    });
    res.send({ data: articles }).status(200);
  } catch (e) {
    res.send(e);
  }
});

// удаление статьи владельца
module.exports.deleteArticle = (async (req, res) => {
  try {
    const article = await Articles.findById(req.params.id);
    if ((!article) && (!article.owner.equals(req.user._id))) { // проверка наличия карты и автора
      // throw new NotFoundError('404 Not Found');
      throw new Error('404 Not Found');
    }
    const articleDelete = await Articles.findOneAndRemove(req.params.id);
    return res.status(200).send({ message: 'article deleted:', data: articleDelete });
  } catch (e) {
    res.send(e);
  }
});
