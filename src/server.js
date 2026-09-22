import dotenv from 'dotenv';
dotenv.config();
import 'dotenv/config';

import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 7000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`LapNow server running on http://localhost:${PORT}`);
  });
});