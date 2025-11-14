import express, { Application } from 'express';
import cors from 'cors';
import path from 'path'
import userRoutes from './routes/user.routes';
import userRouter from './routes/auth.router';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use('/api/users', userRoutes);
app.use('/api/auth',userRouter);
export default app;