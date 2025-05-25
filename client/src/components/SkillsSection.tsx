import { Cloud, ServerCog, Shield, Lock, Users, Box, Code, Database, Network, Settings, Award, CheckCircle, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { skills } from '@/lib/cvData';
import { useEffect, useState } from 'react';

export default function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [animatedSkills, setAnimatedSkills] = useState<string[]>([]);

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

  const renderSkillCategory = (
    title: string,
    icon: React.ReactNode,
    categorySkills: typeof skills,
    gradientFrom: string,
    gradientTo: string
  ) => (
    <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl p-6`}>
      <div className="text-center mb-6">
        {icon}
        <h3 className="text-xl font-bold text-secondary">{title}</h3>
      </div>
      <div className="space-y-3">
        {categorySkills.slice(0, 8).map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{skill.name}</span>
              <span className="text-sm text-gray-500">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full transition-all duration-1500 ease-out ${
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
        {categorySkills.length > 8 && (
          <p className="text-sm text-gray-500 text-center mt-3">
            +{categorySkills.length - 8} autres technologies
          </p>
        )}
      </div>
    </div>
  );

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
      name: 'Programming & Scripting',
      icon: <Code className="text-4xl text-secondary mb-3 mx-auto" size={36} />,
      category: 'programming',
      gradient: { from: 'from-secondary/5', to: 'to-accent/5' }
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
    <section id="skills" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Compétences Techniques</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expertise approfondie dans les technologies DevSecOps, Cloud et Agile avec plus de {skills.length} compétences maîtrisées
          </p>
        </div>
        
        <div className={`grid lg:grid-cols-3 md:grid-cols-2 gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                category.gradient.to
              )}
            </div>
          ))}
        </div>
        
        {/* Certifications Section */}
        <div className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl font-bold text-secondary text-center mb-8">
            <Award className="inline-block mr-3 text-accent" size={36} />
            Certifications Professionnelles
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Certification LPI 701",
                category: "Linux",
                color: "from-black to-gray-800",
                iconColor: "text-yellow-400",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M12.504 0C5.598 0 0 5.598 0 12.504c0 6.906 5.598 12.504 12.504 12.504 6.906 0 12.496-5.598 12.496-12.504C24.996 5.598 19.41 0 12.504 0zM12 2.413c1.234 0 2.234 1.004 2.234 2.234 0 1.234-1 2.234-2.234 2.234s-2.234-1-2.234-2.234c0-1.23 1-2.234 2.234-2.234zm3.547 13.219c-1.094.77-2.406 1.23-3.844 1.23-1.434 0-2.746-.46-3.844-1.23-.574-.402-.578-1.207-.008-1.613.566-.406 1.477-.207 2.016.422.297.348.73.559 1.207.559.476 0 .91-.21 1.207-.559.54-.629 1.45-.828 2.016-.422.57.406.566 1.211-.008 1.613z"/>
                  </svg>
                )
              },
              {
                name: "CKAD/CKA/CKS",
                category: "Kubernetes",
                color: "from-slate-700 to-gray-800",
                iconColor: "text-blue-400",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.007a.153.153 0 0 1 .485.604zm.84-3.192l.777 2.386a.176.176 0 0 1-.126.217c-.068.02-.143-.003-.176-.063l-.777-2.386a.154.154 0 0 1 .126-.217.154.154 0 0 1 .176.063zm5.328.395l-2.388.777a.176.176 0 0 1-.217-.126.154.154 0 0 1 .063-.176l2.388-.777a.176.176 0 0 1 .217.126c.02.068-.003.143-.063.176zM9.578 9.126a.176.176 0 0 1-.217.126.176.176 0 0 1-.126-.217l.777-2.388a.176.176 0 0 1 .217-.126.176.176 0 0 1 .126.217l-.777 2.388zm4.535 3.646l-2.578.437-.004-.007a.176.176 0 0 1-.176-.217c.02-.068.063-.126.143-.126l2.578-.437.007.007c.068.02.11.088.11.163 0 .076-.04.143-.08.18zm1.881-2.38l-.437 2.578-.007-.004a.176.176 0 0 1-.217.176.176.176 0 0 1-.176-.217l.437-2.578.007.004a.176.176 0 0 1 .217-.176.176.176 0 0 1 .176.217zm-7.075.176l-.437-2.578.007-.004a.176.176 0 0 1 .217-.176.176.176 0 0 1 .176.217l-.437 2.578-.007-.004a.176.176 0 0 1-.217.176.176.176 0 0 1-.176-.217zm5.328-2.069l-2.388-.777a.176.176 0 0 1-.126-.217.176.176 0 0 1 .217-.126l2.388.777a.176.176 0 0 1 .126.217.176.176 0 0 1-.217.126zm-3.192 7.861l-.777-2.388a.176.176 0 0 1 .126-.217.176.176 0 0 1 .217.126l.777 2.388a.176.176 0 0 1-.126.217.176.176 0 0 1-.217-.126zm7.075-5.328l-2.578-.437-.004.007a.176.176 0 0 1-.143.217.176.176 0 0 1-.176-.143l2.578.437.007-.007a.176.176 0 0 1 .143-.217.176.176 0 0 1 .176.143z"/>
                  </svg>
                )
              },
              {
                name: "AWS Architect Associate",
                category: "Cloud AWS",
                color: "from-orange-500 to-orange-700",
                iconColor: "text-white",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M13.527 1.657L12 2.373l-1.527-.716C5.137 4.397 1.5 9.404 1.5 15.25c0 5.937 4.814 10.75 10.75 10.75S22.5 21.187 22.5 15.25c0-5.846-3.637-10.853-8.973-13.593zM12 21c-3.59 0-6.5-2.91-6.5-6.5S8.41 8 12 8s6.5 2.91 6.5 6.5S15.59 21 12 21zm3.5-6.5c0 1.933-1.567 3.5-3.5 3.5s-3.5-1.567-3.5-3.5S10.067 11 12 11s3.5 1.567 3.5 3.5z"/>
                  </svg>
                )
              },
              {
                name: "GCP Google Professional Cloud DevOps Engineer",
                category: "Cloud GCP",
                color: "from-blue-500 to-green-500",
                iconColor: "text-white",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                )
              },
              {
                name: "Microsoft Azure Az104",
                category: "Cloud Azure",
                color: "from-blue-600 to-cyan-500",
                iconColor: "text-white",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M5.947 18.832L0 20.571l5.072-9.056L9.184 18.32l-3.237.512zm18.053.736L13.61 20.2 18.318 3.168 24 19.568z"/>
                  </svg>
                )
              },
              {
                name: "Microsoft HTML5",
                category: "verify.certiport.com naDd-XVa2",
                color: "from-orange-600 to-red-600",
                iconColor: "text-white",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
                  </svg>
                )
              },
              {
                name: "Microsoft Networking",
                category: "verify.certiport.com FMdq-XLRX",
                color: "from-blue-700 to-indigo-700",
                iconColor: "text-white",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M11.4 24H0V0h11.4v24zM24 24H12.6V0H24v24z"/>
                  </svg>
                )
              },
              {
                name: "Scrum for Operations and DevOps Fundamentals (SODFC™)",
                category: "Agile & DevOps",
                color: "from-green-600 to-teal-700",
                iconColor: "text-white",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 10v6m11-7h-6m-10 0H1"/>
                  </svg>
                )
              },
              {
                name: "PSM1 Professional Scrum Master",
                category: "Scrum.org",
                color: "from-blue-700 to-blue-900",
                iconColor: "text-yellow-400",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                )
              },
              {
                name: "Scrum Fundamentals Certified (SFC™)",
                category: "ScrumStudy",
                color: "from-purple-600 to-indigo-700",
                iconColor: "text-green-400",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )
              },
              {
                name: "SSYB Six Sigma Yellow Belt (SSYB™)",
                category: "Quality Management",
                color: "from-yellow-500 to-orange-600",
                iconColor: "text-white",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                )
              },
              {
                name: "Scrum Foundation Professional (SFPC)",
                category: "ScrumStudy",
                color: "from-indigo-600 to-purple-700",
                iconColor: "text-yellow-400",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                )
              },
              {
                name: "Marketing Strategy Fundamental",
                category: "Business & Marketing",
                color: "from-pink-600 to-purple-700",
                iconColor: "text-white",
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M7 4V2C7 1.45 7.45 1 8 1h8c.55 0 1 .45 1 1v2h5v2h-2v13c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6H2V4h5zM9 3v1h6V3H9zM6 6v13h12V6H6z"/>
                  </svg>
                )
              }
            ].map((cert, index) => (
              <div 
                key={cert.name}
                className={`bg-gradient-to-br ${cert.color} text-white p-5 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/10 ${
                  isVisible ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-white/30 p-3 rounded-lg backdrop-blur-sm shadow-lg">
                    <div className={`${cert.iconColor} drop-shadow-lg`}>
                      {cert.icon}
                    </div>
                  </div>
                  <CheckCircle className="text-white/90 drop-shadow-lg" size={20} />
                </div>
                <div className="font-bold text-sm mb-2 leading-tight drop-shadow-md">{cert.name}</div>
                <div className="text-xs opacity-90 font-medium drop-shadow-sm">{cert.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
