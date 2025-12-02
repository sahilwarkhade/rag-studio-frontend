import { Github, Sparkles } from "lucide-react";
import { OAuthButton } from "../components/OAuthButton";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { loading, setLoading, login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("sahilwarkhade111@gmail.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email && password) {
      setLoading(true);
      await login({ email, password }, navigate);
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    login({ name: "User", email: `user@${provider}.com`, avatar: "👤" });
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen h-screen w-full flex overflow-hidden bg-[#050712] text-slate-200">
      {/* LEFT: FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-16">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo + Heading */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 shadow-[0_0_30px_rgba(129,140,248,0.4)]">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-white tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-slate-400">
                Sign in to continue using RAG Studio
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Email</span>
              </label>
              <input
                type="email"
                value={email}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[#080a16] border border-white/10 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/80 transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Password</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-20 rounded-xl bg-[#080a16] border border-white/10 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/80 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-[11px] font-medium text-slate-400 hover:text-slate-200 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`
    w-full mt-1 py-3 rounded-xl text-white text-sm font-medium
    bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600
    shadow-lg shadow-indigo-500/25
    flex items-center justify-center gap-2
    transition-transform transition-shadow
    ${
      loading
        ? "opacity-70 cursor-not-allowed"
        : "hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
    }
  `}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-[#050712] text-[11px] text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* OAuth */}
          <div className="space-y-3">
            <OAuthButton
              provider="Google"
              icon={() => <span className="text-xl">🔍</span>}
              onClick={() => handleOAuth("google")}
            />
            <OAuthButton
              provider="GitHub"
              icon={Github}
              onClick={() => handleOAuth("github")}
            />
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="cursor-pointer text-indigo-400 hover:text-indigo-300 font-medium transition"
            >
              Create one
            </button>
          </p>
        </div>
      </div>

      {/* RIGHT: BRAND PANEL */}
      <div className="hidden md:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-purple-700/30 to-fuchsia-700/40 opacity-70" />
        <div className="absolute inset-0 backdrop-blur-2xl" />
        <div className="absolute inset-0 px-16 flex flex-col justify-center gap-4">
          <h2 className="text-4xl lg:text-5xl font-semibold text-white leading-tight">
            RAG <span className="text-indigo-300">Studio</span>
          </h2>
          <p className="text-sm lg:text-base text-slate-200/80 max-w-md leading-relaxed">
            An AI-native workspace to converse with your documents, derive
            insights, and accelerate decision-making.
          </p>
        </div>
        <div className="absolute -bottom-24 -right-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-fuchsia-500/40 to-indigo-500/40 blur-[130px] opacity-70" />
      </div>
    </div>
  );
};
