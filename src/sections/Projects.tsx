import { useInView } from "../hooks/useInView";
import { ProjectType } from "../types";
import { Github, ExternalLink } from "lucide-react";
import { useState } from "react";

type ProjectWithDetails = ProjectType;

const projects: ProjectWithDetails[] = [
  {
    id: "wordpress-cicd",
    category: "DevOps",
    title: "WordPress DevOps CI/CD Pipeline",
    description:
      "Built and run in a personal lab environment. End-to-end deployment automation for WordPress using Docker, Kubernetes (k3s), GitHub Actions, Helm, Prometheus, and Ansible on an AlmaLinux 9 VM.",
    image: "/screenshots/wordpress-cicd/main.png",
    technologies: [
      "AlmaLinux 9",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Helm",
      "Prometheus",
      "Grafana",
      "Ansible",
    ],
    links: {
      github: "https://github.com/rajanshah23/wordpress-docker-cicd",
      live: null,
    },
    screenshots: [
      "/screenshots/wordpress-cicd/pipeline.png",
      "/screenshots/wordpress-cicd/kubectl.png",
      "/screenshots/wordpress-cicd/wordpress.png",
      "/screenshots/wordpress-cicd/grafana.png",
    ],
    screenshotCaptions: ["GitHub Actions pipeline", "k3s workload view", "WordPress frontend", "Grafana dashboard"],
    detailedDescription: [
      "Built an AlmaLinux 9 VM in VirtualBox (2 GB RAM) with static IP networking, a non-root sudo user, and an XFS secondary disk mounted via /etc/fstab.",
      "Containerized WordPress and MySQL with Docker Compose, using named volumes and a custom Docker network.",
      "Configured a self-hosted GitHub Actions runner as a systemd service; the workflow deploys the stack on every push to main, with credentials in GitHub Secrets.",
      "Deployed to k3s with kubectl and manifests (Namespace, Secret, ConfigMap, PV/PVC, Deployments, Services, Traefik Ingress) and a CPU-based HPA scaling WordPress from 1 to 3 replicas via Metrics Server.",
      "Created a reusable Helm chart and installed kube-prometheus-stack for Prometheus and Grafana monitoring.",
      "Wrote an Ansible playbook with roles (common, Docker, k3s, Helm, WordPress, monitoring) to automate setup on a fresh VM.",
    ],
  },
  {
    id: "devops-lab-pipeline",
    category: "DevOps",
    title: "devops-lab-pipeline",
    subtitle: "Containerized Node.js API with Prometheus and Grafana observability",
    description:
      "A Node.js REST API packaged with Docker, run alongside Prometheus and Grafana via Docker Compose. Demonstrates application, tests, containerization, and observability.",
    image: "/dashboard.png",
    technologies: ["Node.js", "Express", "Docker", "Docker Compose", "Prometheus", "Grafana", "Jest"],
    repositoryUrl: "https://github.com/rajanshah23/devops-lab-pipeline",
    dockerHubUrl: "https://hub.docker.com/r/rajanshah23/devops-lab-pipeline",
    links: {
      github: "https://github.com/rajanshah23/devops-lab-pipeline",
    },
    detailedDescription: [
      "A multi-stage Dockerfile produces a Node.js 20 Alpine Linux runtime image running as non-root UID 10001.",
      "Express exposes health, readiness, and Prometheus metrics endpoints; Prometheus scrapes /metrics every 15 seconds.",
      "Docker Compose runs api, prometheus, and grafana together; a JSON-provisioned dashboard shows Request Rate, 5xx Error Rate, p95 Latency, and Node Heap Used.",
    ],
    features: [
      "Docker healthcheck and non-root runtime user.",
      "Automated tests with Jest and Supertest, plus ESLint configuration.",
      "Image published to Docker Hub.",
    ],
        screenshots: ["/dashboard.png"],
        screenshotCaptions: ["Prometheus and Grafana observability dashboard"],
  },
  {
    id: "project1",
    category: "Full Stack",
    additionalCategories: ["Backend"],
    title: "Theatre Booking System",
    description:
      "Full-stack app (React, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL with Supabase) with JWT auth, real-time seat booking, Khalti payment, reviews, admin dashboard and Supabase image storage.",
    image: "/screenshots/Home.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Supabase"],
    links: {
      github: "https://github.com/rajanshah23/TheatreBooking-System",
    },
    screenshots: [
      "/screenshots/Home.png",
      "/screenshots/Featuredshow.png",
      "/screenshots/Stayupdated.png",
      "/screenshots/Browseshow.png",
      "/screenshots/Mybooking.png",
      "/screenshots/Bookticket.png",
    ],
    screenshotCaptions: ["Theatre booking home page", "Featured shows", "Stay updated section", "Browse shows", "My bookings", "Ticket booking"],
    features: [
      "Real-time seat availability tracking",
      "Secure payment integration with Khalti",
      "User authentication and profile management",
      "Booking history and reviews",
      "Admin dashboard for show and user management",
    ],
    technicalDetails: [
      "Frontend: React, TypeScript, Tailwind CSS",
      "Backend: Node.js, Express",
      "Database: PostgreSQL with Supabase",
      "Authentication: JWT",
      "Payment: Khalti API",
    ],
  },
  {
    id: "project2",
    category: "Full Stack",
    title: "Online Shopping Center",
    description:
      "Online Shopping Center is a full-stack e-commerce web application developed using the MERN stack (MongoDB, Express.js, React, Node.js). The platform provides a seamless online shopping experience with features like product browsing, search and filter, cart management, order processing, and secure user authentication.",
    image: "/screenshots/mernstack.png",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    links: {
      github: "https://github.com/rajanshah23/MERN-Stack",
    },
    screenshots: [
      "/screenshots/mernstack.png",
      "/screenshots/mern1.png",
      "/screenshots/mern2.png",
    ],
    screenshotCaptions: ["Online Shopping Center: mernstack.png", "Online Shopping Center: mern1.png", "Online Shopping Center: mern2.png"],
  },
  {
    id: "Library Management System-api",
    category: "Backend",
    title: "Library Management System - Backend API",
    description:
      "This is a Library Management System backend built using Node.js, Express, Sequelize, and SQLite. It provides APIs to manage Authors and Books.",
    image: "/screenshots/lms diagram.png",

    technologies: ["Node.js", "Express", "Sequelize", "JWT", "sqlite3"],

    links: {
      github: "https://github.com/rajanshah23/Library-Management-System",
      documentation:
        "https://documenter.getpostman.com/view/42497059/2sB3HqGHzv",
    },

    screenshots: [
      "/screenshots/lms diagram.png",
      "/screenshots/image1.png",
      "/screenshots/image2.png",
      "/screenshots/image3.png",
    ],
    screenshotCaptions: ["Library Management System: lms diagram.png", "Library Management System: image1.png", "Library Management System: image2.png", "Library Management System: image3.png"],

    features: [
      "CRUD operations for Authors and Books",
      "Manual input validation (without Sequelize validators)",
      "Pagination for list endpoints",
      "Search/filter functionality including filter by name for Author and filter by title, author, and published year",
      "Proper error handling (400 for bad requests, 404 for not found, 500 for internal errors)",
      "Optional authentication for sensitive endpoints",
    ],

    technicalDetails: [
      "Backend: Node.js, Express, Sequelize",
      "Database: SQLite",
      "Auth: JWT and bcrypt for password hashing",
      "Development: nodemon for automatic server restarts",
    ],
  },

  {
    id: "project3",
    category: "Full Stack",
    title: "Paste App",
    description:
      "A lightweight text snippet manager built with React, Redux Toolkit, LocalStorage, Tailwind CSS, and React Hot Toast notifications.",
    image: "/screenshots/paste1.png",
    technologies: ["React", "Redux Toolkit", "LocalStorage", "Tailwind CSS", "React Hot Toast"],
    links: {
      github: "https://github.com/rajanshah23/PasteApp",
    },
    screenshots: ["/screenshots/paste1.png", "/screenshots/paste2.png"],
    screenshotCaptions: ["Paste App: paste1.png", "Paste App: paste2.png"],
  },
  {
    id: "project4",
    category: "Full Stack",
    title: "Currency Converter Web App",
    description:
      "Responsive web app for real-time currency conversion using REST APIs, HTML, CSS, and JavaScript.",
    image: "/screenshots/Currency.png",
    technologies: ["HTML", "CSS", "JavaScript", "REST APIs"],
    links: {
      github: "https://github.com/rajanshah23/Currency-Converter",
    },
    screenshots: ["/screenshots/Currency.png"],
    screenshotCaptions: ["Currency Converter Web App: Currency.png"],
  },
  {
    id: "incorpoflow",
    category: "Full Stack",
    title: "IncorpoFlow: Company Incorporation Tool",
    description:
      "Multi-step company registration app with draft persistence across browser refreshes and an admin dashboard listing companies with shareholders. Built with React (Vite), Node.js, Express, PostgreSQL (Sequelize), and Docker Compose for PostgreSQL, backend, and Nginx-served frontend in a one-command setup.",
    technologies: ["React (Vite)", "Node.js", "Express", "PostgreSQL", "Sequelize", "Docker Compose"],
    links: {},
    // TODO: Add a verified GitHub URL and project screenshot when provided.
  },
];

