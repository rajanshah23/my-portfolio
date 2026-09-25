import { ArrowDown } from "lucide-react";
import { useInView } from "../hooks/useInView";

const milestones = [
  ["Electronics and Embedded Systems", "Built a foundation in sensors, circuits, Raspberry Pi, Arduino, and hardware projects."],
  ["Full-Stack Development", "Moved from device-level thinking to user-facing applications with React and the MERN stack."],
  ["Backend APIs", "Focused on REST APIs, authentication, validation, PostgreSQL, Supabase, and service design."],
  ["Linux and Docker", "Learned to package applications and work with the operating environment beneath them."],
  ["CI/CD", "Automated builds, tests, image creation, and deployment workflows with GitHub Actions."],
  ["Kubernetes", "Extended deployment automation into k3s, Helm, cluster networking, and repeatable releases."],
  ["Monitoring and Infrastructure", "Added Prometheus, Grafana, Ansible, and architecture-level thinking about reliability."],
];

const DevOpsTimeline = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="timeline" className="bg-white px-4 py-20" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <div className={`mb-12 text-center ${inView ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="mb-4 text-3xl font-bold text-slate-900 lg:text-4xl">Engineering Progression</h2>
          <p className="text-lg text-gray-600">The path from hardware systems to software delivery and infrastructure.</p>
        </div>
        <div className="space-y-3">
          {milestones.map(([title, description], index) => (
            <div key={title} className={`flex items-stretch gap-4 ${inView ? "animate-fade-in" : "opacity-0"}`} style={{ animationDelay: `${index * 80}ms` }}>
              <div className="flex w-8 shrink-0 flex-col items-center"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{index + 1}</span>{index < milestones.length - 1 && <span className="mt-1 w-px flex-1 bg-blue-200" />}</div>
              <div className="mb-2 flex-1 rounded-xl border border-gray-200 bg-gray-50 p-4"><h3 className="font-semibold text-slate-900">{title}</h3><p className="mt-1 text-sm leading-relaxed text-gray-600">{description}</p></div>
              {index < milestones.length - 1 && <ArrowDown className="mt-6 hidden h-4 w-4 text-blue-300 sm:block" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevOpsTimeline;
