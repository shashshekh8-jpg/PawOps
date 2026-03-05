const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.get('/funnel', verifyToken, async (req, res) => {
  try {
    // Serves the structured payload required by the dynamic Recharts funnel
    res.json([
      { stage: 'Campaign Reach', val: 1200, color: 'bg-blue-500', w: 'w-full' },
      { stage: 'Interested', val: 450, color: 'bg-teal', w: 'w-3/4' },
      { stage: 'Applications', val: 85, color: 'bg-accent', w: 'w-1/2' },
      { stage: 'Adoptions', val: 18, color: 'bg-coral', w: 'w-1/3' }
    ]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve campaign metrics' });
  }
});

module.exports = router;

