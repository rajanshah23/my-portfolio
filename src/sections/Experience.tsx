import { useInView } from "../hooks/useInView";

const experiences = [
  {
    role: "DevOps Training",
    organization: "Tech Axis Pvt. Ltd.",
    period: "April 28 – August 7, 2026 · Certificate of Completion",
    details: [
      "Built and managed containerized applications with Docker and Docker Compose.",
      "Used Git, GitHub, and GitHub Actions to automate CI/CD workflows.",
      "Worked with Kubernetes (k3s), Helm, and Ansible for repeatable deployments and infrastructure automation.",
      "Set up Prometheus and Grafana monitoring on Linux (AlmaLinux).",
      "Verify certificate: techaxis.com.np/certification",
    ],
  },
  {
    role: "MERN Stack Intern",
    organization: "Digital Pathshala Pvt. Ltd., Itahari, Sunsari",
    period: "May 5 – June 9, 2025",
    details: [
      "Developed REST APIs for a Theatre Booking System using Node.js, Express, and Supabase (PostgreSQL).",
      "Implemented JWT authentication, role-based access, and Khalti payment verification.",
      "Built real-time seat booking, cancellation, and overlap validation logic.",
      "Designed optimized PostgreSQL tables and improved API response performance.",
      "Integrated Supabase Storage for uploading show images and user assets.",
    ],
  },
  {
    role: "Technical Mentor",
    organization: "Paschimanchal Campus",
    period: "2023 – 2024",
    details: [
      "Mentored 15+ junior students in full-stack development and led weekly sessions on React.js, Node.js, and database design.",
      "Led soldering and PCB design workshops for 30+ participants.",
      "Led project teams and mentored junior students in embedded systems.",
    ],
  },
];

const Experience = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="experience" className="bg-gray-50 px-4 py-20" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <h2 className={`mb-12 text-center text-3xl font-bold lg:text-4xl ${inView ? "animate-fade-in" : "opacity-0"}`}>
          Experience &amp; Training
        </h2>
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <article
              key={experience.role}
              className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm ${inView ? "animate-fade-in" : "opacity-0"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{experience.role}</h3>
                  <p className="mt-1 text-gray-600">{experience.organization}</p>
                </div>
                <p className="shrink-0 font-medium text-blue-700">{experience.period}</p>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-600">
                {experience.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;