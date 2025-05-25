
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { personalInfo, stats } from '@/lib/cvData';

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">À Propos</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h3 className="text-2xl font-semibold text-secondary mb-4">Résumé Professionnel</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {personalInfo.summary}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Mon expertise inclut la gestion des infrastructures cloud à grande échelle, l'automatisation 
              des déploiements et la garantie d'une haute disponibilité et sécurité dans des 
              environnements complexes. Je maîtrise également la conception, la mise en place et 
              l'administration complète de plateformes Atlassian en mode datacenter et cloud, 
              optimisant ainsi la collaboration et la productivité des équipes.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-secondary mb-3">Formation Académique</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-gray-700"><strong>2006</strong> - Master en Informatique</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-gray-700"><strong>2004</strong> - Premier cycle universitaire</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-secondary mb-3">Statistiques</h4>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label}
                    className="bg-gradient-to-r from-primary to-accent p-4 rounded-xl text-white text-center transform hover:scale-105 transition-transform duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs opacity-90">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
