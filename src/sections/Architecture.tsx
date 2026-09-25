import { GitBranch, Layers3, ShieldCheck } from "lucide-react";
import { useInView } from "../hooks/useInView";

const diagrams = [
  {
    title: "Push-based delivery",
    label: "Architecture design",
    icon: GitBranch,
    flow: "Application repository -> CI build and tests -> Docker image -> registry -> kubectl or Helm -> Kubernetes",
    components: ["CI server", "Container registry", "Kubernetes cluster", "Helm / kubectl"],
    explanation: "A direct delivery path that favors speed and simplicity while requiring the CI server to hold cluster permissions.",
  },
  {
    title: "GitOps environment promotion",
    label: "Production-inspired architecture design",
    icon: Layers3,
    flow: "Application repository -> CI -> image registry -> config repository -> ArgoCD -> Dev -> Staging -> Prod",
    components: ["Application repository", "Config repository", "ArgoCD", "Dev / Staging / Prod"],
    explanation: "A pull-based model where environment state lives in Git and promotion is visible through reviewed pull requests.",
  },
  {
    title: "Delivery safety controls",
    label: "Recommended controls",
    icon: ShieldCheck,
    flow: "Code scan -> image scan -> approval gate -> canary -> health signal -> promote or git revert",
    components: ["SAST / SCA", "Image scanning", "Manual approval", "Canary rollout"],
    explanation: "Security checks, approval gates, and observable rollout stages make failure handling explicit without claiming production deployment.",
  },
];

const Architecture = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="architecture" className="bg-gray-50 px-4 py-20" ref={ref}>
      <div className="container mx-auto">
        <div className={`mb-12 text-center ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 lg:text-4xl">Architecture Design Notes</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">Readable diagrams for the delivery, environment, and safety decisions behind the portfolio's DevOps work.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {diagrams.map(({ title, label, icon: Icon, flow, components, explanation }) => (
            <article key={title} className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${inView ? "animate-fade-in" : "opacity-0"}`}>
              <Icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-blue-600">{label}</p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-4 rounded-xl bg-slate-900 p-4 text-sm leading-relaxed text-white">{flow}</p>
              <div className="mt-4 flex flex-wrap gap-2">{components.map((component) => <span key={component} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700">{component}</span>)}</div>
              <p className="mt-5 text-sm leading-relaxed text-gray-600">{explanation}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Architecture;
