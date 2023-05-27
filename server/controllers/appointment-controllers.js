const Appointment = require('../models/appointment');
const User = require('../models/user');
const Patient = require('../models/patient');

// Контроллер для получения талонов конкретного врача
const getAppointmentsByDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    // Находим все талоны для данного врача
    const appointments = await Appointment
                                          .find({ doctorId: doctorId })
                                          .populate({
                                            path: 'doctorId',
                                            select: 'firstName secondName middleName',
                                            populate: {
                                              path: 'specializationId',
                                              select: 'name'
                                            },
                                            options: {
                                              strictPopulate: false 
                                            }
                                          });
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
const getAppointmentsByPatient = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    const appointments = await Appointment
                                          .find({ patientId: user.patientId })
                                          .populate({
                                            path: 'doctorId',
                                            select: 'firstName secondName middleName',
                                            populate: {
                                              path: 'specializationId',
                                              select: 'name'
                                            },
                                            options: {
                                              strictPopulate: false 
                                            }
                                          });

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
    const userId = req.params.id;
    const user = await User.findById(userId);
    const patientId = user.patientId;

    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId, patientId: patientId, status: "занят" },
      { $unset: { patientId: 1 } },
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
    const { passportId, appointmentId } = req.body;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Талон не найден' });
    }

    if (appointment.status === 'занят') {
      return res.status(400).json({ message: 'Талон уже занят' });
    }
    const patient = await Patient.findOne({passportId: passportId});
    const patientAppointments = await Appointment
                                                .find({ patientId: patient._id })
                                                .populate({
                                                  path: 'doctorId',
                                                  select: 'firstName secondName middleName',
                                                  populate: {
                                                    path: 'specializationId',
                                                    select: 'name'
                                                  },
                                                  options: {
                                                    strictPopulate: false 
                                                  }
                                                });
    const doctorAppointments = patientAppointments.filter(appointment => appointment.doctorId === appointment.doctorId);
    if (doctorAppointments.length > 0) {
      return res.status(400).json({ message: 'Пациент уже занял талон у данного врача' });
    }

    appointment.patientId = patient._id;
    appointment.status = 'занят';
    const updatedAppointment = await appointment.save();
    return res.status(200).json({ appointment: updatedAppointment });
  } catch (error) {
    return res.status(500).json({ message: 'Не удалось занять талон', error });
  }
};

module.exports = {getAppointmentsByDoctor, getAppointmentsByPatient, cancelAppointment, bookAppointment};