const mongoose = require('mongoose');
const { createAppointmentsForAllDoctors } = require('../utils/appoinmentsFunc');

require('dotenv').config();
const { MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database is connected succesfuly:', MONGO_URL))
  .then(async () => {
    await createAppointmentsForAllDoctors();
  })
  .catch((error) => console.log(error));
