const Appointment = require('../models/appointment');

// Контроллер для получения талонов конкретного врача
const getAppointmentsByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    // Находим все талоны для данного врача
    const appointments = await Appointment.find({ doctorId });

    // Фильтруем занятые талоны
    const availableAppointments = appointments.filter(
      (appointment) => appointment.status === 'свободен'
    );

    res.status(200).json({
      success: true,
      appointments: availableAppointments,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Получить талоны конкретного пациента
const getAppointmentsByPatient = async (req, res, next) => {
  const patientId = req.params.id;
  try {
    const appointments = await Appointment.find({ patientId: patientId, status: 'занят'});

    res.status(200).json({
      success: true,
      patientAppointments: appointments,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

//Освободить талон
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const patientId = req.params.id;
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId, patientId: patientId, status: "занят" },
      { status: "свободен" },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Талон не найден' });
    }
    res.status(200).json(updatedAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}

//Занять талон
const bookAppointment = async (req, res) => {
  try {
    const { patientId, appointmentId } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Талон не найден' });
    }

    if (appointment.status === 'занят') {
      return res.status(400).json({ message: 'Талон уже занят' });
    }

    appointment.patientId = patientId;
    appointment.status = 'занят';
    const updatedAppointment = await appointment.save();

    return res.status(200).json({ appointment: updatedAppointment });
  } catch (error) {
    return res.status(500).json({ message: 'Не удалось занять талон', error });
  }
};

module.exports = {getAppointmentsByDoctor, getAppointmentsByPatient, cancelAppointment, bookAppointment};