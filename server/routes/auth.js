const express = require('express');
const router = express.Router();
const { login, currentUser } = require('../controllers/auth-controller');
const { isPatient } = require('../middleware/checkRole');
const { authenticate } = require('../middleware/passport-auth');

// Маршрут для аутентификации пользователя
router.post('/api/login', login);

// Маршрут для получения информации о текущем пользователе
router.get('/appointments/me', authenticate, isPatient, currentUser);

module.exports = router;