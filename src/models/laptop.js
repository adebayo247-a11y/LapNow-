import mongoose from 'mongoose';

const laptopSchema = new mongoose.Schema(
  {
    model: { type: String, required: true },
    amount: { type: Number, required: true },
    picture: { type: String, required: true },
  },
  { timestamps: true }
);

const Laptop = mongoose.model('Laptop', laptopSchema);
export default Laptop;