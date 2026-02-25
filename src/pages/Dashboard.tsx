import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp, TrendingDown, DollarSign, PiggyBank, CreditCard,
  Target, ArrowUpRight, ArrowDownRight, LogOut, Sparkles, Plus, Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const SPENDING_DATA = [
  { month: "Jan", spending: 3200, income: 5000, savings: 1800 },
  { month: "Feb", spending: 2800, income: 5000, savings: 2200 },
  { month: "Mar", spending: 3500, income: 5200, savings: 1700 },
  { month: "Apr", spending: 2600, income: 5000, savings: 2400 },
  { month: "May", spending: 3100, income: 5500, savings: 2400 },
  { month: "Jun", spending: 2900, income: 5000, savings: 2100 },
];

const CATEGORY_DATA = [
  { name: "Groceries", value: 680, color: "hsl(152, 60%, 48%)" },
  { name: "Dining", value: 420, color: "hsl(38, 92%, 50%)" },
  { name: "Transport", value: 310, color: "hsl(210, 80%, 55%)" },
  { name: "Subscriptions", value: 180, color: "hsl(280, 60%, 55%)" },
  { name: "Shopping", value: 520, color: "hsl(0, 72%, 55%)" },
  { name: "Utilities", value: 290, color: "hsl(180, 50%, 45%)" },
];

const WEEKLY_DATA = [
  { day: "Mon", amount: 85 }, { day: "Tue", amount: 120 },
  { day: "Wed", amount: 45 }, { day: "Thu", amount: 200 },
  { day: "Fri", amount: 310 }, { day: "Sat", amount: 180 },
  { day: "Sun", amount: 95 },
];

const AI_INSIGHTS = [
  { text: "You're spending 23% more on dining this month. Consider meal prepping to save ~$150/mo.", type: "warning" as const },
  { text: "Great job! Your savings rate improved by 8% compared to last month.", type: "success" as const },
  { text: "Subscription costs have increased by $35. Review unused subscriptions.", type: "warning" as const },
  { text: "At this rate, you'll reach your Emergency Fund goal in 4 months.", type: "success" as const },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [salaryInput, setSalaryInput] = useState("");
  const [salaryCredited, setSalaryCredited] = useState(false);

  const user = useMemo(() => {
    const raw = localStorage.getItem("spendwise_user");
    return raw ? JSON.parse(raw) : { name: "User" };
  }, []);

  const financial = useMemo(() => {
    const raw = localStorage.getItem("spendwise_financial");
    return raw ? JSON.parse(raw) : { incomes: [], goals: [], debts: [], categories: [] };
  }, []);

  const totalIncome = salaryCredited ? parseFloat(salaryInput) || 5000 : 5000;
  const totalExpenses = 2900;
  const totalSavings = totalIncome - totalExpenses;
  const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(1);

  const handleCreditSalary = () => {
    if (salaryInput) {
      setSalaryCredited(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("spendwise_user");
    localStorage.removeItem("spendwise_onboarded");
    localStorage.removeItem("spendwise_financial");
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Wallet className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-display font-bold gradient-text">Spend Wise</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Hello, <span className="text-foreground font-medium">{user.name}</span></span>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Salary Credit Section */}
        {!salaryCredited && (
          <div className="glass-card p-6 glow-border animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">Credit This Month's Salary</h3>
                <p className="text-sm text-muted-foreground">Enter the amount credited to your bank account</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Input
                type="number"
                className="input-dark max-w-xs"
                placeholder="Enter salary amount"
                value={salaryInput}
                onChange={(e) => setSalaryInput(e.target.value)}
              />
              <Button onClick={handleCreditSalary} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Credit Salary
              </Button>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard icon={<DollarSign />} label="Total Income" value={`$${totalIncome.toLocaleString()}`} change="+3.2%" positive />
          <KpiCard icon={<CreditCard />} label="Total Expenses" value={`$${totalExpenses.toLocaleString()}`} change="-6.5%" positive />
          <KpiCard icon={<PiggyBank />} label="Savings" value={`$${totalSavings.toLocaleString()}`} change={`${savingsRate}%`} positive />
          <KpiCard icon={<Target />} label="Goals Progress" value="67%" change="On track" positive />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spending Trend */}
          <div className="lg:col-span-2 glass-card p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">Income vs Spending Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={SPENDING_DATA}>
                <defs>
                  <linearGradient id="gradientIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(152, 60%, 48%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(152, 60%, 48%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradientSpending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(0, 72%, 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 25%, 18%)" />
                <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 25%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
                <Area type="monotone" dataKey="income" stroke="hsl(152, 60%, 48%)" fill="url(#gradientIncome)" strokeWidth={2} />
                <Area type="monotone" dataKey="spending" stroke="hsl(0, 72%, 55%)" fill="url(#gradientSpending)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown */}
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">Spending by Category</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {CATEGORY_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 25%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {CATEGORY_DATA.slice(0, 4).map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-muted-foreground">{cat.name}</span>
                  </div>
                  <span className="text-foreground font-medium">${cat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Spending */}
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">This Week's Spending</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={WEEKLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 25%, 18%)" />
                <XAxis dataKey="day" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 25%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 96%)" }} />
                <Bar dataKey="amount" fill="hsl(152, 60%, 48%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* AI Insights */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">AI Insights</h3>
            </div>
            <div className="space-y-3">
              {AI_INSIGHTS.map((insight, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border text-sm ${
                    insight.type === "success"
                      ? "bg-primary/5 border-primary/20 text-foreground"
                      : "bg-warning/5 border-warning/20 text-foreground"
                  }`}
                >
                  {insight.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Goals Progress */}
        <div className="glass-card p-6">
          <h3 className="font-display font-semibold text-foreground mb-4">Savings Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GoalCard name="Emergency Fund" current={6700} target={10000} />
            <GoalCard name="Vacation" current={1200} target={3000} />
            <GoalCard name="New Laptop" current={800} target={1500} />
          </div>
        </div>
      </main>
    </div>
  );
};

const KpiCard = ({ icon, label, value, change, positive }: { icon: React.ReactNode; label: string; value: string; change: string; positive: boolean }) => (
  <div className="glass-card p-5 hover:border-primary/20 transition-colors">
    <div className="flex items-center justify-between mb-3">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
      <span className={`flex items-center gap-1 text-xs font-medium ${positive ? "text-primary" : "text-destructive"}`}>
        {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </span>
    </div>
    <p className="text-2xl font-display font-bold text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground mt-1">{label}</p>
  </div>
);

const GoalCard = ({ name, current, target }: { name: string; current: number; target: number }) => {
  const pct = Math.round((current / target) * 100);
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-sm text-primary font-medium">{pct}%</span>
      </div>
      <Progress value={pct} className="h-2 bg-secondary [&>div]:bg-primary" />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>${current.toLocaleString()}</span>
        <span>${target.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Dashboard;
