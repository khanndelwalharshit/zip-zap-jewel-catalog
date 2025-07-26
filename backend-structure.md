# ZipZag Catalog System - Backend Structure

## 🏗️ Backend Architecture Overview

**Technology Stack**: Node.js + Express + TypeScript + PostgreSQL + Redis
**Architecture Pattern**: RESTful API with JWT Authentication
**Database**: PostgreSQL with Prisma ORM
**File Storage**: AWS S3 / Local storage for jewelry images
**Authentication**: JWT tokens with refresh token rotation

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/                 # Configuration files
│   │   ├── database.ts         # Database connection
│   │   ├── redis.ts           # Redis configuration
│   │   ├── aws.ts             # AWS S3 configuration
│   │   └── env.ts             # Environment variables
│   │
│   ├── controllers/           # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── admin-users.controller.ts
│   │   ├── categories.controller.ts
│   │   ├── products.controller.ts
│   │   ├── customers.controller.ts
│   │   ├── catalogs.controller.ts
│   │   ├── inquiries.controller.ts
│   │   └── dashboard.controller.ts
│   │
│   ├── models/               # Database models (Prisma)
│   │   └── schema.prisma     # Database schema
│   │
│   ├── routes/               # API routes
│   │   ├── index.ts          # Route aggregator
│   │   ├── auth.routes.ts
│   │   ├── admin-users.routes.ts
│   │   ├── categories.routes.ts
│   │   ├── products.routes.ts
│   │   ├── customers.routes.ts
│   │   ├── catalogs.routes.ts
│   │   └── inquiries.routes.ts
│   │
│   ├── middleware/           # Custom middleware
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── upload.middleware.ts
│   │   └── rate-limit.middleware.ts
│   │
│   ├── services/             # Business logic
│   │   ├── auth.service.ts
│   │   ├── email.service.ts
│   │   ├── file-upload.service.ts
│   │   ├── catalog.service.ts
│   │   └── notification.service.ts
│   │
│   ├── utils/                # Utility functions
│   │   ├── jwt.utils.ts
│   │   ├── bcrypt.utils.ts
│   │   ├── validation.utils.ts
│   │   └── response.utils.ts
│   │
│   ├── types/                # TypeScript type definitions
│   │   ├── auth.types.ts
│   │   ├── user.types.ts
│   │   └── api.types.ts
│   │
│   └── app.ts                # Express app setup
│   └── server.ts             # Server entry point
│
├── prisma/                   # Prisma configuration
│   ├── migrations/           # Database migrations
│   └── seed.ts              # Database seeding
│
├── uploads/                  # Local file storage
├── tests/                    # Test files
├── docker-compose.yml        # Docker configuration
├── Dockerfile               # Container setup
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript config
```

---

## 🗄️ Database Schema (PostgreSQL + Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Admin Users Management
model AdminUser {
  id          String   @id @default(cuid())
  fullName    String
  email       String   @unique
  phone       String?
  password    String
  role        AdminRole @default(SUB_ADMIN)
  status      UserStatus @default(ACTIVE)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  lastLogin   DateTime?
  
  // Relations
  createdProducts Product[]
  createdCatalogs Catalog[]
  
  @@map("admin_users")
}

enum AdminRole {
  SUPER_ADMIN
  SUB_ADMIN
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

// Product Categories (Hierarchical)
model Category {
  id          String   @id @default(cuid())
  name        String
  description String?
  parentId    String?
  level       Int      @default(0)
  status      CategoryStatus @default(ACTIVE)
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  parent      Category? @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  products    Product[]
  
  @@map("categories")
}

enum CategoryStatus {
  ACTIVE
  INACTIVE
}

// Products
model Product {
  id               String   @id @default(cuid())
  name             String
  shortDescription String
  longDescription  String?
  basePrice        Decimal  @db.Decimal(10,2)
  offerPercent     Int      @default(0)
  finalPrice       Decimal  @db.Decimal(10,2)
  sku              String?  @unique
  status           ProductStatus @default(ACTIVE)
  categoryId       String
  createdById      String
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  
  // Relations
  category         Category @relation(fields: [categoryId], references: [id])
  createdBy        AdminUser @relation(fields: [createdById], references: [id])
  images           ProductImage[]
  catalogProducts  CatalogProduct[]
  inquiries        Inquiry[]
  
  @@map("products")
}

enum ProductStatus {
  ACTIVE
  INACTIVE
  OUT_OF_STOCK
}

// Product Images
model ProductImage {
  id        String @id @default(cuid())
  productId String
  imageUrl  String
  altText   String?
  sortOrder Int    @default(0)
  createdAt DateTime @default(now())
  
  // Relations
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@map("product_images")
}

// Customers (B2B Jewelry Retailers)
model Customer {
  id          String   @id @default(cuid())
  name        String
  email       String   @unique
  phone       String?
  address     String?
  city        String?
  state       String?
  pincode     String?
  region      String?
  status      CustomerStatus @default(ACTIVE)
  lastLogin   DateTime?
  joinedDate  DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  catalogs    Catalog[]
  inquiries   Inquiry[]
  
  @@map("customers")
}

enum CustomerStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

// Catalogs (Personalized Product Collections)
model Catalog {
  id          String   @id @default(cuid())
  name        String
  customerId  String
  hasPassword Boolean  @default(false)
  password    String?
  status      CatalogStatus @default(ACTIVE)
  views       Int      @default(0)
  createdById String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  customer    Customer @relation(fields: [customerId], references: [id])
  createdBy   AdminUser @relation(fields: [createdById], references: [id])
  products    CatalogProduct[]
  inquiries   Inquiry[]
  
  @@map("catalogs")
}

enum CatalogStatus {
  ACTIVE
  INACTIVE
  ARCHIVED
}

// Catalog Products (Many-to-Many)
model CatalogProduct {
  id        String @id @default(cuid())
  catalogId String
  productId String
  addedAt   DateTime @default(now())
  
  // Relations
  catalog   Catalog @relation(fields: [catalogId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  @@unique([catalogId, productId])
  @@map("catalog_products")
}

// Customer Inquiries
model Inquiry {
  id          String   @id @default(cuid())
  customerId  String
  productId   String?
  catalogId   String?
  subject     String
  message     String
  status      InquiryStatus @default(PENDING)
  priority    InquiryPriority @default(MEDIUM)
  response    String?
  respondedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  customer    Customer @relation(fields: [customerId], references: [id])
  product     Product? @relation(fields: [productId], references: [id])
  catalog     Catalog? @relation(fields: [catalogId], references: [id])
  
  @@map("inquiries")
}

enum InquiryStatus {
  PENDING
  IN_PROGRESS
  RESOLVED
  CLOSED
}

enum InquiryPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

// Activity Logs for Dashboard
model ActivityLog {
  id          String   @id @default(cuid())
  type        ActivityType
  message     String
  entityType  String?
  entityId    String?
  customerId  String?
  adminUserId String?
  createdAt   DateTime @default(now())
  
  @@map("activity_logs")
}

enum ActivityType {
  CATALOG_CREATED
  PRODUCT_ADDED
  INQUIRY_RECEIVED
  CUSTOMER_REGISTERED
  CATALOG_SHARED
  USER_LOGIN
}
```

