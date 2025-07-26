# ZipZag Catalog Backend - SQL Setup Guide

## 🛠️ Technology Stack

- **Backend Framework**: Node.js + Express.js
- **Database**: MySQL/PostgreSQL (SQL)
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Middleware**: CORS, Body Parser
- **API Testing**: Postman
- **Frontend Connectivity**: Axios + Redux (for frontend)

---

## 📋 Step-by-Step Setup Commands

### 1. Create Project Structure

```bash
# Create project directory
mkdir zipzag-backend
cd zipzag-backend

# Initialize npm project
npm init -y

# Create folder structure
mkdir src
mkdir src/controllers
mkdir src/routes  
mkdir src/models
mkdir src/middleware
mkdir src/config
mkdir src/migrations
mkdir src/seeders
mkdir uploads
mkdir logs
```

### 2. Install Dependencies

```bash
# Core backend dependencies
npm install express

# Database & ORM
npm install sequelize mysql2
# OR for PostgreSQL: npm install sequelize pg pg-hstore

# Authentication & Security
npm install jsonwebtoken bcryptjs
npm install cors body-parser
npm install helmet express-rate-limit

# File upload & utilities
npm install multer
npm install dotenv
npm install morgan winston

# Development dependencies
npm install --save-dev nodemon
npm install --save-dev sequelize-cli
```

### 3. Setup Sequelize CLI

```bash
# Install Sequelize CLI globally
npm install -g sequelize-cli

# Initialize Sequelize in project
npx sequelize-cli init

# This creates:
# - config/config.json (database configuration)
# - models/index.js (model loader)
# - migrations/ (database migrations)
# - seeders/ (database seeds)
```

### 4. Database Setup (MySQL Example)

```bash
# Install MySQL (Ubuntu/Debian)
sudo apt update
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure MySQL installation
sudo mysql_secure_installation

# Login to MySQL
sudo mysql -u root -p

# Create database and user
CREATE DATABASE zipzag_catalog;
CREATE USER 'zipzag_user'@'localhost' IDENTIFIED BY 'zipzag_password';
GRANT ALL PRIVILEGES ON zipzag_catalog.* TO 'zipzag_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 📁 Updated Project Structure

```
zipzag-backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── jwt.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminUsersController.js
│   │   ├── categoriesController.js
│   │   ├── productsController.js
│   │   ├── customersController.js
│   │   ├── catalogsController.js
│   │   ├── inquiriesController.js
│   │   └── dashboardController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── upload.js
│   │   └── validation.js
│   │
│   ├── models/
│   │   ├── index.js (Sequelize auto-generated)
│   │   ├── AdminUser.js
│   │   ├── Category.js
│   │   ├── Product.js
│   │   ├── Customer.js
│   │   ├── Catalog.js
│   │   ├── Inquiry.js
│   │   └── associations.js
│   │
│   ├── routes/
│   │   ├── index.js
│   │   ├── auth.js
│   │   ├── adminUsers.js
│   │   ├── categories.js
│   │   ├── products.js
│   │   ├── customers.js
│   │   ├── catalogs.js
│   │   ├── inquiries.js
│   │   └── dashboard.js
│   │
│   ├── migrations/
│   ├── seeders/
│   └── app.js
│
├── config/
│   └── config.json (Sequelize config)
├── uploads/
├── logs/
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## ⚙️ Configuration Files

### 1. Package.json
```json
{
  "name": "zipzag-backend",
  "version": "1.0.0",
  "description": "ZipZag Catalog Backend with SQL",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "db:migrate": "npx sequelize-cli db:migrate",
    "db:seed": "npx sequelize-cli db:seed:all",
    "db:reset": "npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all"
  },
  "dependencies": {
    "express": "^4.18.2",
    "sequelize": "^6.33.0",
    "mysql2": "^3.6.1",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "body-parser": "^1.20.2",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.10.0",
    "multer": "^1.4.5-lts.1",
    "dotenv": "^16.3.1",
    "morgan": "^1.10.0",
    "winston": "^3.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "sequelize-cli": "^6.6.1"
  }
}
```

