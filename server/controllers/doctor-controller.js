const Doctor = require('../models/doctor');
const User = require('../models/user');
const 
{   
    createAppointmentsForDoctor,
    deleteAppointmentsForDoctor,
    updateAppointmentsForDoctor
}
= require('../utils/appoinmentsFunc');

// Создание нового врача
const createDoctor = async (req, res) => {
  try {
    console.log(req.body);
    const { passportId } = req.body;
    // Проверяем, есть ли пользователь с таким passportId в базе данных
    const existingUser = await User.findOne({ passportId });
    if (existingUser) {
      return res.status(409).json({ message: 'Пользователь с такими данными уже существует' });
    }

    const doctor = await Doctor.create(req.body);
    const user = new User({
      passportId: req.body.passportId,
      password: req.body.password,
      userType: 'врач',
      doctorId: doctor._id
    });
    await user.save();
    await createAppointmentsForDoctor(appointmentsCollection, startDate, endDate, interval, doctor._id);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Получение списка всех врачей
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
    .populate('specialization', 'name')
    .populate('category', 'name');
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    res.status(500).json({ message: err.message });
  }
};

// Обновление информации о враче
const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) {
      return res.status(404).json({ message: 'Врач не найден' });
    }
    await updateAppointmentsForDoctor(appointmentsCollection, doctor._id, startDate, endDate, interval);
    res.status(200).json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Удаление врач
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Врач не найден' });
    }
    await User.deleteOne({ doctorId: req.params.id });
    await deleteAppointmentsForDoctor(appointmentsCollection, doctor._id);
    res.status(204).json(`Врач был успешно удалён: ${doctor}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
};