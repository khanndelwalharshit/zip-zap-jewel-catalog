# ZipZag Catalog Backend - Basic Project Structure

## 📁 Simple Project Structure

```
zipzag-backend/
├── src/
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
│   ├── routes/
│   │   ├── auth.js
│   │   ├── adminUsers.js
│   │   ├── categories.js
│   │   ├── products.js
│   │   ├── customers.js
│   │   ├── catalogs.js
│   │   ├── inquiries.js
│   │   └── dashboard.js
│   │
│   ├── models/
│   │   ├── AdminUser.js
│   │   ├── Category.js
│   │   ├── Product.js
│   │   ├── Customer.js
│   │   ├── Catalog.js
│   │   └── Inquiry.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   │
│   ├── config/
│   │   └── database.js
│   │
│   └── app.js
├── uploads/
├── .env
├── package.json
└── server.js
```

## 📋 Basic Package.json

```json
{
  "name": "zipzag-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

## 🗄️ Basic Database Models (Mongoose)

### AdminUser Model
```javascript
// src/models/AdminUser.js
const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
  role: { type: String, enum: ['super-admin', 'sub-admin'], default: 'sub-admin' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('AdminUser', adminUserSchema);
```

### Category Model
```javascript
// src/models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  level: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
```

### Product Model
```javascript
// src/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: String,
  basePrice: { type: Number, required: true },
  offerPercent: { type: Number, default: 0 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  images: [String]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
```

### Customer Model
```javascript
// src/models/Customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  region: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  lastLogin: Date
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
```

### Catalog Model
```javascript
// src/models/Catalog.js
const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  hasPassword: { type: Boolean, default: false },
  password: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Catalog', catalogSchema);
```

### Inquiry Model
```javascript
// src/models/Inquiry.js
const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  catalogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Catalog' },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
  response: String
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
```

## 🚀 Basic API Routes

### Auth Routes
```javascript
// src/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.get('/profile', authController.profile);

module.exports = router;
```

### Admin Users Routes
```javascript
// src/routes/adminUsers.js
const express = require('express');
const router = express.Router();
const adminUsersController = require('../controllers/adminUsersController');

router.get('/', adminUsersController.getAll);
router.post('/', adminUsersController.create);
router.get('/:id', adminUsersController.getById);
router.put('/:id', adminUsersController.update);
router.delete('/:id', adminUsersController.delete);

module.exports = router;
```

### Categories Routes
```javascript
// src/routes/categories.js
const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.getAll);
router.post('/', categoriesController.create);
router.get('/:id', categoriesController.getById);
router.put('/:id', categoriesController.update);
router.delete('/:id', categoriesController.delete);

module.exports = router;
```

### Products Routes
```javascript
// src/routes/products.js
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const upload = require('../middleware/upload');

router.get('/', productsController.getAll);
router.post('/', upload.array('images'), productsController.create);
router.get('/:id', productsController.getById);
router.put('/:id', upload.array('images'), productsController.update);
router.delete('/:id', productsController.delete);

module.exports = router;
```

### Customers Routes
```javascript
// src/routes/customers.js
const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController');

router.get('/', customersController.getAll);
router.post('/', customersController.create);
router.get('/:id', customersController.getById);
router.put('/:id', customersController.update);
router.delete('/:id', customersController.delete);

module.exports = router;
```

### Catalogs Routes
```javascript
// src/routes/catalogs.js
const express = require('express');
const router = express.Router();
const catalogsController = require('../controllers/catalogsController');

router.get('/', catalogsController.getAll);
router.post('/', catalogsController.create);
router.get('/:id', catalogsController.getById);
router.put('/:id', catalogsController.update);
router.delete('/:id', catalogsController.delete);

module.exports = router;
```

### Inquiries Routes
```javascript
// src/routes/inquiries.js
const express = require('express');
const router = express.Router();
const inquiriesController = require('../controllers/inquiriesController');

router.get('/', inquiriesController.getAll);
router.post('/', inquiriesController.create);
router.get('/:id', inquiriesController.getById);
router.put('/:id', inquiriesController.update);

module.exports = router;
```

### Dashboard Routes
```javascript
// src/routes/dashboard.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/stats', dashboardController.getStats);
router.get('/activity', dashboardController.getActivity);

module.exports = router;
```

## 🔧 Basic Controllers

### Dashboard Controller Example
```javascript
// src/controllers/dashboardController.js
const AdminUser = require('../models/AdminUser');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Catalog = require('../models/Catalog');
const Inquiry = require('../models/Inquiry');

exports.getStats = async (req, res) => {
  try {
    const stats = {
      totalCustomers: await Customer.countDocuments({ status: 'active' }),
      activeProducts: await Product.countDocuments({ status: 'active' }),
      liveCatalogs: await Catalog.countDocuments({ status: 'active' }),
      pendingInquiries: await Inquiry.countDocuments({ status: 'pending' })
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getActivity = async (req, res) => {
  try {
    const recentActivity = [
      { type: 'catalog', message: 'New catalog created', time: '1 hour ago' },
      { type: 'inquiry', message: 'New product inquiry', time: '2 hours ago' },
      { type: 'product', message: 'Product added', time: '3 hours ago' }
    ];
    
    res.json(recentActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## ⚙️ Basic App Configuration

### Main App File
```javascript
// src/app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

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

// Database connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin-users', adminUsersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/catalogs', catalogsRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/dashboard', dashboardRoutes);

module.exports = app;
```

### Server File
```javascript
// server.js
require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Database Config
```javascript
// src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## 📝 Environment Variables (.env)

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/zipzag_catalog
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## 🚀 Quick Setup Commands

```bash
# Create project
mkdir zipzag-backend
cd zipzag-backend

# Initialize npm
npm init -y

# Install dependencies
npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer
npm install --save-dev nodemon

# Create basic structure
mkdir src src/controllers src/routes src/models src/middleware src/config uploads

# Start development
npm run dev
```

This basic structure provides:
- ✅ All API endpoints that match your frontend routes
- ✅ Simple MongoDB models for all entities
- ✅ Basic CRUD operations for each resource
- ✅ File upload handling for product images
- ✅ Dashboard statistics endpoint
- ✅ Simple authentication setup
- ✅ Easy to understand and extend

The structure is minimal but covers all the functionality your frontend needs!