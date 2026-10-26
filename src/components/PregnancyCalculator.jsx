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
    <div className="w-full flex flex-col gap-6">
      {/* =========================================================================
          EN-TÊTE DE LA PAGE
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ddc0bd]/40 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171c23] leading-tight">
            Suivi Prénatal &amp; Calendrier CPN
          </h1>
          <p className="text-sm text-[#574240] mt-1">
            Calculateur obstétrical conforme au protocole du Ministère de la Santé du Sénégal.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-full bg-[#aeeecb] text-[#316e52] text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2c694e] animate-pulse"></span>
            Mode Hors-Ligne Prêt
          </span>
          <span className="px-3 py-1 rounded-full bg-white text-[#902e2a] border border-[#ddc0bd]/50 text-xs font-bold shadow-xs">
            24 SA • 6ème mois
          </span>
        </div>
      </div>

      {/* =========================================================================
          GRILLE PRINCIPALE EN FLEX NATUREL (2 Colonnes spacieuses sur bureau)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =========================================================
            COLONNE GAUCHE (lg:col-span-7) : Audio, Stade & Timeline CPN
            ========================================================= */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* 1. ASSISTANCE VOCALE GUIDÉE (Pleine largeur de la colonne) */}
          <div
            className="w-full rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col gap-3 border border-[#724600]/20"
            style={{ backgroundColor: '#ffddb8', color: '#2a1700' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ color: '#724600', fontVariationSettings: "'FILL' 1" }}
                >
                  volume_up
                </span>
                <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#724600' }}>
                  Assistance Vocale Guidée
                </span>
              </div>
              <span className="text-xs px-3 py-0.5 rounded-full bg-white/90 text-[#2a1700] font-bold shadow-xs">
                Wolof / FR
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-3.5 min-w-0">
                <button
                  aria-label="Lancer la lecture audio en Wolof"
                  onClick={toggleAudio}
                  className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform shrink-0 ${
                    isPlaying ? 'animate-pulse' : ''
                  }`}
                  style={{ backgroundColor: isPlaying ? '#902e2a' : '#724600', color: '#ffffff' }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[30px] text-white">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <div className="flex flex-col min-w-0">
                  <span className="text-base sm:text-lg font-bold font-serif leading-tight" style={{ color: '#2a1700' }}>
                    Déglul ci Wolof
                  </span>
                  <span className="text-xs sm:text-sm opacity-80 mt-0.5">
                    Explications du calendrier et de votre stade actuel
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 h-8 px-3 shrink-0 rounded-full bg-white/70">
                <span className={`w-1 h-3 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ backgroundColor: '#724600' }}></span>
                <span className={`w-1 h-4.5 rounded-full ${isPlaying ? 'animate-bounce' : ''}`} style={{ backgroundColor: '#724600' }}></span>
                <span className={`w-1 h-2 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ backgroundColor: '#724600' }}></span>
                <span className={`w-1 h-3.5 rounded-full ${isPlaying ? 'animate-bounce' : ''}`} style={{ backgroundColor: '#724600' }}></span>
                <span className="text-xs ml-1 font-bold" style={{ color: '#2a1700' }}>
                  {isPlaying ? 'En cours' : '01:45'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. CALCULATEUR DDR / DPA & CARTE ÉTAT GESTATIONNEL */}
          <div className="w-full bg-white rounded-2xl p-5 shadow-sm border border-[#ddc0bd]/40 flex flex-col gap-5">
            {/* Onglets DDR / DPA */}
            <div className="flex flex-col gap-3">
              <div className="flex bg-[#eaeef8] rounded-xl p-1 w-full justify-between" role="tablist">
                <button
                  onClick={() => setCalcTab('ddr')}
                  className={`flex-1 min-h-[40px] py-2 px-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center ${
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
                  className={`flex-1 min-h-[40px] py-2 px-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center ${
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
              <div className="flex items-center justify-between bg-[#f0f4fd] rounded-xl px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="material-symbols-outlined text-[#902e2a] text-[24px]">calendar_month</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs text-[#574240] font-semibold">
                      Date enregistrée ({calcTab === 'ddr' ? 'DDR' : 'DPA'})
                    </span>
                    {isEditingDate ? (
                      <input
                        type="date"
                        value={ddrDate}
                        onChange={(e) => setDdrDate(e.target.value)}
                        className="text-sm font-bold text-[#171c23] bg-white px-2 py-0.5 rounded border border-[#902e2a]"
                      />
                    ) : (
                      <span className="text-base text-[#171c23] font-bold font-serif truncate">
                        15 Octobre 2025
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsEditingDate(!isEditingDate)}
                  className="px-3.5 py-1.5 rounded-full bg-[#dee2ec] text-[#171c23] text-xs font-bold hover:bg-[#eaeef8] transition-colors"
                  type="button"
                >
                  {isEditingDate ? 'Valider' : 'Modifier'}
                </button>
              </div>
            </div>

            {/* Carte État Gestationnel Exact Stitch */}
            <div
              className="rounded-2xl p-5 shadow-xs flex flex-col gap-4 border border-[#ffb3ac]/40"
              style={{ background: 'linear-gradient(135deg, #ffdad6 0%, #f0f4fd 100%)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider" style={{ color: '#902e2a' }}>
                    État gestationnel actuel
                  </span>
                  <div className="text-xl sm:text-2xl font-serif font-bold leading-tight mt-0.5" style={{ color: '#410003' }}>
                    24 SA (Semaines)
                  </div>
                  <span className="text-xs text-[#574240] font-semibold">
                    6ème mois • 2ème Trimestre
                  </span>
                </div>
                <div className="px-3.5 py-1.5 bg-white text-[#902e2a] rounded-full shadow-xs flex items-center gap-1.5 text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>J - 112</span>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 mt-1">
                {/* SVG Cercle Jauge 60% */}
                <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 72 72">
                    <circle cx="36" cy="36" r="30" fill="transparent" stroke="#dee2ec" strokeWidth="7" />
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
                  <span className="absolute text-base font-bold font-serif" style={{ color: '#902e2a' }}>
                    60%
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1 text-[#724600]">
                    <span className="material-symbols-outlined text-[18px]">hearing</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Étape Fœtale</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#171c23] mt-1 leading-snug">
                    Bébé pèse environ <span className="font-bold text-[#902e2a]">600g</span>, ses poumons se développent et il perçoit votre voix !
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-2.5 text-xs gap-2">
                <span className="text-[#574240] font-medium">Terme d'accouchement prévu (DPA) :</span>
                <span className="text-[#171c23] font-bold font-serif">22 Juillet 2026</span>
              </div>
            </div>
          </div>

          {/* 3. CHRONOLOGIE CPN OFFICIELLE (TIMELINE VERTICALE NATURELLE DU MINISTÈRE) */}
          <div className="w-full bg-white rounded-2xl p-5 shadow-sm border border-[#ddc0bd]/40 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#171c23]">
                  Consultations Prénatales (CPN)
                </h2>
                <span className="text-xs text-[#574240]">
                  Protocole officiel national en 4 étapes clés (Ministère de la Santé)
                </span>
              </div>
              <span className="material-symbols-outlined text-[#2c694e] text-[26px]">
                verified
              </span>
            </div>

            <div className="flex flex-col gap-4 relative">
              {/* CPN 1 - Validée */}
              <div className="flex items-start gap-3.5 relative">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#2c694e] text-white flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <div className="w-0.5 h-full bg-[#aeeecb] mt-1"></div>
                </div>
                <div className="flex-1 bg-[#f0f4fd] rounded-xl p-3.5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-serif font-bold text-[#171c23]">CPN 1</span>
                      <span className="text-xs text-[#574240]">Avant 12 SA</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] text-xs font-bold">
                      Validée
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#171c23]">
                    Effectuée avec succès le 18 Novembre 2025.
                  </p>
                  <div className="flex items-center justify-between text-[#574240] bg-[#eaeef8] rounded-lg p-2 text-xs">
                    <span>Bilan sanguin &amp; Échographie T1 conformes</span>
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className="font-bold text-[#2c694e] inline-flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">volume_up</span>
                      <span>Audio</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* CPN 2 - À planifier (Mise en avant) */}
              <div className="flex items-start gap-3.5 relative">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#902e2a] text-white flex items-center justify-center shadow-sm animate-pulse">
                    <span className="material-symbols-outlined text-[18px]">event_note</span>
                  </div>
                  <div className="w-0.5 h-full bg-[#dee2ec] mt-1"></div>
                </div>
                <div
                  className="flex-1 rounded-xl p-4 flex flex-col gap-2.5 border shadow-xs"
                  style={{ backgroundColor: 'rgba(255, 218, 214, 0.45)', borderColor: '#902e2a' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-serif font-bold text-[#902e2a]">CPN 2</span>
                      <span className="text-xs font-bold text-[#902e2a]">20 à 24 SA</span>
                    </div>
                    <span className="px-3 py-0.5 rounded-full bg-[#902e2a] text-white text-xs font-bold shadow-xs">
                      À planifier
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#171c23] font-medium leading-relaxed">
                    Recommandée cette semaine. Dépistage diabète gestationnel, contrôle de la tension &amp; rappel Fer/Folique.
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                    <button
                      type="button"
                      className="flex-1 min-h-[42px] py-2 px-4 rounded-xl bg-[#902e2a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                      <span>Rappel SMS / WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className="min-h-[42px] px-4 rounded-xl bg-white text-[#902e2a] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs border border-[#902e2a]/30 hover:bg-[#f0f4fd] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">volume_up</span>
                      <span>Audio Wolof</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* CPN 3 - À venir */}
              <div className="flex items-start gap-3.5 relative">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#dee2ec] text-[#574240] flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <div className="w-0.5 h-full bg-[#eaeef8] mt-1"></div>
                </div>
                <div className="flex-1 bg-[#f0f4fd] rounded-xl p-3.5 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-serif font-bold text-[#171c23]">CPN 3</span>
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
              <div className="flex items-start gap-3.5">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#dee2ec] text-[#574240] flex items-center justify-center font-bold text-xs">
                    4
                  </div>
                </div>
                <div className="flex-1 bg-[#f0f4fd] rounded-xl p-3.5 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-serif font-bold text-[#171c23]">CPN 4</span>
                      <span className="text-xs text-[#574240]">36 à 38 SA</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#eaeef8] text-[#574240] text-xs font-medium">
                      Mois 9
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
            COLONNE DROITE (lg:col-span-5) : Urgences, Sage-Femme & Nutrition
            ========================================================= */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* 1. CARTE D'APPEL DIRECT SAMU 1515 */}
          <div
            className="w-full rounded-2xl p-5 shadow-sm flex flex-col gap-3 text-white border"
            style={{ backgroundColor: '#ba1a1a', borderColor: '#93000a' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] animate-bounce">e911_emergency</span>
                <span className="text-xs font-bold uppercase tracking-wider">Urgence Vitale 24/7</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">Gratuit</span>
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">SAMU Sénégal 1515</h3>
              <p className="text-xs text-white/90 mt-1 leading-snug">
                En cas de perte de sang, forte fièvre ou maux de tête violents, contactez directement le SAMU sans frais.
              </p>
            </div>
            <a
              href="tel:1515"
              className="w-full min-h-[46px] rounded-xl bg-white text-[#ba1a1a] font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#f0f4fd] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              <span>APPELER LE 1515 MAINTENANT</span>
            </a>
          </div>

          {/* 2. RACCOURCIS USSD & WHATSAPP */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <a
              href="tel:*1515%23"
              className="bg-white border border-[#ddc0bd]/40 rounded-2xl p-4 flex flex-col items-start gap-2 shadow-xs hover:bg-[#f0f4fd] transition-colors active:scale-95"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
              >
                <span className="material-symbols-outlined text-[22px]">dialpad</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#2c694e]">
                  Passerelle USSD
                </span>
                <span className="text-base font-bold text-[#171c23] leading-tight">*1515#</span>
                <span className="text-[11px] text-[#574240]">Sans Internet</span>
              </div>
            </a>

            <a
              href="https://wa.me/221770000000?text=Bonjour%20SuturaSante"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[#ddc0bd]/40 rounded-2xl p-4 flex flex-col items-start gap-2 shadow-xs hover:bg-[#f0f4fd] transition-colors active:scale-95"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#2c694e', color: '#ffffff' }}
              >
                <span className="material-symbols-outlined text-[22px]">forum</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#2c694e]">
                  WhatsApp Audio
                </span>
                <span className="text-base font-bold text-[#171c23] leading-tight">Vocaux 24/7</span>
                <span className="text-[11px] text-[#574240]">Conseillère santé</span>
              </div>
            </a>
          </div>

          {/* 3. CONSEIL DE LA SAGE-FEMME AVEC PHOTO */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#ddc0bd]/40 shadow-sm flex flex-col">
            <div className="w-full h-44 sm:h-48 overflow-hidden relative">
              <img
                className="w-full h-full object-cover object-center"
                alt="Mère sénégalaise épanouie à Dakar"
                src="/images/advice/breastfeeding.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4">
                <span className="px-3 py-1 rounded-full bg-white/95 text-[#902e2a] text-xs font-bold uppercase tracking-wider shadow-xs">
                  Conseil de la Sage-Femme
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <p className="text-xs sm:text-sm font-serif italic text-[#171c23] leading-relaxed">
                « Parlez régulièrement au bébé. Les voix douces de la famille renforcent le lien d'attachement avant l'arrivée. »
              </p>
              <span className="text-[11px] text-[#574240]">
                Pratique recommandée par les sages-femmes du Ministère de la Santé
              </span>
            </div>
          </div>

          {/* 4. COMPLÉMENTS & NUTRITION LOCALE */}
          <div className="w-full bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-3.5 border border-[#ddc0bd]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-[#2c694e]">
                  medication
                </span>
                <span className="text-base text-[#171c23] font-bold font-serif">
                  Compléments &amp; Nutrition
                </span>
              </div>
              <button
                type="button"
                onClick={toggleAudio}
                className="text-xs inline-flex items-center gap-1 font-bold text-[#2c694e]"
              >
                <span className="material-symbols-outlined text-[16px]">volume_up</span>
                <span>Wolof</span>
              </button>
            </div>

            {/* Case à cocher Fer & Acide Folique */}
            <label
              onClick={() => setFolicChecked(!folicChecked)}
              className="flex items-center justify-between bg-[#f0f4fd] rounded-xl p-3.5 cursor-pointer select-none hover:bg-[#eaeef8] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                    folicChecked ? 'bg-[#2c694e] text-white' : 'border-2 border-[#8a716f] bg-white'
                  }`}
                >
                  {folicChecked && <span className="material-symbols-outlined text-[15px]">check</span>}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm text-[#171c23] font-bold leading-tight">
                    Fer &amp; Acide Folique pris aujourd'hui ?
                  </span>
                  <span className="text-xs text-[#574240] mt-0.5">
                    Indispensable contre l'anémie
                  </span>
                </div>
              </div>
              <span
                className="material-symbols-outlined text-[22px] text-[#2c694e]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </label>

            {/* Moringa & Bissap */}
            <div className="flex items-center gap-3 bg-[#f0f4fd] rounded-xl p-3 border border-[#ddc0bd]/20">
              <img
                className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-xs"
                alt="Moringa et Bissap sénégalais"
                src="/images/advice/moringa.jpg"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#724600]">
                  Alliés naturels : Moringa &amp; Bissap
                </span>
                <span className="text-xs text-[#574240] leading-snug mt-0.5">
                  Ajoutez du Moringa (Nebeday) à vos repas et buvez du jus de bouye frais.
                </span>
              </div>
            </div>
          </div>

          {/* 5. BANNIÈRE AUTO-ÉVALUATION TRIAGE */}
          <div
            onClick={onNavigateToTriage}
            className="w-full bg-[#f0f4fd] hover:bg-[#eaeef8] text-[#171c23] rounded-2xl p-4 flex items-center justify-between shadow-xs cursor-pointer group border border-[#ddc0bd]/40 active:scale-95 transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#ffdad6', color: '#93000a' }}
              >
                <span className="material-symbols-outlined text-[20px]">health_and_safety</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-bold group-hover:text-[#902e2a] transition-colors leading-tight">
                  Un doute, des vertiges ou une douleur ?
                </span>
                <span className="text-xs text-[#574240]">
                  Faire le test d'auto-évaluation rapide en 1 min
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#574240] text-[20px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}