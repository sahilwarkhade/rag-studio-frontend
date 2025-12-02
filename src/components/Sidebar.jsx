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
  selectedDocument,
  uploading
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

          <label
            className={`cursor-pointer flex items-center justify-center gap-2 px-4 py-3 
  rounded-lg border border-white/10 backdrop-blur-xl text-sm font-medium 
  transition relative overflow-hidden

  ${
    uploading
      ? "bg-white/10 pointer-events-none"
      : "bg-white/5 hover:bg-white/10"
  }
  `}
          >
            {/* SHIMMER EFFECT */}
            {uploading && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite]"></span>
            )}

            {/* ICON / LOADING SPINNER */}
            {uploading ? (
              <svg
                className="w-4 h-4 animate-spin text-indigo-300"
                viewBox="0 0 24 24"
                fill="none"
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
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
                ></path>
              </svg>
            ) : (
              <Upload className="w-4 h-4 text-slate-200" />
            )}

            {/* LABEL */}
            <span className="text-slate-200">
              {uploading ? "Uploading..." : "Upload Documents"}
            </span>

            {/* HIDDEN INPUT */}
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.txt,.doc,.docx"
              disabled={uploading}
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
