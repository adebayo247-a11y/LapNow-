import express from 'express';
import { getAllLaptops, createLaptop } from '../controllers/laptop.controller.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', protect, getAllLaptops);

// upload.array('pictures', 5) accepts up to 5 image files under the field name "pictures"
router.post('/', protect, adminOnly, upload.array('pictures', 5), createLaptop);

export default router;