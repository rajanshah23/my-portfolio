import { useState } from "react";
import { useInView } from "../hooks/useInView";
import BlogCard from "../components/BlogCard";
import TechnicalNoteModal from "../components/TechnicalNoteModal";
import { TechnicalNoteType } from "../types";

const postSummaries = [
  { title: "Deploying WordPress with k3s", summary: "A practical note on containerizing WordPress and deploying it to a constrained local Kubernetes environment.", category: "Kubernetes", technologies: ["Docker", "k3s", "Helm"], anchor: "#case-studies" },
  { title: "Building Docker Images with GitHub Actions", summary: "How a self-hosted runner can build and push application images as part of a repeatable delivery path.", category: "CI/CD", technologies: ["GitHub Actions", "Docker"], anchor: "#case-studies" },
  { title: "Using Helm Charts", summary: "Why packaging Kubernetes configuration as a chart makes application deployment easier to repeat and review.", category: "Kubernetes", technologies: ["Helm", "Kubernetes"], anchor: "#case-studies" },
  { title: "Setting Up Prometheus and Grafana", summary: "The monitoring pieces used to make application and cluster behavior easier to inspect.", category: "Monitoring", technologies: ["Prometheus", "Grafana"], anchor: "#case-studies" },
  { title: "Automating Linux with Ansible", summary: "A concise look at automating firewall and environment setup around a small deployment.", category: "Infrastructure", technologies: ["Linux", "Ansible"], anchor: "#case-studies" },
  { title: "Deploying Applications on Limited Hardware", summary: "Tradeoffs that appear when the application, cluster, and monitoring stack share a small VM.", category: "Systems", technologies: ["Linux", "Docker", "k3s"], anchor: "#timeline" },
  { title: "Writing a Multi-Stage Dockerfile for a Node.js API", summary: "How splitting a build into dependency and runtime stages cuts the image roughly in half and removes build tools from production.", category: "Docker", technologies: ["Docker", "Node.js", "Alpine"], anchor: "#case-studies" },
  { title: "Running Containers as a Non-Root User", summary: "Why every base image ships as root by default, and how to add an explicit user with a fixed UID so the container behaves predictably in Compose and Kubernetes.", category: "Security", technologies: ["Docker", "Linux", "Security"], anchor: "#case-studies" },
  { title: "Instrumenting Express with Prometheus Metrics", summary: "Adding a request counter and a latency histogram to an Express app with prom-client so the service exposes a real /metrics endpoint.", category: "Monitoring", technologies: ["Node.js", "Prometheus", "prom-client"], anchor: "#case-studies" },
  { title: "Building a Four-Panel Grafana Dashboard", summary: "The four golden-signal panels — request rate, error rate, p95 latency, and heap usage — and the PromQL behind each one.", category: "Monitoring", technologies: ["Grafana", "PromQL", "Prometheus"], anchor: "#case-studies" },
  { title: "Wiring a Local Stack with Docker Compose", summary: "Running an API alongside Prometheus and Grafana on a shared bridge network, using service names as DNS and healthcheck-gated startup order.", category: "Orchestration", technologies: ["Docker Compose", "Networking"], anchor: "#case-studies" },
  { title: "Publishing Images to Docker Hub and GHCR", summary: "Tagging a local build for two registries, authenticating with access tokens, and verifying a fresh pull works on a clean machine.", category: "Delivery", technologies: ["Docker", "Docker Hub", "GHCR"], anchor: "#case-studies" },
];

