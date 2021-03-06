const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const { JWT_SECRET } = require('../appconfig');
const JWT_COOKIE_OPTIONS = require('../appconfig');
const UnathtorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');
// возвращаем информацию о пользователе
module.exports.getUsersMe = (async (req, res, next) => {
  try {
    const dataMe = await User.findById(req.user._id);
    res.send({
      data: {
        name: dataMe.name,
        email: dataMe.email,
      },
    }).status(200);
  } catch (e) {
    next(e);
  }
});

// создаем пользователя
module.exports.createUser = (async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hash,
    });
    return res.status(201).send({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    if (err.keyValue.email) {
      next(new ConflictError('Conflict'));
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(err.message));
    }
    return next(err);
  }
});


// авторизация
module.exports.login = (async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = await jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );
    res.cookie('jwt', token, JWT_COOKIE_OPTIONS);
    res.status(200).send({ token });
  } catch (err) {
    next(new UnathtorizedError(err.message));
  }
});
