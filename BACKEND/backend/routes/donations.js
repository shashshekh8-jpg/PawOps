const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.get('/metrics', verifyToken, async (req, res) => {
  try {
    res.json({
      monthlyTotal: "₹1.24L",
      corporateGrants: "₹85K",
      individualRecurring: "₹39K"
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve financial metrics' });
  }
});

module.exports = router;

