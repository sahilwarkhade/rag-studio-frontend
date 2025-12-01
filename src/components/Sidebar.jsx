import { Upload, X, Sparkles } from "lucide-react";
import { DocumentCard } from "./DocumentCard";

export const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  documents,
  handleFileUpload,
  openDeleteModal,
  user,
  handleLogout,
  setSelectedDocument,
  selectedDocument
}) => {
  return (
    <aside
      className={`${
        sidebarOpen ? "w-72 sm:w-80" : "w-0"
      } flex-shrink-0 transition-[width] duration-300 overflow-hidden bg-[#0f1117]/90 border-r text-gray-100 border-white/10 backdrop-blur-lg`}
    >
      <div className="h-full flex flex-col">
        {/* TOP SECTION */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold">RAG Studio</h1>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-white/5 transition sm:hidden"
            >
              <X className="w-4 h-4 text-slate-300" />
            </button>
          </div>

          <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 transition rounded-lg backdrop-blur-xl text-sm font-medium">
            <Upload className="w-4 h-4" />
            <span>Upload Documents</span>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.txt,.doc,.docx"
            />
          </label>
        </div>

        {/* DOCUMENT LIST */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          <h2 className="text-[11px] uppercase tracking-widest text-slate-400 mb-2">
            Documents
          </h2>

          {documents.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-400 bg-white/5 border border-dashed border-white/10 rounded-xl">
              No documents uploaded
            </div>
          ) : (
            documents.map((doc) => (
              <DocumentCard
                key={doc?._id}
                doc={doc}
                setSelectedDocument={setSelectedDocument}
                openDeleteModal={openDeleteModal}
                selectedDocument={selectedDocument}
              />
            ))
          )}
        </div>

        {/* USER SECTION */}
        <div className="p-4 border-t border-white/10 bg-[#0f1117]/90 backdrop-blur-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center">
              {user?.avatar || user?.name?.[0] || "👤"}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="cursor-pointer w-full px-4 py-2 text-xs font-medium rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition flex items-center justify-center gap-2"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
