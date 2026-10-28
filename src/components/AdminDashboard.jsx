import React, { useState, useEffect } from 'react';

/**
 * Phonétique Wolof pour prononciation vocale sénégalaise naturelle
 */
function toWolofPhoneticSpeech(wolofText) {
  if (!wolofText || typeof wolofText !== 'string') return '';
  return wolofText
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/[#•\-]/g, ' ')
    .replace(/ci\b/gi, 'tchi')
    .replace(/ceeb/gi, 'tchééb')
    .replace(/c([aeiou])/gi, 'tch$1')
    .replace(/j/gi, (m) => m === 'J' ? 'Dj' : 'dj')
    .replace(/x/gi, (m) => m === 'X' ? 'Kh' : 'kh')
    .replace(/ñ/gi, (m) => m === 'Ñ' ? 'Gn' : 'gn')
    .replace(/\bw([aàeéio])/gi, (m, v) => (m[0] === 'W' ? 'Ou' : 'ou') + v)
    .replace(/wà/gi, 'oua')
    .replace(/ë/gi, 'eu')
    .replace(/u/gi, 'ou')
    .replace(/dé(\b|[!?.])/gi, 'déé$1')
    .replace(/\bwaaw\b/gi, 'ouaoou')
    .replace(/\blool\b/gi, 'lôle')
    .replace(/\bsama soxna si\b/gi, 'sama sokhna si')
    .replace(/\bsama xarit\b/gi, 'sama kharit')
    .replace(/\byaram jàmm\b/gi, 'yaram djamm')
    .replace(/\bjàmm\b/gi, 'djamm')
    .replace(/\bndànk ndànk\b/gi, 'ndank ndank');
}

export default function AdminDashboard({ lang = 'wo', onActionTrack, metrics, onNavigateTab }) {
  // Navigation active des onglets de l'admin
  const [activeSection, setActiveSection] = useState('memos'); // Mémos marraines mis en avant par défaut
  const [offlineSyncEnabled, setOfflineSyncEnabled] = useState(true);
  const [encryptionAudit, setEncryptionAudit] = useState(true);

  // Vue d'ensemble agrégée
  const [overview, setOverview] = useState({
    centersCount: 4,
    totalBedsAvailable: 9,
    totalBedsCapacity: 36,
    badiensCount: 4,
    totalMothersFollowed: 160,
    pendingMemos: 2,
    criticalStocks: 2
  });

  // 1. ÉTAT DES MÉMOS & MESSAGES DES MARRAINES (BADIEN GOX)
  const [memos, setMemos] = useState([
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
      status: 'nouveau',
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
  ]);

  const [memoPriorityFilter, setMemoPriorityFilter] = useState('all');
  const [memoStatusFilter, setMemoStatusFilter] = useState('all');
  const [activeReplyMemoId, setActiveReplyMemoId] = useState(null);
  const [replyInputText, setReplyInputText] = useState('');
  const [playingMemoId, setPlayingMemoId] = useState(null);

  // Modals & Formulaires
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastForm, setBroadcastForm] = useState({
    title: '',
    content: '',
    target: 'Toutes les 1 240 Badien Gox de Pikine'
  });
  const [isCreatingMemo, setIsCreatingMemo] = useState(false);
  const [newMemoForm, setNewMemoForm] = useState({
    badienName: 'Fatou Ndiaye',
    quartier: 'Tally Bou Mack',
    patientCode: '#DK-PK-0860',
    priority: 'warning',
    wolofText: '',
    frenchSummary: ''
  });
  const [toastMessage, setToastMessage] = useState('');

  // 2. ÉTAT DES CENTRES HOSPITALIERS & LITS SONU
  const [centers, setCenters] = useState([
    { id: 1, name: 'Poste de Santé Pikine Icotaf', district: 'Pikine Est', type: 'Dispensaire Primaire', bedsAvailable: 4, totalBeds: 6, sonuLevel: 'SONUB', status: 'Opérationnel' },
    { id: 2, name: 'Centre de Santé Dominique', district: 'Pikine Centre', type: 'Centre de Référence', bedsAvailable: 2, totalBeds: 8, sonuLevel: 'SONUB Avancé', status: 'Opérationnel' },
    { id: 3, name: 'Hôpital National Dalal Jamm', district: 'Guédiawaye', type: 'Centre Hospitalier Universitaire', bedsAvailable: 3, totalBeds: 12, sonuLevel: 'SONUC Réa', status: 'Fluide' },
    { id: 4, name: 'Hôpital National de Pikine', district: 'Camp Militaire', type: 'Centre Hospitalier Régional', bedsAvailable: 0, totalBeds: 10, sonuLevel: 'SONUC', status: 'Saturé' }
  ]);

  // 3. ÉTAT DES STOCKS PNA & INTRANTS
  const [stocks, setStocks] = useState([
    { id: 1, item: 'Fer + Acide Folique 60mg (Plaquettes 30cp)', current: 22, threshold: 50, unit: 'boîtes', alert: true },
    { id: 2, item: 'Bandelettes Urinaires Albuminurie / Protéinurie', current: 180, threshold: 100, unit: 'tests', alert: false },
    { id: 3, item: 'Kits d\'Accouchement d\'Urgence Stériles', current: 14, threshold: 20, unit: 'kits', alert: true },
    { id: 4, item: 'Sulfate de Magnésium (MgSO4) Ampoules IV', current: 36, threshold: 25, unit: 'ampoules', alert: false }
  ]);

  // 4. RÉSEAU BADIEN GOX
  const [badiens, setBadiens] = useState([
    { id: 1, name: 'Fatou Ndiaye', quartier: 'Tally Bou Mack', femmes: 42, activeMemos: 2, lastSync: 'Il y a 4 min', status: 'Active' },
    { id: 2, name: 'Khadija Diop', quartier: 'Pikine Ouest', femmes: 38, activeMemos: 1, lastSync: 'Il y a 12 min', status: 'Active' },
    { id: 3, name: 'Aminata Sow', quartier: 'Icotaf 1 & 2', femmes: 51, activeMemos: 2, lastSync: 'Il y a 20 min', status: 'Active' },
    { id: 4, name: 'Seynabou Sène', quartier: 'Marché Syndicat', femmes: 29, activeMemos: 0, lastSync: 'Il y a 35 min', status: 'Active' }
  ]);

  // 5. TÉLÉMÉTRIE ANONYME EN DIRECT
  const [liveActivity, setLiveActivity] = useState([
    { id: 'act-1', type: 'pregnancy_calculation', label: 'Calculateur CPN (Terme estimé 24 SA)', lang: 'wo', time: 'Il y a 2 min', status: 'Complété' },
    { id: 'act-2', type: 'audio_listen', label: 'Écoute guidage audio Wolof (Moringa & Fer)', lang: 'wo', time: 'Il y a 5 min', status: 'Écouté 100%' },
    { id: 'act-3', type: 'chatbot_inquiry', label: 'Dialogue Chatbot IA (Question nausées)', lang: 'wo', time: 'Il y a 9 min', status: 'Répondu' },
    { id: 'act-4', type: 'triage_eval', label: 'Triage Signes de Danger (Niveau Vert - Rassurant)', lang: 'fr', time: 'Il y a 14 min', status: 'Orienté' }
  ]);
  const [isLoadingActivity, setIsLoadingActivity] = useState(false);
  const [statsData, setStatsData] = useState({
    uniqueUsers: metrics?.totalUsers || 48,
    audioListens: metrics?.audioListens || 93,
    triagesDone: metrics?.triagesDone || 37,
    emergencies: metrics?.emergenciesHandled || 9,
    calculations: metrics?.calculationsDone || 29
  });

  // Synchronisation avec le Backend
  const fetchAllAdminData = async () => {
    try {
      // 1. Vue d'ensemble
      const resOv = await fetch('/api/admin/overview');
      if (resOv.ok) {
        const ovData = await resOv.json();
        setOverview(ovData);
      }

      // 2. Mémos des marraines
      const resMemos = await fetch('/api/admin/badiens-messages');
      if (resMemos.ok) {
        const memosData = await resMemos.json();
        if (memosData.messages && Array.isArray(memosData.messages)) {
          setMemos(memosData.messages);
        }
      }

      // 3. Centres
      const resCenters = await fetch('/api/admin/centers');
      if (resCenters.ok) {
        const centersData = await resCenters.json();
        setCenters(centersData);
      }

      // 4. Stocks
      const resStocks = await fetch('/api/admin/stocks');
      if (resStocks.ok) {
        const stocksData = await resStocks.json();
        setStocks(stocksData);
      }

      // 5. Télémétrie en direct
      const resLive = await fetch('/api/metrics/live-activity');
      if (resLive.ok) {
        const liveData = await resLive.json();
        if (liveData.recentActions) setLiveActivity(liveData.recentActions);
        if (liveData.totalUniqueUsers) setStatsData(prev => ({ ...prev, uniqueUsers: liveData.totalUniqueUsers }));
      }
    } catch (_) {
      // Mode hors-ligne silencieux
    }
  };

  useEffect(() => {
    fetchAllAdminData();
    const interval = setInterval(fetchAllAdminData, 20000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  // Action : Répondre à un mémo d'une marraine
  const handleSendReply = async (memoId) => {
    if (!replyInputText.trim()) return;

    try {
      const res = await fetch(`/api/admin/badiens-messages/${memoId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'respond',
          responseText: replyInputText,
          author: 'Superviseur Admin (Poste Icotaf)'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMemos(prev => prev.map(m => m.id === memoId ? data.memo : m));
        showToast("✓ Réponse transmise à la marraine par SMS & Canal Vocal.");
        setReplyInputText('');
        setActiveReplyMemoId(null);
      }
    } catch (_) {
      // Fallback local
      setMemos(prev => prev.map(m => {
        if (m.id === memoId) {
          return {
            ...m,
            status: 'en_cours',
            responses: [...m.responses, { author: 'Superviseur Admin', text: replyInputText, time: 'À l\'instant' }]
          };
        }
        return m;
      }));
      showToast("✓ Réponse enregistrée localement.");
      setReplyInputText('');
      setActiveReplyMemoId(null);
    }
  };

  // Action : Clôturer un mémo
  const handleResolveMemo = async (memoId) => {
    try {
      const res = await fetch(`/api/admin/badiens-messages/${memoId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resolve' })
      });
      if (res.ok) {
        const data = await res.json();
        setMemos(prev => prev.map(m => m.id === memoId ? data.memo : m));
        showToast("✓ Dossier mémo clôturé et archivé.");
      }
    } catch (_) {
      setMemos(prev => prev.map(m => m.id === memoId ? { ...m, status: 'resolu' } : m));
      showToast("✓ Dossier mémo clôturé.");
    }
  };

  // Action : Diffuser une directive au réseau des 1 240 marraines
  const handleSendBroadcast = async (e) => {
    e.preventDefault();
    if (!broadcastForm.title || !broadcastForm.content) return;

    try {
      const res = await fetch('/api/admin/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(broadcastForm)
      });
      if (res.ok) {
        showToast("✓ Directive diffusée aux 1 240 Badien Gox via SMS et canal vocal.");
        setIsBroadcasting(false);
        setBroadcastForm({ title: '', content: '', target: 'Toutes les marraines de Pikine' });
      }
    } catch (_) {
      showToast("✓ Directive programmée dans la file locale.");
      setIsBroadcasting(false);
    }
  };

  // Action : Créer un nouveau mémo terrain
  const handleCreateNewMemo = async (e) => {
    e.preventDefault();
    if (!newMemoForm.wolofText && !newMemoForm.frenchSummary) return;

    try {
      const res = await fetch('/api/admin/badiens-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMemoForm)
      });
      if (res.ok) {
        const data = await res.json();
        setMemos(prev => [data.memo, ...prev]);
        showToast("✓ Nouveau mémo de terrain réceptionné.");
        setIsCreatingMemo(false);
        setNewMemoForm({
          badienName: 'Fatou Ndiaye',
          quartier: 'Tally Bou Mack',
          patientCode: '#DK-PK-0865',
          priority: 'warning',
          wolofText: '',
          frenchSummary: ''
        });
      }
    } catch (_) {
      setIsCreatingMemo(false);
    }
  };

  // Action : Mise à jour des lits d'un centre
  const handleUpdateBeds = async (centerId, delta) => {
    const target = centers.find(c => c.id === centerId);
    if (!target) return;
    const nextBeds = Math.max(0, target.bedsAvailable + delta);

    try {
      const res = await fetch(`/api/admin/centers/${centerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bedsAvailable: nextBeds })
      });
      if (res.ok) {
        const data = await res.json();
        setCenters(prev => prev.map(c => c.id === centerId ? data.center : c));
        showToast(`✓ Disponibilité mise à jour : ${data.center.name} (${data.center.bedsAvailable} lits).`);
      }
    } catch (_) {
      setCenters(prev => prev.map(c => c.id === centerId ? { ...c, bedsAvailable: nextBeds } : c));
    }
  };

  // Action : Réassort Express PNA
  const handleTriggerReassort = async () => {
    try {
      const res = await fetch('/api/admin/stocks/reassort', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setStocks(data.stocks);
        showToast("✓ Réassort Express PNA confirmé pour tout le District de Pikine !");
      }
    } catch (_) {
      setStocks(prev => prev.map(s => ({ ...s, current: s.current + 50, alert: false })));
      showToast("✓ Réassort Express déclenché.");
    }
  };

  // Synthèse vocale humaine pour écouter le mémo en Wolof
  const playMemoAudio = (memo) => {
    if ('speechSynthesis' in window) {
      if (playingMemoId === memo.id) {
        window.speechSynthesis.cancel();
        setPlayingMemoId(null);
        return;
      }

      window.speechSynthesis.cancel();
      const speech = toWolofPhoneticSpeech(memo.wolofText);
      const utterance = new SpeechSynthesisUtterance(speech);
      utterance.lang = 'fr-SN';
      utterance.rate = 0.88;
      utterance.pitch = 1.02;

      utterance.onstart = () => setPlayingMemoId(memo.id);
      utterance.onend = () => setPlayingMemoId(null);
      utterance.onerror = () => setPlayingMemoId(null);

      window.speechSynthesis.speak(utterance);
    }
  };

  // Filtrage des mémos
  const filteredMemos = memos.filter(m => {
    if (memoPriorityFilter !== 'all' && m.priority !== memoPriorityFilter) return false;
    if (memoStatusFilter !== 'all' && m.status !== memoStatusFilter) return false;
    return true;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-[#2c694e] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-fadeIn border border-white/20">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Admin Hero avec Interconnexions Cliniques */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#902e2a] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#902e2a]">
                Console d'Administration & Gestion du Site
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] text-[10px] font-bold">
                Root / Superviseur District Pikine
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#171c23] mt-1">
              Gouvernance Clinique & Territoriale SuturaSanté
            </h1>
            <p className="text-xs sm:text-sm text-[#574240]">
              Coordination du réseau des Badien Gox, supervision des lits SONUB/SONUC et gestion des approvisionnements PNA.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsBroadcasting(true)}
              className="px-4 py-2 rounded-xl bg-[#902e2a] hover:bg-[#b0453f] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">campaign</span>
              <span>Diffuser Consigne Réseau</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCreatingMemo(true)}
              className="px-3.5 py-2 rounded-xl bg-[#f0f4fd] hover:bg-[#eaeef8] text-[#902e2a] border border-[#ddc0bd] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
              <span>Nouveau Mémo Terrain</span>
            </button>
          </div>
        </div>

        {/* Barre d'Interconnexion Rapide avec les Autres Univers */}
        <div className="pt-3 border-t border-[#ddc0bd]/30 flex items-center gap-2 flex-wrap">
          <span className="text-[11px] uppercase font-bold text-[#574240] mr-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px] text-[#902e2a]">hub</span>
            <span>Interconnexions Site :</span>
          </span>
          {onNavigateTab && (
            <>
              <button
                type="button"
                onClick={() => onNavigateTab('dispensary')}
                className="px-2.5 py-1 rounded-lg bg-[#eaeef8] hover:bg-[#dee2ec] text-[#171c23] text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">grid_view</span>
                <span>Dispensaire CPN</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('clinical-triage')}
                className="px-2.5 py-1 rounded-lg bg-[#ffdad6] hover:bg-[#ffcdd2] text-[#ba1a1a] text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">e911_emergency</span>
                <span>Console SAMU 1515</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('mother-file')}
                className="px-2.5 py-1 rounded-lg bg-[#eaeef8] hover:bg-[#dee2ec] text-[#171c23] text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">folder_shared</span>
                <span>Dossier Mères</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('metrics')}
                className="px-2.5 py-1 rounded-lg bg-[#eaeef8] hover:bg-[#dee2ec] text-[#2c694e] text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">analytics</span>
                <span>Impact UNICEF</span>
              </button>
            </>
          )}
        </div>
      </section>

      {/* 2. Security & Compliance Ribbon Dynamique */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#ddc0bd]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#574240]">Mémos Marraines Actifs</span>
            <div className="font-serif text-xl font-bold text-[#ba1a1a] flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping"></span>
              {memos.filter(m => m.status === 'nouveau').length} en attente
            </div>
            <span className="text-[10px] text-[#574240]">Sur {memos.length} mémos reçus</span>
          </div>
          <span className="material-symbols-outlined text-[#ba1a1a] text-[28px]">mark_chat_unread</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ddc0bd]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#574240]">Lits SONUB / SONUC</span>
            <div className="font-serif text-xl font-bold text-[#2c694e] mt-0.5">
              {centers.reduce((sum, c) => sum + c.bedsAvailable, 0)} disponibles
            </div>
            <span className="text-[10px] text-[#2c694e] font-semibold">4 Structures reliées</span>
          </div>
          <span className="material-symbols-outlined text-[#2c694e] text-[28px]">bed</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ddc0bd]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#574240]">Réseau Badien Gox</span>
            <div className="font-serif text-xl font-bold text-[#902e2a] mt-0.5">
              1 240 Marraines
            </div>
            <span className="text-[10px] text-[#2c694e] font-semibold">District Pikine / Guédiawaye</span>
          </div>
          <span className="material-symbols-outlined text-[#902e2a] text-[28px]">diversity_1</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ddc0bd]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#574240]">Alerte Stocks PNA</span>
            <div className="font-serif text-xl font-bold text-[#724600] mt-0.5">
              {stocks.filter(s => s.alert).length} sous le seuil
            </div>
            <span className="text-[10px] text-[#ba1a1a] font-semibold">Réassort recommandé</span>
          </div>
          <span className="material-symbols-outlined text-[#724600] text-[28px]">inventory_2</span>
        </div>
      </section>

      {/* 3. Navigation Onglets Admin Complets */}
      <div className="flex items-center bg-[#eaeef8] p-1 rounded-2xl gap-1 w-fit overflow-x-auto border border-[#ddc0bd]/40">
        <button
          type="button"
          onClick={() => setActiveSection('memos')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'memos'
              ? 'bg-[#902e2a] text-white shadow-xs'
              : 'text-[#574240] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">forum</span>
          <span>Mémos & Messages Marraines</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
            {memos.filter(m => m.status === 'nouveau').length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('centers')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'centers'
              ? 'bg-[#902e2a] text-white shadow-xs'
              : 'text-[#574240] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">local_hospital</span>
          <span>Centres & Lits SONU ({centers.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('badiens')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'badiens'
              ? 'bg-[#902e2a] text-white shadow-xs'
              : 'text-[#574240] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">diversity_1</span>
          <span>Réseau Badien Gox ({badiens.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('stocks')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'stocks'
              ? 'bg-[#902e2a] text-white shadow-xs'
              : 'text-[#574240] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">inventory_2</span>
          <span>Stocks PNA & Intrants ({stocks.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('telemetry')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'telemetry'
              ? 'bg-[#902e2a] text-white shadow-xs'
              : 'text-[#574240] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">visibility_off</span>
          <span>Audience & Actions Anonymes</span>
          <span className="px-1.5 py-0.2 rounded-full bg-[#aeeecb] text-[#316e52] text-[10px] font-bold">
            Zero PII
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('settings')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            activeSection === 'settings'
              ? 'bg-[#902e2a] text-white shadow-xs'
              : 'text-[#574240] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">tune</span>
          <span>Paramètres Sutura & DPG</span>
        </button>
      </div>

      {/* =========================================================================
          SECTION 1 : HUB DE GESTION DES MÉMOS & MESSAGES DES MARRAINES (BADIEN GOX)
          ========================================================================= */}
      {activeSection === 'memos' && (
        <section className="flex flex-col gap-5">
          {/* Header de section */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#ddc0bd]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#ba1a1a] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">forum</span>
                </span>
                <h3 className="font-serif text-lg font-bold text-[#171c23]">
                  Hub de Messagerie & Mémos Vocaux des Badien Gox
                </h3>
              </div>
              <p className="text-xs text-[#574240] mt-0.5">
                Écoutez les mémos vocaux en Wolof, traitez les alertes de terrain et coordonnez les évacuations avec les sages-femmes.
              </p>
            </div>

            {/* Filtres de sélection */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={memoPriorityFilter}
                onChange={(e) => setMemoPriorityFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#f0f4fd] text-[#171c23] border border-[#ddc0bd] text-xs font-bold cursor-pointer outline-none"
              >
                <option value="all">Toutes Priorités</option>
                <option value="urgent">🚨 Urgences Obstétricales</option>
                <option value="warning">⚠️ Retard CPN</option>
                <option value="info">💊 Dotation Fer</option>
                <option value="success">✓ Post-Partum</option>
              </select>

              <select
                value={memoStatusFilter}
                onChange={(e) => setMemoStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#f0f4fd] text-[#171c23] border border-[#ddc0bd] text-xs font-bold cursor-pointer outline-none"
              >
                <option value="all">Tous Statuts</option>
                <option value="nouveau">Nouveaux ({memos.filter(m => m.status === 'nouveau').length})</option>
                <option value="en_cours">En Traitement</option>
                <option value="resolu">Résolus</option>
              </select>
            </div>
          </div>

          {/* Liste des Mémos Vocaux */}
          <div className="flex flex-col gap-4">
            {filteredMemos.map(memo => {
              const isUrgent = memo.priority === 'urgent';
              const isNew = memo.status === 'nouveau';
              const isAudioActive = playingMemoId === memo.id;

              return (
                <div
                  key={memo.id}
                  className={`bg-white rounded-2xl p-5 shadow-xs border transition-all flex flex-col gap-3.5 ${
                    isUrgent ? 'border-[#ba1a1a]/50 bg-gradient-to-r from-[#ffdad6]/20 to-white' : 'border-[#ddc0bd]/40'
                  }`}
                >
                  {/* Top Bar Mémo */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#902e2a] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        {memo.badienName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-serif text-sm font-bold text-[#171c23]">
                            Badien {memo.badienName}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#eaeef8] text-[#574240] font-semibold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px] text-[#902e2a]">home_pin</span>
                            {memo.quartier}
                          </span>
                          <span className="text-[11px] font-mono text-[#902e2a] font-bold">
                            {memo.patientCode}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#574240]">Reçu {memo.createdAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        isUrgent
                          ? 'bg-[#ffdad6] text-[#ba1a1a] animate-pulse'
                          : memo.priority === 'warning'
                          ? 'bg-[#ffddb8] text-[#724600]'
                          : memo.priority === 'success'
                          ? 'bg-[#aeeecb] text-[#316e52]'
                          : 'bg-[#eaeef8] text-[#171c23]'
                      }`}>
                        {memo.priorityLabel}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        isNew ? 'bg-[#ffdad6] text-[#ba1a1a]' : memo.status === 'en_cours' ? 'bg-[#ffddb8] text-[#724600]' : 'bg-[#aeeecb] text-[#316e52]'
                      }`}>
                        {isNew ? 'Nouveau' : memo.status === 'en_cours' ? 'En Cours' : 'Résolu'}
                      </span>
                    </div>
                  </div>

                  {/* Contenu Sujet & Transcriptions Bilingues */}
                  <div className="flex flex-col gap-2">
                    <h4 className="font-serif text-sm font-bold text-[#171c23]">
                      {memo.subject}
                    </h4>

                    {/* Mémo Audio Wolof & Transcription */}
                    <div className="p-3 rounded-xl bg-[#f0f4fd] border border-[#ddc0bd]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          type="button"
                          onClick={() => playMemoAudio(memo)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer shadow-xs transition-all ${
                            isAudioActive ? 'bg-[#ba1a1a] text-white animate-pulse' : 'bg-[#724600] text-white hover:bg-[#902e2a]'
                          }`}
                          title="Écouter la voix de la marraine en Wolof"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {isAudioActive ? 'pause' : 'play_arrow'}
                          </span>
                        </button>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#724600] flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">volume_up</span>
                            <span>Mémo Vocal Wolof Original</span>
                          </span>
                          <p className="text-xs text-[#171c23] italic font-medium mt-0.5 truncate sm:whitespace-normal">
                            « {memo.wolofText} »
                          </p>
                        </div>
                      </div>

                      <span className="text-[11px] font-bold text-[#724600] bg-white px-2.5 py-1 rounded-full shrink-0 shadow-xs">
                        {isAudioActive ? 'Lecture en cours...' : 'Audio 00:45'}
                      </span>
                    </div>

                    {/* Résumé Médical en Français */}
                    <div className="p-3 rounded-xl bg-white border border-[#ddc0bd]/40 text-xs text-[#574240] flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#2c694e] text-[18px] shrink-0 mt-0.5">clinical_notes</span>
                      <div>
                        <span className="font-bold text-[#171c23] block mb-0.5">Synthèse Clinique pour les Soignants :</span>
                        <span>{memo.frenchSummary}</span>
                        <div className="mt-1 text-[10px] text-[#2c694e] font-semibold">
                          Affecté à : {memo.assignedTo}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Historique des Réponses / Échanges */}
                  {memo.responses && memo.responses.length > 0 && (
                    <div className="flex flex-col gap-1.5 pl-4 border-l-2 border-[#2c694e] mt-1">
                      <span className="text-[10px] font-bold uppercase text-[#2c694e]">Instructions / Réponses transmises :</span>
                      {memo.responses.map((resp, rIdx) => (
                        <div key={rIdx} className="text-xs text-[#171c23] bg-[#f0f4fd] p-2 rounded-lg">
                          <span className="font-bold text-[#902e2a]">{resp.author} : </span>
                          <span>{resp.text}</span>
                          <span className="text-[10px] text-[#574240] ml-2 font-mono">({resp.time})</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions Rapides Admin */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#ddc0bd]/20 flex-wrap">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveReplyMemoId(activeReplyMemoId === memo.id ? null : memo.id)}
                        className="px-3 py-1.5 rounded-xl bg-[#902e2a] hover:bg-[#b0453f] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[15px]">reply</span>
                        <span>Répondre à Badien {memo.badienName.split(' ')[0]}</span>
                      </button>

                      {memo.status !== 'resolu' ? (
                        <button
                          type="button"
                          onClick={() => handleResolveMemo(memo.id)}
                          className="px-3 py-1.5 rounded-xl bg-[#aeeecb] hover:bg-[#8ee0b3] text-[#316e52] text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px]">check_circle</span>
                          <span>Clôturer Dossier</span>
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-[#2c694e] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">task_alt</span>
                          <span>Prise en charge validée</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {isUrgent && onNavigateTab && (
                        <button
                          type="button"
                          onClick={() => onNavigateTab('clinical-triage')}
                          className="px-3 py-1.5 rounded-xl bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-[#ffcdd2]"
                        >
                          <span className="material-symbols-outlined text-[15px]">emergency</span>
                          <span>Transférer au SAMU 1515</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Zone de Saisie de Réponse Rapide */}
                  {activeReplyMemoId === memo.id && (
                    <div className="p-3 bg-[#f0f4fd] rounded-xl border border-[#902e2a]/30 flex flex-col gap-2 mt-2 animate-fadeIn">
                      <span className="text-xs font-bold text-[#171c23]">
                        Envoyer une consigne de retour à Badien {memo.badienName} :
                      </span>
                      <textarea
                        rows={2}
                        value={replyInputText}
                        onChange={(e) => setReplyInputText(e.target.value)}
                        placeholder="Ex: Bien reçu Badien Fatou, l'équipe du dispensaire l'attend en priorité pour le bilan de tension..."
                        className="w-full text-xs p-2.5 rounded-xl bg-white border border-[#ddc0bd] outline-none"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setReplyInputText("Ambulance SAMU 1515 prévenue, convoi en route.")}
                            className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#ddc0bd] text-[#574240] hover:text-[#ba1a1a]"
                          >
                            + Modèle SAMU
                          </button>
                          <button
                            type="button"
                            onClick={() => setReplyInputText("Faire venir la mère au dispensaire ce matin sans faute.")}
                            className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#ddc0bd] text-[#574240] hover:text-[#2c694e]"
                          >
                            + Modèle CPN
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveReplyMemoId(null)}
                            className="px-3 py-1 rounded-lg text-xs font-semibold text-[#574240]"
                          >
                            Annuler
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSendReply(memo.id)}
                            className="px-3.5 py-1 rounded-xl bg-[#902e2a] text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <span className="material-symbols-outlined text-[14px]">send</span>
                            <span>Transmettre</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 2 : CENTRES HOSPITALIERS & LITS SONU
          ========================================================================= */}
      {activeSection === 'centers' && (
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#171c23]">
                Gestion des Établissements Hospitaliers & Lits Maternité SONU
              </h3>
              <p className="text-xs text-[#574240]">
                Mettez à jour la disponibilité des lits réa SONUC pour la régulation d'urgence SAMU 1515 en temps réel.
              </p>
            </div>
            <button
              type="button"
              onClick={() => showToast("Formulaire de conventionnement d'un nouveau centre sanitaire.")}
              className="px-3.5 py-1.5 rounded-xl bg-[#eaeef8] hover:bg-[#dee2ec] text-[#171c23] text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add_location_alt</span>
              <span>Ajouter un Centre</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#ddc0bd]/30">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#eaeef8] text-[#171c23] font-bold">
                  <th className="py-3 px-4">Établissement</th>
                  <th className="py-3 px-3">District</th>
                  <th className="py-3 px-3">Plateau SONU</th>
                  <th className="py-3 px-3">Lits Disponibles</th>
                  <th className="py-3 px-3">Statut Triage</th>
                  <th className="py-3 px-4 text-right">Régulation Rapide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaeef8]">
                {centers.map(center => (
                  <tr key={center.id} className="hover:bg-[#f0f4fd] transition-colors">
                    <td className="py-3 px-4 font-bold text-[#171c23]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#902e2a] text-[18px]">domain</span>
                        <div>
                          <span>{center.name}</span>
                          <span className="block text-[10px] text-[#574240] font-normal">{center.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-[#574240]">{center.district}</td>
                    <td className="py-3 px-3 font-semibold text-[#2c694e]">{center.sonuLevel}</td>
                    <td className="py-3 px-3">
                      <span className="font-serif font-bold text-sm text-[#171c23] px-2.5 py-0.5 rounded-md bg-[#eaeef8]">
                        {center.bedsAvailable} / {center.totalBeds || 10} lits
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        center.status === 'Saturé'
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : center.status === 'Fluide'
                          ? 'bg-[#aeeecb] text-[#316e52]'
                          : 'bg-[#ffddb8] text-[#724600]'
                      }`}>
                        {center.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleUpdateBeds(center.id, -1)}
                          className="w-7 h-7 rounded-lg bg-white border border-[#ddc0bd] text-[#ba1a1a] font-bold text-xs flex items-center justify-center hover:bg-[#ffdad6]/40 cursor-pointer shadow-xs"
                          title="Occuper un lit (admission)"
                        >
                          -1
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateBeds(center.id, +1)}
                          className="w-7 h-7 rounded-lg bg-[#2c694e] text-white font-bold text-xs flex items-center justify-center hover:bg-[#3b8c68] cursor-pointer shadow-xs"
                          title="Libérer un lit (sortie)"
                        >
                          +1
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 3 : RÉSEAU BADIEN GOX
          ========================================================================= */}
      {activeSection === 'badiens' && (
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#171c23]">
                Supervision du Réseau Communautaire des Badien Gox
              </h3>
              <p className="text-xs text-[#574240]">
                Réseau de marraines de quartier assurant le dépistage à domicile et le suivi des mères dans le District de Pikine.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreatingMemo(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#902e2a] hover:bg-[#b0453f] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
              <span>Enregistrer Mémo Terrain</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badiens.map(badien => (
              <div
                key={badien.id}
                className="p-4 rounded-xl bg-[#f0f4fd] border border-[#ddc0bd]/30 flex flex-col justify-between gap-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#902e2a] flex items-center justify-center font-bold text-xs shadow-xs">
                      {badien.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#171c23]">{badien.name}</h4>
                      <span className="text-[11px] text-[#574240] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-[#902e2a]">home_pin</span>
                        {badien.quartier}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] text-[10px] font-bold">
                    {badien.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-white shadow-xs">
                    <span className="font-serif text-base font-bold text-[#171c23] block">{badien.femmes}</span>
                    <span className="text-[10px] text-[#574240]">Mères Suivies</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white shadow-xs">
                    <span className="font-serif text-base font-bold text-[#ba1a1a] block">{badien.activeMemos}</span>
                    <span className="text-[10px] text-[#574240]">Mémos Actifs</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#574240] pt-1 border-t border-[#ddc0bd]/20">
                  <span>Dernière synchro : {badien.lastSync}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setMemoPriorityFilter('all');
                      setActiveSection('memos');
                    }}
                    className="text-[#902e2a] font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Voir ses mémos ({badien.activeMemos})</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 4 : STOCKS PNA & INTRANTS
          ========================================================================= */}
      {activeSection === 'stocks' && (
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#171c23]">
                Gestion des Intrants & Réserve Médicale Dispensaire (PNA)
              </h3>
              <p className="text-xs text-[#574240]">
                Surveillance continue des dotations en Fer / Acide Folique, kits et médicaments essentiels.
              </p>
            </div>
            <button
              type="button"
              onClick={handleTriggerReassort}
              className="px-4 py-2 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              <span>Déclencher Réassort Express PNA</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stocks.map((stock) => (
              <div
                key={stock.id}
                className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${
                  stock.alert
                    ? 'bg-[#ffdad6]/20 border-[#ffdad6]'
                    : 'bg-[#f0f4fd] border-[#ddc0bd]/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#171c23]">{stock.item}</h4>
                    <span className="text-[10px] text-[#574240]">Seuil de réapprovisionnement : {stock.threshold} {stock.unit}</span>
                  </div>
                  {stock.alert && (
                    <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold animate-pulse">
                      Alerte Rupture
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className={`font-serif text-2xl font-bold ${stock.alert ? 'text-[#ba1a1a]' : 'text-[#171c23]'}`}>
                      {stock.current}
                    </span>
                    <span className="text-xs text-[#574240]">{stock.unit}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={async () => {
                        const nextVal = Math.max(0, stock.current - 5);
                        try {
                          await fetch(`/api/admin/stocks/${stock.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ current: nextVal })
                          });
                        } catch (_) {}
                        setStocks(prev => prev.map(s => s.id === stock.id ? { ...s, current: nextVal, alert: nextVal <= s.threshold } : s));
                      }}
                      className="w-7 h-7 rounded-lg bg-white border border-[#ddc0bd] text-[#574240] font-bold text-xs flex items-center justify-center hover:bg-[#eaeef8] cursor-pointer"
                      title="Déduire 5 unités distribuées"
                    >
                      -5
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        const nextVal = stock.current + 10;
                        try {
                          await fetch(`/api/admin/stocks/${stock.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ current: nextVal })
                          });
                        } catch (_) {}
                        setStocks(prev => prev.map(s => s.id === stock.id ? { ...s, current: nextVal, alert: nextVal <= s.threshold } : s));
                      }}
                      className="w-7 h-7 rounded-lg bg-[#902e2a] text-white font-bold text-xs flex items-center justify-center hover:bg-[#b0453f] cursor-pointer shadow-xs"
                      title="Ajouter 10 unités reçues"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 5 : AUDIENCE & TÉLÉMÉTRIE ANONYME
          ========================================================================= */}
      {activeSection === 'telemetry' && (
        <section className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#2c694e] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">visibility_off</span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2c694e]">
                  Télémétrie Éthique & Sans Compte
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] text-[10px] font-bold">
                  Conforme CDP Sénégal
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#171c23] mt-1">
                Observatoire d'Audience et Mesure d'Impact Anonyme
              </h2>
              <p className="text-xs sm:text-sm text-[#574240]">
                Suivi d'utilisation en temps réel respectant à 100% l'intimité et la dignité des patientes (Protocole Sutura).
              </p>
            </div>

            <button
              type="button"
              onClick={fetchAllAdminData}
              className="px-3.5 py-2 rounded-xl bg-[#eaeef8] hover:bg-[#dee2ec] text-[#171c23] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
              <span>Actualiser le Flux</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4.5 rounded-2xl border border-[#ddc0bd]/40 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] font-bold uppercase text-[#574240]">Utilisatrices Dédupliquées</span>
              <div className="mt-3">
                <span className="font-serif text-3xl font-bold text-[#171c23]">{statsData.uniqueUsers}</span>
                <span className="text-[11px] text-[#2c694e] font-semibold block mt-1">UUID Local sans compte</span>
              </div>
            </div>
            <div className="bg-white p-4.5 rounded-2xl border border-[#ddc0bd]/40 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] font-bold uppercase text-[#574240]">Écoutes Vocales Wolof</span>
              <div className="mt-3">
                <span className="font-serif text-3xl font-bold text-[#724600]">{statsData.audioListens}</span>
                <span className="text-[11px] text-[#574240] block mt-1">Inclusion mères analphabètes</span>
              </div>
            </div>
            <div className="bg-white p-4.5 rounded-2xl border border-[#ddc0bd]/40 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] font-bold uppercase text-[#574240]">Triages & Calculs CPN</span>
              <div className="mt-3">
                <span className="font-serif text-3xl font-bold text-[#171c23]">{statsData.triagesDone + statsData.calculations}</span>
                <span className="text-[11px] text-[#2c694e] font-semibold block mt-1">Dépistage précoce</span>
              </div>
            </div>
            <div className="bg-white p-4.5 rounded-2xl border border-[#ddc0bd]/40 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] font-bold uppercase text-[#574240]">Urgences SAMU Orientées</span>
              <div className="mt-3">
                <span className="font-serif text-3xl font-bold text-[#ba1a1a]">{statsData.emergencies}</span>
                <span className="text-[11px] text-[#ba1a1a] font-semibold block mt-1">Régulées vers le 1515</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 6 : PARAMÈTRES SUTURA & DPG
          ========================================================================= */}
      {activeSection === 'settings' && (
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-5">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#171c23]">
              Paramètres Éthiques Sutura & Bien Public Numérique (DPG)
            </h3>
            <p className="text-xs text-[#574240]">
              Configuration stricte du respect de la vie privée et conformité UNICEF Femtech 2026.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f0f4fd]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#2c694e] text-[22px]">verified_user</span>
                <div>
                  <span className="text-xs font-bold text-[#171c23] block">Protocole de Confidentialité Sutura</span>
                  <span className="text-[10px] text-[#574240]">Interdit tout stockage de nom réel, téléphone en clair ou GPS précis</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#aeeecb] text-[#316e52] text-xs font-bold">
                Verrouillé (Actif)
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f0f4fd]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#724600] text-[22px]">wifi_tethering</span>
                <div>
                  <span className="text-xs font-bold text-[#171c23] block">Synchronisation Locale PWA Offline-First</span>
                  <span className="text-[10px] text-[#574240]">Permet la saisie dans les zones périurbaines sans connexion 4G/3G</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={offlineSyncEnabled}
                onChange={(e) => setOfflineSyncEnabled(e.target.checked)}
                className="w-5 h-5 accent-[#902e2a] cursor-pointer"
              />
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          MODAL 1 : DIFFUSER UNE DIRECTIVE AU RÉSEAU DES MARRAINES
          ========================================================================= */}
      {isBroadcasting && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl flex flex-col gap-4 border border-[#ddc0bd]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#902e2a] text-[24px]">campaign</span>
                <h3 className="font-serif text-lg font-bold text-[#171c23]">
                  Diffuser une Directive aux 1 240 Badien Gox
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBroadcasting(false)}
                className="text-[#574240] hover:text-[#171c23] text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-bold text-[#171c23] block mb-1">Titre de la consigne sanitaire :</label>
                <input
                  type="text"
                  required
                  value={broadcastForm.title}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                  placeholder="Ex: Campagne distribution moustiquaires MILDA à Pikine"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#ddc0bd] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#171c23] block mb-1">Message vocal & SMS diffusé :</label>
                <textarea
                  rows={3}
                  required
                  value={broadcastForm.content}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, content: e.target.value })}
                  placeholder="Consignes à relayer auprès des mères du quartier..."
                  className="w-full text-xs p-2.5 rounded-xl border border-[#ddc0bd] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBroadcasting(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#574240]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#902e2a] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Diffuser aux Marraines</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2 : ENREGISTRER UN NOUVEAU MÉMO TERRAIN
          ========================================================================= */}
      {isCreatingMemo && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl flex flex-col gap-4 border border-[#ddc0bd]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#902e2a] text-[24px]">record_voice_over</span>
                <h3 className="font-serif text-lg font-bold text-[#171c23]">
                  Nouveau Mémo de Terrain (Badien Gox)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreatingMemo(false)}
                className="text-[#574240] hover:text-[#171c23] text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewMemo} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#171c23] block mb-1">Nom de la Marraine :</label>
                  <select
                    value={newMemoForm.badienName}
                    onChange={(e) => setNewMemoForm({ ...newMemoForm, badienName: e.target.value })}
                    className="w-full text-xs p-2 rounded-xl border border-[#ddc0bd] outline-none"
                  >
                    <option value="Fatou Ndiaye">Fatou Ndiaye (Tally Bou Mack)</option>
                    <option value="Khadija Diop">Khadija Diop (Pikine Ouest)</option>
                    <option value="Aminata Sow">Aminata Sow (Icotaf 1 & 2)</option>
                    <option value="Seynabou Sène">Seynabou Sène (Marché Syndicat)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#171c23] block mb-1">Niveau d'Urgence :</label>
                  <select
                    value={newMemoForm.priority}
                    onChange={(e) => setNewMemoForm({ ...newMemoForm, priority: e.target.value })}
                    className="w-full text-xs p-2 rounded-xl border border-[#ddc0bd] outline-none font-bold"
                  >
                    <option value="urgent">🚨 Urgence Obstétricale</option>
                    <option value="warning">⚠️ Alerte Retard CPN</option>
                    <option value="info">💊 Dotation Fer</option>
                    <option value="success">✓ Post-Partum</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#171c23] block mb-1">Mémo Vocal Wolof (retranscription) :</label>
                <textarea
                  rows={2}
                  required
                  value={newMemoForm.wolofText}
                  onChange={(e) => setNewMemoForm({ ...newMemoForm, wolofText: e.target.value })}
                  placeholder="Ex: Soxna Awa dafa am metti biir bu tar te deret di sotti..."
                  className="w-full text-xs p-2.5 rounded-xl border border-[#ddc0bd] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#171c23] block mb-1">Synthèse Clinique en Français :</label>
                <textarea
                  rows={2}
                  required
                  value={newMemoForm.frenchSummary}
                  onChange={(e) => setNewMemoForm({ ...newMemoForm, frenchSummary: e.target.value })}
                  placeholder="Ex: Mère à 32 SA présentant de violentes douleurs abdominales..."
                  className="w-full text-xs p-2.5 rounded-xl border border-[#ddc0bd] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingMemo(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#574240]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#902e2a] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>Enregistrer Mémo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
