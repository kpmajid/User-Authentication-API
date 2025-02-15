# User Authentication API

A RESTful API built with Express.js and MongoDB that handles user authentication and user search functionality.

## Features

- User registration with validation
- User authentication using JWT
- Protected user search endpoint
- Data persistence using MongoDB
- Input validation and error handling

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing

## API Endpoints

### Authentication Routes

#### POST /api/auth/register

Register a new user with the following required fields:

- username (3-20 characters)
- email (valid email format)
- password (min 8 characters)
- fullName
- gender (male/female/other)
- dateOfBirth
- country

#### POST /api/auth/login

Login with registered credentials:

- email
- password

Returns a JWT token for authentication.

### Protected Routes

#### GET /api/user/search

Search users by username or email (requires JWT token)
Query parameters:

- username (optional)
- email (optional)

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install dependencies

```bash
cd <project-directory>
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server

```bash
npm run dev
```

## Project Structure

```
├── config/
│   ├── auth.config.js
│   └── db.config.js
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middlewares/
│   ├── authJwt.js
│   └── validateRegister.js
├── models/
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
├── server.js
└── package.json
```

## Data Validation

- Username must be 3-20 characters long
- Email must be in valid format
- Password must be at least 8 characters long
- All fields are required for registration
- Gender must be either 'male', 'female', or 'other'

## Security Features

- Passwords are hashed using bcrypt
- JWT authentication for protected routes
- Input validation and sanitization
- HTTP-only cookies for JWT storage
