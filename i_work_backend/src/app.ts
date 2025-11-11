import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
export default app;