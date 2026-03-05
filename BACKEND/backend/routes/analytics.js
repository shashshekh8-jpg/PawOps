const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.get('/trends', verifyToken, async (req, res) => {
  const result = await req.pool.query("SELECT TO_CHAR(adoption_date, 'Mon') as name, COUNT(*) as adoptions FROM adoptions GROUP BY name");
  res.json(result.rows);
});

router.get('/predict/:id', verifyToken, async (req, res) => {
  const result = await req.pool.query('SELECT adoption_probability as probability FROM animals WHERE animal_id = $1', [req.params.id]);
  res.json(result.rows[0] || { probability: 0 });
});

module.exports = router;

