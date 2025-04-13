const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking({
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      guests: req.body.guests,
      roomType: req.body.roomType
    });
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check room availability
router.post('/check-availability', async (req, res) => {
  try {
    const { checkIn, checkOut, roomType } = req.body;
    const conflictingBookings = await Booking.find({
      roomType,
      status: { $ne: 'cancelled' },
      $or: [
        { checkIn: { $lte: checkOut }, checkOut: { $gte: checkIn } }
      ]
    });
    res.json({ available: conflictingBookings.length === 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;