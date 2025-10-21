import React, { forwardRef } from 'react';
import { Cpu, Layout, Code2, Database, Wrench } from "lucide-react";
import { useInView } from 'react-intersection-observer';
type Skill = {
  name: string;
  proficiency: number;
};

type SkillCategory = {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
};

const LANGUAGE_COLORS: Record<string, string> = {
  html: 'text-orange-600',
  css: 'text-blue-600',
  javascript: 'text-yellow-500',
  typescript: 'text-blue-500',
  react: 'text-cyan-500',
  node: 'text-green-600',
  python: 'text-blue-400',
  'c++': 'text-pink-600',
  c: 'text-gray-600',
  next: 'text-gray-800',
  redux: 'text-purple-500',
  bootstrap: 'text-purple-600',
  tailwind: 'text-cyan-400',
  git: 'text-orange-600',
  docker: 'text-blue-400',
  aws: 'text-yellow-600',
  linux: 'text-yellow-700'
};

const getLanguageColor = (languageName: string) => {
  const lang = languageName.toLowerCase();
  return LANGUAGE_COLORS[lang] || 'text-gray-700';
};

const AnimatedSkillCard = ({ name, proficiency, inView }: Skill & { inView: boolean }) => (
  <div className="bg-white rounded-lg px-3 py-2 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow duration-300">
    <span className={`text-sm font-medium ${getLanguageColor(name)} min-w-[80px]`}>
      {name}
    </span>
    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out"
        style={{ 
          width: inView ? `${proficiency}%` : '0%',
          transitionDelay: '0.1s'
        }}
      />
    </div>
    <span className="text-xs font-medium text-gray-500 min-w-[32px]">
      {proficiency}%
    </span>
  </div>
);

const AnimatedCategorySection = ({ 
  category,
  inView,
  delay
}: { 
  category: SkillCategory;
  inView: boolean;
  delay: number;
}) => (
  <div 
    className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-300"
    style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.5s ease-out ${delay * 0.1}s`
    }}
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        {category.icon}
      </div>
      <h3 className="text-base font-semibold text-gray-800">{category.title}</h3>
    </div>
    <div className="space-y-2">
      {category.skills.map((skill, index) => (
        <AnimatedSkillCard key={index} {...skill} inView={inView} />
      ))}
    </div>
  </div>
);

interface TechnicalSkillsProps {
  className?: string;
}

const TechnicalSkills = forwardRef<HTMLDivElement, TechnicalSkillsProps>(
  ({ className = '' }, ref) => {
    const { ref: inViewRef, inView } = useInView({
      threshold: 0.1,
      rootMargin: '-50px 0px'
    });

    // Combine refs to support both forwarded ref and inView ref
    const setRefs = (el: HTMLDivElement | null) => {
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
      inViewRef(el);
    };

    const categories: SkillCategory[] = [
      {
        title: "Frontend Development",
        icon: <Layout className="w-6 h-6 text-blue-600" />,
        skills: [
          { name: 'HTML5', proficiency: 95 },
          { name: 'CSS3', proficiency: 95 },
          { name: 'JavaScript', proficiency: 85 },
          { name: 'React', proficiency: 85 },
          { name: 'TypeScript', proficiency: 85 }
        ]
      },
      {
        title: "Backend Development",
        icon: <Code2 className="w-6 h-6 text-green-600" />,
        skills: [
          { name: 'Node.js', proficiency: 90 },
          { name: 'Python', proficiency: 65 },
          { name: 'C', proficiency: 75 },
          { name: 'C++', proficiency: 80 }
        ]
      },
      {
        title: "Frameworks & Libraries",
        icon: <Database className="w-6 h-6 text-purple-600" />,
        skills: [
          { name: 'Next.js', proficiency: 80 },
          { name: 'Redux', proficiency: 75 },
          { name: 'Bootstrap', proficiency: 90 },
          { name: 'Tailwind CSS', proficiency: 90 }
        ]
      },
      {
        title: "Tools & Technologies",
        icon: <Wrench className="w-6 h-6 text-orange-600" />,
        skills: [
          { name: 'Git', proficiency: 90 },
          { name: 'Docker', proficiency: 85 },
          { name: 'AWS', proficiency: 80 },
          { name: 'Linux', proficiency: 85 }
        ]
      },
      {
    title: "Embedded & IoT",
    icon: <Cpu className="w-6 h-6 text-red-600" />,
    skills: [
      { name: 'Raspberry Pi', proficiency: 90 },
      { name: 'Arduino', proficiency: 90 },
      { name: 'ESP8266/ESP32', proficiency: 85 },
      { name: 'AD8232 ECG Sensor', proficiency: 75 },
      { name: 'RS485', proficiency: 70 },
      { name: 'RS232', proficiency: 70 },
      { name: 'UART', proficiency: 80 }
    ]
  }
    ];

    return (
      <section 
        id="skills"
        ref={setRefs}
        className={`max-w-7xl mx-auto p-9 bg-gradient-to-br from-gray-50 to-white ${className}`}
      >
        <h2 
          className="text-3xl lg:text-4xl font-bold text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-out'
          }}
        >
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <AnimatedCategorySection 
              key={index} 
              category={category} 
              inView={inView}
              delay={index}
            />
          ))}
        </div>
      </section>
    );
  }
);

TechnicalSkills.displayName = 'TechnicalSkills';

export default TechnicalSkills;