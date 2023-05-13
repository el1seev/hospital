const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');
const checkExpiredAppointments = require('./middleware/checkExpAppointments');
const passport = require('passport');
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
        origin: ['http://localhost:3000'],
        methods: '*',
        credentials: true,
    })
);
    
//инициализация маршрутов
app.use(routes);

//проверка истёкших талонов и их удаление
app.use(checkExpiredAppointments);

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
app.listen( port, 
    () => {console.log(`Server is running on ${port}`)}
);

