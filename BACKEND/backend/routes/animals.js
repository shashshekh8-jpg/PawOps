const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, async (req, res) => {
  const result = await req.pool.query('SELECT * FROM animals ORDER BY created_at DESC');
  res.json(result.rows);
});
router.get('/:id', verifyToken, async (req, res) => {
  // JOIN animals table with rescues table to get the real internal operational notes
  const result = await req.pool.query(`
    SELECT a.*, r.notes as internal_notes 
    FROM animals a 
    LEFT JOIN rescues r ON a.animal_id = r.animal_id 
    WHERE a.animal_id = $1 
    ORDER BY r.created_at DESC LIMIT 1
  `, [req.params.id]);
  res.json(result.rows[0]);
});

router.post('/', verifyToken, async (req, res) => {
  const { name, species, breed, health_status, rescue_location, image_url } = req.body;
  const result = await req.pool.query(
    'INSERT INTO animals (name, species, breed, health_status, rescue_location, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, species, breed, health_status, rescue_location, image_url]
  );
  res.status(201).json(result.rows[0]);
});

module.exports = router;

