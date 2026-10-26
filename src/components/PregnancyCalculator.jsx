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
    <div className="flex flex-col w-full px-4 gap-4">
      {/* 1. ASSISTANCE VOCALE GUIDÉE STITCH EXACT */}
      <div
        className="w-full rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col gap-2"
        style={{ backgroundColor: '#ffddb8', color: '#2a1700' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ color: '#724600', fontVariationSettings: "'FILL' 1" }}
            >
              volume_up
            </span>
            <span
              className="text-[0.6875rem] uppercase tracking-wider font-bold"
              style={{ color: '#724600' }}
            >
              Assistance Vocale Guidée
            </span>
          </div>
          <span
            className="text-[0.6875rem] px-2.5 py-1 rounded-full font-bold shadow-xs"
            style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#2a1700' }}
          >
            Wolof / FR
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-3 min-w-0">
            <button
              aria-label="Lancer la lecture audio en Wolof"
              onClick={toggleAudio}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform shrink-0 ${
                isPlaying ? 'animate-pulse' : ''
              }`}
              style={{
                backgroundColor: isPlaying ? '#902e2a' : '#724600',
                color: '#ffffff',
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-[30px] text-white">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <div className="flex flex-col min-w-0">
              <span className="text-[1.125rem] truncate leading-tight font-bold font-serif" style={{ color: '#2a1700' }}>
                Déglul ci Wolof
              </span>
              <span className="text-[0.8125rem] opacity-80 truncate">
                Explications du calendrier et de votre stade
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-1 h-8 px-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
          >
            <span className={`w-1 h-3.5 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ backgroundColor: '#724600' }}></span>
            <span className={`w-1 h-5 rounded-full ${isPlaying ? 'animate-bounce' : ''}`} style={{ backgroundColor: '#724600' }}></span>
            <span className={`w-1 h-2.5 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ backgroundColor: '#724600' }}></span>
            <span className={`w-1 h-4 rounded-full ${isPlaying ? 'animate-bounce' : ''}`} style={{ backgroundColor: '#724600' }}></span>
            <span className="text-[0.6875rem] ml-1.5 font-bold" style={{ color: '#2a1700' }}>
              {isPlaying ? '00:45' : '01:45'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. RACCOURCIS USSD & WHATSAPP STITCH EXACT */}
      <div className="grid grid-cols-2 gap-2.5 w-full">
        <a
          href="tel:*1515%23"
          className="bg-white border border-[#ddc0bd]/40 rounded-xl p-3 flex items-center gap-2.5 shadow-xs hover:bg-[#f0f4fd] transition-colors active:scale-[0.98] min-h-[56px]"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
          >
            <span className="material-symbols-outlined text-[22px]">dialpad</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wide" style={{ color: '#2c694e' }}>
              Passerelle USSD
            </span>
            <span className="text-[1.125rem] font-bold text-[#171c23] leading-tight">*1515#</span>
            <span className="text-[10px] text-[#574240] font-medium">Gratuit sans Internet</span>
          </div>
        </a>

        <a
          href="https://wa.me/221770000000?text=Bonjour%20SuturaSante"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-[#ddc0bd]/40 rounded-xl p-3 flex items-center gap-2.5 shadow-xs hover:bg-[#f0f4fd] transition-colors active:scale-[0.98] min-h-[56px]"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#2c694e', color: '#ffffff' }}
          >
            <span className="material-symbols-outlined text-[22px]">forum</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[0.6875rem] font-bold uppercase tracking-wide" style={{ color: '#2c694e' }}>
              WhatsApp Audio
            </span>
            <span className="text-[1.125rem] font-bold text-[#171c23] leading-tight">Vocaux 24/7</span>
            <span className="text-[10px] text-[#574240] font-medium">Conseillère santé</span>
          </div>
        </a>
      </div>

      {/* 3. CALCULATEUR DDR / DPA STITCH EXACT */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-4 border border-[#ddc0bd]/30">
        <div className="flex flex-col gap-2">
          {/* Onglets DDR / DPA */}
          <div className="flex bg-[#eaeef8] rounded-xl p-1 w-full justify-between" role="tablist">
            <button
              onClick={() => setCalcTab('ddr')}
              className={`flex-1 min-h-[40px] py-2 px-1 rounded-lg text-[0.8125rem] font-bold transition-all text-center ${
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
              className={`flex-1 min-h-[40px] py-2 px-1 rounded-lg text-[0.8125rem] font-bold transition-all text-center ${
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
          <div className="flex items-center justify-between bg-[#f0f4fd] rounded-xl px-4 py-3 mt-1">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#902e2a] text-[24px]">calendar_month</span>
              <div className="flex flex-col">
                <span className="text-[0.6875rem] text-[#574240] font-semibold">
                  Date enregistrée ({calcTab === 'ddr' ? 'DDR' : 'DPA'})
                </span>
                {isEditingDate ? (
                  <input
                    type="date"
                    value={ddrDate}
                    onChange={(e) => setDdrDate(e.target.value)}
                    className="text-[1rem] font-bold text-[#171c23] bg-white px-2 py-0.5 rounded border border-[#902e2a]"
                  />
                ) : (
                  <span className="text-[1.125rem] text-[#171c23] font-bold font-serif">
                    15 Octobre 2025
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsEditingDate(!isEditingDate)}
              className="min-h-[38px] px-3.5 py-1.5 rounded-full bg-[#dee2ec] text-[#171c23] text-[0.6875rem] font-bold hover:bg-[#eaeef8] transition-colors"
              type="button"
            >
              {isEditingDate ? 'Valider' : 'Modifier'}
            </button>
          </div>
        </div>

        {/* CARTE ÉTAT GESTATIONNEL STITCH EXACT (Dégradé Terracotta) */}
        <div
          className="relative rounded-2xl p-4 flex flex-col gap-3 overflow-hidden shadow-xs border border-[#ffb3ac]/40"
          style={{
            background: 'linear-gradient(135deg, #ffdad6 0%, #f0f4fd 100%)',
          }}
        >
          <div className="flex items-start justify-between z-10">
            <div className="flex flex-col">
              <span className="text-[0.6875rem] uppercase font-bold tracking-wider" style={{ color: '#902e2a' }}>
                État gestationnel actuel
              </span>
              <span className="text-[1.5rem] font-serif font-bold leading-tight mt-0.5" style={{ color: '#410003' }}>
                24 SA (Semaines)
              </span>
              <span className="text-[0.8125rem] text-[#574240] font-semibold">
                6ème mois • 2ème Trimestre
              </span>
            </div>
            <div className="px-3.5 py-1.5 bg-white text-[#902e2a] rounded-full shadow-xs flex items-center gap-1.5 text-[0.6875rem] font-bold">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>J - 112</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-1 z-10">
            {/* Jauge circulaire SVG 60% */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
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
                <span className="text-[1.125rem] font-bold font-serif" style={{ color: '#902e2a' }}>
                  60%
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1" style={{ color: '#724600' }}>
                <span className="material-symbols-outlined text-[18px]">hearing</span>
                <span className="text-[0.6875rem] font-bold">Étape Fœtale</span>
              </div>
              <p className="text-[0.8125rem] text-[#171c23] line-clamp-2 mt-0.5 leading-snug">
                Bébé pèse environ <span className="font-bold text-[#902e2a]">600g</span>, ses poumons se développent et il perçoit votre voix !
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-2 mt-1 z-10">
            <span className="text-[0.6875rem] text-[#574240] font-medium">
              Terme d'accouchement prévu (DPA) :
            </span>
            <span className="text-[0.8125rem] text-[#171c23] font-bold font-serif">
              22 Juillet 2026
            </span>
          </div>
        </div>

        {/* Conseil de la Sage-Femme avec Photo sénégalaise Stitch */}
        <div className="flex items-center gap-3 p-3 bg-[#f0f4fd] rounded-xl border border-[#ddc0bd]/20">
          <img
            className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-xs"
            alt="Mère sénégalaise épanouie"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCeg2rd31C_5hdpqvP-vCBNIid_vP6FlVqjLyx14gqNl52MQHq3qQv_crrjuuOE1e2CEAkR-fYQT-fK5eOWBWPEMWh9axyzn5wnn6hc8R9mICKlmCW-KT6pvwrXOVP6FAwCHoL9z-oNSkLg6b-01jcNx0ne7P9VKsWeMwY_qtKIUsOycm2DN0P-LYYmsf99TGuJIwCz-yDawYUopu3sneOpJYr_c1QV9JRt0BPnuE"
          />
          <div className="flex flex-col justify-center min-w-0">
            <span className="text-[0.6875rem] font-bold" style={{ color: '#902e2a' }}>
              Conseil de la Sage-Femme
            </span>
            <span className="text-[0.8125rem] text-[#574240] leading-snug">
              Parlez régulièrement au bébé. Les voix douces de la famille renforcent le lien avant l'arrivée.
            </span>
          </div>
        </div>
      </div>

      {/* 4. CHRONOLOGIE CPN OFFICIELLE MINISTÈRE SANTÉ SÉNÉGAL */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-4 border border-[#ddc0bd]/30">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[1.25rem] text-[#171c23] font-bold font-serif">
              Consultations Prénatales (CPN)
            </span>
            <span className="text-[0.6875rem] text-[#574240]">
              Protocole officiel du Ministère de la Santé
            </span>
          </div>
          <span className="material-symbols-outlined text-[26px]" style={{ color: '#2c694e' }}>
            verified
          </span>
        </div>

        <div className="flex flex-col gap-3.5 relative">
          {/* CPN 1 - Validée */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center shrink-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-xs"
                style={{ backgroundColor: '#2c694e', color: '#ffffff' }}
              >
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div className="w-0.5 h-full bg-[#aeeecb] mt-1"></div>
            </div>
            <div className="flex-1 bg-[#f0f4fd] rounded-xl p-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[1rem] text-[#171c23] font-bold">CPN 1</span>
                  <span className="text-[0.6875rem] text-[#574240]">Avant 12 SA</span>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-[0.6875rem] font-bold"
                  style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
                >
                  Validée
                </span>
              </div>
              <p className="text-[0.8125rem] text-[#171c23]">
                Effectuée avec succès le 18 Novembre 2025.
              </p>
              <div className="flex items-center justify-between text-[#574240] bg-[#eaeef8] rounded-lg p-2 text-[0.6875rem]">
                <span>Bilan sanguin &amp; Échographie T1 conformes</span>
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="font-bold inline-flex items-center gap-1 px-1 min-h-[32px]"
                  style={{ color: '#2c694e' }}
                >
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                  <span>Audio</span>
                </button>
              </div>
            </div>
          </div>

          {/* CPN 2 - À planifier (Active & Terracotta) */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center shrink-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm animate-pulse"
                style={{ backgroundColor: '#902e2a', color: '#ffffff' }}
              >
                <span className="material-symbols-outlined text-[18px]">event_note</span>
              </div>
              <div className="w-0.5 h-full bg-[#dee2ec] mt-1"></div>
            </div>
            <div
              className="flex-1 rounded-xl p-3.5 flex flex-col gap-2 border shadow-xs"
              style={{
                backgroundColor: 'rgba(255, 218, 214, 0.4)',
                borderColor: 'rgba(144, 46, 42, 0.3)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[1.125rem] font-bold font-serif" style={{ color: '#902e2a' }}>
                    CPN 2
                  </span>
                  <span className="text-[0.6875rem] font-semibold" style={{ color: '#902e2a' }}>
                    20 à 24 SA
                  </span>
                </div>
                <span
                  className="px-2.5 py-1 rounded-full text-[0.6875rem] font-bold shadow-xs text-white"
                  style={{ backgroundColor: '#902e2a' }}
                >
                  À planifier
                </span>
              </div>
              <p className="text-[0.8125rem] text-[#171c23] font-medium leading-relaxed">
                Recommandée cette semaine. Dépistage diabète, contrôle tension &amp; rappel Fer/Folique.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                <button
                  type="button"
                  className="flex-1 min-h-[44px] py-2 px-3 rounded-xl text-white text-[0.8125rem] font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-transform"
                  style={{ backgroundColor: '#902e2a' }}
                >
                  <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                  <span>Rappel SMS / WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="min-h-[44px] px-3 rounded-xl bg-white text-[0.8125rem] font-bold flex items-center justify-center gap-1.5 shadow-xs border hover:bg-[#f0f4fd] transition-colors"
                  style={{ color: '#902e2a', borderColor: 'rgba(144, 46, 42, 0.3)' }}
                >
                  <span className="material-symbols-outlined text-[18px]">volume_up</span>
                  <span>Audio Wolof</span>
                </button>
              </div>
            </div>
          </div>

          {/* CPN 3 - À venir */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#dee2ec] text-[#574240] flex items-center justify-center font-bold text-[0.8125rem]">
                3
              </div>
              <div className="w-0.5 h-full bg-[#eaeef8] mt-1"></div>
            </div>
            <div className="flex-1 bg-[#f0f4fd] rounded-xl p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[1rem] text-[#171c23] font-bold">CPN 3</span>
                  <span className="text-[0.6875rem] text-[#574240]">28 à 32 SA</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#eaeef8] text-[#574240] text-[0.6875rem] font-medium">
                  À venir
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[0.8125rem] text-[#574240]">Prévue autour du 14 Mai 2026</span>
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="text-[#574240] hover:text-[#902e2a] text-[0.6875rem] inline-flex items-center gap-1 min-h-[32px] px-1"
                >
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                  <span>Audio</span>
                </button>
              </div>
            </div>
          </div>

          {/* CPN 4 - Dernier mois */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-8 h-8 rounded-full bg-[#dee2ec] text-[#574240] flex items-center justify-center font-bold text-[0.8125rem]">
                4
              </div>
            </div>
            <div className="flex-1 bg-[#f0f4fd] rounded-xl p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[1rem] text-[#171c23] font-bold">CPN 4</span>
                  <span className="text-[0.6875rem] text-[#574240]">36 à 38 SA</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#eaeef8] text-[#574240] text-[0.6875rem] font-medium">
                  Dernier mois
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[0.8125rem] text-[#574240]">
                  Préparation accouchement &amp; valise maternité
                </span>
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="text-[#574240] hover:text-[#902e2a] text-[0.6875rem] inline-flex items-center gap-1 min-h-[32px] px-1"
                >
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                  <span>Audio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. COMPLÉMENTS & NUTRITION LOCALE SÉNÉGALAISE */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3 border border-[#ddc0bd]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]" style={{ color: '#2c694e' }}>
              medication
            </span>
            <span className="text-[1.125rem] text-[#171c23] font-bold font-serif">
              Compléments &amp; Nutrition Locale
            </span>
          </div>
          <button
            type="button"
            onClick={toggleAudio}
            className="text-[0.6875rem] inline-flex items-center gap-1 px-1 font-bold"
            style={{ color: '#2c694e' }}
          >
            <span className="material-symbols-outlined text-[16px]">volume_up</span>
            <span>Wolof</span>
          </button>
        </div>

        {/* Case à cocher Fer & Acide Folique */}
        <label
          onClick={() => setFolicChecked(!folicChecked)}
          className="flex items-center justify-between bg-[#f0f4fd] rounded-xl p-3.5 cursor-pointer select-none hover:bg-[#eaeef8] transition-colors min-h-[56px]"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                folicChecked ? 'bg-[#2c694e] text-white' : 'border-2 border-[#8a716f] bg-white'
              }`}
            >
              {folicChecked && <span className="material-symbols-outlined text-[18px]">check</span>}
            </div>
            <div className="flex flex-col">
              <span className="text-[0.9375rem] text-[#171c23] font-bold leading-tight">
                Fer &amp; Acide Folique pris aujourd'hui ?
              </span>
              <span className="text-[0.8125rem] text-[#574240] mt-0.5">
                Indispensable pour prévenir l'anémie maternelle
              </span>
            </div>
          </div>
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ color: '#2c694e', fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </label>

        {/* Alliés naturels : Moringa & Bissap */}
        <div className="flex items-center gap-3 bg-[#f0f4fd] rounded-xl p-3 border border-[#ddc0bd]/20">
          <img
            className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-xs"
            alt="Moringa et Bissap sénégalais"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHCoABKs967FWzDGsYxNhzIPUuo7vX4EHkZx9ZmkpF61Y1pqqFwXdZDcpa5Ces2_VV9M2lIMZnONbSlGCQFqfPRwbfBg1bq2oK56w-Zh2kRsgc79n6OV6mpHDObe2Xfuu0EbxJlXpL-LKzyDfFIk2A_vaVav3MD0fL971JsUy1GCpkVz0HqbvQtLtvkHqSbd9Z_okvp1x_F5tYJcLrJ440Qr0VoCiPDbHAlHH6Dig"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-[0.6875rem] font-bold" style={{ color: '#724600' }}>
              Alliés naturels : Moringa &amp; Bissap doux
            </span>
            <span className="text-[0.8125rem] text-[#574240] line-clamp-2">
              Ajoutez des feuilles de moringa (Nebeday) à votre tiéboudienne et buvez du jus de bouye pour l'énergie.
            </span>
          </div>
        </div>
      </div>

      {/* 6. BANNIÈRE AUTO-ÉVALUATION TRIAGE STITCH EXACT */}
      <div className="w-full mb-3">
        <div
          onClick={onNavigateToTriage}
          className="w-full bg-[#f0f4fd] hover:bg-[#eaeef8] text-[#171c23] rounded-2xl p-4 flex items-center justify-between shadow-xs cursor-pointer group min-h-[64px] border border-[#ddc0bd]/40 active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#ffdad6', color: '#93000a' }}
            >
              <span className="material-symbols-outlined text-[24px]">health_and_safety</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.9375rem] font-bold group-hover:text-[#902e2a] transition-colors leading-tight">
                Un doute, des vertiges ou une douleur ?
              </span>
              <span className="text-[0.8125rem] text-[#574240]">
                Faire le test d'auto-évaluation rapide en 1 min
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#574240] text-[22px] shrink-0 group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </div>
      </div>
    </div>
  );
}
