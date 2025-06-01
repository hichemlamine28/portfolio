import fs from 'fs';
import path from 'path';

interface SiteStats {
  totalVisitors: number;
  lastVisit: string;
  createdAt: string;
  dailyIPs?: Set<string>;
  lastResetDate?: string;
  cvDownloads?: { [date: string]: number };
  totalCVDownloads?: number;
  visitHistory?: any[]; // Historique complet des visites côté serveur
}

interface ConnectedUser {
  ip: string;
  connectedAt: string;
  lastSeen: string;
}

const STATS_FILE = path.join(process.cwd(), 'site-stats.json');
const CONNECTED_USERS_FILE = path.join(process.cwd(), 'connected-users.json');

class StatsManager {
  private stats = {
    totalVisitors: 0,
    lastVisit: new Date().toISOString(),
    dailyIPs: new Set<string>(),
    lastResetDate: new Date().toDateString(),
    cvDownloads: {},
    totalCVDownloads: 0,
    visitHistory: [] // Historique serveur pour autonomie complète
  };

  private connectedUsers = new Map<string, number>();
  private readonly CLEANUP_INTERVAL = 10 * 1000; // 10 secondes pour tests
  private readonly USER_TIMEOUT = 30 * 1000; // 30 secondes pour tests (au lieu de 5 minutes)
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.loadStats();
    this.syncWithClientHistory();
    this.startCleanupTimer();

