const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// Existing Trends Route
router.get('/trends', verifyToken, async (req, res) => {
  const result = await req.pool.query("SELECT TO_CHAR(adoption_date, 'Mon') as name, COUNT(*) as adoptions FROM adoptions GROUP BY name");
  res.json(result.rows);
});

// Existing Predict Route
router.get('/predict/:id', verifyToken, async (req, res) => {
  const result = await req.pool.query('SELECT adoption_probability as probability FROM animals WHERE animal_id = $1', [req.params.id]);
  res.json(result.rows[0] || { probability: 0 });
});

// Summary metrics for the main Command Center
router.get('/summary', verifyToken, async (req, res) => {
  try {
    const animalsResult = await req.pool.query('SELECT COUNT(*) FROM animals');
    const adoptionsResult = await req.pool.query('SELECT COUNT(*) FROM adoptions');
    const volunteersResult = await req.pool.query('SELECT COUNT(*) FROM volunteers');
    const donationsResult = await req.pool.query(`
      SELECT COALESCE(SUM(amount) FILTER (WHERE donation_date >= date_trunc('month', CURRENT_DATE)), 0) as monthly_total 
      FROM donations
    `);
    
    const formatINR = (val) => {
      const num = Number(val);
      if (num === 0) return "₹0";
      if (num >= 100000) return `₹${(num / 100000).toFixed(2)}L`;
      if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
      return `₹${num}`;
    };

    res.json({
      animalsRescued: parseInt(animalsResult.rows[0].count),
      adoptionsCompleted: parseInt(adoptionsResult.rows[0].count),
      activeVolunteers: parseInt(volunteersResult.rows[0].count),
      monthlyDonations: formatINR(donationsResult.rows[0].monthly_total)
    });
  } catch (err) {
    console.error("Summary API Error:", err);
    res.status(500).json({ error: 'Failed to fetch summary metrics' });
  }
});

// NEW: Real Shelter Occupancy (Counts animals NOT adopted)
router.get('/occupancy', verifyToken, async (req, res) => {
  try {
    const result = await req.pool.query("SELECT COUNT(*) FROM animals WHERE adoption_status != 'Adopted'");
    res.json({ current: parseInt(result.rows[0].count), capacity: 200 }); // Assuming max capacity is 200
  } catch (err) { 
    res.status(500).json({ error: 'Failed to fetch occupancy' }); 
  }
});

// NEW: Real Breed Analytics (Calculates avg days from rescue to adoption)
router.get('/breeds', verifyToken, async (req, res) => {
  try {
    const result = await req.pool.query(`
      SELECT a.breed as name, 
             COALESCE(ROUND(AVG(EXTRACT(EPOCH FROM (ad.adoption_date - a.created_at))/86400)), 0) as days
      FROM animals a
      JOIN adoptions ad ON a.animal_id = ad.animal_id
      GROUP BY a.breed
      ORDER BY days ASC
      LIMIT 4
    `);
    res.json(result.rows);
  } catch (err) { 
    res.status(500).json({ error: 'Failed to fetch breed stats' }); 
  }
});

module.exports = router;
