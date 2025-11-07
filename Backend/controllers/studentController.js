const Student = require('../models/Student');
const Booking = require('../models/Booking');

const bookTomorrow = async (req, res) => {
  try {
    const { meals } = req.body; 
    const studentId = req.user._id;


    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);


    const existingBooking = await Booking.findOne({
      student: studentId,
      date: tomorrow
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'You have already booked meals for tomorrow' });
    }


    const student = await Student.findById(studentId);


    const mealsToBook = ['breakfast', 'lunch', 'snacks', 'dinner'];
    const tokensNeeded = {};
    const insufficientTokens = [];

    for (const meal of mealsToBook) {
      if (meals[meal]) {
        tokensNeeded[meal] = 1;
        if (student.tokens[meal] < 1) {
          insufficientTokens.push(meal);
        }
      }
    }

    if (insufficientTokens.length > 0) {
      return res.status(400).json({
        message: `Insufficient tokens for: ${insufficientTokens.join(', ')}`,
        insufficientTokens
      });
    }


    for (const meal of mealsToBook) {
      if (meals[meal]) {
        student.tokens[meal] -= 1;
      }
    }

    await student.save();

    const booking = await Booking.create({
      student: studentId,
      date: tomorrow,
      meals: meals
    });

    res.status(201).json({
      message: 'Meals booked successfully',
      booking,
      remainingTokens: student.tokens
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while booking meals' });
  }
};


const getMyTokens = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id);
    res.json({ tokens: student.tokens });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ student: req.user._id })
      .sort({ date: -1 })
      .limit(30);

    res.json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  bookTomorrow,
  getMyTokens,
  getMyBookings
};