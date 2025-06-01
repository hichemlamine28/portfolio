
import React from 'react';
import { Users, Clock, Calendar } from 'lucide-react';
import { useVisitorStats } from '@/hooks/useVisitorStats';

export default function VisitorCounter() {
  const { stats, isLoading } = useVisitorStats();

  if (isLoading || !stats) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <div className="animate-pulse">
          <div className="h-4 bg-white/20 rounded w-24 mb-2"></div>
          <div className="h-8 bg-white/20 rounded w-16"></div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-white">
      <div className="flex items-center space-x-2 mb-3">
        <Users className="h-5 w-5" />
        <h3 className="font-semibold text-sm">Statistiques du site</h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-90">Visiteurs totaux</span>
          <span className="font-bold text-lg">{stats.totalVisitors.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs opacity-75">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Dernière visite</span>
          </div>
          <span>{formatTime(stats.lastVisit)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-90">En ligne</span>
          <span className="font-bold text-lg text-green-400">{stats.currentConnected}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs opacity-75">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>Date:</span>
          </div>
          <span>{formatDate(stats.currentTime || new Date().toISOString())}</span>
        </div>
      </div>
    </div>
  );
}
