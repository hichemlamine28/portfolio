
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import nodemailer from "nodemailer";
import { randomUUID } from "crypto";
import { statsManager } from "./stats";

export async function registerRoutes(app: Express): Promise<Server> {
  // Visitor tracking middleware avec gestion d'erreurs
  app.use((req, res, next) => {
    try {
      // Récupérer l'IP réelle du client
      const clientIP = req.ip || 
                      req.headers['x-forwarded-for'] as string || 
                      req.headers['x-real-ip'] as string ||
                      req.connection.remoteAddress || 
                      'unknown';
      
      // Mettre à jour l'utilisateur connecté seulement pour certaines routes
      // Éviter les updates multiples pour les assets statiques
      const isApiRoute = req.path.startsWith('/api/');
      const isMainPage = req.path === '/' || req.path.startsWith('/static') || req.path.endsWith('.js') || req.path.endsWith('.css');
      
      if (isApiRoute || isMainPage) {
        statsManager.updateConnectedUser(clientIP);
      }
      
      // Maintenir la session pour d'autres fonctionnalités
      if (!req.session) {
        req.session = {};
      }
      if (!req.session.userId) {
        req.session.userId = randomUUID();
      }
      
      // Marquer cette IP comme visitée dans la session
      if (!req.session.hasVisited) {
        req.session.hasVisited = true;
        req.session.visitedIP = clientIP;
      }
    } catch (error) {
      console.error('Erreur dans le middleware de tracking:', error.message);
      // Continuer même en cas d'erreur pour ne pas bloquer les requêtes
    }
    next();
  });

  // Get visitor statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = statsManager.getStats();
      const currentConnected = statsManager.getCurrentConnected();
      
      // Log moins fréquent pour éviter le spam
      if (Math.random() < 0.1) { // Log seulement 10% du temps
        console.log(`Utilisateurs connectés: ${currentConnected}`);
      }
      
      res.json({
        ...stats,
        currentConnected
      });
    } catch (error) {
      console.error("Get stats error:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des statistiques" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // Send email notification
      try {
        await sendContactEmail(contactData);
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Continue even if email fails
      }
      
      res.json({ success: true, message: "Message envoyé avec succès!" });
    } catch (error) {
      console.error("Contact submission error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Erreur lors de l'envoi du message. Veuillez réessayer." 
      });
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des contacts" });
    }
  });

  // Map pour tracker les derniers appels /api/visit par IP
  const lastVisitCalls = new Map<string, number>();

  // Increment visitor counter
  app.post("/api/visit", async (req, res) => {
    try {
      // Récupérer l'IP du client
      const clientIP = req.ip || 
                      req.headers['x-forwarded-for'] as string || 
                      req.headers['x-real-ip'] as string ||
                      req.connection.remoteAddress || 
                      'unknown';
      
      // Protection contre les appels multiples de la même IP
      const now = Date.now();
      const lastCall = lastVisitCalls.get(clientIP);
      if (lastCall && (now - lastCall) < 10000) { // 10 secondes de protection
        // Retourner les stats existantes sans traitement
        const stats = statsManager.getStats();
        const currentConnected = statsManager.getCurrentConnected();
        return res.json({ ...stats, currentConnected });
      }
      
      // Enregistrer ce nouvel appel
      lastVisitCalls.set(clientIP, now);
      
      // Nettoyer les anciens appels (garder seulement les 100 derniers)
      if (lastVisitCalls.size > 100) {
        const oldestEntries = Array.from(lastVisitCalls.entries())
          .sort(([,a], [,b]) => a - b)
          .slice(0, 50);
        lastVisitCalls.clear();
        oldestEntries.forEach(([ip, time]) => lastVisitCalls.set(ip, time));
      }
      
      // Vérifier si cette IP doit être comptée
      const shouldIncrement = statsManager.shouldCountVisitor(clientIP);
      
      let stats;
      if (shouldIncrement) {
        stats = statsManager.incrementVisitors(clientIP);
      } else {
        stats = statsManager.getStats();
      }
      
      const currentConnected = statsManager.getCurrentConnected();
      res.json({
        ...stats,
        currentConnected
      });
    } catch (error) {
      console.error("Visit increment error:", error);
      res.status(500).json({ message: "Erreur lors de l'incrémentation des visiteurs" });
    }
  });

  // Route pour remettre à zéro les stats (optionnel)
  app.post("/api/reset-stats", async (req, res) => {
    try {
      statsManager.resetStats();
      res.json({ success: true, message: "Statistiques remises à zéro" });
    } catch (error) {
      console.error("Reset stats error:", error);
      res.status(500).json({ message: "Erreur lors de la remise à zéro" });
    }
  });

  // Route pour nettoyer les utilisateurs connectés
  app.post("/api/clear-connected", async (req, res) => {
    try {
      statsManager.clearConnectedUsers();
      res.json({ success: true, message: "Utilisateurs connectés nettoyés" });
    } catch (error) {
      console.error("Clear connected users error:", error);
      res.status(500).json({ message: "Erreur lors du nettoyage" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function sendContactEmail(contactData: any) {
  // Configure nodemailer with environment variables
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || process.env.EMAIL_USER,
      pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER || process.env.EMAIL_USER || "noreply@portfolio.com",
    to: "hichemlamine@gmail.com",
    subject: `Portfolio Contact: ${contactData.subject}`,
    html: `
      <h2>Nouveau message depuis votre portfolio</h2>
      <p><strong>Nom:</strong> ${contactData.firstName} ${contactData.lastName}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      ${contactData.company ? `<p><strong>Entreprise:</strong> ${contactData.company}</p>` : ''}
      <p><strong>Sujet:</strong> ${contactData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message.replace(/\n/g, '<br>')}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
