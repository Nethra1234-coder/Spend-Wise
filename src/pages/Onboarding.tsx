import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, DollarSign, Target, CreditCard, Tag, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const STEPS = ["Income", "Budget Goals", "Debts", "Categories"];
const STEP_ICONS = [DollarSign, Target, CreditCard, Tag];

const DEFAULT_CATEGORIES = ["Groceries", "Dining", "Subscriptions", "Transport", "Entertainment", "Healthcare", "Shopping", "Utilities"];

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);

  // Income
  const [incomes, setIncomes] = useState([{ source: "Salary", amount: "" }]);

  // Budget goals
  const [goals, setGoals] = useState([
    { name: "Emergency Fund", target: "", priority: "high" },
    { name: "Reduce Dining", target: "", priority: "medium" },
  ]);

  // Debts
  const [debts, setDebts] = useState([{ name: "", balance: "", rate: "", minPayment: "" }]);

  // Categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Groceries", "Dining", "Subscriptions", "Transport"]);

  const next = () => {
    if (step < 3) setStep(step + 1);
    else {
      localStorage.setItem("spendwise_onboarded", "true");
      localStorage.setItem("spendwise_financial", JSON.stringify({ incomes, goals, debts, categories: selectedCategories }));
      toast({ title: "Setup complete!", description: "Welcome to your financial dashboard" });
      navigate("/dashboard");
    }
  };

  const prev = () => step > 0 && setStep(step - 1);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--gradient-hero)" }}>
      <div className="w-full max-w-2xl animate-fade-in">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((s, i) => {
            const Icon = STEP_ICONS[i];
            const active = i === step;
            const done = i < step;
            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${done ? "bg-primary text-primary-foreground" : active ? "bg-primary/20 text-primary glow-border" : "bg-secondary text-muted-foreground"}`}>
                  {done ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${active ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                {i < 3 && <div className={`flex-1 h-px mx-2 ${done ? "bg-primary" : "bg-border"}`} />}
              </div>
            );
          })}
        </div>

        <div className="glass-card p-8">
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">Income Sources</h2>
                <p className="text-sm text-muted-foreground mt-1">Add your regular income sources</p>
              </div>
              {incomes.map((inc, i) => (
                <div key={i} className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Source</Label>
                    <Input className="input-dark" placeholder="e.g. Salary" value={inc.source} onChange={(e) => { const n = [...incomes]; n[i].source = e.target.value; setIncomes(n); }} />
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly Amount ($)</Label>
                    <Input className="input-dark" type="number" placeholder="5000" value={inc.amount} onChange={(e) => { const n = [...incomes]; n[i].amount = e.target.value; setIncomes(n); }} />
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10" onClick={() => setIncomes([...incomes, { source: "", amount: "" }])}>
                + Add Income Source
              </Button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">Budget Goals</h2>
                <p className="text-sm text-muted-foreground mt-1">What are your financial objectives?</p>
              </div>
              {goals.map((g, i) => (
                <div key={i} className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Goal</Label>
                    <Input className="input-dark" placeholder="e.g. Emergency Fund" value={g.name} onChange={(e) => { const n = [...goals]; n[i].name = e.target.value; setGoals(n); }} />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Amount ($)</Label>
                    <Input className="input-dark" type="number" placeholder="10000" value={g.target} onChange={(e) => { const n = [...goals]; n[i].target = e.target.value; setGoals(n); }} />
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10" onClick={() => setGoals([...goals, { name: "", target: "", priority: "medium" }])}>
                + Add Goal
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">Existing Debts</h2>
                <p className="text-sm text-muted-foreground mt-1">Help us understand your debt obligations</p>
              </div>
              {debts.map((d, i) => (
                <div key={i} className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Debt Name</Label>
                    <Input className="input-dark" placeholder="e.g. Credit Card" value={d.name} onChange={(e) => { const n = [...debts]; n[i].name = e.target.value; setDebts(n); }} />
                  </div>
                  <div className="space-y-2">
                    <Label>Balance ($)</Label>
                    <Input className="input-dark" type="number" placeholder="2500" value={d.balance} onChange={(e) => { const n = [...debts]; n[i].balance = e.target.value; setDebts(n); }} />
                  </div>
                  <div className="space-y-2">
                    <Label>Interest Rate (%)</Label>
                    <Input className="input-dark" type="number" placeholder="18.5" value={d.rate} onChange={(e) => { const n = [...debts]; n[i].rate = e.target.value; setDebts(n); }} />
                  </div>
                  <div className="space-y-2">
                    <Label>Min. Payment ($)</Label>
                    <Input className="input-dark" type="number" placeholder="50" value={d.minPayment} onChange={(e) => { const n = [...debts]; n[i].minPayment = e.target.value; setDebts(n); }} />
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10" onClick={() => setDebts([...debts, { name: "", balance: "", rate: "", minPayment: "" }])}>
                + Add Debt
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold text-foreground">Spending Categories</h2>
                <p className="text-sm text-muted-foreground mt-1">Select the categories you want to track</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {DEFAULT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategories.includes(cat)
                        ? "bg-primary/20 text-primary border border-primary/40"
                        : "bg-secondary text-muted-foreground border border-border hover:border-primary/30"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button variant="ghost" onClick={prev} disabled={step === 0} className="text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button onClick={next} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {step === 3 ? "Complete Setup" : "Continue"} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
