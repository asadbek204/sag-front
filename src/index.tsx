import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { HomePage } from "./screens/HomePage";
import AboutSag from "./pages/AboutSag";
import Videos from "./pages/Videos";
import VideoDetail from "./pages/VideoDetail";
import Catalog from "./pages/Catalog";
import MethodSag from "./pages/MethodSag";
import CatalogProducts from "./pages/CatalogProducts";
import Sales from "./pages/Sales";
import ProductDetail from "./pages/ProductDetail";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about/" element={<AboutSag/>} />
          <Route path="videos/" element={<Videos/>} />
          <Route path="videos/:id" element={<VideoDetail/>} />
          <Route path="catalog/" element={<Catalog/>} />
          <Route path="catalog/:id" element={<CatalogProducts/>} />
          <Route path="methods/" element={<MethodSag/>} />
          <Route path="sales/" element={<Sales/>} />
          <Route path="product/:id" element={<ProductDetail/>}/>
        </Routes>
      </Router>
    </LanguageProvider>
  </StrictMode>,
);