### 2. Environment Variables (.env)
```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=zipzag_catalog
DB_USERNAME=zipzag_user
DB_PASSWORD=zipzag_password
DB_DIALECT=mysql

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters
JWT_EXPIRE=24h
JWT_REFRESH_SECRET=your-refresh-secret-key-here
JWT_REFRESH_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# File Upload Configuration
UPLOAD_PATH=uploads/
MAX_FILE_SIZE=5242880
```

### 3. Sequelize Config (config/config.json)
```json
{
  "development": {
    "username": "zipzag_user",
    "password": "zipzag_password", 
    "database": "zipzag_catalog",
    "host": "localhost",
    "port": 3306,
    "dialect": "mysql",
    "logging": true
  },
  "test": {
    "username": "zipzag_user",
    "password": "zipzag_password",
    "database": "zipzag_catalog_test",
    "host": "localhost",
    "port": 3306,
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "mysql",
    "logging": false,
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}
```

---

## 🗄️ Sequelize Models

### 1. AdminUser Model
```javascript
// src/models/AdminUser.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AdminUser = sequelize.define('AdminUser', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        len: [10, 15]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255]
      }
    },
    role: {
      type: DataTypes.ENUM('super-admin', 'sub-admin'),
      defaultValue: 'sub-admin'
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    lastLogin: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'admin_users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const bcrypt = require('bcryptjs');
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const bcrypt = require('bcryptjs');
          user.password = await bcrypt.hash(user.password, 12);
        }
      }
    }
  });

  return AdminUser;
};
```

### 2. Category Model
```javascript
// src/models/Category.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    parentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5
      }
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'categories',
    timestamps: true
  });

  return Category;
};
```

### 3. Product Model
```javascript
// src/models/Product.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 200]
      }
    },
    shortDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 500]
      }
    },
    longDescription: {
      type: DataTypes.TEXT
    },
    basePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    offerPercent: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    },
    finalPrice: {
      type: DataTypes.VIRTUAL,
      get() {
        const basePrice = this.getDataValue('basePrice');
        const offerPercent = this.getDataValue('offerPercent');
        return basePrice - (basePrice * offerPercent / 100);
      }
    },
    sku: {
      type: DataTypes.STRING,
      unique: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'out-of-stock'),
      defaultValue: 'active'
    },
    images: {
      type: DataTypes.JSON,
      defaultValue: []
    }
  }, {
    tableName: 'products',
    timestamps: true
  });

  return Product;
};
```

### 4. Customer Model
```javascript
// src/models/Customer.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        len: [10, 15]
      }
    },
    address: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    pincode: {
      type: DataTypes.STRING
    },
    region: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'active'
    },
    lastLogin: {
      type: DataTypes.DATE
    },
    joinedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'customers',
    timestamps: true
  });

  return Customer;
};
```

### 5. Catalog Model
```javascript
// src/models/Catalog.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Catalog = sequelize.define('Catalog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 200]
      }
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    hasPassword: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    password: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'archived'),
      defaultValue: 'active'
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createdById: {
      type: DataTypes.INTEGER,
      references: {
        model: 'admin_users',
        key: 'id'
      }
    }
  }, {
    tableName: 'catalogs',
    timestamps: true
  });

  return Catalog;
};
```

### 6. Inquiry Model
```javascript
// src/models/Inquiry.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Inquiry = sequelize.define('Inquiry', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    catalogId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'catalogs',
        key: 'id'
      }
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5, 200]
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 2000]
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'resolved', 'closed'),
      defaultValue: 'pending'
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
      defaultValue: 'medium'
    },
    response: {
      type: DataTypes.TEXT
    },
    respondedAt: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'inquiries',
    timestamps: true
  });

  return Inquiry;
};
```

