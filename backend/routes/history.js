const express = require('express');
const router = express.Router();
const ClaimHistory = require('../models/ClaimHistory');

// GET /history - return all claim history
router.get('/', async (req, res) => {
  try {
    const history = await ClaimHistory.find().populate('user').sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;