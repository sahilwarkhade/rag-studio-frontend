import { X, Trash2 } from "lucide-react";

export const DeleteModal = ({ open, onClose, onConfirm, doc }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 
      bg-black/60 backdrop-blur-sm fade-in"
    >
      {/* Modal Container */}
      <div
        className="w-full max-w-sm bg-[#0f1117]/90 border border-white/10 
        rounded-2xl backdrop-blur-xl shadow-2xl scale-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 className="text-slate-200 font-semibold text-sm">
            Delete Document
          </h3>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3">
          <p className="text-slate-300 text-sm">
            Are you sure you want to delete:
          </p>

          <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
            <p className="text-slate-200 text-sm break-words">
              {doc?.fileName}
            </p>
          </div>

          <p className="text-slate-400 text-xs">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 flex justify-end gap-3 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-300 
            hover:bg-white/10 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs 
            font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white 
            shadow hover:from-red-600 hover:to-red-700 transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
