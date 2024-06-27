
const jwt = require('jsonwebtoken');
// const user = require('../models/user');

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token does not exist
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};