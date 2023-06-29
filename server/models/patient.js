const mongoose = require('mongoose');
const validatePassport = require('../helpers/validatePassport');
const validateName = require('../helpers/validateName');
const validateBirth = require('../helpers/validateBirth');
const validatePhoneNumber = require('../helpers/validatePhone');

const Schema = mongoose.Schema;

const PatientSchema = new Schema(
  {
    passportId: {
      type: String,
      required: [true, 'Введите номер паспорта'],
      validate: {
        validator: validatePassport,
        message: 'Некорректный номер паспорта',
      },
      unique: true,
    },
    gender: {
      type: String,
      enum: ['М', 'Ж'],
      required: [true, 'Введите пол'],
      default: 'М',
    },
    firstName: {
      type: String,
      required: [true, 'Введите имя'],
      validate: {
        validator: validateName,
        message: 'Некорректные данные',
      },
    },
    secondName: {
      type: String,
      required: [true, 'Введите фамилию'],
      validate: {
        validator: validateName,
        message: 'Некорректные данные',
      },
    },
    middleName: {
      type: String,
      validate: {
        validator: validateName,
        message: 'Некорректные данные',
      },
    },
    dateOfBirth: {
      type: String,
      validate: {
        validator: validateBirth,
        message: 'Некорректная дата',
      },
    },
    address: {
      type: String,
      required: [true, 'Введите адресс: улица, дом, кв'],
    },
    phone: {
      type: String,
      unique: true,
      validate: {
        validator: validatePhoneNumber,
        message: 'Некорректный номер телефона',
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Patient', PatientSchema);
