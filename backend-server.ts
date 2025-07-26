import dotenv from 'dotenv';
import app from './app';
import { PrismaClient } from '@prisma/client';
import logger from './utils/logger';

// Load environment variables
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

// Graceful shutdown handler
const gracefulShutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  
  try {
    // Close database connection
    await prisma.$disconnect();
    logger.info('Database connection closed');
    
    // Close server
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown:', error);
    process.exit(1);
  }
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('Database connected successfully');
    
    // Start HTTP server
    app.listen(PORT, () => {
      logger.info(`🚀 ZipZag Catalog API Server running on port ${PORT}`);
      logger.info(`📝 Environment: ${process.env.NODE_ENV}`);
      logger.info(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
      
      if (process.env.ENABLE_SWAGGER === 'true') {
        logger.info(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
      }
    });
    
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the application
startServer();