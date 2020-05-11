const router = require('express').Router();

const users = require('./users');
const articles = require('./articles');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../conrollers/users');
const { userValidator, loginValidator } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-err');


// роуты
router
  .use('/signup', userValidator, createUser)
  .use('/signin', loginValidator, login)
  .use(auth)
  .use('/users', users)
  .use('/articles', articles)
  .use('*', (req, res, next) => {
    next(new NotFoundError('Not Found'));
  });


module.exports = router;
