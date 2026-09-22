import express from 'express';
import { getAllLaptops, createLaptop } from '../controllers/laptop.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', protect, getAllLaptops);
router.post('/', protect, adminOnly, upload.single('picture'), createLaptop);

export default router;