const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    minlength: 2,
    required: true,
  },
  title: {
    type: String,
    minlength: 2,
    required: true,
  },
  text: {
    type: String,
    minlength: 2,
    required: true,
  },
  date: {
    type: Date,
    minlength: 2,
    required: true,
  },
  source: {
    type: String,
    minlength: 2,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Validation error link',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Validation error image',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
