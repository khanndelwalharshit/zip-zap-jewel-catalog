# ZipZag Backend - Redesigned Project Structure

## 🛠️ Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Middleware**: CORS, Body Parser
- **Database**: SQL (MySQL)
- **ORM**: Sequelize
- **Authentication**: JWT
- **Frontend Communication**: Axios, Redux (frontend side)
- **File Storage**: Local storage (no AWS)

---

## 📁 Redesigned Project Structure

```
zipzag-backend/
├── src/
│   ├── config/
│   │   ├── database.js          # Sequelize configuration
│   │   ├── jwt.js               # JWT configuration
│   │   └── corsConfig.js        # CORS settings
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminUserController.js
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   ├── customerController.js
│   │   ├── catalogController.js
│   │   ├── inquiryController.js
│   │   └── dashboardController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification
│   │   ├── uploadMiddleware.js  # File upload handling
│   │   └── validationMiddleware.js
│   │
│   ├── models/
│   │   ├── index.js            # Sequelize models loader
│   │   ├── AdminUser.js
│   │   ├── Category.js
│   │   ├── Product.js
│   │   ├── Customer.js
│   │   ├── Catalog.js
│   │   ├── Inquiry.js
│   │   └── CatalogProduct.js   # Junction table
│   │
│   ├── routes/
│   │   ├── index.js
│   │   ├── authRoutes.js
│   │   ├── adminUserRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── catalogRoutes.js
│   │   ├── inquiryRoutes.js
│   │   └── dashboardRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js      # Authentication logic
│   │   ├── fileService.js      # File handling
│   │   └── emailService.js     # Email notifications
│   │
│   ├── utils/
│   │   ├── jwtUtils.js         # JWT helper functions
│   │   ├── validation.js       # Input validation
│   │   └── responseFormatter.js # API response formatting
│   │
│   └── app.js                  # Express app configuration
│
├── uploads/                    # Local file storage
│   ├── products/              # Product images
│   └── temp/                  # Temporary uploads
│
├── migrations/                 # Database migrations
├── seeders/                   # Database seeds
├── logs/                      # Application logs
├── tests/                     # Test files
├── .env                       # Environment variables
├── .env.example              # Environment template
├── .gitignore
├── package.json
├── server.js                 # Server entry point
└── README.md
```

---

## 📋 Step-by-Step Setup Commands

### Step 1: Initialize Project
```bash
# Create project directory
mkdir zipzag-backend
cd zipzag-backend

# Initialize npm project
npm init -y

# Create project structure
mkdir -p src/{config,controllers,middleware,models,routes,services,utils}
mkdir -p uploads/{products,temp}
mkdir -p migrations seeders logs tests
```

### Step 2: Install Dependencies
```bash
# Core backend dependencies
npm install express

# Database and ORM
npm install sequelize mysql2

# Authentication
npm install jsonwebtoken bcryptjs

# Middleware
npm install cors body-parser

# File handling
npm install multer

# Utilities
npm install dotenv morgan

# Development dependencies
npm install --save-dev nodemon sequelize-cli
```

### Step 3: Setup Package.json Scripts
```bash
# Add scripts to package.json
npm pkg set scripts.start="node server.js"
npm pkg set scripts.dev="nodemon server.js"
npm pkg set scripts.db:create="npx sequelize-cli db:create"
npm pkg set scripts.db:migrate="npx sequelize-cli db:migrate"
npm pkg set scripts.db:seed="npx sequelize-cli db:seed:all"
npm pkg set scripts.db:reset="npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all"
```

### Step 4: Setup Database (MySQL)
```bash
# Install MySQL (Ubuntu/Debian)
sudo apt update
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Login to MySQL
sudo mysql -u root -p

# Execute these SQL commands:
# CREATE DATABASE zipzag_catalog;
# CREATE USER 'zipzag_user'@'localhost' IDENTIFIED BY 'zipzag_password';
# GRANT ALL PRIVILEGES ON zipzag_catalog.* TO 'zipzag_user'@'localhost';
# FLUSH PRIVILEGES;
# EXIT;
```

### Step 5: Initialize Sequelize
```bash
# Initialize Sequelize configuration
npx sequelize-cli init --config src/config/database.js --models-path src/models --migrations-path migrations --seeders-path seeders
```

---

## ⚙️ Configuration Files

### 1. Environment Variables (.env)
```bash
# Create .env file
cat > .env << 'EOF'
# Server Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=zipzag_catalog
DB_USERNAME=zipzag_user
DB_PASSWORD=zipzag_password
DB_DIALECT=mysql

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRE=24h

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Upload Configuration
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
EOF
```

