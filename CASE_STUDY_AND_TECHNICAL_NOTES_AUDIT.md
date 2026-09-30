# Case Study and Technical Notes Content Audit

This report extracts the current rendered content for the DevOps case-study section and Technical Notes section, plus the related `devops-lab-pipeline` project record. Content below is sourced from `src/sections/DevOpsCaseStudies.tsx`, `src/sections/Blog.tsx`, `src/sections/Projects.tsx`, `src/components/CaseStudyCard.tsx`, `src/components/BlogCard.tsx`, and `src/components/CICDPipeline.tsx`.

## DevOps Case Studies Section

Section ID: `case-studies`

Heading: `DevOps Case Studies`

Intro: `Hands-on delivery work, documented with the tools, constraints, and operational decisions behind it.`

Pipeline eyebrow: `WordPress delivery path`

### Pipeline Visual

The section displays these stages in order:

| Stage | Visual state |
| --- | --- |
| Code Push | Active |
| Build | Complete |
| Test | Complete |
| Docker Image | Complete |
| Registry | Neutral |
| Kubernetes | Neutral |
| Health Check | Neutral |
| Monitoring | Neutral |

### Case Study: Containerized API

Card label: `Implemented project`

Status badge: `Scope: Implemented`

Title: `Building a Containerized API with Prometheus & Grafana Observability`

Summary: `The goal is a locally reproducible DevOps stack that packages a Node.js REST API with Docker, scrapes its Prometheus metrics, and visualizes them in a Grafana dashboard provisioned from code. Docker Compose runs the API, Prometheus, and Grafana together without requiring a cloud account.`

Problem: `Ship a service with production-shaped concerns, including a non-root runtime, graceful shutdown, and health probes, without needing a cloud account.`

Architecture: `Docker Compose runs api, prometheus, and grafana on a shared network.`

Security: `The multi-stage image uses a non-root runtime user with UID 10001 and defines a container HEALTHCHECK.`

Monitoring: `Prometheus scrapes /metrics every 15 seconds; the provisioned Grafana dashboard shows Request Rate, 5xx Error Rate, p95 Latency, and Node Heap Used.`

Challenges: `The stack addresses non-root execution, graceful shutdown, and health probes in a local environment without a cloud account.`

Result: `The four-panel golden-signals dashboard covers request rate, 5xx error rate, p95 latency, and Node heap. Zero-downtime graceful shutdown was verified via SIGTERM, and the public Docker image can be pulled in one command.`

Tools:

- Node.js 20
- Express
- Jest
- Supertest
- Docker
- Docker Compose
- Prometheus
- Grafana
- Alpine Linux
- GitHub Actions-ready

Implementation:

- Multi-stage Dockerfile with a HEALTHCHECK and a non-root runtime user (UID 10001).
- Express middleware records `http_requests_total` and `http_request_duration_seconds`.
- Docker Compose wires api, prometheus, and grafana on a shared network.
- Prometheus scrapes `/metrics` every 15 seconds.
- Grafana dashboard and datasource are provisioned from JSON/YAML files for reproducibility from a fresh clone.
- Run: `docker run --rm -p 3000:3000 rajanshah23/devops-lab-pipeline:1.0.0`

Screenshot: `/dashboard.png`

Screenshot alt text: `Grafana dashboard with Request Rate, 5xx Error Rate, p95 Latency, and Node Heap Used panels`

Links and rendered actions:

- GitHub: https://github.com/rajanshah23/devops-lab-pipeline (button label: `View GitHub project`)
- Docker Hub: https://hub.docker.com/r/rajanshah23/devops-lab-pipeline (button label: `View on Docker Hub`)

Both links open in a new tab. The buttons use the same dark style and appear together when both links are supplied.

### Case Study: WordPress DevOps CI/CD Pipeline

Card label: `Implemented project`

Status badge: `Scope: Implemented`

Title: `WordPress DevOps CI/CD Pipeline`

Summary: `A practical DevOps implementation for deploying and automating a WordPress application in a resource-constrained local environment using AlmaLinux 9, Docker, GitHub Actions, Kubernetes (k3s), Helm, Prometheus, Grafana, and Ansible.`

Problem: `Create a repeatable deployment workflow for WordPress while operating inside a minimal 2GB VM and keeping the environment manageable, observable, and automation-friendly.`

Architecture: `Docker Compose supported local containerized development, a self-hosted GitHub Actions runner handled builds and image publishing, and k3s with Helm managed the Kubernetes deployment path.`

Security: `Firewall and networking rules were configured to limit exposed services and keep the deployment flow controlled within the self-hosted environment.`

Monitoring: `Prometheus metrics and Grafana dashboards provided visibility into application and cluster health throughout the deployment workflow.`

Challenges: `Operating Kubernetes, monitoring, and application workloads within a 2GB VM required careful planning around resource usage, storage, and networking.`

