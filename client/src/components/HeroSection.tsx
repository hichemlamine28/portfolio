import { ChevronDown, Mail, Phone, Users, Globe, Calendar } from 'lucide-react';
import { personalInfo } from '@/lib/cvData';
import { useVisitorStats } from '@/hooks/useVisitorStats';
import CVGenerator from './CVGenerator';

export default function HeroSection() {
  const { stats: visitorStats } = useVisitorStats();

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="min-h-screen gradient-bg flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-warning/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-10 w-12 h-12 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
          {/* Photo à gauche */}
          <div className="lg:col-span-1 flex justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative group">
              <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                <img 
                  src="/hichem.jpg" 
                  alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                  className="w-full h-full object-cover"
                  onLoad={() => console.log('Hichem photo loaded successfully')}
                  onError={(e) => console.error('Failed to load Hichem photo:', e)}
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Contenu principal centré */}
          <div className="lg:col-span-2 text-center lg:text-left animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <h2 className="text-2xl md:text-3xl text-accent mb-8 font-medium">
              {personalInfo.title}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              Expert avec +{personalInfo.yearsOfExperience} ans d'expérience en architecture cloud/on-premises, DevSecOps, 
              coaching d'équipes, gestion d'infrastructures et expertise produits Atlassian dans des environnements complexes
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 mb-8">
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="group bg-gradient-to-r from-accent to-emerald-500 hover:from-accent/90 hover:to-emerald-400 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent/25 border-2 border-transparent"
              >
                <span className="flex items-center justify-center">
                  <Mail className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  Me Contacter
                </span>
              </a>

              <a 
                href="#experience" 
                className="group bg-gradient-to-r from-transparent to-transparent hover:from-white/10 hover:to-white/5 text-white px-6 py-3 rounded-full font-medium border-2 border-white/70 hover:border-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-white/20"
              >
                <span className="flex items-center justify-center">
                  <Users className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  Voir mon CV
                </span>
              </a>

              <div className="flex justify-center">
                <CVGenerator />
              </div>
            </div>

            {/* Statistiques du site pour mobile - pleine largeur avec design coloré */}
            <div className="lg:hidden mb-8 w-full animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 w-full">
                <h3 className="text-lg font-semibold text-white mb-4 text-center">Statistiques du Site</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-center space-x-3">
                      <Users className="h-6 w-6 text-blue-400" />
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-white">{visitorStats?.totalVisitors || 0}</div>
                        <div className="text-xs md:text-sm text-white/80">Total Visiteurs</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-center space-x-3">
                      <Globe className="h-6 w-6 text-green-400" />
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-white">{visitorStats?.currentConnected || 0}</div>
                        <div className="text-xs md:text-sm text-white/80">En Ligne</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-sm rounded-lg p-4 border border-white/10 sm:col-span-1">
                    <div className="flex items-center justify-center space-x-3">
                      <Calendar className="h-6 w-6 text-purple-400" />
                      <div className="text-center">
                        <div className="text-xs md:text-sm text-white/80 mb-1">Date:</div>
                        <div className="text-sm md:text-lg font-semibold text-white">
                          {visitorStats?.currentTime ? new Date(visitorStats.currentTime).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit', 
                            year: 'numeric'
                          }) : new Date().toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit', 
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques du site à droite */}
          <div className="lg:col-span-1 hidden lg:block animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">Statistiques du Site</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <Users className="h-6 w-6 text-blue-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">{visitorStats?.totalVisitors || 0}</div>
                      <div className="text-sm text-white/80">Total Visiteurs</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-6 w-6 text-green-400" />
                    <div>
                      <div className="text-2xl font-bold text-white">{visitorStats?.currentConnected || 0}</div>
                      <div className="text-sm text-white/80">En Ligne</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-6 w-6 text-purple-400" />
                    <div>
                      <div className="text-sm text-white/80 mb-1">Date:</div>
                      <div className="text-lg font-semibold text-white">
                        {visitorStats?.currentTime ? new Date(visitorStats.currentTime).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit', 
                          year: 'numeric'
                        }) : new Date().toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit', 
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Contact Info */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-300">
            <div className="flex items-center">
              <Phone className="mr-2 text-accent" size={16} />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 text-accent" size={16} />
              <span>{personalInfo.email}</span>
            </div>
            <div className="flex items-center">
              <svg className="mr-2 text-accent w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                LinkedIn
              </a>
            </div>
            {personalInfo.github && (
              <div className="flex items-center">
                <svg className="mr-2 text-accent w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  GitHub
                </a>
              </div>
            )}
          </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white" size={32} />
      </div>
    </section>
  );
}