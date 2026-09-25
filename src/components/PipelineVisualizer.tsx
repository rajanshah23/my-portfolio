import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  GitBranch,
  GitPullRequest,
  ShieldCheck,
} from "lucide-react";

const pushSteps = [
  { label: "Code Commit", badge: "Build", color: "blue" },
  { label: "Build & UT", badge: "Build", color: "blue" },
  { label: "Code Scan", badge: "Scan", color: "green" },
  { label: "Image Build", badge: "Build", color: "blue" },
  { label: "Image Scan", badge: "Scan", color: "green" },
  { label: "Image Push", badge: "Push", color: "blue" },
  { label: "Update K8s Manifests", badge: "Deploy", color: "green" },
  { label: "Deploy", badge: "Deploy", color: "green" },
];

const gitOpsPhases = [
  { step: "1", title: "CI Build → Push Image", detail: "stops here" },
  { step: "2", title: "CI updates values-dev.yaml", detail: "Config Repo · dev branch" },
  { step: "3", title: "ArgoCD auto-syncs Dev", detail: "Dev cluster" },
  { step: "4", title: "E2E Tests pass on Dev", detail: "Automated validation" },
];

const promotionStages = [
  { name: "Dev", detail: "E2E tests", color: "blue" },
  { name: "Staging", detail: "QA + performance", color: "green" },
  { name: "Prod", detail: "Canary 10% → 50% → 100%", color: "navy" },
];

const badgeStyles: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
};

const stageStyles: Record<string, string> = {
  blue: "border-blue-200 bg-blue-50 text-blue-800",
  green: "border-green-200 bg-green-50 text-green-800",
  navy: "border-slate-300 bg-slate-100 text-slate-800",
};

const PipelineVisualizer = () => {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2" aria-label="CI/CD pipeline comparison">
      <article className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
              Push-based delivery
            </p>
            <h3 className="text-xl font-bold text-slate-900">Standard Push-Based Pipeline (Linear)</h3>
          </div>
          <ShieldCheck className="h-6 w-6 shrink-0 text-blue-600" aria-hidden="true" />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
          {pushSteps.map((step, index) => (
            <div key={step.label} className="flex items-center gap-2">
              <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <p className="text-sm font-medium text-slate-800">{step.label}</p>
                <span className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badgeStyles[step.color]}`}>
                  {step.badge}
                </span>
              </div>
              {index < pushSteps.length - 1 && <ArrowRight className="hidden h-4 w-4 shrink-0 text-slate-400 sm:block" aria-hidden="true" />}
              {index < pushSteps.length - 1 && <ArrowDown className="h-4 w-4 self-center text-slate-400 sm:hidden" aria-hidden="true" />}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">CI server has cluster access</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">Manual rollback</span>
        </div>
      </article>

      <article className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-600">
              GitOps progressive promotion
            </p>
            <h3 className="text-xl font-bold text-slate-900">GitOps Multi-Environment Progressive Promotion</h3>
          </div>
          <GitBranch className="h-6 w-6 shrink-0 text-green-600" aria-hidden="true" />
        </div>

        <div className="space-y-3">
          {gitOpsPhases.map((phase) => (
            <div key={phase.step} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">{phase.step}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">{phase.title}</p>
                <p className="text-xs text-slate-500">{phase.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="my-5 flex items-center gap-2 text-xs font-semibold text-green-700">
          <GitPullRequest className="h-4 w-4" aria-hidden="true" />
          <span className="h-px flex-1 bg-green-200" />
          Auto PR + Manual Approval
          <span className="h-px flex-1 bg-green-200" />
        </div>

        <div className="mb-5 flex flex-wrap gap-2 text-xs" aria-label="GitOps pipeline legend">
          {[
            ["CI", "bg-blue-50 text-blue-700 border-blue-200"],
            ["Git", "bg-gray-100 text-gray-700 border-gray-200"],
            ["ArgoCD", "bg-green-50 text-green-700 border-green-200"],
            ["Manual Approval", "bg-yellow-50 text-yellow-800 border-yellow-200"],
            ["Kubernetes", "bg-slate-100 text-slate-800 border-slate-300"],
            ["Monitoring", "bg-purple-50 text-purple-700 border-purple-200"],
          ].map(([label, classes]) => <span key={label} className={`rounded-full border px-3 py-1 font-medium ${classes}`}>{label}</span>)}
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {promotionStages.map((stage, index) => (
            <div key={stage.name} className="flex items-center gap-2 sm:block">
              <div className={`rounded-xl border p-3 ${stageStyles[stage.color]}`}>
                <p className="font-semibold">{stage.name}</p>
                <p className="mt-1 text-xs opacity-80">{stage.detail}</p>
              </div>
              {index < promotionStages.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-green-500 sm:hidden" aria-hidden="true" />}
              {index < promotionStages.length - 1 && <ArrowRight className="mx-1 hidden h-4 w-4 shrink-0 text-green-500 sm:block" aria-hidden="true" />}
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-800">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          Rollback: git revert on the main branch
        </div>
      </article>
    </div>
  );
};

export default PipelineVisualizer;