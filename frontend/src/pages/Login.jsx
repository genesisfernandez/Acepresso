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
  const [isLogin, setIsLogin] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  const backgroundImages = [
    "/login-background.jpg",
    "/login-background2.jpg",
    "/login-background3.jpg",
    "/login-background4.jpg",
    "/login-background5.jpg",
  ];
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
    
    if (isLogin) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email, password },
        );
        if (response.data.success) {
          login(response.data.user, response.data.token);
        }
      } catch (error) {
        if (error.response?.data && !error.response.data.success) {
          setError(error.response.data.error);
        } else {
          setError("Server Error");
        }
      }
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/signup",
          { email, password },
        );
        if (response.data.success) {
          login(response.data.user, response.data.token);
        }
      } catch (error) {
        if (error.response?.data && !error.response.data.success) {
          setError(error.response.data.error);
        } else {
          setError("Server Error");
        }
      }
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFocused(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020202]">
        <p className="text-sm tracking-widest uppercase animate-pulse font-[DM_Mono] text-[#6D6A61]">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex overflow-hidden font-[DM_Mono] bg-[#020202] text-[#F7F8E5]">
      {/* ── LEFT PANEL ── 60% width, HIDDEN on tablet & below */}
      <div className="hidden lg:flex lg:w-[60%] relative flex-col justify-between overflow-hidden bg-[#232D23] border-r border-[#F7F8E5]/7 p-10 lg:p-12">
        {/* Sliding Background Images */}
        <div className="absolute inset-0">
          {backgroundImages.map((imgSrc, index) => (
            <img
              key={imgSrc}
              src={imgSrc}
              alt="Login background"
              className={`w-full h-full object-cover transition-all duration-1000 ease-in-out absolute inset-0 ${
                index === currentBgIndex
                  ? "opacity-30 scale-105"
                  : "opacity-0 scale-95"
              } mix-blend-overlay`}
            />
          ))}
        </div>

        {/* Noise Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-12 text-center px-8">
          <div className="flex items-center justify-center">
            <div
              className="relative flex items-center justify-center rounded-full font-[Cormorant_Garamond] italic"
              style={{
                width: 250,
                height: 250,
                border: "1px solid rgba(247,248,229,0.2)",
                background: "rgba(247,248,229,0.05)",
              }}
            >
              <img
                src="/Acepresso-logo-light.png"
                alt="Acepresso"
                className="max-w-[80%] max-h-[80%] object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <h1
              className="font-[Cormorant_Garamond] text-6xl md:text-7xl lg:text-8xl font-normal leading-tight tracking-[-0.02em]"
              style={{ lineHeight: 0.92 }}
            >
              Coffee with
              <br />
              <em className="italic text-[#F7F8E5]/45">purpose.</em>
            </h1>
            <p className="uppercase text-base md:text-lg tracking-[0.18em] text-[#6D6A61]/70 leading-[2.2] max-w-md">
              Brewed Like An Ace
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full bg-[#F7F8E5] opacity-35 animate-pulse"
            style={{ animationDuration: "3s" }}
          />
          <span className="uppercase text-xs tracking-[0.2em] text-[#6D6A61]/50">
            All systems operational
          </span>
        </div>
      </div>

      {/* ── RIGHT PANEL ── Full width on tablet & below, 40% on desktop */}
      <div className="flex-1 lg:w-[40%] w-full relative flex flex-col justify-center p-8 md:p-12 lg:p-14 bg-[#020202]">
        {/* Right panel effects - adjusted for full width on mobile */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />
        <div
          className="absolute pointer-events-none w-[300px] h-[300px] lg:w-[420px] lg:h-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(35,45,35,0.5) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
        {/* Right panel decorative elements - ADD z-index */}
        {[
          { className: "top-5 right-5 rotate-90 z-10" },
          { className: "bottom-5 right-5 rotate-180 z-10" },
        ].map((c, i) => (
          <div key={i} className={`absolute w-3.5 h-3.5 ${c.className}`}>
            <div className="absolute top-0 left-0 w-full h-px bg-[#F7F8E5]/12" />
            <div className="absolute top-0 left-0 h-full w-px bg-[#F7F8E5]/12" />
          </div>
        ))}

        {/* Dynamic Form - full width centered on mobile */}
        <div className="relative z-10 w-full max-w-md lg:max-w-sm mx-auto px-4 animate-fade-up">
          <p className="uppercase text-xs tracking-[0.32em] text-[#6D6A61]/50 mb-2.5">
            {isLogin ? "Secure access" : "Create account"}
          </p>
          <h2 className="font-[Cormorant_Garamond] text-2xl md:text-3xl lg:text-4xl font-normal mb-1 tracking-[-0.01em]">
            {isLogin ? "Welcome back." : "Hello there."}
          </h2>
          <p className="text-sm tracking-[0.14em] text-[#6D6A61]/45 mb-9">
            {isLogin 
              ? "Sign in to your account to continue" 
              : "Create your Acepresso account"
            }
          </p>

          <div className="w-7 h-px mb-8 bg-gradient-to-r from-[#F7F8E5]/50 to-transparent" />

          {error && (
            <div className="text-xs tracking-[0.1em] text-[#c97b7b] mb-4 pl-2.5 py-1.5 border-l border-[#c97b7b]/35 bg-[#c97b7b]/4 font-[DM_Mono]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className={`block text-xs uppercase tracking-[0.28em] mb-2 transition-colors ${
                  focused === "email"
                    ? "text-[#F7F8E5]/60"
                    : "text-[#6D6A61]/45"
                }`}
              >
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="acepresso@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  required
                  className="w-full bg-transparent border-0 border-b-2 p-3 md:p-2.5 outline-none transition-all duration-300 font-[DM_Mono] text-lg font-light tracking-[0.04em] rounded-b-lg border-[#F7F8E5]/25 focus:border-[#F7F8E5]/25 focus:rounded-b-lg"
                />
                <div
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#F7F8E5]/60 to-transparent transition-all duration-[450ms] rounded-b-full"
                  style={{
                    width: focused === "email" ? "100%" : "0%",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className={`block text-xs uppercase tracking-[0.28em] mb-2 transition-colors ${
                  focused === "password"
                    ? "text-[#F7F8E5]/60"
                    : "text-[#6D6A61]/45"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <div className="relative flex items-center bg-[#020202]/50 px-3 py-2.5 border-b-2 border-[#F7F8E5]/25 rounded-b-lg focus-within:border-[#F7F8E5]/25 focus-within:rounded-b-lg transition-all duration-300">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="•••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    required
                    className="flex-1 bg-transparent border-0 p-0 outline-none font-[DM_Mono] text-lg font-light tracking-[0.04em] text-[#F7F8E5]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-2 py-1 bg-[#232D23]/50 border border-[#F7F8E5]/20 rounded-md text-xs uppercase tracking-[0.15em] font-[DM_Mono] font-light text-[#6D6A61]/50 hover:text-[#F7F8E5]/70 hover:bg-[#232D23]/70 transition-all duration-200 cursor-pointer whitespace-nowrap ml-2"
                  >
                    {showPassword ? "hide" : "show"}
                  </button>
                </div>
                <div
                  className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#F7F8E5]/60 to-transparent transition-all duration-[450ms] rounded-b-full -mt-px"
                  style={{
                    width: focused === "password" ? "100%" : "0%",
                  }}
                />
              </div>
            </div>

            {/* Confirm Password */}
            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className={`block text-xs uppercase tracking-[0.28em] mb-2 transition-colors ${
                    focused === "confirmPassword"
                      ? "text-[#F7F8E5]/60"
                      : "text-[#6D6A61]/45"
                  }`}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="•••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocused("confirmPassword")}
                    onBlur={() => setFocused(null)}
                    required
                    className="w-full bg-transparent border-0 border-b-2 p-3 md:p-2.5 outline-none transition-all duration-300 font-[DM_Mono] text-lg font-light tracking-[0.04em] rounded-b-lg border-[#F7F8E5]/25 focus:border-[#F7F8E5]/25 focus:rounded-b-lg"
                  />
                  <div
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#F7F8E5]/60 to-transparent transition-all duration-[450ms] rounded-b-full"
                    style={{
                      width: focused === "confirmPassword" ? "100%" : "0%",
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between items-center py-1.5 mb-8">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="appearance-none w-3 h-3 border border-[#F7F8E5]/12 bg-transparent rounded-sm cursor-pointer relative
                    checked:bg-[#232D23]/80 checked:border-[#F7F8E5]/30"
                />
                <span className="uppercase text-xs tracking-[0.15em] text-[#6D6A61]/30">
                  {isLogin ? "Remember me" : "Agree to terms"}
                </span>
              </label>
              {isLogin ? (
                <a
                  href="#"
                  className="uppercase text-xs tracking-[0.15em] text-[#6D6A61]/25 hover:text-[#F7F8E5]/45 transition-colors no-underline"
                >
                  Forgot password?
                </a>
              ) : (
                <a
                  href="#"
                  className="uppercase text-xs tracking-[0.15em] text-[#6D6A61]/25 hover:text-[#F7F8E5]/45 transition-colors no-underline"
                >
                  Terms & Privacy
                </a>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="flex-1 uppercase relative overflow-hidden py-3.5 px-4 bg-[#232D23] border border-[#F7F8E5]/10 
                  font-[DM_Mono] text-sm font-medium tracking-[0.32em] hover:bg-[#2e3d2e] hover:border-[#F7F8E5]/18 
                  transition-all duration-200 cursor-pointer"
              >
                {isLogin ? "Log in" : "Create Account"}
              </button>
              <div className="flex items-center justify-center w-9 h-9 border border-[#F7F8E5]/8 text-[#6D6A61]/40 text-lg shrink-0">
                →
              </div>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-[#F7F8E5]/10 text-center">
            <button
              type="button"
              onClick={toggleForm}
              className="uppercase text-sm tracking-[0.2em] text-[#6D6A61]/40 hover:text-[#F7F8E5]/60 transition-colors duration-200 font-[DM_Mono] bg-transparent border-none cursor-pointer"
            >
              {isLogin 
                ? "No account? Click here to sign up" 
                : "Have account? Click here to log in"
              }
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        input[type="checkbox"]:checked::after {
          content: "";
          position: absolute;
          top: 1px;
          left: 1px;
          width: 4px;
          height: 7px;
          border-right: 1px solid #f7f8e5;
          border-bottom: 1px solid #f7f8e5;
          transform: rotate(40deg);
        }

        /* Mobile optimizations */
        @media (max-width: 1023px) {
          /* Form takes full screen height and centers perfectly */
          .flex-1 {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;