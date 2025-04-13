const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
    enum: ['Accommodation', 'Restaurant', 'Spa & Wellness', 'Activities & Tours', 'Conference Facilities']
  },
  responses: [{
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);