const checkExpiredAppointments = async (req, res, next) => {
  try {
    const expiredAppointments = await Appointment.deleteMany({ appointmentTime: { $lt: new Date() } });
    console.log(`Удалено ${expiredAppointments.deletedCount} истекших талонов`);
    next();
  } catch (err) {
    res.status(500).json({message: err});
  }
};

module.exports = checkExpiredAppointments;