    // Graceful shutdown
    process.on('SIGTERM', () => this.cleanup());
    process.on('SIGINT', () => this.cleanup());
  }

  private syncWithClientHistory() {
    // Au démarrage, on va synchroniser avec l'historique client via une API
    console.log('🔄 Prêt à synchroniser avec l\'historique client...');
  }

  private startCleanupTimer() {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }

    this.cleanupTimer = setInterval(() => {
      this.cleanupInactiveUsers();
    }, this.CLEANUP_INTERVAL);
  }

  private cleanupInactiveUsers() {
    try {
      const now = Date.now();
      let removedCount = 0;
      const activeUsers: string[] = [];
      const inactiveUsers: string[] = [];

      // Identifier les utilisateurs à supprimer
      for (const [userId, lastSeen] of this.connectedUsers.entries()) {
        const timeSinceLastSeen = now - lastSeen;
        const isInactive = timeSinceLastSeen > this.USER_TIMEOUT;
        
        if (isInactive) {
          inactiveUsers.push(userId);
        } else {
          const ip = userId.split('_')[0];
          activeUsers.push(`${ip.substring(0, 8)}...`);
        }
      }

      // Supprimer les utilisateurs inactifs
      inactiveUsers.forEach(userId => {
        this.connectedUsers.delete(userId);
        removedCount++;
        const ip = userId.split('_')[0];
        console.log(`🗑️ Session expirée: IP=${ip.substring(0, 8)}... (inactive depuis ${Math.floor((now - this.connectedUsers.get(userId) || now) / 1000)}s)`);
      });

      // Log du nettoyage avec détails
      if (removedCount > 0) {
        console.log(`🧹 Nettoyage automatique: ${removedCount} sessions expirées | ${this.connectedUsers.size} actives restantes`);
        console.log(`✅ Sessions actives: [${activeUsers.join(', ')}]`);
      } else if (this.connectedUsers.size > 0) {
        console.log(`💓 Toutes les sessions actives: ${this.connectedUsers.size} utilisateurs | IPs: [${activeUsers.join(', ')}]`);
      }
    } catch (error) {
      console.error('Erreur lors du nettoyage:', error);
    }
  }

  private loadStats() {
    try {
      if (fs.existsSync('site-stats.json')) {
        const data = fs.readFileSync('site-stats.json', 'utf8');
        const parsedStats = JSON.parse(data);

        // Convertir l'Array en Set pour dailyIPs
        this.stats = {
          ...this.stats,
          ...parsedStats,
          dailyIPs: new Set(parsedStats.dailyIPs || []),
          lastResetDate: parsedStats.lastResetDate || new Date().toDateString(),
          cvDownloads: parsedStats.cvDownloads || {},
          totalCVDownloads: parsedStats.totalCVDownloads || 0,
          visitHistory: parsedStats.visitHistory || [] // Charger l'historique serveur
        };
      }
    } catch (error) {
      console.warn('Impossible de charger les stats:', error.message);
    }
  }

  private saveStats() {
    try {
      // Convertir le Set en Array pour la sérialisation
      const statsToSave = {
        ...this.stats,
        dailyIPs: Array.from(this.stats.dailyIPs || []),
        cvDownloads: this.stats.cvDownloads || {},
        totalCVDownloads: this.stats.totalCVDownloads || 0,
        visitHistory: this.stats.visitHistory || [] // Sauvegarder l'historique serveur
      };
      fs.writeFileSync('site-stats.json', JSON.stringify(statsToSave, null, 2));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des stats:', error.message);
    }
  }

  updateConnectedUser(sessionId: string, ip?: string, fingerprint?: string) {
    try {
      if (!ip || !fingerprint) return;

      const cleanIP = ip.split(',')[0].trim();
      // Créer un identifiant unique : IP + empreinte
      const uniqueUserId = `${cleanIP}_${fingerprint}`;
      const now = Date.now();
      const wasConnected = this.connectedUsers.has(uniqueUserId);

      // Mettre à jour le timestamp pour cet utilisateur unique
      this.connectedUsers.set(uniqueUserId, now);

      if (!wasConnected) {
        console.log(`🆕 Nouvel utilisateur: IP=${cleanIP.substring(0, 12)}... | Empreinte=${fingerprint.substring(0, 8)}... | Total: ${this.connectedUsers.size}`);
      } else {
        console.log(`🔄 Utilisateur actif: IP=${cleanIP.substring(0, 12)}... | Total: ${this.connectedUsers.size}`);
      }

    } catch (error) {
      console.error('Erreur lors de la mise à jour utilisateur:', error.message);
    }
  }

  getCurrentConnected(): number {
    try {
      const now = Date.now();
      let activeCount = 0;
      const activeUsers: string[] = [];
      const expiredUsers: string[] = [];

      // Compter les utilisateurs uniques actifs ET nettoyer les expirés
      for (const [userId, lastSeen] of this.connectedUsers.entries()) {
        const timeSinceLastSeen = now - lastSeen;
        const isActive = timeSinceLastSeen <= this.USER_TIMEOUT;

        if (isActive) {
          activeCount++;
          const ip = userId.split('_')[0];
          activeUsers.push(`${ip.substring(0, 8)}...`);
        } else {
          // Nettoyer immédiatement les sessions expirées lors du comptage
          expiredUsers.push(userId);
        }
      }

      // Supprimer les sessions expirées détectées
      expiredUsers.forEach(userId => {
        this.connectedUsers.delete(userId);
        const ip = userId.split('_')[0];
        console.log(`⏰ Session auto-nettoyée lors du comptage: IP=${ip.substring(0, 8)}...`);
      });

      // Afficher le nombre réel d'utilisateurs connectés
      console.log(`🎯 Utilisateurs uniques connectés: ${activeCount} | IPs: [${activeUsers.join(', ')}]`);

      // Retourner le nombre réel d'utilisateurs actifs (peut être 0)
      return activeCount;
    } catch (error) {
      console.error('Erreur lors du comptage:', error.message);
      return 0;
    }
  }

  incrementVisitors(ip?: string) {
    try {
      if (ip) {
        // Vérifier si cette IP a déjà été comptée récemment
        const cleanIP = ip.split(',')[0].trim();
        const recentVisit = this.stats.dailyIPs?.has(cleanIP);

        if (recentVisit) {
          console.log(`🚫 IP ${cleanIP.substring(0, 8)}... déjà comptée aujourd'hui - IGNORÉ`);
          return this.stats;
        }

        // Ajouter l'IP aux visites du jour
        if (!this.stats.dailyIPs) {
          this.stats.dailyIPs = new Set();
        }
        this.stats.dailyIPs.add(cleanIP);

        // NOUVEAU: Ajouter à l'historique serveur
        if (!this.stats.visitHistory) {
          this.stats.visitHistory = [];
        }

        const newVisit = {
          timestamp: new Date().toISOString(),
          ip: cleanIP,
          page: 'portfolio',
          session: `server_${Date.now()}`,
          source: 'server_tracked'
        };

        this.stats.visitHistory.push(newVisit);

        // Garder seulement les 6 derniers mois dans l'historique serveur
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        this.stats.visitHistory = this.stats.visitHistory.filter(visit => 
          new Date(visit.timestamp) > sixMonthsAgo
        );

        this.stats.totalVisitors++;
        this.stats.lastVisit = new Date().toISOString();
        this.saveStats();

        console.log(`✅ NOUVEAU visiteur compté: IP=${cleanIP.substring(0, 8)}... Total=${this.stats.totalVisitors} | Historique: ${this.stats.visitHistory.length}`);
      }

      return this.stats;
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation:', error.message);
      return this.stats;
    }
  }

  shouldCountVisitor(ip: string): boolean {
    try {
      const cleanIP = ip.split(',')[0].trim();

      // Vérifier si cette IP a déjà été comptée aujourd'hui
      const alreadyCounted = this.stats.dailyIPs?.has(cleanIP);

      if (alreadyCounted) {
        console.log(`🚫 IP ${cleanIP.substring(0, 8)}... déjà comptée aujourd'hui - PAS COMPTÉE`);
        return false;
      }

      console.log(`✅ IP ${cleanIP.substring(0, 8)}... nouvelle aujourd'hui - SERA COMPTÉE`);
      return true;
    } catch (error) {
      console.error('Erreur lors de la vérification IP:', error.message);
      return false;
    }
  }

  getStats() {
    return { ...this.stats };
  }

  resetStats() {
    this.stats.totalVisitors = 0;
    this.stats.lastVisit = new Date().toISOString();
    this.stats.lastResetDate = new Date().toISOString();
    this.stats.dailyIPs = new Set();
    this.saveStats();
    console.log('Statistiques remises à zéro');
  }

  setVisitorCount(count: number) {
    try {
      this.stats.totalVisitors = count;
      this.stats.lastVisit = new Date().toISOString();
      this.saveStats();
      console.log(`✅ Compteur de visiteurs défini manuellement: ${count}`);
    } catch (error) {
      console.error('Erreur lors de la définition du compteur:', error.message);
    }
  }

  // Récupérer l'heure actuelle depuis un serveur NTP fiable
  private async getCurrentNTPTime(): Promise<string> {
    try {
      // Essayer plusieurs API de temps en parallèle pour plus de fiabilité
      const timeApis = [
        'https://worldtimeapi.org/api/timezone/Europe/Paris',
        'https://timeapi.io/api/time/current/zone?timeZone=Europe/Paris',
        'http://worldtimeapi.org/api/timezone/Europe/Paris'
      ];

      for (const apiUrl of timeApis) {
        try {
          const response = await fetch(apiUrl, { timeout: 3000 });
          if (response.ok) {
            const data = await response.json();
            // Gérer différents formats de réponse
            const timeString = data.datetime || data.dateTime || data.currentDateTime;
            if (timeString) {
              return timeString;
            }
          }
        } catch (apiError) {
          // Continuer vers l'API suivante
          continue;
        }
      }
    } catch (error) {
      // Silent fail pour éviter le spam dans les logs
    }

    // Fallback sur l'heure système si toutes les API échouent
    return new Date().toISOString();
  }

  // Méthode publique pour obtenir l'heure actuelle
  async getCurrentTime(): Promise<string> {
    // Toujours retourner l'heure système actuelle pour garantir la mise à jour
    return new Date().toISOString();
  }

  syncServerCountWithHistory(historyCount: number, clientHistory?: any[]) {
    try {
      // Mettre le compteur serveur exactement à la valeur de l'historique
      this.stats.totalVisitors = historyCount;
      this.stats.lastVisit = new Date().toISOString();

      // NOUVEAU: Sauvegarder l'historique client dans le serveur pour autonomie
      if (clientHistory && Array.isArray(clientHistory)) {
        this.stats.visitHistory = [...clientHistory];
        console.log(`📥 Historique client sauvegardé côté serveur: ${clientHistory.length} visites`);
      }

      this.saveStats();

      console.log(`✅ Compteur serveur synchronisé: ${historyCount} visiteurs | Historique: ${this.stats.visitHistory?.length || 0}`);
    } catch (error) {
      console.error('Erreur lors de la synchronisation:', error.message);
    }
  }

  clearConnectedUsers() {
    try {
      this.connectedUsers.clear();
    } catch (error) {
      console.error('Erreur lors du nettoyage des utilisateurs:', error.message);
    }
  }

  // Méthodes pour gérer les téléchargements CV
  addCVDownload(ip?: string): any {
    try {
      const today = new Date().toDateString();

      if (!this.stats.cvDownloads) {
        this.stats.cvDownloads = {};
      }

      if (!this.stats.cvDownloads[today]) {
        this.stats.cvDownloads[today] = 0;
      }

      this.stats.cvDownloads[today]++;
      this.stats.totalCVDownloads = (this.stats.totalCVDownloads || 0) + 1;

      this.saveStats();

      console.log(`✅ CV téléchargé - Serveur centralisé: ${this.stats.cvDownloads[today]} aujourd'hui, ${this.stats.totalCVDownloads} total`);

      return {
        cvDownloads: this.stats.cvDownloads,
        totalCVDownloads: this.stats.totalCVDownloads,
        todayDownloads: this.stats.cvDownloads[today]
      };
    } catch (error) {
      console.error('Erreur lors de l\'ajout téléchargement CV:', error.message);
      return this.getCVDownloadStats();
    }
  }

  getCVDownloadStats(): any {
    return {
      cvDownloads: this.stats.cvDownloads || {},
      totalCVDownloads: this.stats.totalCVDownloads || 0,
      todayDownloads: this.stats.cvDownloads?.[new Date().toDateString()] || 0
    };
  }

  syncCVDownloadsWithClient(clientDownloads: { [date: string]: number }): any {
    try {
      // Fusionner les données client avec serveur (serveur = autorité)
      if (!this.stats.cvDownloads) {
        this.stats.cvDownloads = {};
      }

      let hasChanges = false;

      // Ajouter nouvelles données du client qui ne sont pas sur serveur
      for (const [date, count] of Object.entries(clientDownloads)) {
        if (!this.stats.cvDownloads[date] || this.stats.cvDownloads[date] < count) {
          this.stats.cvDownloads[date] = count;
          hasChanges = true;
        }
      }

      // Recalculer le total
      this.stats.totalCVDownloads = Object.values(this.stats.cvDownloads)
        .reduce((sum, count) => sum + count, 0);

      if (hasChanges) {
        this.saveStats();
        console.log(`🔄 Téléchargements CV synchronisés: ${this.stats.totalCVDownloads} total`);
      }

      return this.getCVDownloadStats();
    } catch (error) {
      console.error('Erreur lors de la synchronisation téléchargements:', error.message);
      return this.getCVDownloadStats();
    }
  }

  // Nouvelle méthode pour récupérer l'historique serveur
  getVisitHistory(): any[] {
    return this.stats.visitHistory || [];
  }

  // Méthode pour nettoyer manuellement l'historique serveur  
  cleanServerHistory(): number {
    if (!this.stats.visitHistory) return 0;

    const dailyIPs = new Map<string, Set<string>>();
    const cleanedHistory: any[] = [];
    let duplicatesRemoved = 0;

    // Trier par timestamp
    this.stats.visitHistory.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    this.stats.visitHistory.forEach(visit => {
      const date = new Date(visit.timestamp).toDateString();
      const ip = visit.ip;

      if (!dailyIPs.has(date)) {
        dailyIPs.set(date, new Set());
      }

      const dailyIPSet = dailyIPs.get(date)!;
      if (!dailyIPSet.has(ip)) {
        dailyIPSet.add(ip);
        cleanedHistory.push(visit);
      } else {
        duplicatesRemoved++;
      }
    });

    this.stats.visitHistory = cleanedHistory;
    this.stats.totalVisitors = cleanedHistory.length;
    this.saveStats();

    console.log(`🧹 Historique serveur nettoyé: ${duplicatesRemoved} doublons supprimés, ${cleanedHistory.length} visites conservées`);
    return cleanedHistory.length;
  }

  private cleanup() {
    try {
      if (this.cleanupTimer) {
        clearInterval(this.cleanupTimer);
        this.cleanupTimer = null;
      }
      this.saveStats();
    } catch (error) {
      console.error('Erreur lors du nettoyage final:', error.message);
    }
  }
}

export const statsManager = new StatsManager();