import { useInView } from "../hooks/useInView";
import CaseStudyCard from "../components/CaseStudyCard";
import CICDPipeline from "../components/CICDPipeline";

const DevOpsCaseStudies = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="case-studies" className="bg-white px-4 py-20" ref={ref}>
      <div className="container mx-auto">
        <div className={`mb-12 text-center ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 lg:text-4xl">DevOps Case Studies</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">Hands-on delivery work, documented with the tools, constraints, and operational decisions behind it.</p>
        </div>
        <div className={`mb-10 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">WordPress delivery path</p>
          <CICDPipeline />
        </div>
        <div className={`grid grid-cols-1 gap-8 ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <CaseStudyCard
            title="WordPress DevOps CI/CD Pipeline"
            label="Implemented project"
            summary="A practical DevOps implementation for deploying and automating a WordPress application in a resource-constrained local environment using AlmaLinux 9, Docker, GitHub Actions, Kubernetes (k3s), Helm, Prometheus, Grafana, and Ansible."
            problem="Create a repeatable deployment workflow for WordPress while operating inside a minimal 2GB VM and keeping the environment manageable, observable, and automation-friendly."
            architecture="Docker Compose supported local containerized development, a self-hosted GitHub Actions runner handled builds and image publishing, and k3s with Helm managed the Kubernetes deployment path."
            tools={["AlmaLinux 9", "Docker", "Docker Compose", "GitHub Actions", "Kubernetes / k3s", "Helm", "Ansible", "Prometheus", "Grafana"]}
            implementation={[
              "Provisioned the VM in Oracle VirtualBox with limited resources and a persistent storage layout.",
              "Containerized the WordPress application and prepared the deployment stack for repeatable execution.",
              "Configured a self-hosted GitHub Actions runner to automate builds and deployment workflows.",
              "Deployed the application to k3s using Helm and Kubernetes manifests for service orchestration.",
              "Added Prometheus and Grafana for runtime visibility and system monitoring.",
              "Automated environment setup and networking tasks with Ansible."
            ]}
            security="Firewall and networking rules were configured to limit exposed services and keep the deployment flow controlled within the self-hosted environment."
            monitoring="Prometheus metrics and Grafana dashboards provided visibility into application and cluster health throughout the deployment workflow."
            challenges="Operating Kubernetes, monitoring, and application workloads within a 2GB VM required careful planning around resource usage, storage, and networking."
            result="The project produced a documented and repeatable DevOps workflow for WordPress, combining CI/CD automation, Kubernetes deployment, monitoring, and infrastructure configuration in one local environment."
            github="https://github.com/rajanshah23/wordpress-docker-cicd"
            screenshots={["/screenshots/wordpress-cicd/pipeline.png", "/screenshots/wordpress-cicd/grafana.png"]}
            status="implemented"
          />
        </div>
      </div>
    </section>
  );
};

export default DevOpsCaseStudies;
