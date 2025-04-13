const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback({
      service: req.body.service,
      responses: req.body.responses
    });
    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;