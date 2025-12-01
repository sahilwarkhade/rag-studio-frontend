import { Send } from "lucide-react";

export const ChatInput = ({
  input,
  setInput,
  handleSendMessage,
  selectedDocument,
}) => {
  return (
    <footer className="flex-none px-3 sm:px-6 py-4 border-t border-white/10 bg-[#11121a]/95 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 rounded-2xl bg-[#0f1117]/70 border border-white/10 px-4 py-3 shadow-xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask a question..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          />

          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || !selectedDocument}
            className={`${
              input.trim() && selectedDocument
                ? "cursor-pointer"
                : "cursor-not-allowed"
            } px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-xs font-medium text-white disabled:opacity-50`}
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
