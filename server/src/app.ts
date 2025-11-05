import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Labor-Contractor Platform API is running',
    timestamp: new Date().toISOString()
  });
});

// API health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'API is healthy',
    uptime: process.uptime()
  });
});

export default app;