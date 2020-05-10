const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');

// сообщения ошибок валлидации
const errorsMessage = {
  keyword: new BadRequestError('Длина имени не должна превышать 30 символов и быть не короче 2 символов'),
  title: new BadRequestError('Длина заголовка не должна превышать 30 символов и быть не короче 2 символов'),
  text: new BadRequestError('Текст статьи обязательное поле и его длина не должна быть короче 2 символов'),
  date: new BadRequestError('Полене не соответствует формату "дата"'),
  source: new BadRequestError('Длина источника не должна превышать 30 символов и быть не короче 2 символов'),
  link: new BadRequestError('Ошибка URL'),
  image: new BadRequestError('Ошибка URL'),
  owner: new BadRequestError('Ошибка поля "owner"'),
  name: new BadRequestError('Длина имени не должна превышать 30 символов и быть не короче 2 символов'),
  email: new BadRequestError('Строка, обязательное поле, должно соответствовать паттерну почты'),
  password: new BadRequestError('Пароль должен состоять не менее чем из 8 символов(максмум 24).'),
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

// валидация авторизации
module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .error(errorsMessage.login),
    password: Joi.string().required().min(8)
      .error(errorsMessage.login),
  }),
});

// валидация создаваемой карточки
module.exports.createArticleValidation = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30)
      .error(errorsMessage.keyword),
    title: Joi.string().required().min(2).max(30)
      .error(errorsMessage.title),
    text: Joi.string().required().min(2)
      .error(errorsMessage.text),
    date: Joi.date().iso().required()
      .error(errorsMessage.date),
    source: Joi.string().required().min(2).max(30)
      .error(errorsMessage.source),
    link: Joi.string().required().uri()
      .error(errorsMessage.link),
    image: Joi.string().required().uri()
      .error(errorsMessage.image),
    owner: Joi.string().alphanum().length(24)
      .error(errorsMessage.owner),
  }),
});

module.exports.idValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24)
      .error(errorsMessage.id),
  }),
});
