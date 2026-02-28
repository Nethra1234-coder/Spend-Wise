import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

const PORT = Number(process.env.PORT ?? 4000);

const expenses = [
  {
    id: randomUUID(),
    title: "Groceries",
    amount: 52.3,
    category: "Food",
    createdAt: new Date().toISOString(),
  },
];

const sendJson = (res, status, payload) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
};

const parseBody = (req) =>
  new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
    });

    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });

    req.on("error", reject);
  });

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/api/health") {
    sendJson(res, 200, { status: "ok", service: "spend-wise-backend" });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/expenses") {
    sendJson(res, 200, { data: expenses });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/expenses") {
    try {
      const body = await parseBody(req);
      const { title, amount, category = "General" } = body;

      if (typeof title !== "string" || title.trim() === "") {
        sendJson(res, 400, { error: "title is required" });
        return;
      }

      const parsedAmount = Number(amount);
      if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
        sendJson(res, 400, { error: "amount must be a positive number" });
        return;
      }

      const expense = {
        id: randomUUID(),
        title: title.trim(),
        amount: parsedAmount,
        category,
        createdAt: new Date().toISOString(),
      };

      expenses.unshift(expense);
      sendJson(res, 201, { data: expense });
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }

    return;
  }

  sendJson(res, 404, { error: "Route not found" });
});

server.listen(PORT, () => {
  console.log(`Spend-Wise backend running at http://localhost:${PORT}`);
});
