import React, { useEffect } from 'react';

interface CVDownloadTrackerProps {
  onDownload?: () => void;
}

export default function CVDownloadTracker({ onDownload }: CVDownloadTrackerProps) {
  useEffect(() => {
    // Fonction centralisée pour enregistrer un téléchargement via le serveur
    const trackDownload = async () => {
      try {
        // 1. Enregistrer sur le serveur (source de vérité)
        const response = await fetch('/api/cv-download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          const serverStats = await response.json();
          console.log('✅ CV téléchargé - Serveur centralisé:', serverStats);

          // 2. Mettre à jour localStorage avec données serveur pour cohérence
          if (serverStats.cvDownloads) {
            localStorage.setItem('cv_downloads', JSON.stringify(serverStats.cvDownloads));
          }

          // 3. Synchronisation immédiate des analytics
          setTimeout(() => {
            if ((window as any).syncAnalytics) {
              console.log('🔄 Sync Analytics immédiate après téléchargement');
              (window as any).syncAnalytics();
            }
          }, 200);

        } else {
          console.error('Erreur serveur téléchargement CV');
          // Fallback localStorage en cas d'erreur serveur
          const today = new Date().toDateString();
          const downloads = JSON.parse(localStorage.getItem('cv_downloads') || '{}');
          downloads[today] = (downloads[today] || 0) + 1;
          localStorage.setItem('cv_downloads', JSON.stringify(downloads));
        }

      } catch (error) {
        console.error('Erreur lors du tracking téléchargement:', error);
        // Fallback localStorage
        const today = new Date().toDateString();
        const downloads = JSON.parse(localStorage.getItem('cv_downloads') || '{}');
        downloads[today] = (downloads[today] || 0) + 1;
        localStorage.setItem('cv_downloads', JSON.stringify(downloads));
      }

      // Callback optionnel
      if (onDownload) {
        onDownload();
      }
    };

    // Exposer la fonction globalement pour CVGenerator
    (window as any).trackCVDownload = trackDownload;

    return () => {
      delete (window as any).trackCVDownload;
    };
  }, [onDownload]);

  return null;
}

// Fonction helper pour obtenir les stats de téléchargement
export const getDownloadStats = () => {
  const downloads = JSON.parse(localStorage.getItem('cv_downloads') || '{}');
  const total = Object.values(downloads).reduce((sum: number, count) => sum + (count as number), 0);

  return {
    total,
    byDate: downloads,
    thisWeek: Object.entries(downloads)
      .filter(([date]) => {
        const downloadDate = new Date(date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return downloadDate >= weekAgo;
      })
      .reduce((sum, [, count]) => sum + (count as number), 0)
  };
};