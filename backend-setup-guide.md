# ZipZag Catalog Backend - Complete Setup Guide

## 🚀 Quick Start Instructions

### 1. Initialize the Backend Project

```bash
# Create backend directory
mkdir zipzag-backend
cd zipzag-backend

# Initialize npm project
npm init -y

# Copy the package.json content from backend-package.json
# Copy the .env configuration from backend-env-example to .env
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# Install development dependencies
npm install --save-dev
```

### 3. Setup Database

```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE zipzag_catalog_db;
CREATE USER zipzag_user WITH PASSWORD 'zipzag_password';
GRANT ALL PRIVILEGES ON DATABASE zipzag_catalog_db TO zipzag_user;
\q

# Initialize Prisma
npx prisma init
```

### 4. Configure Environment Variables

Create `.env` file with the content from `backend-env-example` and update:

```env
DATABASE_URL=postgresql://zipzag_user:zipzag_password@localhost:5432/zipzag_catalog_db
JWT_SECRET=your-32-char-secret-key-here
JWT_REFRESH_SECRET=your-32-char-refresh-secret-here
```

### 5. Generate Prisma Client and Run Migrations

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database with initial data
npm run db:seed
```

### 6. Start Development Server

```bash
# Start in development mode
npm run dev

# The server will start at http://localhost:3000
```

---

## 📁 Complete File Structure to Create

```
zipzag-backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   ├── aws.ts
│   │   └── env.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── admin-users.controller.ts
│   │   ├── categories.controller.ts
│   │   ├── products.controller.ts
│   │   ├── customers.controller.ts
│   │   ├── catalogs.controller.ts
│   │   ├── inquiries.controller.ts
│   │   └── dashboard.controller.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── upload.middleware.ts
│   │   ├── not-found.middleware.ts
│   │   └── rate-limit.middleware.ts
│   │
│   ├── routes/
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── admin-users.routes.ts
│   │   ├── categories.routes.ts
│   │   ├── products.routes.ts
│   │   ├── customers.routes.ts
│   │   ├── catalogs.routes.ts
│   │   ├── inquiries.routes.ts
│   │   └── dashboard.routes.ts
│   │
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── email.service.ts
│   │   ├── file-upload.service.ts
│   │   ├── catalog.service.ts
│   │   └── notification.service.ts
│   │
│   ├── utils/
│   │   ├── jwt.utils.ts
│   │   ├── bcrypt.utils.ts
│   │   ├── validation.utils.ts
│   │   ├── response.utils.ts
│   │   └── logger.ts
│   │
│   ├── types/
│   │   ├── auth.types.ts
│   │   ├── user.types.ts
│   │   ├── express.d.ts
│   │   └── api.types.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── uploads/
├── logs/
├── tests/
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── tsconfig.json
├── nodemon.json
└── package.json
```

---

## 🛠️ Essential Configuration Files

### 1. TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@/config/*": ["src/config/*"],
      "@/controllers/*": ["src/controllers/*"],
      "@/middleware/*": ["src/middleware/*"],
      "@/routes/*": ["src/routes/*"],
      "@/services/*": ["src/services/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"]
    },
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

### 2. Nodemon Configuration (`nodemon.json`)

```json
{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["src/**/*.spec.ts", "src/**/*.test.ts"],
  "exec": "ts-node src/server.ts",
  "env": {
    "NODE_ENV": "development"
  }
}
```

### 3. Git Ignore (`.gitignore`)

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.production

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# IDEs
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Uploads
uploads/*
!uploads/.gitkeep

# Database
*.sqlite
*.db

# Temporary files
tmp/
temp/

# Docker
.dockerignore
```

---

## 🔧 Key Implementation Files

### 1. Database Configuration (`src/config/database.ts`)

```typescript
import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

// Log database queries in development
if (process.env.NODE_ENV === 'development' && process.env.DEBUG_QUERIES === 'true') {
  prisma.$on('query', (e) => {
    logger.debug(`Query: ${e.query}`);
    logger.debug(`Params: ${e.params}`);
    logger.debug(`Duration: ${e.duration}ms`);
  });
}

// Log database errors
prisma.$on('error', (e) => {
  logger.error('Database error:', e);
});

export default prisma;
```

### 2. Logger Utility (`src/utils/logger.ts`)

```typescript
import winston from 'winston';
import path from 'path';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'zipzag-catalog-api' },
  transports: [
    // Write all logs to console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    
    // Write all logs to a file
    new winston.transports.File({
      filename: path.join('logs', 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join('logs', 'combined.log')
    })
  ]
});

// Create logs directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

export default logger;
```

### 3. Error Middleware (`src/middleware/error.middleware.ts`)

```typescript
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { name: 'CastError', message, statusCode: 404 } as AppError;
  }

  // Mongoose duplicate key
  if (err.name === 'ValidationError') {
    const message = 'Validation Error';
    error = { name: 'ValidationError', message, statusCode: 400 } as AppError;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { name: 'JsonWebTokenError', message, statusCode: 401 } as AppError;
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { name: 'TokenExpiredError', message, statusCode: 401 } as AppError;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`) as AppError;
  error.statusCode = 404;
  next(error);
};
```

---

## 🚀 Deployment Instructions

### 1. Docker Deployment

```bash
# Build Docker image
docker build -t zipzag-catalog-backend .

# Run with docker-compose
docker-compose up -d

# Check logs
docker-compose logs -f app
```

### 2. Production Environment Setup

```bash
# Install PM2 for process management
npm install -g pm2

# Build the application
npm run build

# Start with PM2
pm2 start dist/server.js --name "zipzag-api"

# Save PM2 configuration
pm2 save
pm2 startup
```

### 3. Database Migration in Production

```bash
# Run migrations
npm run db:deploy

# Generate Prisma client
npm run db:generate
```

---

## 🔍 Testing

### 1. Setup Jest Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### 2. API Testing with Postman

1. Import the Postman collection
2. Set environment variables
3. Test all endpoints
4. Verify authentication flows

---

## 🔒 Security Checklist

- [ ] JWT secrets are secure (32+ characters)
- [ ] Database credentials are protected
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] File upload validation is implemented
- [ ] Input validation on all endpoints
- [ ] HTTPS is enforced in production
- [ ] Error messages don't leak sensitive data

---

## 📊 Monitoring & Logging

### 1. Application Monitoring

- Use Winston for structured logging
- Implement health check endpoints
- Monitor database connection
- Track API response times

### 2. Error Tracking

- Implement error tracking service (Sentry)
- Log all API errors
- Monitor failed authentication attempts
- Track file upload errors

This comprehensive setup guide provides everything needed to implement a production-ready backend for the ZipZag Catalog System. Follow the steps in order and customize the configuration based on your specific requirements.