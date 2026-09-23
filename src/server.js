import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';
import createAdmin from './config/seed.admin.js';

const PORT = process.env.PORT || 7000;

connectDB().then(async () => {
  // Seed the admin account programmatically
  await createAdmin();

  app.listen(PORT, () => {
    console.log(`LapNow server running on http://localhost:${PORT}`);
  });
});