const mongoose = require('mongoose');
const moment = require('moment-timezone');

  // Создаем талоны для всех врачей
const createAppointmentsForAllDoctors = async() => {
  const db = mongoose.connection;

  const doctorsCollection = db.collection('doctors');
  const appointmentsCollection = db.collection('appointments');
  // Дата начала расписания первой смены
  const startTimeFirst = moment('09:00', 'HH:mm').tz('Europe/Moscow');
    // Дата конца расписания первой смены
  const endTimeFirst = moment('13:00', 'HH:mm').tz('Europe/Moscow');
  // Дата начала расписания второй смены
  const startTimeSecond = moment('13:00', 'HH:mm').tz('Europe/Moscow');
  // Дата конца расписания второй смены
  const endTimeSecond = moment('17:00', 'HH:mm').tz('Europe/Moscow');
  // Интервал между талонами
  const interval = moment.duration(45, 'minutes');
  
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysLeft = lastDayOfMonth.getDate() - today.getDate();
  //Выходные дни
  const excludedDates = ['01-01', '01-02', '01-07', '03-08', '04-25', '05-01', '05-09', '07-03', '11-07', '12-25'];

  const doctors = await doctorsCollection.find().toArray();
  const appointments = await appointmentsCollection.find().toArray();

  if (daysLeft === 10 || appointments.length === 0) {
    for (const doctor of doctors) {
      if( doctor.shift === '1-я'){
        await createAppointmentsForDoctor(doctor, appointmentsCollection, excludedDates, startTimeFirst, endTimeFirst, interval);
      } else {
        await createAppointmentsForDoctor(doctor, appointmentsCollection, excludedDates, startTimeSecond, endTimeSecond, interval);
      }
    }
  }
}

// Создаем талоны для врача
const createAppointmentsForDoctor = async (doctor, appointmentsCollection, excludedDates, startTime, endTime, interval) => {
  let current = moment().startOf('month');
  const daysInMonth = moment().daysInMonth();
  
  for (let i = 1; i <= daysInMonth; i++) {
    // Добавляем записи для каждого дня недели
    for (let j = 1; j <= 7; j++) {
      // Добавляем записи только для будних дней (с понедельника по пятницу)
      if (current.isoWeekday() >= 1 && current.isoWeekday() <= 5 && !excludedDates.includes(current.format('MM-DD'))){
        // Генерируем талоны каждые 45 минут с 9 утра до 13:00 или с 13:00 до 17:00, если вторая смена
        let timeSlot = moment(current).tz('Europe/Moscow').set('hour', startTime.hour()).set('minute', startTime.minute());
        while (timeSlot.isBefore(moment(current).set('hour', endTime.hour()).set('minute', endTime.minute()))) {
          const appointment = {
            dateTime: timeSlot.format('LLLL'),
            doctorId: doctor._id,
            status: "свободен"
          };
          await appointmentsCollection.insertOne(appointment);
          timeSlot.add(interval);
        }
      }
      current.add(1, 'day');
    }
  }
}

// Удаляем талоны для врача
const deleteAppointmentsForDoctor = async(appointmentsCollection, doctorId) => {
  await appointmentsCollection.deleteMany({ doctor: doctorId });
}

// Обновляем талоны для врача
const  updateAppointmentsForDoctor = async (appointmentsCollection, doctorId, startDate, endDate, interval) => {
  let current = moment(startDate);
  while (current.isBefore(endDate)) {
    const appointment = {
      dateTime: current.format('LLLL'),
      doctorId: doctorId,
      status: "свободен"
    };
    await appointmentsCollection.updateOne({ time: current.toDate().toUTCString(), doctor: doctorId }, { $set: appointment }, { upsert: true });
    current.add(interval);
  }
}

module.exports = {
  createAppointmentsForAllDoctors,
  createAppointmentsForDoctor,
  deleteAppointmentsForDoctor,
  updateAppointmentsForDoctor
}