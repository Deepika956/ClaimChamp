const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');
const path = require('path');

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Creating a new user with image
router.post('/users', upload.single('photo'), async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Photo is required' });
    }

    const newUser = new User({
      name,
      age: Number(age),
      photo: req.file.path
    });

    await newUser.save();
    res.status(201).json({ message: 'User created', user: newUser });
  } catch (err) {
    console.error('Error creating user:\n', err);
    res.status(500).json({ error: err.message });
  }
});

// Leaderboard user data fetching
router.get('/users/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error('❌ Error fetching leaderboard:', err);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

//Claim random points for a user and save to history
router.post('/users/:id/claim', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const randomPoints = Math.floor(Math.random() * 10) + 1;
    user.totalPoints += randomPoints;
    await user.save();

    // Save to history
    const claim = new ClaimHistory({
      user: user._id,
      points: randomPoints
    });
    await claim.save();

    res.json({ message: 'Points claimed', points: randomPoints, user });
  } catch (err) {
    console.error('Error in claiming:', err);
    res.status(500).json({ error: 'Failed to claim points' });
  }
});

// get claim history
router.get('/history', async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .populate('user') // get user details
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
