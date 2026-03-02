# IvonDebt — Customer & Debt Tracking

A self-hosted, open-source web application for tracking customer debts and supplier payables.

## Stack
- **Backend**: Node.js 20 + Express.js
- **Database**: MongoDB 7 (via Mongoose)
- **Frontend**: React 18 + Vite + Tailwind CSS

## Quick Start (Docker)

```bash
# 1. Build the frontend
cd frontend && npm install && npm run build && cd ..

# 2. Start all services
docker compose up --build
```

App available at: http://localhost:8000

## Development Mode

```bash
# Start MongoDB only
docker run -d -p 27017:27017 --name mongo mongo:7

# Backend (Terminal 1)
cd backend
cp .env.example .env
npm install
npm run dev

# Frontend (Terminal 2)
cd frontend
npm install
npm run dev
```

Frontend dev server: http://localhost:5173
Backend API: http://localhost:8000/api

## Project Structure

```
IvonDebt/
├── agents/          # Internal role definitions
├── backend/         # Node.js + Express API
├── frontend/        # React + Vite + Tailwind SPA
├── .github/         # GitHub Actions CI/CD
├── docker-compose.yml
└── docker-compose.staging.yml
```

## License
MIT
