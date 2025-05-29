import React, { useState, useEffect, useRef } from 'react';
import { Users, Trophy, Coffee, Target } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { personalInfo, stats, experiences, skills } from '@/lib/cvData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mapping des entreprises vers leurs secteurs d'activité (synchronisé avec cvData.ts)
const companySectorMapping: { [key: string]: string } = {
  "THALES": "Défense & Sécurité",
  "GRDF": "Énergie & Services Publics", 
  "BREAKPOINT TECHNOLOGY": "Technologies & Innovation",
  "M2I - FORMATION": "Formation Professionnelle",
  "MAYAR-INFO": "Finance & Gestion",
  "Ministère de l'Éducation Secondaire et Universitaire": "Éducation Nationale",
  "Faculté des sciences - Université": "Enseignement Supérieur & Recherche"
};

// Mapping des catégories de compétences vers des libellés lisibles
const categoryMapping: { [key: string]: string } = {
  "cloud": "Cloud Computing (AWS, Azure, GCP, OpenStack)",
  "devops": "DevOps & Automation (Terraform, Ansible, Jenkins)",
  "atlassian": "Atlassian Suite (Jira, Confluence, Bitbucket)",
  "containers": "Containers & Orchestration (Docker, Kubernetes)", 
  "monitoring": "Monitoring & Logging (Prometheus, Grafana, ELK)",
  "databases": "Databases (SQL, NoSQL)",
  "security": "Security & Compliance (DevSecOps)",
  "agile": "Agile & Project Management",
  "programming": "Programming & Scripting (Python, Bash, PowerShell)",
  "networking": "Networking & Infrastructure",
  "testing": "Testing & Quality Assurance"
};

const getSectorsData = () => {
  // Calcul dynamique basé sur les expériences réelles
  const dynamicSectors = new Set(
    experiences.map(exp => companySectorMapping[exp.company] || "Autres Technologies")
  );
  return Array.from(dynamicSectors).sort();
};

