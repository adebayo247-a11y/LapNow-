import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

const createAdmin = async () => {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@lapnow.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'abayomi123';

    let admin = await User.findOne({ email: adminEmail });

    if (admin) {
      // If admin exists, reset password to guarantee it works!
      admin.password = adminPassword;
      await admin.save(); // triggers userSchema.pre('save') to hash it cleanly once
      console.log('Admin password updated and verified successfully');
      return;
    }

    // If admin does not exist, create fresh
    await User.create({
      firstName: process.env.ADMIN_FIRSTNAME || 'Abayomi',
      lastName: process.env.ADMIN_LASTNAME || 'Adenle',
      phoneNumber: process.env.ADMIN_PHONE || '08099999999',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });

    console.log('Admin account created successfully');
  } catch (error) {
    console.error('Error in seedAdmin:', error.message);
  }
};

export default createAdmin;