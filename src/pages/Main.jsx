import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { uploadFile } from "../services/apis/uploadFile";
import { Sidebar } from "../components/Sidebar";
import { ChatHeader } from "../components/ChatHeader";
import { ChatInput } from "../components/ChatInput";
import { ChatMessage } from "../components/ChatMessage";
import { useNavigate } from "react-router-dom";
import {
  deleteDocument,
  getAllUserDocuments,
  getDocumentHistory,
} from "../services/apis/document";
import { DeleteModal } from "../components/DeleteModal";

export const MainPage = () => {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDocForDelete, setSelectedDocForDelete] = useState(null);

  const ws = useRef(null);
  const reconnectAttempt = useRef(0); // exponential backoff counter
  const heartbeat = useRef(null); // ping interval tracker

  const navigate = useNavigate();

  // -------------------------------------------------------
  // 🚀 Load Documents
  // -------------------------------------------------------
  const getDocs = async () => {
    await getAllUserDocuments(setDocuments);
  };

  const handleFileUpload = async (e) => {
    const files = [...e.target.files];
    const formData = new FormData();
    formData.append("file", files[0]);
    await uploadFile(formData);
    await getDocs();
  };

  const handleDeleteDoc = async (docId) => {
    const response = await deleteDocument(docId);
    if (response?.success) {
      if (docId === selectedDocument?.docId) setSelectedDocument(null);
      await getDocs();
    }
  };

  const openDeleteModal = (doc) => {
    setSelectedDocForDelete(doc);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    handleDeleteDoc(selectedDocForDelete._id);
    setDeleteModalOpen(false);
    setSelectedDocForDelete(null);
  };

  // -------------------------------------------------------
  // 🔥 WebSocket Connection with Exponential Backoff
  // -------------------------------------------------------
  const connectWebSocket = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.warn("No token available. Skipping WS connection.");
      return;
    }

    const wsURL = `ws://localhost:4000?token=${encodeURIComponent(token)}`;
    ws.current = new WebSocket(wsURL);

    ws.current.onopen = () => {
      console.log("✅ WS Connected");
      reconnectAttempt.current = 0;

      // Start heartbeat ping
      startHeartbeat();
    };

    ws.current.onmessage = (packet) => {
      const data = JSON.parse(packet.data);

      // --- STREAMING MESSAGE ---
      if (data.type === "content") {
        const decoded = atob(data.content);

        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];

          updated[updated.length - 1] = {
            ...last,
            content: (last.content || "") + decoded,
          };

          return updated;
        });
      }

      // --- CITATIONS AFTER STREAM ---
      if (data.type === "citations") {
        const decoded = JSON.parse(atob(data.content));

        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = {
            ...last,
            citations: decoded,
          };
          return updated;
        });
      }
    };

    ws.current.onclose = () => {
      console.warn("❌ WS Closed");

      stopHeartbeat();
      attemptReconnect(); // try backoff reconnect
    };

    ws.current.onerror = (err) => {
      console.error("⚠️ WS Error", err);
      ws.current.close();
    };
  };

  // -------------------------------------------------------
  // ♻️ Exponential Backoff Reconnection
  // -------------------------------------------------------
  const attemptReconnect = () => {
    const maxDelay = 30000; // 30 sec max backoff
    const delay = Math.min(1000 * 2 ** reconnectAttempt.current, maxDelay);

    console.log(`Reconnecting WS in ${delay / 1000}s...`);

    setTimeout(() => {
      reconnectAttempt.current++;
      connectWebSocket();
    }, delay);
  };

  // -------------------------------------------------------
  // 💓 Heartbeat Ping (Keeps WS Alive + Detect Dead Conn)
  // -------------------------------------------------------
  const startHeartbeat = () => {
    stopHeartbeat();
    heartbeat.current = setInterval(() => {
      if (ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ type: "ping" }));
      }
    }, 15000); // every 15 sec
  };

  const stopHeartbeat = () => {
    if (heartbeat.current) clearInterval(heartbeat.current);
  };

  // -------------------------------------------------------
  // 🌐 Global Function for Token Refresh to Reconnect WS
  // (Axios interceptor will call window.reconnectWS)
  // -------------------------------------------------------
  useEffect(() => {
    connectWebSocket();
    getDocs();
    window.reconnectWS = () => {
      console.log("♻️ WS reconnect triggered by token refresh");

      if (ws.current) ws.current.close();

      setTimeout(() => connectWebSocket(), 150);
    };
  }, []);

  const handleSendMessage = () => {
    if (!input.trim() || !selectedDocument) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);

    ws.current?.send(
      JSON.stringify({
        type: "query",
        content: input,
        docId: selectedDocument?.docId,
      })
    );

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    setInput("");
  };

  useEffect(() => {
    if (selectedDocument) {
      getDocumentHistory(selectedDocument?.docId, setMessages);
    }
  }, [selectedDocument]);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-screen flex overflow-hidden bg-[#0f1117]">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        documents={documents}
        handleFileUpload={handleFileUpload}
        handleDeleteDoc={handleDeleteDoc}
        user={user}
        handleLogout={logout}
        setSelectedDocument={setSelectedDocument}
        openDeleteModal={openDeleteModal}
        selectedDocument={selectedDocument}
      />

      <main className="flex-1 flex flex-col h-full">
        <ChatHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          fileName={selectedDocument?.fileName}
        />

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
          {selectedDocument &&
            messages?.map((msg, i) => (
              <ChatMessage
                key={i}
                message={msg}
                citations={msg?.citations || []}
              />
            ))}

          {!selectedDocument ? (
            <div className="h-full flex items-center justify-center text-slate-400">
              Select or upload a document to begin.
            </div>
          ) : (
            messages?.length === 0 && (
              <div className="h-full flex items-center justify-center text-slate-400">
                Start asking a question.
              </div>
            )
          )}
        </div>

        <ChatInput
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          selectedDocument={selectedDocument}
        />
      </main>

      {deleteModalOpen && (
        <DeleteModal
          open={deleteModalOpen}
          doc={selectedDocForDelete}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};
