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
    <div className="w-full flex flex-col gap-4 sm:gap-6">
      {/* 1. EN-TÊTE SÉCURITÉ & GUIDAGE VOCAL WOLOF */}
      <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#ddc0bd]/30">
        <div className="flex flex-col gap-1 max-w-2xl">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span
              className="material-symbols-outlined text-[20px] sm:text-[22px] text-[#ba1a1a]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              crisis_alert
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-[#ba1a1a]">
              Protocole National de Triage Obstétrical
            </span>
            <span
              className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold inline-flex items-center gap-1"
              style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
            >
              <span className="material-symbols-outlined text-[13px]">offline_pin</span>
              <span>Offline</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#171c23] leading-tight mt-0.5">
            Vérification Rapide des Signes de Danger
          </h1>
          <p className="text-xs sm:text-sm text-[#574240]">
            Cochez les symptômes ressentis en ce moment. L'algorithme évalue le risque instantanément.
          </p>
        </div>

        {/* Pilule Audio Wolof */}
        <button
          onClick={toggleAudio}
          className="min-h-[48px] sm:min-h-[52px] rounded-full px-4 sm:px-5 py-2 flex items-center justify-between gap-3 sm:gap-4 shadow-sm active:scale-[0.98] transition-all cursor-pointer shrink-0"
          style={{
            backgroundColor: audioPlaying ? '#724600' : '#ffddb8',
            color: audioPlaying ? '#ffffff' : '#2a1700',
          }}
          type="button"
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0"
              style={{
                backgroundColor: audioPlaying ? '#902e2a' : '#724600',
                color: '#ffffff',
              }}
            >
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">
                {audioPlaying ? 'pause' : 'volume_up'}
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold">Déglul ci Wolof</span>
              <span className="text-[10px] sm:text-xs opacity-80">Consigne vocale</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span
              className={`w-1 sm:w-1.5 h-3 sm:h-3.5 rounded-full ${audioPlaying ? 'animate-pulse' : ''}`}
              style={{ backgroundColor: audioPlaying ? '#ffffff' : '#724600' }}
            ></span>
            <span
              className={`w-1 sm:w-1.5 h-4 sm:h-5 rounded-full ${audioPlaying ? 'animate-bounce' : ''}`}
              style={{ backgroundColor: audioPlaying ? '#ffffff' : '#724600' }}
            ></span>
            <span
              className={`w-1 sm:w-1.5 h-2 sm:h-2.5 rounded-full ${audioPlaying ? 'animate-pulse' : ''}`}
              style={{ backgroundColor: audioPlaying ? '#ffffff' : '#724600' }}
            ></span>
          </div>
        </button>
      </section>

      {/* 2. GRILLE RESPONSIVE DES 4 SIGNES D'ALERTE */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#171c23]">
            Les 4 Alertes Majeures à Surveiller
          </h2>
          <span className="text-xs text-[#574240] font-medium">Répondez par Oui ou Non</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {/* Symptôme 1 : Saignements (Dérét) */}
          <article className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#ddc0bd]/30 flex flex-col justify-between gap-3.5 transition-all hover:border-[#ba1a1a]/40">
            <div className="flex items-start gap-3 sm:gap-4">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center shrink-0"
                style={{ backgroundColor: '#ffdad6', color: '#93000a' }}
              >
                <span
                  className="material-symbols-outlined text-[24px] sm:text-[28px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  water_drop
                </span>
                <span className="text-[10px] sm:text-xs text-center leading-none mt-0.5 font-bold">
                  Dérét
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#171c23] font-serif truncate">
                    Saignements vaginaux
                  </h3>
                  <span
                    className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-bold shrink-0"
                    style={{ backgroundColor: '#ffdad6', color: '#ba1a1a' }}
                  >
                    Urgent
                  </span>
                </div>
                <p className="text-xs text-[#574240] mt-1 leading-snug">
                  Pertes de sang inhabituelles ou écoulement liquidien suspect avant terme.
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-[#f0f4fd] flex items-center justify-between gap-2">
              <span className="text-xs text-[#574240] font-medium truncate">
                Ressentez-vous cela ?
              </span>
              <div className="inline-flex rounded-full bg-[#eaeef8] p-1 gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleChoice('bleeding', false)}
                  className={`min-h-[36px] min-w-[50px] sm:min-w-[56px] rounded-full px-2.5 sm:px-3 text-xs font-bold transition-all ${
                    !answers.bleeding
                      ? 'bg-[#dee2ec] text-[#171c23] shadow-xs'
                      : 'text-[#574240] hover:text-[#171c23]'
                  }`}
                >
                  Non
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice('bleeding', true)}
                  className={`min-h-[36px] min-w-[50px] sm:min-w-[56px] rounded-full px-2.5 sm:px-3 text-xs font-bold transition-all ${
                    answers.bleeding
                      ? 'bg-[#ba1a1a] text-white shadow-sm'
                      : 'text-[#574240] hover:text-[#ba1a1a]'
                  }`}
                >
                  Oui
                </button>
              </div>
            </div>
          </article>

          {/* Symptôme 2 : Maux de tête / Vue trouble (Bop métit) */}
          <article className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#ddc0bd]/30 flex flex-col justify-between gap-3.5 transition-all hover:border-[#902e2a]/40">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#dee2ec] text-[#902e2a] flex flex-col items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px] sm:text-[28px]">bolt</span>
                <span className="text-[10px] sm:text-xs text-center leading-none mt-0.5 font-bold">
                  Bop métit
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#171c23] font-serif truncate">
                    Maux de tête ou vue trouble
                  </h3>
                  <span className="bg-[#e4e8f2] text-[#574240] text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-semibold shrink-0">
                    Tension
                  </span>
                </div>
                <p className="text-xs text-[#574240] mt-1 leading-snug">
                  Éclairs devant les yeux, vertiges violents, gonflement soudain des mains ou visage.
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-[#f0f4fd] flex items-center justify-between gap-2">
              <span className="text-xs text-[#574240] font-medium truncate">
                Ressentez-vous cela ?
              </span>
              <div className="inline-flex rounded-full bg-[#eaeef8] p-1 gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleChoice('headache', false)}
                  className={`min-h-[36px] min-w-[50px] sm:min-w-[56px] rounded-full px-2.5 sm:px-3 text-xs font-bold transition-all ${
                    !answers.headache
                      ? 'bg-[#dee2ec] text-[#171c23] shadow-xs'
                      : 'text-[#574240] hover:text-[#171c23]'
                  }`}
                >
                  Non
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice('headache', true)}
                  className={`min-h-[36px] min-w-[50px] sm:min-w-[56px] rounded-full px-2.5 sm:px-3 text-xs font-bold transition-all ${
                    answers.headache
                      ? 'bg-[#ba1a1a] text-white shadow-sm'
                      : 'text-[#574240] hover:text-[#ba1a1a]'
                  }`}
                >
                  Oui
                </button>
              </div>
            </div>
          </article>

          {/* Symptôme 3 : Fièvre / Frissons (Tangoor) */}
          <article className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#ddc0bd]/30 flex flex-col justify-between gap-3.5 transition-all hover:border-[#fcba67]/60">
            <div className="flex items-start gap-3 sm:gap-4">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center shrink-0"
                style={{ backgroundColor: '#fcba67', color: '#2a1700' }}
              >
                <span className="material-symbols-outlined text-[24px] sm:text-[28px]">device_thermostat</span>
                <span className="text-[10px] sm:text-xs text-center leading-none mt-0.5 font-bold">
                  Tangoor
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#171c23] font-serif truncate">
                    Fièvre ou frissons intenses
                  </h3>
                  <span
                    className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-semibold shrink-0"
                    style={{ backgroundColor: '#ffddb8', color: '#2a1700' }}
                  >
                    Infection
                  </span>
                </div>
                <p className="text-xs text-[#574240] mt-1 leading-snug">
                  Corps très chaud, frissons incontrôlés (suspicion paludisme maternel ou infection).
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-[#f0f4fd] flex items-center justify-between gap-2">
              <span className="text-xs text-[#574240] font-medium truncate">
                Ressentez-vous cela ?
              </span>
              <div className="inline-flex rounded-full bg-[#eaeef8] p-1 gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleChoice('fever', false)}
                  className={`min-h-[36px] min-w-[50px] sm:min-w-[56px] rounded-full px-2.5 sm:px-3 text-xs font-bold transition-all ${
                    !answers.fever
                      ? 'bg-[#dee2ec] text-[#171c23] shadow-xs'
                      : 'text-[#574240] hover:text-[#171c23]'
                  }`}
                >
                  Non
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice('fever', true)}
                  className={`min-h-[36px] min-w-[50px] sm:min-w-[56px] rounded-full px-2.5 sm:px-3 text-xs font-bold transition-all ${
                    answers.fever
                      ? 'bg-[#ba1a1a] text-white shadow-sm'
                      : 'text-[#574240] hover:text-[#ba1a1a]'
                  }`}
                >
                  Oui
                </button>
              </div>
            </div>
          </article>

          {/* Symptôme 4 : Mouvements réduits (Liir bi) */}
          <article className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#ddc0bd]/30 flex flex-col justify-between gap-3.5 transition-all hover:border-[#aeeecb]/60">
            <div className="flex items-start gap-3 sm:gap-4">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center shrink-0"
                style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
              >
                <span className="material-symbols-outlined text-[24px] sm:text-[28px]">child_care</span>
                <span className="text-[10px] sm:text-xs text-center leading-none mt-0.5 font-bold">
                  Liir bi
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm sm:text-base font-bold text-[#171c23] font-serif truncate">
                    Bébé bouge moins / pas du tout
                  </h3>
                  <span
                    className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full font-semibold shrink-0"
                    style={{ backgroundColor: '#b1f0ce', color: '#002114' }}
                  >
                    &lt; 10 mouv/12h
                  </span>
                </div>
                <p className="text-xs text-[#574240] mt-1 leading-snug">
                  Absence inhabituelle de coups ou baisse nette des mouvements réguliers du fœtus.
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-[#f0f4fd] flex items-center justify-between gap-2">
              <span className="text-xs text-[#574240] font-medium truncate">
                Ressentez-vous cela ?
              </span>
              <div className="inline-flex rounded-full bg-[#eaeef8] p-1 gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleChoice('movement', false)}
                  className={`min-h-[36px] min-w-[50px] sm:min-w-[56px] rounded-full px-2.5 sm:px-3 text-xs font-bold transition-all ${
                    !answers.movement
                      ? 'bg-[#dee2ec] text-[#171c23] shadow-xs'
                      : 'text-[#574240] hover:text-[#171c23]'
                  }`}
                >
                  Non
                </button>
                <button
                  type="button"
                  onClick={() => handleChoice('movement', true)}
                  className={`min-h-[36px] min-w-[50px] sm:min-w-[56px] rounded-full px-2.5 sm:px-3 text-xs font-bold transition-all ${
                    answers.movement
                      ? 'bg-[#ba1a1a] text-white shadow-sm'
                      : 'text-[#574240] hover:text-[#ba1a1a]'
                  }`}
                >
                  Oui
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 3. MOTEUR DE DÉCISION DYNAMIQUE (ROUGE OU VERT) */}
      <section className="w-full">
        {hasDanger ? (
          <div
            className="rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5 relative overflow-hidden transition-all duration-300 animate-fadeIn"
            style={{ backgroundColor: '#ba1a1a', color: '#ffffff' }}
          >
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-white animate-ping"></span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Urgence Vitale Immédiate Détectée
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                ATTENTION : Consultez immédiatement !
              </h3>
              <p className="text-xs sm:text-sm text-white/95 leading-snug">
                Un signe de complication grave a été coché. Chaque minute compte pour votre santé et celle de votre enfant.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-lg px-2.5 sm:px-3 py-1.5 w-fit mt-1">
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">record_voice_over</span>
                <span className="text-[11px] sm:text-xs font-semibold">Alerte vocale Wolof active</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:gap-2.5 shrink-0 w-full md:w-80">
              <a
                className="w-full min-h-[46px] sm:min-h-[50px] bg-white text-[#ba1a1a] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#f0f4fd] transition-colors"
                href="tel:1515"
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">call</span>
                <span>APPELER LE SAMU (1515)</span>
              </a>

              <button
                type="button"
                onClick={onNavigateToEmergency}
                className="w-full min-h-[42px] sm:min-h-[44px] bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">local_hospital</span>
                <span>Maternités de garde les plus proches</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            className="rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 transition-all"
            style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
          >
            <div className="flex flex-col gap-1 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="material-symbols-outlined text-[22px] sm:text-[26px]" style={{ color: '#2c694e' }}>
                  check_circle
                </span>
                <span className="text-base sm:text-lg font-bold text-[#171c23]">
                  Aucun signe de danger détecté
                </span>
                <span className="text-[10px] sm:text-xs bg-white text-[#2c694e] px-2.5 py-0.5 rounded-full font-bold">
                  Statut Serein (Vert)
                </span>
              </div>
              <p className="text-xs opacity-90 leading-snug">
                Vos réponses indiquent des sensations courantes et saines. Reposez-vous à l'ombre, hydratez-vous abondamment et poursuivez votre grossesse en toute sérénité.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={toggleAudio}
                className="min-h-[40px] sm:min-h-[44px] px-3.5 sm:px-4 bg-white text-[#2c694e] rounded-xl flex items-center gap-2 shadow-xs hover:bg-[#f0f4fd] transition-colors text-xs font-bold"
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]" style={{ color: '#2c694e' }}>
                  record_voice_over
                </span>
                <span>Écouter Badien Gox</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 4. COMPRENDRE LE TRIAGE NATIONAL EN 3 COLONNES SUR ORDINATEUR / TABLETTE */}
      <section className="bg-[#eaeef8] rounded-2xl p-4 sm:p-5 flex flex-col gap-3 border border-[#ddc0bd]/30">
        <div className="flex items-center justify-between">
          <h4 className="text-base sm:text-lg font-serif font-bold text-[#171c23]">
            Comprendre le Protocole National de Triage
          </h4>
          <span className="material-symbols-outlined text-[#574240] text-[18px] sm:text-[20px]">info</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          <div className="bg-white p-3 sm:p-3.5 rounded-xl flex items-center gap-3 shadow-xs">
            <span className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-[#ba1a1a] shrink-0"></span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#171c23] truncate">
                Rouge : Urgence Immédiate
              </p>
              <p className="text-[11px] text-[#574240] truncate">
                SAMU 1515 sans délai.
              </p>
            </div>
          </div>

          <div className="bg-white p-3 sm:p-3.5 rounded-xl flex items-center gap-3 shadow-xs">
            <span className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-[#724600] shrink-0"></span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#171c23] truncate">
                Orange : Avis sous 24-48h
              </p>
              <p className="text-[11px] text-[#574240] truncate">
                Visite Badien Gox.
              </p>
            </div>
          </div>

          <div className="bg-white p-3 sm:p-3.5 rounded-xl flex items-center gap-3 shadow-xs">
            <span className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-[#2c694e] shrink-0"></span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#171c23] truncate">
                Vert : Grossesse paisible
              </p>
              <p className="text-[11px] text-[#574240] truncate">
                Continuité des soins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CARTE COMMUNAUTAIRE BADIEN GOX & CONFIDENTIALITÉ SUTURA */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col border border-[#ddc0bd]/30">
          <div
            className="bg-cover bg-center w-full h-40 sm:h-44 relative"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkm3zVc9aAnErkQf_C7hPFVPcm3S8OpTO9Nd-fUk5jLmFWzRzUyrGaGfPeN1XZVPlR_vBAmIQuQFI9ll2SZzrCbm1VqNbGfZqIzQMGQRsbH0iie5cGJaF2XltpnWVCjxzplUZQcdc4iyROMC4wQPoJHQ9A8cobrySMXWRjOTGaqZDgIj-101c5rh7vsIUg9OTYG3vc2Ny0NFMj-vNAgc4ZJMbwuLOT49hHpvyalS8')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#171c23]/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold" style={{ color: '#ffddb8' }}>
                Soutien Badien Gox
              </span>
              <h4 className="text-base sm:text-lg font-serif font-bold leading-tight text-white">
                Accompagnement Communautaire de Proximité
              </h4>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-[#574240] leading-snug">
              Dans chaque quartier et village du Sénégal, votre marraine de santé communautaire veille sur vous dans la discrétion et le respect de votre dignité intime.
            </p>
          </div>
        </div>

        <div className="bg-[#f0f4fd] rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3 sm:gap-4 border border-[#ddc0bd]/30">
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
            >
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">shield</span>
            </div>
            <div>
              <h5 className="text-sm sm:text-base font-bold text-[#171c23]">
                100% Anonyme &amp; Sutura Garanti
              </h5>
              <p className="text-xs text-[#574240] mt-1 leading-snug">
                Aucune donnée médicale n'est transmise sans votre accord explicite. L'application respecte les normes éthiques du numérique en santé.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#902e2a] text-[20px] shrink-0">
                support_agent
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#171c23] truncate">
                  Ligne d'écoute nationale gratuite
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#574240] truncate">
                  Assistance discrète &amp; bienveillante 24/7
                </span>
              </div>
            </div>
            <a
              className="min-h-[36px] sm:min-h-[38px] px-3.5 sm:px-4 py-1.5 bg-[#902e2a] text-white rounded-full text-xs font-bold flex items-center gap-1 active:opacity-90 shrink-0"
              href="tel:116"
            >
              <span className="material-symbols-outlined text-[15px]">call</span>
              <span>116</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
