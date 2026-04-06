# OMVIK Heritage Real Estate - Backend

This is the backend for the OMVIK Heritage Real Estate platform, built with Express, Node.js, and MongoDB.

## Features

- **Authentication**: JWT-based registration and login.
- **User Management**: Profile retrieval and updates, admin-only user listing.
- **Contact System**: Public contact form submission and admin-only management.
- **Security**: Password hashing with bcrypt, protected routes with JWT, and role-based access control.
- **Error Handling**: Centralized error middleware for consistent API responses.

## Tech Stack

- **Node.js**: Runtime environment.
- **Express**: Web framework.
- **MongoDB**: Database (using Mongoose ODM).
- **JWT**: For secure authentication.
- **dotenv**: Environment variable management.

## Directory Structure

```
backend/
├── config/             # Database and environment configurations
├── controllers/        # Request handling logic
├── models/             # Mongoose schemas
├── routes/             # API endpoint definitions
├── middleware/         # Custom Express middleware (auth, error)
├── utils/              # Helper functions (token generation)
├── .env                # Environment variables (not tracked in git)
├── server.js           # Main application entry point
└── package.json        # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB (local or Atlas)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the `backend` root and add your configurations (see `.env` template in `server.js` or `config/env.js`).

### Running the Server

- Development mode:
  ```bash
  npm run dev
  ```
- Production mode:
  ```bash
  npm start
  ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token

### Users
- `GET /api/users/profile` - Get current user profile (Protected)
- `PUT /api/users/profile` - Update profile (Protected)
- `GET /api/users` - Get all users (Admin only)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (Admin only)
- `PUT /api/contact/:id` - Update status (Admin only)
