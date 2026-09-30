import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import DevOpsCaseStudies from "./sections/DevOpsCaseStudies";
import DevOpsTimeline from "./sections/DevOpsTimeline";
import GitHubProjects from "./sections/GitHubProjects";
import Footer from "./components/NewFooter";
import ProjectModal from "./components/ProjectModal";
import { ProjectType } from "./types";
import { Toaster } from "react-hot-toast";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio);
        const currentSection = visibleSections[0]?.target.id;

        if (currentSection) {
          setActiveSection(currentSection);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
      window.requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "auto", block: "start" });
        setActiveSection(hash);
      });
    }

    return () => sectionObserver.disconnect();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* MAIN PORTFOLIO CONTENT - UNCOMMENTED */}
      <Layout activeSection={activeSection}>
        <Home />
        <About />
        <Skills />
        <Projects onProjectSelect={setSelectedProject} />
        <DevOpsCaseStudies />
        <DevOpsTimeline />
        <Experience />
        <Certifications />
        <Education />
        <GitHubProjects />
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