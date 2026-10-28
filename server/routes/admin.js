import { Router } from 'express';
import { toWolofPhoneticSpeech } from '../services/wolofTranslator.js';

const router = Router();

// =========================================================================
// DONNÉES EN MÉMOIRE : STRUCTURES SANITAIRES & LITS SONU
// =========================================================================
let centers = [
  {
    id: 1,
    name: 'Poste de Santé Pikine Icotaf',
    district: 'Pikine Est',
    type: 'Dispensaire Primaire',
    bedsAvailable: 4,
    totalBeds: 6,
    sonuLevel: 'SONUB',
    status: 'Opérationnel',
    contact: '+221 33 834 10 01',
    responsible: 'Mme Aïda Diop (Sage-femme Maîtresse)'
  },
  {
    id: 2,
    name: 'Centre de Santé Dominique',
    district: 'Pikine Centre',
    type: 'Centre de Référence',
    bedsAvailable: 2,
    totalBeds: 8,
    sonuLevel: 'SONUB Avancé',
    status: 'Opérationnel',
    contact: '+221 33 834 22 15',
    responsible: 'Dr. Ousmane Kane (Médecin Chef de District)'
  },
  {
    id: 3,
    name: 'Hôpital National Dalal Jamm',
    district: 'Guédiawaye',
    type: 'Centre Hospitalier Universitaire',
    bedsAvailable: 3,
    totalBeds: 12,
    sonuLevel: 'SONUC Réa',
    status: 'Fluide',
    contact: '+221 33 859 88 00',
    responsible: 'Pr. Babacar Wade (Gynécologue Obstétricien)'
  },
  {
    id: 4,
    name: 'Hôpital National de Pikine',
    district: 'Camp Militaire',
    type: 'Centre Hospitalier Régional',
    bedsAvailable: 0,
    totalBeds: 10,
    sonuLevel: 'SONUC',
    status: 'Saturé',
    contact: '+221 33 834 40 40',
    responsible: 'Dr. Marième Sarr (Chef Maternité)'
  }
];

// =========================================================================
// DONNÉES EN MÉMOIRE : STOCKS PNA & INTRANTS MATERNELS
// =========================================================================
let stocks = [
  {
    id: 1,
    item: 'Fer + Acide Folique 60mg (Plaquettes 30cp)',
    current: 22,
    threshold: 50,
    unit: 'boîtes',
    alert: true,
    category: 'Anémie & CPN',
    lastDelivery: '2026-10-12'
  },
  {
    id: 2,
    item: 'Bandelettes Urinaires Albuminurie / Protéinurie',
    current: 180,
    threshold: 100,
    unit: 'tests',
    alert: false,
    category: 'Dépistage Pré-éclampsie',
    lastDelivery: '2026-10-20'
  },
  {
    id: 3,
    item: 'Kits d\'Accouchement d\'Urgence Stériles',
    current: 14,
    threshold: 20,
    unit: 'kits',
    alert: true,
    category: 'Maternité Sécurisée',
    lastDelivery: '2026-10-05'
  },
  {
    id: 4,
    item: 'Sulfate de Magnésium (MgSO4) Ampoules IV',
    current: 36,
    threshold: 25,
    unit: 'ampoules',
    alert: false,
    category: 'Anticonvulsivant Éclampsie',
    lastDelivery: '2026-10-18'
  }
];

// =========================================================================
// DONNÉES EN MÉMOIRE : MARRAINES (BADIEN GOX) & MÉMOS VOCAUX TERRAIN
// =========================================================================
let badiens = [
  {
    id: 1,
    name: 'Fatou Ndiaye',
    quartier: 'Tally Bou Mack',
    phone: '+221 77 512 34 56',
    femmes: 42,
    activeMemos: 2,
    lastSync: 'Il y a 4 min',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Khadija Diop',
    quartier: 'Pikine Ouest',
    phone: '+221 78 220 11 89',
    femmes: 38,
    activeMemos: 1,
    lastSync: 'Il y a 12 min',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Aminata Sow',
    quartier: 'Icotaf 1 & 2',
    phone: '+221 76 645 88 12',
    femmes: 51,
    activeMemos: 2,
    lastSync: 'Il y a 20 min',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Seynabou Sène',
    quartier: 'Marché Syndicat',
    phone: '+221 70 891 04 33',
    femmes: 29,
    activeMemos: 0,
    lastSync: 'Il y a 35 min',
    status: 'Active'
  }
];

