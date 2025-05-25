import { CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { experiences } from '@/lib/cvData';

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();

  const getTimelineColor = (index: number) => {
    const colors = ['accent', 'primary', 'warning', 'secondary'];
    return colors[index % colors.length];
  };

  return (
    <section id="experience" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Expérience Professionnelle</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-accent hidden md:block"></div>
          
          {experiences.map((experience, index) => (
            <div 
              key={experience.id}
              className={`relative mb-12 md:ml-16 transition-all duration-1000 delay-${index * 200} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className={`absolute -left-20 top-6 w-4 h-4 bg-${getTimelineColor(index)} rounded-full border-4 border-white shadow-lg hidden md:block`}></div>
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary mb-2">{experience.position}</h3>
                    <h4 className="text-xl font-semibold text-primary mb-2">{experience.company}</h4>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      experience.isCurrent 
                        ? 'bg-accent text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {experience.startDate} - {experience.endDate}
                    </span>
                  </div>
                  {experience.isCurrent && (
                    <div className="mt-4 md:mt-0">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        Poste Actuel
                      </span>
                    </div>
                  )}
                </div>
                
                {experience.projects.map((project, projectIndex) => (
                  <div key={projectIndex} className="mb-6">
                    <h5 className="font-semibold text-lg mb-3 text-secondary">{project.name}</h5>
                    {project.description && (
                      <p className="text-gray-600 mb-3">{project.description}</p>
                    )}
                    <ul className="space-y-2 text-gray-600">
                      {project.achievements.slice(0, 4).map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start">
                          <CheckCircle className="text-accent mt-1 mr-3 flex-shrink-0" size={16} />
                          <span>{achievement}</span>
                        </li>
                      ))}
                      {project.achievements.length > 4 && (
                        <li className="text-gray-500 text-sm ml-6">
                          +{project.achievements.length - 4} autres réalisations...
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
                
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.slice(0, 6).map((tech) => (
                    <span 
                      key={tech}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {experience.technologies.length > 6 && (
                    <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
                      +{experience.technologies.length - 6} autres
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
