import { useInView } from "../hooks/useInView";
import BlogCard from "../components/BlogCard";

const posts = [
  { title: "Deploying WordPress with k3s", summary: "A practical note on containerizing WordPress and deploying it to a constrained local Kubernetes environment.", category: "Kubernetes", technologies: ["Docker", "k3s", "Helm"], anchor: "#case-studies" },
  { title: "Building Docker Images with GitHub Actions", summary: "How a self-hosted runner can build and push application images as part of a repeatable delivery path.", category: "CI/CD", technologies: ["GitHub Actions", "Docker"], anchor: "#case-studies" },
  { title: "Using Helm Charts", summary: "Why packaging Kubernetes configuration as a chart makes application deployment easier to repeat and review.", category: "Kubernetes", technologies: ["Helm", "Kubernetes"], anchor: "#case-studies" },
  { title: "Setting Up Prometheus and Grafana", summary: "The monitoring pieces used to make application and cluster behavior easier to inspect.", category: "Monitoring", technologies: ["Prometheus", "Grafana"], anchor: "#case-studies" },
  { title: "Automating Linux with Ansible", summary: "A concise look at automating firewall and environment setup around a small deployment.", category: "Infrastructure", technologies: ["Linux", "Ansible"], anchor: "#case-studies" },
  { title: "Deploying Applications on Limited Hardware", summary: "Tradeoffs that appear when the application, cluster, and monitoring stack share a small VM.", category: "Systems", technologies: ["Linux", "Docker", "k3s"], anchor: "#timeline" },
];

const Blog = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="blog" className="bg-gray-50 px-4 py-20" ref={ref}>
      <div className="container mx-auto">
        <div className={`mb-12 text-center ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 lg:text-4xl">Technical Notes</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">Short, focused topics connected to the systems and delivery work shown here.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => <BlogCard key={post.title} {...post} />)}
        </div>
      </div>
    </section>
  );
};

export default Blog;
