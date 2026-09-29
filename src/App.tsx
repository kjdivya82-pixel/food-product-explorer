import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { ProductsPage } from "./pages/ProductsPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;