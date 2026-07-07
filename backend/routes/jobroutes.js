const express = require('express');
const Job = require('../models/Job');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const { title, description, budget, skills } = req.body;
    const job = await Job.create({
      title,
      description,
      budget,
      skills,
      postedBy: req.user.id,
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;