# Node Express Boilerplate

A **quick-start Node.js + Express boilerplate** featuring MongoDB integration, JWT authentication, role-based access control, and advanced logging with Winston. Perfect for building scalable REST APIs.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Logging](#logging)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Node.js + Express REST API boilerplate
- MongoDB database integration (Mongoose)
- JWT authentication with refresh tokens & token rotation
- Role-based access control
- Request & error logging using **Winston**
- Input validation using `Joi`
- Centralized error handling
- Environment-based configuration

---

## Prerequisites

- Node.js `v22` or higher
- npm `>=9.0.0`
- MongoDB (local or Atlas)

---

## Installation

1. **Clone the repository**

```bash
git clone <repo-url>
cd node-express-boilerplate

```
2. **Install dependencies**

Install dependencies

npm install


3. **Set up environment variables**

Create a .env file in the root directory:

4. **Start MongoDB locally (if using local DB)**

brew services start mongodb/brew/mongodb-community@7.0

PORT=5000
MONGO_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7d
LOG_LEVEL=info


5. **Run the server**

npm run dev


