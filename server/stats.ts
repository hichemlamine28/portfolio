import fs from 'fs';
import path from 'path';

interface SiteStats {
  totalVisitors: number;
  lastVisit: string;
  createdAt: string;
  dailyIPs?: Set<string>;
  lastResetDate?: string;
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
    lastResetDate: new Date().toDateString()
  };

  private connectedUsers = new Map<string, number>();
  private readonly CLEANUP_INTERVAL = 30 * 1000; // 30 secondes
  private readonly USER_TIMEOUT = 2 * 60 * 1000; // 2 minutes
  private cleanupTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.loadStats();
    this.startCleanupTimer();

    // Graceful shutdown
    process.on('SIGTERM', () => this.cleanup());
    process.on('SIGINT', () => this.cleanup());
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
      const removedIPs: string[] = [];

      for (const [ip, lastSeen] of this.connectedUsers.entries()) {
        if (now - lastSeen > this.USER_TIMEOUT) {
          this.connectedUsers.delete(ip);
          removedCount++;
          removedIPs.push(ip.substring(0, 10) + '...'); // IP tronquée pour la sécurité
        }
      }

      // Log si des utilisateurs sont supprimés
      if (removedCount > 0) {
        console.log(`Nettoyé ${removedCount} utilisateur(s) inactif(s): [${removedIPs.join(', ')}]`);
        console.log(`Utilisateurs restants: ${this.connectedUsers.size}`);
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
          lastResetDate: parsedStats.lastResetDate || new Date().toDateString()
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
        dailyIPs: Array.from(this.stats.dailyIPs || [])
      };
      fs.writeFileSync('site-stats.json', JSON.stringify(statsToSave, null, 2));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des stats:', error.message);
    }
  }

  updateConnectedUser(ip: string) {
    try {
      if (!ip || ip === 'unknown') return;

      // Nettoyer l'IP et extraire la première partie
      const cleanIP = ip.split(',')[0].trim();
      
      // Mettre à jour uniquement le timestamp pour cette IP
      // Cela évite les doublons d'IP avec plusieurs onglets
      this.connectedUsers.set(cleanIP, Date.now());

      // Limiter le nombre d'IPs trackées pour éviter les fuites mémoire
      if (this.connectedUsers.size > 500) { // Réduit de 1000 à 500
        const oldestEntries = Array.from(this.connectedUsers.entries())
          .sort(([,a], [,b]) => a - b)
          .slice(0, 250); // Garder seulement les 250 plus récentes

        this.connectedUsers.clear();
        oldestEntries.forEach(([ip, time]) => {
          this.connectedUsers.set(ip, time);
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour utilisateur:', error.message);
    }
  }

  getCurrentConnected(): number {
    try {
      // Forcer le nettoyage à chaque appel pour plus de réactivité
      this.cleanupInactiveUsers();
      const count = this.connectedUsers.size;
      return Math.min(count, 50); // Limiter l'affichage à 50 max
    } catch (error) {
      console.error('Erreur lors du comptage:', error.message);
      return 0;
    }
  }

  incrementVisitors(ip?: string) {
    try {
      // Réinitialiser les IPs quotidiennes si on change de jour
      const today = new Date().toDateString();
      if (this.stats.lastResetDate !== today) {
        this.stats.dailyIPs = new Set<string>();
        this.stats.lastResetDate = today;
      }

      // Incrémenter seulement si l'IP n'a pas été vue aujourd'hui
      if (ip && !this.stats.dailyIPs.has(ip)) {
        this.stats.totalVisitors++;
        this.stats.dailyIPs.add(ip);
        this.stats.lastVisit = new Date().toISOString();
        this.saveStats();
      }
      
      return this.stats;
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation:', error.message);
      return this.stats;
    }
  }

  shouldCountVisitor(ip: string): boolean {
    try {
      // Réinitialiser les IPs quotidiennes si on change de jour
      const today = new Date().toDateString();
      if (this.stats.lastResetDate !== today) {
        this.stats.dailyIPs = new Set<string>();
        this.stats.lastResetDate = today;
      }

      return !this.stats.dailyIPs.has(ip);
    } catch (error) {
      console.error('Erreur lors de la vérification IP:', error.message);
      return false;
    }
  }

  getStats() {
    return { ...this.stats };
  }

  resetStats() {
    try {
      this.stats = {
        totalVisitors: 0,
        lastVisit: new Date().toISOString()
      };
      this.saveStats();
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error.message);
    }
  }

  clearConnectedUsers() {
    try {
      this.connectedUsers.clear();
    } catch (error) {
      console.error('Erreur lors du nettoyage des utilisateurs:', error.message);
    }
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