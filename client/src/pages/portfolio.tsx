import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import CVGenerator from '@/components/CVGenerator';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import SearchSystem from '@/components/SearchSystem';
import VisitAnalytics from '@/components/VisitAnalytics';
import CVDownloadTracker from '@/components/CVDownloadTracker';
import { Toaster } from '@/components/ui/toaster';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <CVDownloadTracker />
      <Navigation />
      <ThemeToggle />
      <SearchSystem />

      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />

      {/* Nouvelle section Analytics */}
      <div id="analytics" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Analytics & Insights</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Données de fréquentation et statistiques de téléchargement du portfolio
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <VisitAnalytics />
          </div>
        </div>
      </div>

      <ContactSection />
      <Footer />
      <Toaster />
    </div>
  );
}