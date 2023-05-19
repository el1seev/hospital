const jwt = require('jsonwebtoken');

const User = require('../models/user');
const bcrypt = require('bcrypt');

require('dotenv').config();
const { JWT_SECRET } = process.env;

// Контроллер для аутентификации пользователя
const login = async (req, res) => {
  try {
    console.log(req.body)
    // Находим пользователя в базе данных по логину
    const user = await User.findOne({ passportId: req.body.passportId })
                                                                        .populate('patientId', 'firstName secondName');
    // Если пользователь не найден, возвращаем ошибку
    const comparePassword = bcrypt.compare(req.body.password, user.password);
    if (!user || !comparePassword) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    // Создаем JWT-токен
    const token = jwt.sign({ userId: user._id, firstName: user.patientId.firstName, secondName: user.patientId.secondName, userType: user.userType }, JWT_SECRET, {expiresIn: '30min'});

    // Отправляем токен клиенту
    res.status(200).json({ message: 'Аутентификация прошла успешно', token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Контроллер для получения информации о текущем пользователе
const currentUser = async (req, res) => {
  try {
    // Отправляем информацию о текущем пользователе клиенту
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {login, currentUser};