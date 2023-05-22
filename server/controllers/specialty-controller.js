const Specialization = require('../models/specialization');

// Создание новой специализации
const createSpecialization = async (req, res) => {
  try {
    const specialization = await Specialization.create(req.body);
    await specialization.save();
    res.status(201).json(specialization);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Получение списка всех специализаций
const getAllSpecializations = async (req, res) => {
  try {
    const categories = await Specialization.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Получение информации о специализации
const getSpecializationById = async (req, res) => {
  try {
    const specialization = await Specialization.findById(req.params.id);
    if (!specialization) {
      return res.status(404).json({ message: 'Специализациия не найдена' });
    }
    res.status(200).json(specialization);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Обновление информации о специализации
const updateSpecialization = async (req, res) => {
  try {
    const specialization = await Specialization.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!specialization) {
      return res.status(404).json({ message: 'Специализациия не найдена' });
    }
    res.status(200).json(specialization);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Удаление специализации
const deleteSpecialization = async (req, res) => {
  try {
    const specialization = await Specialization.findByIdAndDelete(req.params.id);
    if (!specialization) {
      return res.status(404).json({ message: 'Специализациия не найдена' });
    }
    await Specialization.deleteOne({ specializationId: req.params.id });
    res.status(204).json(`Специализациия успешно удалена: ${specialization}`);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createSpecialization,
  getAllSpecializations,
  getSpecializationById,
  updateSpecialization,
  deleteSpecialization
};