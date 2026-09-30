import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

 
import { useInView } from "../hooks/useInView";

const educationItems = [
  {
    id: 'university',
    degree: 'Bachelor in Electronics, Communication and Information Engineering',
    institution: 'Paschimanchal Campus, Tribhuvan University',
    period: '2021 - 2025',
    description: 'Bachelor in Electronics, Communication and Information Engineering at Paschimanchal Campus, Tribhuvan University, Pokhara, Nepal.',
    achievements: ['ECG Monitoring System', 'Obstacle Detection for Visually Impaired'],
    color: 'blue',
    position: 'right',
  },
  {
    id: 'highschool',
    degree: 'Higher Secondary Education',
    institution: "Kalika Manavgyan Secondary School",
    period: '2018 - 2020',
    description: 'Higher Secondary Education at Kalika Manavgyan Secondary School, Butwal, Nepal.',
    achievements: [],
    color: 'purple',
    position: 'left',
  },
];

const colorMap: Record<string, string> = {
  blue: '#3B82F6',    // Tailwind blue-500
  purple: '#8B5CF6',  // Tailwind purple-500
  green: '#22C55E',   // Tailwind green-500
};

const colorClasses: Record<string, { text: string; background: string }> = {
  blue: { text: 'text-blue-600', background: 'bg-blue-50' },
  purple: { text: 'text-purple-600', background: 'bg-purple-50' },
  green: { text: 'text-green-600', background: 'bg-green-50' },
};

const Education = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (cardId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  return (
    <section id="education" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl lg:text-4xl font-bold text-center mb-16 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          Education Timeline
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-500"></div>
          
          {/* Timeline Line - Mobile */}
          <div className="md:hidden absolute left-6 top-0 h-full w-0.5 bg-blue-500"></div>

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-16">
            {educationItems.map((item, index) => (
              <div
                key={item.id}
                className={`relative ${inView ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Mobile Layout */}
                <div className="md:hidden flex items-start">
                  {/* Mobile Dot */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full border-4 bg-white z-10 mr-4"
                    style={{ borderColor: colorMap[item.color] }}
                  ></div>
                  
                  {/* Mobile Card */}
                  <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
                    {/* Always visible header */}
                    <div 
                      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleCard(item.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <span className={`${colorClasses[item.color].text} font-semibold text-sm block`}>
                            {item.period}
                          </span>
                          <h3 className="text-lg font-bold text-gray-800 mt-1">
                            {item.degree}
                          </h3>
                          <span className="text-gray-600 text-sm">
                            {item.institution}
                          </span>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          {expandedCards[item.id] ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expandable content */}
                    {expandedCards[item.id] && (
                      <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                        <p className="text-gray-600 text-sm mt-3 mb-3">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.achievements.map((achievement, i) => (
                            <span 
                              key={i} 
                              className={`px-2 py-1 ${colorClasses[item.color].background} ${colorClasses[item.color].text} rounded-full text-xs`}
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                  {item.position === 'left' ? (
                    <>
                      <div className="w-5/12 bg-white p-6 rounded-xl shadow-sm border border-gray-300">
                        <div className="flex flex-col">
                          <span className={`${colorClasses[item.color].text} font-semibold mb-1`}>{item.period}</span>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{item.degree}</h3>
                          <span className="text-gray-600 mb-3">{item.institution}</span>
                          <p className="text-gray-600">{item.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.achievements.map((achievement, i) => (
                              <span key={i} className={`px-3 py-1 ${colorClasses[item.color].background} ${colorClasses[item.color].text} rounded-full text-sm`}>
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Center Dot */}
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 bg-white z-10"
                        style={{ borderColor: colorMap[item.color] }}
                      ></div>

                      <div className="w-5/12">{/* Empty for spacing */}</div>
                    </>
                  ) : (
                    <>
                      <div className="w-5/12">{/* Empty for spacing */}</div>

                      {/* Center Dot */}
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 bg-white z-10"
                        style={{ borderColor: colorMap[item.color] }}
                      ></div>

                      <div className="w-5/12 bg-white p-6 rounded-xl shadow-sm border border-gray-300">
                        <div className="flex flex-col">
                          <span className={`${colorClasses[item.color].text} font-semibold mb-1`}>{item.period}</span>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{item.degree}</h3>
                          <span className="text-gray-600 mb-3">{item.institution}</span>
                          <p className="text-gray-600">{item.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.achievements.map((achievement, i) => (
                              <span key={i} className={`px-3 py-1 ${colorClasses[item.color].background} ${colorClasses[item.color].text} rounded-full text-sm`}>
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Publications</h2>
          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="leading-relaxed text-gray-700">
              A. Laudari Bhat, B. KC Khatri, G. Rijal, R. K. Gupta, S. Adhikari, "Obstacle Detection for Visually Impaired," Proceedings of IOE Graduate Conference, Vol. 16, pp. 1913–1919, April 2025.
            </p>
            <a
              href="https://lnkd.in/g8TuWbnm"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              View publication
            </a>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Education;