const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');
const passport = require('./config/passport');
require('dotenv').config();
const { PORT } = process.env;

const app = express();

//подключение к БД
require('./config/database');

app.use(passport.initialize());
//Разбор тела в формате JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//позволяет делать http-запросы на наш сервер
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

//инициализация маршрутов
app.use(routes);

//обработка ошибок
app.use(function (error, req, res, next) {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

//Объявление порта, на котором будет работать приложение
const port = PORT || 5050;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
