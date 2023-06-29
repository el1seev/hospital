const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service-controller');

const { isAdmin } = require('../middleware/checkRole');
const { authenticate } = require('../middleware/passport-auth');

// Получить все услуги
router.get('/api/services', serviceController.getAllServices);

// Получить услугу по id
router.get('/api/services/:id', serviceController.getServiceById);

// Создать новую услугу
router.post('/api/service/add', authenticate, isAdmin, serviceController.createService);

// ОДобавление в описание услуги по id
router.put('/api/service/description/:id', authenticate, isAdmin, serviceController.addServiceDescription);

// Обновить услугу по id
router.put('/api/services/:id', authenticate, isAdmin, serviceController.updateService);

// Обновить описание услуги по id
router.put('/api/services/description/:id', authenticate, isAdmin, serviceController.updateServiceDescription);

// Удалить услугу по id
router.delete('/api/services/:id', authenticate, isAdmin, serviceController.deleteService);

module.exports = router;
