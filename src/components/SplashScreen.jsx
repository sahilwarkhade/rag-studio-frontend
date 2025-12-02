import { Sparkles } from "lucide-react";

export const SplashScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0f1117]">
      {/* Glow Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 blur-3xl" />

      {/* LOGO */}
      <div
        className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 
           backdrop-blur-xl flex items-center justify-center shadow-xl animate-pulse"
      >
        <Sparkles className="w-10 h-10 text-indigo-300" />
      </div>

      {/* APP NAME */}
      <h1 className="mt-6 text-xl font-semibold text-slate-200 tracking-wide">
        RAG Studio
      </h1>

      {/* Sub text */}
      <p className="text-slate-400 text-xs mt-1">Loading your workspace...</p>

      {/* Animated loading dots */}
      <div className="flex gap-1 mt-4">
        <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.2s]"></span>
        <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.1s]"></span>
        <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"></span>
      </div>
    </div>
  );
};
