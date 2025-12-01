import { Menu } from "lucide-react";

export const ChatHeader = ({ sidebarOpen, setSidebarOpen, fileName }) => {
  return (
    <header className="flex-none px-4 sm:px-6 py-3 border-b border-white/10 bg-[#11121a]/95 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-white/5 transition sm:hidden"
        >
          <Menu className="w-4 h-4 text-slate-200" />
        </button>

        <div>
          <h2 className="text-sm sm:text-base font-semibold text-slate-100">
            Chat with your documents
          </h2>
          <p className="text-[11px] text-slate-400">
            {`Ask anything from your ${fileName ? fileName : "uploaded context"}.`}
          </p>
        </div>
      </div>
    </header>
  );
};
