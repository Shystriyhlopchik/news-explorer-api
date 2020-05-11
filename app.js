const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const routes = require('./routes/index');
const { error } = require('./middlewares/error');
const { connectToMongoDB, PORT, rateLimiter } = require('./appconfig');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

connectToMongoDB(); // подключение к MongoDB

app.use(helmet());
app.use(requestLogger); // логгер запросов
app.use(cookieParser());

app.use(routes); // вызов роута

app.use(rateLimiter);
// обработка ошибок
app.use(errorLogger) // подключаем логгер ошибок
  .use(errors()) // обработчик ошибок celebrate
  .use(error);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