const noteGuides: Record<string, Pick<TechnicalNoteType, "implementation" | "queries">> = {
  "Deploying WordPress with k3s": {
    implementation: [
      "Use Docker Compose to containerize and exercise the WordPress application before deploying it to Kubernetes.",
      "Prepare the local AlmaLinux 9 VM and persistent storage; the documented environment is constrained to 2GB of RAM.",
      "Deploy the application to k3s with Helm and Kubernetes manifests, then check that the workload and service are healthy.",
      "Use Prometheus and Grafana for visibility, and Ansible for repeatable environment and networking setup.",
    ],
  },
  "Building Docker Images with GitHub Actions": {
    implementation: [
      "Run the workflow on the configured self-hosted GitHub Actions runner.",
      "Build and test the application before building its Docker image.",
      "Authenticate to the image registry with a secret-managed access token; do not commit credentials to the repository.",
      "Publish a versioned image and verify that the deployment uses the same image tag that the workflow produced.",
    ],
  },
  "Using Helm Charts": {
    implementation: [
      "Keep Kubernetes resource templates together in a Helm chart so a release can be reviewed and repeated.",
      "Put environment-specific values in values files instead of duplicating the resource templates.",
      "Deploy the chart to k3s and inspect the release, pods, and service after installation or upgrade.",
      "Keep image references and configuration explicit so the deployed release can be traced to its inputs.",
    ],
  },
  "Setting Up Prometheus and Grafana": {
    implementation: [
      "Expose application metrics and configure Prometheus to scrape the reachable application endpoint.",
      "Configure Grafana with Prometheus as its data source.",
      "Build dashboards from the metrics that the application and cluster actually expose.",
      "Check scrape status and dashboard data after the stack starts; a configured data source alone does not confirm metrics are arriving.",
    ],
  },
  "Automating Linux with Ansible": {
    implementation: [
      "Represent host preparation and networking changes as Ansible tasks instead of relying on undocumented manual steps.",
      "Keep firewall and network configuration aligned with the services the deployment needs to expose.",
      "Run the automation against the target Linux host and verify the resulting configuration before deploying the application stack.",
      "Keep environment-specific values separate from reusable task logic.",
    ],
  },
  "Deploying Applications on Limited Hardware": {
    implementation: [
      "List the application, cluster, and monitoring workloads that must share the VM before deployment.",
      "The documented WordPress environment uses a 2GB VM, so account for memory, CPU, and persistent storage together.",
      "Start the required services, inspect their resource use, and adjust the workload plan when the host is constrained.",
    ],
  },
  "Writing a Multi-Stage Dockerfile for a Node.js API": {
    implementation: [
      "Use a dependency or build stage for installing packages and running the checks needed to produce the application output.",
      "Create a separate runtime stage based on Node.js 20 Alpine and copy only the application files and production dependencies it needs.",
      "Keep compilers, test tooling, and other build-only packages out of the runtime stage.",
      "Build and inspect the image size; the reported reduction is approximate and depends on the application and dependency set.",
    ],
  },
  "Running Containers as a Non-Root User": {
    implementation: [
      "Inspect the base image and Dockerfile to determine which user the process actually runs as; defaults can vary by image.",
      "Create or select an explicit runtime user with a stable UID. The devops-lab-pipeline image uses UID 10001.",
      "Set ownership or permissions for required application files and writable directories before switching to the non-root user.",
      "Run the image through Docker Compose and verify the process identity and required file access in the container.",
    ],
  },
  "Instrumenting Express with Prometheus Metrics": {
    implementation: [
      "Use prom-client in the Express service to record an HTTP request counter and a request-duration histogram.",
      "Expose the registry from a `/metrics` endpoint in Prometheus text format.",
      "Configure Prometheus to scrape the API; the devops-lab-pipeline stack scrapes `/metrics` every 15 seconds.",
      "Request `/metrics` and confirm the expected counter and histogram series are present before building dashboards.",
    ],
  },
  "Building a Four-Panel Grafana Dashboard": {
    implementation: [
      "Configure a Prometheus data source and provision the dashboard and data source from files so they can be recreated.",
      "Use a counter rate for request throughput and filter that counter to 5xx responses for the server-error panel.",
      "Calculate p95 latency from the duration histogram buckets; confirm the histogram is exported before using the query.",
      "Use the exported Node heap-used gauge for the heap panel. Verify metric and label names against `/metrics` before applying these examples.",
    ],
    queries: [
      { label: "Request rate", expression: "sum(rate(http_requests_total[5m]))" },
      {
        label: "5xx error rate (%)",
        expression: "100 * sum(rate(http_requests_total{status=~\"5..\"}[5m])) / clamp_min(sum(rate(http_requests_total[5m])), 1)",
        note: "Assumes the request counter has a `status` label; adapt the selector to the labels exported by the API.",
      },
      {
        label: "p95 latency (seconds)",
        expression: "histogram_quantile(0.95, sum by (le) (rate(http_request_duration_seconds_bucket[5m])))",
      },
      {
        label: "Node heap used (bytes)",
        expression: "nodejs_heap_size_used_bytes",
        note: "Use this metric if it is exported by the service; otherwise substitute the actual heap-used gauge visible in `/metrics`.",
      },
    ],
  },
  "Wiring a Local Stack with Docker Compose": {
    implementation: [
      "Define api, prometheus, and grafana as Compose services on a shared bridge network.",
      "Use Compose service names for in-network DNS, such as the API target configured in Prometheus.",
      "Expose the API metrics endpoint to Prometheus and configure the scrape interval and path.",
      "Add health checks and gate dependent startup on health where supported, then verify all three services after startup.",
    ],
  },
  "Publishing Images to Docker Hub and GHCR": {
    implementation: [
      "Build one image and tag it with the intended version for Docker Hub and GitHub Container Registry.",
      "Authenticate to each registry using access tokens stored as local secrets or CI secrets; never commit tokens.",
      "Push each tag and confirm the expected version is visible in both registries.",
      "On a clean machine, pull the public image and start it with `docker run --rm -p 3000:3000 rajanshah23/devops-lab-pipeline:1.0.0`.",
    ],
  },
};

const posts: TechnicalNoteType[] = postSummaries.map((post) => ({
  ...post,
  ...noteGuides[post.title],
}));

const Blog = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [selectedNote, setSelectedNote] = useState<TechnicalNoteType | null>(null);

  return (
    <section id="blog" className="bg-gray-50 px-4 py-20" ref={ref}>
      <div className="container mx-auto">
        <div className={`mb-12 text-center ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 lg:text-4xl">Technical Notes</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">Short, focused topics connected to the systems and delivery work shown here.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.title} {...post} onRead={() => setSelectedNote(post)} />
          ))}
        </div>
      </div>
      {selectedNote && (
        <TechnicalNoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
      )}
    </section>
  );
};

export default Blog;
