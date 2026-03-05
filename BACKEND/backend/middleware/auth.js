const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers.cookie?.split('auth_token=')[1]?.split(';')[0];
  if (!token) token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(403).json({ error: 'Authentication required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid session' });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ error: 'Permission denied' });
    }
    next();
  };
};

module.exports = { verifyToken, restrictTo };

