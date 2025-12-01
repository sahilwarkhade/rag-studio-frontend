import { FileText, Trash2 } from "lucide-react";
import { formatFileSize } from "../utils/calculateFileSize";

export const DocumentCard = ({
  doc,
  selectedDocument,
  setSelectedDocument,
  openDeleteModal,
}) => {
  const handleClick = (e) => {
    if (e.target.closest("button")) return;
    if (selectedDocument?.docId === doc?._id) return;
    setSelectedDocument({ docId: doc?._id, fileName: doc?.fileName });
  };

  return (
    <div
      className="cursor-pointer group rounded-xl p-4 bg-[#11121a]/80 
      border border-white/10 backdrop-blur-lg hover:bg-[#141623]/90 
      transition flex justify-between items-start"
      onClick={handleClick}
    >
      <div className="flex gap-3 items-center">
        <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg">
          <FileText className="w-4 h-4 text-indigo-300" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-100 break-words">
            {doc?.fileName}
          </h3>
          <p className="text-[11px] text-slate-400">
            {formatFileSize(doc?.fileSize)}
          </p>
        </div>
      </div>

      <button
        onClick={() => openDeleteModal(doc)}
        className="cursor-pointer p-2 hover:bg-red-500/10 rounded-lg transition"
      >
        <Trash2 className="w-4 h-4 text-red-400" />
      </button>
    </div>
  );
};
