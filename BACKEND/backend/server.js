require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');

const app = express();

// Set to 3 to handle Render/Vercel proxy depth correctly [cite: 2, 3]
app.set('trust proxy', 3); 

app.use(helmet());
app.use(cors({ 
  origin: process.env.FRONTEND_URL, 
  credentials: true // Mandated for HttpOnly cookie sharing [cite: 2, 3]
}));
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Request limit reached. Operational safety protocol active.' }
});
app.use('/api/', apiLimiter);

// Fixed SSL pooling conflict by relying on constructor object [cite: 2, 3]
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: { rejectUnauthorized: false }
});

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Operational Routes - Includes previously missing controllers [cite: 2, 3]
app.use('/api/auth', require('./routes/auth'));
app.use('/api/animals', require('./routes/animals'));
app.use('/api/rescues', require('./routes/rescues'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/search', require('./routes/search'));
app.use('/api/volunteers', require('./routes/volunteers'));
app.use('/api/campaigns', require('./routes/campaigns'));
app.use('/api/donations', require('./routes/donations'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Intelligence Server online on port ${PORT}`));

