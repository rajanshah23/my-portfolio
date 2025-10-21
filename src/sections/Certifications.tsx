import { useInView } from "../hooks/useInView";
import { CertificationType } from "../types";
import { ExternalLink } from "lucide-react";

const certifications: CertificationType[] = [
  {
    id: "HackerRank",
    title: "React (Basic) Certificate",
    issuer: "HackerRank",
    issueDate: " 22 Jan, 2025",
    logo: "https://imgs.search.brave.com/9n44vQbH3wJXYkOnI9m8DgVkWZQjyB_dkWR1DjNMNJg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LXJlYWN0LWxvZ28t/aWNvbi1kb3dubG9h/ZC1pbi1zdmctcG5n/LWdpZi1maWxlLWZv/cm1hdHMtLWNvbXBh/bnktYnJhbmQtd29y/bGQtbG9nb3Mtdm9s/LTQtcGFjay1pY29u/cy0yODI1OTkucG5n/P2Y9d2VicCZ3PTI1/Ng",
    color: "blue",
    link: "https://www.hackerrank.com/certificates/iframe/3b9abec9b4f4",
  },
  {
    id: "Typescript",
    title: "Typescript Certificate",
    issuer: "Digital Pathshala",
    issueDate: "2025-05-22",
    logo: "https://imgs.search.brave.com/n1OO9whK_AT0eLAtByiStpy0ioE1JUic6Ndocs9OfmU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi80LzRjL1R5/cGVzY3JpcHRfbG9n/b18yMDIwLnN2Zy8y/NTBweC1UeXBlc2Ny/aXB0X2xvZ29fMjAy/MC5zdmcucG5n",
    color: "blue",
    link: "/certificate/typescript-certificate.pdf",
  },
  {
    id: "azure-cert",
    title: "Azure Fundamentals",
    issuer: "Microsoft Azure",
    issueDate: "May 2023",
    expiryDate: undefined,
    logo: "https://placehold.co/64x64",
    color: "purple",
    link: "#",
  },
];

const Certifications = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="certifications" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl lg:text-4xl font-bold text-center mb-16 ${
            inView ? "animate-fade-in" : "opacity-0"
          }`}
        >
          Certifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className={`bg-gradient-to-br from-${cert.color}-50 to-${
                cert.color === "blue"
                  ? "indigo"
                  : cert.color === "green"
                  ? "emerald"
                  : "pink"
              }-50 rounded-xl p-6 border border-${
                cert.color
              }-100 transform hover:-translate-y-2 transition-all duration-300 ${
                inView ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`flex-shrink-0 w-16 h-16 bg-${cert.color}-500 rounded-lg flex items-center justify-center`}
                >
                  <img
                    src={cert.logo}
                    alt={cert.issuer}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{cert.issuer}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>Issued: {cert.issueDate}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {cert.expiryDate
                        ? `Expires: ${cert.expiryDate}`
                        : "No Expiration"}
                    </span>
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      className={`inline-flex items-center text-${cert.color}-600 hover:text-${cert.color}-700 transition-colors`}
                    >
                      View Certificate
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
