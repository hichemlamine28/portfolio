
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export function useVisitorStats() {
  const hasIncrementedRef = useRef(false);

  // Incrémenter le compteur une seule fois par session/IP
  useEffect(() => {
    const incrementVisitor = async () => {
      // Triple vérification pour éviter les doublons
      const hasVisited = sessionStorage.getItem('portfolio_visited');
      const timestampKey = 'portfolio_visit_timestamp';
      const lastVisit = sessionStorage.getItem(timestampKey);
      const now = Date.now();
      
      // Éviter les appels si déjà fait dans les 5 dernières minutes
      if (hasVisited || hasIncrementedRef.current || 
          (lastVisit && (now - parseInt(lastVisit)) < 5 * 60 * 1000)) {
        return;
      }
      
      try {
        await fetch("/api/visit", { 
          method: "POST",
          headers: { 'Content-Type': 'application/json' }
        });
        hasIncrementedRef.current = true;
        sessionStorage.setItem('portfolio_visited', 'true');
        sessionStorage.setItem(timestampKey, now.toString());
      } catch (error) {
        console.warn("Erreur lors de l'incrémentation des visiteurs:", error);
      }
    };

    // Délai pour éviter trop de requêtes simultanées au chargement
    const timer = setTimeout(incrementVisitor, 2000); // Augmenté à 2s
    return () => clearTimeout(timer);
  }, []);

  // Récupérer les stats avec un intervalle plus long et gestion d'erreurs
  const { data: stats, isError } = useQuery({
    queryKey: ["visitor-stats"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      } catch (error) {
        console.warn("Erreur lors de la récupération des stats:", error);
        // Retourner des valeurs par défaut en cas d'erreur
        return {
          totalVisitors: 0,
          currentConnected: 0,
          lastVisit: new Date().toISOString()
        };
      }
    },
    refetchInterval: 15000, // Réduire à 15 secondes pour plus de réactivité
    retry: 2,
    retryDelay: 3000,
    staleTime: 10000, // Considérer les données comme fraîches pendant 10s
  });

  return {
    stats: stats || { totalVisitors: 0, currentConnected: 0, lastVisit: new Date().toISOString() },
    isError
  };
}
