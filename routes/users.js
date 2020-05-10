const router = require('express').Router();
const { getUsersMe } = require('../conrollers/users');


// возврвращаем информацию о пользователе
router.get('/me', getUsersMe);

module.exports = router;
