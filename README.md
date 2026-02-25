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
