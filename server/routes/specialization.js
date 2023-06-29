const express = require('express');
const router = express.Router();

const { isAdmin } = require('../middleware/checkRole');
const { authenticate } = require('../middleware/passport-auth');
const specializationController = require('../controllers/specialty-controller');

// Получить все специализации
router.get('/api/specializations', specializationController.getAllSpecializations);

// Получить специализацию
router.get('/api/specializations/:id', specializationController.getSpecializationById);

// Создать новую специализацию
router.post('/api/specialization/add', authenticate, isAdmin, specializationController.createSpecialization);

// Обновить специализацию
router.put('/api/specializations/:id', authenticate, isAdmin, specializationController.updateSpecialization);

// Удалить специализацию
router.delete('/api/specializations/:id', authenticate, isAdmin, specializationController.deleteSpecialization);

module.exports = router;
