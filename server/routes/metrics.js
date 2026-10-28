import { Router } from 'express';
import { getDatabase, saveDatabaseSync } from '../data/dbStore.js';

const router = Router();
const db = getDatabase();

// Ensemble des identifiants anonymes uniques vus (zéro PII, hachés)
const uniqueAnonymousUsers = new Set();
for (let i = 1; i <= (db.metrics?.totalUsers || 48); i++) {
  uniqueAnonymousUsers.add(`anon_seed_${i}`);
}

let impactMetrics = db.metrics;
let liveActivityLog = db.liveActivityLog;

/**
 * GET /api/metrics
 * Retourne les indicateurs publics de santé UNICEF Femtech
 */
router.get('/', (req, res) => {
  res.json({
    ...impactMetrics,
    standard: "UNICEF Digital Public Goods (DPG)",
    compliance: "CDP Sénégal - 100% Anonymisé à la source (Zero PII)",
    uniqueAnonymousActive: uniqueAnonymousUsers.size
  });
});

/**
 * GET /api/metrics/live-activity
 * Retourne le flux anonymisé des actions pour l'Admin Dashboard
 */
router.get('/live-activity', (req, res) => {
  res.json({
    totalUniqueUsers: uniqueAnonymousUsers.size,
    recentActions: liveActivityLog.slice(0, 10),
    privacySafeguards: {
      accountRequired: false,
      ipLogged: false,
      cookiesUsed: false,
      piiStored: false,
      protocol: "Protocole Sutura (Confidentialité Absolue)"
    }
  });
});

/**
 * POST /api/metrics/track
 * Enregistre un événement fonctionnel anonyme
 */
router.post('/track', (req, res) => {
  const { eventType, anonymousId, lang = 'wo', label } = req.body;

  if (anonymousId) {
    uniqueAnonymousUsers.add(anonymousId);
    impactMetrics.totalUsers = uniqueAnonymousUsers.size;
  }

  let actionLabel = label || 'Action sur la plateforme';

  if (eventType === 'audio_listen') {
    impactMetrics.audioListens += 1;
    actionLabel = actionLabel || 'Écoute audio Wolof';
  } else if (eventType === 'pregnancy_calculation') {
    impactMetrics.calculationsDone += 1;
    actionLabel = actionLabel || 'Calcul CPN prénatale';
  } else if (eventType === 'emergency_red' || eventType === 'emergency_call') {
    impactMetrics.emergenciesHandled += 1;
    impactMetrics.triagesDone += 1;
    actionLabel = actionLabel || 'Alerte Urgence Médicale SAMU 1515';
  } else if (eventType === 'triage_eval' || eventType === 'triage_completed') {
    impactMetrics.triagesDone += 1;
    actionLabel = actionLabel || 'Évaluation Triage Signes de Danger';
  } else if (eventType === 'translation') {
    impactMetrics.translationsCount += 1;
    actionLabel = actionLabel || 'Traduction Wolof/Français';
  } else if (eventType === 'chatbot_inquiry') {
    actionLabel = actionLabel || 'Consultation Chatbot IA Sutura';
  }

  // Ajout au journal en direct (limité aux 15 plus récents)
  liveActivityLog.unshift({
    id: `act-${Date.now()}`,
    type: eventType,
    label: actionLabel,
    lang,
    time: 'À l\'instant',
    status: eventType.includes('emergency') ? 'Prioritaire' : 'Actif'
  });
  if (liveActivityLog.length > 15) {
    liveActivityLog.pop();
  }

  impactMetrics.lastUpdated = new Date().toISOString();
  saveDatabaseSync();

  res.json({
    success: true,
    eventType,
    totalUniqueUsers: uniqueAnonymousUsers.size,
    metrics: impactMetrics
  });
});

export default router;
