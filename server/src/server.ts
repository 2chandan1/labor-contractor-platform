import app from './app';
import dotenv from 'dotenv';
import connectDB from './config/database';
// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
});