import { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle, Send, Loader } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { personalInfo } from '@/lib/cvData';

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      toast({
        title: "Message envoyé avec succès !",
        description: "Je vous répondrai dans les plus brefs délais.",
      });
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Erreur lors de l'envoi",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const specialties = [
    "Architecture Cloud (AWS, GCP, Azure, OpenStack)",
    "DevSecOps & Automatisation",
    "Coaching Agile DevOps & Leadership Technique",
    "Expertise Produits et Plateformes Atlassian",
    "Infrastructures à Grande Échelle"
  ];

  return (
    <section id="contact" className="py-20 gradient-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Contactez-moi</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Prêt à discuter de votre prochain projet DevSecOps ou d'une collaboration ? 
            N'hésitez pas à me contacter.
          </p>
        </div>
        
        <div className={`grid lg:grid-cols-2 gap-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6">Informations de Contact</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Téléphone</h4>
                  <p className="text-gray-300">{personalInfo.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-gray-300">{personalInfo.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <svg className="text-white w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">LinkedIn</h4>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                    linkedin.com/in/hichem-elamine
                  </a>
                </div>
              </div>
              
              {personalInfo.github && (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <svg className="text-white w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">GitHub</h4>
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors">
                      github.com/hichemlamine28
                    </a>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Localisation</h4>
                  <p className="text-gray-300">France - Disponible pour missions</p>
                </div>
              </div>
            </div>
            
            {/* Specialties */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Domaines d'Expertise</h4>
              <ul className="space-y-2 text-gray-300">
                {specialties.map((specialty, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="text-accent mr-2 flex-shrink-0" size={16} />
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Envoyez un Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                    Prénom
                  </label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-accent focus:border-transparent"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                    Nom
                  </label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-accent focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-accent focus:border-transparent"
                  placeholder="votre.email@exemple.com"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                  Entreprise (Optionnel)
                </label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-accent focus:border-transparent"
                  placeholder="Nom de votre entreprise"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                  Sujet
                </label>
                <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)} required>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white focus:ring-accent focus:border-transparent">
                    <SelectValue placeholder="Sélectionnez un sujet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation DevSecOps</SelectItem>
                    <SelectItem value="architecture">Architecture Cloud</SelectItem>
                    <SelectItem value="coaching">Coaching Agile</SelectItem>
                    <SelectItem value="collaboration">Opportunité de Collaboration</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  required
                  rows={5}
                  className="bg-white/20 border-white/30 text-white placeholder-gray-300 focus:ring-accent focus:border-transparent resize-none"
                  placeholder="Décrivez votre projet ou votre demande..."
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 animate-spin" size={20} />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    Envoyer le Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
