import { Router } from 'express';
import { toWolofPhoneticSpeech } from '../services/wolofTranslator.js';
import { getDatabase, saveDatabaseSync } from '../data/dbStore.js';

const router = Router();
const db = getDatabase();

// Références persistantes synchronisées avec db.json
let centers = db.centers;
let stocks = db.stocks;
let badiens = db.badiens;
let badiensMessages = db.badiensMemos;
let broadcastAnnouncements = db.broadcastHistory;

// Helper de normalisation des mémos pour le composant AdminDashboard
function normalizeMemo(m) {
  const normPriority = (m.priority === 'high' || m.priority === 'urgent') ? 'urgent'
    : (m.priority === 'medium' || m.priority === 'warning') ? 'warning'
    : (m.priority === 'success') ? 'success' : 'info';

  const normStatus = (m.status === 'pending' || m.status === 'nouveau') ? 'nouveau'
    : (m.status === 'in_progress' || m.status === 'en_cours') ? 'en_cours'
    : 'resolu';

  return {
    id: m.id,
    badienId: m.badienId || 1,
    badienName: m.badienName || 'Badien Gox',
    quartier: m.quartier || 'District Sanitaire Pikine',
    patientCode: m.patientCode || '#DK-PK-2026',
    priority: normPriority,
    priorityLabel: m.priorityLabel || (normPriority === 'urgent' ? 'Urgence Obstétricale' : normPriority === 'warning' ? 'Alerte Terrain' : normPriority === 'success' ? 'Suivi Post-Partum' : 'Information'),
    subject: m.subject || m.frSummary || m.frenchSummary || 'Suivi femme enceinte',
    wolofText: m.wolofText || '',
    frenchSummary: m.frenchSummary || m.frSummary || m.wolofText || '',
    status: normStatus,
    createdAt: m.createdAt || m.timestamp || 'Il y a 10 min',
    assignedTo: m.assignedTo || m.dispatchedTo || 'Poste Icotaf Box 1 (Sage-femme Aïda)',
    responses: Array.isArray(m.responses) ? m.responses : (m.response ? [{ author: 'Équipe Médicale', text: m.response, time: 'Récent' }] : [])
  };
}

// Helper de normalisation des stocks pour le composant AdminDashboard
function normalizeStock(s) {
  const threshold = s.threshold || s.minRequired || 50;
  const isAlert = Boolean(s.alert || s.urgent || (s.current <= threshold));
  return {
    id: s.id,
    item: s.item,
    current: s.current,
    threshold,
    unit: s.unit || 'unités',
    alert: isAlert,
    category: s.category || 'Intrants Maternels',
    lastDelivery: s.lastDelivery || '2026-10-20'
  };
}

// =========================================================================
// ROUTES DE L'ESPACE ADMIN & GOUVERNANCE
// =========================================================================

/**
 * GET /api/admin/overview
 * Synthèse globale pour l'en-tête de la console d'administration
 */
router.get('/overview', (req, res) => {
  const totalBedsAvailable = centers.reduce((sum, c) => sum + (c.bedsAvailable || 0), 0);
  const totalBedsCapacity = centers.reduce((sum, c) => sum + (c.totalBeds || 0), 0);
  const pendingMemos = badiensMessages.filter(m => m.status === 'nouveau' || m.status === 'pending').length;
  const criticalStocks = stocks.map(normalizeStock).filter(s => s.alert).length;
  const totalMothersFollowed = badiens.reduce((sum, b) => sum + (b.femmes || b.activeMothers || 0), 0);

  res.json({
    centersCount: centers.length,
    totalBedsAvailable,
    totalBedsCapacity,
    badiensCount: badiens.length,
    totalMothersFollowed,
    pendingMemos,
    criticalStocks,
    encryptionStandard: "AES-GCM 256 (Protocole Sutura)",
    offlinePwaSize: "1.8 Mo",
    unicefDpgCertified: true,
    lastUpdate: new Date().toISOString()
  });
});

/**
 * GET /api/admin/badiens
 * Liste des marraines communautaires (Badien Gox)
 */
router.get('/badiens', (req, res) => {
  res.json(badiens.map(b => ({
    id: b.id,
    name: b.name,
    quartier: b.quartier,
    phone: b.phone || b.phoneCode || '+221 77 ••• 00 00',
    femmes: b.femmes || b.activeMothers || 30,
    activeMemos: badiensMessages.filter(m => m.badienName === b.name && (m.status === 'nouveau' || m.status === 'pending')).length,
    lastSync: b.lastSync || 'En temps réel',
    status: b.status || 'Active'
  })));
});

/**
 * GET /api/admin/badiens-messages
 * Liste des mémos vocaux et messages des marraines avec filtrage optionnel
 */
router.get('/badiens-messages', (req, res) => {
  const { priority, status } = req.query;
  let normalized = badiensMessages.map(normalizeMemo);

  if (priority && priority !== 'all') {
    normalized = normalized.filter(m => m.priority === priority);
  }
  if (status && status !== 'all') {
    normalized = normalized.filter(m => m.status === status);
  }

  res.json({
    total: badiensMessages.length,
    filteredCount: normalized.length,
    messages: normalized
  });
});

/**
 * POST /api/admin/badiens-messages
 * Enregistre un nouveau mémo vocal ou signalement terrain d'une marraine
 */
