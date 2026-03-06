const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.get('/metrics', verifyToken, async (req, res) => {
  try {
    // Dynamically calculate actual INR totals from the donations table
    const result = await req.pool.query(`
      SELECT 
        COALESCE(SUM(amount) FILTER (WHERE donation_date >= date_trunc('month', CURRENT_DATE)), 0) as monthly_total,
        COALESCE(SUM(amount) FILTER (WHERE donor_type = 'Corporate'), 0) as corporate_total,
        COALESCE(SUM(amount) FILTER (WHERE is_recurring = TRUE AND donor_type = 'Individual'), 0) as recurring_total
      FROM donations
    `);
    
    const data = result.rows[0];

    // Helper to format large INR numbers nicely for the dashboard (e.g., 1.5L, 85K)
    const formatINR = (val) => {
      const num = Number(val);
      if (num === 0) return "₹0";
      if (num >= 100000) return `₹${(num / 100000).toFixed(2)}L`;
      if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
      return `₹${num}`;
    };

    res.json({
      monthlyTotal: formatINR(data.monthly_total),
      corporateGrants: formatINR(data.corporate_total),
      individualRecurring: formatINR(data.recurring_total)
    });
  } catch (err) {
    console.error("Donations API Error:", err);
    res.status(500).json({ error: 'Failed to retrieve financial metrics' });
  }
});

module.exports = router;
