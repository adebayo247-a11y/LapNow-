import mongoose from 'mongoose';

const laptopSchema = new mongoose.Schema(
  {
    model: { type: String, required: true },
    amount: { type: Number, required: true },
    pictures: [{ type: String, required: true }], // Array of Cloudinary URLs
  },
  { timestamps: true }
);

const Laptop = mongoose.model('Laptop', laptopSchema);
export default Laptop;