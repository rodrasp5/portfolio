import { Routes, Route, Navigate, useLocation } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactRail from "./components/ContactRail";
import ProjectsProvider from "./components/ProjectsProvider";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import SkillTreePage from "./pages/SkillTreePage";
import ProjectPage from "./pages/ProjectPage";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

export default function App() {
  const { pathname } = useLocation();
  const showFooter = !pathname.startsWith("/admin");

  return (
    <ProjectsProvider>
      <ScrollToTop />
      <div className="flex min-h-svh flex-col">
        <Navbar />
        <ContactRail />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skill-tree" element={<SkillTreePage />} />
            <Route path="/projetos/:slug" element={<ProjectPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        {showFooter && <Footer />}
      </div>
    </ProjectsProvider>
  );
}
