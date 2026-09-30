import { useEffect, useRef, useState } from "react";
import { ArrowRight, ExternalLink, Github, Package, X } from "lucide-react";
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
  dockerHub?: string;
  screenshots?: string[];
  screenshotAlt?: string;
  status: "implemented" | "designed";
};

const CaseStudyCard = ({ title, label, summary, problem, architecture, tools, implementation, security, monitoring, challenges, result, github, dockerHub, screenshots, screenshotAlt, status }: CaseStudyCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocusedElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [isOpen]);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <article className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-label={`Read case study: ${title}`}
          className="group flex w-full flex-1 flex-col p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        >
          <div className="flex w-full items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">{label}</p>
              <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-700">{title}</h3>
            </div>
            <StatusBadge label="Scope" status={status} />
          </div>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">{summary}</p>

          {screenshots && screenshots.length > 0 && (
            <img
              src={screenshots[0]}
              alt={screenshotAlt || `${title} evidence`}
              loading="lazy"
              className="mt-5 h-40 w-full rounded-lg object-cover"
            />
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {tools.slice(0, 4).map((tool) => (
              <span key={tool} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {tool}
              </span>
            ))}
            {tools.length > 4 && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                +{tools.length - 4} more
              </span>
            )}
          </div>

          <span className="mt-6 inline-flex items-center gap-2 border-t border-gray-100 pt-4 text-sm font-semibold text-blue-600 group-hover:text-blue-800">
            Read case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </button>
        {(github || dockerHub) && (
          <div className="flex flex-wrap gap-3 border-t border-gray-100 px-6 py-4">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <Github className="h-4 w-4" aria-hidden="true" />GitHub
              </a>
            )}
            {dockerHub && (
              <a href={dockerHub} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <Package className="h-4 w-4" aria-hidden="true" />Docker Hub
              </a>
            )}
          </div>
        )}
      </article>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-[2px] animate-fade-in"
          onClick={handleOutsideClick}
          role="presentation"
        >
          <div className="flex min-h-screen items-center justify-center px-4 py-12">
            <div
              ref={dialogRef}
              className="max-h-[calc(100vh-4rem)] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white animate-scale-up"
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-modal-title"
              tabIndex={-1}
            >
              <div className="flex items-start justify-between gap-4 border-b border-gray-200 p-6">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">{label}</p>
                  <h2 id="case-study-modal-title" className="text-2xl font-bold text-gray-800">{title}</h2>
                  <StatusBadge label="Scope" status={status} />
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close case study"
                  className="shrink-0 rounded-full p-2 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="p-6">
                <p className="mb-8 leading-relaxed text-gray-600">{summary}</p>

                <div className="grid gap-5 md:grid-cols-2">
                  {problem && <div><h3 className="font-semibold text-slate-900">Problem</h3><p className="mt-1 text-sm leading-relaxed text-gray-600">{problem}</p></div>}
                  {architecture && <div><h3 className="font-semibold text-slate-900">Architecture</h3><p className="mt-1 text-sm leading-relaxed text-gray-600">{architecture}</p></div>}
                  {security && <div><h3 className="font-semibold text-slate-900">Security</h3><p className="mt-1 text-sm leading-relaxed text-gray-600">{security}</p></div>}
                  {monitoring && <div><h3 className="font-semibold text-slate-900">Monitoring</h3><p className="mt-1 text-sm leading-relaxed text-gray-600">{monitoring}</p></div>}
                  {challenges && <div><h3 className="font-semibold text-slate-900">Challenges</h3><p className="mt-1 text-sm leading-relaxed text-gray-600">{challenges}</p></div>}
                  {result && <div><h3 className="font-semibold text-slate-900">Result</h3><p className="mt-1 text-sm leading-relaxed text-gray-600">{result}</p></div>}
                </div>

                <div className="mt-8 border-t border-gray-100 pt-5">
                  <h3 className="font-semibold text-slate-900">Tools</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tools.map((tool) => (
                      <span key={tool} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{tool}</span>
                    ))}
                  </div>
                  <h3 className="mt-6 font-semibold text-slate-900">Implementation</h3>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm leading-relaxed text-gray-600">
                    {implementation.map((step) => <li key={step}>{step}</li>)}
                  </ul>
                </div>

                {screenshots && screenshots.length > 0 && (
                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {screenshots.map((screenshot) => (
                      <img key={screenshot} src={screenshot} alt={screenshotAlt || `${title} evidence`} loading="lazy" className="w-full rounded-lg object-cover" />
                    ))}
                  </div>
                )}

                {(github || dockerHub) && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {github && <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"><Github className="h-4 w-4" aria-hidden="true" />View GitHub project<ExternalLink className="h-4 w-4" aria-hidden="true" /></a>}
                    {dockerHub && <a href={dockerHub} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"><Package className="h-4 w-4" aria-hidden="true" />View on Docker Hub<ExternalLink className="h-4 w-4" aria-hidden="true" /></a>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CaseStudyCard;
