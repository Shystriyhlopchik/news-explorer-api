const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  source: {
    type: String,
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
        this.validator(img) {
          return this.validator.isURL(img);
        }
      }
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
    select: false,
  }
});