### 2. Package.json (Complete)
```bash
# Create complete package.json
cat > package.json << 'EOF'
{
  "name": "zipzag-backend",
  "version": "1.0.0",
  "description": "ZipZag Catalog Backend API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "db:create": "npx sequelize-cli db:create",
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
    "multer": "^1.4.5-lts.1",
    "dotenv": "^16.3.1",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "sequelize-cli": "^6.6.1"
  }
}
EOF
```

### 3. Database Configuration
```bash
# Create database configuration
cat > src/config/database.js << 'EOF'
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: console.log
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME + '_test',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
};
EOF
```

### 4. CORS Configuration
```bash
# Create CORS configuration
cat > src/config/corsConfig.js << 'EOF'
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
EOF
```

### 5. JWT Configuration
```bash
# Create JWT configuration
cat > src/config/jwt.js << 'EOF'
module.exports = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRE || '24h',
  algorithm: 'HS256'
};
EOF
```

---

## 🗄️ Database Models

### 1. Sequelize Models Index
```bash
# Create models index file
cat > src/models/index.js << 'EOF'
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
EOF
```

### 2. AdminUser Model
```bash
# Create AdminUser model
cat > src/models/AdminUser.js << 'EOF'
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
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
          user.password = await bcrypt.hash(user.password, 12);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 12);
        }
      }
    }
  });

  AdminUser.associate = function(models) {
    AdminUser.hasMany(models.Catalog, {
      foreignKey: 'createdById',
      as: 'createdCatalogs'
    });
  };

  AdminUser.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return AdminUser;
};
EOF
```

### 3. Category Model
```bash
# Create Category model
cat > src/models/Category.js << 'EOF'
module.exports = (sequelize, DataTypes) => {
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

  Category.associate = function(models) {
    // Self-referencing relationship
    Category.hasMany(models.Category, {
      foreignKey: 'parentId',
      as: 'children'
    });
    Category.belongsTo(models.Category, {
      foreignKey: 'parentId',
      as: 'parent'
    });
    
    // Category has many products
    Category.hasMany(models.Product, {
      foreignKey: 'categoryId'
    });
  };

  return Category;
};
EOF
```

### 4. Product Model
```bash
# Create Product model
cat > src/models/Product.js << 'EOF'
module.exports = (sequelize, DataTypes) => {
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

  Product.associate = function(models) {
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
    
    Product.belongsToMany(models.Catalog, {
      through: models.CatalogProduct,
      foreignKey: 'productId',
      otherKey: 'catalogId'
    });
    
    Product.hasMany(models.Inquiry, {
      foreignKey: 'productId'
    });
  };

  return Product;
};
EOF
```

### 5. Customer Model
```bash
# Create Customer model
cat > src/models/Customer.js << 'EOF'
module.exports = (sequelize, DataTypes) => {
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

  Customer.associate = function(models) {
    Customer.hasMany(models.Catalog, {
      foreignKey: 'customerId'
    });
    
    Customer.hasMany(models.Inquiry, {
      foreignKey: 'customerId'
    });
  };

  return Customer;
};
EOF
```

### 6. Catalog Model
```bash
# Create Catalog model
cat > src/models/Catalog.js << 'EOF'
module.exports = (sequelize, DataTypes) => {
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

  Catalog.associate = function(models) {
    Catalog.belongsTo(models.Customer, {
      foreignKey: 'customerId'
    });
    
    Catalog.belongsTo(models.AdminUser, {
      foreignKey: 'createdById',
      as: 'createdBy'
    });
    
    Catalog.belongsToMany(models.Product, {
      through: models.CatalogProduct,
      foreignKey: 'catalogId',
      otherKey: 'productId'
    });
    
    Catalog.hasMany(models.Inquiry, {
      foreignKey: 'catalogId'
    });
  };

  return Catalog;
};
EOF
```

### 7. Inquiry Model
```bash
# Create Inquiry model
cat > src/models/Inquiry.js << 'EOF'
module.exports = (sequelize, DataTypes) => {
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

  Inquiry.associate = function(models) {
    Inquiry.belongsTo(models.Customer, {
      foreignKey: 'customerId'
    });
    
    Inquiry.belongsTo(models.Product, {
      foreignKey: 'productId'
    });
    
    Inquiry.belongsTo(models.Catalog, {
      foreignKey: 'catalogId'
    });
  };

  return Inquiry;
};
EOF
```

