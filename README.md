# Retail Demand System - Backend Setup

## Backend Structure

```
backend/
├── index.js                 # Main server entry point
├── config.js               # Configuration variables
├── package.json            # Dependencies
├── .env                    # Environment variables
├── .env.example           # Example environment file
├── models/
│   └── User.js            # MongoDB User schema
├── controllers/
│   └── authController.js  # Login/Register logic
├── routes/
│   └── auth.js            # Auth API routes
└── middleware/
    └── auth.js            # JWT token creation
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
The `.env` file is pre-configured with local MongoDB. For production:
- Change `JWT_SECRET` to a strong random string
- Update `MONGODB_URI` to your MongoDB Atlas connection string

### 3. Start MongoDB (if using locally)
```bash
# Windows
mongod

# Mac/Linux
brew services start mongodb-community
```

### 4. Run the Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:5000`

## API Endpoints

### Register
- **POST** `/api/auth/register`
- Body: `{ name, email, password, confirmPassword }`
- Returns: JWT token + user data

### Login
- **POST** `/api/auth/login`
- Body: `{ email, password }`
- Returns: JWT token + user data

### Update Shop Details
- **POST** `/api/auth/update-shop`
- Body: `{ email, shopName, shopType }`
- Returns: Updated user data

### Get User Profile
- **GET** `/api/auth/user/:id`
- Returns: User profile data

### Health Check
- **GET** `/api/health`
- Returns: Server status

## Features

✅ User Registration with password validation
✅ User Login with JWT tokens
✅ Password hashing with bcryptjs
✅ MongoDB integration
✅ CORS enabled for frontend (port 5173)
✅ Error handling middleware
✅ Shop details management

## Frontend Integration

The backend is configured for CORS with your frontend running on `http://localhost:5173`.

Example API calls from frontend:
```javascript
// Register
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password, confirmPassword })
});

// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

Store the JWT token in localStorage and use it for authenticated requests.
