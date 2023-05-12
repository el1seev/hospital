const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointment-controllers');

// Получить все талоны врача
router.get('/api/appointments/:id', appointmentController.getAppointmentsByDoctor);

// Получить талоны конкретного пользователя
router.get('/api/myappointments/:id', appointmentController.getAppointmentsByPatient);

// Отмена талона пациентом
router.put('/api/myappointments/cancel/:id', appointmentController.cancelAppointment);

// Занятие талона пациентом
router.put('/api/appointments/book', appointmentController.bookAppointment);

module.exports = router;
