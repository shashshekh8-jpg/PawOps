const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await req.pool.query('SELECT * FROM volunteers WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.volunteer_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    // Fixed SameSite and Secure settings for cross-domain auth [cite: 2, 3]
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: true, 
      sameSite: 'none', 
      maxAge: 86400000 
    });

    res.json({ user: { name: user.name, role: user.role } });
  } catch (err) {
    console.error("🚨 CRITICAL LOGIN CRASH:", err);
    res.status(500).json({ error: 'Auth fault' });
  }
});

module.exports = router;

