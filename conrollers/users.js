const jwt = require('jsonwebtoken');
const User = require('../models/user');


const { JWT_SECRET } = require('../appconfig');

// возвращает всех пользователей из БД
module.exports.getUsers = (async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (e) {
    res.send(e);
  }
});

module.exports.createUser = (async (req, res) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const user = await User.create({
      name, email, password,
    });
    res.status(201).send({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    require.dend(e);
  }
});

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