const getTechnologiesData = () => {
  // Calcul dynamique basé sur les vraies catégories des compétences
  const uniqueCategories = new Set(skills.map(skill => skill.category));
  return Array.from(uniqueCategories)
    .map(category => categoryMapping[category] || category)
    .sort();
};

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const tooltipRef = useRef(null);
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Fermer la tooltip en cliquant ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setActiveTooltip(null);
      }
    };

    if (activeTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activeTooltip]);


  return (
    <section id="about" className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">À Propos</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="w-full mx-auto">
          <div className={`space-y-6 md:space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-lg md:text-xl font-semibold text-secondary mb-4">Résumé Professionnel</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {personalInfo.summary}
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Mon expertise inclut la gestion des infrastructures cloud à grande échelle, l'automatisation 
              des déploiements et la garantie d'une haute disponibilité et sécurité dans des 
              environnements complexes. Je maîtrise également la conception, la mise en place et 
              l'administration complète de plateformes Atlassian en mode datacenter et cloud, 
              optimisant ainsi la collaboration et la productivité des équipes.
            </p>

            <div className="bg-gray-50 p-4 md:p-6 lg:p-8 rounded-lg">
              <h4 className="text-lg md:text-xl font-semibold text-secondary mb-4">Formation Académique</h4>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-3 md:w-4 h-3 md:h-4 bg-accent rounded-full"></div>
                  <span className="text-sm md:text-base text-gray-700"><strong>2006</strong> - Mastère en Informatique</span>
                </div>
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-3 md:w-4 h-3 md:h-4 bg-warning rounded-full"></div>
                  <span className="text-sm md:text-base text-gray-700"><strong>2006</strong> - CAPES (Certificat d'Aptitude au Professorat de l'Enseignement Secondaire et Universitaire)</span>
                </div>
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="w-3 md:w-4 h-3 md:h-4 bg-primary rounded-full"></div>
                  <span className="text-sm md:text-base text-gray-700"><strong>2004</strong> - Maîtrise en Informatique</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 md:p-6 lg:p-8 rounded-lg">
              <h4 className="text-lg md:text-xl font-semibold text-secondary mb-6">Statistiques du Site</h4>
              <TooltipProvider>
                <div className="grid grid-cols-2 gap-4 md:gap-6" ref={tooltipRef}>
                  {stats.map((stat, index) => {
                    const Icons = {
                      0: <Users className="h-8 w-8" />,
                      1: <Trophy className="h-8 w-8" />,
                      2: <Target className="h-8 w-8" />,
                      3: <Coffee className="h-8 w-8" />
                    };

                    const gradients = [
                      "from-blue-500 to-purple-600",
                      "from-green-500 to-teal-600", 
                      "from-orange-500 to-red-600",
                      "from-purple-500 to-pink-600"
                    ];

                    const iconColors = [
                      "text-blue-600",
                      "text-green-600",
                      "text-orange-600", 
                      "text-purple-600"
                    ];

                    const isSectorsActivity = stat.label === "Secteurs d'Activité";
                    const isTechnologiesDomains = stat.label === "Domaines de Technologies Maîtrisées";
                    const sectorsData = isSectorsActivity ? getSectorsData() : [];
                    const technologiesData = isTechnologiesDomains ? getTechnologiesData() : [];
                    const hasTooltip = isSectorsActivity || isTechnologiesDomains;

                    const StatCard = (
                      <div 
                        className={`bg-gradient-to-r ${gradients[index]} rounded-xl p-4 md:p-6 lg:p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${hasTooltip ? 'cursor-pointer' : ''}`}
                        onClick={() => {
                          if (hasTooltip) {
                            setActiveTooltip(activeTooltip === stat.label ? null : stat.label);
                          }
                        }}
                        onMouseEnter={() => {
                          if (hasTooltip && !activeTooltip) {
                            // Le survol fonctionne seulement si aucune tooltip n'est "épinglée" par un clic
                          }
                        }}
                      >
                        <div className={`text-2xl md:text-3xl mb-3 md:mb-4 mx-auto ${iconColors[index]}`}>
                          {React.cloneElement(Icons[index] as React.ReactElement, { 
                            size: 32, 
                            className: iconColors[index] 
                          })}
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">
                          {stat.value}
                        </div>
                        <div className="text-sm md:text-base text-white/90 font-medium leading-tight">
                          {stat.label}
                        </div>
                        {hasTooltip && (
                          <div className="text-xs md:text-sm text-white/70 mt-2 md:mt-3 font-medium">
                            👆 Cliquez pour plus d'infos
                          </div>
                        )}
                      </div>
                    );

                    return hasTooltip ? (
                      <div key={stat.label} className="relative">
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <div 
                              className={`bg-gradient-to-r ${gradients[index]} rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer`}
                              onClick={() => {
                                setActiveTooltip(activeTooltip === stat.label ? null : stat.label);
                              }}
                            >
                              <div className={`text-4xl mb-4 mx-auto ${iconColors[index]}`}>
                                {Icons[index]}
                              </div>
                              <div className="text-3xl font-bold text-white mb-2">
                                {stat.value}
                              </div>
                              <div className="text-white/90 font-medium">
                                {stat.label}
                              </div>
                              <div className="text-xs text-white/70 mt-2 font-medium">
                                👆 Cliquez ou survolez pour voir la liste
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="w-80 p-4">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <div className={`${iconColors[index]}`}>
                                    {Icons[index]}
                                  </div>
                                  <h3 className="font-bold text-lg text-secondary">{stat.label}</h3>
                                </div>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTooltip(null);
                                  }}
                                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                                >
                                  ×
                                </button>
                              </div>
                              {stat.label === "Secteurs d'Activité" && (
                                <div className="grid gap-2">
                                  {sectorsData.map((sector, idx) => (
                                    <div 
                                      key={idx}
                                      className="flex items-center space-x-2 p-2 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10 transform transition-all duration-200 hover:scale-105 hover:shadow-sm"
                                    >
                                      <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                                      <span className="text-sm font-medium text-gray-700">{sector}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {stat.label === "Domaines de Technologies Maîtrisées" && (
                                <div className="grid gap-2">
                                  {technologiesData.map((domain, idx) => (
                                    <div 
                                      key={idx}
                                      className="flex items-center space-x-2 p-2 bg-gradient-to-r from-primary/5 to-warning/5 rounded-lg border border-primary/10 transform transition-all duration-200 hover:scale-105 hover:shadow-sm"
                                    >
                                      <div className="w-2 h-2 bg-gradient-to-r from-primary to-warning rounded-full"></div>
                                      <span className="text-sm font-medium text-gray-700">{domain}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="text-center pt-2 border-t border-primary/10">
                                <span className="text-xs text-primary font-medium">
                                  {stat.label === "Secteurs d'Activité" ? 
                                    `🎯 ${sectorsData.length} secteurs couverts` : 
                                    `🔧 ${technologiesData.length} domaines maîtrisés`
                                  }
                                </span>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>

                        {/* Tooltip persistante pour les clics */}
                        {activeTooltip === stat.label && (
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 w-80 p-4 bg-white rounded-lg shadow-xl border z-50">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <div className={`${iconColors[index]}`}>
                                    {Icons[index]}
                                  </div>
                                  <h3 className="font-bold text-lg text-secondary">{stat.label}</h3>
                                </div>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTooltip(null);
                                  }}
                                  className="text-gray-400 hover:text-gray-600 text-xl font-bold"
                                >
                                  ×
                                </button>
                              </div>
                              {stat.label === "Secteurs d'Activité" && (
                                <div className="grid gap-2">
                                  {sectorsData.map((sector, idx) => (
                                    <div 
                                      key={idx}
                                      className="flex items-center space-x-2 p-2 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10 transform transition-all duration-200 hover:scale-105 hover:shadow-sm"
                                    >
                                      <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                                      <span className="text-sm font-medium text-gray-700">{sector}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {stat.label === "Domaines de Technologies Maîtrisées" && (
                                <div className="grid gap-2">
                                  {technologiesData.map((domain, idx) => (
                                    <div 
                                      key={idx}
                                      className="flex items-center space-x-2 p-2 bg-gradient-to-r from-primary/5 to-warning/5 rounded-lg border border-primary/10 transform transition-all duration-200 hover:scale-105 hover:shadow-sm"
                                    >
                                      <div className="w-2 h-2 bg-gradient-to-r from-primary to-warning rounded-full"></div>
                                      <span className="text-sm font-medium text-gray-700">{domain}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              <div className="text-center pt-2 border-t border-primary/10">
                                <span className="text-xs text-primary font-medium">
                                  {stat.label === "Secteurs d'Activité" ? 
                                    `🎯 ${sectorsData.length} secteurs couverts` : 
                                    `🔧 ${technologiesData.length} domaines maîtrisés`
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div key={stat.label}>
                        {StatCard}
                      </div>
                    );
                  })}
                </div>

                

              </TooltipProvider>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}