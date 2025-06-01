
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import { cvData } from '@/lib/cvData';

export default function CVGeneratorV1() {
  const generatePDF = () => {
    const pdf = new jsPDF();
    const margin = 20;
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const lineHeight = 6;
    let yPosition = margin;

    // Fonction pour ajouter une nouvelle page si nécessaire
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Fonction pour ajouter le footer avec numérotation uniquement
    const addFooter = (pageNum: number, totalPages: number) => {
      const footerY = pageHeight - 10;
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text(`Page ${pageNum}/${totalPages}`, pageWidth - margin, footerY, { align: 'right' });
    };

    // Header avec informations personnelles
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}`, margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(100, 100, 100);
    pdf.text(cvData.personalInfo.title, margin, yPosition);
    yPosition += 15;

    // Contact
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    const contactInfo = [
      `📧 ${cvData.personalInfo.email}`,
      `📱 ${cvData.personalInfo.phone}`,
      `📍 ${cvData.personalInfo.location}`,
      `🔗 ${cvData.personalInfo.linkedin}`
    ];
    
    contactInfo.forEach(info => {
      pdf.text(info, margin, yPosition);
      yPosition += 5;
    });
    yPosition += 10;

    // À propos
    checkPageBreak(20);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('À PROPOS', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const aboutLines = pdf.splitTextToSize(cvData.personalInfo.summary, pageWidth - 2 * margin);
    aboutLines.forEach((line: string) => {
      checkPageBreak(6);
      pdf.text(line, margin, yPosition);
      yPosition += 5;
    });
    yPosition += 10;

    // Expérience professionnelle
    checkPageBreak(20);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('EXPÉRIENCE PROFESSIONNELLE', margin, yPosition);
    yPosition += 8;

    cvData.experiences.forEach((exp) => {
      checkPageBreak(25);
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(exp.title, margin, yPosition);
      yPosition += 6;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      pdf.text(`${exp.company} | ${exp.period}`, margin, yPosition);
      yPosition += 6;

      pdf.setTextColor(0, 0, 0);
      const descLines = pdf.splitTextToSize(exp.description, pageWidth - 2 * margin);
      descLines.forEach((line: string) => {
        checkPageBreak(5);
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });

      // Missions
      if (exp.missions && exp.missions.length > 0) {
        yPosition += 3;
        checkPageBreak(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Missions principales:', margin, yPosition);
        yPosition += 5;
        
        pdf.setFont('helvetica', 'normal');
        exp.missions.forEach(mission => {
          const missionLines = pdf.splitTextToSize(`• ${mission}`, pageWidth - 2 * margin - 5);
          missionLines.forEach((line: string) => {
            checkPageBreak(5);
            pdf.text(line, margin + 5, yPosition);
            yPosition += 4;
          });
        });
      }

      // Réalisations
      if (exp.achievements && exp.achievements.length > 0) {
        yPosition += 3;
        checkPageBreak(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Réalisations clés:', margin, yPosition);
        yPosition += 5;
        
        pdf.setFont('helvetica', 'normal');
        exp.achievements.forEach(achievement => {
          const achievementLines = pdf.splitTextToSize(`• ${achievement}`, pageWidth - 2 * margin - 5);
          achievementLines.forEach((line: string) => {
            checkPageBreak(5);
            pdf.text(line, margin + 5, yPosition);
            yPosition += 4;
          });
        });
      }

      yPosition += 8;
    });

    // Compétences techniques
    checkPageBreak(30);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('COMPÉTENCES TECHNIQUES', margin, yPosition);
    yPosition += 8;

    cvData.skills.forEach(skillCategory => {
      checkPageBreak(15);
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(skillCategory.category, margin, yPosition);
      yPosition += 6;

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      const skillsText = skillCategory.items.join(', ');
      const skillLines = pdf.splitTextToSize(skillsText, pageWidth - 2 * margin);
      skillLines.forEach((line: string) => {
        checkPageBreak(5);
        pdf.text(line, margin, yPosition);
        yPosition += 4;
      });
      yPosition += 6;
    });

    // Certifications
    checkPageBreak(30);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CERTIFICATIONS', margin, yPosition);
    yPosition += 8;

    const certifications = [
      "AWS Certified Cloud Practitioner",
      "AWS Generative AI",
      "Azure Fundamentals (AZ-900)",
      "Google Cloud Digital Leader",
      "Certified Kubernetes Administrator (CKA)",
      "Certified Kubernetes Application Developer (CKAD)",
      "Certified Kubernetes Security Specialist (CKS)",
      "Scrum Foundation Professional Certificate (SFPC)",
      "Scrum Foundation Certificate (SFC)",
      "Scrum on Digital Transformation Foundation Certificate (SODTFC)",
      "Professional Scrum Master I (PSM I)",
      "DevOps Methodology Introduction (DMI)",
      "LPIC-1: Linux Professional Institute Certification",
      "HTML5 Application Development Fundamentals",
      "Microsoft Networking Fundamentals",
      "Certified Kanban Management Professional (KMP I)",
      "ITIL 4 Foundation Certificate",
      "Six Sigma White Belt",
      "Lifelong Learning 2025"
    ];

    // Affichage des certifications en 2 colonnes
    const certColumnWidth = (pageWidth - 2 * margin - 5) / 2; // Réduire l'espacement entre colonnes
    const certsPerColumn = Math.ceil(certifications.length / 2);
    
    pdf.setFontSize(9);
    
    // Colonne 1
    for (let i = 0; i < certsPerColumn && i < certifications.length; i++) {
      checkPageBreak(5);
      pdf.text(`• ${certifications[i]}`, margin, yPosition + (i * 4));
    }
    
    // Colonne 2 - décalée moins à droite
    for (let i = certsPerColumn; i < certifications.length; i++) {
      const rowIndex = i - certsPerColumn;
      pdf.text(`• ${certifications[i]}`, margin + certColumnWidth + 3, yPosition + (rowIndex * 4)); // Réduire le décalage
    }
    
    yPosition += (certsPerColumn * 4) + 10;

    // Formation
    checkPageBreak(20);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('FORMATION', margin, yPosition);
    yPosition += 8;

    cvData.education.forEach(edu => {
      checkPageBreak(15);
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text(edu.degree, margin, yPosition);
      yPosition += 6;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${edu.school} | ${edu.year}`, margin, yPosition);
      yPosition += 8;
    });

    // Ajouter le footer avec la date uniquement sur la dernière page
    const totalPages = pdf.internal.pages.length - 1; // -1 car pages[0] est vide
    
    // Ajouter les numéros de page sur toutes les pages
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      addFooter(i, totalPages);
    }

    // Ajouter la date de génération seulement sur la dernière page
    pdf.setPage(totalPages);
    const lastPageFooterY = pageHeight - 15;
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`CV généré le ${new Date().toLocaleDateString('fr-FR')}`, margin, lastPageFooterY);

    // Téléchargement
    pdf.save(`CV_${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}.pdf`);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Générateur de CV
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Téléchargez votre CV professionnel au format PDF avec toutes vos informations mises à jour.
        </p>
        <Button 
          onClick={generatePDF} 
          className="w-full flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Télécharger le CV (PDF)
        </Button>
      </CardContent>
    </Card>
  );
}
