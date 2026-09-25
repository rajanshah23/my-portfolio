import { ExternalLink, Github } from "lucide-react";
import StatusBadge from "./StatusBadge";

type CaseStudyCardProps = {
  title: string;
  label: string;
  summary: string;
  problem: string;
  architecture: string;
  tools: string[];
  implementation: string[];
  security: string;
  monitoring: string;
  challenges: string;
  result: string;
  github?: string;
  screenshots?: string[];
  status: "implemented" | "designed";
};

const CaseStudyCard = ({ title, label, summary, problem, architecture, tools, implementation, security, monitoring, challenges, result, github, screenshots, status }: CaseStudyCardProps) => (
  <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      </div>
      <StatusBadge label="Scope" status={status} />
    </div>
    <p className="mt-4 text-gray-600">{summary}</p>

    <div className="mt-6 grid gap-5 md:grid-cols-2">
      <div><h4 className="font-semibold text-slate-900">Problem</h4><p className="mt-1 text-sm leading-relaxed text-gray-600">{problem}</p></div>
      <div><h4 className="font-semibold text-slate-900">Architecture</h4><p className="mt-1 text-sm leading-relaxed text-gray-600">{architecture}</p></div>
      <div><h4 className="font-semibold text-slate-900">Security</h4><p className="mt-1 text-sm leading-relaxed text-gray-600">{security}</p></div>
      <div><h4 className="font-semibold text-slate-900">Monitoring</h4><p className="mt-1 text-sm leading-relaxed text-gray-600">{monitoring}</p></div>
      <div><h4 className="font-semibold text-slate-900">Challenges</h4><p className="mt-1 text-sm leading-relaxed text-gray-600">{challenges}</p></div>
      <div><h4 className="font-semibold text-slate-900">Result</h4><p className="mt-1 text-sm leading-relaxed text-gray-600">{result}</p></div>
    </div>

    <div className="mt-6 border-t border-gray-100 pt-5">
      <h4 className="font-semibold text-slate-900">Tools</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {tools.map((tool) => <span key={tool} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{tool}</span>)}
      </div>
      <h4 className="mt-5 font-semibold text-slate-900">Implementation</h4>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">
        {implementation.map((step) => <li key={step}>{step}</li>)}
      </ul>
    </div>

    {screenshots && screenshots.length > 0 && (
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {screenshots.map((screenshot) => <img key={screenshot} src={screenshot} alt={`${title} evidence`} loading="lazy" className="h-40 w-full rounded-lg object-cover" />)}
      </div>
    )}

    {github && <a href={github} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"><Github className="h-4 w-4" />View GitHub project<ExternalLink className="h-4 w-4" /></a>}
  </article>
);

export default CaseStudyCard;
