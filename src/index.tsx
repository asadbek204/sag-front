import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { HomePage } from "./screens/HomePage";
import AboutSag from "./pages/AboutSag";
import Videos from "./pages/Videos";
import VideoDetail from "./pages/VideoDetail";
import Catalog from "./pages/Catalog";

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

        </Routes>
      </Router>
    </LanguageProvider>
  </StrictMode>,
);