---

## 🛠️ Package.json Dependencies

```json
{
  "name": "zipzag-catalog-backend",
  "version": "1.0.0",
  "description": "Backend API for ZipZag Jewelry Catalog System",
  "main": "dist/server.js",
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:seed": "ts-node prisma/seed.ts",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "compression": "^1.7.4",
    
    "@prisma/client": "^5.6.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "joi": "^17.11.0",
    "zod": "^3.22.4",
    
    "multer": "^1.4.5-lts.1",
    "aws-sdk": "^2.1490.0",
    "sharp": "^0.32.6",
    
    "nodemailer": "^6.9.7",
    "redis": "^4.6.10",
    "express-rate-limit": "^7.1.5",
    
    "dotenv": "^16.3.1",
    "winston": "^3.11.0",
    "date-fns": "^2.30.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.20",
    "@types/cors": "^2.8.15",
    "@types/bcryptjs": "^2.4.5",
    "@types/jsonwebtoken": "^9.0.4",
    "@types/multer": "^1.4.10",
    "@types/nodemailer": "^6.4.13",
    "@types/node": "^20.8.9",
    
    "typescript": "^5.2.2",
    "ts-node": "^10.9.1",
    "nodemon": "^3.0.1",
    "prisma": "^5.6.0",
    
    "jest": "^29.7.0",
    "@types/jest": "^29.5.7",
    "supertest": "^6.3.3",
    "@types/supertest": "^2.0.15"
  }
}
```

