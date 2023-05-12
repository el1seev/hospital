const express = require('express');
const router = express.Router();

const { isAdmin } = require('../middleware/checkRole');
const { authenticate } = require('../middleware/passport-auth');
const doctorController = require('../controllers/doctor-controller');

// Получить список всех докторов
router.get('/api/doctors', doctorController.getAllDoctors);

// Получить информацию о конкретном докторе
router.get('/api/doctors/:id', doctorController.getDoctorById);

// Создать нового доктора
router.post('/api/doctors/add', authenticate, isAdmin, doctorController.createDoctor);

// Обновить информацию о докторе
router.put('/api/doctors/:id', authenticate, isAdmin, doctorController.updateDoctor);

// Удалить доктора
router.delete('/api/doctors/:id', authenticate, isAdmin, doctorController.deleteDoctor);

module.exports = router;
