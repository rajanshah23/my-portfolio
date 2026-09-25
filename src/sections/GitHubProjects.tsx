import { ExternalLink, Github } from "lucide-react";
import { useInView } from "../hooks/useInView";
import StatusBadge from "../components/StatusBadge";

const repositories = [
  {
    name: "wordpress-docker-cicd",
    description: "WordPress deployment automation using Docker, k3s, Helm, GitHub Actions, and monitoring.",
    technologies: ["Docker", "Kubernetes", "Helm", "GitHub Actions"],
    href: "https://github.com/rajanshah23/wordpress-docker-cicd",
  },
  {
    name: "frontend-Theatre-booking-system",
    description: "Responsive theatre booking frontend with show browsing, booking flows, and account experiences.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    href: "https://github.com/rajanshah23/frontend-Theatre-booking-system",
  },
  {
    name: "Library-Management-System",
    description: "Backend API for managing authors and books with validation, pagination, search, and authentication.",
    technologies: ["Node.js", "Express", "Sequelize", "SQLite"],
    href: "https://github.com/rajanshah23/Library-Management-System",
  },
];

const GitHubProjects = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="github" className="bg-white px-4 py-20" ref={ref}>
      <div className="container mx-auto">
        <div className={`mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 lg:text-4xl">GitHub Projects</h2>
            <p className="max-w-2xl text-lg text-gray-600">Interested in how these projects were built? Explore my GitHub repositories to see the code and implementation details.</p>
          </div>
          <a href="https://github.com/rajanshah23" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:self-auto"><Github className="h-4 w-4" />View profile</a>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {repositories.map((repository) => (
            <article key={repository.name} className="flex h-full flex-col rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3"><Github className="h-6 w-6 text-slate-800" aria-hidden="true" /><StatusBadge label="Repository" status="configured" /></div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{repository.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{repository.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">{repository.technologies.map((technology) => <span key={technology} className="rounded-full bg-white px-3 py-1 text-xs text-gray-700">{technology}</span>)}</div>
              <a href={repository.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Open repository <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubProjects;
