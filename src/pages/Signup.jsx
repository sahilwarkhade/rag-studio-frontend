import { ArrowLeft, Github, Sparkles } from "lucide-react";
import { OAuthButton } from "../components/OAuthButton";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const { loading, setLoading, register, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "Sahil Warkhade",
    email: "sahilwarkhade111@gmail.com",
    password: "123456",
  });

  const handleSubmit = async () => {
    if (formData.name && formData.email && formData.password) {
      setLoading(true);
      await register(formData, navigate);
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
          {/* Back button – aligned with form width */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="cursor-pointer inline-flex items-center gap-2 text-[11px] font-medium text-slate-400 hover:text-slate-200 transition pt-12"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to login</span>
          </button>

          {/* Logo + Heading */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-fuchsia-600 shadow-[0_0_30px_rgba(244,114,182,0.4)]">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-white tracking-tight">
                Create account
              </h1>
              <p className="text-sm text-slate-400">
                Join RAG Studio to start chatting with your documents.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-[#080a16] border border-white/10 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/60 focus:border-pink-500/80 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Email</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[#080a16] border border-white/10 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/60 focus:border-pink-500/80 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-20 rounded-xl bg-[#080a16] border border-white/10 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/60 focus:border-pink-500/80 transition"
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
              className={`cursor-pointer w-full mt-1 py-3 rounded-xl text-white text-sm font-medium shadow-lg shadow-pink-500/25 
    transition-transform transition-shadow
    bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-600
    flex items-center justify-center gap-2
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
                  Creating...
                </>
              ) : (
                "Create Account"
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
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-pink-400 hover:text-pink-300 font-medium transition"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>

      {/* RIGHT: BRAND PANEL */}
      <div className="hidden md:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/40 via-fuchsia-600/30 to-purple-700/40 opacity-70" />
        <div className="absolute inset-0 backdrop-blur-2xl" />
        <div className="absolute inset-0 px-16 flex flex-col justify-center gap-4">
          <h2 className="text-4xl lg:text-5xl font-semibold text-white leading-tight">
            Join <span className="text-pink-300">RAG Studio</span>
          </h2>
          <p className="text-sm lg:text-base text-slate-200/80 max-w-md leading-relaxed">
            Build an AI-assisted workflow around your documents with
            conversations that stay grounded in your data.
          </p>
        </div>
        <div className="absolute -bottom-24 -right-16 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-pink-600/40 to-indigo-600/40 blur-[130px] opacity-70" />
      </div>
    </div>
  );
};
