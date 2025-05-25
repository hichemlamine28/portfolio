import { ChevronDown, Mail, Phone, User } from 'lucide-react';
import { personalInfo } from '@/lib/cvData';

export default function HeroSection() {
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
      
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="animate-fade-in">
          {/* Professional headshot placeholder */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-accent to-primary p-1">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <User className="text-primary text-4xl" size={48} />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span>{personalInfo.firstName}</span>{' '}
            <span className="text-accent">{personalInfo.lastName}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-8 text-gray-200">
            {personalInfo.title}
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Expert avec +{personalInfo.yearsOfExperience} ans d'expérience en architecture cloud, automatisation DevOps 
            et mise en œuvre de pratiques sécurisées dans des environnements complexes
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => scrollToSection('#contact')}
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
            >
              <Mail className="mr-2" size={20} />
              Me Contacter
            </button>
            <button
              onClick={() => scrollToSection('#experience')}
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center"
            >
              <User className="mr-2" size={20} />
              Voir Mon Parcours
            </button>
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
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white" size={32} />
      </div>
    </section>
  );
}
