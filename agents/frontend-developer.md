# Role: Frontend Developer

## Responsibilities
- Implement React pages and components (`/src/pages/`, `/src/components/`)
- Maintain Axios API client (`/src/api/client.js`)
- Manage global state via AppContext (`/src/context/AppContext.jsx`)
- Ensure fully responsive layouts using Tailwind CSS
- Ensure all pages work correctly on mobile browsers

## Owns
- `frontend/src/**`
- `frontend/index.html`
- `frontend/vite.config.js`
- `frontend/tailwind.config.js`

## Coding Standards
- Use functional components and hooks only (no class components)
- All API calls go through `/src/api/client.js` — never call axios directly in pages
- Call `refreshSummary()` from AppContext after any debt or payment mutation
- Use Tailwind utility classes; no custom CSS unless unavoidable

## Coordinates With
- **Backend Developer** on API contract
- **QA Engineer** on UI smoke test scenarios
