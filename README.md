# SUIMC App – Docker Deployment Guide

This project consists of 3 containers:
- **frontend** (React)
- **backend** (Node.js + Prisma)
- **database** (PostgreSQL)

All services are started with a single command via `docker-compose.yml`.

---

## 1. Requirements

- Docker Desktop (or Docker Engine)
- Docker Compose

To verify installation:
```bash
docker --version
docker compose version
```

---

## 2. Initial Setup (Build + Run)

In the project root directory:
```bash
docker compose up --build
```

This command:
- Builds the frontend and backend images
- Starts the PostgreSQL container
- Applies Prisma migrations
- Brings up all services

To run in the background:
```bash
docker compose up -d --build
```

---

## 3️. Restarting Without Code Changes

If no code changes were made, there is no need to rebuild:
```bash
docker compose up
```

In the background:
```bash
docker compose up -d
```

---

## 4️. Stopping Containers
```bash
# Shut down and remove containers
docker compose down

# Only stop containers
docker compose stop

# Start stopped containers again
docker compose start
```

---

## 5️. Viewing Logs
```bash
# All service logs
docker compose logs -f

# Backend only
docker compose logs -f backend

# Database only
docker compose logs -f db
```

---

## 6️. Service URLs

| Service  | URL                        |
|----------|----------------------------|
| Frontend | http://localhost:3000      |
| Backend  | http://localhost:3001      |
| Database | localhost:5432 (optional)  |

> API tests should be made through the backend port.

---

## 7️. Database Access

### 7.1 Connecting to the Database
```bash
docker compose exec db psql -U appuser -d appdb
```

### 7.2 Listing Tables
```sql
\dt
```

### 7.3 Example: First 5 Records from the User Table
```sql
SELECT * FROM "User" LIMIT 5;
```

> If the Prisma model name is capitalized, the table name must be quoted as `"User"`.

To exit:
```sql
\q
```

---

## 8️. Resetting the Database

To remove all containers and database data:
```bash
docker compose down -v
```

> Migrations will be re-applied automatically on the next startup.

---

## 9️. API Endpoint Tests

### 9.1 Health Check
```
GET http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "ok",
  "environment": "production",
  "timestamp": "2026-02-25T11:56:55.441Z"
}
```

---

### 9.2 Register
```
POST http://localhost:3001/api/auth/register
```

Request body (JSON):
```json
{
  "username": "simay.karakis",
  "password": "testPassword",
  "firstName": "Simay",
  "lastName": "Karakis",
  "primaryEmail": "simay.karakis@example.com",
  "secondaryEmail": null,
  "userLevel": "ADMIN"
}
```

Expected response `201 Created`:
```json
{
  "user": {
        "id": 1,
        "username": "simay.karakis",
        ...
  },
  "accessToken": "JWT_TOKEN",
  "refreshToken": "REFRESH_TOKEN"
}
```

---

### 9.3 Login
```
POST http://localhost:3001/api/auth/login
```

Request body (JSON):
```json
{
  "username": "simay.karakis",
  "password": "testPassword"
}
```

Response:
```json
{
  "user": { "...": "..." },
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

### 9.4 Get Current User (Authenticated)
```
GET http://localhost:3001/api/auth/me
```

Header:
```
Authorization: Bearer <accessToken>
```

Response:
```json
{
  "user": {
    "id": 1,
    "username": "simay.karakis",
    ...
  }
}
```
