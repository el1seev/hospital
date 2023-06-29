const Patient = require('../models/patient');
const User = require('../models/user');

// Создание нового пациента
const createPatient = async (req, res) => {
  try {
    const { passportId } = req.body;
    // Проверяем, есть ли пользователь с таким passportId в базе данных
    const existingUser = await Patient.findOne({ passportId });
    if (existingUser) {
      return res.status(409).json({ message: 'Пользователь с такими данными уже существует' });
    }

    const patient = await Patient.create(req.body);
    const user = new User({
      password: req.body.password,
      userType: 'пациент',
      patientId: patient._id,
    });
    await user.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Получение списка всех пациентов
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Получение информации о конкретном пациенте
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Пациент не найден' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Обновление информации о пациенте
const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    if (!patient) {
      return res.status(404).json({ message: 'Пациент не найден' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Удаление пациента
const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) {
      return res.status(404).json({ message: 'Пациент не найден' });
    }
    await User.deleteOne({ patientId: id });
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
