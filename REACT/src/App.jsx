import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/accueil";
import History from "./pages/history";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <Toaster
        position="top-center"
        toastOptions={{
          // Style général
          style: {
            background: "#1e293b",
            color: "white",
            borderRadius: "10px",
            padding: "12px 16px",
            border: "1px solid #333",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },

          // Succès
          success: {
            iconTheme: {
              primary: "#22c55e", // vert
              secondary: "#111",
            },
          },

          // Erreurs
          error: {
            iconTheme: {
              primary: "#ef4444", // rouge
              secondary: "#111",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