---

## 🚀 API Endpoints Structure

### **Authentication Routes** (`/api/auth`)
```typescript
POST   /api/auth/login           # Admin login
POST   /api/auth/refresh         # Refresh JWT token
POST   /api/auth/logout          # Logout
GET    /api/auth/profile         # Get current user profile
PUT    /api/auth/profile         # Update profile
PUT    /api/auth/change-password # Change password
```

### **Admin Users Routes** (`/api/admin-users`)
```typescript
GET    /api/admin-users          # List all admin users
POST   /api/admin-users          # Create new admin user
GET    /api/admin-users/:id      # Get admin user by ID
PUT    /api/admin-users/:id      # Update admin user
DELETE /api/admin-users/:id      # Delete admin user
PUT    /api/admin-users/:id/status # Update user status
```

### **Categories Routes** (`/api/categories`)
```typescript
GET    /api/categories           # Get category tree
POST   /api/categories           # Create new category
GET    /api/categories/:id       # Get category by ID
PUT    /api/categories/:id       # Update category
DELETE /api/categories/:id       # Delete category
GET    /api/categories/:id/products # Get products in category
```

### **Products Routes** (`/api/products`)
```typescript
GET    /api/products             # List products (with pagination, filters)
POST   /api/products             # Create new product
GET    /api/products/:id         # Get product by ID
PUT    /api/products/:id         # Update product
DELETE /api/products/:id         # Delete product
POST   /api/products/:id/images  # Upload product images
DELETE /api/products/:id/images/:imageId # Delete product image
```

### **Customers Routes** (`/api/customers`)
```typescript
GET    /api/customers            # List all customers
POST   /api/customers            # Create new customer
GET    /api/customers/:id        # Get customer by ID
PUT    /api/customers/:id        # Update customer
DELETE /api/customers/:id        # Delete customer
GET    /api/customers/:id/catalogs # Get customer's catalogs
GET    /api/customers/:id/inquiries # Get customer's inquiries
```

### **Catalogs Routes** (`/api/catalogs`)
```typescript
GET    /api/catalogs             # List all catalogs
POST   /api/catalogs             # Create new catalog
GET    /api/catalogs/:id         # Get catalog by ID
PUT    /api/catalogs/:id         # Update catalog
DELETE /api/catalogs/:id         # Delete catalog
POST   /api/catalogs/:id/products # Add products to catalog
DELETE /api/catalogs/:id/products/:productId # Remove product from catalog
POST   /api/catalogs/:id/view    # Track catalog view
GET    /api/catalogs/:id/public  # Public catalog view (for customers)
```

### **Inquiries Routes** (`/api/inquiries`)
```typescript
GET    /api/inquiries            # List all inquiries
POST   /api/inquiries            # Create new inquiry
GET    /api/inquiries/:id        # Get inquiry by ID
PUT    /api/inquiries/:id        # Update inquiry
PUT    /api/inquiries/:id/status # Update inquiry status
POST   /api/inquiries/:id/respond # Respond to inquiry
```

