# Spend-Wise 💸

A family-focused expense tracker built with React and TypeScript. Spend-Wise helps households monitor income, log expenses by category, and visualise spending patterns through interactive charts — all in a fast, responsive interface.

---

## Features

- **Expense logging** — add, edit, and delete transactions with title, amount, and category
- **Category breakdown** — visualise spending across categories like Food, Transport, Utilities, and more
- **Income vs expense tracking** — see your net balance at a glance
- **Interactive charts** — spending trends rendered with Recharts
- **Family-oriented design** — built to track shared household budgets, not just individual spending
- **Optimised dev experience** — powered by Bun for 5–10x faster installs than npm

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Charts | Recharts |
| State | TanStack Query |
| Backend | Node.js (Express) |
| Runtime | Bun |

---

## Getting started

**Prerequisites:** [Bun](https://bun.sh/) (recommended) or Node.js 18+

```bash
# Clone the repo
git clone https://github.com/Nethra1234-coder/Spend-Wise.git
cd Spend-Wise

# Install dependencies
bun/npm install

# Start the frontend
bun/npm run dev
# → runs at http://localhost:8080

# Start the backend (separate terminal)
bun/npm run backend
# → runs at http://localhost:4000
```

---

## API reference

The backend exposes a minimal REST API (in-memory storage):

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/expenses` | List all expenses |
| POST | `/api/expenses` | Add a new expense |

Example:
```bash
curl -X POST http://localhost:4000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"title":"Groceries","amount":850,"category":"Food"}'
```

> Note: Data is stored in memory and resets on server restart. Persistent storage (SQLite/PostgreSQL) is on the roadmap.

---

## Project structure

```
Spend-Wise/
├── src/              # React frontend (components, pages, hooks)
├── backend/          # Node.js API server
├── public/           # Static assets
├── tailwind.config.ts
└── vite.config.ts
```

---

## Roadmap

- [ ] Persistent storage with SQLite
- [ ] Monthly budget limits with alerts
- [ ] Export transactions as CSV
- [ ] Multi-user support for families
- [ ] Dark mode toggle

---

## What I learned building this

- Structuring a full-stack TypeScript project with a separate frontend/backend
- Using TanStack Query for async state and cache management
- Building reusable chart components with Recharts
- Setting up shadcn/ui within a Vite + Tailwind project

---

## License

MIT © Nethra Vijayabaskar
