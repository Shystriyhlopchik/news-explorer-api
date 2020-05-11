require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');

const { error } = require('./middlewares/error');
const routes = require('./routes/index');
const { connectToMongoDB, PORT, rateLimiter } = require('./appconfig');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

connectToMongoDB(); // подключение к MongoDB

app.use(helmet());

// инициализация middlewares
app.use(requestLogger); // логгер запросов
app.use(cookieParser());
app.use(rateLimiter);

// вызов роута
app.use(routes);


// обработка ошибок
app.use(errorLogger) // подключаем логгер ошибок
  .use(errors()) // обработчик ошибок celebrate
  .use(error);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
