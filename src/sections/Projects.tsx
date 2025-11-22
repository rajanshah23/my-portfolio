import { useInView } from "../hooks/useInView";
import { ProjectType } from "../types";
import { Github, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const projects: ProjectType[] = [
  {
    id: "project1",
    title: "Theatre Booking System",
    description:
      "A modern and responsive frontend for an online theatre booking platform, designed to provide a seamless user experience for browsing shows, booking seats, making payments, and managing profile.",
    image: "/screenshots/Home.png",
    technologies: ["React", "Node.js", "PostgreSQL"],
    links: {
      github: "https://github.com/rajanshah23/frontend-Theatre-booking-system",
    },
    screenshots: [
      "/screenshots/Home.png",
      "/screenshots/FeaturedShow.png",
      "/screenshots/Stayupdated.png", 
      "/screenshots/Browseshow.png",
      "/screenshots/Mybooking.png",
      "/screenshots/Bookticket.png",
    ],
    features: [
      "Real-time seat availability tracking",
      "Secure payment integration with Khalti",
      "User authentication and profile management",
      "Booking history and reviews",
      "Admin dashboard for show and user management",
    ],
    technicalDetails: [
      "Frontend: React, Redux, Tailwind CSS",
      "Backend: Node.js, Express, Sequelize", 
      "Database: PostgreSQL (Supabase)",
      "Authentication: JWT + Supabase Auth",
      "Payment: Khalti API",
    ],
  },
  {
    id: "project2", 
    title: "Online shopping center",
    description:
      "Online Shopping Center is a full-stack e-commerce web application developed using the MERN stack (MongoDB, Express.js, React, Node.js). The platform provides a seamless online shopping experience with features like product browsing, search and filter, cart management, order processing, and secure user authentication.",
    image: "/screenshots/mernstack.png",
    technologies: ["MERN"],
    links: {
      github: "https://github.com/rajanshah23/MERN-Stack",
    },
    screenshots: [
      "/screenshots/mernstack.png", 
      "/screenshots/mern1.png", 
      "/screenshots/mern2.png"
    ],
  },
  {
    id: "project3",
    title: "PasteApp", 
    description:
      "A simple yet powerful Paste App built with React, Redux, and LocalStorage that lets you effortlessly create, edit, copy, and manage your text snippets in one place!",
    image: "/screenshots/paste1.png",
    technologies: ["React", "Redux", "Localstorage"],
    links: {
      github: "https://github.com/rajanshah23/PasteApp",
    },
    screenshots: [
      "/screenshots/paste1.png", 
      "/screenshots/paste2.png"
    ],
  },
  {
    id: "project4",
    title: "Currency Converter",
    description:
      "A Currency Converter web application that allows users to convert amounts from one currency to another using real-time exchange rates. This project fetches up-to-date currency exchange rates from a reliable API and provides an easy-to-use interface for quick currency conversions.",
    image: "/screenshots/Currency.png",
    technologies: ["Html", "CSS", "Javascript"],
    links: {
      github: "https://github.com/rajanshah23/Currency-Converter", 
    },
    screenshots: [
      "/screenshots/Currency.png"
    ],
  },
];

type ProjectsProps = {
  onProjectSelect: (project: ProjectType) => void;
};

const Projects = ({ onProjectSelect }: ProjectsProps) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [showAll, setShowAll] = useState(false);
  
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden" ref={ref}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl lg:text-4xl font-bold text-center mb-16  ${
              inView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            My Projects
          </h2>
          <p className={`text-gray-600 text-lg max-w-3xl mx-auto ${inView ? "animate-fade-in" : "opacity-0"}`} style={{ transitionDelay: '100ms' }}>
            Explore my portfolio of web applications, from e-commerce platforms to booking systems
          </p> 
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transform hover:-translate-y-3 transition-all duration-500 ${
                inView ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="relative overflow-hidden cursor-pointer h-56"
                onClick={() => onProjectSelect(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-white text-lg font-semibold block mb-2">
                      View Details
                    </span>
                    <ExternalLink className="w-6 h-6 text-white mx-auto" />
                  </div>
                </div>
                {/* Corner ribbon */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Featured
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100 hover:border-blue-300 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm font-medium"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live
                    </a>
                  )}
                  {project.links.playStore && (
                    <a
                      href={project.links.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Play Store
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced Show More/Less button */}
        {projects.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={handleToggle}
              className="group inline-flex items-center gap-2 px-8 py-3.5  bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium"
            >
              {showAll ? (
                <>
                  See Less Projects
                  <ChevronUp className="w-2 h-2 group-hover:-translate-y-1 transition-transform duration-300" />
                </>
              ) : (
                <>
                  See More Projects
                  <ChevronDown className="w-2 h-2 group-hover:translate-y-1 transition-transform duration-300" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Projects;