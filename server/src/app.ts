import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { User } from './models';

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

// Test database connection
app.get('/api/test-db', async (req: Request, res: Response) => {
  try {
    const count = await User.countDocuments();
    res.json({
      success: true,
      message: 'Database connection successful',
      userCount: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default app;