Result: `The project produced a documented and repeatable DevOps workflow for WordPress, combining CI/CD automation, Kubernetes deployment, monitoring, and infrastructure configuration in one local environment.`

Tools:

- AlmaLinux 9
- Docker
- Docker Compose
- GitHub Actions
- Kubernetes / k3s
- Helm
- Ansible
- Prometheus
- Grafana

Implementation:

- Provisioned the VM in Oracle VirtualBox with limited resources and a persistent storage layout.
- Containerized the WordPress application and prepared the deployment stack for repeatable execution.
- Configured a self-hosted GitHub Actions runner to automate builds and deployment workflows.
- Deployed the application to k3s using Helm and Kubernetes manifests for service orchestration.
- Added Prometheus and Grafana for runtime visibility and system monitoring.
- Automated environment setup and networking tasks with Ansible.

Screenshots:

- `/screenshots/wordpress-cicd/pipeline.png`
- `/screenshots/wordpress-cicd/grafana.png`

GitHub: https://github.com/rajanshah23/wordpress-docker-cicd (button label: `View GitHub project`)

## Related Project Record: devops-lab-pipeline

This is the corresponding project card record in `src/sections/Projects.tsx`.

- ID: `devops-lab-pipeline`
- Category: `DevOps`
- Title: `devops-lab-pipeline`
- Subtitle: `Containerized Node.js API with Prometheus and Grafana observability`
- Description: `A Node.js REST API packaged with Docker, run alongside Prometheus and Grafana via Docker Compose. Demonstrates the first four layers of a modern DevOps stack: application, tests, container, and observability.`
- Image: `/dashboard.png`
- Technologies: Node.js, Express, Docker, Docker Compose, Prometheus, Grafana, Jest
- Repository URL: https://github.com/rajanshah23/devops-lab-pipeline
- Docker Hub URL: https://hub.docker.com/r/rajanshah23/devops-lab-pipeline
- GitHub link: https://github.com/rajanshah23/devops-lab-pipeline

Detailed description:

- A multi-stage Dockerfile produces a Node.js 20 Alpine Linux runtime image running as non-root UID 10001.
- Express exposes health, readiness, and Prometheus metrics endpoints; Prometheus scrapes `/metrics` every 15 seconds.
- Docker Compose runs api, prometheus, and grafana together; a JSON-provisioned dashboard shows Request Rate, 5xx Error Rate, p95 Latency, and Node Heap Used.

Features:

- 9 Jest + Supertest tests with 100% coverage.
- Published to GitHub Container Registry and Docker Hub as `rajanshah23/devops-lab-pipeline:1.0.0`.
- GitHub Actions-ready.
- Run: `docker run --rm -p 3000:3000 rajanshah23/devops-lab-pipeline:1.0.0`

## Technical Notes

Section ID: `blog`

Rendered heading: `Technical Notes`

Intro: `Short, focused topics connected to the systems and delivery work shown here.`

Each note card renders its category, title, summary, technology tags, and a `Read technical note` link with an arrow icon.

### 1. Deploying WordPress with k3s

- Category: Kubernetes
- Summary: `A practical note on containerizing WordPress and deploying it to a constrained local Kubernetes environment.`
- Technologies: Docker, k3s, Helm
- Link target: `#case-studies`

### 2. Building Docker Images with GitHub Actions

- Category: CI/CD
- Summary: `How a self-hosted runner can build and push application images as part of a repeatable delivery path.`
- Technologies: GitHub Actions, Docker
- Link target: `#case-studies`

### 3. Using Helm Charts

- Category: Kubernetes
- Summary: `Why packaging Kubernetes configuration as a chart makes application deployment easier to repeat and review.`
- Technologies: Helm, Kubernetes
- Link target: `#case-studies`

### 4. Setting Up Prometheus and Grafana

- Category: Monitoring
- Summary: `The monitoring pieces used to make application and cluster behavior easier to inspect.`
- Technologies: Prometheus, Grafana
- Link target: `#case-studies`

### 5. Automating Linux with Ansible

- Category: Infrastructure
- Summary: `A concise look at automating firewall and environment setup around a small deployment.`
- Technologies: Linux, Ansible
- Link target: `#case-studies`

### 6. Deploying Applications on Limited Hardware

- Category: Systems
- Summary: `Tradeoffs that appear when the application, cluster, and monitoring stack share a small VM.`
- Technologies: Linux, Docker, k3s
- Link target: `#timeline`

## Content and Link Behavior

- Case studies and technical notes are static arrays in the frontend; this content is not loaded from a CMS or API.
- The six technical notes are summary cards, not standalone article pages. Five link to the `case-studies` section and one links to the `timeline` section.
- No technical-note detail route or full article body is defined in the current source.
- The `devops-lab-pipeline` case study is the first card, followed by the WordPress case study.
- The WordPress delivery-path pipeline visual appears above the case-study cards.