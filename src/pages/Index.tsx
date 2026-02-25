import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, Zap, Sparkles, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-primary" />
          <span className="text-xl font-display font-bold gradient-text">Spend Wise</span>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => navigate("/login")}>
            Sign In
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => navigate("/signup")}>
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          AI-Powered Financial Intelligence
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Know the{" "}
          <span className="gradient-text">real cost</span>
          <br />
          of every purchase
        </h1>
        <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Spend Wise instantly shows how each spending decision impacts your bills, savings goals, and overall financial stability — powered by AI trend analysis.
        </p>
        <div className="flex gap-4 justify-center mt-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 px-8 animate-pulse-glow" onClick={() => navigate("/signup")}>
            Start Free <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Smart Trend Analysis"
            description="AI analyzes your spending patterns across all categories and predicts future expenses to keep you on track."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6" />}
            title="Financial Stability Score"
            description="Know exactly how each purchase impacts your financial health with a real-time stability metric."
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Optimized Spending Plans"
            description="Get personalized AI recommendations for allocating your leftover income toward savings and goals."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="glass-card p-6 hover:border-primary/20 transition-all group">
    <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary/20 transition-colors">
      {icon}
    </div>
    <h3 className="font-display font-semibold text-foreground text-lg mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

export default Index;
