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
      {/* Titre et Contexte d'écran responsive */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ddc0bd]/30 pb-3 sm:pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#171c23] leading-tight">
            Suivi Prénatal &amp; Calendrier CPN
          </h1>
          <p className="text-xs sm:text-sm text-[#574240] mt-0.5">
            Calculateur obstétrical conforme au protocole du Ministère de la Santé du Sénégal.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#aeeecb] text-[#316e52] text-[10px] sm:text-xs font-bold inline-flex items-center gap-1 shadow-xs">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#2c694e] animate-pulse"></span>
            Mode Hors-Ligne Prêt
          </span>
          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white text-[#902e2a] border border-[#ddc0bd]/50 text-[10px] sm:text-xs font-bold shadow-xs">
            24 SA • 6ème mois
          </span>
        </div>
      </div>

      {/* GRILLE RESPONSIVE : Mobile (1 col) -> Tablette (1 col ou 2 cols) -> Bureau (12 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* =========================================================
            COLONNE PRINCIPALE (lg:col-span-7)
            ========================================================= */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6">
          {/* 1. ASSISTANCE VOCALE GUIDÉE */}
          <div
            className="w-full rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden flex flex-col gap-2.5"
            style={{ backgroundColor: '#ffddb8', color: '#2a1700' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span
                  className="material-symbols-outlined text-[20px] sm:text-[24px]"
                  style={{ color: '#724600', fontVariationSettings: "'FILL' 1" }}
                >
                  volume_up
                </span>
                <span
                  className="text-[10px] sm:text-xs uppercase tracking-wider font-bold"
                  style={{ color: '#724600' }}
                >
                  Assistance Vocale Guidée
                </span>
              </div>
              <span
                className="text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold shadow-xs"
                style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#2a1700' }}
              >
                Wolof / FR
              </span>
            </div>

            <div className="flex items-center justify-between gap-2.5 pt-1">
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <button
                  aria-label="Lancer la lecture audio en Wolof"
                  onClick={toggleAudio}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform shrink-0 ${
                    isPlaying ? 'animate-pulse' : ''
                  }`}
                  style={{
                    backgroundColor: isPlaying ? '#902e2a' : '#724600',
                    color: '#ffffff',
                  }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[28px] sm:text-[32px] text-white">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <div className="flex flex-col min-w-0">
                  <span className="text-base sm:text-lg truncate leading-tight font-bold font-serif" style={{ color: '#2a1700' }}>
                    Déglul ci Wolof
                  </span>
                  <span className="text-xs sm:text-sm opacity-80 truncate">
                    Explications du calendrier et de votre stade
                  </span>
                </div>
              </div>

              <div
                className="flex items-center gap-1 sm:gap-1.5 h-8 sm:h-9 px-2.5 sm:px-3 shrink-0 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
              >
                <span className={`w-1 sm:w-1.5 h-3 sm:h-3.5 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ backgroundColor: '#724600' }}></span>
                <span className={`w-1 sm:w-1.5 h-4 sm:h-5 rounded-full ${isPlaying ? 'animate-bounce' : ''}`} style={{ backgroundColor: '#724600' }}></span>
                <span className={`w-1 sm:w-1.5 h-2 sm:h-2.5 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ backgroundColor: '#724600' }}></span>
                <span className="text-[10px] sm:text-xs ml-1 font-bold" style={{ color: '#2a1700' }}>
                  {isPlaying ? 'En cours' : '01:45'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. CALCULATEUR DDR / DPA & JAUGE GESTATIONNELLE */}
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col gap-4 sm:gap-5 border border-[#ddc0bd]/30">
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {/* Onglets DDR / DPA */}
              <div className="flex bg-[#eaeef8] rounded-xl p-1 w-full justify-between" role="tablist">
                <button
                  onClick={() => setCalcTab('ddr')}
                  className={`flex-1 min-h-[38px] sm:min-h-[42px] py-1.5 px-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center ${
                    calcTab === 'ddr'
                      ? 'bg-white text-[#902e2a] shadow-xs'
                      : 'text-[#574240] hover:text-[#171c23]'
                  }`}
                  type="button"
                >
                  DDR (Dernières Règles)
                </button>
                <button
                  onClick={() => setCalcTab('dpa')}
                  className={`flex-1 min-h-[38px] sm:min-h-[42px] py-1.5 px-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center ${
                    calcTab === 'dpa'
                      ? 'bg-white text-[#902e2a] shadow-xs'
                      : 'text-[#574240] hover:text-[#171c23]'
                  }`}
                  type="button"
                >
                  DPA (Terme Prévu)
                </button>
              </div>

              {/* Date enregistrée */}
              <div className="flex items-center justify-between bg-[#f0f4fd] rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <span className="material-symbols-outlined text-[#902e2a] text-[22px] sm:text-[26px] shrink-0">calendar_month</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] sm:text-xs text-[#574240] font-semibold truncate">
                      Date ({calcTab === 'ddr' ? 'DDR' : 'DPA'})
                    </span>
                    {isEditingDate ? (
                      <input
                        type="date"
                        value={ddrDate}
                        onChange={(e) => setDdrDate(e.target.value)}
                        className="text-xs sm:text-base font-bold text-[#171c23] bg-white px-2 py-0.5 rounded border border-[#902e2a]"
                      />
                    ) : (
                      <span className="text-base sm:text-lg text-[#171c23] font-bold font-serif truncate">
                        15 Octobre 2025
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsEditingDate(!isEditingDate)}
                  className="min-h-[36px] sm:min-h-[40px] px-3 sm:px-4 py-1 rounded-full bg-[#dee2ec] text-[#171c23] text-xs font-bold hover:bg-[#eaeef8] transition-colors shrink-0 ml-2"
                  type="button"
                >
                  {isEditingDate ? 'Valider' : 'Modifier'}
                </button>
              </div>
            </div>

            {/* CARTE ÉTAT GESTATIONNEL STITCH EXACT */}
            <div
              className="relative rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 sm:gap-4 overflow-hidden shadow-xs border border-[#ffb3ac]/40"
              style={{
                background: 'linear-gradient(135deg, #ffdad6 0%, #f0f4fd 100%)',
              }}
            >
              <div className="flex items-start justify-between z-10 gap-2">
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider" style={{ color: '#902e2a' }}>
                    État gestationnel actuel
                  </span>
                  <span className="text-xl sm:text-2xl font-serif font-bold leading-tight mt-0.5" style={{ color: '#410003' }}>
                    24 SA (Semaines)
                  </span>
                  <span className="text-xs sm:text-sm text-[#574240] font-semibold">
                    6ème mois • 2ème Trimestre
                  </span>
                </div>
                <div className="px-3 sm:px-4 py-1.5 bg-white text-[#902e2a] rounded-full shadow-xs flex items-center gap-1.5 text-xs font-bold shrink-0">
                  <span className="material-symbols-outlined text-[16px] sm:text-[18px]">schedule</span>
                  <span>J - 112</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 sm:gap-5 mt-1 z-10">
                {/* Jauge circulaire SVG 60% */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 72 72">
                    <circle
                      cx="36"
                      cy="36"
                      r="30"
                      fill="transparent"
                      stroke="#dee2ec"
                      strokeWidth="7"
                    />
                    <circle
                      cx="36"
                      cy="36"
                      r="30"
                      fill="transparent"
                      stroke="#902e2a"
                      strokeWidth="7"
                      strokeDasharray="188.5"
                      strokeDashoffset="75.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold font-serif" style={{ color: '#902e2a' }}>
                      60%
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-1" style={{ color: '#724600' }}>
                    <span className="material-symbols-outlined text-[18px] sm:text-[20px]">hearing</span>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Étape Fœtale</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#171c23] mt-1 leading-snug">
                    Bébé pèse environ <span className="font-bold text-[#902e2a]">600g</span>, ses poumons se développent et il perçoit votre voix !
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white/80 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 mt-1 z-10 gap-2">
                <span className="text-[11px] sm:text-xs text-[#574240] font-medium truncate">
                  Terme d'accouchement prévu (DPA) :
                </span>
                <span className="text-xs sm:text-sm text-[#171c23] font-bold font-serif shrink-0">
                  22 Juillet 2026
                </span>
              </div>
            </div>
          </div>

          {/* 3. CHRONOLOGIE CPN OFFICIELLE MINISTÈRE SANTÉ SÉNÉGAL */}
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col gap-4 border border-[#ddc0bd]/30">
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <span className="text-lg sm:text-xl text-[#171c23] font-bold font-serif">
                  Consultations Prénatales (CPN)
                </span>
                <span className="text-[11px] sm:text-xs text-[#574240]">
                  Protocole officiel national en 4 étapes clés (Ministère de la Santé)
                </span>
              </div>
              <span className="material-symbols-outlined text-[24px] sm:text-[28px] shrink-0" style={{ color: '#2c694e' }}>
                verified
              </span>
            </div>

            <div className="flex flex-col gap-3.5 sm:gap-4 relative">
              {/* CPN 1 - Validée */}
              <div className="flex items-start gap-3 sm:gap-4 relative">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: '#2c694e', color: '#ffffff' }}
                  >
                    <span className="material-symbols-outlined text-[18px] sm:text-[20px]">check</span>
                  </div>
                  <div className="w-0.5 h-full bg-[#aeeecb] mt-1.5"></div>
                </div>
                <div className="flex-1 bg-[#f0f4fd] rounded-xl p-3 sm:p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base text-[#171c23] font-bold font-serif">CPN 1</span>
                      <span className="text-xs text-[#574240]">Avant 12 SA</span>
                    </div>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
                    >
                      Validée
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#171c23]">
                    Effectuée avec succès le 18 Novembre 2025.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[#574240] bg-[#eaeef8] rounded-lg p-2 sm:p-2.5 text-xs gap-1">
                    <span>Bilan sanguin &amp; Échographie T1 conformes</span>
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className="font-bold inline-flex items-center gap-1 self-start sm:self-auto"
                      style={{ color: '#2c694e' }}
                    >
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                      <span>Audio</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* CPN 2 - À planifier (Active & Terracotta) */}
              <div className="flex items-start gap-3 sm:gap-4 relative">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-sm animate-pulse"
                    style={{ backgroundColor: '#902e2a', color: '#ffffff' }}
                  >
                    <span className="material-symbols-outlined text-[18px] sm:text-[20px]">event_note</span>
                  </div>
                  <div className="w-0.5 h-full bg-[#dee2ec] mt-1.5"></div>
                </div>
                <div
                  className="flex-1 rounded-xl p-3.5 sm:p-4 flex flex-col gap-2.5 border shadow-xs"
                  style={{
                    backgroundColor: 'rgba(255, 218, 214, 0.45)',
                    borderColor: 'rgba(144, 46, 42, 0.3)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-bold font-serif" style={{ color: '#902e2a' }}>
                        CPN 2
                      </span>
                      <span className="text-xs font-bold" style={{ color: '#902e2a' }}>
                        20 à 24 SA
                      </span>
                    </div>
                    <span
                      className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold shadow-xs text-white"
                      style={{ backgroundColor: '#902e2a' }}
                    >
                      À planifier
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#171c23] font-medium leading-relaxed">
                    Recommandée cette semaine. Dépistage diabète gestationnel, contrôle de la tension &amp; renouvellement Fer/Folique.
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                    <button
                      type="button"
                      className="flex-1 min-h-[42px] sm:min-h-[44px] py-2 px-3 sm:px-4 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
                      style={{ backgroundColor: '#902e2a' }}
                    >
                      <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                      <span>Rappel SMS / WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className="min-h-[42px] sm:min-h-[44px] px-3 sm:px-4 rounded-xl bg-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs border hover:bg-[#f0f4fd] transition-colors"
                      style={{ color: '#902e2a', borderColor: 'rgba(144, 46, 42, 0.3)' }}
                    >
                      <span className="material-symbols-outlined text-[18px]">volume_up</span>
                      <span>Audio Wolof</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* CPN 3 - À venir */}
              <div className="flex items-start gap-3 sm:gap-4 relative">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#dee2ec] text-[#574240] flex items-center justify-center font-bold text-xs sm:text-sm">
                    3
                  </div>
                  <div className="w-0.5 h-full bg-[#eaeef8] mt-1.5"></div>
                </div>
                <div className="flex-1 bg-[#f0f4fd] rounded-xl p-3 sm:p-4 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base text-[#171c23] font-bold font-serif">CPN 3</span>
                      <span className="text-xs text-[#574240]">28 à 32 SA</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#eaeef8] text-[#574240] text-xs font-medium">
                      À venir
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#574240]">Prévue autour du 14 Mai 2026</span>
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className="text-[#574240] hover:text-[#902e2a] text-xs inline-flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                      <span>Audio</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* CPN 4 - Dernier mois */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#dee2ec] text-[#574240] flex items-center justify-center font-bold text-xs sm:text-sm">
                    4
                  </div>
                </div>
                <div className="flex-1 bg-[#f0f4fd] rounded-xl p-3 sm:p-4 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base text-[#171c23] font-bold font-serif">CPN 4</span>
                      <span className="text-xs text-[#574240]">36 à 38 SA</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#eaeef8] text-[#574240] text-xs font-medium">
                      Dernier mois
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-[#574240]">
                      Préparation accouchement &amp; valise maternité
                    </span>
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className="text-[#574240] hover:text-[#902e2a] text-xs inline-flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                      <span>Audio</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            COLONNE SECONDAIRE (lg:col-span-5) : Urgences, Nutrition & Conseils
            ========================================================= */}
        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
          {/* CARTE D'APPEL DIRECT SAMU 1515 */}
          <div
            className="w-full rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col gap-3 text-white border"
            style={{ backgroundColor: '#ba1a1a', borderColor: '#93000a' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] sm:text-[24px] animate-bounce">e911_emergency</span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Urgence Vitale 24/7</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">Gratuit</span>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white">SAMU Sénégal 1515</h3>
              <p className="text-xs text-white/90 mt-0.5 leading-snug">
                En cas de perte de sang, forte fièvre ou maux de tête violents, contactez directement le SAMU sans frais.
              </p>
            </div>
            <a
              href="tel:1515"
              className="w-full min-h-[44px] sm:min-h-[46px] rounded-xl bg-white text-[#ba1a1a] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#f0f4fd] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">call</span>
              <span>APPELER LE 1515 MAINTENANT</span>
            </a>
          </div>

          {/* RACCOURCIS USSD & WHATSAPP AUDIO (Responsive: 1 col sur mobile < 380px, 2 cols sur mobile > 380px et desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <a
              href="tel:*1515%23"
              className="bg-white border border-[#ddc0bd]/40 rounded-2xl p-3.5 sm:p-4 flex items-center sm:flex-col sm:items-start gap-3 sm:gap-2 shadow-xs hover:bg-[#f0f4fd] transition-colors active:scale-[0.98]"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[22px]">dialpad</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-[0.6875rem] font-bold uppercase tracking-wide" style={{ color: '#2c694e' }}>
                  Passerelle USSD
                </span>
                <span className="text-base sm:text-lg font-bold text-[#171c23] leading-tight">*1515#</span>
                <span className="text-[11px] text-[#574240]">Sans Internet</span>
              </div>
            </a>

            <a
              href="https://wa.me/221770000000?text=Bonjour%20SuturaSante"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[#ddc0bd]/40 rounded-2xl p-3.5 sm:p-4 flex items-center sm:flex-col sm:items-start gap-3 sm:gap-2 shadow-xs hover:bg-[#f0f4fd] transition-colors active:scale-[0.98]"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#2c694e', color: '#ffffff' }}
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[22px]">forum</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-[0.6875rem] font-bold uppercase tracking-wide" style={{ color: '#2c694e' }}>
                  WhatsApp Audio
                </span>
                <span className="text-base sm:text-lg font-bold text-[#171c23] leading-tight">Vocaux 24/7</span>
                <span className="text-[11px] text-[#574240]">Conseillère santé</span>
              </div>
            </a>
          </div>

          {/* CONSEIL DE LA SAGE-FEMME AVEC PHOTO SÉNÉGALAISE */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#ddc0bd]/40 shadow-sm flex flex-col">
            <div className="w-full h-48 sm:h-56 overflow-hidden relative">
              <img
                className="w-full h-full object-cover object-center"
                alt="Mère sénégalaise épanouie à Dakar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCeg2rd31C_5hdpqvP-vCBNIid_vP6FlVqjLyx14gqNl52MQHq3qQv_crrjuuOE1e2CEAkR-fYQT-fK5eOWBWPEMWh9axyzn5wnn6hc8R9mICKlmCW-KT6pvwrXOVP6FAwCHoL9z-oNSkLg6b-01jcNx0ne7P9VKsWeMwY_qtKIUsOycm2DN0P-LYYmsf99TGuJIwCz-yDawYUopu3sneOpJYr_c1QV9JRt0BPnuE"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4">
                <span className="px-3 py-1 rounded-full bg-white/95 text-[#902e2a] text-[11px] font-bold uppercase tracking-wider shadow-xs">
                  Conseil de la Sage-Femme
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-1.5">
              <p className="text-xs sm:text-sm font-serif italic text-[#171c23] leading-relaxed">
                « Parlez régulièrement au bébé. Les voix douces de la famille renforcent le lien d'attachement avant l'arrivée. »
              </p>
              <span className="text-[11px] text-[#574240] font-medium">
                Pratique recommandée par les sages-femmes du Ministère de la Santé
              </span>
            </div>
          </div>

          {/* COMPLÉMENTS & NUTRITION LOCALE SÉNÉGALAISE */}
          <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col gap-3.5 sm:gap-4 border border-[#ddc0bd]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] sm:text-[24px]" style={{ color: '#2c694e' }}>
                  medication
                </span>
                <span className="text-base text-[#171c23] font-bold font-serif">
                  Compléments &amp; Nutrition
                </span>
              </div>
              <button
                type="button"
                onClick={toggleAudio}
                className="text-xs inline-flex items-center gap-1 font-bold"
                style={{ color: '#2c694e' }}
              >
                <span className="material-symbols-outlined text-[16px]">volume_up</span>
                <span>Wolof</span>
              </button>
            </div>

            {/* Case à cocher Fer & Acide Folique */}
            <label
              onClick={() => setFolicChecked(!folicChecked)}
              className="flex items-center justify-between bg-[#f0f4fd] rounded-xl p-3 sm:p-3.5 cursor-pointer select-none hover:bg-[#eaeef8] transition-colors min-h-[52px]"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center shrink-0 transition-colors ${
                    folicChecked ? 'bg-[#2c694e] text-white' : 'border-2 border-[#8a716f] bg-white'
                  }`}
                >
                  {folicChecked && <span className="material-symbols-outlined text-[16px] sm:text-[18px]">check</span>}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm text-[#171c23] font-bold leading-tight">
                    Fer &amp; Acide Folique pris aujourd'hui ?
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#574240] mt-0.5 truncate">
                    Indispensable contre l'anémie
                  </span>
                </div>
              </div>
              <span
                className="material-symbols-outlined text-[20px] sm:text-[24px] shrink-0 ml-1"
                style={{ color: '#2c694e', fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </label>

            {/* Alliés naturels : Moringa & Bissap */}
            <div className="flex items-center gap-3 bg-[#f0f4fd] rounded-xl p-3 sm:p-3.5 border border-[#ddc0bd]/20">
              <img
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0 shadow-xs"
                alt="Moringa et Bissap sénégalais"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHCoABKs967FWzDGsYxNhzIPUuo7vX4EHkZx9ZmkpF61Y1pqqFwXdZDcpa5Ces2_VV9M2lIMZnONbSlGCQFqfPRwbfBg1bq2oK56w-Zh2kRsgc79n6OV6mpHDObe2Xfuu0EbxJlXpL-LKzyDfFIk2A_vaVav3MD0fL971JsUy1GCpkVz0HqbvQtLtvkHqSbd9Z_okvp1x_F5tYJcLrJ440Qr0VoCiPDbHAlHH6Dig"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold" style={{ color: '#724600' }}>
                  Alliés naturels : Moringa &amp; Bissap
                </span>
                <span className="text-xs text-[#574240] leading-snug mt-0.5">
                  Ajoutez du Moringa (Nebeday) à vos repas et buvez du jus de bouye frais pour l'énergie.
                </span>
              </div>
            </div>
          </div>

          {/* BANNIÈRE AUTO-ÉVALUATION TRIAGE */}
          <div
            onClick={onNavigateToTriage}
            className="w-full bg-[#f0f4fd] hover:bg-[#eaeef8] text-[#171c23] rounded-2xl p-4 flex items-center justify-between shadow-xs cursor-pointer group min-h-[60px] border border-[#ddc0bd]/40 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#ffdad6', color: '#93000a' }}
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[22px]">health_and_safety</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-bold group-hover:text-[#902e2a] transition-colors leading-tight truncate">
                  Un doute, des vertiges ou une douleur ?
                </span>
                <span className="text-[11px] sm:text-xs text-[#574240] truncate">
                  Faire le test d'auto-évaluation rapide en 1 min
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#574240] text-[20px] sm:text-[22px] shrink-0 group-hover:translate-x-1 transition-transform ml-1">
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
