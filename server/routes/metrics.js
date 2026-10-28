import { Router } from 'express';

const router = Router();

// Données mémoire initiales agrégées
let impactMetrics = {
  totalUsers: 48,
  audioListens: 93,
  triagesDone: 37,
  emergenciesHandled: 9,
  calculationsDone: 29,
  translationsCount: 14,
  lastUpdated: new Date().toISOString()
};

/**
 * GET /api/metrics
 * Retourne les indicateurs publics de santé UNICEF Femtech
 */
router.get('/', (req, res) => {
  res.json({
    ...impactMetrics,
    standard: "UNICEF Digital Public Goods (DPG)",
    compliance: "CDP Sénégal - 100% Anonymisé à la source"
  });
});

/**
 * POST /api/metrics/track
 * Enregistre un événement anonyme
 */
router.post('/track', (req, res) => {
  const { eventType } = req.body;

  if (eventType === 'audio_listen') impactMetrics.audioListens += 1;
  else if (eventType === 'pregnancy_calculation') {
    impactMetrics.calculationsDone += 1;
    impactMetrics.totalUsers += 1;
  } else if (eventType === 'emergency_red') {
    impactMetrics.emergenciesHandled += 1;
    impactMetrics.triagesDone += 1;
  } else if (eventType === 'triage_eval') {
    impactMetrics.triagesDone += 1;
  } else if (eventType === 'translation') {
    impactMetrics.translationsCount += 1;
  }

  impactMetrics.lastUpdated = new Date().toISOString();

  res.json({
    success: true,
    eventType,
    metrics: impactMetrics
  });
});

export default router;
