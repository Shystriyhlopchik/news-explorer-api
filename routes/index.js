const router = require('express').Router();
const bodyParser = require('body-parser');

const users = require('./users');
const articles = require('./articles');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../conrollers/users');
const { userValidator, loginValidator } = require('../middlewares/validation');


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

module.exports = router;
