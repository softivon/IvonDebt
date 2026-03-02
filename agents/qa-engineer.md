# Role: QA Engineer

## Responsibilities
- Write and maintain Jest + Supertest API tests (`backend/tests/`)
- Define and execute UI smoke test scenarios
- Validate edge cases: zero balance, overdue logic, payment > balance rejection
- Review PRs for untested logic paths

## Owns
- `backend/tests/*.test.js`

## Key Test Scenarios

### API (Jest + Supertest)
| Scenario | Expected |
|----------|----------|
| POST /api/contacts with valid data | 201, contact returned |
| POST /api/contacts missing name | 400, error message |
| POST /api/debts with valid data | 201, status = open |
| POST payment > remaining balance | 400, rejected |
| POST payment = remaining balance | 201, status = settled |
| GET /api/reports/summary | 200, correct totals |
| GET /api/reports/overdue | 200, only overdue debts |

### UI Smoke Tests (manual)
- Add a contact → appears in list
- Create a debt → appears in Debts page and Dashboard totals update
- Record partial payment → status changes to `partial`
- Record full payment → status changes to `settled`
- Create debt with past due date → status = `overdue`, Dashboard badge appears

## Coordinates With
- **Backend Developer** on bug fixes
- **Frontend Developer** on UI regression scenarios
