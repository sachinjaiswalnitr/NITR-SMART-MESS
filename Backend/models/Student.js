const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  photoURL: {
    type : String
  },
  tokens: {
    breakfast: {
      type: Number,
      default: 15
    },
    lunch: {
      type: Number,
      default: 15
    },
    snacks: {
      type: Number,
      default: 15
    },
    dinner: {
      type: Number,
      default: 15
    }
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);