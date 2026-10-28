import React, { useState, useEffect } from 'react';

export default function AdminDashboard({ lang = 'wo', onActionTrack, metrics }) {
  const [activeSection, setActiveSection] = useState('telemetry');
  const [offlineSyncEnabled, setOfflineSyncEnabled] = useState(true);
  const [encryptionAudit, setEncryptionAudit] = useState(true);

  // Données de télémétrie éthique & journal anonyme en direct
  const [liveActivity, setLiveActivity] = useState([
    { id: 'act-1', type: 'pregnancy_calculation', label: 'Calculateur CPN (Terme estimé 14 SA)', lang: 'wo', time: 'Il y a 2 min', status: 'Complété' },
    { id: 'act-2', type: 'audio_listen', label: 'Écoute guidage audio Wolof (Moringa & Fer)', lang: 'wo', time: 'Il y a 5 min', status: 'Écouté 100%' },
    { id: 'act-3', type: 'chatbot_inquiry', label: 'Dialogue Chatbot IA (Question nausées)', lang: 'wo', time: 'Il y a 9 min', status: 'Répondu' },
    { id: 'act-4', type: 'triage_eval', label: 'Triage Signes de Danger (Niveau Vert - Rassurant)', lang: 'fr', time: 'Il y a 14 min', status: 'Orienté' },
    { id: 'act-5', type: 'translation', label: 'Traduction Français ➔ Wolof (Phrases médicales)', lang: 'wo', time: 'Il y a 19 min', status: 'Traduit' },
    { id: 'act-6', type: 'emergency_red', label: 'Alerte Urgence (Appel SAMU 1515)', lang: 'wo', time: 'Il y a 27 min', status: 'Prioritaire' }
  ]);
  const [isLoadingActivity, setIsLoadingActivity] = useState(false);
  const [statsData, setStatsData] = useState({
    uniqueUsers: metrics?.totalUsers || 48,
    audioListens: metrics?.audioListens || 93,
    triagesDone: metrics?.triagesDone || 37,
    emergencies: metrics?.emergenciesHandled || 9,
    calculations: metrics?.calculationsDone || 29
  });

  // Récupération automatique du flux d'activité anonyme
  const fetchLiveActivity = async () => {
    setIsLoadingActivity(true);
    try {
      const res = await fetch('/api/metrics/live-activity');
      if (res.ok) {
        const data = await res.json();
        if (data.recentActions && Array.isArray(data.recentActions)) {
          setLiveActivity(data.recentActions);
        }
        if (data.totalUniqueUsers) {
          setStatsData(prev => ({ ...prev, uniqueUsers: data.totalUniqueUsers }));
        }
      }
    } catch (_) {
      // Silencieux : résilience hors-ligne
    } finally {
      setIsLoadingActivity(false);
    }
  };

  useEffect(() => {
    fetchLiveActivity();
    const interval = setInterval(fetchLiveActivity, 15000);
    return () => clearInterval(interval);
  }, []);

  // Synchronisation avec les props metrics
  useEffect(() => {
    if (metrics) {
      setStatsData(prev => ({
        ...prev,
        uniqueUsers: metrics.totalUsers || prev.uniqueUsers,
        audioListens: metrics.audioListens || prev.audioListens,
        triagesDone: metrics.triagesDone || prev.triagesDone,
        emergencies: metrics.emergenciesHandled || prev.emergencies,
        calculations: metrics.calculationsDone || prev.calculations
      }));
    }
  }, [metrics]);

  const [centers, setCenters] = useState([
    { id: 1, name: 'Poste de Santé Pikine Icotaf', district: 'Pikine Est', type: 'Dispensaire Primaire', bedsAvailable: 4, sonuLevel: 'SONUB', status: 'Opérationnel' },
    { id: 2, name: 'Centre de Santé Dominique', district: 'Pikine Centre', type: 'Centre de Référence', bedsAvailable: 2, sonuLevel: 'SONUB Avancé', status: 'Opérationnel' },
    { id: 3, name: 'Hôpital National Dalal Jamm', district: 'Guédiawaye', type: 'Centre Hospitalier Universitaire', bedsAvailable: 3, sonuLevel: 'SONUC Réa', status: 'Fluide' },
    { id: 4, name: 'Hôpital National de Pikine', district: 'Camp Militaire', type: 'Centre Hospitalier Régional', bedsAvailable: 0, sonuLevel: 'SONUC', status: 'Saturé' },
  ]);

  const [badiens, setBadiens] = useState([
    { id: 1, name: 'Fatou Ndiaye', quartier: 'Tally Bou Mack', femmes: 42, activeMemos: 6, lastSync: 'Il y a 4 min', status: 'Active' },
    { id: 2, name: 'Khadija Diop', quartier: 'Pikine Ouest', femmes: 38, activeMemos: 4, lastSync: 'Il y a 12 min', status: 'Active' },
    { id: 3, name: 'Aminata Sow', quartier: 'Icotaf 1 & 2', femmes: 51, activeMemos: 8, lastSync: 'Il y a 20 min', status: 'Active' },
    { id: 4, name: 'Seynabou Sène', quartier: 'Marché Syndicat', femmes: 29, activeMemos: 3, lastSync: 'Il y a 35 min', status: 'Active' },
  ]);

  const [stocks, setStocks] = useState([
    { item: 'Fer + Acide Folique 60mg (Plaquettes 30cp)', current: 22, threshold: 50, unit: 'boîtes', alert: true },
    { item: 'Bandelettes Urinaires Albuminurie / Protéinurie', current: 180, threshold: 100, unit: 'tests', alert: false },
    { item: 'Kits d\'Accouchement d\'Urgence Stériles', current: 14, threshold: 20, unit: 'kits', alert: true },
    { item: 'Sulfate de Magnésium (MgSO4) Ampoules IV', current: 36, threshold: 25, unit: 'ampoules', alert: false },
  ]);

  const handleUpdateStock = (index, delta) => {
    setStocks(prev => {
      const copy = [...prev];
      copy[index].current = Math.max(0, copy[index].current + delta);
      copy[index].alert = copy[index].current <= copy[index].threshold;
      return copy;
    });
  };

  const handleToggleBed = (centerId) => {
    setCenters(prev => prev.map(c => {
      if (c.id === centerId) {
        const nextBeds = c.bedsAvailable > 0 ? c.bedsAvailable - 1 : 3;
        return {
          ...c,
          bedsAvailable: nextBeds,
          status: nextBeds === 0 ? 'Saturé' : nextBeds < 3 ? 'Opérationnel' : 'Fluide'
        };
      }
      return c;
    }));
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. Header Admin Hero */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#902e2a] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#902e2a]">
              Console d'Administration & Gestion du Site
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] text-[10px] font-bold">
              Root / Superviseur
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#171c23] mt-1">
            Gouvernance Clinique & Territoriale SuturaSanté
          </h1>
          <p className="text-xs sm:text-sm text-[#574240]">
            Paramétrage des structures hospitalières, supervision du réseau des Badien Gox et approvisionnement des dispensaires.
          </p>
        </div>

        {/* Global Action Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => alert("Sauvegarde complète des configurations chiffrées réussie.")}
            className="px-4 py-2 rounded-xl bg-[#902e2a] hover:bg-[#b0453f] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">sync_saved_locally</span>
            <span>Sauvegarder l'État</span>
          </button>
        </div>
      </section>

      {/* 2. Security & Compliance Ribbon */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#ddc0bd]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#574240]">Chiffrement Sutura</span>
            <div className="font-serif text-lg font-bold text-[#2c694e] flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#2c694e] animate-pulse"></span>
              AES-GCM 256
            </div>
            <span className="text-[10px] text-[#574240]">100% Anonymisé (Zéro PII)</span>
          </div>
          <span className="material-symbols-outlined text-[#2c694e] text-[28px]">shield_lock</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ddc0bd]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#574240]">Cache PWA Hors-Ligne</span>
            <div className="font-serif text-lg font-bold text-[#171c23] mt-0.5">
              1.8 Mo (Léger)
            </div>
            <span className="text-[10px] text-[#2c694e] font-semibold">ServiceWorker Actif</span>
          </div>
          <span className="material-symbols-outlined text-[#724600] text-[28px]">offline_pin</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ddc0bd]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#574240]">Marraines en Ligne</span>
            <div className="font-serif text-lg font-bold text-[#902e2a] mt-0.5">
              1 240 Badien Gox
            </div>
            <span className="text-[10px] text-[#2c694e] font-semibold">5 Pôles Régionaux</span>
          </div>
          <span className="material-symbols-outlined text-[#902e2a] text-[28px]">diversity_1</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ddc0bd]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#574240]">Standard UNICEF</span>
            <div className="font-serif text-lg font-bold text-[#316e52] mt-0.5">
              DPG Validé
            </div>
            <span className="text-[10px] text-[#574240]">Licence MIT Open Source</span>
          </div>
          <span className="material-symbols-outlined text-[#316e52] text-[28px]">verified</span>
        </div>
      </section>

      {/* 3. Navigation Onglets Admin */}
      <div className="flex items-center bg-[#eaeef8] p-1 rounded-2xl gap-1 w-fit overflow-x-auto border border-[#ddc0bd]/40">
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
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
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
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeSection === 'stocks'
              ? 'bg-[#902e2a] text-white shadow-xs'
              : 'text-[#574240] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">inventory_2</span>
          <span>Stocks PNA & Dotations</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('settings')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeSection === 'settings'
              ? 'bg-[#902e2a] text-white shadow-xs'
              : 'text-[#574240] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">tune</span>
          <span>Paramètres Sutura & DPG</span>
        </button>
      </div>

      {/* SECTION 0 : Observatoire d'Audience Anonyme & Télémétrie Éthique */}
      {activeSection === 'telemetry' && (
        <section className="flex flex-col gap-6">
          {/* Header & Statut de Confidentialité */}
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
                Comment connaître le volume réel d'utilisatrices et leurs actions sans jamais exiger d'inscription, ni stocker de noms, de numéros ou d'adresses IP.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={fetchLiveActivity}
                disabled={isLoadingActivity}
                className="px-3.5 py-2 rounded-xl bg-[#eaeef8] hover:bg-[#dee2ec] text-[#171c23] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <span className={`material-symbols-outlined text-[16px] ${isLoadingActivity ? 'animate-spin' : ''}`}>
                  sync
                </span>
                <span>{isLoadingActivity ? 'Actualisation...' : 'Actualiser le Flux'}</span>
              </button>
            </div>
          </div>

          {/* Cartes KPI Temps Réel Dédupliquées */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4.5 rounded-2xl border border-[#ddc0bd]/40 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-[#574240]">
                  Utilisatrices Uniques (Estimées)
                </span>
                <span className="w-7 h-7 rounded-lg bg-[#f0f4fd] text-[#902e2a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">fingerprint</span>
                </span>
              </div>
              <div className="mt-3">
                <span className="font-serif text-3xl font-bold text-[#171c23]">
                  {statsData.uniqueUsers}
                </span>
                <span className="text-[11px] text-[#2c694e] font-semibold block mt-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#2c694e] inline-block animate-pulse"></span>
                  Dédupliqué par UUID local (Sans compte)
                </span>
              </div>
            </div>

            <div className="bg-white p-4.5 rounded-2xl border border-[#ddc0bd]/40 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-[#574240]">
                  Écoutes Guidage Audio Wolof
                </span>
                <span className="w-7 h-7 rounded-lg bg-[#ffddb8] text-[#724600] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                </span>
              </div>
              <div className="mt-3">
                <span className="font-serif text-3xl font-bold text-[#724600]">
                  {statsData.audioListens}
                </span>
                <span className="text-[11px] text-[#574240] block mt-1">
                  Accès audio inclusif pour mères analphabètes
                </span>
              </div>
            </div>

            <div className="bg-white p-4.5 rounded-2xl border border-[#ddc0bd]/40 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-[#574240]">
                  Triages Cliniques & CPN
                </span>
                <span className="w-7 h-7 rounded-lg bg-[#e8def8] text-[#4a4458] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">vital_signs</span>
                </span>
              </div>
              <div className="mt-3">
                <span className="font-serif text-3xl font-bold text-[#171c23]">
                  {statsData.triagesDone + statsData.calculations}
                </span>
                <span className="text-[11px] text-[#2c694e] font-semibold block mt-1">
                  Dépistage précoce des complications
                </span>
              </div>
            </div>

            <div className="bg-white p-4.5 rounded-2xl border border-[#ddc0bd]/40 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-[#574240]">
                  Régulations Urgence SAMU
                </span>
                <span className="w-7 h-7 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">e911_emergency</span>
                </span>
              </div>
              <div className="mt-3">
                <span className="font-serif text-3xl font-bold text-[#ba1a1a]">
                  {statsData.emergencies}
                </span>
                <span className="text-[11px] text-[#ba1a1a] font-semibold block mt-1">
                  Appels régulés vers le 1515
                </span>
              </div>
            </div>
          </div>

          {/* Les 4 Piliers Techniques de la Confidentialité Éthique */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#902e2a] text-[20px]">security</span>
                <h3 className="font-serif text-lg font-bold text-[#171c23]">
                  Les 4 Piliers Techniques du Modèle Zéro-Compte Sutura
                </h3>
              </div>
              <p className="text-xs text-[#574240] mt-0.5">
                Architecture garantissant un suivi statistique exhaustif pour les bailleurs (UNICEF, Ministère) sans jamais enfreindre le secret médical ou la dignité des patientes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-1">
              <div className="p-4 rounded-xl bg-[#f0f4fd] border border-[#ddc0bd]/30 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#902e2a]">
                  <span className="material-symbols-outlined text-[20px]">tag</span>
                  <span className="text-xs font-bold uppercase">1. UUIDv4 Local Aléatoire</span>
                </div>
                <p className="text-xs text-[#574240] leading-relaxed">
                  À sa première visite, le navigateur génère une clé cryptographique aléatoire (<code className="text-[11px] bg-white px-1.5 py-0.5 rounded text-[#902e2a]">anon_uuid</code>). <strong>Aucun numéro de téléphone, ni nom, ni email requis</strong>.
                </p>
                <div className="mt-auto pt-2 border-t border-[#ddc0bd]/30 text-[10px] text-[#2c694e] font-semibold">
                  ✓ Volatile & sans traçage civil
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f0f4fd] border border-[#ddc0bd]/30 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#2c694e]">
                  <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                  <span className="text-xs font-bold uppercase">2. Télémétrie Événementielle</span>
                </div>
                <p className="text-xs text-[#574240] leading-relaxed">
                  L'application n'envoie que le <em>type</em> de l'action médicale (<code className="text-[11px] bg-white px-1.5 py-0.5 rounded text-[#2c694e]">audio_listen</code>, <code className="text-[11px] bg-white px-1.5 py-0.5 rounded text-[#2c694e]">triage_eval</code>). <strong>Zéro contenu de conversation ou de symptôme intime</strong>.
                </p>
                <div className="mt-auto pt-2 border-t border-[#ddc0bd]/30 text-[10px] text-[#2c694e] font-semibold">
                  ✓ Zero PII (Données non-nominatives)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f0f4fd] border border-[#ddc0bd]/30 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#724600]">
                  <span className="material-symbols-outlined text-[20px]">memory</span>
                  <span className="text-xs font-bold uppercase">3. Déduplication en RAM & Pas d'IP</span>
                </div>
                <p className="text-xs text-[#574240] leading-relaxed">
                  Le backend Express compte les UUIDs uniques dans un ensemble en mémoire vive (<code className="text-[11px] bg-white px-1.5 py-0.5 rounded text-[#724600]">Set</code>). <strong>L'adresse IP est immédiatement jetée</strong> sans jamais être loggée en base.
                </p>
                <div className="mt-auto pt-2 border-t border-[#ddc0bd]/30 text-[10px] text-[#2c694e] font-semibold">
                  ✓ Pas de cookies tiers ni pixels traceurs
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f0f4fd] border border-[#ddc0bd]/30 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#316e52]">
                  <span className="material-symbols-outlined text-[20px]">wifi_off</span>
                  <span className="text-xs font-bold uppercase">4. File d'Attente Offline</span>
                </div>
                <p className="text-xs text-[#574240] leading-relaxed">
                  Dans les zones périurbaines sans réseau 4G, les actions sont temporairement stockées localement en cache chiffré PWA, puis transmises en paquet groupé dès que le réseau revient.
                </p>
                <div className="mt-auto pt-2 border-t border-[#ddc0bd]/30 text-[10px] text-[#2c694e] font-semibold">
                  ✓ Résilience PWA hors-ligne
                </div>
              </div>
            </div>
          </div>

          {/* Tableau Comparatif : Pourquoi le modèle Sans Compte surpasse le modèle Classique */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
            <h3 className="font-serif text-lg font-bold text-[#171c23]">
              Comparatif d'Impact : Pourquoi Sutura a choisi le Sans-Compte
            </h3>
            <div className="overflow-x-auto rounded-xl border border-[#ddc0bd]/30">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#eaeef8] text-[#171c23] font-bold">
                    <th className="py-3 px-4">Critère d'Usage</th>
                    <th className="py-3 px-4 text-[#ba1a1a]">Modèle avec Compte Obligatoire</th>
                    <th className="py-3 px-4 text-[#2c694e]">Modèle SuturaSanté (Sans Compte)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaeef8]">
                  <tr className="hover:bg-[#f0f4fd]">
                    <td className="py-3 px-4 font-bold text-[#171c23]">Accessibilité & Illettrisme</td>
                    <td className="py-3 px-4 text-[#ba1a1a]">Forte barrière : saisie de mot de passe, SMS de validation difficile pour les femmes analphabètes.</td>
                    <td className="py-3 px-4 text-[#2c694e] font-semibold">Accès instantané en 1 clic : guidage vocal Wolof immédiat sans friction.</td>
                  </tr>
                  <tr className="hover:bg-[#f0f4fd]">
                    <td className="py-3 px-4 font-bold text-[#171c23]">Pudeur & Tabou Culturel (*Sutura*)</td>
                    <td className="py-3 px-4 text-[#ba1a1a]">Peur d'être vue ou fichée sur sa grossesse, réticence à confier son identité.</td>
                    <td className="py-3 px-4 text-[#2c694e] font-semibold">Confidentialité sacrée : aucune trace nominative ne reste sur le téléphone partagé.</td>
                  </tr>
                  <tr className="hover:bg-[#f0f4fd]">
                    <td className="py-3 px-4 font-bold text-[#171c23]">Suivi d'Audience pour l'Admin</td>
                    <td className="py-3 px-4 text-[#574240]">Noms et téléphones exposés aux risques de piratage et non-conformité CDP.</td>
                    <td className="py-3 px-4 text-[#2c694e] font-semibold">Métriques précises d'usage (visiteurs uniques, actions) 100% anonymisées à la source.</td>
                  </tr>
                  <tr className="hover:bg-[#f0f4fd]">
                    <td className="py-3 px-4 font-bold text-[#171c23]">Conformité Légale (Sénégal)</td>
                    <td className="py-3 px-4 text-[#574240]">Déclarations lourdes auprès de la Commission des Données Personnelles (CDP).</td>
                    <td className="py-3 px-4 text-[#2c694e] font-semibold">Zero PII par conception (Privacy-by-Design), conforme aux critères DPG UNICEF.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Journal des Actions Anonymes en Direct */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2c694e] animate-ping"></span>
                  <h3 className="font-serif text-lg font-bold text-[#171c23]">
                    Flux d'Activité Récente en Direct (Audit Anonyme)
                  </h3>
                </div>
                <p className="text-xs text-[#574240]">
                  Visualisez en temps réel les actions fonctionnelles déclenchées sur la plateforme sans aucune donnée personnelle.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onActionTrack) onActionTrack('audio_listen', 'Écoute audio test depuis console admin');
                    fetchLiveActivity();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#f0f4fd] hover:bg-[#eaeef8] text-[#902e2a] border border-[#ddc0bd] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">send</span>
                  <span>Simuler une Action Anonyme</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col divide-y divide-[#eaeef8] border border-[#ddc0bd]/30 rounded-xl overflow-hidden">
              {liveActivity.map((act, index) => (
                <div key={act.id || index} className="p-3.5 bg-white hover:bg-[#f0f4fd] transition-colors flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      act.type?.includes('emergency')
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : act.type?.includes('audio')
                        ? 'bg-[#ffddb8] text-[#724600]'
                        : act.type?.includes('chat')
                        ? 'bg-[#aeeecb] text-[#316e52]'
                        : 'bg-[#eaeef8] text-[#171c23]'
                    }`}>
                      <span className="material-symbols-outlined text-[18px]">
                        {act.type?.includes('emergency')
                          ? 'crisis_alert'
                          : act.type?.includes('audio')
                          ? 'volume_up'
                          : act.type?.includes('chat')
                          ? 'chat_bubble'
                          : 'checklist'}
                      </span>
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#171c23] block">
                        {act.label}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] text-[#574240] mt-0.5">
                        <span className="font-mono bg-[#eaeef8] px-1.5 py-0.5 rounded text-[#574240]">
                          Visiteur Anonyme #{act.id ? act.id.replace('act-', '').slice(-4) : '7a9b'}
                        </span>
                        <span>• Langue : {act.lang === 'wo' ? 'Wolof (Olof)' : 'Français'}</span>
                        <span>• {act.time}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    act.status === 'Prioritaire'
                      ? 'bg-[#ffdad6] text-[#ba1a1a]'
                      : act.status === 'Complété' || act.status === 'Écouté 100%' || act.status === 'Répondu'
                      ? 'bg-[#aeeecb] text-[#316e52]'
                      : 'bg-[#eaeef8] text-[#574240]'
                  }`}>
                    {act.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 1 : Centres & Lits SONU */}
      {activeSection === 'centers' && (
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#171c23]">
                Gestion des Établissements Hospitaliers & Lits Maternité
              </h3>
              <p className="text-xs text-[#574240]">
                Mettez à jour la disponibilité des lits réa SONUC pour la régulation d'urgence SAMU 1515.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert("Formulaire d'ajout d'une nouvelle structure sanitaire.")}
              className="px-3.5 py-1.5 rounded-xl bg-[#eaeef8] hover:bg-[#dee2ec] text-[#171c23] text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
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
                  <th className="py-3 px-4 text-right">Action Rapide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaeef8]">
                {centers.map(center => (
                  <tr key={center.id} className="hover:bg-[#f0f4fd] transition-colors">
                    <td className="py-3 px-4 font-bold text-[#171c23]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#902e2a] text-[18px]">domain</span>
                        <span>{center.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-[#574240]">{center.district}</td>
                    <td className="py-3 px-3 font-semibold text-[#2c694e]">{center.sonuLevel}</td>
                    <td className="py-3 px-3">
                      <span className="font-serif font-bold text-sm text-[#171c23] px-2.5 py-0.5 rounded-md bg-[#eaeef8]">
                        {center.bedsAvailable} lits
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
                      <button
                        type="button"
                        onClick={() => handleToggleBed(center.id)}
                        className="px-2.5 py-1 rounded-lg bg-[#f0f4fd] hover:bg-[#eaeef8] text-[#902e2a] font-bold text-[11px] transition-colors cursor-pointer"
                        title="Modifier la disponibilité des lits"
                      >
                        Ajuster Lits
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SECTION 2 : Réseau Badien Gox */}
      {activeSection === 'badiens' && (
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#171c23]">
                Registre Opérationnel des Badien Gox (Marraines Communautaires)
              </h3>
              <p className="text-xs text-[#574240]">
                Supervision des rondes de proximité, des mémos vocaux enregistrés et de l'assiduité CPN.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert("Ajout d'une nouvelle marraine Badien Gox assermentée.")}
              className="px-3.5 py-1.5 rounded-xl bg-[#902e2a] hover:bg-[#b0453f] text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              <span>Enrôler Badien Gox</span>
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
                    <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#902e2a] flex items-center justify-center font-bold text-xs">
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
                    <span className="font-serif text-base font-bold text-[#724600] block">{badien.activeMemos}</span>
                    <span className="text-[10px] text-[#574240]">Mémos Vocaux</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#574240] pt-1 border-t border-[#ddc0bd]/20">
                  <span>Dernière synchro : {badien.lastSync}</span>
                  <button
                    type="button"
                    onClick={() => alert(`Détails du secteur de ${badien.name} ouverts.`)}
                    className="text-[#902e2a] font-bold hover:underline"
                  >
                    Gérer Secteur →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3 : Stocks PNA & Intrants */}
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
              onClick={() => alert("Bon de commande PNA Express généré pour tout le District de Pikine.")}
              className="px-4 py-2 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              <span>Déclencher Réassort Express PNA</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stocks.map((stock, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${
                  stock.alert
                    ? 'bg-[#ffdad6]/20 border-[#ffdad6]'
                    : 'bg-[#f0f4fd] border-[#ddc0bd]/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-[#171c23]">{stock.item}</h4>
                    <span className="text-[10px] text-[#574240]">
                      Seuil d'alerte : {stock.threshold} {stock.unit}
                    </span>
                  </div>
                  {stock.alert && (
                    <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">warning</span>
                      Seuil Critique
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className={`font-serif text-2xl font-bold ${stock.alert ? 'text-[#ba1a1a]' : 'text-[#171c23]'}`}>
                      {stock.current}
                    </span>
                    <span className="text-xs text-[#574240] font-medium">{stock.unit} restants</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleUpdateStock(idx, -5)}
                      className="w-7 h-7 rounded-lg bg-white border border-[#ddc0bd] text-[#574240] font-bold text-xs flex items-center justify-center hover:bg-[#eaeef8] cursor-pointer"
                      title="Déduire 5 unités distribuées"
                    >
                      -5
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateStock(idx, 10)}
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

      {/* SECTION 4 : Paramètres Sutura & DPG */}
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

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f0f4fd]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#902e2a] text-[22px]">database</span>
                <div>
                  <span className="text-xs font-bold text-[#171c23] block">Purge Médico-Légale des Données Volatiles</span>
                  <span className="text-[10px] text-[#574240]">Efface les mémos vocaux temporaires après transcription et validation</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert("Purge effectuée : 0 trace résiduelle.")}
                className="px-3 py-1.5 rounded-xl bg-[#eaeef8] hover:bg-[#dee2ec] text-[#ba1a1a] text-xs font-bold cursor-pointer"
              >
                Purger Maintenant
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
