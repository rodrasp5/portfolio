import { Routes, Route, Navigate } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactRail from "./components/ContactRail";
import ProjectsProvider from "./components/ProjectsProvider";
import Home from "./pages/Home";
import SkillTreePage from "./pages/SkillTreePage";
import ProjectPage from "./pages/ProjectPage";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <ProjectsProvider>
      <ScrollToTop />
      <Navbar />
      <ContactRail />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skill-tree" element={<SkillTreePage />} />
        <Route path="/projetos/:slug" element={<ProjectPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </ProjectsProvider>
  );
}
