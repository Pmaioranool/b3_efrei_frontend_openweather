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
      {/* <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
      {/* <Toaster /> */}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
