const mongoose = require('mongoose');

const SpecializationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Введите специализацию'],
      unique: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Specialization', SpecializationSchema);
