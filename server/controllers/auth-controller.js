const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Patient = require('../models/patient');
const bcrypt = require('bcrypt');

require('dotenv').config();
const { JWT_SECRET } = process.env;

// Контроллер для аутентификации пользователя
const login = async (req, res) => {
  try {
    console.log(req.body)

    if(req.body.passportId !== 'админ'){
      // Находим пользователя в базе данных по логину
      const patient = await Patient.findOne({ passportId: req.body.passportId });
      const user = await User.findOne({ patientId: patient._id })
                                                                          .populate('patientId', 'firstName secondName');
      // Если пользователь не найден или не верный пароль, возвращаем ошибку
      const comparePassword = bcrypt.compare(req.body.password, user.password);
      if (!user || !comparePassword) {
        return res.status(401).json({ message: 'Неверный логин или пароль' });
      }
      // Создаем JWT-токен
      const token = jwt.sign({ userId: user._id, firstName: user.patientId.firstName, secondName: user.patientId.secondName, userType: user.userType }, JWT_SECRET, {expiresIn: '14d'});
      // Отправляем токен клиенту
      res.status(200).json({ message: 'Аутентификация прошла успешно', token: token });
    } else {
      //проверка на админа
      const user = await User.findOne({userType: req.body.passportId});
      const comparePassword = bcrypt.compare(req.body.password, user.password);
      // Если пользователь не найден или не верный пароль, возвращаем ошибку
      if (!user || !comparePassword) {
        return res.status(401).json({ message: 'Неверный логин или пароль' });
      }
      const token = jwt.sign({ userId: user._id, userType: user.userType }, JWT_SECRET, {expiresIn: '6h'});
      res.status(200).json({ message: 'Аутентификация прошла успешно', token: token });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Контроллер для получения информации о текущем пользователе
const currentUser = async (req, res) => {
  try {
    // Отправляем информацию о текущем пользователе клиенту
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


module.exports = {login, currentUser};