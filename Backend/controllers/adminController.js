const Booking = require('../models/Booking');
const getMealList = async (req, res) => {
  try {
    const { meal } = req.query;
    if (!meal || !['breakfast', 'lunch', 'snacks', 'dinner'].includes(meal)) {
      return res.status(400).json({ message: 'Invalid meal type' });
    }
    const now = new Date();
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const yesterdayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1));
    const tomorrowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    const bookingsToday = await Booking.find({
      [`meals.${meal}`]: true,
      [`verified.${meal}`]: false,
      date: { $gte: todayUTC, $lt: tomorrowUTC }
    }).populate("student", "name rollNo photoURL");

    const bookingsYesterday = await Booking.find({
      [`meals.${meal}`]: true,
      [`verified.${meal}`]: false,
      date: { $gte: yesterdayUTC, $lt: todayUTC }
    }).populate("student", "name rollNo photoURL");

    const data = {
      today: {
        date: todayUTC,
        count: bookingsToday.length,
        students: bookingsToday.map(b => ({
          bookingId: b._id,
          name: b.student.name,
          rollNo: b.student.rollNo,
          photoURL: b.student.photoURL
        }))
      },
      yesterday: {
        date: yesterdayUTC,
        count: bookingsYesterday.length,
        students: bookingsYesterday.map(b => ({
          bookingId: b._id,
          name: b.student.name,
          rollNo: b.student.rollNo,
          photoURL: b.student.photoURL
        }))
      }
    };

    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getMealList:", error);
    res.status(500).json({ message: 'Server error' });
  }
};


const verifyMeal = async (req, res) => {
  try {
    const { bookingId, meal } = req.body;

    if (!bookingId || !meal) {
      return res.status(400).json({ message: 'Booking ID and meal type are required' });
    }

    if (!['breakfast', 'lunch', 'snacks', 'dinner'].includes(meal)) {
      return res.status(400).json({ message: 'Invalid meal type' });
    }

    const booking = await Booking.findById(bookingId).populate('student', 'rollNo name', );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (!booking.meals[meal]) {
      return res.status(400).json({ message: 'This meal was not booked' });
    }

    if (booking.verified[meal]) {
      return res.status(400).json({ message: 'This meal has already been verified' });
    }

    booking.verified[meal] = true;
    await booking.save();

    res.json({
      message: `Meal '${meal}' verified successfully for ${booking.student.name}, (${booking.student.rollNo})`,
      booking
    });

  } catch (error) {
    console.error('Error in verifyMeal:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getMealList, verifyMeal };