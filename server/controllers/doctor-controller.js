const Doctor = require('../models/doctor');
const User = require('../models/user');
const Appointment = require('../models/appointment');

// Создание нового врача
const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    const user = new User({
      password: req.body.password,
      userType: 'врач',
      doctorId: doctor._id,
    });
    await user.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Получение списка всех врачей
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('specializationId', 'name').populate('categoryId', 'name');
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Получение информации о конкретном враче
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Врач не найден' });
    }
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Обновление информации о враче
const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
    if (!doctor) {
      return res.status(404).json({ message: 'Врач не найден' });
    }
    res.status(200).json({ success: true, message: `Данные ${doctor._id} были успешно обновлены` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Удаление врач
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndDelete(id);
    await Appointment.deleteMany({ doctor: id });
    if (!doctor) {
      return res.status(404).json({ message: 'Врач не найден' });
    }
    await User.deleteOne({ doctorId: req.params.id });
    res.status(204).json(`Врач был успешно удалён: ${doctor}`);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
