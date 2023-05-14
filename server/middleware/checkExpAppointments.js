const moment = require('moment-timezone');
const Appointment = require('../models/appointment');

const checkExpiredAppointments = async (req, res, next) => {
  try {
    console.log('tut')
    const currentDate = moment().tz('Europe/Moscow');
    const appointments = await Appointment.find();
    let expiredAppointments = [];
    appointments.forEach((appointment) => {
      const appointmentDate = moment(appointment.dateTime);
      const isAppointmentExpired = appointmentDate.isBefore(currentDate);
      const isWeekend = moment(appointment.dateTime).isoWeekday() === 6 || moment(appointment.dateTime).isoWeekday() === 7;
      const isHoliday = moment(appointment.dateTime).isSame('2023-01-01', 'day')
                        || moment(appointment.dateTime).isSame('2023-01-02', 'day')
                        || moment(appointment.dateTime).isSame('2023-03-08', 'day')
                        || moment(appointment.dateTime).isSame('2023-04-25', 'day')
                        || moment(appointment.dateTime).isSame('2023-05-01', 'day')
                        || moment(appointment.dateTime).isSame('2023-05-09', 'day')
                        || moment(appointment.dateTime).isSame('2023-07-03', 'day')
                        || moment(appointment.dateTime).isSame('2023-11-07', 'day')
                        || moment(appointment.dateTime).isSame('2023-12-25', 'day');
      if (isAppointmentExpired || isWeekend || isHoliday) {
        expiredAppointments.push(appointment._id);
      }
    });
    const result = await Appointment.deleteMany({ _id: { $in: expiredAppointments } });
   
    console.log(`Удалено ${expiredAppointments.deletedCount} истекших талонов`);
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = checkExpiredAppointments;