const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.get('/funnel', verifyToken, async (req, res) => {
  try {
    // Dynamically aggregates all campaign data to build the live funnel
    const result = await req.pool.query(`
      SELECT 
        SUM(reach) as total_reach,
        SUM(interested) as total_interested,
        SUM(applications) as total_applications,
        SUM(adoptions_driven) as total_adoptions
      FROM campaigns
    `);
    
    const metrics = result.rows[0];
    
    // Fallback to 0 if the table is empty to prevent NaN errors in the UI
    res.json([
      { stage: 'Campaign Reach', val: parseInt(metrics.total_reach || 0), color: 'bg-blue-500', w: 'w-full' },
      { stage: 'Interested', val: parseInt(metrics.total_interested || 0), color: 'bg-teal', w: 'w-3/4' },
      { stage: 'Applications', val: parseInt(metrics.total_applications || 0), color: 'bg-accent', w: 'w-1/2' },
      { stage: 'Adoptions', val: parseInt(metrics.total_adoptions || 0), color: 'bg-coral', w: 'w-1/3' }
    ]);
  } catch (err) {
    console.error("Campaign API Error:", err);
    res.status(500).json({ error: 'Failed to retrieve campaign metrics' });
  }
});

// NEW: Get the top performing marketing drive safely
router.get('/top', verifyToken, async (req, res) => {
  try {
    const result = await req.pool.query(`
      SELECT 
        name, 
        adoptions_driven, 
        (CAST(COALESCE(end_date, CURRENT_DATE) AS DATE) - CAST(start_date AS DATE)) as duration_days 
      FROM campaigns 
      ORDER BY adoptions_driven DESC 
      LIMIT 1
    `);
    
    res.json(result.rows[0] || { name: "No Data", adoptions_driven: 0, duration_days: 0 });
  } catch(err) { 
    // This forces the backend to confess what went wrong in your terminal
    console.error("🚨 CRASH IN /campaigns/top ROUTE:", err); 
    res.status(500).json({error: "Failed"}); 
  }
});

module.exports = router;
