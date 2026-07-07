const express = require('express');
const Proposal = require('../models/Proposal');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const { jobId, bidAmount, coverLetter } = req.body;
    const proposal = await Proposal.create({
      job: jobId,
      freelancer: req.user.id,
      bidAmount,
      coverLetter,
    });
    res.status(201).json(proposal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/job/:jobId', protect, async (req, res) => {
  try {
    const proposals = await Proposal.find({ job: req.params.jobId }).populate('freelancer', 'name email');
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;