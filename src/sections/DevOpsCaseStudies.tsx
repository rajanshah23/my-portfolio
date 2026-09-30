import { useInView } from "../hooks/useInView";
import CaseStudyCard from "../components/CaseStudyCard";

const DevOpsCaseStudies = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="case-studies" className="bg-white px-4 py-20" ref={ref}>
      <div className="container mx-auto">
        <div className={`mb-12 text-center ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 lg:text-4xl">DevOps Case Studies</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">Hands-on delivery work, documented with the tools, constraints, and operational decisions behind it.</p>
        </div>
        <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <CaseStudyCard
            title="Building a Containerized API with Prometheus & Grafana Observability"
            label="Implemented project"
            summary="The goal is a locally reproducible DevOps stack that packages a Node.js REST API with Docker, scrapes its Prometheus metrics, and visualizes them in a Grafana dashboard provisioned from code. Docker Compose runs the API, Prometheus, and Grafana together without requiring a cloud account."
            problem="Ship a service with production-shaped concerns, including a non-root runtime, graceful shutdown, and health probes, without needing a cloud account."
            architecture="Docker Compose runs api, prometheus, and grafana on a shared network."
            tools={["Node.js 20", "Express", "Jest", "Supertest", "Docker", "Docker Compose", "Prometheus", "Grafana", "Alpine Linux", "GitHub Actions-ready"]}
            implementation={[
              "Multi-stage Dockerfile with a HEALTHCHECK and a non-root runtime user (UID 10001).",
              "Express middleware records http_requests_total and http_request_duration_seconds.",
              "Docker Compose wires api, prometheus, and grafana on a shared network.",
              "Prometheus scrapes /metrics every 15 seconds.",
              "Grafana dashboard and datasource are provisioned from JSON/YAML files for reproducibility from a fresh clone.",
              "Run: docker run --rm -p 3000:3000 rajanshah23/devops-lab-pipeline:1.0.0",
            ]}
            security="The multi-stage image uses a non-root runtime user with UID 10001 and defines a container HEALTHCHECK."
            monitoring="Prometheus scrapes /metrics every 15 seconds; the provisioned Grafana dashboard shows Request Rate, 5xx Error Rate, p95 Latency, and Node Heap Used."
            challenges="The stack addresses non-root execution, graceful shutdown, and health probes in a local environment without a cloud account."
            result="The four-panel golden-signals dashboard covers request rate, 5xx error rate, p95 latency, and Node heap. Zero-downtime graceful shutdown was verified via SIGTERM, and the public Docker image can be pulled in one command."
            github="https://github.com/rajanshah23/devops-lab-pipeline"
            dockerHub="https://hub.docker.com/r/rajanshah23/devops-lab-pipeline"
            screenshots={["/dashboard.png"]}
            screenshotAlt="Grafana dashboard with Request Rate, 5xx Error Rate, p95 Latency, and Node Heap Used panels"
            status="implemented"
          />
          <CaseStudyCard
            title="WordPress DevOps CI/CD Pipeline"
            label="Implemented project"
            summary="Built and run in a personal lab environment. A WordPress deployment project using AlmaLinux 9, Docker, GitHub Actions, Kubernetes (k3s), Helm, Prometheus, Grafana, and Ansible."
            problem="Create a repeatable deployment workflow for WordPress while operating inside a minimal 2GB VM and keeping the environment manageable, observable, and automation-friendly."
            architecture="Docker Compose runs WordPress and MySQL; a self-hosted GitHub Actions runner deploys the stack to k3s using kubectl manifests and a reusable Helm chart."
            tools={["AlmaLinux 9", "Docker", "Docker Compose", "GitHub Actions", "Kubernetes / k3s", "Helm", "Ansible", "Prometheus", "Grafana"]}
            implementation={[
              "Built an AlmaLinux 9 VM in VirtualBox (2 GB RAM) with static IP networking, a non-root sudo user, and an XFS secondary disk mounted via /etc/fstab.",
              "Containerized WordPress and MySQL with Docker Compose, using named volumes and a custom Docker network.",
              "Configured a self-hosted GitHub Actions runner as a systemd service; the workflow deploys the stack on every push to main, with credentials in GitHub Secrets.",
              "Deployed to k3s with kubectl and manifests (Namespace, Secret, ConfigMap, PV/PVC, Deployments, Services, Traefik Ingress) and a CPU-based HPA scaling WordPress from 1 to 3 replicas via Metrics Server.",
              "Created a reusable Helm chart and installed kube-prometheus-stack for Prometheus and Grafana monitoring.",
              "Wrote an Ansible playbook with roles (common, Docker, k3s, Helm, WordPress, monitoring) to automate setup on a fresh VM.",
            ]}
            security=""
            monitoring=""
            challenges=""
            result=""
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
