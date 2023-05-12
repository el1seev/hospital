const Category = require('../models/category');

// Создание новой категории
const createCategory = async (req, res) => {
  try {
    console.log(req.body)
    const category = await Category.create(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Получение списка всех категорий
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Получение информации о категории
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Обновление информации о категории
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Удаление категории
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }
    await Category.deleteOne({ categoryId: req.params.id });
    res.status(204).json(`Категория успешно удалена: ${category}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};