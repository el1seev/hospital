const express = require('express');
const router = express.Router();

const patientsRoutes = require('./patients');
const doctorsRoutes = require('./doctors');
const categoryRoutes = require('./categories');
const specializationRoutes = require('./specialization');
const appointmentRoutes = require('./appointments');
const authRoute = require('./auth');
const serviceRoutes = require('./service');

router.use(patientsRoutes);
router.use(doctorsRoutes);
router.use(categoryRoutes);
router.use(specializationRoutes);
router.use(appointmentRoutes);
router.use(authRoute);
router.use(serviceRoutes);

module.exports = router;
