import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
        toast({ title: "Welcome back! ✨" });
        navigate("/dashboard");
      } else {
        await signUp(email, password, fullName);
        toast({ title: "Account created! 🎉", description: "Please check your email to verify your account." });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <Sparkles className="h-6 w-6 text-peach" />
          <span className="font-display text-2xl font-semibold">Momentra</span>
        </Link>

        <div className="glass-strong rounded-3xl p-8">
          <h1 className="text-2xl font-bold text-center mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-8">
            {isLogin ? "Sign in to manage your events" : "Join us and start planning your dream event"}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                <input
                  type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-peach/40 transition-shadow"
                  placeholder="Your full name"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-peach/40 transition-shadow"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-peach/40 transition-shadow pr-10"
                  placeholder="••••••••" minLength={6}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="mt-2 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.97] disabled:opacity-50">
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-semibold hover:underline">
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
