const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const signup = async (req, res) => {
  try {
    const { rollNo, password, name, messName, photoUrl } = req.body;
    const studentExists = await Student.findOne({ rollNo });
    if (studentExists) {
      return res
        .status(400)
        .json({ message: 'Student already exists with this roll number' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = await Student.create({
      rollNo,
      password: hashedPassword,
      name,
      messName,
      photoURL: photoUrl || '' 
    });

    if (student) {
      res.status(201).json({
        _id: student._id,
        rollNo: student.rollNo,
        name: student.name,
        messName: student.messName,
        photoURL: student.photoURL, 
        tokens: student.tokens,
        role: student.role,
        token: generateToken(student._id)
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

const login = async (req, res) => {
  try {
    const { rollNo, password } = req.body;

    const student = await Student.findOne({ rollNo });
    if (!student) {
      return res.status(401).json({ message: 'Invalid roll number or password' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid roll number or password' });
    }

    res.json({
      _id: student._id,
      rollNo: student.rollNo,
      name: student.name,
      messName: student.messName,
      photo: student.photo,
      tokens: student.tokens,
      role: student.role,
      token: generateToken(student._id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

const getMe = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).select('-password');
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signup,
  login,
  getMe
};