const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
    select: false,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: (val) => validator.isEmail(val),
      message: 'Validation error email',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
