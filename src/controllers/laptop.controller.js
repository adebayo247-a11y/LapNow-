import Laptop from '../models/laptop.js';
import { cloudinary } from '../config/cloudinary.js';

// GET /api/laptops
export const getAllLaptops = async (req, res) => {
  try {
    const laptops = await Laptop.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: 'Laptops retrieved successfully',
      count: laptops.length,
      data: laptops,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/laptops (Admin only: handles multiple images)
export const createLaptop = async (req, res) => {
  try {
    const { model, amount } = req.body;

    if (!model || !amount) {
      return res.status(400).json({ message: 'Model and amount are required' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one picture' });
    }

    
    const uploadPromises = req.files.map((file) => {
      const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      return cloudinary.uploader.upload(base64Image, {
        folder: 'lapnow_laptops',
      });
    });

    const uploadResults = await Promise.all(uploadPromises);
    const imageUrls = uploadResults.map((result) => result.secure_url);

    const laptop = await Laptop.create({
      model,
      amount,
      pictures: imageUrls,
    });

    return res.status(201).json({
      message: 'Laptop listed successfully with multiple images',
      data: laptop,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Upload failed', error: error.message });
  }
};