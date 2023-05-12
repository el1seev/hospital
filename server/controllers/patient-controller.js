const Patient = require('../models/patient');
const User = require('../models/user');

// Создание нового пациента
const createPatient = async (req, res) => {
  try {
    console.log(req.body)
    const { passportId } = req.body;
    // Проверяем, есть ли пользователь с таким passportId в базе данных
    const existingUser = await User.findOne({ passportId });
    if (existingUser) {
      return res.status(409).json({ message: 'Пользователь с такими данными уже существует' });
    }

    const patient = await Patient.create(req.body);
    const user = new User({
      passportId: req.body.passportId,
      password: req.body.password,
      userType: 'пациент',
      patientId: patient._id
    });
    await user.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Получение списка всех пациентов
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    res.status(500).json({ message: err.message });
  }
};

// Обновление информации о пациенте
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) {
      return res.status(404).json({ message: 'Пациент не найден' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Удаление пациента
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Пациент не найден' });
    }
    await User.deleteOne({ patientId: req.params.id });
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
};