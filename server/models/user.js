const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Введите пароль']
  },
  userType: {
    type: String,
    enum: ['пациент', 'врач', 'админ'],
    required: true
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor'
  }
},{ timestamps: true });

UserSchema.pre('save', async function(next){
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function(password){
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = mongoose.model('User', UserSchema);