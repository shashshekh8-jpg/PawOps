const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, async (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json({ results: [] });

  try {
    const searchTerm = `%${q}%`;
    const animalSearch = await req.pool.query(
      "SELECT animal_id as id, name, species as subtext, 'Animal' as type FROM animals WHERE name ILIKE $1 OR species ILIKE $1 LIMIT 5",
      [searchTerm]
    );
    const volSearch = await req.pool.query(
      "SELECT volunteer_id as id, name, role as subtext, 'Volunteer' as type FROM volunteers WHERE name ILIKE $1 LIMIT 5",
      [searchTerm]
    );
    res.json({ results: [...animalSearch.rows, ...volSearch.rows] });
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;

