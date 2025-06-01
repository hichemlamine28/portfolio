import React, { useState, useEffect } from 'react';
import { Download, FileText, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { personalInfo, experiences, skills } from '@/lib/cvData';
import jsPDF from 'jspdf';

interface CVGeneratorProps {
  className?: string;
}

export default function CVGenerator({ className = "" }: CVGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      const margin = 15;
      let yPosition = margin;

      // Fonction pour ajouter une nouvelle page si nécessaire
      const checkNewPage = (neededHeight: number) => {
        if (yPosition + neededHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      };

      // En-tête avec informations personnelles
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${personalInfo.firstName} ${personalInfo.lastName}`, margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);

      // Diviser le titre en deux lignes
      const titlePart1 = "Architecte & Lead DevSecOps Cloud • Scrum Master";
      const titlePart2 = "Coach DevOps Agile • Expert Technique Atlassian";

      pdf.text(titlePart1, margin, yPosition);
      yPosition += 5;
      pdf.text(titlePart2, margin, yPosition);
      yPosition += 10;

      // Informations de contact
      pdf.setFontSize(10);
      pdf.setTextColor(50, 50, 50);
      const contactInfo = [
        `Email: ${personalInfo.email}`,
        `Téléphone: ${personalInfo.phone}`,
        `LinkedIn: ${personalInfo.linkedin}`,
        ...(personalInfo.github ? [`GitHub: ${personalInfo.github}`] : [])
      ];

      contactInfo.forEach(info => {
        pdf.text(info, margin, yPosition);
        yPosition += 4;
      });
      yPosition += 5;

      // Ligne de séparation
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;

      // Résumé professionnel
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('PROFIL PROFESSIONNEL', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(50, 50, 50);

      // Diviser le texte long en plusieurs lignes
      const summaryLines = pdf.splitTextToSize(personalInfo.summary, pageWidth - 2 * margin);
      summaryLines.forEach((line: string) => {
        checkNewPage(4);
        pdf.text(line, margin, yPosition);
        yPosition += 4;
      });
      yPosition += 8;

      // Compétences techniques en tableau 3 colonnes optimisé
      checkNewPage(50);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('COMPÉTENCES TECHNIQUES', margin, yPosition);
      yPosition += 10;

      // Définir les compétences par domaines (liste simple)
      const skillsTable = {
        'Cloud & Infrastructure': [
          'OpenStack', 'AWS (EC2, S3, Lambda)', 'Google Cloud Platform', 'Microsoft Azure',
          'NUBO Cloud Privé', 'DigitalOcean', 'OVH Cloud', 'Hetzner Cloud',
          'CloudWatch', 'Azure Monitor', 'FinOps', 'SysOps'
        ],
        'DevOps & CI/CD': [
          'Ansible', 'Terraform', 'Chef', 'Puppet', 'Jenkins', 'GitLab CI/CD',
          'GitHub Actions', 'Azure DevOps', 'CircleCI', 'Bitbucket Pipelines',
          'Vagrant', 'Packer', 'Bamboo'
        ],
        'Conteneurs & Orchestration': [
          'Docker', 'Docker Compose', 'Kubernetes', 'OpenShift', 'Helm',
          'Rancher', 'Harbor Registry', 'Docker Swarm', 'Amazon EKS',
          'Azure AKS', 'Google GKE', 'Istio'
        ],
        'Monitoring & Observabilité': [
          'Prometheus', 'Grafana', 'ELK Stack', 'Splunk', 'New Relic',
          'Datadog', 'Zabbix', 'Nagios', 'Jaeger', 'OpenTelemetry',
          'Fluentd', 'Beats', 'InfluxDB'
        ],
        'Sécurité & DevSecOps': [
          'SonarQube', 'OWASP ZAP', 'Trivy', 'Falco', 'Vault', 'CyberArk',
          'Keycloak', 'OAuth2/OIDC', 'SSL/TLS', 'WAF', 'SIEM',
          'Penetration Testing'
        ],
        'Suite Atlassian': [
          'Jira (Admin/Config)', 'Confluence (Admin)', 'Bitbucket', 'Bamboo',
          'Crowd', 'Fisheye/Crucible', 'Jira Service Management',
          'ScriptRunner', 'Automation for Jira', 'Portfolio for Jira'
        ],
        'Programmation & Scripting': [
          'Python', 'Bash/Shell', 'PowerShell', 'Java', 'JavaScript/Node.js',
          'Go', 'PHP', 'C#', 'SQL', 'YAML', 'JSON', 'XML'
        ],
        'Bases de Données': [
          'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch',
          'InfluxDB', 'Cassandra', 'Oracle', 'SQL Server', 'MariaDB',
          'DynamoDB', 'Neo4j'
        ],
        'Réseau & Infrastructure': [
          'TCP/IP', 'DNS', 'DHCP', 'VPN', 'Load Balancing', 'Firewall',
          'VLAN', 'SDN', 'F5 BigIP', 'HAProxy', 'Nginx', 'Apache'
        ],
        'Méthodologies Agiles': [
          'Scrum Master Certifié', 'Kanban', 'SAFe', 'DevOps Culture',
          'Lean', 'Six Sigma', 'ITIL', 'Change Management',
          'Team Coaching', 'Facilitation', 'Retrospectives'
        ],
        'Test & Automatisation': [
          'JUnit', 'Karma', 'Selenium', 'SonarQube', 'SonarCloud',
          'Cypress', 'Jest', 'Spring Test', 'Mockito', 'TestNG',
          'Postman', 'SoapUI', 'JMeter', 'Gatling', 'Newman',
          'Robot Framework', 'Cucumber', 'Jasmine', 'Mocha', 'Playwright'
        ],
        'Architecture & Design Tools': [
          'Draw.io', 'Lucidchart', 'PlantUML', 'Visio', 'ArchiMate',
          'Enterprise Architect', 'Figma', 'Sketch', 'Adobe XD',
          'InVision', 'Balsamiq', 'Wireframe.cc', 'Miro', 'Conceptboard'
        ],
        'Stratégies de Déploiement': [
          'Blue-Green Deployment', 'Canary Deployment', 'Rolling Deployment',
          'A/B Testing', 'Feature Flags', 'Circuit Breaker',
          'Direct Deployment', 'Shadow Deployment', 'Immutable Infrastructure',
          'GitOps', 'Progressive Delivery', 'Zero-Downtime Deployment'
        ]
      };

      // Configuration du tableau 3 colonnes
      const columnWidth = (pageWidth - 2 * margin - 10) / 3; // Espacement entre colonnes
      const categories = Object.entries(skillsTable);

      for (let i = 0; i < categories.length; i += 3) {
        checkNewPage(30);

        // Traiter les 3 colonnes
        for (let col = 0; col < 3; col++) {
          const categoryIndex = i + col;
          const category = categories[categoryIndex];

          if (category) {
            const xPos = margin + (col * (columnWidth + 5));

            // Titre de la catégorie
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(0, 100, 200);
            pdf.text(category[0], xPos, yPosition);

            // Technologies directement
            let localYPos = yPosition + 5;
            const skillsList = category[1];

            pdf.setFontSize(7);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(50, 50, 50);

            // Organiser les technologies en 2 colonnes par domaine
            const halfWidth = (columnWidth - 4) / 2;
            for (let j = 0; j < skillsList.length; j += 2) {
              const skill1 = skillsList[j];
              const skill2 = skillsList[j + 1];

              if (localYPos > pageHeight - margin - 15) break; // Éviter débordement

              // Première colonne
              if (skill1) {
                pdf.text(`• ${skill1}`, xPos + 2, localYPos);
              }

              // Deuxième colonne
              if (skill2) {
                pdf.text(`• ${skill2}`, xPos + halfWidth + 4, localYPos);
              }

              localYPos += 2.5;
            }
          }
        }

        // Calculer la hauteur maximale utilisée par les 3 colonnes
        let maxHeight = 0;
        for (let col = 0; col < 3; col++) {
          const categoryIndex = i + col;
          const category = categories[categoryIndex];
          if (category) {
            const skillsList = category[1];
            let categoryHeight = 5; // Titre
            categoryHeight += Math.ceil(skillsList.length / 2) * 2.5; // Technologies
            maxHeight = Math.max(maxHeight, categoryHeight);
          }
        }

        yPosition += maxHeight + 8; // Espacement entre les groupes de 3 colonnes
      }

      yPosition += 5;

      // Certifications Professionnelles
      checkNewPage(40);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('CERTIFICATIONS PROFESSIONNELLES', margin, yPosition);
      yPosition += 8;

      // Liste des certifications
      const certifications = [
        "CKAD: Certified Kubernetes Application Developer",
        "CKA: Certified Kubernetes Administrator",
        "CKS: Certified Kubernetes Security Specialist",
        "AWS Certified Solutions Architect - Associate",
        "AWS Cloud Quest: Cloud Practitioner",
        "AWS Introduction to Generative AI",
        "Google Cloud Professional Cloud DevOps Engineer",
        "Microsoft Azure Administrator Associate (AZ-104)",
        "Microsoft Technology Associate: HTML5",
        "Microsoft Technology Associate: Networking",
        "LPI 701: DevOps Tools Engineer",
        "SODFC™: Scrum for Operations and DevOps Fundamentals Certified",
        "PSM I: Professional Scrum Master I",
        "SFC™: Scrum Fundamentals Certified",
        "SFPC: Scrum Foundation Professional Certificate",
        "SSYB™: Six Sigma Yellow Belt",
        "Marketing Strategy Fundamentals",
        "LifeLog Learning Certification 2024",
        "LifeLog Learning Certification 2025"
      ];

      // Affichage des certifications en 2 colonnes
      const certColumnWidth = (pageWidth - 2 * margin - 5) / 2; // Réduire l'espacement entre colonnes
      const certsPerColumn = Math.ceil(certifications.length / 2);

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(50, 50, 50);

      // Colonne 1
      for (let i = 0; i < certsPerColumn && i < certifications.length; i++) {
        checkNewPage(4);
        pdf.text(`• ${certifications[i]}`, margin, yPosition + (i * 4));
      }

      // Colonne 2 - décalée moins à droite
      for (let i = certsPerColumn; i < certifications.length; i++) {
        const rowIndex = i - certsPerColumn;
        pdf.text(`• ${certifications[i]}`, margin + certColumnWidth + 3, yPosition + (rowIndex * 4)); // Réduire le décalage
      }

      yPosition += (certsPerColumn * 4) + 10;

      // Expériences professionnelles
      checkNewPage(20);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('EXPÉRIENCE PROFESSIONNELLE', margin, yPosition);
      yPosition += 8;

      experiences.forEach((exp, index) => {
        checkNewPage(30);

        // Titre du poste (raccourci et géré pour éviter le débordement)
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 100, 200);

        // Raccourcir le titre si trop long (limite plus stricte)
        let shortPosition = exp.position;
        if (exp.position.length > 60) {
          shortPosition = exp.position.substring(0, 57) + '...';
        }

        const positionLines = pdf.splitTextToSize(shortPosition, pageWidth - 2 * margin - 10);
        positionLines.slice(0, 1).forEach((line: string) => { // Limiter à 1 ligne max
          pdf.text(line, margin, yPosition);
          yPosition += 5;
        });

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(50, 50, 50);
        const companyLine = `${exp.company} | ${exp.startDate} - ${exp.endDate}`;
        const companyLines = pdf.splitTextToSize(companyLine, pageWidth - 2 * margin);
        companyLines.forEach((line: string) => {
          pdf.text(line, margin, yPosition);
          yPosition += 5;
        });
        yPosition += 2;

        // Tous les projets (pas de limitation)
        exp.projects.forEach(project => {
          checkNewPage(20);

          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(0, 0, 0);
          const projectNameLines = pdf.splitTextToSize(`• ${project.name}`, pageWidth - 2 * margin - 5);
          projectNameLines.forEach((line: string) => {
            pdf.text(line, margin + 5, yPosition);
            yPosition += 4;
          });

          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'normal');
          pdf.setTextColor(50, 50, 50);
          const descLines = pdf.splitTextToSize(project.description, pageWidth - 2 * margin - 10);
          descLines.forEach((line: string) => {
            checkNewPage(4);
            pdf.text(line, margin + 10, yPosition);
            yPosition += 3.5;
          });

          // Toutes les réalisations (pas de limitation)
          project.achievements.forEach(achievement => {
            checkNewPage(4);
            const achLines = pdf.splitTextToSize(`- ${achievement}`, pageWidth - 2 * margin - 15);
            achLines.forEach((line: string) => {
              pdf.text(line, margin + 15, yPosition);
              yPosition += 3;
            });
          });
          yPosition += 4;
        });

        // Technologies utilisées (toutes)
        if (exp.technologies.length > 0) {
          checkNewPage(10);
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'italic');
          pdf.setTextColor(100, 100, 100);
          const techText = `Technologies: ${exp.technologies.join(', ')}`;
          const techLines = pdf.splitTextToSize(techText, pageWidth - 2 * margin - 5);
          techLines.forEach((line: string) => {
            pdf.text(line, margin + 5, yPosition);
            yPosition += 3;
          });
        }

        yPosition += 10;
      });

      // Formation et Éducation
      checkNewPage(25);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('FORMATION & ÉDUCATION', margin, yPosition);
      yPosition += 8;

      // Formations académiques simplifiées
      const formations = [
        { title: "Master en Informatique", institution: "Faculté des sciences - Université", year: "2006" },
        { title: "CAPES en Informatique", institution: "Ministère de l'Éducation", year: "2006" },
        { title: "Maîtrise en Informatique", institution: "Faculté des sciences - Université", year: "2004" }
      ];

      formations.forEach(formation => {
        checkNewPage(10);

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 100, 200);
        pdf.text(formation.title, margin, yPosition);
        yPosition += 5;

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(50, 50, 50);
        pdf.text(`${formation.institution} | ${formation.year}`, margin, yPosition);
        yPosition += 8;
      });

      // Pied de page avec numérotation et date de génération uniquement sur la dernière page
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(150, 150, 150);

        if (i === totalPages) {
          // Dernière page: date de génération + numéro de page
          const footerText = `CV généré automatiquement le ${new Date().toLocaleDateString('fr-FR')} - Page ${i}/${totalPages}`;
          pdf.text(footerText, pageWidth / 2, pageHeight - 5, { align: 'center' });
        } else {
          // Autres pages: uniquement numéro de page
          const pageText = `Page ${i}/${totalPages}`;
          pdf.text(pageText, pageWidth / 2, pageHeight - 5, { align: 'center' });
        }
      }

      // Tracker le téléchargement
      if (typeof window !== 'undefined' && (window as any).trackCVDownload) {
        (window as any).trackCVDownload();
      }

      // Télécharger le PDF
      const fileName = `CV_${personalInfo.firstName}_${personalInfo.lastName}_${new Date().getFullYear()}.pdf`;
      pdf.save(fileName);

      toast({
        title: "CV généré avec succès !",
        description: `Le fichier ${fileName} a été téléchargé.`,
      });

    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération du CV.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={className}>
      <Button
        onClick={generatePDF}
        disabled={isGenerating}
        className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-blue-500/25 border-2 border-transparent hover:border-blue-300/30"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Génération en cours...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2 group-hover:animate-pulse" />
            Télécharger CV PDF
          </>
        )}
      </Button>
    </div>
  );
}

// New Features Section
function CVAdditionalFeatures() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implement dark mode logic here (e.g., change CSS classes)
  };

  // Function to handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Implement search logic here (e.g., filter data)
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* Dark Mode Toggle */}
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Analytics Dashboard (Placeholder) */}
      <div>
        <h3>Visits Over Time</h3>
        {/* Placeholder for graph */}
        <p>Graph of visits per period will be displayed here.</p>
      </div>

      <div>
        <h3>CV Download Analytics</h3>
        {/* Placeholder for download analytics */}
        <p>Analytics of CV downloads will be displayed here.</p>
      </div>
    </div>
  );
}

// Analytics tracking function (example)
(window as any).trackCVDownload = () => {
  console.log('CV Downloaded!');
  // Here you would integrate with an analytics service (e.g., Google Analytics)
  // Example:
  // gtag('event', 'cv_download', { 'event_category': 'CV', 'event_label': 'Download' });
};

// Placeholder function for synchronizing analytics immediately
(window as any).syncAnalytics = () => {
  console.log('Synchronizing analytics immediately...');
  // Implement immediate analytics synchronization logic here
  // This could involve sending data to an analytics server
};

// Placeholder function for synchronizing analytics periodically
(window as any).periodicSyncAnalytics = () => {
  console.log('Synchronizing analytics periodically...');
  // Implement periodic analytics synchronization logic here
  // This could involve sending batched data to an analytics server
};

// Call the periodic analytics synchronization function every 10 seconds
setInterval(() => {
  if ((window as any).periodicSyncAnalytics) {
    (window as any).periodicSyncAnalytics();
  }
}, 10000);

// Export the new features component
export { CVAdditionalFeatures };