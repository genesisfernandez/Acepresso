import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [focused, setFocused] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user, response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response?.data && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-[#6D6A61] font-mono text-xs tracking-widest uppercase animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]"
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Corner marks */}
      {[
        "top-8 left-8",
        "top-8 right-8 rotate-90",
        "bottom-8 left-8 -rotate-90",
        "bottom-8 right-8 rotate-180",
      ].map((pos, i) => (
        <div key={i} className={`absolute w-10 h-10 ${pos}`}>
          <div className="absolute top-0 left-0 w-full h-px bg-green-500/50" />
          <div className="absolute top-0 left-0 w-px h-full bg-green-500/50" />
        </div>
      ))}

      {/* Card */}
      <div
        className="relative z-10 w-[420px] px-12 py-13 bg-[#0f0f0f]/95 border border-white/[0.07]"
        style={{
          boxShadow: "0 0 0 1px rgba(34,197,94,0.05), 0 40px 80px rgba(0,0,0,0.6)",
          animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
          padding: "52px 48px",
        }}
      >
        {/* Eyebrow */}
        <p
          className="text-center text-2xl italic uppercase text-green-500/70 mb-3"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Electronic Management System
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-white/[0.03] mb-11" />

        {/* Heading row */}
        <div className="flex justify-between items-center mb-4">
          <h1
            className="text-[42px] font-light leading-[1.05] text-[#f0ece4] tracking-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Log
            <br />
            <em className="italic text-green-500/90">in.</em>
          </h1>
          <img
            src="/kapeCo-logo.jpg"
            alt="Logo"
            className="w-[85px] h-[85px] rounded-full object-cover border border-green-500/25 shrink-0"
          />
        </div>

        {/* Short accent divider */}
        <div
          className="w-8 h-px mb-11"
          style={{
            background: "linear-gradient(90deg, rgba(34,197,94,0.6), transparent)",
          }}
        />

        {/* Error */}
        {error && (
          <p className="text-red-400 text-xs tracking-wider mb-4 font-mono">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className={`block text-[9px] tracking-[0.25em] uppercase mb-2 transition-colors duration-200 ${
                focused === "email"
                  ? "text-green-500/80"
                  : "text-white/30"
              }`}
            >
              Email address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                required
                className="w-full bg-white/[0.03] border border-white/[0.08] text-[#f0ece4] text-[13px] font-light px-4 py-[14px] outline-none transition-all duration-200 placeholder:text-white/15 focus:border-green-500/40 focus:bg-green-500/[0.03]"
                style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.03em" }}
              />
              {/* Animated bottom accent */}
              <div
                className="absolute bottom-0 left-0 h-px transition-all duration-[400ms] ease-out"
                style={{
                  width: focused === "email" ? "100%" : "0%",
                  background: "linear-gradient(90deg, rgba(34,197,94,0.8), transparent)",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className={`block text-[9px] tracking-[0.25em] uppercase mb-2 transition-colors duration-200 ${
                focused === "password"
                  ? "text-green-500/80"
                  : "text-white/30"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                required
                className="w-full bg-white/[0.03] border border-white/[0.08] text-[#f0ece4] text-[13px] font-light px-4 py-[14px] pr-16 outline-none transition-all duration-200 placeholder:text-white/15 focus:border-green-500/40 focus:bg-green-500/[0.03]"
                style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.03em" }}
              />
              <div
                className="absolute bottom-0 left-0 h-px transition-all duration-[400ms] ease-out"
                style={{
                  width: focused === "password" ? "100%" : "0%",
                  background: "linear-gradient(90deg, rgba(34,197,94,0.8), transparent)",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-white/25 text-[9px] tracking-[0.15em] uppercase cursor-pointer transition-colors duration-200 hover:text-green-500/70 px-1"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {showPassword ? "hide" : "show"}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div className="text-right mb-8 -mt-2">
            
            <a  href="#"
              className="text-[9px] tracking-[0.2em] uppercase text-white/20 no-underline transition-colors duration-200 hover:text-green-500/60"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-green-500/90 text-[#0a0a0a] text-[10px] font-medium tracking-[0.3em] uppercase cursor-pointer relative overflow-hidden transition-all duration-200 hover:bg-green-500 border-none"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Log in
          </button>
        </form>
      </div>

      {/* Tagline */}
      <p
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.25em] uppercase text-white/10 whitespace-nowrap"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        Secure Access Portal
      </p>

      {/* fadeUp keyframe */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Login;