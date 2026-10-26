import React, { useState } from 'react';
import AudioPlayerButton from './AudioPlayerButton';

export default function DangerSignsTriage({ t, lang, onActionTrack, onNavigateToEmergency }) {
  const [answers, setAnswers] = useState({
    bleeding: false,
    headache: false,
    fever: false,
    fetalMovement: false,
  });

  const toggleAnswer = (key, value) => {
    setAnswers((prev) => {
      const updated = { ...prev, [key]: value };
      const hasDanger = Object.values(updated).some(Boolean);
      if (hasDanger && onActionTrack) onActionTrack('emergency_red');
      else if (onActionTrack) onActionTrack('triage_green');
      return updated;
    });
  };

  const hasUrgentSign = Object.values(answers).some(Boolean);

  const symptoms = [
    {
      id: 'bleeding',
      nameFr: 'Saignements vaginaux',
      nameWo: 'Dérét buy génn',
      tagFr: 'Urgent',
      wolofWord: 'Dérét',
      descFr: 'Pertes de sang inhabituelles ou écoulement suspect.',
      icon: 'water_drop',
      colorClass: 'bg-[#ffdad6] text-[#ba1a1a]'
    },
    {
      id: 'headache',
      nameFr: 'Maux de tête ou vue trouble',
      nameWo: 'Bop métit',
      tagFr: 'Tension',
      wolofWord: 'Bop métit',
      descFr: 'Éclairs devant les yeux, vertiges violents, gonflement soudain.',
      icon: 'bolt',
      colorClass: 'bg-[#dee2ec] text-[#902e2a]'
    },
    {
      id: 'fever',
      nameFr: 'Fièvre ou frissons intenses',
      nameWo: 'Tangoor',
      tagFr: 'Infection',
      wolofWord: 'Tangoor',
      descFr: 'Corps très chaud, frissons incontrôlés (suspicion paludisme).',
      icon: 'device_thermostat',
      colorClass: 'bg-[#ffe3c7] text-[#724600]'
    },
    {
      id: 'fetalMovement',
      nameFr: 'Bébé bouge moins / pas du tout',
      nameWo: 'Liir bi',
      tagFr: '< 10 mouv/12h',
      wolofWord: 'Liir bi',
      descFr: 'Absence de coups ou baisse nette des mouvements habituels.',
      icon: 'child_care',
      colorClass: 'bg-[#aeeecb] text-[#0e5138]'
    }
  ];

  return (
    <div className="flex flex-col w-full gap-4 max-w-md mx-auto">
      {/* 1. EN-TÊTE DU PROTOCOLE UNICEF FEMTECH */}
      <section className="bg-white rounded-2xl shadow-xs p-4 flex flex-col gap-2.5 border border-[#dee2ec]">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[#ba1a1a] text-xs font-bold">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              crisis_alert
            </span>
            <span className="tracking-wide uppercase">Protocole UNICEF Femtech</span>
          </div>
          <span className="bg-[#aeeecb] text-[#0e5138] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">offline_pin</span>
            <span>Offline</span>
          </span>
        </div>

        <div>
          <h1 className="font-headline text-xl text-[#171c23] font-bold leading-tight">
            Vérification Rapide des Symptômes
          </h1>
          <p className="text-xs text-[#574240] mt-1 leading-relaxed">
            Cochez ce que vous ressentez en ce moment. Ne restez jamais avec un doute.
          </p>
        </div>

        {/* Bouton Audio Wolof */}
        <AudioPlayerButton
          lang={lang}
          variant="banner"
          label="Déglul ci Wolof"
          subtitle="Écouter la consigne audio"
          textToSpeak="So gisee deret, bop buy métit lool, yaram bu tàng mbaa liir bi wàññi doxinam, gaawal dem fajuwaay mbaa nga wòoy SAMU 1515."
          onPlayRecord={() => onActionTrack && onActionTrack('audio_listen')}
        />
      </section>

      {/* 2. CARTES DE DIAGNOSTIC VISUEL (4 POINTS CLÉS) */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-headline text-base text-[#171c23] font-bold">Signes d'Alerte Majeurs</h2>
          <span className="text-[11px] text-[#574240] font-medium">4 points clés</span>
        </div>

        {symptoms.map((s) => {
          const isYes = answers[s.id];
          return (
            <article
              key={s.id}
              className={`rounded-2xl p-4 shadow-xs transition-all border ${
                isYes
                  ? 'bg-[#ffdad6]/30 border-[#ba1a1a]'
                  : 'bg-white border-[#dee2ec]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 ${s.colorClass}`}
                >
                  <span
                    className="material-symbols-outlined text-[26px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {s.icon}
                  </span>
                  <span className="text-[9px] text-center leading-none mt-0.5 font-extrabold">
                    {s.wolofWord}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-[#171c23] truncate">
                      {lang === 'wo' ? s.nameWo : s.nameFr}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isYes
                          ? 'bg-[#ba1a1a] text-white'
                          : 'bg-[#eaeef8] text-[#574240]'
                      }`}
                    >
                      {s.tagFr}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#574240] mt-0.5 leading-snug">
                    {s.descFr}
                  </p>
                </div>
              </div>

              {/* Sélecteur Non / Oui tactile Stitch */}
              <div className="mt-3 pt-2 border-t border-[#dee2ec]/60 flex items-center justify-between">
                <span className="text-xs text-[#574240] font-medium">
                  Ressentez-vous cela ?
                </span>
                <div className="inline-flex rounded-full bg-[#eaeef8] p-1 gap-1">
                  <button
                    type="button"
                    onClick={() => toggleAnswer(s.id, false)}
                    className={`min-h-[36px] min-w-[50px] rounded-full px-3 text-xs font-bold transition-all ${
                      !isYes
                        ? 'bg-[#dee2ec] text-[#171c23] shadow-xs'
                        : 'text-[#574240]'
                    }`}
                  >
                    Non
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleAnswer(s.id, true)}
                    className={`min-h-[36px] min-w-[50px] rounded-full px-3 text-xs font-bold transition-all ${
                      isYes
                        ? 'bg-[#ba1a1a] text-white shadow-xs'
                        : 'text-[#574240]'
                    }`}
                  >
                    Oui
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* 3. MOTEUR DE DÉCISION (ROUGE OU VERT STITCH) */}
      <section className="flex flex-col gap-3">
        {hasUrgentSign ? (
          /* PANNEAU ROUGE VIF URGENCE VITALE STITCH (#ba1a1a) */
          <div className="bg-[#ba1a1a] text-white rounded-2xl p-4 shadow-xl flex flex-col gap-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
                <span className="text-xs font-extrabold uppercase tracking-wider">
                  Urgence Vitale Immédiate
                </span>
              </div>
              <span className="material-symbols-outlined text-[26px] animate-bounce">warning</span>
            </div>

            <div>
              <h3 className="font-headline text-lg font-bold">
                ATTENTION : Consultez immédiatement !
              </h3>
              <p className="text-xs text-white/90 mt-1 leading-relaxed">
                Un signe de complication est détecté. Chaque minute compte pour votre santé et celle de votre enfant.
              </p>
            </div>

            <div className="bg-white/15 rounded-xl p-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
                <span className="text-xs font-semibold">Alerte vocale Wolof active</span>
              </div>
              <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">Automatique</span>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <a
                href="tel:1515"
                className="w-full min-h-[50px] bg-white text-[#ba1a1a] rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform"
              >
                <span className="material-symbols-outlined text-[22px]">call</span>
                <span>APPELER LE SAMU (1515) - GRATUIT 24/7</span>
              </a>

              <div className="flex items-center justify-center gap-1.5 py-1.5 bg-white/20 rounded-lg text-center">
                <span className="material-symbols-outlined text-[16px]">dialpad</span>
                <span className="text-[11px] font-bold">Sans smartphone : Composez *1515# (Gratuit)</span>
              </div>

              <button
                onClick={onNavigateToEmergency}
                className="w-full min-h-[44px] bg-white/15 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-white/25 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">local_hospital</span>
                <span>Localiser la maternité la plus proche</span>
              </button>
            </div>
          </div>
        ) : (
          /* PANNEAU VERT RASSURANT (#aeeecb) */
          <div className="bg-[#aeeecb] text-[#0e5138] rounded-2xl p-4 shadow-xs flex flex-col gap-2.5 border border-[#2c694e]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-[#2c694e]">check_circle</span>
                <span className="text-xs font-bold">Aucun signe de danger détecté</span>
              </div>
              <span className="text-[10px] bg-white text-[#2c694e] px-2.5 py-0.5 rounded-full font-extrabold shadow-xs">
                Statut Vert
              </span>
            </div>

            <p className="text-xs text-[#0e5138]/90 leading-relaxed">
              Vos réponses indiquent des sensations courantes et saines. Reposez-vous à l'ombre, hydratez-vous abondamment et poursuivez votre grossesse en toute sérénité.
            </p>

            <button
              onClick={() => alert("Message bienveillant de la Badien Gox.")}
              className="w-full min-h-[42px] bg-white text-[#2c694e] rounded-xl px-3 py-2 flex items-center justify-between shadow-xs active:scale-[0.98] transition-transform text-left"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#2c694e]">record_voice_over</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#171c23]">Écouter la marraine Badien Gox</span>
                  <span className="text-[10px] text-[#574240]">Message audio bienveillant (Wolof &amp; FR)</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#2c694e]">play_circle</span>
            </button>
          </div>
        )}

        {/* 4. COMPRENDRE LE TRIAGE NATIONAL */}
        <div className="bg-[#eaeef8] rounded-2xl p-4 flex flex-col gap-2.5 border border-[#dee2ec]">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-[#171c23]">Comprendre le Triage National</h4>
            <span className="material-symbols-outlined text-[#574240] text-[18px]">info</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div className="bg-white p-2.5 rounded-xl flex items-center gap-2.5 border border-[#dee2ec]">
              <span className="w-3.5 h-3.5 rounded-full bg-[#ba1a1a] shrink-0"></span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#171c23]">Rouge : Urgence Immédiate</p>
                <p className="text-[10px] text-[#574240]">SAMU 1515 ou évacuation sans délai.</p>
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-xl flex items-center gap-2.5 border border-[#dee2ec]">
              <span className="w-3.5 h-3.5 rounded-full bg-[#724600] shrink-0"></span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#171c23]">Orange : Avis médical sous 24-48h</p>
                <p className="text-[10px] text-[#574240]">Visite conseillée auprès de la sage-femme.</p>
              </div>
            </div>

            <div className="bg-white p-2.5 rounded-xl flex items-center gap-2.5 border border-[#dee2ec]">
              <span className="w-3.5 h-3.5 rounded-full bg-[#2c694e] shrink-0"></span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#171c23]">Vert : Grossesse paisible</p>
                <p className="text-[10px] text-[#574240]">Continuité des soins préventifs et repos.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. CONFIDENTIALITÉ & LIGNE 116 */}
        <div className="bg-[#f0f4fd] rounded-2xl p-3.5 flex flex-col gap-2.5 border border-[#dee2ec]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#aeeecb] text-[#0e5138] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">shield</span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#171c23]">100% Anonyme &amp; Sutura Garanti</span>
              <p className="text-[10px] text-[#574240] leading-snug">
                Aucune donnée médicale n'est transmise sans votre accord. Tout fonctionne hors-connexion.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-2.5 flex items-center justify-between border border-[#dee2ec]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#902e2a] text-[18px]">support_agent</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#171c23]">Ligne d'écoute nationale</span>
                <span className="text-[10px] text-[#574240]">Assistance discrète &amp; gratuite</span>
              </div>
            </div>
            <a
              href="tel:116"
              className="px-3.5 py-1.5 bg-[#902e2a] text-white rounded-full text-xs font-bold flex items-center gap-1 active:opacity-90"
            >
              <span className="material-symbols-outlined text-[14px]">call</span>
              <span>116</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
