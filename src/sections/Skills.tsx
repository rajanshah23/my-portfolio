import {
  SiJavascript, SiTypescript, SiPython, SiC,
  SiReact, SiNextdotjs, SiHtml5, SiCss3, SiTailwindcss,
  SiNodedotjs, SiExpress, SiDjango, SiFlask, SiPostgresql,
  SiSupabase, SiMongodb, SiMysql, SiGit, SiGithub, SiPostman,
  SiDocker, SiAmazon, SiLinux, SiRaspberrypi, SiArduino,
  SiTensorflow, SiOpencv,
} from "react-icons/si";

const skills = [
  { icon: <SiJavascript size={40} color="#F7DF1E" />, name: "JavaScript" },
  { icon: <SiTypescript size={40} color="#3178C6" />, name: "TypeScript" },
  { icon: <SiPython size={40} color="#3776AB" />, name: "Python" },
  { icon: <SiC size={40} color="#A8B9CC" />, name: "C/C++" },
  { icon: <SiReact size={40} color="#61DAFB" />, name: "React" },
  { icon: <SiNextdotjs size={40} color="black" />, name: "Next.js" },
  { icon: <SiHtml5 size={40} color="#E34F26" />, name: "HTML5" },
  { icon: <SiCss3 size={40} color="#1572B6" />, name: "CSS3" },
  { icon: <SiTailwindcss size={40} color="#38BDF8" />, name: "Tailwind" },
  { icon: <SiNodedotjs size={40} color="#339933" />, name: "Node.js" },
  { icon: <SiExpress size={40} color="black" />, name: "Express" },
  { icon: <SiDjango size={40} color="#092E20" />, name: "Django" },
  { icon: <SiFlask size={40} color="black" />, name: "Flask" },
  { icon: <SiPostgresql size={40} color="#4169E1" />, name: "PostgreSQL" },
  { icon: <SiSupabase size={40} color="#3ECF8E" />, name: "Supabase" },
  { icon: <SiMongodb size={40} color="#47A248" />, name: "MongoDB" },
  { icon: <SiMysql size={40} color="#4479A1" />, name: "MySQL" },
  { icon: <SiGit size={40} color="#F05032" />, name: "Git" },
  { icon: <SiGithub size={40} color="black" />, name: "GitHub" },
  { icon: <SiPostman size={40} color="#FF6C37" />, name: "Postman" },
  { icon: <SiDocker size={40} color="#2496ED" />, name: "Docker" },
  { icon: <SiAmazon size={40} color="#FF9900" />, name: "AWS" },
  { icon: <SiLinux size={40} color="#FCC624" />, name: "Linux" },
  { icon: <SiRaspberrypi size={40} color="#C51A4A" />, name: "Raspberry Pi" },
  { icon: <SiArduino size={40} color="#00979D" />, name: "Arduino" },
  { icon: <SiTensorflow size={40} color="#FF6F00" />, name: "TensorFlow" },
  { icon: <SiOpencv size={40} color="#5C3EE8" />, name: "OpenCV" },
];

const SkillsTwoRows = () => {
  const row1 = skills.slice(0, 13);
  const row2 = skills.slice(13, 26);

  return (
    <section id="skills" className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-4xl font-bold text-center mb-16 ">
        Technical Skills
      </h2>

      {/* First row */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {row1.map((skill, idx) => (
          <div
            key={idx}
            className="group flex flex-col items-center w-20 sm:w-24 md:w-28 p-4 rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
          >
            <div className="transform group-hover:scale-110 transition-transform duration-300">
              {skill.icon}
            </div>
            <span className="mt-3 text-sm font-medium text-gray-700 text-center group-hover:text-blue-600 transition-colors duration-300">
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      {/* Second row */}
      <div className="flex flex-wrap justify-center gap-6">
        {row2.map((skill, idx) => (
          <div
            key={idx}
            className="group flex flex-col items-center w-20 sm:w-24 md:w-28 p-4 rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
          >
            <div className="transform group-hover:scale-110 transition-transform duration-300">
              {skill.icon}
            </div>
            <span className="mt-3 text-sm font-medium text-gray-700 text-center group-hover:text-blue-600 transition-colors duration-300">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsTwoRows;