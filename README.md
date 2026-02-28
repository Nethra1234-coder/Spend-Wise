# Spend Wise

Spend Wise is a modern personal finance and spending tracker built for speed and clarity. It helps you monitor your income, track expenses, and visualize your savings goals with a premium, responsive interface.

## ⚡ Quick Start

This project is optimized for **Bun**. We recommend using Bun for the fastest installation and development experience.

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- Alternatively, Node.js and npm/pnpm.

### Setup

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd spend-smartly-main
   ```

2. **Install dependencies:**
   ```sh
   bun install
   ```

3. **Start the development server:**
   ```sh
   bun run dev
   ```

The application will be available at `http://localhost:8080`.

## 🛠️ Technology Stack

- **Framework:** [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **State Management:** [TanStack Query](https://tanstack.com/query/latest)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Optimization Info

This project includes specific optimizations for high-performance development:
- **Bun Engine:** 5-10x faster installation than npm.
- **Vite Pre-bundling:** Heavy libraries like `lucide-react` and `recharts` are pre-bundled to ensure instant HMR.
- **Server Warmup:** Core application routes are pre-transformed on server start for zero-lag initial load.

## 📝 License

This project is open-source and available under the MIT License.

## 🧱 Starter Backend (Node.js)

A minimal backend starter is included in `backend/server.js`.

### Run backend

```sh
bun run backend
```

or with Node:

```sh
node backend/server.js
```

Server runs on `http://localhost:4000` by default.

### Available API routes

- `GET /api/health` → health check
- `GET /api/expenses` → list expenses (in-memory)
- `POST /api/expenses` → create expense

Example request:

```sh
curl -X POST http://localhost:4000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"title":"Coffee","amount":4.5,"category":"Food"}'
```

> Note: This is intentionally starter-stage. Data is stored in memory and resets when the server restarts.
