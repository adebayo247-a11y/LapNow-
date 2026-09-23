import User from '../models/user.js';

// GET /api/users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json({
      message: 'Registered users retrieved',
      count: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/users/search?email=user@mail.com (Admin only)
export const searchUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email query parameter is required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User found',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};