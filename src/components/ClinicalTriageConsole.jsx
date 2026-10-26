import React, { useState } from 'react';

export default function ClinicalTriageConsole({ lang = 'wo', onActionTrack }) {
  const [activeEvacModal, setActiveEvacModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');

  const redAlerts = [
    {
      id: 'SN-PIK-9021',
      profile: 'Mère G4P3 • 34 SA',
      timeAgo: 'Il y a 9 min',
      title: 'Hémorragie Génitale Abondante du 3ème Trimestre (Suspicion HRP / Placenta Praevia)',
      desc: 'Patiente pâle, pouls filant à 118 bpm, TA 85/55 mmHg. Voie veineuse gros calibre 16G posée, Ringer Lactate en cours.',
      location: 'Poste Icotaf Box 1',
      relais: 'Khadija Diop (Badien Gox Pikine Ouest) sur les lieux',
      samuStatus: 'Ambulance SAMU 1515 en route (ETA 6 min)',
      destination: 'Hôpital Dalal Jamm',
    },
    {
      id: 'SN-PIK-8419',
      profile: 'Primigeste • 38 SA + 2j',
      timeAgo: 'Il y a 14 min',
      title: 'Crise Pré-éclampsie Sévère : TA 165/105 mmHg, Céphalées en casque & Phosphènes',
      desc: 'Oedèmes des membres inférieurs +++, protéinurie bandelette +++. Injection Sulfate de Magnésium (MgSO4) dose de charge initiée.',
      location: 'Dispensaire Salle Travail',
      relais: 'Besoin Immédiat d\'Évacuation : Ambulance non affectée !',
      samuStatus: 'Alerte Pompiers 18 envoyée',
      destination: 'Centre Dominique',
      urgentAction: true,
    },
    {
      id: 'SN-PIK-3382',
      profile: 'Deuxième geste • 31 SA',
      timeAgo: 'Il y a 22 min',
      title: 'Chorioamniotite Suspicion : Fièvre 39.8°C, Frissons intenses & Liquide teinté fétide',
      desc: 'Rupture prématurée des membranes depuis 36h. BDC fœtaux à 174 bpm (tachycardie). Antibiothérapie IV débutée (Ampicilline + Gentamicine).',
      location: 'Poste Icotaf Box 3',
      relais: 'Acceptation Réanimation Néonatale : Hôpital Dalal Jamm validée',
      samuStatus: 'Attente départ convoi médicalisé',
      destination: 'Hôpital Dalal Jamm',
    },
  ];

  const orangeAlerts = [
    {
      id: 'SN-PIK-7840',
      profile: '36 SA • Alerte USSD *1515# (Il y a 18 min)',
      title: 'Diminution nette des mouvements fœtaux (> 12h)',
      desc: 'Monitoring Cardiotocographe (CTG) en cours. Bruits du cœur présents mais réactivité modérée. Reprise sucre effectuée.',
      badien: 'Badien Gox : Aminata Sow',
    },
    {
      id: 'SN-PIK-6211',
      profile: '28 SA • CPN 2 Retard (Il y a 35 min)',
      title: 'Anémie Clinique Décompensée (Hb < 7.1 g/dL)',
      desc: 'Dyspnée d\'effort, conjonctives décolorées, vertiges persistants. Hémocue confirmé 6.8 g/dL. Recherche sang O+ compatible.',
      badien: 'Réserve Sang CNTS Pikine : 2 Culots Dispo',
    },
  ];

  const handleVocalizeAlerts = () => {
    if (onActionTrack) onActionTrack('audio_listen');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = "Alerte Urgence SONU. Ñetti jiggéen ñu ngi ci cas bu graw. Benn bi dafay réer deret, ñaareel bi tension bi yéeg na lool, ñetteel bi dafa yor yaram wu tàng. Ñu ngi woo SAMU 1515 ngir ñu yóbbu leen hôpital Dalal Jamm.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'wo';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Critical Status & Emergency Gateway Bar */}
      <section className="w-full bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping"></span>
                Console Régulation SONU Actif
              </span>
              <span className="text-xs text-[#574240] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#2c694e]">encrypted</span>
                Chiffrement Sutura AES-GCM 256
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#902e2a] mt-1.5 tracking-tight">
              Triage Obstétrique & Centre d'Évacuation SAMU 1515
            </h1>
            <p className="text-xs sm:text-sm text-[#574240]">
              Poste de Santé Icotaf • Coordination Territoriale Pikine - Guédiawaye (Zone Périurbaine Dakar)
            </p>
          </div>

          {/* Action Gateway Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              type="button"
              onClick={handleVocalizeAlerts}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#ffddb8] text-[#2a1700] hover:bg-[#fcba67] text-xs font-bold shadow-xs transition-all cursor-pointer"
              title="Vocaliser les alertes critiques en Wolof"
            >
              <span className="material-symbols-outlined text-[18px] text-[#724600]">volume_up</span>
              <span>Déglul ci Wolof (Vocaliser Alertes)</span>
            </button>
            <a
              href="tel:1515"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-bold shadow-xs transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>SAMU 1515</span>
            </a>
            <a
              href="tel:18"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#eaeef8] hover:bg-[#dee2ec] text-[#171c23] text-xs font-bold shadow-xs transition-all"
            >
              <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">local_fire_department</span>
              <span>Pompiers 18</span>
            </a>
            <button
              type="button"
              onClick={() => setActiveEvacModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#902e2a] hover:bg-[#b0453f] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">ambulance</span>
              <span>Déclencher Évacuation</span>
            </button>
          </div>
        </div>

        {/* Live Metric Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-2 border-t border-[#ddc0bd]/30">
          <div className="p-3.5 rounded-xl bg-[#f0f4fd] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[#574240]">Urgences Vitales (Rouge)</span>
              <span className="font-serif text-2xl font-bold text-[#ba1a1a]">03 Mères</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f0f4fd] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[#574240]">Surveillance Étroite (Orange)</span>
              <span className="font-serif text-2xl font-bold text-[#724600]">04 Patientes</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#ffddb8] flex items-center justify-center text-[#724600]">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f0f4fd] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[#574240]">Lits SONUC Disponibles</span>
              <span className="font-serif text-2xl font-bold text-[#2c694e]">05 Lits (Pikine/GJ)</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#b1f0ce] flex items-center justify-center text-[#002114]">
              <span className="material-symbols-outlined text-[20px]">single_bed</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f0f4fd] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[#574240]">Temps Évacuation Moyen</span>
              <span className="font-serif text-2xl font-bold text-[#171c23]">14 min</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-[#eaeef8] flex items-center justify-center text-[#902e2a]">
              <span className="material-symbols-outlined text-[20px]">timelapse</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Live Obstetric Triage Ticker (Left 8 cols) & Bed Matrix (Right 4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Alerts List */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* Section 1: Alertes Rouges Vitales */}
          <div className="bg-white rounded-2xl shadow-xs border border-[#ddc0bd]/40 p-5 sm:p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between pb-2 border-b border-[#ddc0bd]/30">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ba1a1a]"></span>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#171c23]">
                  Signes de Danger Extrême • Priorité Rouge (SONUC)
                </h2>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
                Protocole National MSP/OMS
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {redAlerts.map((alertItem) => (
                <div
                  key={alertItem.id}
                  className="p-5 rounded-2xl bg-[#f8f9ff] border border-[#ffdad6] shadow-xs flex flex-col gap-3 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#ba1a1a]"></div>

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pl-1">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[26px]">bloodtype</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-serif text-base font-bold text-[#171c23]">{alertItem.id}</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#eaeef8] text-[#171c23] text-[11px] font-semibold">
                            {alertItem.profile}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold">
                            {alertItem.timeAgo}
                          </span>
                        </div>
                        <h4 className="font-serif text-sm sm:text-base font-bold text-[#ba1a1a] mt-1">
                          {alertItem.title}
                        </h4>
                        <p className="text-xs text-[#574240] mt-1 leading-relaxed">
                          {alertItem.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end gap-1.5 shrink-0 pl-1">
                      <button
                        type="button"
                        onClick={handleVocalizeAlerts}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffddb8] hover:bg-[#fcba67] text-[#2a1700] text-[11px] font-bold cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">volume_up</span>
                        <span>Woyal</span>
                      </button>
                      <span className="text-[10px] text-[#574240]">{alertItem.location}</span>
                    </div>
                  </div>

                  {/* Status Banner Inside Card */}
                  <div className="p-3 rounded-xl bg-white border border-[#ddc0bd]/40 flex flex-col md:flex-row md:items-center justify-between gap-2.5 mt-1 ml-1">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#2c694e] text-[18px]">assignment_ind</span>
                      <span className="text-xs text-[#171c23]">
                        {alertItem.relais}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2c694e] animate-pulse"></span>
                        {alertItem.samuStatus}
                      </span>
                      <button
                        type="button"
                        onClick={() => alert(`Demande de transfert initiée vers ${alertItem.destination}`)}
                        className="px-3 py-1 rounded-lg bg-[#902e2a] hover:bg-[#b0453f] text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        Transférer Vers {alertItem.destination.split(' ')[1] || 'Hôpital'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Alertes Oranges */}
          <div className="bg-white rounded-2xl shadow-xs border border-[#ddc0bd]/40 p-5 sm:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#ddc0bd]/30">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#724600]"></span>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#171c23]">
                  Signes d'Alerte Rapprochée • Priorité Orange (Surveillance 30 min)
                </h2>
              </div>
              <span className="text-xs text-[#574240] font-semibold">4 Patientes Monitorées</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orangeAlerts.map((orange) => (
                <div
                  key={orange.id}
                  className="p-4 rounded-xl bg-[#f0f4fd] border-l-4 border-[#724600] flex flex-col gap-2.5 justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-serif text-sm font-bold text-[#171c23]">{orange.id}</span>
                      <span className="block text-[10px] text-[#574240]">{orange.profile}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#ffddb8] text-[#724600] text-[10px] font-bold">
                      Orange
                    </span>
                  </div>
                  <h5 className="font-serif text-xs font-bold text-[#724600]">{orange.title}</h5>
                  <p className="text-xs text-[#574240] leading-relaxed">{orange.desc}</p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-[#574240] border-t border-[#ddc0bd]/30">
                    <span>{orange.badien}</span>
                    <button
                      type="button"
                      onClick={() => alert("Réévaluation programmée dans 15 minutes.")}
                      className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#eaeef8] text-[#171c23] font-bold shadow-xs transition-colors"
                    >
                      Réévaluer (15 min)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Matrice des Lits & Corridor Ambulancier */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Live Hospital Bed Matrix */}
          <div className="bg-white rounded-2xl shadow-xs border border-[#ddc0bd]/40 p-5 sm:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#902e2a] text-[22px]">domain_verification</span>
                <h3 className="font-serif text-base font-bold text-[#171c23]">Lits Maternité & Réa SONUC</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#b1f0ce] text-[#002114] text-[10px] font-bold">
                Sync 1 min
              </span>
            </div>
            <p className="text-xs text-[#574240]">
              Télémétrie en temps réel des centres hospitaliers de référence pour Pikine.
            </p>

            {/* Structure 1: Dalal Jamm */}
            <div className="p-3.5 rounded-xl bg-[#f0f4fd] flex flex-col gap-2.5 border border-[#ddc0bd]/30">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#171c23]">Hôpital Dalal Jamm (Guédiawaye)</h4>
                  <span className="text-[10px] text-[#2c694e] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2c694e]"></span> Centre d'Excellence SONUC
                  </span>
                </div>
                <span className="text-[11px] text-[#574240] font-semibold">6.4 km (11 min)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-lg bg-white shadow-xs">
                  <span className="font-serif text-lg font-bold text-[#2c694e] block">03</span>
                  <span className="text-[10px] text-[#574240]">Lits Réa Maternelle</span>
                </div>
                <div className="p-2 rounded-lg bg-white shadow-xs">
                  <span className="font-serif text-lg font-bold text-[#2c694e] block">Bloc 1</span>
                  <span className="text-[10px] text-[#574240]">Césarienne Ouverte</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#574240] pt-1">
                <span>Régulateur : Dr. S. Ndiaye</span>
                <span className="text-[#2c694e] font-bold">Fluide / Accueil Validé</span>
              </div>
            </div>

            {/* Structure 2: Centre Dominique */}
            <div className="p-3.5 rounded-xl bg-[#f0f4fd] flex flex-col gap-2.5 border border-[#ddc0bd]/30">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#171c23]">Centre de Santé Dominique (Pikine)</h4>
                  <span className="text-[10px] text-[#2c694e] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2c694e]"></span> Plateau SONUB Avancé
                  </span>
                </div>
                <span className="text-[11px] text-[#574240] font-semibold">2.1 km (5 min)</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-lg bg-white shadow-xs">
                  <span className="font-serif text-lg font-bold text-[#2c694e] block">02</span>
                  <span className="text-[10px] text-[#574240]">Lits Travail Dispo</span>
                </div>
                <div className="p-2 rounded-lg bg-white shadow-xs">
                  <span className="font-serif text-lg font-bold text-[#171c23] block">Écho OK</span>
                  <span className="text-[10px] text-[#574240]">Sonde Doppler Actif</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#574240] pt-1">
                <span>Garde : SF Principal Kane</span>
                <span className="text-[#2c694e] font-bold">Disponible</span>
              </div>
            </div>

            {/* Structure 3: Hôpital National de Pikine */}
            <div className="p-3.5 rounded-xl bg-[#f0f4fd] opacity-80 flex flex-col gap-2 border border-[#ddc0bd]/30">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#171c23]">Hôpital National de Pikine</h4>
                  <span className="text-[10px] text-[#ba1a1a] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span> Triage Restreint
                  </span>
                </div>
                <span className="text-[11px] text-[#574240]">3.8 km (8 min)</span>
              </div>
              <div className="p-2 rounded-lg bg-[#ffdad6]/60 text-[#ba1a1a] text-center text-xs font-bold">
                Saturation Maternité : 0 Lit Disponible • Dérivation Préconisée
              </div>
            </div>
          </div>

          {/* Quick Corridor Card */}
          <div className="p-5 rounded-2xl bg-[#ffddb8]/30 border border-[#fcba67]/40 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-bold text-[#171c23]">Corridor Ambulancier Pikine</h3>
              <span className="material-symbols-outlined text-[#902e2a] text-[18px]">map</span>
            </div>
            <p className="text-xs text-[#574240]">
              Feux prioritaires actifs sur Route des Niayes en coordination avec la Brigade Routière.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#2c694e]">
              <span className="w-2 h-2 rounded-full bg-[#2c694e]"></span>
              <span>Circulation fluide vers Dalal Jamm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Déclenchement Évacuation */}
      {activeEvacModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full flex flex-col gap-4 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-[#ddc0bd]/40">
              <div className="flex items-center gap-2 text-[#ba1a1a]">
                <span className="material-symbols-outlined text-[24px]">ambulance</span>
                <h3 className="font-serif text-lg font-bold">Déclencher Évacuation SONUB / SONUC</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveEvacModal(false)}
                className="w-8 h-8 rounded-full bg-[#eaeef8] text-[#574240] flex items-center justify-center hover:bg-[#dee2ec]"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#574240]">
              Sélectionnez l'établissement de transfert cible et l'équipage médicalisé de départ.
            </p>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#171c23]">Établissement Cible :</label>
              <select className="p-2.5 rounded-xl border border-[#ddc0bd] text-xs font-semibold bg-[#f8f9ff]">
                <option>Hôpital Dalal Jamm (SONUC Réa - 03 lits dispo)</option>
                <option>Centre Dominique Pikine (SONUB - 02 lits dispo)</option>
                <option>Maternité Roi Baudouin (Guédiawaye)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#171c23]">Motif de Transfert :</label>
              <input
                type="text"
                defaultValue="Hémorragie du 3ème Trimestre / Pré-éclampsie"
                className="p-2.5 rounded-xl border border-[#ddc0bd] text-xs bg-[#f8f9ff]"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setActiveEvacModal(false)}
                className="px-4 py-2 rounded-xl bg-[#eaeef8] text-[#171c23] text-xs font-bold"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Évacuation confirmée ! Dispatch SAMU 1515 et corridor d'urgence alertés.");
                  setActiveEvacModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-[#ba1a1a] text-white text-xs font-bold shadow-xs hover:bg-[#93000a]"
              >
                Confirmer l'Évacuation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
