# ZipZag Jewelry Catalog - Backend API

A robust Node.js/Express backend API for the ZipZag Jewelry Catalog Management System, built with TypeScript, Prisma, and PostgreSQL.

## 🚀 Features

- **RESTful API** - Complete CRUD operations for all entities
- **Authentication & Authorization** - JWT-based auth with role-based access
- **Database Management** - Prisma ORM with PostgreSQL
- **File Upload** - Image handling with Cloudinary integration
- **Validation** - Zod schema validation for all inputs
- **Security** - Helmet, CORS, rate limiting, and security best practices
- **Logging** - Winston logger with file and console output
- **Type Safety** - Full TypeScript implementation

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **PostgreSQL** >= 14.0
- **Git**

## 🛠️ Installation & Setup

### 1. Clone and Navigate
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the example environment file and configure your settings:
```bash
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/zipzag_jewelry"

# JWT Secrets (Change these in production!)
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-token-secret"

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (for development)
npm run db:push

# OR run migrations (for production)
npm run db:migrate

# Seed the database with initial data
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/         # Data models and types
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── config/         # Configuration files
│   └── server.ts       # Main server file
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── seed.ts         # Database seeding
├── uploads/            # File uploads directory
├── logs/              # Application logs
├── .env               # Environment variables
└── package.json       # Dependencies and scripts
```

## 🛡️ API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout

### Admin Users
- `GET /api/admin-users` - Get all admin users
- `POST /api/admin-users` - Create admin user
- `GET /api/admin-users/:id` - Get admin user by ID
- `PUT /api/admin-users/:id` - Update admin user
- `DELETE /api/admin-users/:id` - Delete admin user

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `GET /api/categories/:id` - Get category by ID
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/:id/images` - Upload product images

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create customer
- `GET /api/customers/:id` - Get customer by ID
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Catalogs
- `GET /api/catalogs` - Get all catalogs
- `POST /api/catalogs` - Create catalog
- `GET /api/catalogs/:id` - Get catalog by ID
- `PUT /api/catalogs/:id` - Update catalog
- `DELETE /api/catalogs/:id` - Delete catalog

### Inquiries
- `GET /api/inquiries` - Get all inquiries
- `POST /api/inquiries` - Create inquiry
- `GET /api/inquiries/:id` - Get inquiry by ID
- `PUT /api/inquiries/:id` - Update inquiry
- `DELETE /api/inquiries/:id` - Delete inquiry

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🗄️ Database Schema

### Main Entities
- **AdminUser** - System administrators with role-based access
- **Category** - Product categories (rings, necklaces, etc.)
- **Product** - Jewelry items with pricing and details
- **ProductImage** - Product image storage and management
- **Customer** - Customer information and preferences
- **Catalog** - Personalized product collections for customers
- **CatalogProduct** - Many-to-many relationship between catalogs and products
- **Inquiry** - Customer inquiries and support requests

### Relationships
- Products belong to Categories (1:many)
- Products have multiple Images (1:many)
- Customers can have multiple Catalogs (1:many)
- Catalogs contain multiple Products through CatalogProduct (many:many)
- Customers can create multiple Inquiries (1:many)

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with nodemon
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio (database GUI)
npm run db:seed      # Seed database with initial data
npm run db:reset     # Reset database and run migrations

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm test            # Run tests (when implemented)
```

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Role-based Authorization** (Super Admin, Admin, Manager, Viewer)
- **Rate Limiting** to prevent API abuse
- **CORS Protection** with configurable origins
- **Helmet.js** for security headers
- **Input Validation** using Zod schemas
- **SQL Injection Protection** via Prisma ORM
- **File Upload Security** with type and size validation

## 🚀 Deployment

### Environment Variables for Production
Ensure these are set in production:
- Change `JWT_SECRET` and `JWT_REFRESH_SECRET` to strong, unique values
- Set `NODE_ENV=production`
- Configure proper `DATABASE_URL` for production database
- Set up Cloudinary credentials for image hosting
- Configure email settings for notifications

### Build and Deploy
```bash
npm run build
npm start
```

## 🧪 Testing

Testing setup is ready for implementation:
- Jest configuration included
- TypeScript support for tests
- Test scripts in package.json

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📞 Support

For support, please contact the development team or create an issue in the repository.

---

**Compatible with Frontend:** This backend is specifically designed to work with the ZipZag Jewelry Catalog React frontend application.