// Messages & Mémos Vocaux des Marraines
let badiensMessages = [
  {
    id: 'MEMO-01',
    badienId: 1,
    badienName: 'Fatou Ndiaye',
    quartier: 'Tally Bou Mack',
    patientCode: '#DK-PK-0842 (Coumba)',
    priority: 'urgent',
    priorityLabel: 'Urgence Obstétricale',
    subject: 'Mère 28 SA : Maux de tête violents et tension mesurée à 14/9',
    wolofText: "Asalaam alaykum sage-femme bi. Soxna Coumba ci Tally Bou Mack boppam dafay metti bu tar, tank yi dañuy gémb. Tension bi ma natt tollu na ci 14/9. Dafa laaj ñu gaaw ko xool ci dispensaire bi.",
    frenchSummary: "Alerte pré-éclampsie : Céphalées violentes et œdèmes des membres inférieurs chez une mère à 28 SA. Tension artérielle constatée à 14/9 au domicile. Transfert prioritaire demandé.",
    status: 'nouveau', // 'nouveau' | 'en_cours' | 'resolu'
    createdAt: 'Il y a 18 min',
    assignedTo: 'Poste Icotaf Box 1 (Sage-femme Aïda)',
    responses: []
  },
  {
    id: 'MEMO-02',
    badienId: 3,
    badienName: 'Aminata Sow',
    quartier: 'Icotaf 1 & 2',
    patientCode: '#DK-PK-0851 (Mariama)',
    priority: 'warning',
    priorityLabel: 'Retard CPN 2',
    subject: 'Rattrapage CPN 2 : Mère à 22 SA sans échographie',
    wolofText: "Sage-femme bi, Mariama am na 22 ayu-bës, jàll na waxtu CPN 2 bi waaye ñëwuloon ndax feyuloon écho bi. Wax naa ko ne feyul dara, dina ñëw tay ci suba.",
    frenchSummary: "Mère primo-geste à 22 SA en retard pour sa CPN 2 par crainte du coût de l'échographie. Médiation Badien Gox réussie pour la rassurer sur la prise en charge. Arrivée prévue ce matin.",
    status: 'en_cours',
    createdAt: 'Il y a 42 min',
    assignedTo: 'Dispensaire CPN - File d\'attente',
    responses: [
      {
        author: 'Sage-femme Aïda',
        text: 'Bien reçu Badien Aminata. Dès son arrivée, nous faisons le bilan et le vaccin antitétanique.',
        time: 'Il y a 25 min'
      }
    ]
  },
  {
    id: 'MEMO-03',
    badienId: 2,
    badienName: 'Khadija Diop',
    quartier: 'Pikine Ouest',
    patientCode: '#DK-PK-0820 (Awa)',
    priority: 'info',
    priorityLabel: 'Rupture Fer Locale',
    subject: 'Besoin dotation Fer/Acide Folique pour 5 mères anémiques',
    wolofText: "Poste de santé bi, ñetti jigeen ñu ëmm ci sunu kër yi dañoo manqué doomi fer ak acide folique. Dafa laaj ñu jox ma paquet bu bees ma jottali leen ko.",
    frenchSummary: "Demande de dotation relais en plaquettes de Fer + Acide Folique pour 5 mères suivies à domicile dans le secteur Pikine Ouest.",
    status: 'nouveau',
    createdAt: 'Il y a 1h 10min',
    assignedTo: 'Pharmacie Dispensaire',
    responses: []
  },
  {
    id: 'MEMO-04',
    badienId: 1,
    badienName: 'Fatou Ndiaye',
    quartier: 'Tally Bou Mack',
    patientCode: '#DK-PK-0799 (Seynabou)',
    priority: 'success',
    priorityLabel: 'Suivi Post-Partum',
    subject: 'Accouchement réussi à domicile sans complication (Bébé 3,1 kg)',
    wolofText: "Alxamdoulilah ! Soxna Seynabou wàsin na ci jàmm, doom ji jigeen la te am 3,1 kg. Meew mu njëkk mi (colostrum) nàmpal na ko ci saa si. Dinañ ñëw ngir vaccin BCG suba.",
    frenchSummary: "Post-partum immédiat favorable à Tally Bou Mack. Nouveau-né sain de 3,1 kg mis au sein dans la première heure. Rendez-vous fixé pour la vaccination.",
    status: 'resolu',
    createdAt: 'Il y a 3h',
    assignedTo: 'Consultation Post-natale',
    responses: [
      {
        author: 'Dr. Ousmane Kane',
        text: 'Félicitations à la maman et merci pour le suivi rapide du colostrum !',
        time: 'Il y a 2h'
      }
    ]
  }
];

