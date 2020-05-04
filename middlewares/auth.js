const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../appconfig');

// const UnautorizedError = require('../errors/unauthorized-err');


module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      // return next(new UnautorizedError('Отсутствие токена'));
      return next(new Error('Отсутствие токена'));
    }
    return jwt.verify(token, JWT_SECRET, (err, data) => {
      if (!err) {
        req.user = data;
        return next();
      }
      // return next(new UnautorizedError('Недопустипый токен'));
      return next(new Error('Отсутствие токена'));
    });
  } catch (err) {
    return next(err);
  }
};
