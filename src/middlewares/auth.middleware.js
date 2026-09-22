import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
          message: 'Access denied. No token provided'
      });
  }

  try {
      const token = authHeader.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'super_secret_fallback_key';
      const decoded = jwt.verify(token, secret, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
        return res.status(401).json({
            message: 'User not found'
        });
    }

    next();
  } catch (error) {
      return res.status(401).json({
          message: 'Invalid or expired token'
      });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
    return res.status(403).json({
        message: 'Forbidden: Admin access only'
    });
};