### **Dashboard Routes** (`/api/dashboard`)
```typescript
GET    /api/dashboard/stats      # Get dashboard statistics
GET    /api/dashboard/activity   # Get recent activity
GET    /api/dashboard/analytics  # Get analytics data
```

---

## 🔐 Authentication & Security

### **JWT Implementation**
```typescript
// src/utils/jwt.utils.ts
import jwt from 'jsonwebtoken';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateTokens = (payload: JWTPayload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '15m'
  });
  
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '7d'
  });
  
  return { accessToken, refreshToken };
};
```

### **Auth Middleware**
```typescript
// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};
```

---

## 📊 Controllers Example

### **Products Controller**
```typescript
// src/controllers/products.controller.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { productSchema } from '../utils/validation.utils';

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, categoryId, status, search } = req.query;
    
    const where = {
      ...(categoryId && { categoryId: categoryId as string }),
      ...(status && { status: status as string }),
      ...(search && {
        OR: [
          { name: { contains: search as string, mode: 'insensitive' } },
          { shortDescription: { contains: search as string, mode: 'insensitive' } }
        ]
      })
    };

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: true,
        _count: {
          select: {
            catalogProducts: true,
            inquiries: true
          }
        }
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.product.count({ where });

    res.json({
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validatedData = productSchema.parse(req.body);
    
    const finalPrice = validatedData.basePrice * (1 - validatedData.offerPercent / 100);
    
    const product = await prisma.product.create({
      data: {
        ...validatedData,
        finalPrice,
        createdById: req.user.userId
      },
      include: {
        category: true,
        images: true
      }
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        type: 'PRODUCT_ADDED',
        message: `New product "${product.name}" added`,
        entityType: 'product',
        entityId: product.id,
        adminUserId: req.user.userId
      }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
};
```

---

## 🔧 Services Layer

### **Email Service**
```typescript
// src/services/email.service.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendCatalogNotification = async (
  customerEmail: string,
  catalogName: string,
  catalogUrl: string
) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: customerEmail,
    subject: `New Catalog Available: ${catalogName}`,
    html: `
      <h2>New Jewelry Catalog</h2>
      <p>A new catalog "${catalogName}" has been created for you.</p>
      <a href="${catalogUrl}">View Catalog</a>
    `
  };

  await transporter.sendMail(mailOptions);
};
```

### **File Upload Service**
```typescript
// src/services/file-upload.service.ts
import AWS from 'aws-sdk';
import sharp from 'sharp';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export const uploadProductImage = async (file: Express.Multer.File) => {
  // Optimize image
  const optimizedImage = await sharp(file.buffer)
    .resize(800, 800, { fit: 'inside' })
    .jpeg({ quality: 90 })
    .toBuffer();

  // Upload to S3
  const uploadParams = {
    Bucket: process.env.S3_BUCKET!,
    Key: `products/${Date.now()}-${file.originalname}`,
    Body: optimizedImage,
    ContentType: 'image/jpeg'
  };

  const result = await s3.upload(uploadParams).promise();
  return result.Location;
};
```

---

## 🐳 Docker Configuration

### **Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### **docker-compose.yml**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@postgres:5432/zipzag_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: zipzag_db
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

---

## 🔒 Environment Variables

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/zipzag_db

# JWT Secrets
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# Redis
REDIS_URL=redis://localhost:6379

# AWS S3
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
S3_BUCKET=zipzag-jewelry-images

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@zipzag.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🚀 Getting Started Commands

```bash
# Setup Backend
mkdir zipzag-backend
cd zipzag-backend
npm init -y
npm install [dependencies from package.json]

# Database Setup
npx prisma init
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed

# Development
npm run dev

# Production
npm run build
npm start
```

This backend structure provides a solid foundation for the ZipZag Catalog System with proper separation of concerns, scalable architecture, and all the necessary features to support the frontend functionality.