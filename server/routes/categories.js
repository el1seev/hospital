const express = require('express');
const router = express.Router();

const { isAdmin } = require('../middleware/checkRole');
const { authenticate } = require('../middleware/passport-auth');
const categoryController = require('../controllers/category-controller');

// Получить все категории
router.get('/api/categories', categoryController.getAllCategories);

// Получить категорию
router.get('/api/categories/:id', categoryController.getCategoryById);

// Создать новую категорию
router.post('/api/category/add', authenticate, isAdmin, categoryController.createCategory);

// Обновить категорию
router.put('/api/categories/:id', authenticate, isAdmin, categoryController.updateCategory);

// Удалить категорию
router.delete('/api/categories/:id', authenticate, isAdmin, categoryController.deleteCategory);

module.exports = router;
