const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../appconfig');

const UnautorizedError = require('../errors/unauthorized-err');

// авторизация
module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return next(new UnautorizedError('Необходима авторизоваться'));
    }
    return jwt.verify(token, JWT_SECRET, (err, data) => {
      if (!err) {
        req.user = data;// записываем пейлоуд в объект запроса
        return next();
      }
      return next(new UnautorizedError('Необходима авторизоваться'));
    });
  } catch (err) {
    return next(err);
  }
};
