import { ArrowRight, CheckCircle2, Circle } from "lucide-react";

const stages = [
  { label: "Code Push", tone: "active" },
  { label: "Build", tone: "complete" },
  { label: "Test", tone: "complete" },
  { label: "Docker Image", tone: "complete" },
  { label: "Registry", tone: "neutral" },
  { label: "Kubernetes", tone: "neutral" },
  { label: "Health Check", tone: "neutral" },
  { label: "Monitoring", tone: "neutral" },
];

const toneStyles = {
  active: "border-blue-300 bg-blue-50 text-blue-800",
  complete: "border-green-300 bg-green-50 text-green-800",
  neutral: "border-gray-200 bg-gray-50 text-gray-700",
};

const CICDPipeline = () => (
  <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex min-w-[760px] items-center justify-between gap-2" aria-label="Continuous delivery pipeline">
      {stages.map((stage, index) => (
        <div key={stage.label} className="flex items-center gap-2">
          <div className={`flex min-w-[76px] flex-col items-center gap-2 rounded-xl border px-2 py-3 text-center text-xs font-semibold ${toneStyles[stage.tone as keyof typeof toneStyles]}`}>
            {stage.tone === "complete" ? <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> : stage.tone === "active" ? <Circle className="h-5 w-5" aria-hidden="true" /> : <span className="h-5 w-5 rounded-full border-2 border-current" aria-hidden="true" />}
            <span>{stage.label}</span>
          </div>
          {index < stages.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />}
        </div>
      ))}
    </div>
  </div>
);

export default CICDPipeline;
