import { Menu } from "lucide-react";

export const ChatHeader = ({ sidebarOpen, setSidebarOpen, fileName }) => {
  return (
    <header
      className="flex-none px-4 sm:px-6 py-3 border-b border-white/10 bg-[#11121a]/95 
      backdrop-blur-xl sticky top-0 z-30"
    >
      <div className="max-w-5xl mx-auto flex items-center gap-3">
        {/* Sidebar Toggle - Mobile Only */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-white/5 transition sm:hidden flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-slate-200" />
        </button>

        {/* Title + Document Info */}
        <div className="flex flex-col min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-slate-100 leading-tight">
            Chat with your documents
          </h2>

          {/* Responsive subtitle */}
          <p
            className="text-[11px] sm:text-xs text-slate-400 text-wrap max-w-[200px] sm:max-w-full"
            title={fileName || "uploaded context"}
          >
            Ask anything from your{" "}
            {fileName ? (
              <span className="text-slate-300">{fileName}</span>
            ) : (
              "uploaded context"
            )}
            .
          </p>
        </div>
      </div>
    </header>
  );
};
