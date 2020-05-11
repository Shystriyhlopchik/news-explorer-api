const router = require('express').Router();
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const users = require('./users');
const articles = require('./articles');
const auth = require('../middlewares/auth');
const error = require('../middlewares/error');
const { createUser, login } = require('../conrollers/users');
const { userValidator, loginValidator } = require('../middlewares/validation');
const { errorLogger } = require('../middlewares/logger');

router.use(bodyParser.json()); // для собирания JSON-формата
router.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
// роут
router
  .use('/signup', userValidator, createUser)
  .use('/signin', loginValidator, login)
  .use(auth)
  .use('/users', users)
  .use('/articles', articles)
  .use('*', (req, res) => {
    res.send('404 Not Found');
  });

// обработка ошибок
router.use(errorLogger) // подключаем логгер ошибок
  .use(errors()) // обработчик ошибок celebrate
  .use(error);

module.exports = router;
