import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

// Données initiales si la base de données locale n'existe pas encore
const INITIAL_DATA = {
  centers: [
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
  ],
  stocks: [
    { id: 1, item: 'Fer + Acide Folique 60mg', category: 'Médicaments Essentiels', current: 450, minRequired: 500, unit: 'Boîtes (100 comp)', status: 'Stock Bas', urgent: true },
    { id: 2, item: 'Kits d\'Accouchement Stériles', category: 'Matériel Chirurgical', current: 18, minRequired: 40, unit: 'Kits Scellés', status: 'Rupture Imminente', urgent: true },
    { id: 3, item: 'Ocytocine 10 UI / Ampoule', category: 'Urgences Hémorragie', current: 120, minRequired: 80, unit: 'Ampoules Réfrigérées', status: 'Optimal', urgent: false },
    { id: 4, item: 'Sulfadoxine-Pyriméthamine (TPIg)', category: 'Prévention Paludisme', current: 310, minRequired: 200, unit: 'Doses CPN', status: 'Optimal', urgent: false },
    { id: 5, item: 'Bandelettes Protéinurie / Albuminurie', category: 'Dépistage Pré-éclampsie', current: 85, minRequired: 150, unit: 'Tests Rapides', status: 'Stock Bas', urgent: true }
  ],
  badiens: [
    { id: 1, name: 'Fatou Ndiaye', quartier: 'Tally Bou Mack (Pikine)', activeMothers: 42, phoneCode: '+221 77 ••• 14 02', status: 'Sur le terrain' },
    { id: 2, name: 'Awa Diop', quartier: 'Pikine Ouest / Marché Syndicat', activeMothers: 38, phoneCode: '+221 78 ••• 90 41', status: 'En relai CPN' },
    { id: 3, name: 'Mariama Sow', quartier: 'Icotaf 1 & 2', activeMothers: 51, phoneCode: '+221 76 ••• 33 88', status: 'Disponible' },
    { id: 4, name: 'Coumba Fall', quartier: 'Guinaw Rails Sud', activeMothers: 29, phoneCode: '+221 77 ••• 52 19', status: 'Accompagnement SAMU' }
  ],
  badiensMemos: [
    {
      id: 'MEMO-01',
      badienId: 1,
      badienName: 'Fatou Ndiaye',
      quartier: 'Tally Bou Mack',
      patientCode: '#DK-PK-2026-X89',
      category: 'emergency',
      priority: 'high',
      termSA: '34 SA',
      wolofText: 'Nanga def docteur. Soxna Aminata dafa am deret buy sotti te biir bi dafa dees lool. Lii du caaxaan dé, ambulance 1515 laa bëgg ñu yebal ko fi léegi.',
      phoneticText: 'Nanga def docteur. Sokhna Aminata dafa am déret bouy sotti té biir bi dafa déés lôle. Lii dou tchaakhane déé, ambulance 1515 laa beugg gnou yébal ko fi léégi.',
      frSummary: 'Métrorragies du 3ème trimestre (34 SA) avec contracture utérine. Demande urgente d\'envoi de l\'ambulance SAMU 1515.',
      timestamp: 'Il y a 14 min',
      status: 'pending',
      response: null,
      dispatchedTo: null
    },
    {
      id: 'MEMO-02',
      badienId: 2,
      badienName: 'Awa Diop',
      quartier: 'Pikine Ouest',
      patientCode: '#DK-PK-2026-B12',
      category: 'cpn_delay',
      priority: 'medium',
      termSA: '22 SA',
      wolofText: 'Salam docteur. Soxna si dafa yéexa dem CPN 2 ndax alal amul woon. Léegi duma ko mën a yóbbu Icotaf suba teel ci kër doktóor gi ?',
      phoneticText: 'Salam docteur. Sokhna si dafa yéékha dém CPN 2 ndakh alal amoul ouône. Léégi douma ko meun a yóbou Icotaf souba téél tchi keur doktóor gui ?',
      frSummary: 'Retard de consultation CPN 2 (22 SA) pour raison financière. Demande d\'admission prioritaire demain matin au poste de santé Pikine Icotaf.',
      timestamp: 'Il y a 32 min',
      status: 'in_progress',
      response: 'Rendez-vous réservé demain 08h30 avec Mme Aïda Diop. Billet d\'exonération sociale activé.',
      dispatchedTo: 'Poste de Santé Pikine Icotaf'
    },
    {
      id: 'MEMO-03',
      badienId: 3,
      badienName: 'Mariama Sow',
      quartier: 'Icotaf 1',
      patientCode: '#DK-PK-2026-C44',
      category: 'fer_stock',
      priority: 'normal',
      termSA: '18 SA',
      wolofText: 'Docteur, garabu féer bi ma joxoon soxna si jeex na te dafay xat lool ci yaram bi. Mën na ñëw jël beneen boite ?',
      phoneticText: 'Docteur, garabou féér bi ma djokhône sokhna si djéékh na té dafay khat lôle tchi yaram bi. Meun na gnew djël bénéén boite ?',
      frSummary: 'Renouvellement traitement Fer + Acide Folique 60mg. Patiente anémiée modérée, asthénie signalée.',
      timestamp: 'Il y a 1h 05',
      status: 'resolved',
      response: 'Boîte de fer disponible au dispensaire. Retrait sans frais sous présentation du code patient.',
      dispatchedTo: 'Dispensaire Pikine Icotaf'
    },
    {
      id: 'MEMO-04',
      badienId: 4,
      badienName: 'Coumba Fall',
      quartier: 'Guinaw Rails',
      patientCode: '#DK-PK-2026-P03',
      category: 'post_partum',
      priority: 'normal',
      termSA: 'J+12 Post-Partum',
      wolofText: 'Jàmm rekk docteur. Soxna Aïssatou liir bi mu jur am na jukki te dafay nàmp bu baax. Wànte moom dafa am xel mu jaaxle tiitange. Nafsa la am ?',
      phoneticText: 'Djamm rékk docteur. Sokhna Aïssatou liir bi mou djour am na djoukki té dafay namp bou baakh. Ouante mome dafa am khél mou djaakhle tiitangué. Nafsa la am ?',
      frSummary: 'Visite post-partum J+12. Nouveau-né sain et allaité. Anxiété maternelle marquée évoquant un baby-blues (Nafsa).',
      timestamp: 'Il y a 2h 20',
      status: 'resolved',
      response: 'Passage de l\'assistante sociale et soutien psychologique programmé cet après-midi.',
      dispatchedTo: 'Centre Dominique'
    }
  ],
  broadcastHistory: [
    {
      id: 'BC-01',
      title: 'Alerte Paludisme & TPIg CPN',
      message: 'Intensifier la sensibilisation à la prise de la Sulfadoxine-Pyriméthamine en CPN 2 et 3 suite aux pluies récentes.',
      author: 'Dr. Ousmane Kane (MCD)',
      timestamp: 'Hier à 16:30',
      recipientsCount: 1240
    }
  ],
  metrics: {
    totalUsers: 48,
    audioListens: 93,
    triagesDone: 37,
    emergenciesHandled: 9,
    calculationsDone: 29,
    translationsCount: 14,
    lastUpdated: new Date().toISOString()
  },
  liveActivityLog: [
    { id: 'act-1', type: 'pregnancy_calculation', label: 'Calculateur CPN (Terme estimé 14 SA)', lang: 'wo', time: 'Il y a 2 min', status: 'Complété' },
    { id: 'act-2', type: 'audio_listen', label: 'Écoute guidage audio Wolof (Moringa & Fer)', lang: 'wo', time: 'Il y a 5 min', status: 'Écouté 100%' },
    { id: 'act-3', type: 'chatbot_inquiry', label: 'Dialogue Chatbot IA (Question nausées du matin)', lang: 'wo', time: 'Il y a 9 min', status: 'Répondu' },
    { id: 'act-4', type: 'triage_eval', label: 'Triage Signes de Danger (Niveau Vert - Rassurant)', lang: 'fr', time: 'Il y a 14 min', status: 'Orienté' },
    { id: 'act-5', type: 'translation', label: 'Traduction Français ➔ Wolof (Phrases médicales)', lang: 'wo', time: 'Il y a 19 min', status: 'Traduit' },
    { id: 'act-6', type: 'emergency_red', label: 'Alerte Urgence Cutanée/Céphalée (Appel SAMU 1515)', lang: 'wo', time: 'Il y a 27 min', status: 'Prioritaire' }
  ]
};

// Chargement synchrone au démarrage avec sauvegarde de secours
let db = null;

function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      db = JSON.parse(raw);
    } else {
      db = JSON.parse(JSON.stringify(INITIAL_DATA));
      saveDatabaseSync();
    }
  } catch (err) {
    console.warn('[DB] Erreur lecture db.json, utilisation données mémoire:', err.message);
    db = JSON.parse(JSON.stringify(INITIAL_DATA));
  }
  return db;
}

export function getDatabase() {
  if (!db) {
    loadDatabase();
  }
  return db;
}

export function saveDatabaseSync() {
  if (!db) return;
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('[DB] Erreur écriture db.json:', err.message);
  }
}

// Initialise dès le chargement du module
loadDatabase();