type ProjectsProps = {
  onProjectSelect: (project: ProjectType) => void;
};

const Projects = ({ onProjectSelect }: ProjectsProps) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Full Stack", "Backend", "DevOps", "Embedded Systems"];
  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((project) =>
        [project.category, ...(project.additionalCategories || [])].includes(selectedCategory as ProjectType["category"])
      );

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
      ref={ref}
    >
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
          <p
            className={`text-gray-600 text-lg max-w-3xl mx-auto ${
              inView ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            Explore my portfolio of web applications and DevOps work, from
            automated deployments to cloud-native infrastructure.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3" aria-label="Filter projects by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(category);
              }}
              aria-pressed={selectedCategory === category}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                selectedCategory === category
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transform hover:-translate-y-3 transition-all duration-500 ${
                inView ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                type="button"
                className="group relative block h-56 w-full overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                onClick={() => onProjectSelect(project)}
                aria-label={`View details for ${project.title}`}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center bg-gray-100 text-sm text-gray-500">Screenshot not provided</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-white text-lg font-semibold block mb-2">
                      View Details
                    </span>
                    <ExternalLink className="w-6 h-6 text-white mx-auto" />
                  </div>
                </div>
              </button>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="-mt-1 mb-3 text-sm font-medium text-gray-600">
                    {project.subtitle}
                  </p>
                )}
                {project.category && (
                  <span className="mb-3 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {project.category}
                  </span>
                )}
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
                  {project.links.documentation && (
                    <a
                      href={project.links.documentation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-800 text-white rounded-lg hover:bg-green-900 hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm font-medium"
                    >
                      <ExternalLink className="w-3 h-4" />
                      Documentation
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
