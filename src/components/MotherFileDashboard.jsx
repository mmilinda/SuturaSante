import React, { useState } from 'react';

export default function MotherFileDashboard({ lang = 'wo', onActionTrack }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [privacyMasked, setPrivacyMasked] = useState(true);

  const handlePlayMediation = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      if (onActionTrack) onActionTrack('audio_listen');
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const text = "Naka ngay laajé jiggéen ji ci sutura te bañ koo yëkkëti baat ci kër ga. Yàlla na jàmm sax.";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'wo';
        utterance.rate = 0.9;
        utterance.onend = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Command Ribbon & Patient Identification Bar */}
      <section className="w-full px-5 sm:px-6 py-4 bg-white rounded-2xl shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
        {/* Breadcrumb & Primary Operational Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[#574240] text-xs font-semibold flex-wrap">
            <span className="flex items-center gap-1 hover:text-[#902e2a] cursor-pointer transition-colors">
              <span className="material-symbols-outlined text-[16px]">folder_shared</span>
              Dossier Mères
            </span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Admission & Suivi Terrain</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="font-serif text-sm font-bold text-[#171c23]">Fiche #DK-PK-2026-0842</span>
            <span className="px-2 py-0.5 rounded-full bg-[#eaeef8] text-[#171c23] text-[11px] font-bold">
              {privacyMasked ? "Patiente #0842 (Coumba)" : "Aïssatou 'Coumba' Diallo"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => alert("Impression du volet carnet CPN...")}
              className="px-3 py-1.5 rounded-xl bg-[#eaeef8] text-[#171c23] text-xs font-bold flex items-center gap-1.5 hover:bg-[#dee2ec] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Imprimer Volet Carnet</span>
            </button>
            <button
              type="button"
              onClick={() => alert("Garde transférée à la sage-femme de permanence.")}
              className="px-3 py-1.5 rounded-xl bg-[#eaeef8] text-[#2c694e] text-xs font-bold flex items-center gap-1.5 hover:bg-[#dee2ec] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">transfer_within_a_station</span>
              <span>Transférer Garde</span>
            </button>
            <a
              href="tel:1515"
              className="px-3 py-1.5 rounded-xl bg-[#ba1a1a] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-[#93000a] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
              <span>SAMU 1515</span>
            </a>
            <button
              type="button"
              onClick={() => alert("Dossier sauvegardé avec chiffrement local AES-GCM.")}
              className="px-4 py-1.5 rounded-xl bg-[#902e2a] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs hover:bg-[#b0453f] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>Enregistrer</span>
            </button>
          </div>
        </div>

        {/* Security & Protocol Chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#eaeef8]">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#aeeecb] text-[#316e52] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              <span>Synchronisé local (AES-GCM 256-bit chiffré)</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaeef8] text-[#171c23] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px] text-[#2c694e]">verified</span>
              <span>Badge UNICEF DPG Validé</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>CPN 1 en retard (+14 jours)</span>
            </div>
          </div>
          <span className="text-[11px] text-[#574240] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">pin_drop</span>
            Poste Pikine Icotaf • Registre Numérisé
          </span>
        </div>
      </section>

      {/* High-Density Clinical Summary Ribbon (Bento Hero) */}
      <section className="w-full bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col xl:flex-row items-stretch gap-6">
        {/* Patient Identity Column */}
        <div className="flex items-center gap-4 min-w-[260px]">
          <div className="w-16 h-16 rounded-2xl bg-[#902e2a] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-xs shrink-0">
            AD
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg font-bold text-[#171c23]">
                {privacyMasked ? "Patiente #DK-PK-0842" : "Aïssatou Diallo"}
              </h2>
              <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#902e2a] text-[10px] font-bold">
                Coumba
              </span>
            </div>
            <span className="text-xs text-[#574240]">22 ans • Primigeste G2P1</span>
            <span className="text-[11px] text-[#574240] flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[14px] text-[#902e2a]">home_pin</span>
              Tally Bou Mack (Pikine Secteur 4)
            </span>
          </div>
        </div>

        {/* Quick Biometric & Obstetric Indicators */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Gestational Age */}
          <div className="flex flex-col justify-between p-3 rounded-xl bg-[#f0f4fd]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#574240]">Âge Gestationnel</span>
              <span className="material-symbols-outlined text-[#902e2a] text-[16px]">pregnant_woman</span>
            </div>
            <div>
              <div className="font-serif text-xl font-bold text-[#902e2a]">14 SA + 2j</div>
              <div className="text-[11px] text-[#574240]">4ème mois de grossesse</div>
            </div>
            <span className="text-[10px] text-[#8a716f] font-semibold">DDR: 01 Octobre 2024</span>
          </div>

          {/* Term Date */}
          <div className="flex flex-col justify-between p-3 rounded-xl bg-[#f0f4fd]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#574240]">Terme Prévu</span>
              <span className="material-symbols-outlined text-[#2c694e] text-[16px]">event_seat</span>
            </div>
            <div>
              <div className="font-serif text-xl font-bold text-[#171c23]">18 Oct 2026</div>
              <div className="text-[11px] text-[#2c694e] font-semibold">Maternité Dalal Jamm</div>
            </div>
            <span className="text-[10px] text-[#574240]">26 semaines restantes</span>
          </div>

          {/* CPN Status */}
          <div className="flex flex-col justify-between p-3 rounded-xl bg-[#ffdad6]/40">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#ba1a1a]">Statut CPN 1</span>
              <span className="material-symbols-outlined text-[#ba1a1a] text-[16px]">warning</span>
            </div>
            <div>
              <div className="font-serif text-xl font-bold text-[#ba1a1a]">En Retard</div>
              <div className="text-[11px] text-[#ba1a1a] font-semibold">+14 jours de latence</div>
            </div>
            <span className="text-[10px] text-[#ba1a1a] font-bold">Relance terrain active</span>
          </div>

          {/* Badien Gox */}
          <div className="flex flex-col justify-between p-3 rounded-xl bg-[#f0f4fd]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#574240]">Badien Dédiée</span>
              <span className="material-symbols-outlined text-[#724600] text-[16px]">diversity_1</span>
            </div>
            <div>
              <div className="font-serif text-base font-bold text-[#171c23]">Fatou Ndiaye</div>
              <div className="text-[11px] text-[#574240]">Poste Icotaf • Équipe Ouest</div>
            </div>
            <span className="text-[10px] text-[#2c694e] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2c694e]"></span> Passage prévu à J+3
            </span>
          </div>
        </div>

        {/* Integrated Audio Capsule */}
        <div className="w-full xl:w-72 flex flex-col justify-between p-3.5 rounded-xl bg-[#ffddb8]/40 border border-[#fcba67]/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#724600] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">hearing</span>
              </div>
              <span className="text-xs font-bold text-[#2a1700]">Guidance Audio Wolof</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#171c23]">WO</span>
          </div>
          <p className="text-xs text-[#574240] italic line-clamp-2 my-1">
            "Naka ngay laajé jiggéen ji ci sutura te bañ koo yëkkëti baat ci kër ga."
          </p>
          <button
            type="button"
            onClick={handlePlayMediation}
            className="w-full py-1.5 rounded-lg bg-[#724600] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#905d10] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isPlayingAudio ? 'pause' : 'play_arrow'}
            </span>
            <span>{isPlayingAudio ? 'Pause' : 'Écouter Consigne'}</span>
          </button>
        </div>
      </section>

      {/* Two-Column Workstation */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Identité & Intimité Sutura */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#ddc0bd]/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#902e2a] text-[20px]">privacy_tip</span>
                <h3 className="font-serif text-base font-bold text-[#171c23]">Identité & Sutura Locale</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#b1f0ce] text-[#002114] text-[10px] font-bold">
                Protégé
              </span>
            </div>

            {/* Privacy Shield Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#f0f4fd]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#902e2a] text-[20px]">visibility_off</span>
                <div>
                  <span className="text-xs font-bold text-[#171c23] block">Masquage dans le registre public</span>
                  <span className="text-[10px] text-[#574240]">Le surnom 'Coumba' est visible uniquement par la Badien Gox</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={privacyMasked}
                onChange={(e) => setPrivacyMasked(e.target.checked)}
                className="w-5 h-5 accent-[#902e2a] cursor-pointer"
              />
            </div>

            {/* Repérage Sutura sans GPS */}
            <div className="p-3.5 rounded-xl bg-[#f0f4fd] flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-bold text-[#574240]">Repérage Communautaire Sutura (Zéro GPS)</span>
              <p className="text-xs text-[#171c23] font-medium italic">
                "Pikine Tally Bou Mack, Concession Ndiaye - 3ème grande porte en fer vert à droite après le kiosque Sen-Eau."
              </p>
              <span className="text-[10px] text-[#2c694e] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Validé par la Badien Gox lors de la visite exploratoire
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Calendrier CPN Protocole Sénégal OMS */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#ddc0bd]/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#902e2a] text-[20px]">event_repeat</span>
                <h3 className="font-serif text-base font-bold text-[#171c23]">
                  Calendrier CPN Sénégal (Protocole OMS)
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#902e2a] text-[10px] font-bold">
                14 SA en cours
              </span>
            </div>

            {/* 4 Jalons OMS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#ffdad6]/30 border border-[#ba1a1a]/40 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#ba1a1a]">CPN 1 (&lt; 12 SA)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-pulse"></span>
                </div>
                <span className="font-serif text-sm font-bold text-[#171c23]">14 SA Actuel - Rattrapage</span>
                <p className="text-[11px] text-[#574240]">Bilan TPI 1, Fer/Folates, Échographie T1</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f0f4fd] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#574240]">CPN 2 (20-24 SA)</span>
                  <span className="text-[10px] text-[#574240]">Prévu</span>
                </div>
                <span className="font-serif text-sm font-bold text-[#171c23]">Mi-Juin 2026</span>
                <p className="text-[11px] text-[#574240]">Vaccin antitétanique VAT 2, Dépistage diabète</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f0f4fd] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#574240]">CPN 3 (28-32 SA)</span>
                  <span className="text-[10px] text-[#574240]">Prévu</span>
                </div>
                <span className="font-serif text-sm font-bold text-[#171c23]">Début Août 2026</span>
                <p className="text-[11px] text-[#574240]">Écho morphologique T3, Recherche anémie</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f0f4fd] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#574240]">CPN 4 (36-40 SA)</span>
                  <span className="text-[10px] text-[#574240]">Prévu</span>
                </div>
                <span className="font-serif text-sm font-bold text-[#171c23]">Fin Septembre 2026</span>
                <p className="text-[11px] text-[#574240]">Plan d'accouchement, Kit d'urgence maternité</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
