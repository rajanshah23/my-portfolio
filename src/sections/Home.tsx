import { useState, useEffect, useMemo } from "react";

const Home = () => {
  const [typedText, setTypedText] = useState("");
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const strings = useMemo(
    () => [
      "Electronics, Communication and Information Engineer",
      "MERN Stack Developer",
      "Problem Solver",
    ],
    []
  );

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeText = () => {
      const currentString = strings[currentStringIndex];
      setTypedText((prev) => {
        if (isDeleting) {
          return prev.substring(0, prev.length - 1);
        } else {
          return currentString.substring(0, prev.length + 1);
        }
      });

      if (!isDeleting && typedText === currentString) {
        timeoutId = setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length);
      } else {
        const typingSpeed = isDeleting ? 50 : 100;
        timeoutId = setTimeout(typeText, typingSpeed);
      }
    };

    timeoutId = setTimeout(typeText, 100);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [typedText, isDeleting, currentStringIndex, strings]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center py-16 lg:py-0 px-4 lg:px-8 mt-16 lg:mt-0 relative overflow-hidden"
    >
      <div className="container mx-auto ">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
          {/* Introduction Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-gray-800">
              Hi, I'm{" "}
              <span className="text-blue-600 block sm:inline mt-2 sm:mt-0">
                Rajan Kumar Gupta
              </span>
            </h1>

            <div className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-6 lg:mb-8 min-h-8 flex justify-center lg:justify-start items-center">
              <span className="typed">{typedText}</span>
              <span
                className={`inline-block w-0.5 h-6 bg-blue-600 ml-1 ${
                  typedText.length > 0 ? "animate-pulse" : ""
                }`}
              ></span>
            </div>

            <p className="text-gray-600 mb-6 lg:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-justify lg:text-left">
              I'm an Electronics,Communication and Information Engineer passionate about bridging
              gap between hardware and software. Skilled in full-stack
              development, IoT, and embedded systems with hands-on experience
              using Raspberry Pi, Arduino, and ESP modules.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="px-6 py-2 sm:px-8 sm:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all text-sm sm:text-base"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="px-6 py-2 sm:px-8 sm:py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-all text-sm sm:text-base"
              >
                View Projects
              </a>
              
              <a
                href="/Rajan_Kumar_Gupta_CV.pdf"  
                download="RajanKumarGupta_CV.pdf"
                className="px-6 py-2 sm:px-8 sm:py-3 bg-blue-600 text-white rounded-full hover:bg-gray-900 transition-all text-sm sm:text-base"
              >
                Download CV
              </a>
            </div>
          </div>
 
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:mx-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transform -translate-x-3 translate-y-3 -rotate-6"></div>
              <div className="relative rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img
                  src="/images/rajan-gupta.jpg"
                  alt="Rajan Kumar Gupta"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Home;