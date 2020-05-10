const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');

// сообщения ошибок валлидации
const errorsMessage = {
  about: new BadRequestError('"about" не соответствует формату'),
  name: new BadRequestError('Длина имени не должна превышать 30 символов и быть не короче 2 символов'),
  avatar: new BadRequestError('Ошибка в поле "avatar". URL не соответствует формату.'),
  email: new BadRequestError('Строка, обязательное поле, должно соответствовать паттерну почты'),
  password: new BadRequestError('Пароль должен состоять не менее чем из 8 символов(максмум 24).'),
  link: new BadRequestError('Ошибка URL'),
  id: new BadRequestError('Ошибка типа'),
  login: new UnauthorizedError('Почта или пароль введенны с ошибкой'),
};

// валидация новог пользователя
module.exports.userValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .error(errorsMessage.name),
    email: Joi.string().required().email()
      .error(errorsMessage.email),
    password: Joi.string().required().min(8)
      .regex(/[a-z0-9-+_=&?!.,%^:;<>#@*()~'"|\\/]{8,24}/i)
      .error(errorsMessage.password),
  }),
});
