export interface TechnicalNote {
  id: string;
  category: string;
  title: string;
  summary: string;
  technologies: string[];
  readTime: string;
  linkTo?: string;
  content?: string;
}

export const technicalNotes: TechnicalNote[] = [
  {
    id: "wordpress-k3s",
    category: "Kubernetes",
    title: "Deploying WordPress with k3s",
    summary: "A practical note on containerizing WordPress and deploying it to a constrained local Kubernetes environment.",
    technologies: ["Docker", "k3s", "Helm"],
    readTime: "coming soon",
    linkTo: "#case-studies",
  },
  {
    id: "github-actions-docker",
    category: "CI/CD",
    title: "Building Docker Images with GitHub Actions",
    summary: "How a self-hosted runner can build and push application images as part of a repeatable delivery path.",
    technologies: ["GitHub Actions", "Docker"],
    readTime: "coming soon",
    linkTo: "#case-studies",
  },
  {
    id: "helm-charts",
    category: "Kubernetes",
    title: "Using Helm Charts",
    summary: "Why packaging Kubernetes configuration as a chart makes application deployment easier to repeat and review.",
    technologies: ["Helm", "Kubernetes"],
    readTime: "coming soon",
    linkTo: "#case-studies",
  },
  {
    id: "prometheus-grafana-basics",
    category: "Monitoring",
    title: "Setting Up Prometheus and Grafana",
    summary: "The monitoring pieces used to make application and cluster behavior easier to inspect.",
    technologies: ["Prometheus", "Grafana"],
    readTime: "coming soon",
    linkTo: "#case-studies",
  },
  {
    id: "ansible-linux",
    category: "Infrastructure",
    title: "Automating Linux with Ansible",
    summary: "A concise look at automating firewall and environment setup around a small deployment.",
    technologies: ["Linux", "Ansible"],
    readTime: "coming soon",
    linkTo: "#case-studies",
  },
  {
    id: "limited-hardware",
    category: "Systems",
    title: "Deploying Applications on Limited Hardware",
    summary: "Tradeoffs that appear when the application, cluster, and monitoring stack share a small VM.",
    technologies: ["Linux", "Docker", "k3s"],
    readTime: "coming soon",
    linkTo: "#timeline",
  },
  {
    id: "multi-stage-dockerfile",
    category: "Docker",
    title: "Writing a Multi-Stage Dockerfile for a Node.js API",
    summary: "How splitting a build into dependency and runtime stages cuts the image roughly in half and removes build tools from production.",
    technologies: ["Docker", "Node.js", "Alpine"],
    readTime: "6 min read",
    content: `# Build a smaller production image

  A multi-stage Dockerfile separates dependency installation from the production runtime. The DevOps lab uses Node.js 20 on Alpine Linux and installs production dependencies with \`npm ci --omit=dev\` in its dependency stage. The runtime stage copies only what the application needs, leaving build and test tooling behind.

  The project reports that this approach cuts the image roughly in half. The exact size depends on the base image and dependency tree, but keeping development tools out of the runtime is the important boundary.

  ## Dependency stage

  Install production dependencies in an isolated stage:

  \`\`\`sh
  npm ci --omit=dev
  \`\`\`

  ## Runtime stage

  The final stage copies the application and production dependencies, creates a non-root user with UID 10001, and configures a health check. The application is started with an exec-form command so Node receives container signals directly.

  That signal path matters during shutdown. The server can receive SIGTERM and perform its graceful shutdown rather than having a shell process intercept the signal.

  ## Verify the image

  Build and start the project stack with Docker Compose:

  \`\`\`sh
  docker compose up -d --build
  \`\`\`

  Inspect the API health at \`http://localhost:3000/health\` and check the service logs if the container does not become healthy. The runtime image should contain the application and its production dependencies, not test or build-only packages.`,
  },
  {
    id: "non-root-containers",
    category: "Security",
    title: "Running Containers as a Non-Root User",
    summary: "Why every base image ships as root by default, and how to add an explicit user with a fixed UID so the container behaves predictably in Compose and Kubernetes.",
    technologies: ["Docker", "Linux", "Security"],
    readTime: "4 min read",
    content: `# Run the application without root privileges

  Container images often start their process as root unless the image or runtime configuration selects another user. Running an application as a non-root user limits its privileges and makes the process identity explicit across local Compose and Kubernetes environments.

  ## Choose a stable runtime identity

  The DevOps lab image creates a dedicated runtime user with UID 10001. A fixed numeric UID makes the container identity predictable even when the host or orchestration platform resolves users differently.

  Before switching users in the image, make sure the application files and required writable paths have permissions that allow that user to run the service. Keep the runtime process unprivileged rather than granting broad write access to the whole filesystem.

  ## Validate the result

  Start the application using the provided Compose stack, then inspect the running container's user and confirm the service can read its application files and write only to the paths it needs. Repeat the check in Kubernetes if the same image will run there; a local Compose success does not by itself confirm every cluster security policy.

  The project uses this image-level non-root identity in its multi-stage runtime image. Its container health check remains available independently of the application user's privileges.`,
  },
  {
    id: "express-prometheus-metrics",
    category: "Monitoring",
    title: "Instrumenting Express with Prometheus Metrics",
    summary: "Adding a request counter and a latency histogram to an Express app with prom-client so the service exposes a real /metrics endpoint.",
    technologies: ["Node.js", "Prometheus", "prom-client"],
    readTime: "6 min read",
    content: `# Expose application behavior as metrics

  Prometheus can only query measurements that a service exposes. The DevOps lab instruments its Express API with \`prom-client\` and makes the metrics available at the \`/metrics\` endpoint.

  ## Record requests and duration

  The request counter is named \`http_requests_total\` and is labeled by method, route, and status. Those labels let a dashboard compare request volume and isolate server errors by route or response status.

  The \`http_request_duration_seconds\` histogram records request duration in seconds. Prometheus stores histogram buckets, which can be queried to estimate percentiles such as p95 latency.

  The project also exports Node.js default metrics through prom-client, including memory, CPU, and event-loop lag measurements. These complement request-level data with process-level signals.

  ## Scrape the endpoint

  Prometheus runs on the same Docker network as the API and scrapes \`/metrics\` every 15 seconds. Check that the target is up and that the counter and histogram appear before building Grafana panels.

  The lab also includes health and readiness endpoints for service checks. Those endpoints have a different purpose from \`/metrics\`: health probes report whether the service can run, while metrics expose measurements for monitoring.`,
  },
  {
    id: "four-panel-grafana",
    category: "Monitoring",
    title: "Building a Four-Panel Grafana Dashboard",
    summary: "The four golden-signal panels — request rate, error rate, p95 latency, and heap usage — and the PromQL behind each one.",
    technologies: ["Grafana", "PromQL", "Prometheus"],
    readTime: "7 min read",
    content: `# Build a dashboard from four signals

  The API Overview dashboard is provisioned from \`monitoring/grafana/provisioning/dashboards/api-overview.json\`. Its four panels cover request rate, 5xx error rate, p95 latency, and Node heap usage. Provisioning the dashboard and Prometheus data source from files makes the same view reproducible after a fresh checkout.

  ## Request rate

  Use the request counter's rate over a five-minute window, grouped by route:

  \`\`\`promql
  sum(rate(http_requests_total[5m])) by (route)
  \`\`\`

  The result is requests per second. A counter increases over time, so \`rate()\` is used to show its recent per-second change.

  ## 5xx error rate

  Compare the rate of 5xx responses with the total response rate:

  \`\`\`promql
  sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100
  \`\`\`

  This expression returns a percentage. The request counter includes a status label; choose the percent unit for the Grafana panel.

  ## p95 latency

  Estimate the 95th percentile from the duration histogram buckets, retaining the bucket boundary and route labels:

  \`\`\`promql
  histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, route))
  \`\`\`

  The histogram measures seconds, so configure the panel unit accordingly.

  ## Node heap used

  The provisioned dashboard queries the Node heap-used metric:

  \`\`\`promql
  nodejs_nodejs_heap_size_used_bytes
  \`\`\`

  This value is in bytes. Confirm that the series is present in Prometheus before interpreting an empty panel as zero usage. Generate API traffic and wait at least one 15-second scrape interval to populate the request panels.`,
  },
  {
    id: "compose-local-stack",
    category: "Orchestration",
    title: "Wiring a Local Stack with Docker Compose",
    summary: "Running an API alongside Prometheus and Grafana on a shared bridge network, using service names as DNS and healthcheck-gated startup order.",
    technologies: ["Docker Compose", "Networking"],
    readTime: "6 min read",
    content: `# Run the API and observability stack locally

  Docker Compose starts three services together: the Node.js API, Prometheus, and Grafana. They share the \`lab\` Docker network and discover one another using Compose service names such as \`api\`, \`prometheus\`, and \`grafana\`.

  ## Start the services

  From the repository root, build the API image and start the stack:

  \`\`\`sh
  docker compose up -d --build
  \`\`\`

  The API is available on port 3000, Prometheus on port 9090, and Grafana on port 3001. Prometheus waits for the API health check before starting and scrapes \`/metrics\` every 15 seconds. Grafana starts after Prometheus and loads its data source and dashboard from provisioning files.

  ## Verify the services

  Wait about 15 seconds for the first Prometheus scrape, then open the API at \`http://localhost:3000\`, Prometheus at \`http://localhost:9090\`, and Grafana at \`http://localhost:3001\`. In Grafana, open Dashboards, then DevOps Lab, then API Overview.

  If the dashboard has no data, generate requests against the API and wait another scrape interval. If Prometheus reports its target as down, inspect the Prometheus service logs and confirm the API is healthy on the shared network.

  ## Stop or reset the stack

  Stop the services but retain their stored data with \`docker compose down\`. To also remove stored metrics and Grafana data, use \`docker compose down -v\`.`,
  },
  {
    id: "publishing-images",
    category: "Delivery",
    title: "Publishing Images to Docker Hub and GHCR",
    summary: "Tagging a local build for two registries, authenticating with access tokens, and verifying a fresh pull works on a clean machine.",
    technologies: ["Docker", "Docker Hub", "GHCR"],
    readTime: "6 min read",
    content: `# Publish the image to two registries

  The DevOps lab publishes its container image to Docker Hub and GitHub Container Registry (GHCR). A registry stores versioned images so a clean machine or deployment host can pull the same artifact that was built and tested.

  ## Tag for each registry

  Build the application image, then apply a registry-qualified tag for each destination. Keep the project version in the tag so consumers can request a specific release instead of relying on a mutable \`latest\` tag.

  The published Docker Hub image is \`rajanshah23/devops-lab-pipeline:1.0.0\`. A GHCR image uses the \`ghcr.io\` registry hostname and the repository's package name.

  ## Authenticate with access tokens

  Authenticate separately to each registry with an access token that has permission to publish the package. In automation, store tokens as protected CI secrets and pass them to Docker login through standard input. Do not put tokens in source files, command history, or committed environment files.

  After login, push the corresponding registry-qualified tag to Docker Hub and GHCR. Confirm that each registry shows the expected image version before sharing it.

  ## Verify a fresh pull

  Test the published Docker Hub image on a machine that does not rely on the local build cache:

  \`\`\`sh
  docker pull rajanshah23/devops-lab-pipeline:1.0.0
  docker run --rm -p 3000:3000 rajanshah23/devops-lab-pipeline:1.0.0
  \`\`\`

  Then check the service at \`http://localhost:3000\`. A successful pull and start verifies that the published artifact is retrievable independently of the build workspace.`,
  },
];