### 7. Model Associations
```javascript
// src/models/associations.js
const { sequelize } = require('./index');

const associateModels = () => {
  const { AdminUser, Category, Product, Customer, Catalog, Inquiry } = sequelize.models;

  // Category self-referencing relationship (parent-child)
  Category.hasMany(Category, { as: 'children', foreignKey: 'parentId' });
  Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });

  // Category -> Products
  Category.hasMany(Product, { foreignKey: 'categoryId' });
  Product.belongsTo(Category, { foreignKey: 'categoryId' });

  // Customer -> Catalogs
  Customer.hasMany(Catalog, { foreignKey: 'customerId' });
  Catalog.belongsTo(Customer, { foreignKey: 'customerId' });

  // AdminUser -> Catalogs (created by)
  AdminUser.hasMany(Catalog, { foreignKey: 'createdById' });
  Catalog.belongsTo(AdminUser, { as: 'createdBy', foreignKey: 'createdById' });

  // Customer -> Inquiries
  Customer.hasMany(Inquiry, { foreignKey: 'customerId' });
  Inquiry.belongsTo(Customer, { foreignKey: 'customerId' });

  // Product -> Inquiries
  Product.hasMany(Inquiry, { foreignKey: 'productId' });
  Inquiry.belongsTo(Product, { foreignKey: 'productId' });

  // Catalog -> Inquiries
  Catalog.hasMany(Inquiry, { foreignKey: 'catalogId' });
  Inquiry.belongsTo(Catalog, { foreignKey: 'catalogId' });

  // Catalog -> Products (Many-to-Many)
  Catalog.belongsToMany(Product, { 
    through: 'CatalogProducts', 
    foreignKey: 'catalogId',
    otherKey: 'productId'
  });
  Product.belongsToMany(Catalog, { 
    through: 'CatalogProducts', 
    foreignKey: 'productId',
    otherKey: 'catalogId'
  });
};

module.exports = associateModels;
```

---

## 🛡️ Middleware Setup

### 1. Authentication Middleware
```javascript
// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { AdminUser } = require('../models');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access token required' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await AdminUser.findByPk(decoded.id);

    if (!user || user.status !== 'active') {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Insufficient permissions' 
      });
    }
    next();
  };
};

module.exports = { authenticateToken, requireRole };
```

### 2. File Upload Middleware
```javascript
// src/middleware/upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  },
  fileFilter: fileFilter
});

module.exports = upload;
```

---

## 🚀 Express App Setup

### 1. Main App File
```javascript
// src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');

// Import models and associations
const { sequelize } = require('./models');
const associateModels = require('./models/associations');

// Import routes
const authRoutes = require('./routes/auth');
const adminUsersRoutes = require('./routes/adminUsers');
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const customersRoutes = require('./routes/customers');
const catalogsRoutes = require('./routes/catalogs');
const inquiriesRoutes = require('./routes/inquiries');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api', limiter);

// Body parsing middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Database connection and model associations
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Associate models
    associateModels();
    
    // Sync database (create tables)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

// Initialize database
initializeDatabase();

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin-users', adminUsersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/catalogs', catalogsRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'ZipZag Catalog API',
    version: '1.0.0',
    status: 'Active',
    endpoints: {
      auth: '/api/auth',
      adminUsers: '/api/admin-users',
      categories: '/api/categories',
      products: '/api/products',
      customers: '/api/customers',
      catalogs: '/api/catalogs',
      inquiries: '/api/inquiries',
      dashboard: '/api/dashboard'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

module.exports = app;
```

### 2. Server Entry Point
```javascript
// server.js
require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 ZipZag Catalog API Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
```

---

## 🗃️ Database Migrations

### Create Migration Files

```bash
# Create AdminUsers table
npx sequelize-cli migration:generate --name create-admin-users

# Create Categories table
npx sequelize-cli migration:generate --name create-categories

# Create Products table
npx sequelize-cli migration:generate --name create-products

# Create Customers table
npx sequelize-cli migration:generate --name create-customers

# Create Catalogs table
npx sequelize-cli migration:generate --name create-catalogs

# Create Inquiries table
npx sequelize-cli migration:generate --name create-inquiries

# Create CatalogProducts junction table
npx sequelize-cli migration:generate --name create-catalog-products
```

### Sample Migration (AdminUsers)
```javascript
// migrations/xxxx-create-admin-users.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admin_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('super-admin', 'sub-admin'),
        defaultValue: 'sub-admin'
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      },
      lastLogin: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('admin_users');
  }
};
```

---

## 📊 Sample Controller (Dashboard)

