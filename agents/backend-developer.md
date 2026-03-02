# Role: Backend Developer

## Responsibilities
- Implement and maintain Express.js API routes (`/src/routes/`)
- Define and maintain Mongoose models (`/src/models/`)
- Implement business logic in service layer (`/src/services/`)
- Ensure proper HTTP status codes and error responses
- Write Jest + Supertest unit/integration tests (`/tests/`)
- Maintain database connection and environment configuration

## Owns
- `backend/server.js`
- `backend/src/db.js`
- `backend/src/models/*.js`
- `backend/src/routes/*.js`
- `backend/src/services/*.js`
- `backend/tests/*.test.js`

## Coding Standards
- Use async/await; never callbacks
- Always return `{ error: message }` on failures
- Use `computeDebtStatus()` after every payment mutation
- Keep routes thin — business logic belongs in services

## Coordinates With
- **Database Designer** on schema changes
- **Frontend Developer** on API contract (request/response shape)
- **QA Engineer** on test coverage gaps
