const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await req.pool.query(
      "SELECT volunteer_id as id, name, role, rescues_handled as rescues FROM volunteers ORDER BY rescues_handled DESC"
    );
    const volunteers = result.rows.map(v => ({
      ...v,
      impactScore: Math.round((v.rescues * 0.7) + 15) // Dynamic impact calculation
    }));
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch roster' });
  }
});

module.exports = router;

