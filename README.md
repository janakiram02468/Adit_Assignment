# Task Management App

Full-stack task management application built with **React.js** (frontend) and **Node.js + Express.js** (backend) with MongoDB and JWT authentication.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, Vite, React Router, Context API, CSS |
| Backend | Node.js, Express.js, MongoDB, Mongoose, JWT |
| Auth | bcryptjs, jsonwebtoken |
| Validation | express-validator |

## Project Structure

```
Adit-Assignment/
├── frontend/                 # React application
│   └── src/
│       ├── api/              # API client & endpoints
│       ├── components/       # Reusable UI components
│       ├── context/          # Auth & Theme context
│       ├── pages/            # Login, Signup, Dashboard
│       └── utils/            # Form validation helpers
│
└── backend/                  # Express API
    └── src/
        ├── config/           # Database connection
        ├── controllers/      # Request handlers
        ├── middleware/       # Auth, validation, errors
        ├── models/           # Mongoose schemas
        ├── routes/           # API routes
        ├── services/         # Business logic
        └── utils/            # Helpers
```

## Features

### Frontend
- User login & signup with validation
- Dashboard with all tasks
- Create, edit, delete tasks
- Mark tasks completed/pending
- Filter by All / Pending / Completed
- Search tasks
- Pagination
- Responsive UI (mobile + desktop)
- Dark mode toggle

### Backend
- JWT authentication
- Protected task routes
- CRUD APIs for tasks
- Input validation & error handling
- Role field on user model (extensible for RBAC)

## Prerequisites

- Node.js 18+
- MongoDB running locally (or MongoDB Atlas URI)

## Setup Instructions

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs at: `http://localhost:5000`

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

## Environment Variables

### Backend (`.env`)
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/taskmanager
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### Frontend (`.env`)
```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Tasks (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks?status=all&page=1&limit=10&search=` | List tasks |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| PATCH | `/api/tasks/:id/toggle` | Toggle status |
| DELETE | `/api/tasks/:id` | Delete task |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | API health check |

## Assumptions

- MongoDB is available locally at `mongodb://127.0.0.1:27017`
- Each user can only access their own tasks
- JWT token is stored in browser `localStorage`
- Deployment will be handled separately

## Scripts

### Backend
- `npm run dev` - Start with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

### Frontend
- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build
