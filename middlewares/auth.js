const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../appconfig');

// const UnautorizedError = require('../errors/unauthorized-err');

// авторизация
module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // res.send(req.query);
    if (!token) {
      // return next(new UnautorizedError('Отсутствие токена'));
      res.send('оТСУТСТВУЕТ токен');
      // throw new Error('оТСУТСТВУЕТ токен');
    }
    return jwt.verify(token, JWT_SECRET, (err, data) => {
      if (!err) {
        req.user = data;// записываем пейлоуд в объект запроса
        return next();
      }
      // return next(new UnautorizedError('Недопустипый токен'));
      res.send('Отсутствует токен');
    });
    // return res.send({token});
  } catch (err) {
    return next(err);
  }
};
