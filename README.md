# Node Express Boilerplate

A **quick-start Node.js + Express boilerplate** featuring MongoDB integration, JWT authentication, role-based access control, and advanced logging with Winston. Perfect for building scalable REST APIs.

---

## Table of Contents

- [Node Express Boilerplate](#node-express-boilerplate)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Scripts](#scripts)
  - [API Endpoints](#api-endpoints)
    - [Auth](#auth)
    - [Admin](#admin)
    - [Health](#health)
    - [Request correlation](#request-correlation)

---

## Features

- Node.js + Express REST API boilerplate
- MongoDB database integration (Mongoose)
- JWT authentication with refresh tokens & token rotation
- Role-based access control
- Request & error logging using **Winston**
- Input validation (middleware-based)
- Centralized error handling
- Environment-based configuration
- Request correlation IDs via `X-Request-Id`
- Health check endpoint (`/api/health`)

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

```bash
npm install
```


3. **Set up environment variables**

Create a `.env` file in the root directory (see [Environment Variables](#environment-variables)).

4. **Start MongoDB locally (if using local DB)**

brew services start mongodb/brew/mongodb-community@7.0


5. **Run the server**

```bash
npm run dev
```

---

## Environment Variables

```bash
PORT=5000
DB_TYPE=mongo # or: postgres

MONGO_URI=mongodb://localhost:27017/mydb

# PostgreSQL (only needed if DB_TYPE=postgres)
PG_HOST=localhost
PG_USER=postgres
PG_PASSWORD=postgres
PG_DATABASE=mydb
PG_PORT=5432

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m
REFRESH_EXPIRES_DAYS=7
SALT_ROUNDS=10
LOG_LEVEL=info
```

---

## Scripts

- `npm run dev` — start server with nodemon
- `npm start` — start server
- `npm run lint` — run eslint

---

## API Endpoints

### Auth

- `POST /api/auth/signup` — Create account (validated)
- `POST /api/auth/login` — Login (validated)
- `POST /api/auth/refresh-token` — Rotate refresh token (validated)
- `POST /api/auth/revoke-token` — Revoke refresh token (validated)

### Admin

- `GET /api/admin/dashboard` — Admin-only route (requires `Authorization: Bearer <accessToken>`)

### Health

- `GET /api/health` — Health check (returns `status`, `uptimeSeconds`, `timestamp`, `requestId`)

### Request correlation

Every response includes `X-Request-Id`. You can also send your own `X-Request-Id` header and the server will echo it back.


