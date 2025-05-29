import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { experiences } from '@/lib/cvData';
import { useState } from 'react';

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [expandedTechnologies, setExpandedTechnologies] = useState<Set<string>>(new Set());

  const toggleProject = (experienceId: string, projectIndex: number) => {
    const projectKey = `${experienceId}-${projectIndex}`;
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectKey)) {
        newSet.delete(projectKey);
      } else {
        newSet.add(projectKey);
      }
      return newSet;
    });
  };

  const isProjectExpanded = (experienceId: string, projectIndex: number) => {
    const projectKey = `${experienceId}-${projectIndex}`;
    return expandedProjects.has(projectKey);
  };

  const toggleTechnologies = (experienceId: string) => {
    setExpandedTechnologies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(experienceId)) {
        newSet.delete(experienceId);
      } else {
        newSet.add(experienceId);
      }
      return newSet;
    });
  };

  const isTechnologiesExpanded = (experienceId: string) => {
    return expandedTechnologies.has(experienceId);
  };

  return (
    <section id="experience" className="py-2 md:py-4 lg:py-6 bg-gray-50" ref={ref}>
      <div className="max-w-full mx-auto px-1 sm:px-2 lg:px-3">
        <div className="text-center mb-2 md:mb-4">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary mb-1">Expérience Professionnelle</h2>
          <div className="w-8 md:w-12 h-0.5 bg-accent mx-auto"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-2 md:left-3 top-0 bottom-0 w-0.5 bg-accent hidden sm:block"></div>

          {experiences.map((experience, index) => (
            <div 
              key={experience.id}
              className={`relative mb-1.5 md:mb-2 sm:ml-3 md:ml-4 transition-all duration-1000 delay-${index * 200} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className={`absolute -left-5 sm:-left-6 md:-left-7 top-0.5 md:top-1 w-1.5 md:w-2 h-1.5 md:h-2 rounded-full border-1 border-white shadow-md hidden sm:block ${
                index % 4 === 0 ? 'bg-accent' :
                index % 4 === 1 ? 'bg-primary' :
                index % 4 === 2 ? 'bg-yellow-500' :
                'bg-secondary'
              }`}></div>

              <div className="bg-white rounded-md shadow-sm p-1.5 md:p-2 lg:p-3 hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-0.5 md:mb-1">
                  <div className="flex-1">
                    <h3 className="text-xs md:text-sm font-bold text-secondary mb-0.5">{experience.position}</h3>
                    <h4 className="text-xs md:text-sm font-semibold text-primary mb-0.5">{experience.company}</h4>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      experience.isCurrent 
                        ? 'bg-accent text-white' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {experience.startDate} - {experience.endDate}
                    </span>
                    {experience.isCurrent && (
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        Poste Actuel
                      </span>
                    )}
                  </div>
                </div>

                {/* Projets de l'expérience */}
                <div className="mb-1 md:mb-2">
                  <h4 className="text-xs md:text-sm font-semibold text-secondary mb-0.5 md:mb-1">Projets réalisés :</h4>
                  {experience.projects && experience.projects.length > 0 ? (
                    <div className="space-y-0.5 md:space-y-1">
                      {experience.projects.map((project, projectIndex) => {
                        const isExpanded = isProjectExpanded(experience.id, projectIndex);
                        const achievements = project.achievements || [];
                        
                        // Logique dynamique plus agressive pour économiser l'espace
                        let maxItemsToShow;
                        if (experience.projects.length === 1) {
                          maxItemsToShow = Math.min(4, achievements.length); // Réduit même pour un seul projet
                        } else if (experience.projects.length <= 2) {
                          maxItemsToShow = Math.min(3, achievements.length); // 2 projets = espace modéré
                        } else {
                          maxItemsToShow = Math.min(2, achievements.length); // 3+ projets = espace très conservé
                        }
                        
                        const shouldShowToggle = achievements.length > maxItemsToShow;
                        const achievementsToShow = isExpanded 
                          ? achievements
                          : achievements.slice(0, maxItemsToShow);

                        return (
                          <div key={projectIndex} className="bg-gray-50 p-1 md:p-1.5 rounded border-l-2 border-accent/30 hover:border-accent/60 transition-all duration-300">
                            <h5 className="font-semibold text-xs md:text-sm mb-0.5 text-secondary">{project.name}</h5>
                            {project.description && (
                              <p className="text-gray-600 mb-0.5 md:mb-1 text-sm md:text-base leading-tight">{project.description}</p>
                            )}
                            <ul className="space-y-0.5 text-gray-600 text-sm md:text-base">
                              {achievementsToShow.map((achievement, achievementIndex) => (
                                <li key={achievementIndex} className="flex items-start">
                                  <CheckCircle className="text-accent mt-0.5 mr-1 flex-shrink-0" size={12} />
                                  <span className="leading-tight text-sm md:text-base">{achievement}</span>
                                </li>
                              ))}
                            </ul>

                            {shouldShowToggle && (
                              <button
                                onClick={() => toggleProject(experience.id, projectIndex)}
                                className="mt-0.5 md:mt-1 flex items-center text-accent hover:text-accent/80 transition-colors duration-200 text-xs font-medium bg-white px-1.5 py-0.5 rounded-full border border-accent/20 hover:border-accent/40"
                              >
                                {isExpanded ? (
                                  <>
                                    <ChevronUp size={12} className="mr-1" />
                                    Voir moins
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown size={12} className="mr-1" />
                                    +{achievements.length - maxItemsToShow} autres
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-600 italic text-sm">Aucun projet trouvé pour cette expérience.</p>
                  )}
                </div>

                {/* Technologies utilisées */}
                <div>
                  <h4 className="text-xs md:text-sm font-semibold text-accent mb-0.5 md:mb-1">Technologies utilisées :</h4>
                  <div className="flex flex-wrap gap-0.5">
                    {(isTechnologiesExpanded(experience.id) 
                      ? experience.technologies 
                      : experience.technologies.slice(0, 8)
                    ).map((tech) => (
                      <span 
                        key={tech}
                        className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-1 md:px-1.5 py-0.5 rounded-full text-xs font-medium hover:from-accent/10 hover:to-accent/20 hover:text-accent transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {experience.technologies.length > 8 && (
                    <button
                      onClick={() => toggleTechnologies(experience.id)}
                      className="mt-0.5 md:mt-1 flex items-center text-accent hover:text-accent/80 transition-colors duration-200 text-xs font-medium bg-white px-1.5 py-0.5 rounded-full border border-accent/20 hover:border-accent/40"
                    >
                      {isTechnologiesExpanded(experience.id) ? (
                        <>
                          <ChevronUp size={10} className="mr-0.5" />
                          Moins
                        </>
                      ) : (
                        <>
                          <ChevronDown size={10} className="mr-0.5" />
                          +{experience.technologies.length - 8}
                        </>
                      )}
                    </button>
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