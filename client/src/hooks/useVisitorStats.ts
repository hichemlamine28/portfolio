
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useCallback } from "react";

export function useVisitorStats() {
  const hasIncrementedRef = useRef(false);
  const isInitializedRef = useRef(false);
  const sessionIdRef = useRef<string | null>(null);

  // Générer un ID de session unique pour ce navigateur/onglet
  const getSessionId = useCallback(() => {
    if (!sessionIdRef.current) {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2);
      const tabId = Math.random().toString(36).substring(2, 8);
      sessionIdRef.current = `session_${timestamp}_${random}_${tabId}`;
    }
    return sessionIdRef.current;
  }, []);

  // Fonction pour incrémenter les visiteurs avec fingerprint
  const incrementVisitor = useCallback(async () => {
    // Protection simplifiée : seulement session storage pour ce navigateur
    const hasVisited = sessionStorage.getItem('portfolio_visited');
    const today = new Date().toDateString();
    const lastVisitDate = sessionStorage.getItem('portfolio_last_visit_date');

    // Protection locale uniquement (par navigateur/session)
    if (hasVisited && lastVisitDate === today) {
      console.log('🚫 Visite déjà comptée sur ce navigateur aujourd\'hui');
      return;
    }

    // Si nouvelle session OU nouveau jour, laisser le serveur décider
    if (hasIncrementedRef.current) {
      console.log('🚫 Visite déjà tentée dans cette session');
      return;
    }

    try {
      // Générer le fingerprint pour la visite initiale
      const { generateFingerprint } = await import('../lib/fingerprint');
      const fingerprint = await generateFingerprint();

      await fetch("/api/visit", { 
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'X-Session-Id': getSessionId(),
          'X-Fingerprint': fingerprint
        }
      });
      
      // Marquer comme visité pour ce navigateur/session
      hasIncrementedRef.current = true;
      sessionStorage.setItem('portfolio_visited', 'true');
      sessionStorage.setItem('portfolio_last_visit_date', today);
      console.log('✅ Appel /api/visit envoyé avec fingerprint - Serveur décidera de compter ou non');
    } catch (error) {
      console.warn("Erreur lors de l'incrémentation des visiteurs:", error);
    }
  }, [getSessionId]);

  // Fonction pour envoyer le heartbeat AVEC fingerprint
  const sendHeartbeat = useCallback(async () => {
    try {
      // Générer le fingerprint pour chaque heartbeat
      const { generateFingerprint } = await import('../lib/fingerprint');
      const fingerprint = await generateFingerprint();

      const response = await fetch("/api/heartbeat", { 
        method: "POST",
        headers: { 
          'X-Session-Id': getSessionId(),
          'X-Fingerprint': fingerprint  // ESSENTIEL : envoyer le fingerprint
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`💓 Heartbeat OK avec fingerprint - session maintenue | Serveur voit: ${data.connected} connectés`);
      }
    } catch (error) {
      console.warn("Erreur heartbeat:", error);
    }
  }, [getSessionId]);

  // Initialisation une seule fois
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      incrementVisitor();

      // Heartbeat avec fingerprint pour comptage précis des sessions
      const heartbeatInterval = setInterval(async () => {
        await sendHeartbeat();
      }, 3000); // Heartbeat toutes les 3 secondes

      return () => clearInterval(heartbeatInterval);
    }
  }, [incrementVisitor, sendHeartbeat]);

  // Query pour récupérer les stats
  const { data: stats, isError } = useQuery({
    queryKey: ["visitor-stats"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/stats", {
          headers: { 'X-Session-Id': getSessionId() }
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.warn("Erreur lors de la récupération des stats:", error);
        // Retourner des valeurs par défaut
        return {
          totalVisitors: 0,
          currentConnected: 0,
          lastVisit: new Date().toISOString(),
          currentTime: new Date().toISOString()
        };
      }
    },
    refetchInterval: 1000, // 1 seconde pour mise à jour temps réel
    retry: 2,
    retryDelay: 500,
    staleTime: 1000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    throwOnError: false, // Important pour éviter les crashes React
  });

  return {
    stats: stats || { 
      totalVisitors: 0, 
      currentConnected: 0, 
      lastVisit: new Date().toISOString(), 
      currentTime: new Date().toISOString() 
    },
    isError,
    isLoading: false // Pour compatibilité
  };
}