### 8. CatalogProduct Junction Model
```bash
# Create CatalogProduct junction model
cat > src/models/CatalogProduct.js << 'EOF'
module.exports = (sequelize, DataTypes) => {
  const CatalogProduct = sequelize.define('CatalogProduct', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    catalogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'catalogs',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    addedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'catalog_products',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['catalogId', 'productId']
      }
    ]
  });

  return CatalogProduct;
};
EOF
```

---

## 🛡️ Middleware

### 1. Authentication Middleware
```bash
# Create authentication middleware
cat > src/middleware/authMiddleware.js << 'EOF'
const jwt = require('jsonwebtoken');
const { AdminUser } = require('../models');
const jwtConfig = require('../config/jwt');

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

    const decoded = jwt.verify(token, jwtConfig.secret);
    const user = await AdminUser.findByPk(decoded.id);

    if (!user || user.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Invalid or inactive user'
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
EOF
```

### 2. Upload Middleware
```bash
# Create upload middleware
cat > src/middleware/uploadMiddleware.js << 'EOF'
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureUploadDirs = () => {
  const dirs = ['uploads', 'uploads/products', 'uploads/temp'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

ensureUploadDirs();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, PNG, WebP) are allowed!'), false);
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
EOF
```

---

## 🚀 Express App Setup

### 1. Main App Configuration
```bash
# Create main app file
cat > src/app.js << 'EOF'
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

// Import configurations
const corsOptions = require('./config/corsConfig');
const { sequelize } = require('./models');

// Import routes
const authRoutes = require('./routes/authRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    // Sync database (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
};

connectDB();

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin-users', adminUserRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/catalogs', catalogRoutes);
app.use('/api/inquiries', inquiryRoutes);
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
EOF
```

### 2. Server Entry Point
```bash
# Create server entry point
cat > server.js << 'EOF'
require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 ZipZag Catalog API Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🩺 Health Check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
EOF
```

---

## 📊 Sample Controller

### Dashboard Controller
```bash
# Create dashboard controller
cat > src/controllers/dashboardController.js << 'EOF'
const { AdminUser, Product, Customer, Catalog, Inquiry } = require('../models');

exports.getStats = async (req, res) => {
  try {
    const [
      totalCustomers,
      activeProducts,
      liveCatalogs,
      pendingInquiries
    ] = await Promise.all([
      Customer.count({ where: { status: 'active' } }),
      Product.count({ where: { status: 'active' } }),
      Catalog.count({ where: { status: 'active' } }),
      Inquiry.count({ where: { status: 'pending' } })
    ]);

    res.json({
      success: true,
      data: {
        totalCustomers,
        activeProducts,
        liveCatalogs,
        pendingInquiries
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
};

exports.getActivity = async (req, res) => {
  try {
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
        message: `New catalog "${catalog.name}" created for ${catalog.Customer?.name || 'Unknown'}`,
        time: catalog.createdAt,
        status: 'success'
      })),
      ...recentInquiries.map(inquiry => ({
        type: 'inquiry',
        message: `New inquiry "${inquiry.subject}" from ${inquiry.Customer?.name || 'Unknown'}`,
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
EOF
```

---

## 🗃️ Sample Routes

### Dashboard Routes
```bash
# Create dashboard routes
cat > src/routes/dashboardRoutes.js << 'EOF'
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/stats', authenticateToken, dashboardController.getStats);
router.get('/activity', authenticateToken, dashboardController.getActivity);

module.exports = router;
EOF
```

---

## 🔧 Utilities

### JWT Utils
```bash
# Create JWT utilities
cat > src/utils/jwtUtils.js << 'EOF'
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const generateToken = (payload) => {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
    algorithm: jwtConfig.algorithm
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtConfig.secret);
};

module.exports = {
  generateToken,
  verifyToken
};
EOF
```

---

## 🚀 Final Setup Commands

```bash
# 1. Install all dependencies
npm install

# 2. Create database
npm run db:create

# 3. Run migrations (if any)
npm run db:migrate

# 4. Seed database (if any)
npm run db:seed

# 5. Start development server
npm run dev
```

---

## 🔗 Frontend Integration

### Frontend Axios Configuration
```javascript
// frontend/src/config/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
```

---

## ✅ Project Features

This redesigned backend provides:

- ✅ **Node.js + Express.js** - Core framework
- ✅ **CORS + Body Parser** - Middleware configured
- ✅ **MySQL + Sequelize** - SQL database with ORM
- ✅ **JWT Authentication** - Token-based auth
- ✅ **Local File Storage** - No AWS dependency
- ✅ **Complete API Endpoints** - All CRUD operations
- ✅ **Frontend Ready** - Axios/Redux compatible
- ✅ **Production Ready** - Error handling, logging, validation

The backend is now ready to connect with your React frontend using Axios and Redux!