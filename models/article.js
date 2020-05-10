const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  title: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  text: {
    type: String,
    minlength: 2,
    require: true,
  },
  date: {
    type: Date,
    minlength: 2,
    require: true,
  },
  source: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  link: {
    type: String,
    require: true,
    validate: {
      validator(link) {
        return this.validator.isURL(link);
      },
    },
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator(img) {
        return this.validator.isURL(img);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
