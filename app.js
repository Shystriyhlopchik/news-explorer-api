// const router = require('express').Router();
const express = require('express');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const helmet = require('helmet');
// const { errors } = require('celebrate');

const routes = require('./routes/index');
// const auth = require('./middlewares/auth');
// const { PORT = 3000 } = process.env;
const { connectToMongoDB, PORT } = require('./appconfig');

const app = express();

connectToMongoDB(); // подключение к MongoDB
app.use(cookieParser());
app.use(routes);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
//  app.use('/app', appRouter);
