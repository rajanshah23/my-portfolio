 import React from "react";
import {
  SiJavascript, SiTypescript, SiPython, SiC,
  SiReact, SiNextdotjs, SiHtml5, SiCss3, SiTailwindcss,
  SiNodedotjs, SiExpress, SiDjango, SiFlask, SiPostgresql,
  SiSupabase, SiMongodb, SiMysql, SiGit, SiGithub, SiPostman,
  SiDocker, SiAmazon, SiLinux, SiRaspberrypi, SiArduino,
  SiTensorflow, SiOpencv,
} from "react-icons/si";

// All skills with icons and names
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
  // Split skills into two rows of 13 each
  const row1 = skills.slice(0, 13);
  const row2 = skills.slice(13, 26);

  return (
    <section id="skills" className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Technical Skills</h2>

      {/* First row */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {row1.map((skill, idx) => (
          <div key={idx} className="flex flex-col items-center w-20 sm:w-24 md:w-28">
            {skill.icon}
            <span className="mt-2 text-sm text-gray-900 text-center">{skill.name}</span>
          </div>
        ))}
      </div>

      {/* Second row */}
      <div className="flex justify-center gap-8">
        {row2.map((skill, idx) => (
          <div key={idx} className="flex flex-col items-center">
            {skill.icon}
            <span className="mt-2 text-sm text-gray-700">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsTwoRows;

 