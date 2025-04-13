const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1
  },
  roomType: {
    type: String,
    required: true,
    enum: ['standard', 'deluxe', 'suite', 'villa']
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);