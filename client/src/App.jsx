import Home from "./pages/Home";
import Background from "./components/Background";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Background />

      <ErrorBoundary>
        <Home />
      </ErrorBoundary>

      {/* Toasts styled to match the design system */}
      <Toaster
        position="top-right"
        gutter={10}
        toastOptions={{
          duration: 2600,
          style: {
            background: "rgba(15, 18, 24, 0.85)",
            backdropFilter: "blur(12px)",
            color: "#f4f4f5",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "0.875rem",
            boxShadow: "0 12px 40px -12px rgba(0,0,0,0.8)",
            fontSize: "0.875rem",
            padding: "10px 14px",
          },
          success: {
            iconTheme: { primary: "#818cf8", secondary: "#0f1218" },
          },
          error: {
            iconTheme: { primary: "#f87171", secondary: "#0f1218" },
          },
        }}
      />
    </>
  );
}

export default App;
