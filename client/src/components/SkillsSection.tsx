import React, { useEffect, useState } from 'react';
import { Cloud, Code, Database, Shield, Users, Settings, Box, Network, ServerCog, Lock, CheckCircle, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { skills } from '@/lib/cvData';

export default function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [animatedSkills, setAnimatedSkills] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isVisible) {
      // Animate skill bars with delay
      skills.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedSkills(prev => [...prev, skill.name]);
        }, index * 50);
      });
    }
  }, [isVisible]);

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const isCategoryExpanded = (category: string) => {
    return expandedCategories.has(category);
  };

  const renderSkillCategory = (
    title: string,
    icon: React.ReactNode,
    categorySkills: typeof skills,
    gradientFrom: string,
    gradientTo: string,
    category: string
  ) => {
    const isExpanded = isCategoryExpanded(category);
    const maxItemsToShow = 4;
    const shouldShowToggle = categorySkills.length > maxItemsToShow;
    const skillsToShow = isExpanded 
      ? categorySkills 
      : categorySkills.slice(0, maxItemsToShow);

    return (
      <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-md p-1.5 md:p-2 lg:p-3`}>
        <div className="text-center mb-1 md:mb-2">
          <div className="flex justify-center items-center mb-0.5">
            {React.cloneElement(icon as React.ReactElement, { 
              size: 16, 
              className: "text-primary" 
            })}
          </div>
          <h3 className="text-xs md:text-sm font-bold text-secondary leading-tight">{title}</h3>
        </div>
        <div className="space-y-1 md:space-y-1.5">
          {skillsToShow.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-0.5">
                <span className="text-xs font-medium text-gray-700 leading-tight">{skill.name}</span>
                <span className="text-xs text-gray-500">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-1500 ease-out ${
                    skill.level >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                    skill.level >= 80 ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                    skill.level >= 70 ? 'bg-gradient-to-r from-purple-500 to-violet-600' :
                    skill.level >= 60 ? 'bg-gradient-to-r from-orange-500 to-amber-600' :
                    skill.level >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    'bg-gradient-to-r from-red-500 to-pink-600'
                  }`}
                  style={{ 
                    width: animatedSkills.includes(skill.name) ? `${skill.level}%` : '0%' 
                  }}
                />
              </div>
            </div>
          ))}

          {shouldShowToggle && (
            <button
              onClick={() => toggleCategory(category)}
              className="mt-1 w-full flex items-center justify-center text-accent hover:text-accent/80 transition-colors duration-200 text-xs font-medium bg-white/50 px-1 py-0.5 rounded-full"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={10} className="mr-0.5" />
                  Moins
                </>
              ) : (
                <>
                  <ChevronDown size={10} className="mr-0.5" />
                  +{categorySkills.length - maxItemsToShow}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  const skillCategories = [
    {
      name: 'Cloud & Infrastructure',
      icon: <Cloud className="text-4xl text-primary mb-3 mx-auto" size={36} />,
      category: 'cloud',
      gradient: { from: 'from-primary/5', to: 'to-accent/5' }
    },
    {
      name: 'DevOps & Automation',
      icon: <ServerCog className="text-4xl text-accent mb-3 mx-auto" size={36} />,
      category: 'devops',
      gradient: { from: 'from-accent/5', to: 'to-warning/5' }
    },
    {
      name: 'Containers & Orchestration',
      icon: <Box className="text-4xl text-warning mb-3 mx-auto" size={36} />,
      category: 'containers',
      gradient: { from: 'from-warning/5', to: 'to-primary/5' }
    },
    {
      name: 'Monitoring & Observability',
      icon: <Settings className="text-4xl text-secondary mb-3 mx-auto" size={36} />,
      category: 'monitoring',
      gradient: { from: 'from-secondary/5', to: 'to-accent/5' }
    },
    {
      name: 'Security & DevSecOps',
      icon: <Shield className="text-4xl text-primary mb-3 mx-auto" size={36} />,
      category: 'security',
      gradient: { from: 'from-primary/5', to: 'to-warning/5' }
    },
    {
      name: 'Atlassian Suite',
      icon: <Lock className="text-4xl text-accent mb-3 mx-auto" size={36} />,
      category: 'atlassian',
      gradient: { from: 'from-accent/5', to: 'to-secondary/5' }
    },
    {
      name: 'Agile & Management',
      icon: <Users className="text-4xl text-warning mb-3 mx-auto" size={36} />,
      category: 'agile',
      gradient: { from: 'from-warning/5', to: 'to-primary/5' }
    },
    {
      name: 'Test & Automatisation',
      icon: <CheckCircle className="text-4xl text-success mb-3 mx-auto" size={36} />,
      category: 'testing',
      gradient: { from: 'from-green-500/5', to: 'to-emerald-500/5' }
    },
    {
      name: 'Programming & Scripting',
      icon: <Code className="text-4xl text-secondary mb-3 mx-auto" size={36} />,
      category: 'programming',
      gradient: { from: 'from-secondary/5', to: 'to-primary/5' }
    },
    {
      name: 'Databases',
      icon: <Database className="text-4xl text-primary mb-3 mx-auto" size={36} />,
      category: 'databases',
      gradient: { from: 'from-primary/5', to: 'to-warning/5' }
    },
    {
      name: 'Networking & Infrastructure',
      icon: <Network className="text-4xl text-accent mb-3 mx-auto" size={36} />,
      category: 'networking',
      gradient: { from: 'from-accent/5', to: 'to-secondary/5' }
    }
  ];

  return (
    <section id="skills" className="py-2 md:py-4 lg:py-6 bg-white" ref={ref}>
      <div className="max-w-full mx-auto px-1 sm:px-2 lg:px-3">
        <div className="text-center mb-2 md:mb-4">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-secondary mb-1">Compétences Techniques</h2>
          <div className="w-8 md:w-12 h-0.5 bg-accent mx-auto"></div>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {skillCategories.map((category, index) => (
            <div 
              key={category.category}
              className={`transition-all duration-1000`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {renderSkillCategory(
                category.name,
                category.icon,
                getSkillsByCategory(category.category),
                category.gradient.from,
                category.gradient.to,
                category.category
              )}
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div id="certifications" className={`mt-2 md:mt-4 pt-2 md:pt-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary text-center mb-2 md:mb-4">
            <Award className="inline-block mr-2 text-accent" size={24} />
            Certifications Professionnelles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 md:gap-2">
            {[
              // Kubernetes certifications
              {
                name: "CKAD: Certified Kubernetes Application Developer",
                category: "Cloud Native Computing Foundation",
                logo: "/ckad-logo.png"
              },
              {
                name: "CKA: Certified Kubernetes Administrator",
                category: "Cloud Native Computing Foundation",
                logo: "/cka-logo.png"
              },
              {
                name: "CKS: Certified Kubernetes Security Specialist",
                category: "Cloud Native Computing Foundation", 
                logo: "/cks-logo.png"
              },
              // AWS certifications
              {
                name: "AWS Certified Solutions Architect - Associate",
                category: "Amazon Web Services",
                logo: "/aws-logo.png"
              },
              {
                name: "AWS Introduction to Generative AI",
                category: "Amazon Web Services",
                logo: "/aws-genai-logo.png"
              },
              // Google Cloud certifications
              {
                name: "Google Cloud Professional Cloud DevOps Engineer",
                category: "Google Cloud Platform",
                logo: "/gcp-logo.png"
              },
              // Microsoft certifications
              {
                name: "Microsoft Azure Administrator Associate (AZ-104)",
                category: "Microsoft Azure",
                logo: "/azure-logo.png"
              },
              {
                name: "Microsoft Technology Associate: HTML5",
                category: "Microsoft Technology Associate",
                logo: "/html5-logo.png"
              },
              {
                name: "Microsoft Technology Associate: Networking",
                category: "Microsoft Technology Associate",
                logo: "/microsoft-networking-logo.png"
              },
              // LPI certifications
              {
                name: "LPI 701: DevOps Tools Engineer",
                category: "Linux Professional Institute",
                logo: "/lpi-logo.png"
              },
              // Scrum/Agile certifications
              {
                name: "SODFC™: Scrum for Operations and DevOps Fundamentals Certified",
                category: "SCRUMstudy",
                logo: "/sodfc-logo.png"
              },
              {
                name: "PSM I: Professional Scrum Master I",
                category: "Scrum.org",
                logo: "/psm-logo.png"
              },
              {
                name: "SFC™: Scrum Fundamentals Certified",
                category: "SCRUMstudy",
                logo: "/sfc-logo.png"
              },
              {
                name: "SFPC: Scrum Foundation Professional Certificate",
                category: "CertiProf",
                logo: "/sfpc-logo.png"
              },
              // Six Sigma Yellow Belt
              {
                name: "SSYB™: Six Sigma Yellow Belt",
                category: "6Sigma.us",
                logo: "/sixsigma-logo.png"
              },
              // Digital Marketing
              {
                name: "Marketing Strategy Fundamentals",
                category: "Digital Marketing Institute",
                logo: "/dmi-logo.png"
              },
              // Certiprof LifeLog Learning
              {
                name: "LifeLog Learning Certification",
                category: "CertiProf",
                logo: "/certiprof-logo.png"
              }
            ].map((cert, index) => (
              <div 
                key={cert.name}
                className={`bg-gradient-to-br ${index % 2 === 0 ? 'from-accent to-primary' : 'from-primary to-accent'} text-white p-1.5 md:p-2 lg:p-3 rounded-md transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/10 ${
                  isVisible ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex flex-col items-center mb-1 md:mb-2">
                  <div className="bg-white/95 p-1 md:p-1.5 rounded shadow-md flex items-center justify-center mb-1">
                    <img 
                      src={cert.logo} 
                      alt={`${cert.name} logo`}
                      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <CheckCircle className="text-white/90" size={12} />
                </div>
                <div className="font-bold text-xs md:text-sm leading-tight mb-0.5 text-center text-gray-800">{cert.name}</div>
                <div className="text-xs md:text-sm font-medium text-center leading-tight text-blue-800">{cert.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}