import { useInView } from "../hooks/useInView";

const About = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="about" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl lg:text-4xl font-bold text-center mb-16 ${
            inView ? "animate-fade-in" : "opacity-0"
          }`}
        >
          About Me
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Gallery */}
          <div
            className={`lg:w-1/2 grid grid-cols-2 gap-4 ${
              inView ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <div className="relative group">
              <img
                src="/images/code1.jpg"
                alt="Personal photo 1"
                className="rounded-lg shadow-md transform transition-transform group-hover:scale-105"
              />
            </div>
            <div className="relative group mt-8">
              <img
                src="/images/laptop1.jpg"
                alt="Personal photo 2"
                className="rounded-lg shadow-md transform transition-transform group-hover:scale-105"
              />
            </div>
            <div className="relative group">
              <img
                src="/images/hardwar1.jpg"
                alt="Personal photo 3"
                className="rounded-lg shadow-md transform transition-transform group-hover:scale-105"
              />
            </div>
            <div className="relative group">
              <img
                src="/images/cup1.jpg"
                alt="Personal photo 4"
                className="rounded-lg shadow-md transform transition-transform group-hover:scale-105"
              />
            </div>
          </div>

          {/* About Content */}
          <div
            className={`lg:w-1/2 ${
              inView ? "animate-fade-in delay-200" : "opacity-0"
            }`}
          >
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">
                  Backend Engineer
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  I build reliable backend services, REST APIs, and application
                  logic with a focus on maintainability, performance, and clean
                  system design. My work includes API development, database
                  integration, authentication, validation, and service-layer
                  architecture.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-4 text-green-600">
                  DevOps Engineer
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  I automate deployment workflows and infrastructure using Linux,
                  Docker, GitHub Actions, Kubernetes, Helm, Prometheus,
                  Grafana, and Ansible. My focus is on building repeatable,
                  observable, and reliable delivery systems in real-world
                  environments.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">
                  My Approach
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  I combine software engineering with practical systems thinking,
                  creating solutions that connect application delivery,
                  automation, and infrastructure into one streamlined workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
