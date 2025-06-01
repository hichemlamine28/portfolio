
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Mail, Users, Globe, Calendar } from 'lucide-react';
import { useVisitorStats } from '@/hooks/useVisitorStats';

export default function HeroSectionV1() {
  const { stats: visitorStats } = useVisitorStats();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExperience = () => {
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Contenu principal - 2 colonnes sur desktop */}
          <div className="lg:col-span-2 text-center lg:text-left">
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

            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Hichem ELAMINE
                </span>
              </h1>
              <p className="text-xl lg:text-2xl mb-4 text-blue-100">
                Architecte & Lead DevSecOps Cloud
              </p>
              <p className="text-lg mb-8 text-gray-300 max-w-2xl">
                Expert DevSecOps avec plusieurs années d'expérience en architecture cloud/on-premises, coaching d'équipes et expertise en produits et plateformes Atlassian
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button 
                  size="lg" 
                  onClick={scrollToContact}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Me Contacter
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={scrollToExperience}
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg transition-all duration-300"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Voir mon Parcours
                </Button>
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-white/70" />
        </div>
      </div>
    </section>
  );
}
