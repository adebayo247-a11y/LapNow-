import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import laptopRoutes from './routes/laptop.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/laptops', laptopRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: 'routes not found'
    });
});

export default app;