// Directives diffusées au réseau des marraines
let broadcastAnnouncements = [
  {
    id: 'BC-01',
    title: 'Campagne de distribution gratuite des Moustiquaires MILDA',
    target: 'Toutes les 1 240 Badien Gox de Pikine',
    content: 'Sensibilisation obligatoire auprès des femmes enceintes sur le sommeil quotidien sous moustiquaire imprégnée en cette période d\'hivernage.',
    date: '2026-10-25',
    author: 'Médecin Chef de District'
  }
];

// =========================================================================
// ROUTES DE L'ESPACE ADMIN & GOUVERNANCE
// =========================================================================

/**
 * GET /api/admin/overview
 * Synthèse globale pour l'en-tête de la console d'administration
 */
router.get('/overview', (req, res) => {
  const totalBedsAvailable = centers.reduce((sum, c) => sum + c.bedsAvailable, 0);
  const totalBedsCapacity = centers.reduce((sum, c) => sum + c.totalBeds, 0);
  const pendingMemos = badiensMessages.filter(m => m.status === 'nouveau').length;
  const criticalStocks = stocks.filter(s => s.alert).length;

  res.json({
    centersCount: centers.length,
    totalBedsAvailable,
    totalBedsCapacity,
    badiensCount: badiens.length,
    totalMothersFollowed: badiens.reduce((sum, b) => sum + b.femmes, 0),
    pendingMemos,
    criticalStocks,
    encryptionStandard: "AES-GCM 256 (Protocole Sutura)",
    offlinePwaSize: "1.8 Mo",
    unicefDpgCertified: true,
    lastUpdate: new Date().toISOString()
  });
});

/**
 * GET /api/admin/badiens-messages
 * Liste des mémos vocaux et messages des marraines avec filtrage optionnel
 */
router.get('/badiens-messages', (req, res) => {
  const { priority, status } = req.query;
  let filtered = [...badiensMessages];

  if (priority && priority !== 'all') {
    filtered = filtered.filter(m => m.priority === priority);
  }
  if (status && status !== 'all') {
    filtered = filtered.filter(m => m.status === status);
  }

  res.json({
    total: badiensMessages.length,
    filteredCount: filtered.length,
    messages: filtered
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
    wolofText: wolofText || frenchSummary,
    frenchSummary: frenchSummary || wolofText,
    status: 'nouveau',
    createdAt: 'À l\'instant',
    assignedTo: 'Poste Icotaf Box 1',
    responses: []
  };

  badiensMessages.unshift(newMemo);

  res.json({
    success: true,
    message: "Mémo vocal de la Badien Gox enregistré avec succès.",
    memo: newMemo
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
  } else if (action === 'reopen') {
    memo.status = 'en_cours';
  }

  res.json({
    success: true,
    memo
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
  res.json(stocks);
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
  stock.alert = stock.current <= stock.threshold;

  res.json({
    success: true,
    stock
  });
});

/**
 * POST /api/admin/stocks/reassort
 * Déclenche une commande de réassort PNA pour tous les articles en alerte
 */
router.post('/stocks/reassort', (req, res) => {
  const alerted = stocks.filter(s => s.alert);
  alerted.forEach(s => {
    s.current += 50; // Réapprovisionnement automatique
    s.alert = false;
    s.lastDelivery = new Date().toISOString().split('T')[0];
  });

  res.json({
    success: true,
    message: `${alerted.length} dotations réapprovisionnées avec succès depuis la PNA.`,
    stocks
  });
});

export default router;
