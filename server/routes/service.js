const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service-controller');

// Получить все услуги
router.get('/api/services', serviceController.getAllServices);

// Получить услугу по id
router.get('/api/services/:id', serviceController.getServiceById);

// Создать новую услугу
router.post('/api/services', serviceController.createService);

// Обновить услугу по id
router.put('/api/services/:id', serviceController.updateService);

// Удалить услугу по id
router.delete('/api/services/:id', serviceController.deleteService);

module.exports = router;