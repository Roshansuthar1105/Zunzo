# <img src="/client/public/logo.png" alt="Logo : Zunzo" height="35" /> Zunzo - Everything You Need, One Click Away


## Overview

Zunzo is a full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a seamless shopping experience with features for customers, sellers, and administrators.

## 🚀 Live Demo

Check out the live demo: [Zunzo - Everything You Need, One Click Away](http://zunzo.netlify.app)
## Features

### Customer Features
- User authentication (register, login)
- Browse products by category
- Product search and filtering
- Product details view
- Shopping cart functionality
- Checkout process
- Order history
- User profile management
- Contact form

### Seller Features
- Seller dashboard
- Product management (add, edit, delete)
- Order management

### Admin Features
- Admin dashboard
- User management
- Product oversight
- Contact message management

## Tech Stack

### Frontend
- React 19
- React Router v6
- React Query (TanStack Query)
- Tailwind CSS 4
- React Hot Toast
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt.js for password hashing
- Zod for validation

## Project Structure

```
Zunzo/
├── client/                 # Frontend React application
│   ├── public/             # Public assets
│   ├── src/                # Source files
│   │   ├── components/     # Reusable components
│   │   ├── context/        # Context providers
│   │   ├── pages/          # Page components
│   │   │   ├── admin/      # Admin pages
│   │   │   └── seller/     # Seller pages
│   │   └── ...
├── server/                 # Backend Node.js/Express application
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Express middlewares
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── utils/              # Utility functions
│   ├── validators/         # Validation schemas
│   └── server.js           # Entry point
└── ...
```

## Installation

### Prerequisites
- Node.js (v16.20.1 or higher)
- MongoDB

### Setup

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd Zunzo
   ```

2. Install dependencies
   ```bash
   # Install root dependencies (if any)
   npm install

   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Environment Variables

   Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   FRONTEND_URI=http://localhost:5173
   ```

## Running the Application

1. Start the backend server
   ```bash
   cd server
   npm run server
   ```

2. Start the frontend development server
   ```bash
   cd client
   npm run dev
   ```

3. Access the application
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Add a new product (protected)

### Orders
- `GET /api/orders` - Get user orders (protected)
- `POST /api/orders` - Create a new order (protected)

### Contact
- `POST /api/contact` - Submit a contact form

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/contacts` - Get all contact submissions (admin only)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

