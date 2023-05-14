const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Введите услугу']
  },
  image: {
    type: String,
    required: [true, 'Укажите ссылку на изображение']
  },
  description: {
    type: [{
      type: {
        type: String,
        required: [true, 'Укажите название услуги']
      },
      price: {
        type: Number,
        required: [true, 'Укажите цену услуги']
      }
    }],
    required: true
  }
},{ timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);