const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointment-controllers');
const checkExpiredAppointments = require('../middleware/checkExpAppointments');
const { authenticate } = require('../middleware/passport-auth');
const { isPatient } = require('../middleware/checkRole');

// Получить все талоны врача
router.get('/api/appointments/:id', checkExpiredAppointments, appointmentController.getAppointmentsByDoctor);

// Получить талоны конкретного пользователя
router.get(
  '/api/myappointments/:id',
  checkExpiredAppointments,
  authenticate,
  isPatient,
  appointmentController.getAppointmentsByPatient,
);

// Отмена талона пациентом
router.put('/api/myappointments/cancel/:id', authenticate, isPatient, appointmentController.cancelAppointment);

// Занятие талона пациентом
router.put('/api/appointments/book', appointmentController.bookAppointment);

module.exports = router;
