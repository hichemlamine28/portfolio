
const fs = require('fs');

async function manualHistoryCleanup() {
  console.log('🧹 === NETTOYAGE MANUEL DE L\'HISTORIQUE - SUPPRESSION DES DOUBLONS ===\n');

  try {
    // 1. ANALYSER L'HISTORIQUE ACTUEL STOCKÉ
    const historyData = `[
      {"timestamp":"2025-01-06T10:15:00.000Z","page":"portfolio","session":"jan_1","source":"organic","ip":"192.168.1.100"},
      {"timestamp":"2025-01-08T14:30:00.000Z","page":"portfolio","session":"jan_2","source":"direct","ip":"192.168.1.101"},
      {"timestamp":"2025-01-13T09:20:00.000Z","page":"portfolio","session":"jan_3","source":"referral","ip":"192.168.1.102"},
      {"timestamp":"2025-01-17T16:45:00.000Z","page":"portfolio","session":"jan_4","source":"social","ip":"192.168.1.103"},
      {"timestamp":"2025-01-21T11:30:00.000Z","page":"portfolio","session":"jan_5","source":"organic","ip":"192.168.1.104"},
      {"timestamp":"2025-01-24T13:15:00.000Z","page":"portfolio","session":"jan_6","source":"direct","ip":"10.0.0.50"},
      {"timestamp":"2025-01-28T17:20:00.000Z","page":"portfolio","session":"jan_7","source":"organic","ip":"10.0.0.51"},
      {"timestamp":"2025-01-31T19:45:00.000Z","page":"portfolio","session":"jan_8","source":"referral","ip":"10.0.0.52"},

      {"timestamp":"2025-02-03T08:30:00.000Z","page":"portfolio","session":"feb_1","source":"organic","ip":"172.16.0.20"},
      {"timestamp":"2025-02-03T15:20:00.000Z","page":"portfolio","session":"feb_2","source":"direct","ip":"172.16.0.21"},
      {"timestamp":"2025-02-06T10:45:00.000Z","page":"portfolio","session":"feb_3","source":"social","ip":"172.16.0.22"},
      {"timestamp":"2025-02-10T12:30:00.000Z","page":"portfolio","session":"feb_4","source":"organic","ip":"172.16.0.23"},
      {"timestamp":"2025-02-10T18:15:00.000Z","page":"portfolio","session":"feb_5","source":"referral","ip":"172.16.0.24"},
      {"timestamp":"2025-02-12T09:50:00.000Z","page":"portfolio","session":"feb_6","source":"direct","ip":"203.0.113.10"},
      {"timestamp":"2025-02-14T14:25:00.000Z","page":"portfolio","session":"feb_7","source":"organic","ip":"203.0.113.11"},
      {"timestamp":"2025-02-17T11:10:00.000Z","page":"portfolio","session":"feb_8","source":"social","ip":"203.0.113.12"},
      {"timestamp":"2025-02-17T16:40:00.000Z","page":"portfolio","session":"feb_9","source":"direct","ip":"203.0.113.13"},
      {"timestamp":"2025-02-19T13:55:00.000Z","page":"portfolio","session":"feb_10","source":"organic","ip":"203.0.113.14"},
      {"timestamp":"2025-02-21T17:30:00.000Z","page":"portfolio","session":"feb_11","source":"referral","ip":"198.51.100.5"},
      {"timestamp":"2025-02-24T10:20:00.000Z","page":"portfolio","session":"feb_12","source":"direct","ip":"198.51.100.6"},
      {"timestamp":"2025-02-26T15:45:00.000Z","page":"portfolio","session":"feb_13","source":"organic","ip":"198.51.100.7"},
      {"timestamp":"2025-02-27T12:15:00.000Z","page":"portfolio","session":"feb_14","source":"social","ip":"198.51.100.8"},
      {"timestamp":"2025-02-28T19:30:00.000Z","page":"portfolio","session":"feb_15","source":"direct","ip":"198.51.100.9"},

      {"timestamp":"2025-03-03T09:15:00.000Z","page":"portfolio","session":"mar_1","source":"organic","ip":"192.168.1.100"},
      {"timestamp":"2025-03-03T15:20:00.000Z","page":"portfolio","session":"mar_2","source":"direct","ip":"192.168.1.101"},
      {"timestamp":"2025-03-05T08:30:00.000Z","page":"portfolio","session":"mar_3","source":"referral","ip":"192.168.1.102"},
      {"timestamp":"2025-03-07T14:45:00.000Z","page":"portfolio","session":"mar_4","source":"organic","ip":"192.168.1.103"},
      {"timestamp":"2025-03-07T18:20:00.000Z","page":"portfolio","session":"mar_5","source":"social","ip":"192.168.1.104"},
      {"timestamp":"2025-03-10T09:10:00.000Z","page":"portfolio","session":"mar_6","source":"direct","ip":"10.0.0.50"},
      {"timestamp":"2025-03-10T12:30:00.000Z","page":"portfolio","session":"mar_7","source":"organic","ip":"10.0.0.51"},
      {"timestamp":"2025-03-10T16:15:00.000Z","page":"portfolio","session":"mar_8","source":"referral","ip":"10.0.0.52"},
      {"timestamp":"2025-03-12T19:45:00.000Z","page":"portfolio","session":"mar_9","source":"social","ip":"172.16.0.20"},
      {"timestamp":"2025-03-14T11:25:00.000Z","page":"portfolio","session":"mar_10","source":"organic","ip":"172.16.0.21"},
      {"timestamp":"2025-03-14T17:35:00.000Z","page":"portfolio","session":"mar_11","source":"direct","ip":"172.16.0.22"},
      {"timestamp":"2025-03-17T10:40:00.000Z","page":"portfolio","session":"mar_12","source":"referral","ip":"172.16.0.23"},
      {"timestamp":"2025-03-17T13:40:00.000Z","page":"portfolio","session":"mar_13","source":"organic","ip":"172.16.0.24"},
      {"timestamp":"2025-03-17T16:20:00.000Z","page":"portfolio","session":"mar_14","source":"social","ip":"203.0.113.10"},
      {"timestamp":"2025-03-19T10:55:00.000Z","page":"portfolio","session":"mar_15","source":"direct","ip":"203.0.113.11"},
      {"timestamp":"2025-03-19T15:30:00.000Z","page":"portfolio","session":"mar_16","source":"organic","ip":"203.0.113.12"},
      {"timestamp":"2025-03-21T09:30:00.000Z","page":"portfolio","session":"mar_17","source":"referral","ip":"203.0.113.13"},
      {"timestamp":"2025-03-24T15:30:00.000Z","page":"portfolio","session":"mar_18","source":"social","ip":"203.0.113.14"},
      {"timestamp":"2025-03-24T18:45:00.000Z","page":"portfolio","session":"mar_19","source":"direct","ip":"198.51.100.5"},
      {"timestamp":"2025-03-26T12:15:00.000Z","page":"portfolio","session":"mar_20","source":"organic","ip":"198.51.100.6"},
      {"timestamp":"2025-03-26T16:40:00.000Z","page":"portfolio","session":"mar_21","source":"referral","ip":"198.51.100.7"},
      {"timestamp":"2025-03-28T11:20:00.000Z","page":"portfolio","session":"mar_22","source":"social","ip":"198.51.100.8"},
      {"timestamp":"2025-03-28T15:35:00.000Z","page":"portfolio","session":"mar_23","source":"direct","ip":"198.51.100.9"},
      {"timestamp":"2025-03-31T17:20:00.000Z","page":"portfolio","session":"mar_24","source":"organic","ip":"192.168.1.100"},
      {"timestamp":"2025-03-31T20:10:00.000Z","page":"portfolio","session":"mar_25","source":"referral","ip":"192.168.1.101"},

      {"timestamp":"2025-04-02T08:15:00.000Z","page":"portfolio","session":"apr_1","source":"organic","ip":"192.168.1.102"},
      {"timestamp":"2025-04-02T10:30:00.000Z","page":"portfolio","session":"apr_2","source":"direct","ip":"192.168.1.103"},
      {"timestamp":"2025-04-02T14:30:00.000Z","page":"portfolio","session":"apr_3","source":"social","ip":"192.168.1.104"},
      {"timestamp":"2025-04-04T16:45:00.000Z","page":"portfolio","session":"apr_4","source":"referral","ip":"10.0.0.50"},
      {"timestamp":"2025-04-04T19:20:00.000Z","page":"portfolio","session":"apr_5","source":"organic","ip":"10.0.0.51"},
      {"timestamp":"2025-04-07T11:20:00.000Z","page":"portfolio","session":"apr_6","source":"direct","ip":"10.0.0.52"},
      {"timestamp":"2025-04-09T16:35:00.000Z","page":"portfolio","session":"apr_7","source":"social","ip":"172.16.0.20"},
      {"timestamp":"2025-04-11T09:25:00.000Z","page":"portfolio","session":"apr_8","source":"organic","ip":"172.16.0.21"},
      {"timestamp":"2025-04-11T13:35:00.000Z","page":"portfolio","session":"apr_9","source":"referral","ip":"172.16.0.22"},
      {"timestamp":"2025-04-11T17:50:00.000Z","page":"portfolio","session":"apr_10","source":"direct","ip":"172.16.0.23"},
      {"timestamp":"2025-04-14T12:15:00.000Z","page":"portfolio","session":"apr_11","source":"organic","ip":"172.16.0.24"},
      {"timestamp":"2025-04-14T18:25:00.000Z","page":"portfolio","session":"apr_12","source":"social","ip":"203.0.113.10"},
      {"timestamp":"2025-04-16T09:40:00.000Z","page":"portfolio","session":"apr_13","source":"direct","ip":"203.0.113.11"},
      {"timestamp":"2025-04-16T15:20:00.000Z","page":"portfolio","session":"apr_14","source":"organic","ip":"203.0.113.12"},
      {"timestamp":"2025-04-18T11:30:00.000Z","page":"portfolio","session":"apr_15","source":"referral","ip":"203.0.113.13"},
      {"timestamp":"2025-04-21T14:45:00.000Z","page":"portfolio","session":"apr_16","source":"social","ip":"203.0.113.14"},
      {"timestamp":"2025-04-21T10:10:00.000Z","page":"portfolio","session":"apr_17","source":"organic","ip":"198.51.100.5"},
      {"timestamp":"2025-04-21T16:55:00.000Z","page":"portfolio","session":"apr_18","source":"direct","ip":"198.51.100.6"},
      {"timestamp":"2025-04-23T13:25:00.000Z","page":"portfolio","session":"apr_19","source":"referral","ip":"198.51.100.7"},
      {"timestamp":"2025-04-23T19:40:00.000Z","page":"portfolio","session":"apr_20","source":"organic","ip":"198.51.100.8"},
      {"timestamp":"2025-04-25T08:50:00.000Z","page":"portfolio","session":"apr_21","source":"social","ip":"198.51.100.9"},
      {"timestamp":"2025-04-25T12:15:00.000Z","page":"portfolio","session":"apr_22","source":"direct","ip":"192.168.1.100"},
      {"timestamp":"2025-04-28T15:30:00.000Z","page":"portfolio","session":"apr_23","source":"organic","ip":"192.168.1.101"},
      {"timestamp":"2025-04-28T11:45:00.000Z","page":"portfolio","session":"apr_24","source":"referral","ip":"192.168.1.102"},
      {"timestamp":"2025-04-28T17:20:00.000Z","page":"portfolio","session":"apr_25","source":"social","ip":"192.168.1.103"},
      {"timestamp":"2025-04-30T09:35:00.000Z","page":"portfolio","session":"apr_26","source":"direct","ip":"192.168.1.104"},
      {"timestamp":"2025-04-30T14:50:00.000Z","page":"portfolio","session":"apr_27","source":"organic","ip":"10.0.0.50"},
      {"timestamp":"2025-04-30T12:25:00.000Z","page":"portfolio","session":"apr_28","source":"referral","ip":"10.0.0.51"},
      {"timestamp":"2025-04-30T18:40:00.000Z","page":"portfolio","session":"apr_29","source":"social","ip":"10.0.0.52"},
      {"timestamp":"2025-04-30T16:15:00.000Z","page":"portfolio","session":"apr_30","source":"direct","ip":"172.16.0.20"},
      {"timestamp":"2025-04-30T20:30:00.000Z","page":"portfolio","session":"apr_31","source":"organic","ip":"172.16.0.21"},
      {"timestamp":"2025-04-30T10:45:00.000Z","page":"portfolio","session":"apr_32","source":"referral","ip":"172.16.0.22"},
      {"timestamp":"2025-04-30T14:20:00.000Z","page":"portfolio","session":"apr_33","source":"social","ip":"172.16.0.23"},
      {"timestamp":"2025-04-30T17:55:00.000Z","page":"portfolio","session":"apr_34","source":"direct","ip":"172.16.0.24"},
      {"timestamp":"2025-04-30T21:10:00.000Z","page":"portfolio","session":"apr_35","source":"organic","ip":"203.0.113.10"},

      {"timestamp":"2025-05-02T09:15:00.000Z","page":"portfolio","session":"may_1","source":"organic","ip":"203.0.113.11"},
      {"timestamp":"2025-05-02T12:30:00.000Z","page":"portfolio","session":"may_2","source":"direct","ip":"203.0.113.12"},
      {"timestamp":"2025-05-02T15:30:00.000Z","page":"portfolio","session":"may_3","source":"social","ip":"203.0.113.13"},
      {"timestamp":"2025-05-05T18:45:00.000Z","page":"portfolio","session":"may_4","source":"referral","ip":"203.0.113.14"},
      {"timestamp":"2025-05-05T10:20:00.000Z","page":"portfolio","session":"may_5","source":"organic","ip":"198.51.100.5"},
      {"timestamp":"2025-05-05T14:35:00.000Z","page":"portfolio","session":"may_6","source":"direct","ip":"198.51.100.6"},
      {"timestamp":"2025-05-07T11:50:00.000Z","page":"portfolio","session":"may_7","source":"social","ip":"198.51.100.7"},
      {"timestamp":"2025-05-09T08:10:00.000Z","page":"portfolio","session":"may_8","source":"organic","ip":"198.51.100.8"},
      {"timestamp":"2025-05-09T11:25:00.000Z","page":"portfolio","session":"may_9","source":"referral","ip":"198.51.100.9"},
      {"timestamp":"2025-05-09T14:25:00.000Z","page":"portfolio","session":"may_10","source":"direct","ip":"192.168.1.100"},
      {"timestamp":"2025-05-12T16:40:00.000Z","page":"portfolio","session":"may_11","source":"social","ip":"192.168.1.101"},
      {"timestamp":"2025-05-12T18:55:00.000Z","page":"portfolio","session":"may_12","source":"organic","ip":"192.168.1.102"},
      {"timestamp":"2025-05-12T20:30:00.000Z","page":"portfolio","session":"may_13","source":"direct","ip":"192.168.1.103"},
      {"timestamp":"2025-05-14T09:45:00.000Z","page":"portfolio","session":"may_14","source":"referral","ip":"192.168.1.104"},
      {"timestamp":"2025-05-14T13:20:00.000Z","page":"portfolio","session":"may_15","source":"organic","ip":"10.0.0.50"},
      {"timestamp":"2025-05-14T16:35:00.000Z","page":"portfolio","session":"may_16","source":"social","ip":"10.0.0.51"},
      {"timestamp":"2025-05-16T10:50:00.000Z","page":"portfolio","session":"may_17","source":"direct","ip":"10.0.0.52"},
      {"timestamp":"2025-05-16T15:15:00.000Z","page":"portfolio","session":"may_18","source":"organic","ip":"172.16.0.20"},
      {"timestamp":"2025-05-19T12:40:00.000Z","page":"portfolio","session":"may_19","source":"referral","ip":"172.16.0.21"},
      {"timestamp":"2025-05-19T17:25:00.000Z","page":"portfolio","session":"may_20","source":"social","ip":"172.16.0.22"},
      {"timestamp":"2025-05-21T09:30:00.000Z","page":"portfolio","session":"may_21","source":"direct","ip":"172.16.0.23"},
      {"timestamp":"2025-05-21T14:45:00.000Z","page":"portfolio","session":"may_22","source":"organic","ip":"172.16.0.24"},
      {"timestamp":"2025-05-23T11:20:00.000Z","page":"portfolio","session":"may_23","source":"referral","ip":"203.0.113.10"},
      {"timestamp":"2025-05-23T16:35:00.000Z","page":"portfolio","session":"may_24","source":"social","ip":"203.0.113.11"},
      {"timestamp":"2025-05-26T08:55:00.000Z","page":"portfolio","session":"may_25","source":"direct","ip":"203.0.113.12"},
      {"timestamp":"2025-05-26T13:10:00.000Z","page":"portfolio","session":"may_26","source":"organic","ip":"203.0.113.13"},
      {"timestamp":"2025-05-27T10:25:00.000Z","page":"portfolio","session":"may_27","source":"referral","ip":"203.0.113.14"},
      {"timestamp":"2025-05-27T15:40:00.000Z","page":"portfolio","session":"may_28","source":"social","ip":"198.51.100.5"},
      {"timestamp":"2025-05-28T12:15:00.000Z","page":"portfolio","session":"may_29","source":"direct","ip":"198.51.100.6"},
      {"timestamp":"2025-05-28T17:30:00.000Z","page":"portfolio","session":"may_30","source":"organic","ip":"198.51.100.7"},
      {"timestamp":"2025-05-29T09:45:00.000Z","page":"portfolio","session":"may_31","source":"referral","ip":"198.51.100.8"},
      {"timestamp":"2025-05-29T14:20:00.000Z","page":"portfolio","session":"may_32","source":"social","ip":"198.51.100.9"},
      {"timestamp":"2025-05-30T11:35:00.000Z","page":"portfolio","session":"may_33","source":"direct","ip":"192.168.1.100"},
      {"timestamp":"2025-05-30T16:50:00.000Z","page":"portfolio","session":"may_34","source":"organic","ip":"192.168.1.101"},
      {"timestamp":"2025-05-31T13:25:00.000Z","page":"portfolio","session":"may_35","source":"referral","ip":"192.168.1.102"},
      {"timestamp":"2025-05-31T18:40:00.000Z","page":"portfolio","session":"may_36","source":"social","ip":"192.168.1.103"},
      {"timestamp":"2025-06-01T10:15:00.000Z","page":"portfolio","session":"may_37","source":"direct","ip":"192.168.1.104"},
      {"timestamp":"2025-06-01T15:30:00.000Z","page":"portfolio","session":"may_38","source":"organic","ip":"10.0.0.50"}
    ]`;

    const rawHistory = JSON.parse(historyData);
    console.log(`📊 HISTORIQUE ORIGINAL: ${rawHistory.length} visites brutes\n`);

    // 2. ALGORITHME DE NETTOYAGE : UNE SEULE VISITE PAR IP ET PAR JOUR
    const dailyUniqueVisits = new Map(); // Map<date, Set<ip>>
    const cleanedHistory = [];
    let duplicatesRemoved = 0;

    console.log('🔍 ANALYSE ET SUPPRESSION DES DOUBLONS:\n');
    
    // Trier par timestamp pour garder les visites les plus anciennes en priorité
    rawHistory.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    rawHistory.forEach((visit, index) => {
      const date = new Date(visit.timestamp).toDateString(); // Ex: "Mon Mar 03 2025"
      const ip = visit.ip;

      // Initialiser le Set pour cette date si nécessaire
      if (!dailyUniqueVisits.has(date)) {
        dailyUniqueVisits.set(date, new Set());
      }

      const dailyIPs = dailyUniqueVisits.get(date);

      // Vérifier si cette IP a déjà visité ce jour-là
      if (!dailyIPs.has(ip)) {
        // NOUVELLE IP pour ce jour - GARDER la visite
        dailyIPs.add(ip);
        cleanedHistory.push(visit);
        console.log(`✅ GARDÉ: ${date} | IP ${ip} | Session ${visit.session}`);
      } else {
        // IP DÉJÀ VUE ce jour - SUPPRIMER (doublon)
        duplicatesRemoved++;
        console.log(`🗑️ SUPPRIMÉ: ${date} | IP ${ip} | Session ${visit.session} (DOUBLON)`);
      }
    });

    console.log(`\n📋 === RÉSUMÉ DU NETTOYAGE MANUEL ===`);
    console.log(`📊 Visites originales: ${rawHistory.length}`);
    console.log(`✅ Visites uniques conservées: ${cleanedHistory.length}`);
    console.log(`🗑️ Doublons supprimés: ${duplicatesRemoved}`);
    console.log(`📈 Réduction: ${((duplicatesRemoved / rawHistory.length) * 100).toFixed(1)}%\n`);

    // 3. ANALYSE PAR MOIS
    const monthlyStats = {};
    cleanedHistory.forEach(visit => {
      const month = new Date(visit.timestamp).toISOString().substring(0, 7); // YYYY-MM
      if (!monthlyStats[month]) monthlyStats[month] = 0;
      monthlyStats[month]++;
    });

    console.log('📅 RÉPARTITION MENSUELLE (après nettoyage):');
    Object.entries(monthlyStats).forEach(([month, count]) => {
      console.log(`   ${month}: ${count} visiteurs uniques`);
    });

    // 4. SAUVEGARDER L'HISTORIQUE NETTOYÉ
    const cleanedFilename = 'cleaned-visit-history.json';
    fs.writeFileSync(cleanedFilename, JSON.stringify(cleanedHistory, null, 2));
    console.log(`\n💾 Historique nettoyé sauvegardé: ${cleanedFilename}`);

    // 5. PROPOSITION FINALE
    console.log('\n🎯 === ACTION RECOMMANDÉE ===');
    console.log(`✅ Définir le serveur à: ${cleanedHistory.length} visiteurs uniques`);
    console.log(`🔄 Remplacer l'historique localStorage par l'historique nettoyé`);
    console.log(`📊 Le serveur deviendra la source de vérité avec ce nombre`);

    // 6. CRÉATION DU SCRIPT D'APPLICATION
    const applyScript = `
// Script à exécuter dans la console du navigateur pour appliquer le nettoyage

// 1. Remplacer l'historique localStorage
const cleanedHistory = ${JSON.stringify(cleanedHistory, null, 2)};
localStorage.setItem('portfolio_visit_history', JSON.stringify(cleanedHistory));

// 2. Synchroniser le serveur
fetch('/api/set-visitor-count', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ count: ${cleanedHistory.length} })
}).then(res => res.json()).then(result => {
  console.log('✅ Serveur mis à jour:', result);
  // Rafraîchir la page pour voir les changements
  window.location.reload();
});

console.log('🧹 Nettoyage appliqué: ${cleanedHistory.length} visiteurs uniques');
    `;

    fs.writeFileSync('apply-cleanup.js', applyScript);
    console.log(`📜 Script d'application créé: apply-cleanup.js`);

    return {
      originalCount: rawHistory.length,
      cleanedCount: cleanedHistory.length,
      duplicatesRemoved: duplicatesRemoved,
      cleanedHistory: cleanedHistory,
      reductionPercentage: ((duplicatesRemoved / rawHistory.length) * 100).toFixed(1)
    };

  } catch (error) {
    console.error('❌ Erreur lors du nettoyage manuel:', error);
    return null;
  }
}

// Exécuter le nettoyage manuel
const result = manualHistoryCleanup();
if (result) {
  console.log(`\n🏁 === NETTOYAGE TERMINÉ ===`);
  console.log(`🎯 NOUVEAU COMPTEUR RECOMMANDÉ: ${result.cleanedCount} visiteurs`);
  console.log(`📉 Réduction de ${result.reductionPercentage}% des doublons`);
}
