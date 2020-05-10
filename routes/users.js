const router = require('express').Router();
const { getUsersMe } = require('../conrollers/users');
const { idValidation } = require('../middlewares/validation');


// возврвращаем информацию о пользователе
router.get('/me', idValidation, getUsersMe);


module.exports = router;
