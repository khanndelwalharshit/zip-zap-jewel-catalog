import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';

// Import routes
import authRoutes from './routes/auth.routes';
import adminUserRoutes from './routes/admin-users.routes';
import categoryRoutes from './routes/categories.routes';
import productRoutes from './routes/products.routes';
import customerRoutes from './routes/customers.routes';
import catalogRoutes from './routes/catalogs.routes';
import inquiryRoutes from './routes/inquiries.routes';
import dashboardRoutes from './routes/dashboard.routes';

// Import middleware
import { errorHandler } from './middleware/error.middleware';
import { notFound } from './middleware/not-found.middleware';
import logger from './utils/logger';

const app = express();

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.trim())
    }
  }));
}

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
  });
});

// API routes
const apiVersion = process.env.API_VERSION || 'v1';
app.use(`/api/${apiVersion}/auth`, authRoutes);
app.use(`/api/${apiVersion}/admin-users`, adminUserRoutes);
app.use(`/api/${apiVersion}/categories`, categoryRoutes);
app.use(`/api/${apiVersion}/products`, productRoutes);
app.use(`/api/${apiVersion}/customers`, customerRoutes);
app.use(`/api/${apiVersion}/catalogs`, catalogRoutes);
app.use(`/api/${apiVersion}/inquiries`, inquiryRoutes);
app.use(`/api/${apiVersion}/dashboard`, dashboardRoutes);

// API documentation (Swagger) - only in development
if (process.env.NODE_ENV === 'development' && process.env.ENABLE_SWAGGER === 'true') {
  app.get('/api-docs', (req, res) => {
    res.json({
      message: 'ZipZag Catalog API Documentation',
      version: apiVersion,
      endpoints: {
        auth: `/api/${apiVersion}/auth`,
        adminUsers: `/api/${apiVersion}/admin-users`,
        categories: `/api/${apiVersion}/categories`,
        products: `/api/${apiVersion}/products`,
        customers: `/api/${apiVersion}/customers`,
        catalogs: `/api/${apiVersion}/catalogs`,
        inquiries: `/api/${apiVersion}/inquiries`,
        dashboard: `/api/${apiVersion}/dashboard`,
      },
      documentation: 'https://documenter.getpostman.com/view/your-collection-id'
    });
  });
}

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'ZipZag Catalog System API',
    version: apiVersion,
    status: 'Active',
    documentation: `/api-docs`,
    health: '/health',
  });
});

// 404 handler
app.use('*', notFound);

// Global error handler (must be last)
app.use(errorHandler);

export default app;