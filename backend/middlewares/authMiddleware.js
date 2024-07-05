import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const jwtKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token part from 'Bearer token'
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.user_id = decoded.user_id; // Attach `user_id` to the request object
    next();
  });
};

export default verifyToken;
