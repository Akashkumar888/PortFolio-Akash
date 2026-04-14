import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

const App = () => (
  <>
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.8rem",
          letterSpacing: "0.05em",
        },
      }}
    />
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </MainLayout>
  </>
);

export default App;
