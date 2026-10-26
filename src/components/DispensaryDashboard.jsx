import React, { useState } from 'react';

export default function DispensaryDashboard({ lang = 'wo', onActionTrack }) {
  const [activeQueueFilter, setActiveQueueFilter] = useState('all');
  const [isPlayingMemo, setIsPlayingMemo] = useState(false);
  const [calledPatient, setCalledPatient] = useState(null);

  const patients = [
    {
      id: '01',
      code: '#DK-PK-0842',
      badge: 'Triage : Tension 14/9',
      badgeType: 'error',
      status: 'Appelée en salle',
      details: '28 SA • CPN 2',
      arrival: '08h15',
      badien: 'Badien Fatou Ndiaye (Tally Bou Mack)',
      urgent: true,
    },
    {
      id: '02',
      code: '#DK-PK-0843',
      badge: 'Constantes Normales',
      badgeType: 'success',
      subBadge: 'CPN 1 Rattrapage',
      status: 'En attente',
      details: '14 SA • Primo-geste',
      arrival: '08h30 (Attente 22 min)',
      badien: 'Badien Khady Guèye',
      urgent: false,
    },
    {
      id: '03',
      code: '#DK-PK-0847',
      badge: 'Dossier Complet',
      badgeType: 'neutral',
      subBadge: 'CPN 3 + Écho T3',
      status: 'En attente',
      details: '32 SA • Multipare',
      arrival: '08h42 (Attente 10 min)',
      badien: 'Badien Seynabou Sène',
      urgent: false,
    },
    {
      id: '04',
      code: '#DK-PK-0851',
      badge: 'En route (SMS Reçu)',
      badgeType: 'warning',
      status: 'Prévue à 09h00',
      details: '20 SA • CPN 2',
      arrival: 'Arrivée estimée 15 min',
      badien: 'Relance Badien Gox effectuée',
      urgent: false,
    },
  ];

  const filteredPatients = activeQueueFilter === 'urgent'
    ? patients.filter(p => p.urgent)
    : patients;

  const handleVoiceCall = (code = 'salle') => {
    if (onActionTrack) onActionTrack('audio_listen');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = code === 'salle'
        ? "Bissimilah, ñu ngi woo ñi nga xamne dañu am rendez-vous CPN ci salle bi. Yeuksil leen."
        : `Bissimilah, patiente numéro ${code}, yeuksil ci cabinet de consultation bi.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'wo';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    setCalledPatient(code);
    setTimeout(() => setCalledPatient(null), 5000);
  };

  const handlePlayVoiceMemo = () => {
    setIsPlayingMemo(!isPlayingMemo);
    if (!isPlayingMemo) {
      if (onActionTrack) onActionTrack('audio_listen');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const text = "Fatou Ndiaye ci Tally Bou Mack. Jiggéen ji am na 3 mois ci birr bi te amul carnet, te bopp bi dafay méti lool. Ñu ngi ko jëme ci dispensaire bi léegi.";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'wo';
        utterance.rate = 0.9;
        utterance.onend = () => setIsPlayingMemo(false);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Alert Banner: Réserve Dispensaire PNA */}
      <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-[#ddc0bd]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              medication_liquid
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-[#ba1a1a] font-bold">
                Alerte Réserve Dispensaire
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-pulse"></span>
              <span className="text-xs text-[#574240]">Poste Pikine Icotaf</span>
            </div>
            <p className="text-sm font-semibold text-[#171c23] mt-0.5">
              Seuil critique atteint : <strong className="text-[#ba1a1a] font-bold">22 boîtes</strong> de Fer/Acide Folique 60mg en réserve.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            type="button"
            className="px-3.5 py-2 rounded-xl bg-[#eaeef8] text-[#171c23] text-xs font-bold flex items-center gap-1.5 hover:bg-[#dee2ec] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">inventory</span>
            <span>Inventaire Détaillé</span>
          </button>
          <button
            type="button"
            onClick={() => alert("Bon de commande PNA Express généré pour le Poste de Pikine Icotaf.")}
            className="px-4 py-2 rounded-xl bg-[#902e2a] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-[#b0453f] transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            <span>Bon Commande PNA Express</span>
          </button>
        </div>
      </div>

      {/* Operational KPI Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#ddc0bd]/40 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#574240] font-bold">
              Consultations Prévues
            </span>
            <span className="w-8 h-8 rounded-lg bg-[#eaeef8] flex items-center justify-center text-[#902e2a]">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#171c23]">28</span>
            <span className="text-xs text-[#2c694e] font-bold">100% planifiées</span>
          </div>
          <div className="mt-2 w-full bg-[#eaeef8] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#902e2a] h-full rounded-full" style={{ width: '72%' }}></div>
          </div>
          <span className="mt-2 text-[11px] text-[#574240]">Séance de matinée (8h00 - 14h00)</span>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#ddc0bd]/40 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#574240] font-bold">
              En Salle d'Attente
            </span>
            <span className="w-8 h-8 rounded-lg bg-[#b1f0ce] flex items-center justify-center text-[#002114]">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                chair
              </span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#2c694e]">11</span>
            <span className="text-xs text-[#574240]">Mamans assises</span>
          </div>
          <div className="mt-2 w-full bg-[#eaeef8] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#2c694e] h-full rounded-full" style={{ width: '55%' }}></div>
          </div>
          <span className="mt-2 text-[11px] text-[#574240]">Temps d'attente moyen : 18 min</span>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#ddc0bd]/40 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#574240] font-bold">
              Retards CPN1 Rattrapés
            </span>
            <span className="w-8 h-8 rounded-lg bg-[#ffddb8] flex items-center justify-center text-[#2a1700]">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                published_with_changes
              </span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#724600]">06</span>
            <span className="text-xs text-[#2c694e] font-bold">+3 vs hier</span>
          </div>
          <div className="mt-2 w-full bg-[#eaeef8] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#724600] h-full rounded-full" style={{ width: '85%' }}></div>
          </div>
          <span className="mt-2 text-[11px] text-[#574240]">Via rondes de sensibilisation</span>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#ddc0bd]/40 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#574240] font-bold">
              Dotations Fer / Folates
            </span>
            <span className="w-8 h-8 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#410003]">
              <span className="material-symbols-outlined text-[18px]">vaccines</span>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#171c23]">19</span>
            <span className="text-xs text-[#574240]">Sur 25 éligibles</span>
          </div>
          <div className="mt-2 w-full bg-[#eaeef8] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#902e2a] h-full rounded-full" style={{ width: '76%' }}></div>
          </div>
          <span className="mt-2 text-[11px] text-[#574240]">Traçabilité anonymisée Sutura</span>
        </div>
      </div>

      {/* Main Grid: Waiting Queue (Left 8 cols) & Relais / Badien Gox (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Live Queue Module */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-xs border border-[#ddc0bd]/40 p-5 sm:p-6 flex flex-col gap-5">
            {/* Queue Header with Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#ddc0bd]/30">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2c694e] animate-ping"></span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#171c23]">
                    File d'Attente CPN en Direct
                  </h2>
                </div>
                <p className="text-xs text-[#574240] mt-0.5">
                  Cabinet 1 : Sage-Femme Maîtresse Aïssatou Ba • Poste de Santé Icotaf
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleVoiceCall('salle')}
                  className="px-3 py-1.5 rounded-full bg-[#ffddb8] hover:bg-[#fcba67] text-[#2a1700] text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  title="Annonce vocale en Wolof dans les haut-parleurs de la salle d'attente"
                >
                  <span className="material-symbols-outlined text-[16px]">campaign</span>
                  <span>Annonce Vocale Salle</span>
                </button>

                <div className="flex items-center bg-[#eaeef8] rounded-xl p-1 text-[#574240]">
                  <button
                    type="button"
                    onClick={() => setActiveQueueFilter('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeQueueFilter === 'all'
                        ? 'bg-white text-[#171c23] shadow-xs'
                        : 'text-[#574240] hover:text-[#171c23]'
                    }`}
                  >
                    Toutes (11)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveQueueFilter('urgent')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeQueueFilter === 'urgent'
                        ? 'bg-white text-[#ba1a1a] shadow-xs'
                        : 'text-[#574240] hover:text-[#ba1a1a]'
                    }`}
                  >
                    Urgentes (2)
                  </button>
                </div>
              </div>
            </div>

            {/* Notification de rappel vocal actif */}
            {calledPatient && (
              <div className="p-3 rounded-xl bg-[#aeeecb] text-[#316e52] text-xs font-bold flex items-center justify-between animate-fadeIn">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">volume_up</span>
                  <span>
                    {calledPatient === 'salle'
                      ? "Diffusion de l'annonce générale en Wolof dans la salle..."
                      : `Appel vocal en Wolof émis pour la patiente ${calledPatient}`}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-semibold">Diffusion en cours</span>
              </div>
            )}

            {/* Active in Consultation Highlight Card */}
            <div className="p-4 rounded-xl bg-[#aeeecb]/30 border border-[#2c694e]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2c694e] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">stethoscope</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#2c694e] text-white text-[11px] font-bold uppercase">
                      En Consultation
                    </span>
                    <span className="font-serif text-lg font-bold text-[#171c23] tracking-tight">
                      Code #DK-PK-0840
                    </span>
                    <span className="text-xs text-[#574240]">(Protégé Sutura)</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#574240] mt-1">
                    <span className="font-bold text-[#902e2a] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">pregnant_woman</span>
                      36 SA (Terme proche)
                    </span>
                    <span>•</span>
                    <span className="font-medium">CPN 4 Bilan Pré-accouchement</span>
                    <span>•</span>
                    <span className="text-[#0e5138] font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">volunteer_activism</span>
                      Badien Mariama Thiam
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => alert("Consultation terminée pour #DK-PK-0840. Ordonnance générée.")}
                  className="px-4 py-2 rounded-xl bg-[#eaeef8] hover:bg-[#dee2ec] text-[#171c23] text-xs font-bold transition-colors cursor-pointer"
                >
                  Terminer & Ordonnance
                </button>
              </div>
            </div>

            {/* Queue List Cards */}
            <div className="flex flex-col gap-3">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="p-4 rounded-xl bg-[#f0f4fd] hover:bg-[#eaeef8] border border-[#ddc0bd]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-start md:items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      patient.urgent
                        ? 'bg-[#b0453f] text-white'
                        : 'bg-white text-[#574240] border border-[#ddc0bd]/40'
                    }`}>
                      {patient.id}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-serif text-base font-bold text-[#171c23] tracking-tight">
                          {patient.code}
                        </span>
                        {patient.badge && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                            patient.badgeType === 'error'
                              ? 'bg-[#ffdad6] text-[#ba1a1a]'
                              : patient.badgeType === 'success'
                              ? 'bg-[#aeeecb] text-[#316e52]'
                              : patient.badgeType === 'warning'
                              ? 'bg-[#ffddb8] text-[#724600]'
                              : 'bg-white text-[#574240]'
                          }`}>
                            {patient.badgeType === 'error' && (
                              <span className="material-symbols-outlined text-[12px]">priority_high</span>
                            )}
                            {patient.badge}
                          </span>
                        )}
                        {patient.subBadge && (
                          <span className="px-2 py-0.5 rounded-full bg-[#ffddb8] text-[#724600] text-[10px] font-bold">
                            {patient.subBadge}
                          </span>
                        )}
                        <span className="text-[10px] text-[#574240] font-semibold">
                          ({patient.status})
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs text-[#574240] mt-1">
                        <span className="font-semibold text-[#171c23]">{patient.details}</span>
                        <span>•</span>
                        <span>Arrivée : {patient.arrival}</span>
                        <span>•</span>
                        <span className="text-[#2c694e] font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">diversity_1</span>
                          {patient.badien}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => handleVoiceCall(patient.code)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#ffddb8] hover:bg-[#fcba67] text-[#2a1700] text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                      title="Rappeler la patiente en Wolof"
                    >
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                      <span>Rappeler (Wolof)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => alert(`Dossier Sutura ouvert pour la patiente ${patient.code}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#902e2a] hover:bg-[#b0453f] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">folder_shared</span>
                      <span>Ouvrir Dossier</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-[#574240]">
              <span>Affichage de {filteredPatients.length} sur 11 patientes présentes</span>
              <button
                type="button"
                onClick={() => setActiveQueueFilter('all')}
                className="text-[#902e2a] font-bold hover:underline flex items-center gap-1"
              >
                <span>Voir l'ensemble de la file d'attente (11)</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Weekly Planning & Attendance Projection */}
          <div className="bg-white rounded-2xl shadow-xs border border-[#ddc0bd]/40 p-5 sm:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#171c23]">
                  Projection Hebdomadaire & Assiduité CPN
                </h3>
                <p className="text-xs text-[#574240]">District Sanitaire Pikine • Semaine en cours</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-[#2c694e] font-bold bg-[#aeeecb]/40 px-2.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#2c694e]"></span>
                91.4% Taux d'Assiduité Global
              </span>
            </div>

            {/* Weekly Distribution Bars */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3 pt-2">
              {[
                { day: 'LUN', height: '85%', count: 26, pct: '92%', active: false },
                { day: 'MAR', height: '70%', count: 22, pct: '88%', active: false },
                { day: 'MER', height: '95%', count: 28, pct: '96%', active: true, label: "Aujourd'hui" },
                { day: 'JEU', height: '60%', count: 18, pct: 'Prévus', active: false },
                { day: 'VEN', height: '80%', count: 25, pct: 'Prévus', active: false },
                { day: 'SAM', height: '45%', count: 14, pct: 'Garde', active: false },
              ].map((item) => (
                <div
                  key={item.day}
                  className={`p-3 rounded-xl flex flex-col items-center gap-1.5 transition-all ${
                    item.active
                      ? 'bg-[#aeeecb]/30 border border-[#2c694e]/40'
                      : 'bg-[#f0f4fd]'
                  }`}
                >
                  <span className={`text-[11px] font-bold ${item.active ? 'text-[#2c694e]' : 'text-[#574240]'}`}>
                    {item.day}
                  </span>
                  <div className="h-20 sm:h-24 w-full flex items-end justify-center">
                    <div
                      className={`w-5 sm:w-7 rounded-t-lg transition-all ${
                        item.active ? 'bg-[#2c694e]' : 'bg-[#902e2a]/70 hover:bg-[#902e2a]'
                      }`}
                      style={{ height: item.height }}
                    ></div>
                  </div>
                  <span className="font-serif text-base font-bold text-[#171c23]">{item.count}</span>
                  <span className={`text-[10px] font-bold ${item.active ? 'text-[#2c694e]' : 'text-[#574240]'}`}>
                    {item.pct}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-[#eaeef8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2c694e] text-[18px]">sms</span>
                <span className="text-xs text-[#171c23] font-medium">
                  Relances SMS discrets Sutura : <strong>34 rappels programmés</strong> en Wolof pour demain.
                </span>
              </div>
              <button
                type="button"
                onClick={() => alert("Paramètres de relance SMS Sutura configurés.")}
                className="px-3 py-1 rounded-lg bg-white text-[#171c23] text-xs font-bold shadow-xs hover:bg-[#dee2ec]"
              >
                Paramètres Rappels
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Badien Gox Field Feed & Voice Memos */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Sync Card: Badien Gox Field Ronde */}
          <div className="bg-white rounded-2xl shadow-xs border border-[#ddc0bd]/40 p-5 sm:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#b1f0ce] flex items-center justify-center text-[#002114]">
                  <span className="material-symbols-outlined text-[18px]">sync</span>
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#171c23]">Rondes Badien Gox</h3>
                  <span className="text-[11px] text-[#2c694e] font-bold">Synchronisé il y a 4 min</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#b1f0ce] text-[#002114] text-[10px] font-bold">
                +4 fiches
              </span>
            </div>
            <p className="text-xs text-[#574240]">
              Remontées matinales collectées hors-ligne dans les quartiers de Pikine Icotaf et Tally Bou Mack.
            </p>

            {/* Voice Memo 1 */}
            <div className="p-3.5 rounded-xl bg-[#f0f4fd] flex flex-col gap-2.5 border border-[#ddc0bd]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#ffdad6] text-[#902e2a] flex items-center justify-center font-bold text-xs">
                    FN
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#171c23]">Badien Fatou Ndiaye</span>
                    <span className="text-[10px] text-[#574240]">Tally Bou Mack • 07h45</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
                  Urgent CPN 1
                </span>
              </div>

              {/* Audio Player Container */}
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white shadow-xs">
                <button
                  type="button"
                  onClick={handlePlayVoiceMemo}
                  className="w-8 h-8 rounded-full bg-[#724600] text-white flex items-center justify-center shadow-xs hover:scale-105 transition-transform shrink-0 cursor-pointer"
                  title="Écouter le mémo vocal en Wolof"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isPlayingMemo ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px] text-[#574240]">
                    <span className="font-bold text-[#171c23]">Mémo vocal Wolof</span>
                    <span>0:48</span>
                  </div>
                  <div className="w-full bg-[#eaeef8] rounded-full h-1.5 overflow-hidden">
                    <div className={`bg-[#724600] h-full rounded-full transition-all duration-300 ${isPlayingMemo ? 'w-3/4' : 'w-1/3'}`}></div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#574240] italic">
                "Femme enceinte de 3 mois identifiée sans carnet, céphalées persistantes. Conduite au dispensaire ce matin."
              </p>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => alert("Entrée validée et intégrée dans la file d'attente.")}
                  className="px-3 py-1 rounded-lg bg-[#902e2a] hover:bg-[#b0453f] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Valider Entrée
                </button>
              </div>
            </div>

            {/* Field Activity Feed */}
            <div className="flex flex-col gap-2 pt-1 text-xs text-[#574240]">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#eaeef8]">
                <span className="font-medium">Khady Guèye (Icotaf 1)</span>
                <span className="text-[#2c694e] font-bold">2 visites CPN validées</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#eaeef8]">
                <span className="font-medium">Seynabou Sène (Marché)</span>
                <span className="text-[#724600] font-bold">1 relance Fer/Folates</span>
              </div>
            </div>
          </div>

          {/* Quick Support Card */}
          <div className="p-4 rounded-2xl bg-[#ffddb8]/30 border border-[#fcba67]/40 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#724600]">
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
              <span className="text-xs font-bold uppercase tracking-wider">Assistance Déploiement</span>
            </div>
            <p className="text-xs text-[#574240]">
              Besoin de recharger des carnets papier ou des bandelettes urinaires ? Contactez le magasinier du District Pikine au poste 12.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
