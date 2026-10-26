import React, { useState } from 'react';

export default function PregnancyCalculator({ onNavigateToTriage, onActionTrack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [calcTab, setCalcTab] = useState('ddr');
  const [folicChecked, setFolicChecked] = useState(true);
  const [ddrDate, setDdrDate] = useState('2025-10-15');
  const [isEditingDate, setIsEditingDate] = useState(false);

  const toggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const u = new SpeechSynthesisUtterance(
          "Asalaam alaykum. Saytul sa birr te nga topp sa ñeenti saytu CPN yi ci fajuwaay bi. Bul fatte jël sa garapu fer ak acide folique."
        );
        u.lang = 'fr-SN';
        u.rate = 0.9;
        u.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(u);
        setIsPlaying(true);
        if (onActionTrack) onActionTrack('audio_listen');
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          EN-TÊTE ULTRA-COMPACT (1 ligne sur grand écran)
          ========================================================================= */}
      <div className="mb-2 lg:mb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-b border-[#ddc0bd]/30 pb-1.5 lg:pb-2">
        <div className="flex items-center gap-2">
          <h1 className="text-base sm:text-lg lg:text-xl font-serif font-bold text-[#171c23] leading-tight">
            Suivi Prénatal &amp; Calendrier CPN
          </h1>
          <span className="hidden sm:inline text-xs text-[#574240]">
            • Protocole officiel Ministère de la Santé (Sénégal)
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="px-2 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] text-[10px] font-bold inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2c694e] animate-pulse"></span>
            Mode Hors-Ligne Prêt
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white text-[#902e2a] border border-[#ddc0bd]/50 text-[10px] font-bold shadow-xs">
            24 SA • 6ème mois
          </span>
        </div>
      </div>

      {/* =========================================================================
          GRILLE RESPONSIVE SANS SCROLL VERTICAL SUR BUREAU (12 colonnes)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 xl:gap-3 items-start">
        {/* =========================================================
            COLONNE GAUCHE (lg:col-span-7) : Suivi Gestationnel & CPN 1-4
            ========================================================= */}
        <div className="lg:col-span-7 flex flex-col gap-2 lg:gap-2.5">
          {/* LIGNE 1 : AUDIO WOLOF + GAUGE CIRCULAIRE 60% CÔTE À CÔTE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-2.5">
            {/* 1. ASSISTANCE VOCALE GUIDÉE & DATE */}
            <div
              className="rounded-xl p-3 shadow-xs relative overflow-hidden flex flex-col justify-between gap-2 border border-[#724600]/20"
              style={{ backgroundColor: '#ffddb8', color: '#2a1700' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ color: '#724600', fontVariationSettings: "'FILL' 1" }}
                  >
                    volume_up
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: '#724600' }}>
                    Assistance Vocale
                  </span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/90 text-[#2a1700] font-bold">
                  Wolof
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    aria-label="Lancer la lecture audio en Wolof"
                    onClick={toggleAudio}
                    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-xs active:scale-95 transition-transform shrink-0 ${
                      isPlaying ? 'animate-pulse' : ''
                    }`}
                    style={{ backgroundColor: isPlaying ? '#902e2a' : '#724600', color: '#ffffff' }}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px] text-white">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold font-serif truncate" style={{ color: '#2a1700' }}>
                      Déglul ci Wolof
                    </span>
                    <span className="text-[10px] opacity-80 truncate">
                      Explications du calendrier
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 h-6 px-2 shrink-0 rounded-full bg-white/70">
                  <span className={`w-1 h-2 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ backgroundColor: '#724600' }}></span>
                  <span className={`w-1 h-3 rounded-full ${isPlaying ? 'animate-bounce' : ''}`} style={{ backgroundColor: '#724600' }}></span>
                  <span className={`w-1 h-1.5 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ backgroundColor: '#724600' }}></span>
                  <span className="text-[9px] ml-0.5 font-bold" style={{ color: '#2a1700' }}>
                    {isPlaying ? 'En cours' : '01:45'}
                  </span>
                </div>
              </div>

              {/* Date sélecteur compact */}
              <div className="flex items-center justify-between bg-white/80 rounded-lg px-2.5 py-1 text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="material-symbols-outlined text-[#902e2a] text-[16px]">calendar_month</span>
                  <span className="text-[10px] text-[#574240] font-semibold truncate">
                    {calcTab === 'ddr' ? 'DDR' : 'DPA'} :
                  </span>
                  {isEditingDate ? (
                    <input
                      type="date"
                      value={ddrDate}
                      onChange={(e) => setDdrDate(e.target.value)}
                      className="text-[10px] font-bold text-[#171c23] bg-white px-1 py-0.2 rounded border border-[#902e2a]"
                    />
                  ) : (
                    <span className="text-[11px] text-[#171c23] font-bold font-serif truncate">
                      15 Octobre 2025
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsEditingDate(!isEditingDate)}
                  className="px-2 py-0.5 rounded-full bg-[#dee2ec] text-[#171c23] text-[9px] font-bold hover:bg-[#eaeef8]"
                  type="button"
                >
                  {isEditingDate ? 'OK' : 'Modifier'}
                </button>
              </div>
            </div>

            {/* 2. ÉTAT GESTATIONNEL ACTUEL (Jauge 60%) */}
            <div
              className="rounded-xl p-3 shadow-xs flex flex-col justify-between gap-2 border border-[#ffb3ac]/40"
              style={{ background: 'linear-gradient(135deg, #ffdad6 0%, #f0f4fd 100%)' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: '#902e2a' }}>
                    Stade gestationnel
                  </span>
                  <div className="text-base font-serif font-bold leading-tight" style={{ color: '#410003' }}>
                    24 SA (Semaines)
                  </div>
                </div>
                <div className="px-2 py-0.5 bg-white text-[#902e2a] rounded-full shadow-xs flex items-center gap-1 text-[10px] font-bold">
                  <span className="material-symbols-outlined text-[13px]">schedule</span>
                  <span>J - 112</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* SVG Cercle Jauge 60% compact */}
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 72 72">
                    <circle cx="36" cy="36" r="28" fill="transparent" stroke="#dee2ec" strokeWidth="6" />
                    <circle
                      cx="36"
                      cy="36"
                      r="28"
                      fill="transparent"
                      stroke="#902e2a"
                      strokeWidth="6"
                      strokeDasharray="175.9"
                      strokeDashoffset="70.36"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold font-serif" style={{ color: '#902e2a' }}>
                    60%
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#724600' }}>
                    Étape Fœtale
                  </span>
                  <p className="text-[11px] text-[#171c23] leading-tight">
                    Bébé pèse <span className="font-bold text-[#902e2a]">~600g</span>. Ses poumons se développent et il perçoit votre voix !
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white/80 rounded-lg px-2.5 py-0.5 text-[10px] gap-2">
                <span className="text-[#574240] font-medium truncate">Terme prévu (DPA) :</span>
                <span className="text-[#171c23] font-bold font-serif shrink-0">22 Juillet 2026</span>
              </div>
            </div>
          </div>

          {/* LIGNE 2 : LES 4 ÉTAPES CPN EN 4 COLONNES HORIZONTALES (SANS SCROLL) */}
          <div className="bg-white rounded-xl p-3 shadow-xs border border-[#ddc0bd]/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]" style={{ color: '#2c694e' }}>
                  verified
                </span>
                <span className="text-xs font-serif font-bold text-[#171c23]">
                  Consultations Prénatales (Protocole National CPN 1 à 4)
                </span>
              </div>
              <span className="text-[10px] text-[#574240] font-semibold">4 étapes clés</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {/* CPN 1 */}
              <div className="bg-[#f0f4fd] rounded-lg p-2 flex flex-col justify-between gap-1 border border-[#aeeecb]/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-serif text-[#171c23]">CPN 1</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#aeeecb] text-[#316e52]">
                    Validée
                  </span>
                </div>
                <span className="text-[10px] text-[#574240]">Avant 12 SA</span>
                <p className="text-[10px] text-[#171c23] leading-tight">Faite le 18 Nov 2025. Écho T1 conforme.</p>
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="text-[9px] font-bold inline-flex items-center gap-0.5 text-[#2c694e] mt-0.5"
                >
                  <span className="material-symbols-outlined text-[12px]">volume_up</span>
                  <span>Audio</span>
                </button>
              </div>

              {/* CPN 2 (Active) */}
              <div
                className="rounded-lg p-2 flex flex-col justify-between gap-1 border shadow-xs"
                style={{ backgroundColor: 'rgba(255, 218, 214, 0.45)', borderColor: '#902e2a' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-serif text-[#902e2a]">CPN 2</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#902e2a] text-white">
                    À faire
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#902e2a]">20 à 24 SA</span>
                <p className="text-[10px] text-[#171c23] leading-tight">Dépistage tension &amp; renouvellement Fer.</p>
                <button
                  type="button"
                  className="w-full py-1 rounded bg-[#902e2a] text-white text-[9px] font-bold flex items-center justify-center gap-1 shadow-xs active:scale-95"
                >
                  <span className="material-symbols-outlined text-[11px]">notifications_active</span>
                  <span>Rappel SMS</span>
                </button>
              </div>

              {/* CPN 3 */}
              <div className="bg-[#f0f4fd] rounded-lg p-2 flex flex-col justify-between gap-1 border border-[#dee2ec]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-serif text-[#171c23]">CPN 3</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#eaeef8] text-[#574240] font-medium">
                    À venir
                  </span>
                </div>
                <span className="text-[10px] text-[#574240]">28 à 32 SA</span>
                <p className="text-[10px] text-[#574240] leading-tight">Prévue autour du 14 Mai 2026.</p>
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="text-[9px] text-[#574240] hover:text-[#902e2a] inline-flex items-center gap-0.5 mt-0.5"
                >
                  <span className="material-symbols-outlined text-[12px]">volume_up</span>
                  <span>Audio</span>
                </button>
              </div>

              {/* CPN 4 */}
              <div className="bg-[#f0f4fd] rounded-lg p-2 flex flex-col justify-between gap-1 border border-[#dee2ec]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-serif text-[#171c23]">CPN 4</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#eaeef8] text-[#574240] font-medium">
                    Mois 9
                  </span>
                </div>
                <span className="text-[10px] text-[#574240]">36 à 38 SA</span>
                <p className="text-[10px] text-[#574240] leading-tight">Valise maternité &amp; préparation accouchement.</p>
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="text-[9px] text-[#574240] hover:text-[#902e2a] inline-flex items-center gap-0.5 mt-0.5"
                >
                  <span className="material-symbols-outlined text-[12px]">volume_up</span>
                  <span>Audio</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            COLONNE DROITE (lg:col-span-5) : Urgences, Sage-Femme & Nutrition
            ========================================================= */}
        <div className="lg:col-span-5 flex flex-col gap-2 lg:gap-2.5">
          {/* CARTE D'URGENCE COMPACTE SAMU 1515 + RACCOURCIS */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            {/* SAMU Direct */}
            <div
              className="sm:col-span-7 rounded-xl p-2.5 text-white flex flex-col justify-between gap-1.5 shadow-xs"
              style={{ backgroundColor: '#ba1a1a' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] animate-bounce">e911_emergency</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">SAMU Sénégal</span>
                </div>
                <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[9px] font-bold">24/7 Gratuit</span>
              </div>
              <a
                href="tel:1515"
                className="w-full py-1.5 rounded-lg bg-white text-[#ba1a1a] font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#f0f4fd] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>APPELER LE 1515</span>
              </a>
            </div>

            {/* USSD *1515# & WhatsApp */}
            <div className="sm:col-span-5 grid grid-cols-2 gap-1.5">
              <a
                href="tel:*1515%23"
                className="bg-white border border-[#ddc0bd]/40 rounded-xl p-1.5 flex flex-col items-center justify-center text-center shadow-xs hover:bg-[#f0f4fd]"
              >
                <span className="text-[9px] font-bold text-[#2c694e] uppercase leading-none">USSD</span>
                <span className="text-xs font-bold text-[#171c23]">*1515#</span>
                <span className="text-[8px] text-[#574240]">Sans net</span>
              </a>

              <a
                href="https://wa.me/221770000000?text=Bonjour%20SuturaSante"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-[#ddc0bd]/40 rounded-xl p-1.5 flex flex-col items-center justify-center text-center shadow-xs hover:bg-[#f0f4fd]"
              >
                <span className="text-[9px] font-bold text-[#2c694e] uppercase leading-none">WhatsApp</span>
                <span className="text-xs font-bold text-[#171c23]">Audio</span>
                <span className="text-[8px] text-[#574240]">24h/24</span>
              </a>
            </div>
          </div>

          {/* CONSEIL DE LA SAGE-FEMME AVEC PHOTO SÉNÉGALAISE (HORIZONTALE SUR DESKTOP) */}
          <div className="bg-white rounded-xl overflow-hidden border border-[#ddc0bd]/40 shadow-xs flex items-center gap-2.5 p-2">
            <img
              className="w-20 sm:w-24 h-16 sm:h-20 rounded-lg object-cover shrink-0"
              alt="Mère sénégalaise épanouie à Dakar"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCeg2rd31C_5hdpqvP-vCBNIid_vP6FlVqjLyx14gqNl52MQHq3qQv_crrjuuOE1e2CEAkR-fYQT-fK5eOWBWPEMWh9axyzn5wnn6hc8R9mICKlmCW-KT6pvwrXOVP6FAwCHoL9z-oNSkLg6b-01jcNx0ne7P9VKsWeMwY_qtKIUsOycm2DN0P-LYYmsf99TGuJIwCz-yDawYUopu3sneOpJYr_c1QV9JRt0BPnuE"
            />
            <div className="flex flex-col min-w-0 justify-center">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#902e2a]">
                Conseil de la Sage-Femme
              </span>
              <p className="text-[11px] font-serif italic text-[#171c23] leading-snug line-clamp-2 mt-0.5">
                « Parlez régulièrement au bébé. Les voix douces de la famille renforcent le lien d'attachement avant l'arrivée. »
              </p>
              <span className="text-[9px] text-[#574240]">Pratique recommandée Ministère Santé</span>
            </div>
          </div>

          {/* NUTRITION & FER/FOLIQUE + TRIAGE RAPIDE */}
          <div className="bg-white rounded-xl p-2.5 shadow-xs border border-[#ddc0bd]/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label
                onClick={() => setFolicChecked(!folicChecked)}
                className="flex items-center gap-2 cursor-pointer select-none min-w-0"
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                    folicChecked ? 'bg-[#2c694e] text-white' : 'border-2 border-[#8a716f] bg-white'
                  }`}
                >
                  {folicChecked && <span className="material-symbols-outlined text-[13px]">check</span>}
                </div>
                <span className="text-xs text-[#171c23] font-bold truncate">
                  Fer &amp; Acide Folique pris ?
                </span>
              </label>

              <button
                type="button"
                onClick={toggleAudio}
                className="text-[10px] inline-flex items-center gap-0.5 font-bold text-[#2c694e] shrink-0"
              >
                <span className="material-symbols-outlined text-[14px]">volume_up</span>
                <span>Wolof</span>
              </button>
            </div>

            {/* Auto-évaluation triage raccourci */}
            <div
              onClick={onNavigateToTriage}
              className="bg-[#f0f4fd] hover:bg-[#eaeef8] rounded-lg p-2 flex items-center justify-between cursor-pointer transition-all border border-[#ddc0bd]/30"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">health_and_safety</span>
                <span className="text-xs font-bold text-[#171c23] truncate">
                  Un doute ou une douleur ? Triage en 1 min
                </span>
              </div>
              <span className="material-symbols-outlined text-[#574240] text-[16px]">arrow_forward</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}