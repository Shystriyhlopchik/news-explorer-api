const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const routes = require('./routes/index');
const { connectToMongoDB, PORT, limiter } = require('./appconfig');
const { requestLogger } = require('./middlewares/logger');

const app = express();

connectToMongoDB(); // подключение к MongoDB
app.use(helmet());
app.use(requestLogger); // логгер запросов
app.use(cookieParser());
app.use(routes);
app.use(limiter);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
