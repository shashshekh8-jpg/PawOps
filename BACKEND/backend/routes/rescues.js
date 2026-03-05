const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, async (req, res) => {
  const { species, breed, health, location, image_url } = req.body;
  const client = await req.pool.connect();
  
  try {
    await client.query('BEGIN'); // Start ACID Transaction [cite: 2, 3]

    // 1. Insert Animal Profile first to get the ID
    const animalResult = await client.query(
      'INSERT INTO animals (species, breed, health_status, rescue_location, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING animal_id',
      [species, breed, health, location, image_url]
    );
    const newAnimalId = animalResult.rows[0].animal_id;

    // 2. Log the Rescue event using the new ID
    const rescueResult = await client.query(
      'INSERT INTO rescues (animal_id, volunteer_id, rescue_location, notes) VALUES ($1, $2, $3, $4) RETURNING *',
      [newAnimalId, req.userId, location, "Operational Rescue Logged"]
    );

    await client.query('COMMIT');
    res.status(201).json(rescueResult.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK'); // Prevents orphaned records on failure [cite: 2, 3]
    res.status(500).json({ error: 'Transaction failed' });
  } finally {
    client.release();
  }
});

module.exports = router;