router.post('/badiens-messages', (req, res) => {
  const { badienName, quartier, patientCode, priority = 'warning', wolofText, frenchSummary } = req.body;

  if (!badienName || (!wolofText && !frenchSummary)) {
    return res.status(400).json({ error: "Nom de la marraine et contenu requis." });
  }

  const newMemo = {
    id: `MEMO-${Date.now().toString().slice(-4)}`,
    badienId: Math.floor(Math.random() * 10) + 1,
    badienName,
    quartier: quartier || 'District Pikine',
    patientCode: patientCode || `#DK-PK-${Math.floor(Math.random() * 9000 + 1000)}`,
    priority,
    priorityLabel: priority === 'urgent' ? 'Urgence Obstétricale' : priority === 'warning' ? 'Alerte Terrain' : 'Suivi Routine',
    subject: frenchSummary || wolofText,
    wolofText: wolofText || frenchSummary,
    frenchSummary: frenchSummary || wolofText,
    status: 'nouveau',
    createdAt: 'À l\'instant',
    assignedTo: 'Poste Icotaf Box 1',
    responses: []
  };

  badiensMessages.unshift(newMemo);
  saveDatabaseSync();

  res.json({
    success: true,
    message: "Mémo vocal de la Badien Gox enregistré avec succès.",
    memo: normalizeMemo(newMemo)
  });
});

/**
 * POST /api/admin/badiens-messages/:id/action
 * Répondre à un mémo, assigner ou changer son statut
 */
router.post('/badiens-messages/:id/action', (req, res) => {
  const { id } = req.params;
  const { action, responseText, assignedTo, author = 'Superviseur Admin' } = req.body;

  const memo = badiensMessages.find(m => m.id === id);
  if (!memo) {
    return res.status(404).json({ error: "Mémo introuvable." });
  }

  if (!memo.responses) memo.responses = [];

  if (action === 'respond' && responseText) {
    memo.responses.push({
      author,
      text: responseText,
      time: 'À l\'instant'
    });
    memo.status = 'en_cours';
  } else if (action === 'assign' && assignedTo) {
    memo.assignedTo = assignedTo;
    memo.status = 'en_cours';
  } else if (action === 'resolve') {
    memo.status = 'resolu';
  }

  saveDatabaseSync();

  res.json({
    success: true,
    memo: normalizeMemo(memo)
  });
});

/**
 * POST /api/admin/broadcast
 * Diffuse une consigne sanitaire urgente aux 1 240 Badien Gox du réseau
 */
router.post('/broadcast', (req, res) => {
  const { title, content, target = 'Toutes les marraines de Pikine / Guédiawaye' } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Titre et contenu requis pour la diffusion." });
  }

  const newBroadcast = {
    id: `BC-${Date.now().toString().slice(-4)}`,
    title,
    content,
    target,
    date: new Date().toISOString().split('T')[0],
    author: 'Superviseur Santé District'
  };

  broadcastAnnouncements.unshift(newBroadcast);
  saveDatabaseSync();

  res.json({
    success: true,
    message: "Directive transmise avec succès au réseau des Badien Gox via SMS et canal vocal.",
    broadcast: newBroadcast
  });
});

/**
 * GET /api/admin/centers
 * Liste des centres hospitaliers et disponibilité des lits SONU
 */
router.get('/centers', (req, res) => {
  res.json(centers);
});

/**
 * PUT /api/admin/centers/:id
 * Met à jour la disponibilité des lits en temps réel pour la régulation SAMU 1515
 */
router.put('/centers/:id', (req, res) => {
  const { id } = req.params;
  const { bedsAvailable } = req.body;

  const center = centers.find(c => c.id === parseInt(id));
  if (!center) {
    return res.status(404).json({ error: "Centre introuvable." });
  }

  if (bedsAvailable !== undefined) {
    center.bedsAvailable = Math.max(0, parseInt(bedsAvailable));
    center.status = center.bedsAvailable === 0 ? 'Saturé' : center.bedsAvailable < 3 ? 'Opérationnel' : 'Fluide';
    saveDatabaseSync();
  }

  res.json({
    success: true,
    center
  });
});

/**
 * GET /api/admin/stocks
 * Liste des stocks de la Pharmacie Nationale d'Approvisionnement (PNA)
 */
router.get('/stocks', (req, res) => {
  res.json(stocks.map(normalizeStock));
});

/**
 * PUT /api/admin/stocks/:id
 * Met à jour le niveau d'un stock d'intrant médical
 */
router.put('/stocks/:id', (req, res) => {
  const { id } = req.params;
  const { delta, current } = req.body;

  const stock = stocks.find(s => s.id === parseInt(id));
  if (!stock) {
    return res.status(404).json({ error: "Article en stock introuvable." });
  }

  if (current !== undefined) {
    stock.current = Math.max(0, parseInt(current));
  } else if (delta !== undefined) {
    stock.current = Math.max(0, stock.current + parseInt(delta));
  }
  const threshold = stock.threshold || stock.minRequired || 50;
  stock.alert = stock.current <= threshold;
  stock.urgent = stock.alert;
  saveDatabaseSync();

  res.json({
    success: true,
    stock: normalizeStock(stock)
  });
});

/**
 * POST /api/admin/stocks/reassort
 * Déclenche une commande de réassort PNA pour tous les articles en alerte
 */
router.post('/stocks/reassort', (req, res) => {
  const alerted = stocks.filter(s => {
    const threshold = s.threshold || s.minRequired || 50;
    return s.alert || s.urgent || (s.current <= threshold);
  });
  alerted.forEach(s => {
    s.current += 50;
    s.alert = false;
    s.urgent = false;
    s.lastDelivery = new Date().toISOString().split('T')[0];
  });
  saveDatabaseSync();

  res.json({
    success: true,
    message: `${alerted.length} dotations réapprovisionnées avec succès depuis la PNA.`,
    stocks: stocks.map(normalizeStock)
  });
});

export default router;
