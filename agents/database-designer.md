# Role: Database Designer

## Responsibilities
- Define and maintain Mongoose schemas (`/src/models/`)
- Establish indexing strategy for query performance
- Ensure embedded vs. referenced document decisions are justified
- Maintain data integrity rules (required fields, enums, min values)

## Owns
- Schema definitions in `backend/src/models/*.js`
- Index recommendations (added via `schema.index()`)

## Current Schema Decisions
| Decision | Rationale |
|----------|-----------|
| Payments embedded in Debt | Payments are always read with their parent debt; embedding avoids extra queries |
| Contact as separate collection | Contacts are reused across many debts; referencing avoids duplication |
| `remainingBalance` stored explicitly | Avoids recomputing on every read; updated atomically on payment events |

## Recommended Indexes
```js
// Add to Debt model after schema definition
debtSchema.index({ contactId: 1 });
debtSchema.index({ status: 1 });
debtSchema.index({ dueDate: 1, status: 1 });
```

## Coordinates With
- **Backend Developer** on schema changes and migration strategy
