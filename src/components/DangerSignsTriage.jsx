import React, { useState } from 'react';

export default function DangerSignsTriage({ onNavigateToEmergency, onActionTrack }) {
  const [answers, setAnswers] = useState({
    bleeding: false,
    headache: false,
    fever: false,
    movement: false,
  });

  const [audioPlaying, setAudioPlaying] = useState(false);

  const toggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (audioPlaying) {
        window.speechSynthesis.cancel();
        setAudioPlaying(false);
      } else {
        const u = new SpeechSynthesisUtterance(
          "Su fekkee danga am deret yu génn, mba sa bop di méti lool, mba tangoor yu tar, mba liir bi dootul yëngu, woo leen 1515 ci saa si. Bul xaar!"
        );
        u.lang = 'fr-SN';
        u.rate = 0.9;
        u.onend = () => setAudioPlaying(false);
        window.speechSynthesis.speak(u);
        setAudioPlaying(true);
        if (onActionTrack) onActionTrack('audio_listen');
      }
    } else {
      setAudioPlaying(!audioPlaying);
    }
  };

  const handleChoice = (symptom, value) => {
    const updated = { ...answers, [symptom]: value };
    setAnswers(updated);
    const hasDanger = Object.values(updated).some(Boolean);
    if (hasDanger && onActionTrack) {
      onActionTrack('emergency_red');
    }
  };

  const hasDanger = Object.values(answers).some(Boolean);

  return (
    <div className="w-full flex flex-col gap-2 lg:gap-2.5">
      {/* =========================================================================
          1. EN-TÊTE SÉCURITÉ & GUIDAGE VOCAL WOLOF (COMPACT)
          ========================================================================= */}
      <section className="bg-white rounded-xl shadow-xs p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-[#ddc0bd]/30">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[18px] text-[#ba1a1a]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              crisis_alert
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#ba1a1a]">
              Protocole National de Triage Obstétrical
            </span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#aeeecb] text-[#316e52]">
              Offline
            </span>
          </div>
          <h1 className="text-base sm:text-lg lg:text-xl font-serif font-bold text-[#171c23] leading-tight">
            Vérification Rapide des Signes de Danger
          </h1>
        </div>

        {/* Pilule Audio Wolof */}
        <button
          onClick={toggleAudio}
          className="min-h-[34px] sm:min-h-[36px] rounded-full px-3 py-1 flex items-center justify-between gap-2 shadow-xs active:scale-95 transition-all cursor-pointer shrink-0"
          style={{
            backgroundColor: audioPlaying ? '#724600' : '#ffddb8',
            color: audioPlaying ? '#ffffff' : '#2a1700',
          }}
          type="button"
        >
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">
              {audioPlaying ? 'pause' : 'volume_up'}
            </span>
            <span className="text-xs font-bold">Déglul ci Wolof</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span
              className={`w-1 h-2 rounded-full ${audioPlaying ? 'animate-pulse' : ''}`}
              style={{ backgroundColor: audioPlaying ? '#ffffff' : '#724600' }}
            ></span>
            <span
              className={`w-1 h-3 rounded-full ${audioPlaying ? 'animate-bounce' : ''}`}
              style={{ backgroundColor: audioPlaying ? '#ffffff' : '#724600' }}
            ></span>
            <span
              className={`w-1 h-1.5 rounded-full ${audioPlaying ? 'animate-pulse' : ''}`}
              style={{ backgroundColor: audioPlaying ? '#ffffff' : '#724600' }}
            ></span>
          </div>
        </button>
      </section>

      {/* =========================================================================
          2. LES 4 SIGNES D'ALERTE EN 4 COLONNES HORIZONTALES SUR BUREAU
          ========================================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Symptôme 1 : Saignements (Dérét) */}
        <article className="bg-white rounded-xl p-2.5 shadow-xs border border-[#ddc0bd]/30 flex flex-col justify-between gap-2 hover:border-[#ba1a1a]/40 transition-all">
          <div className="flex items-start gap-2">
            <div
              className="w-9 h-9 rounded-lg flex flex-col items-center justify-center shrink-0"
              style={{ backgroundColor: '#ffdad6', color: '#93000a' }}
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                water_drop
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#171c23] font-serif truncate">Saignements</h3>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#ffdad6] text-[#ba1a1a]">
                  Dérét
                </span>
              </div>
              <p className="text-[10px] text-[#574240] leading-tight mt-0.5">
                Pertes de sang ou liquide suspect.
              </p>
            </div>
          </div>
          <div className="pt-1.5 border-t border-[#f0f4fd] flex items-center justify-between gap-1">
            <span className="text-[10px] text-[#574240]">Présent ?</span>
            <div className="inline-flex rounded-full bg-[#eaeef8] p-0.5 gap-0.5 shrink-0">
              <button
                type="button"
                onClick={() => handleChoice('bleeding', false)}
                className={`min-h-[26px] min-w-[40px] rounded-full px-2 text-[10px] font-bold transition-all ${
                  !answers.bleeding ? 'bg-[#dee2ec] text-[#171c23]' : 'text-[#574240]'
                }`}
              >
                Non
              </button>
              <button
                type="button"
                onClick={() => handleChoice('bleeding', true)}
                className={`min-h-[26px] min-w-[40px] rounded-full px-2 text-[10px] font-bold transition-all ${
                  answers.bleeding ? 'bg-[#ba1a1a] text-white shadow-xs' : 'text-[#574240]'
                }`}
              >
                Oui
              </button>
            </div>
          </div>
        </article>

        {/* Symptôme 2 : Maux de tête / Vue trouble (Bop métit) */}
        <article className="bg-white rounded-xl p-2.5 shadow-xs border border-[#ddc0bd]/30 flex flex-col justify-between gap-2 hover:border-[#902e2a]/40 transition-all">
          <div className="flex items-start gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#dee2ec] text-[#902e2a] flex flex-col items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#171c23] font-serif truncate">Maux de tête</h3>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#e4e8f2] text-[#574240]">
                  Bop métit
                </span>
              </div>
              <p className="text-[10px] text-[#574240] leading-tight mt-0.5">
                Éclairs visuels, vertiges violents.
              </p>
            </div>
          </div>
          <div className="pt-1.5 border-t border-[#f0f4fd] flex items-center justify-between gap-1">
            <span className="text-[10px] text-[#574240]">Présent ?</span>
            <div className="inline-flex rounded-full bg-[#eaeef8] p-0.5 gap-0.5 shrink-0">
              <button
                type="button"
                onClick={() => handleChoice('headache', false)}
                className={`min-h-[26px] min-w-[40px] rounded-full px-2 text-[10px] font-bold transition-all ${
                  !answers.headache ? 'bg-[#dee2ec] text-[#171c23]' : 'text-[#574240]'
                }`}
              >
                Non
              </button>
              <button
                type="button"
                onClick={() => handleChoice('headache', true)}
                className={`min-h-[26px] min-w-[40px] rounded-full px-2 text-[10px] font-bold transition-all ${
                  answers.headache ? 'bg-[#ba1a1a] text-white shadow-xs' : 'text-[#574240]'
                }`}
              >
                Oui
              </button>
            </div>
          </div>
        </article>

        {/* Symptôme 3 : Fièvre / Frissons (Tangoor) */}
        <article className="bg-white rounded-xl p-2.5 shadow-xs border border-[#ddc0bd]/30 flex flex-col justify-between gap-2 hover:border-[#fcba67]/60 transition-all">
          <div className="flex items-start gap-2">
            <div
              className="w-9 h-9 rounded-lg flex flex-col items-center justify-center shrink-0"
              style={{ backgroundColor: '#fcba67', color: '#2a1700' }}
            >
              <span className="material-symbols-outlined text-[18px]">device_thermostat</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#171c23] font-serif truncate">Fièvre forte</h3>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#ffddb8] text-[#2a1700]">
                  Tangoor
                </span>
              </div>
              <p className="text-[10px] text-[#574240] leading-tight mt-0.5">
                Corps très chaud, frissons intenses.
              </p>
            </div>
          </div>
          <div className="pt-1.5 border-t border-[#f0f4fd] flex items-center justify-between gap-1">
            <span className="text-[10px] text-[#574240]">Présent ?</span>
            <div className="inline-flex rounded-full bg-[#eaeef8] p-0.5 gap-0.5 shrink-0">
              <button
                type="button"
                onClick={() => handleChoice('fever', false)}
                className={`min-h-[26px] min-w-[40px] rounded-full px-2 text-[10px] font-bold transition-all ${
                  !answers.fever ? 'bg-[#dee2ec] text-[#171c23]' : 'text-[#574240]'
                }`}
              >
                Non
              </button>
              <button
                type="button"
                onClick={() => handleChoice('fever', true)}
                className={`min-h-[26px] min-w-[40px] rounded-full px-2 text-[10px] font-bold transition-all ${
                  answers.fever ? 'bg-[#ba1a1a] text-white shadow-xs' : 'text-[#574240]'
                }`}
              >
                Oui
              </button>
            </div>
          </div>
        </article>

        {/* Symptôme 4 : Mouvements réduits (Liir bi) */}
        <article className="bg-white rounded-xl p-2.5 shadow-xs border border-[#ddc0bd]/30 flex flex-col justify-between gap-2 hover:border-[#aeeecb]/60 transition-all">
          <div className="flex items-start gap-2">
            <div
              className="w-9 h-9 rounded-lg flex flex-col items-center justify-center shrink-0"
              style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
            >
              <span className="material-symbols-outlined text-[18px]">child_care</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#171c23] font-serif truncate">Bébé ne bouge pas</h3>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#b1f0ce] text-[#002114]">
                  Liir bi
                </span>
              </div>
              <p className="text-[10px] text-[#574240] leading-tight mt-0.5">
                Baisse nette des mouvements fœtaux.
              </p>
            </div>
          </div>
          <div className="pt-1.5 border-t border-[#f0f4fd] flex items-center justify-between gap-1">
            <span className="text-[10px] text-[#574240]">Présent ?</span>
            <div className="inline-flex rounded-full bg-[#eaeef8] p-0.5 gap-0.5 shrink-0">
              <button
                type="button"
                onClick={() => handleChoice('movement', false)}
                className={`min-h-[26px] min-w-[40px] rounded-full px-2 text-[10px] font-bold transition-all ${
                  !answers.movement ? 'bg-[#dee2ec] text-[#171c23]' : 'text-[#574240]'
                }`}
              >
                Non
              </button>
              <button
                type="button"
                onClick={() => handleChoice('movement', true)}
                className={`min-h-[26px] min-w-[40px] rounded-full px-2 text-[10px] font-bold transition-all ${
                  answers.movement ? 'bg-[#ba1a1a] text-white shadow-xs' : 'text-[#574240]'
                }`}
              >
                Oui
              </button>
            </div>
          </div>
        </article>
      </section>

      {/* =========================================================================
          3. BANNIÈRE RÉSULTAT TRIAGE INSTANTANÉE
          ========================================================================= */}
      <section className="w-full">
        {hasDanger ? (
          <div
            className="rounded-xl p-3 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 relative overflow-hidden"
            style={{ backgroundColor: '#ba1a1a', color: '#ffffff' }}
          >
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Urgence Obstétricale Détectée
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-serif font-bold text-white">
                ATTENTION : Consultez immédiatement !
              </h3>
              <p className="text-xs text-white/95 leading-tight">
                Un signe de complication est coché. Appelez le SAMU 1515 sans délai.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                className="min-h-[36px] px-3.5 bg-white text-[#ba1a1a] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#f0f4fd] active:scale-95 transition-all"
                href="tel:1515"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>SAMU 1515</span>
              </a>

              <button
                type="button"
                onClick={onNavigateToEmergency}
                className="min-h-[36px] px-3 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">local_hospital</span>
                <span>Maternités</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            className="rounded-xl p-2.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[20px]" style={{ color: '#2c694e' }}>
                check_circle
              </span>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold text-[#171c23]">
                    Aucun signe de danger détecté
                  </span>
                  <span className="text-[9px] bg-white text-[#2c694e] px-1.5 py-0.2 rounded-full font-bold">
                    Statut Serein (Vert)
                  </span>
                </div>
                <p className="text-[11px] opacity-90 truncate">
                  Continuez de vous hydrater et de vous reposer à l'ombre.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleAudio}
              className="min-h-[30px] px-3 bg-white text-[#2c694e] rounded-lg flex items-center gap-1 shadow-xs hover:bg-[#f0f4fd] text-xs font-bold shrink-0"
            >
              <span className="material-symbols-outlined text-[14px]">record_voice_over</span>
              <span>Badien Gox</span>
            </button>
          </div>
        )}
      </section>

      {/* =========================================================================
          4. PROTOCOLE TRICOLORE & BADIEN GOX EN 2 COLONNES (SANS SCROLL)
          ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Tricolor Protocole National */}
        <div className="bg-[#eaeef8] rounded-xl p-2.5 flex flex-col gap-1.5 border border-[#ddc0bd]/30">
          <span className="text-xs font-serif font-bold text-[#171c23]">
            Protocole National de Triage Tricolore
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="bg-white p-1.5 rounded-lg flex items-center gap-1.5 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] shrink-0"></span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-[#171c23] leading-none">Rouge</p>
                <p className="text-[9px] text-[#574240] truncate">SAMU 1515</p>
              </div>
            </div>
            <div className="bg-white p-1.5 rounded-lg flex items-center gap-1.5 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#724600] shrink-0"></span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-[#171c23] leading-none">Orange</p>
                <p className="text-[9px] text-[#574240] truncate">Avis 24-48h</p>
              </div>
            </div>
            <div className="bg-white p-1.5 rounded-lg flex items-center gap-1.5 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2c694e] shrink-0"></span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-[#171c23] leading-none">Vert</p>
                <p className="text-[9px] text-[#574240] truncate">Paisible</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne d'écoute Sutura 116 */}
        <div className="bg-[#f0f4fd] rounded-xl p-2.5 flex items-center justify-between gap-2 border border-[#ddc0bd]/30">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#2c694e] text-[20px] shrink-0">shield</span>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#171c23] truncate">
                100% Anonyme • Ligne d'écoute 116
              </span>
              <span className="text-[10px] text-[#574240] truncate">
                Assistance bienveillante et gratuite 24/7
              </span>
            </div>
          </div>
          <a
            className="min-h-[28px] px-3 bg-[#902e2a] text-white rounded-full text-xs font-bold flex items-center gap-1 shrink-0 shadow-xs"
            href="tel:116"
          >
            <span className="material-symbols-outlined text-[13px]">call</span>
            <span>116</span>
          </a>
        </div>
      </section>
    </div>
  );
}