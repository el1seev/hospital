const mongoose = require('mongoose');
const validateName = require('../helpers/validateName');
const validateBirth = require('../helpers/validateBirth');

const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Введите имя'],
    validate: {
      validator: validateName,
      message: 'Некорректные данные'
    }
  },
  secondName: {
    type: String,
    required: [true, 'Введите фамилию'],
    validate: {
      validator: validateName,
      message: 'Некорректные данные'
    }
  },
  middleName: {
    type: String,
    validate: {
      validator: validateName,
      message: 'Некорректные данные'
    }
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Введите дату рождения в формате 28-10-2010'],
    validate: {
      validator: validateBirth,
      message: 'Некорректная дата'
    }
  },
  specialization: {
    type: Schema.Types.ObjectId,
    ref: 'Specialization',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  shift: {
    type: String,
    enum: ['1-я','2-я'],
    required: [true, "Введите смену"]
  }
}, { timestamps: true });


module.exports = mongoose.model('Doctor', DoctorSchema);