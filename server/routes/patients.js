const express = require('express');
const router = express.Router();

const { isAdmin, isPatient } = require('../middleware/checkRole');
const { authenticate } = require('../middleware/passport-auth');
const patientController = require('../controllers/patient-controller');

// Получить список всех пациентов
router.get('/api/patients', authenticate, isAdmin, patientController.getAllPatients);

// Получить информацию о конкретном пациенте
router.get('/api/patients/:id', authenticate, isPatient, patientController.getPatientById);

// Создать нового пациента
router.post('/api/patients/add', authenticate, isAdmin, patientController.createPatient);

// Обновить информацию о пациенте
router.put('/api/patients/:id', authenticate, isAdmin, patientController.updatePatient);

// Удалить пациента
router.delete('/api/patients/:id', authenticate, isAdmin, patientController.deletePatient);

module.exports = router;