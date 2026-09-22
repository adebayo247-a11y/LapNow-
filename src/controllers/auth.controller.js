import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const createToken = (id) => {
  const secret = process.env.JWT_SECRET || 'super_secret_fallback_key';
  return jwt.sign({ id }, secret, { expiresIn: '7d' });
};

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, password, role } = req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await User.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      role: role || 'user',
    });

    return res.status(201).json({
      message: 'User registered successfully',
      token: createToken(user._id),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({
      message: 'Login successful',
      token: createToken(user._id),
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};