import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff } from "lucide-react";

const VALID_USERS = [
  { username: "bpfadmin", password: "Tothetop2026!" },
  { username: "ceezadmin", password: "Tothetop2026!" },
  { username: "jazadmin", password: "Tothetop2026!" },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const user = VALID_USERS.find(
        u => u.username === username.toLowerCase().trim() && u.password === password
      );
      if (user) {
        sessionStorage.setItem("bpf-auth", "true");
        sessionStorage.setItem("bpf-user", user.username);
        // Log activity
        const log = JSON.parse(sessionStorage.getItem("bpf-activity") || "[]");
        log.push({ user: user.username, action: "Logged in", time: new Date().toISOString() });
        sessionStorage.setItem("bpf-activity", JSON.stringify(log));
        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="/images/bpf-logo.png"
            alt="Black Picket Fence"
            className="h-14 mx-auto mb-6"
          />
          <h1 className="font-heading text-2xl text-foreground mb-2">CREATOR LOGIN</h1>
          <p className="text-muted-foreground text-sm">
            Access the production dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full pl-10 pr-4 py-3 bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none text-sm"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-3 bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none text-sm"
            />
          </div>

          {error && (
            <p className="text-primary text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full font-heading tracking-wider py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm disabled:opacity-50"
          >
            {loading ? "AUTHENTICATING..." : "LOGIN"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-muted-foreground text-xs hover:text-primary transition-colors"
          >
            ← Back to site
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
