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
    <div className="flex flex-col w-full px-4 gap-4">
      {/* 1. EN-TÊTE SÉCURITÉ & GUIDAGE VOCAL WOLOF STITCH EXACT */}
      <section className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2.5 border border-[#ddc0bd]/30">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[#ba1a1a] text-[0.8125rem]">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              crisis_alert
            </span>
            <span className="tracking-wide uppercase font-bold">Protocole UNICEF Femtech</span>
          </div>
          <span
            className="px-2 py-0.5 rounded-full text-[0.6875rem] flex items-center gap-1 font-bold"
            style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
          >
            <span className="material-symbols-outlined text-[14px]">offline_pin</span>
            <span>Offline</span>
          </span>
        </div>

        <div>
          <h1 className="text-[1.375rem] font-serif font-bold text-[#171c23] leading-tight">
            Vérification Rapide des Symptômes
          </h1>
          <p className="text-[0.8125rem] text-[#574240] mt-0.5">
            Cochez ce que vous ressentez en ce moment. Ne restez jamais avec un doute.
          </p>
        </div>

        {/* Pilule Audio Wolof */}
        <button
          onClick={toggleAudio}
          className="w-full min-h-[52px] rounded-full px-4 py-2 flex items-center justify-between shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          style={{
            backgroundColor: audioPlaying ? '#724600' : '#ffddb8',
            color: audioPlaying ? '#ffffff' : '#2a1700',
          }}
          type="button"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{
                backgroundColor: audioPlaying ? '#902e2a' : '#724600',
                color: '#ffffff',
              }}
            >
              <span className="material-symbols-outlined text-[20px]">
                {audioPlaying ? 'pause' : 'volume_up'}
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[0.9375rem] font-bold">Déglul ci Wolof</span>
              <span className="text-[0.6875rem] opacity-80">Écouter la consigne audio</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span
              className={`w-1.5 h-3.5 rounded-full ${audioPlaying ? 'animate-pulse' : ''}`}
              style={{ backgroundColor: audioPlaying ? '#ffffff' : '#724600' }}
            ></span>
            <span
              className={`w-1.5 h-5 rounded-full ${audioPlaying ? 'animate-bounce' : ''}`}
              style={{ backgroundColor: audioPlaying ? '#ffffff' : '#724600' }}
            ></span>
            <span
              className={`w-1.5 h-2.5 rounded-full ${audioPlaying ? 'animate-pulse' : ''}`}
              style={{ backgroundColor: audioPlaying ? '#ffffff' : '#724600' }}
            ></span>
          </div>
        </button>
      </section>

      {/* 2. GRILLE DES 4 SIGNES D'ALERTE MAJEURS STITCH EXACT */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[1.25rem] font-serif font-bold text-[#171c23]">
            Signes d'Alerte Majeurs
          </h2>
          <span className="text-[0.6875rem] text-[#574240] font-medium">4 points clés</span>
        </div>

        {/* Symptôme 1 : Saignements (Dérét) */}
        <article className="bg-white rounded-2xl p-4 shadow-sm border border-[#ddc0bd]/30 transition-all">
          <div className="flex items-start gap-3.5">
            <div
              className="w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0"
              style={{ backgroundColor: '#ffdad6', color: '#93000a' }}
            >
              <span
                className="material-symbols-outlined text-[28px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                water_drop
              </span>
              <span className="text-[0.6875rem] text-center leading-none mt-0.5 font-bold">
                Dérét
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-[1.125rem] font-bold text-[#171c23] truncate font-serif">
                  Saignements vaginaux
                </h3>
                <span
                  className="text-[0.6875rem] px-2 py-0.5 rounded-full font-bold"
                  style={{ backgroundColor: '#ffdad6', color: '#ba1a1a' }}
                >
                  Urgent
                </span>
              </div>
              <p className="text-[0.8125rem] text-[#574240] mt-0.5 leading-snug">
                Pertes de sang inhabituelles ou écoulement suspect.
              </p>
            </div>
          </div>
          <div className="mt-3.5 pt-1 flex items-center justify-between">
            <span className="text-[0.8125rem] text-[#574240] font-medium">
              Ressentez-vous cela ?
            </span>
            <div className="inline-flex rounded-full bg-[#eaeef8] p-1 gap-1">
              <button
                type="button"
                onClick={() => handleChoice('bleeding', false)}
                className={`min-h-[38px] min-w-[54px] rounded-full px-3 text-[0.8125rem] font-bold transition-all ${
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
                className={`min-h-[38px] min-w-[54px] rounded-full px-3 text-[0.8125rem] font-bold transition-all ${
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
        <article className="bg-white rounded-2xl p-4 shadow-sm border border-[#ddc0bd]/30 transition-all">
          <div className="flex items-start gap-3.5">
            <div className="w-14 h-14 rounded-xl bg-[#dee2ec] text-[#902e2a] flex flex-col items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">bolt</span>
              <span className="text-[0.6875rem] text-center leading-none mt-0.5 font-bold">
                Bop métit
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-[1.125rem] font-bold text-[#171c23] truncate font-serif">
                  Maux de tête ou vue trouble
                </h3>
                <span className="bg-[#e4e8f2] text-[#574240] text-[0.6875rem] px-2 py-0.5 rounded-full font-semibold">
                  Tension
                </span>
              </div>
              <p className="text-[0.8125rem] text-[#574240] mt-0.5 leading-snug">
                Éclairs devant les yeux, vertiges violents, gonflement soudain.
              </p>
            </div>
          </div>
          <div className="mt-3.5 pt-1 flex items-center justify-between">
            <span className="text-[0.8125rem] text-[#574240] font-medium">
              Ressentez-vous cela ?
            </span>
            <div className="inline-flex rounded-full bg-[#eaeef8] p-1 gap-1">
              <button
                type="button"
                onClick={() => handleChoice('headache', false)}
                className={`min-h-[38px] min-w-[54px] rounded-full px-3 text-[0.8125rem] font-bold transition-all ${
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
                className={`min-h-[38px] min-w-[54px] rounded-full px-3 text-[0.8125rem] font-bold transition-all ${
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
        <article className="bg-white rounded-2xl p-4 shadow-sm border border-[#ddc0bd]/30 transition-all">
          <div className="flex items-start gap-3.5">
            <div
              className="w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0"
              style={{ backgroundColor: '#fcba67', color: '#2a1700' }}
            >
              <span className="material-symbols-outlined text-[28px]">device_thermostat</span>
              <span className="text-[0.6875rem] text-center leading-none mt-0.5 font-bold">
                Tangoor
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-[1.125rem] font-bold text-[#171c23] truncate font-serif">
                  Fièvre ou frissons intenses
                </h3>
                <span
                  className="text-[0.6875rem] px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: '#ffddb8', color: '#2a1700' }}
                >
                  Infection
                </span>
              </div>
              <p className="text-[0.8125rem] text-[#574240] mt-0.5 leading-snug">
                Corps très chaud, frissons incontrôlés (suspicion paludisme).
              </p>
            </div>
          </div>
          <div className="mt-3.5 pt-1 flex items-center justify-between">
            <span className="text-[0.8125rem] text-[#574240] font-medium">
              Ressentez-vous cela ?
            </span>
            <div className="inline-flex rounded-full bg-[#eaeef8] p-1 gap-1">
              <button
                type="button"
                onClick={() => handleChoice('fever', false)}
                className={`min-h-[38px] min-w-[54px] rounded-full px-3 text-[0.8125rem] font-bold transition-all ${
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
                className={`min-h-[38px] min-w-[54px] rounded-full px-3 text-[0.8125rem] font-bold transition-all ${
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
        <article className="bg-white rounded-2xl p-4 shadow-sm border border-[#ddc0bd]/30 transition-all">
          <div className="flex items-start gap-3.5">
            <div
              className="w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0"
              style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
            >
              <span className="material-symbols-outlined text-[28px]">child_care</span>
              <span className="text-[0.6875rem] text-center leading-none mt-0.5 font-bold">
                Liir bi
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-[1.125rem] font-bold text-[#171c23] truncate font-serif">
                  Bébé bouge moins / pas du tout
                </h3>
                <span
                  className="text-[0.6875rem] px-2 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: '#b1f0ce', color: '#002114' }}
                >
                  &lt; 10 mouv/12h
                </span>
              </div>
              <p className="text-[0.8125rem] text-[#574240] mt-0.5 leading-snug">
                Absence de coups ou baisse nette des mouvements habituels.
              </p>
            </div>
          </div>
          <div className="mt-3.5 pt-1 flex items-center justify-between">
            <span className="text-[0.8125rem] text-[#574240] font-medium">
              Ressentez-vous cela ?
            </span>
            <div className="inline-flex rounded-full bg-[#eaeef8] p-1 gap-1">
              <button
                type="button"
                onClick={() => handleChoice('movement', false)}
                className={`min-h-[38px] min-w-[54px] rounded-full px-3 text-[0.8125rem] font-bold transition-all ${
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
                className={`min-h-[38px] min-w-[54px] rounded-full px-3 text-[0.8125rem] font-bold transition-all ${
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
      </section>

      {/* 3. MOTEUR DE DÉCISION TRICOLORE DYNAMIQUE STITCH EXACT */}
      <section className="flex flex-col gap-3 pt-1">
        {/* STATUT ROUGE : Déclenché immédiatement dès qu'un OUI est coché */}
        {hasDanger ? (
          <div
            className="rounded-2xl p-4 shadow-xl flex flex-col gap-3 relative overflow-hidden transition-all duration-300 animate-fadeIn"
            style={{ backgroundColor: '#ba1a1a', color: '#ffffff' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
                <span className="text-[0.9375rem] font-bold uppercase tracking-wider">
                  Urgence Vitale Immédiate
                </span>
              </div>
              <span className="material-symbols-outlined text-[28px] animate-bounce">
                warning
              </span>
            </div>

            <div>
              <h3 className="text-[1.25rem] font-serif font-bold text-white">
                ATTENTION : Consultez immédiatement !
              </h3>
              <p className="text-[0.8125rem] text-white/95 mt-1 leading-snug">
                Un signe de complication est détecté. Chaque minute compte pour votre santé et celle de votre enfant.
              </p>
            </div>

            {/* Alerte vocale Wolof active */}
            <div className="bg-white/15 rounded-xl p-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
                <span className="text-[0.6875rem] font-semibold">Alerte vocale Wolof active</span>
              </div>
              <span className="text-[0.6875rem] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                Automatique
              </span>
            </div>

            {/* Boutons d'Action Directe 1515 */}
            <div className="flex flex-col gap-2 pt-1">
              <a
                className="w-full min-h-[52px] bg-white text-[#ba1a1a] rounded-xl text-[0.9375rem] font-bold flex items-center justify-center gap-2 shadow-md active:opacity-90"
                href="tel:1515"
              >
                <span className="material-symbols-outlined text-[24px]">call</span>
                <span>APPELER LE SAMU (1515) - GRATUIT 24/7</span>
              </a>

              <div className="flex items-center justify-center gap-2 py-1.5 bg-white/20 rounded-xl text-center">
                <span className="material-symbols-outlined text-[18px]">dialpad</span>
                <span className="text-[0.6875rem] font-bold">
                  Sans smartphone ni internet : Composez *1515# (Gratuit)
                </span>
              </div>

              <button
                type="button"
                onClick={onNavigateToEmergency}
                className="w-full min-h-[46px] bg-white/15 text-white rounded-xl text-[0.8125rem] font-semibold flex items-center justify-center gap-2 hover:bg-white/25 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">local_hospital</span>
                <span>Localiser la maternité la plus proche</span>
              </button>
            </div>
          </div>
        ) : (
          /* STATUT VERT : Affiché quand tout est Non */
          <div
            className="rounded-2xl p-4 shadow-sm flex flex-col gap-2 transition-all"
            style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px]" style={{ color: '#2c694e' }}>
                  check_circle
                </span>
                <span className="text-[0.9375rem] font-bold text-[#171c23]">
                  Aucun signe de danger détecté
                </span>
              </div>
              <span className="text-[0.6875rem] bg-white text-[#2c694e] px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                Statut Vert
              </span>
            </div>
            <p className="text-[0.8125rem] opacity-90 leading-snug">
              Vos réponses indiquent des sensations courantes et saines. Reposez-vous à l'ombre, hydratez-vous abondamment et poursuivez votre grossesse en toute sérénité.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={toggleAudio}
                className="w-full min-h-[44px] bg-white text-[#2c694e] rounded-xl px-3 py-2 flex items-center justify-between shadow-xs active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]" style={{ color: '#2c694e' }}>
                    record_voice_over
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-[0.8125rem] font-bold text-[#171c23]">
                      Écouter la marraine Badien Gox
                    </span>
                    <span className="text-[0.6875rem] text-[#574240]">
                      Message audio bienveillant (Wolof &amp; FR)
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px]" style={{ color: '#2c694e' }}>
                  play_circle
                </span>
              </button>

              <div className="flex items-center justify-between bg-white/80 rounded-xl px-3 py-2 text-[#171c23]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#902e2a]">
                    calendar_month
                  </span>
                  <span className="text-[0.6875rem] font-semibold">
                    Prochaine CPN : planifiée à terme
                  </span>
                </div>
                <span className="text-[0.6875rem] font-bold text-[#902e2a]">
                  À jour
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Explication du Triage National */}
        <div className="bg-[#eaeef8] rounded-2xl p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-[1.125rem] font-serif font-bold text-[#171c23]">
              Comprendre le Triage National
            </h4>
            <span className="material-symbols-outlined text-[#574240] text-[20px]">info</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-white p-3 rounded-xl flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#ba1a1a] shrink-0"></span>
              <div className="min-w-0">
                <p className="text-[0.8125rem] font-bold text-[#171c23] truncate">
                  Rouge : Urgence Immédiate
                </p>
                <p className="text-[0.6875rem] text-[#574240]">
                  SAMU 1515 ou évacuation d'urgence sans délai.
                </p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#724600] shrink-0"></span>
              <div className="min-w-0">
                <p className="text-[0.8125rem] font-bold text-[#171c23] truncate">
                  Orange : Avis médical sous 24-48h
                </p>
                <p className="text-[0.6875rem] text-[#574240]">
                  Visite conseillée auprès de la Badien Gox ou sage-femme.
                </p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#2c694e] shrink-0"></span>
              <div className="min-w-0">
                <p className="text-[0.8125rem] font-bold text-[#171c23] truncate">
                  Vert : Grossesse paisible
                </p>
                <p className="text-[0.6875rem] text-[#574240]">
                  Continuité des soins préventifs et repos quotidien.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CARTE COMMUNAUTAIRE BADIEN GOX AVEC PHOTO STITCH EXACT */}
      <section className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col border border-[#ddc0bd]/30">
        <div
          className="bg-cover bg-center w-full h-40 relative"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkm3zVc9aAnErkQf_C7hPFVPcm3S8OpTO9Nd-fUk5jLmFWzRzUyrGaGfPeN1XZVPlR_vBAmIQuQFI9ll2SZzrCbm1VqNbGfZqIzQMGQRsbH0iie5cGJaF2XltpnWVCjxzplUZQcdc4iyROMC4wQPoJHQ9A8cobrySMXWRjOTGaqZDgIj-101c5rh7vsIUg9OTYG3vc2Ny0NFMj-vNAgc4ZJMbwuLOT49hHpvyalS8')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#171c23]/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="text-[0.6875rem] uppercase tracking-wider font-bold" style={{ color: '#ffddb8' }}>
              Soutien Badien Gox
            </span>
            <h4 className="text-[1.125rem] font-serif font-bold leading-tight text-white">
              Accompagnement de proximité
            </h4>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-1">
          <p className="text-[0.8125rem] text-[#574240] leading-snug">
            Dans chaque quartier et village, votre marraine de santé communautaire veille sur vous dans la discrétion et le respect de votre intimité (Sutura).
          </p>
        </div>
      </section>

      {/* 5. CONFIDENTIALITÉ SUTURA & LIGNE 116 STITCH EXACT */}
      <footer className="bg-[#f0f4fd] rounded-2xl p-4 flex flex-col gap-3 mb-2 border border-[#ddc0bd]/30">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
          >
            <span className="material-symbols-outlined text-[20px]">shield</span>
          </div>
          <div className="min-w-0">
            <h5 className="text-[0.9375rem] font-bold text-[#171c23]">
              100% Anonyme &amp; Sutura Garanti
            </h5>
            <p className="text-[0.6875rem] text-[#574240]">
              Aucune donnée médicale n'est transmise sans votre accord. Tout fonctionne hors-connexion.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#902e2a] text-[20px]">
              support_agent
            </span>
            <div className="flex flex-col">
              <span className="text-[0.8125rem] font-bold text-[#171c23]">
                Ligne d'écoute nationale
              </span>
              <span className="text-[0.6875rem] text-[#574240]">
                Assistance discrète &amp; gratuite
              </span>
            </div>
          </div>
          <a
            className="min-h-[38px] px-3.5 py-1.5 bg-[#902e2a] text-white rounded-full text-[0.8125rem] font-bold flex items-center gap-1 active:opacity-90"
            href="tel:116"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span>116</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
