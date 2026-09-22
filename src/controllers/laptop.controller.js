import Laptop from '../models/Laptop.js';
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

// POST /api/laptops (Admin only)
export const createLaptop = async (req, res) => {
  try {
    const { model, amount } = req.body;

    if (!model || !amount || !req.file) {
        return res.status(400).json({
            message: 'Model, amount, and picture are required'
        });
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: 'lapnow_laptops',
    });

    const laptop = await Laptop.create({
      model,
      amount,
      picture: uploadResult.secure_url,
    });

    return res.status(201).json({
      message: 'Laptop listed successfully',
      data: laptop,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Upload failed', error: error.message });
  }
};