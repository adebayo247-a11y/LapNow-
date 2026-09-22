import express from 'express';
import { getAllUsers, searchUserByEmail } from '../controllers/user.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/', getAllUsers);
router.get('/search', searchUserByEmail);

export default router;