```javascript
// src/controllers/dashboardController.js
const { AdminUser, Product, Customer, Catalog, Inquiry, sequelize } = require('../models');

exports.getStats = async (req, res) => {
  try {
    const stats = await Promise.all([
      Customer.count({ where: { status: 'active' } }),
      Product.count({ where: { status: 'active' } }),
      Catalog.count({ where: { status: 'active' } }),
      Inquiry.count({ where: { status: 'pending' } })
    ]);

    res.json({
      success: true,
      data: {
        totalCustomers: stats[0],
        activeProducts: stats[1],
        liveCatalogs: stats[2],
        pendingInquiries: stats[3]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
      error: error.message
    });
  }
};

exports.getActivity = async (req, res) => {
  try {
    // Get recent activities from different tables
    const [recentCatalogs, recentInquiries, recentProducts] = await Promise.all([
      Catalog.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        include: [{ model: Customer, attributes: ['name'] }]
      }),
      Inquiry.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        include: [{ model: Customer, attributes: ['name'] }]
      }),
      Product.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']]
      })
    ]);

    const activities = [
      ...recentCatalogs.map(catalog => ({
        type: 'catalog',
        message: `New catalog "${catalog.name}" created for ${catalog.Customer.name}`,
        time: catalog.createdAt,
        status: 'success'
      })),
      ...recentInquiries.map(inquiry => ({
        type: 'inquiry',
        message: `New inquiry "${inquiry.subject}" from ${inquiry.Customer.name}`,
        time: inquiry.createdAt,
        status: 'pending'
      })),
      ...recentProducts.map(product => ({
        type: 'product',
        message: `New product "${product.name}" added`,
        time: product.createdAt,
        status: 'info'
      }))
    ];

    // Sort by time and limit to 10
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    
    res.json({
      success: true,
      data: activities.slice(0, 10)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent activity',
      error: error.message
    });
  }
};
```

---

## 🧪 Postman API Testing Setup

### 1. Create Postman Collection
```bash
# Download and install Postman
# Visit: https://www.postman.com/downloads/

# Create new collection: "ZipZag Catalog API"
```

### 2. Environment Variables in Postman
```json
{
  "name": "ZipZag Development",
  "values": [
    {
      "key": "base_url",
      "value": "http://localhost:3000/api",
      "enabled": true
    },
    {
      "key": "auth_token",
      "value": "",
      "enabled": true
    }
  ]
}
```

### 3. Sample API Tests

#### Auth Login Test
```
POST {{base_url}}/auth/login
Content-Type: application/json

{
  "email": "admin@zipzag.com",
  "password": "password123"
}

# Test Script:
pm.test("Login successful", function () {
    pm.response.to.have.status(200);
    const response = pm.response.json();
    pm.expect(response.success).to.be.true;
    pm.environment.set("auth_token", response.data.token);
});
```

#### Get Dashboard Stats Test
```
GET {{base_url}}/dashboard/stats
Authorization: Bearer {{auth_token}}

# Test Script:
pm.test("Dashboard stats retrieved", function () {
    pm.response.to.have.status(200);
    const response = pm.response.json();
    pm.expect(response.success).to.be.true;
    pm.expect(response.data).to.have.property('totalCustomers');
    pm.expect(response.data).to.have.property('activeProducts');
});
```

---

## 🚀 Final Setup Commands

```bash
# 1. Install all dependencies
npm install

# 2. Create .env file with your configuration
cp .env.example .env

# 3. Run database migrations
npm run db:migrate

# 4. Seed the database with initial data
npm run db:seed

# 5. Start development server
npm run dev

# Server will start at http://localhost:3000
```

---

## ✅ Frontend Integration (Axios + Redux)

### Frontend Setup Commands
```bash
# In your frontend project
npm install axios redux react-redux @reduxjs/toolkit

# Configure axios base URL to point to your backend
# http://localhost:3000/api
```

### Sample Axios Configuration
```javascript
// frontend/src/config/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
});

// Add auth token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
```

This complete setup provides:
- ✅ **SQL Database** with Sequelize ORM
- ✅ **JWT Authentication** with proper middleware
- ✅ **CORS & Body Parser** configured
- ✅ **Express.js** with all routes
- ✅ **File Upload** handling
- ✅ **Database Migrations** and seeding
- ✅ **Postman** testing setup
- ✅ **Frontend connectivity** ready

Your backend is now ready to connect with your React frontend using Axios and Redux!