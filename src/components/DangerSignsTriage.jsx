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
    <div className="w-full flex flex-col gap-6">
      {/* 1. EN-TÊTE SÉCURITÉ & GUIDAGE VOCAL WOLOF */}
      <section className="bg-white rounded-2xl shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#ddc0bd]/40">
        <div className="flex flex-col gap-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[22px] text-[#ba1a1a]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              crisis_alert
            </span>
            <span className="text-xs uppercase tracking-wider font-bold text-[#ba1a1a]">
              Protocole National de Triage Obstétrical
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#aeeecb] text-[#316e52]">
              Offline
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171c23] leading-tight mt-1">
            Vérification Rapide des Signes de Danger
          </h1>
          <p className="text-xs sm:text-sm text-[#574240]">
            Cochez les symptômes ressentis en ce moment. L'algorithme évalue le risque immédiatement.
          </p>
        </div>

        {/* Pilule Audio Wolof */}
        <button
          onClick={toggleAudio}
          className="min-h-[46px] rounded-full px-5 py-2 flex items-center justify-between gap-3 shadow-xs active:scale-95 transition-all cursor-pointer shrink-0"
          style={{
            backgroundColor: audioPlaying ? '#724600' : '#ffddb8',
            color: audioPlaying ? '#ffffff' : '#2a1700',
          }}
          type="button"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[20px]">
              {audioPlaying ? 'pause' : 'volume_up'}
            </span>
            <span className="text-sm font-bold">Déglul ci Wolof</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className={`w-1 h-3 rounded-full ${audioPlaying ? 'animate-pulse' : ''}`}
              style={{ backgroundColor: audioPlaying ? '#ffffff' : '#724600' }}
            ></span>
            <span
              className={`w-1 h-4.5 rounded-full ${audioPlaying ? 'animate-bounce' : ''}`}
              style={{ backgroundColor: audioPlaying ? '#ffffff' : '#724600' }}
            ></span>
            <span
              className={`w-1 h-2 rounded-full ${audioPlaying ? 'animate-pulse' : ''}`}
              style={{ backgroundColor: audioPlaying ? '#ffffff' : '#724600' }}
            ></span>
          </div>
        </button>
      </section>

      {/* 2. GRILLE DES 4 SIGNES D'ALERTE (2 Colonnes spacieuses) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#171c23]">
            Les 4 Alertes Majeures à Surveiller
          </h2>
          <span className="text-xs text-[#574240] font-medium">Répondez par Oui ou Non</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Symptôme 1 : Saignements (Dérét) */}
          <article className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#ddc0bd]/40 flex flex-col justify-between gap-3.5 hover:border-[#ba1a1a]/50 transition-all">
            <div className="flex items-start gap-3.5">
              <div className="relative shrink-0">
                <img
                  src="/images/alerts/bleeding.jpg"
                  alt="Saignements anormaux"
                  className="w-16 h-16 rounded-xl object-cover border border-[#ffdad6] shadow-xs"
                />
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md bg-[#ba1a1a] text-white text-[9px] font-bold">
                  Dérét
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#171c23] font-serif truncate">
                    Saignements vaginaux
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#ffdad6] text-[#ba1a1a]">
                    Urgent
                  </span>
                </div>
                <p className="text-xs text-[#574240] mt-1 leading-snug">
                  Pertes de sang inhabituelles ou écoulement liquidien suspect avant terme.
                </p>
              </div>
            </div>
            <div className="pt-2.5 border-t border-[#f0f4fd] flex items-center justify-between gap-2">
              <span className="text-xs text-[#574240] font-medium">Ressentez-vous cela ?</span>
              <div className="inline-flex rounded-full bg-[#eaeef8] p-1 gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleChoice('bleeding', false)}
                  className={`min-h-[34px] min-w-[54px] rounded-full px-3 text-xs font-bold transition-all ${
                    !answers.bleeding ? 'bg-[#dee2ec] text-[#171c23] shadow-xs' : 'text-[#574240] hover:text-[#171c23]'
                  }`}
                >
                  Non
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice('bleeding', true)}
                  className={`min-h-[34px] min-w-[54px] rounded-full px-3 text-xs font-bold transition-all ${
                    answers.bleeding ? 'bg-[#ba1a1a] text-white shadow-sm' : 'text-[#574240] hover:text-[#ba1a1a]'
                  }`}
                >
                  Oui
                </button>
              </div>
            </div>
          </article>

          {/* Symptôme 2 : Maux de tête / Vue trouble (Bop métit) */}
          <article className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#ddc0bd]/40 flex flex-col justify-between gap-3.5 hover:border-[#902e2a]/50 transition-all">
            <div className="flex items-start gap-3.5">
              <div className="relative shrink-0">
                <img
                  src="/images/alerts/headache.jpg"
                  alt="Maux de tête et tension"
                  className="w-16 h-16 rounded-xl object-cover border border-[#ddc0bd]/40 shadow-xs"
                />
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md bg-[#902e2a] text-white text-[9px] font-bold">
                  Bop métit
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#171c23] font-serif truncate">
                    Maux de tête ou vue trouble
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[#e4e8f2] text-[#574240]">
                    Tension
                  </span>
                </div>
                <p className="text-xs text-[#574240] mt-1 leading-snug">
                  Éclairs devant les yeux, vertiges violents, gonflement soudain des mains ou visage.
                </p>
              </div>
            </div>
            <div className="pt-2.5 border-t border-[#f0f4fd] flex items-center justify-between gap-2">
              <span className="text-xs text-[#574240] font-medium">Ressentez-vous cela ?</span>
              <div className="inline-flex rounded-full bg-[#eaeef8] p-1 gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleChoice('headache', false)}
                  className={`min-h-[34px] min-w-[54px] rounded-full px-3 text-xs font-bold transition-all ${
                    !answers.headache ? 'bg-[#dee2ec] text-[#171c23] shadow-xs' : 'text-[#574240] hover:text-[#171c23]'
                  }`}
                >
                  Non
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice('headache', true)}
                  className={`min-h-[34px] min-w-[54px] rounded-full px-3 text-xs font-bold transition-all ${
                    answers.headache ? 'bg-[#ba1a1a] text-white shadow-sm' : 'text-[#574240] hover:text-[#ba1a1a]'
                  }`}
                >
                  Oui
                </button>
              </div>
            </div>
          </article>

          {/* Symptôme 3 : Fièvre / Frissons (Tangoor) */}
          <article className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#ddc0bd]/40 flex flex-col justify-between gap-3.5 hover:border-[#fcba67]/60 transition-all">
            <div className="flex items-start gap-3.5">
              <div className="relative shrink-0">
                <img
                  src="/images/alerts/fever.jpg"
                  alt="Fièvre forte et frissons"
                  className="w-16 h-16 rounded-xl object-cover border border-[#fcba67]/40 shadow-xs"
                />
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md bg-[#724600] text-white text-[9px] font-bold">
                  Tangoor
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#171c23] font-serif truncate">
                    Fièvre forte ou frissons
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[#ffddb8] text-[#2a1700]">
                    Infection
                  </span>
                </div>
                <p className="text-xs text-[#574240] mt-1 leading-snug">
                  Corps très chaud, frissons incontrôlés (suspicion paludisme maternel ou infection).
                </p>
              </div>
            </div>
            <div className="pt-2.5 border-t border-[#f0f4fd] flex items-center justify-between gap-2">
              <span className="text-xs text-[#574240] font-medium">Ressentez-vous cela ?</span>
              <div className="inline-flex rounded-full bg-[#eaeef8] p-1 gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleChoice('fever', false)}
                  className={`min-h-[34px] min-w-[54px] rounded-full px-3 text-xs font-bold transition-all ${
                    !answers.fever ? 'bg-[#dee2ec] text-[#171c23] shadow-xs' : 'text-[#574240] hover:text-[#171c23]'
                  }`}
                >
                  Non
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice('fever', true)}
                  className={`min-h-[34px] min-w-[54px] rounded-full px-3 text-xs font-bold transition-all ${
                    answers.fever ? 'bg-[#ba1a1a] text-white shadow-sm' : 'text-[#574240] hover:text-[#ba1a1a]'
                  }`}
                >
                  Oui
                </button>
              </div>
            </div>
          </article>

          {/* Symptôme 4 : Mouvements réduits (Liir bi) */}
          <article className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#ddc0bd]/40 flex flex-col justify-between gap-3.5 hover:border-[#aeeecb]/60 transition-all">
            <div className="flex items-start gap-3.5">
              <div className="relative shrink-0">
                <img
                  src="/images/alerts/movement.jpg"
                  alt="Diminution des mouvements"
                  className="w-16 h-16 rounded-xl object-cover border border-[#aeeecb] shadow-xs"
                />
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md bg-[#2c694e] text-white text-[9px] font-bold">
                  Liir bi
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#171c23] font-serif truncate">
                    Bébé ne bouge plus
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[#b1f0ce] text-[#002114]">
                    &lt; 10 mouv/12h
                  </span>
                </div>
                <p className="text-xs text-[#574240] mt-1 leading-snug">
                  Absence inhabituelle de coups ou baisse nette des mouvements réguliers du fœtus.
                </p>
              </div>
            </div>
            <div className="pt-2.5 border-t border-[#f0f4fd] flex items-center justify-between gap-2">
              <span className="text-xs text-[#574240] font-medium">Ressentez-vous cela ?</span>
              <div className="inline-flex rounded-full bg-[#eaeef8] p-1 gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleChoice('movement', false)}
                  className={`min-h-[34px] min-w-[54px] rounded-full px-3 text-xs font-bold transition-all ${
                    !answers.movement ? 'bg-[#dee2ec] text-[#171c23] shadow-xs' : 'text-[#574240] hover:text-[#171c23]'
                  }`}
                >
                  Non
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice('movement', true)}
                  className={`min-h-[34px] min-w-[54px] rounded-full px-3 text-xs font-bold transition-all ${
                    answers.movement ? 'bg-[#ba1a1a] text-white shadow-sm' : 'text-[#574240] hover:text-[#ba1a1a]'
                  }`}
                >
                  Oui
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 3. MOTEUR DE DÉCISION DYNAMIQUE */}
      <section className="w-full">
        {hasDanger ? (
          <div
            className="rounded-2xl p-5 sm:p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden"
            style={{ backgroundColor: '#ba1a1a', color: '#ffffff' }}
          >
            <div className="flex flex-col gap-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider">
                  Urgence Obstétricale Détectée
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                ATTENTION : Consultez immédiatement !
              </h3>
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed">
                Un signe de complication grave a été coché. Appelez directement le SAMU au 1515. Chaque minute compte pour vous et votre bébé.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 w-full md:w-72">
              <a
                className="w-full min-h-[46px] bg-white text-[#ba1a1a] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#f0f4fd] active:scale-95 transition-all"
                href="tel:1515"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>APPELER LE SAMU (1515)</span>
              </a>

              <button
                type="button"
                onClick={onNavigateToEmergency}
                className="w-full min-h-[42px] bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">local_hospital</span>
                <span>Maternités de garde 24/7</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            className="rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="material-symbols-outlined text-[26px] text-[#2c694e] shrink-0">
                check_circle
              </span>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#171c23]">
                    Aucun signe de danger détecté
                  </span>
                  <span className="text-xs bg-white text-[#2c694e] px-2.5 py-0.5 rounded-full font-bold">
                    Statut Serein (Vert)
                  </span>
                </div>
                <p className="text-xs text-[#2a1700]/90 mt-0.5">
                  Vos réponses indiquent des sensations courantes. Reposez-vous, hydratez-vous abondamment et poursuivez votre grossesse paisiblement.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleAudio}
              className="min-h-[40px] px-4 bg-white text-[#2c694e] rounded-xl flex items-center gap-2 shadow-xs hover:bg-[#f0f4fd] text-xs font-bold shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
              <span>Écouter Badien Gox</span>
            </button>
          </div>
        )}
      </section>

      {/* 4. PROTOCOLE TRICOLORE & CONFIDENTIALITÉ SUTURA */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Protocole Tricolore National */}
        <div className="bg-[#eaeef8] rounded-2xl p-4 sm:p-5 flex flex-col gap-3 border border-[#ddc0bd]/40">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-serif font-bold text-[#171c23]">
              Comprendre le Protocole National de Triage
            </h4>
            <span className="material-symbols-outlined text-[#574240] text-[20px]">info</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-2.5 rounded-xl flex items-center gap-2.5 shadow-xs">
              <span className="w-3.5 h-3.5 rounded-full bg-[#ba1a1a] shrink-0"></span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#171c23] truncate">Rouge</p>
                <p className="text-[11px] text-[#574240] truncate">SAMU 1515</p>
              </div>
            </div>
            <div className="bg-white p-2.5 rounded-xl flex items-center gap-2.5 shadow-xs">
              <span className="w-3.5 h-3.5 rounded-full bg-[#724600] shrink-0"></span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#171c23] truncate">Orange</p>
                <p className="text-[11px] text-[#574240] truncate">Avis 24-48h</p>
              </div>
            </div>
            <div className="bg-white p-2.5 rounded-xl flex items-center gap-2.5 shadow-xs">
              <span className="w-3.5 h-3.5 rounded-full bg-[#2c694e] shrink-0"></span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#171c23] truncate">Vert</p>
                <p className="text-[11px] text-[#574240] truncate">Paisible</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne 116 Sutura */}
        <div className="bg-[#f0f4fd] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 border border-[#ddc0bd]/40">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-[#aeeecb] text-[#316e52] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">shield</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-[#171c23] truncate">
                100% Anonyme &amp; Ligne 116
              </span>
              <p className="text-xs text-[#574240] leading-snug">
                Écoute et orientation bienveillante gratuite 24/7 au Sénégal.
              </p>
            </div>
          </div>
          <a
            className="min-h-[38px] px-4 bg-[#902e2a] hover:bg-[#72201d] text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs shrink-0"
            href="tel:116"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span>116</span>
          </a>
        </div>
      </section>
    </div>
  );
}