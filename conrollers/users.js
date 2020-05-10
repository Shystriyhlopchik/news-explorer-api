const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const { JWT_SECRET } = require('../appconfig');

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
module.exports.createUser = (async (req, res) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hash,
    });
    res.status(201).send({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    res.send(e);
  }
});


// авторизация
module.exports.login = (async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = await jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );
    res.cookie('jwt', token, JWT_SECRET)
      .cookie({
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: true,
      });
    res.status(200).send({ token });
  } catch (err) {
    res.send(err);
    // next(new UnathtorizedError(err.message));
  }
});
