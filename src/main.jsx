import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          limit={3}
          toastClassName={() =>
            "pointer-events-auto relative flex items-center px-6 py-4 min-h-[44px] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.25)] backdrop-blur-md \
    bg-[#0f0f18]/80 border border-white/10 text-slate-200 animate-[fadeIn_0.25s_ease,slideIn_0.25s_ease]"
          }
          bodyClassName={() => "text-sm font-medium flex items-center gap-2"}
          progressClassName="bg-gradient-to-r from-pink-500 to-fuchsia-600 h-1 rounded-b-xl"
          style={{
            marginTop: "18px",
            marginRight: "18px",
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
