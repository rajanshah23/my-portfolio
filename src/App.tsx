// App.tsx - CORRECTED VERSION
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import Footer from "./components/NewFooter";
import ProjectModal from "./components/ProjectModal";
import { ProjectType } from "./types";
import { Toaster } from "react-hot-toast";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  // 🧩 DEBUG: This will help verify if the app and footer are being loaded correctly
  useEffect(() => {
    console.log("🔄 App component mounted");
    console.log("📁 Footer component path:", import.meta.url);
  }, []);

  // Handle scroll spy for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < 100) {
          current = section.getAttribute("id") || "";
        }
      });

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* MAIN PORTFOLIO CONTENT - UNCOMMENTED */}
      <Layout activeSection={activeSection}>
        <Home />
        <About />
        <Skills />
        <Projects onProjectSelect={setSelectedProject} />
        <Certifications />
        <Education />
        <Contact />
        <Footer />
      </Layout>

      <Toaster
        position="top-right"
        toastOptions={{
          className: "toast-container",
          success: { className: "toast-success" },
          error: { className: "toast-error" },
        }}
      />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default App;