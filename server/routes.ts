import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import nodemailer from "nodemailer";
import { randomUUID } from "crypto";
import { statsManager } from "./stats";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware pour tracker les sessions connectées
  app.use((req, res, next) => {
    try {
      const sessionId = req.headers['x-session-id'] as string;
      const fingerprint = req.headers['x-fingerprint'] as string;
      const clientIP = req.ip || 
              req.connection?.remoteAddress || 
              req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() || 
              'unknown';

      // Mettre à jour l'activité si on a les infos nécessaires
      if (fingerprint && (req.path.startsWith('/api/') || req.path === '/' || req.path.startsWith('/src/') || req.path.includes('.js') || req.path.includes('.css'))) {
        statsManager.updateConnectedUser(sessionId, clientIP, fingerprint);
      }
    } catch (error) {
      console.error('Erreur middleware activité:', error.message);
    }
    next();
  });

  // Get visitor statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = statsManager.getStats();
      const currentConnected = statsManager.getCurrentConnected();

      // Log plus fréquent pour debug
      console.log(`📊 Stats: ${stats.totalVisitors} visiteurs | ${currentConnected} en ligne | ${new Date().toLocaleTimeString('fr-FR')}`);

      // Debug détaillé
      if (currentConnected === 0 && statsManager.connectedUsers.size > 0) {
        console.log('⚠️ Incohérence détectée: Map a des utilisateurs mais count=0');
      }

      const currentTime = await statsManager.getCurrentTime();
      res.json({
        ...stats,
        currentConnected,
        currentTime
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

      // Protection stricte contre les doublons (1 minute)
      const now = Date.now();
      const lastCall = lastVisitCalls.get(clientIP);
      if (lastCall && (now - lastCall) < 60000) { // 1 minute de protection
        console.log(`🚫 Appel /api/visit ignoré pour ${clientIP.substring(0, 8)}... (trop récent)`);
        const stats = statsManager.getStats();
        const currentConnected = statsManager.getCurrentConnected();
        const currentTime = await statsManager.getCurrentTime();
        return res.json({ ...stats, currentConnected, currentTime });
      }

      // Enregistrer ce nouvel appel
      lastVisitCalls.set(clientIP, now);

      // Vérifier si cette IP doit être comptée (une seule fois par jour)
      const shouldIncrement = statsManager.shouldCountVisitor(clientIP);

      let stats;
      if (shouldIncrement) {
        stats = statsManager.incrementVisitors(clientIP);
        console.log(`✅ NOUVEAU visiteur ajouté: ${clientIP.substring(0, 8)}... → Total: ${stats.totalVisitors}`);
      } else {
        stats = statsManager.getStats();
        console.log(`ℹ️ Visiteur déjà compté: ${clientIP.substring(0, 8)}... → Total reste: ${stats.totalVisitors}`);
      }

      const currentConnected = statsManager.getCurrentConnected();
      const currentTime = await statsManager.getCurrentTime();
      res.json({
        ...stats,
        currentConnected,
        currentTime
      });
    } catch (error) {
      console.error("Visit increment error:", error);
      res.status(500).json({ message: "Erreur lors de l'incrémentation des visiteurs" });
    }
  });

  app.post('/api/reset-stats', (req, res) => {
    try {
      statsManager.resetStats();
      res.json({ success: true, message: 'Statistiques remises à zéro' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la remise à zéro' });
    }
  });

  // API pour définir manuellement le compteur de visiteurs
  app.post('/api/set-visitor-count', (req, res) => {
    try {
      const { count } = req.body;

      if (typeof count !== 'number' || count < 0) {
        return res.status(400).json({ error: 'Compteur invalide' });
      }

      statsManager.setVisitorCount(count);
      res.json({ 
        success: true, 
        message: `Compteur défini à ${count} visiteurs`,
        newCount: count
      });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la définition du compteur' });
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

  // Map pour tracker les dernières synchronisations par IP
  const lastSyncCalls = new Map<string, number>();

  // Route pour synchroniser le serveur avec l'historique client
  app.post("/api/sync-server-with-history", async (req, res) => {
    try {
      // Récupérer l'IP du client
      const clientIP = req.ip || 
                      req.headers['x-forwarded-for'] as string || 
                      req.headers['x-real-ip'] as string ||
                      req.connection.remoteAddress || 
                      'unknown';

      // Protection contre les synchronisations multiples de la même IP
      const now = Date.now();
      const lastSync = lastSyncCalls.get(clientIP);
      if (lastSync && (now - lastSync) < 3000) { // 3 secondes de protection
        console.log('🔄 Sync ignorée (trop récente):', clientIP.substring(0, 10));
        return res.json({ 
          success: true, 
          message: "Synchronisation ignorée (trop récente)",
          newTotal: statsManager.getStats().totalVisitors
        });
      }

      // Enregistrer cette synchronisation
      lastSyncCalls.set(clientIP, now);

      const { visitHistory, downloadHistory } = req.body;

      if (visitHistory && Array.isArray(visitHistory)) {
        // Mettre le compteur serveur à la taille de l'historique client ET sauvegarder l'historique
        const historyCount = visitHistory.length;
        statsManager.syncServerCountWithHistory(historyCount, visitHistory);

        console.log(`🔄 Serveur synchronisé avec l'historique client: ${historyCount} visites + historique sauvegardé`);
      }

      res.json({ 
        success: true, 
        message: "Serveur synchronisé avec l'historique",
        newTotal: statsManager.getStats().totalVisitors
      });
    } catch (error) {
      console.error("Sync server with history error:", error);
      res.status(500).json({ message: "Erreur lors de la synchronisation" });
    }
  });

  // Route pour obtenir l'heure actuelle (NTP)
  app.get("/api/current-time", async (req, res) => {
    try {
      const currentTime = await statsManager.getCurrentTime();
      res.json({ currentTime });
    } catch (error) {
      console.error("Get current time error:", error);
      res.status(500).json({ message: "Erreur lors de la récupération de l'heure" });
    }
  });

  // Route pour téléchargement CV (centralisée)
  app.post("/api/cv-download", async (req, res) => {
    try {
      const clientIP = req.ip || 
                      req.headers['x-forwarded-for'] as string || 
                      req.headers['x-real-ip'] as string ||
                      req.connection.remoteAddress || 
                      'unknown';

      const downloadStats = statsManager.addCVDownload(clientIP);
      res.json({ 
        success: true, 
        message: "Téléchargement CV enregistré",
        ...downloadStats
      });
    } catch (error) {
      console.error("CV download error:", error);
      res.status(500).json({ message: "Erreur lors de l'enregistrement du téléchargement" });
    }
  });

  // Route pour obtenir stats téléchargements CV
  app.get("/api/cv-download-stats", async (req, res) => {
    try {
      const downloadStats = statsManager.getCVDownloadStats();
      res.json(downloadStats);
    } catch (error) {
      console.error("Get CV download stats error:", error);
      res.status(500).json({ message: "Erreur lors de la récupération des stats téléchargements" });
    }
  });

  // Route pour synchroniser téléchargements avec client
  app.post("/api/sync-cv-downloads", async (req, res) => {
    try {
      const { clientDownloads } = req.body;
      const syncedStats = statsManager.syncCVDownloadsWithClient(clientDownloads);

      if (process.env.NODE_ENV === 'development') {
        console.log(`🔄 CV sync: ${syncedStats.totalCVDownloads} total`);
      }

      res.json({ 
        success: true, 
        message: "Téléchargements CV synchronisés",
        ...syncedStats
      });
    } catch (error) {
      console.error("Sync CV downloads error:", error);
      res.status(500).json({ message: "Erreur lors de la synchronisation" });
    }
  });

  // Route heartbeat pour maintenir la connexion active
  app.post('/api/heartbeat', (req, res) => {
    try {
      const sessionId = req.headers['x-session-id'] as string;
      const fingerprint = req.headers['x-fingerprint'] as string;
      const clientIP = req.ip || 
              req.connection?.remoteAddress || 
              req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() || 
              'unknown';

      console.log(`💓 Heartbeat reçu: session=${sessionId?.substring(0, 8)}..., fingerprint=${fingerprint?.substring(0, 8)}..., IP=${clientIP.substring(0, 8)}...`);

      // Mettre à jour l'activité de l'utilisateur
      if (fingerprint && clientIP !== 'unknown') {
        statsManager.updateConnectedUser(sessionId, clientIP, fingerprint);
        console.log(`✅ Utilisateur enregistré via heartbeat - Total connectés: ${statsManager.getCurrentConnected()}`);
      } else {
        console.log(`⚠️ Heartbeat incomplet: fingerprint=${!!fingerprint}, IP=${clientIP !== 'unknown'}`);
      }
      
      const currentConnected = statsManager.getCurrentConnected();
      res.json({ status: 'ok', connected: currentConnected });
    } catch (error) {
      console.error('Erreur heartbeat:', error.message);
      res.status(500).json({ error: 'Heartbeat failed' });
    }
  });

  // Nouvelle API pour récupérer l'historique serveur (source de vérité)
  app.get('/api/server-visit-history', (req, res) => {
    try {
      const serverHistory = statsManager.getVisitHistory();
      res.json({ 
        success: true, 
        visitHistory: serverHistory,
        count: serverHistory.length,
        source: 'server_authority'
      });
    } catch (error) {
      console.error('Get server history error:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'historique serveur' });
    }
  });

  // API pour nettoyer l'historique serveur
  app.post('/api/clean-server-history', (req, res) => {
    try {
      const cleanedCount = statsManager.cleanServerHistory();
      res.json({ 
        success: true, 
        message: `Historique serveur nettoyé: ${cleanedCount} visites uniques`,
        newCount: cleanedCount
      });
    } catch (error) {
      console.error('Clean server history error:', error);
      res.status(500).json({ message: 'Erreur lors du nettoyage de l\'historique serveur' });
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