// const router = require('express').Router();
const express = require('express');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const helmet = require('helmet');
// const { errors } = require('celebrate');

const routes = require('./routes/index');
// const auth = require('./middlewares/auth');
// const { PORT = 3000 } = process.env;
const { connectToMongoDB, PORT, limiter } = require('./appconfig');

const app = express();

connectToMongoDB(); // подключение к MongoDB
app.use(helmet());
app.use(cookieParser());
app.use(routes);
app.use(limiter);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
