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
      descWo: 'Deret ju leer walla ñuul buy génn ci birr bi.',
      icon: 'water_drop',
      colorClass: 'bg-error-container text-on-error-container'
    },
    {
      id: 'headache',
      nameFr: 'Maux de tête ou vue trouble',
      nameWo: 'Bop métit ak gët yu léeradi',
      tagFr: 'Tension',
      wolofWord: 'Bop métit',
      descFr: 'Éclairs devant les yeux, vertiges violents, gonflement soudain.',
      descWo: 'Bop buy daan tey xawa léeradi, yaram buy fës.',
      icon: 'bolt',
      colorClass: 'bg-surface-container-highest text-primary'
    },
    {
      id: 'fever',
      nameFr: 'Fièvre ou frissons intenses',
      nameWo: 'Tangoor walla yaram buy yërëmti',
      tagFr: 'Infection',
      wolofWord: 'Tangoor',
      descFr: 'Corps très chaud, frissons incontrôlés (suspicion paludisme).',
      descWo: 'Yaram bu tàng lool ak xel mu jaaxle (sibiru).',
      icon: 'device_thermostat',
      colorClass: 'bg-tertiary-fixed text-on-tertiary-fixed'
    },
    {
      id: 'fetalMovement',
      nameFr: 'Bébé bouge moins / pas du tout',
      nameWo: 'Liir bi dafa wàññi doxinam',
      tagFr: '< 10 mouv/12h',
      wolofWord: 'Liir bi',
      descFr: 'Absence de coups ou baisse nette des mouvements habituels.',
      descWo: 'Liir bi du fëtt ni ko daan defe ci biir.',
      icon: 'child_care',
      colorClass: 'bg-secondary-container text-on-secondary-container'
    }
  ];

  return (
    <div className="flex flex-col w-full gap-4">
      {/* 1. EN-TÊTE DU PROTOCOLE UNICEF FEMTECH */}
      <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-4 flex flex-col gap-2.5 border border-outline-variant/20">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 text-error text-xs font-bold">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              crisis_alert
            </span>
            <span className="tracking-wide uppercase">Protocole UNICEF Femtech</span>
          </div>
          <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">offline_pin</span>
            <span>Offline</span>
          </span>
        </div>

        <div>
          <h1 className="font-headline text-xl text-on-surface font-bold leading-tight">
            {lang === 'wo' ? 'Saytu Mandargay Musiba ci Birr bi' : 'Vérification Rapide des Symptômes'}
          </h1>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            {lang === 'wo'
              ? 'Tànnal li nga yëg ci sa yaram léegi. Bul tëdd ak sikki-sakka mukk.'
              : 'Cochez ce que vous ressentez en ce moment. Ne restez jamais avec un doute.'}
          </p>
        </div>

        {/* Bouton Audio Wolof */}
        <AudioPlayerButton
          lang={lang}
          variant="banner"
          label={lang === 'wo' ? 'Déglul mandarga yi' : 'Écouter les consignes de triage'}
          subtitle={
            lang === 'wo'
              ? 'Kàddu yi la koy leeral ci Wolof léeg-léeg'
              : 'Instructions vocales d\'urgence et conseils'
          }
          textToSpeak={
            lang === 'wo'
              ? "So gisee deret, bop buy métit lool, yaram bu tàng mbaa liir bi wàññi doxinam, gaawal dem fajuwaay mbaa nga wòoy SAMU 1515."
              : "Si vous constatez des saignements, de violents maux de tête, de la fièvre ou si bébé bouge moins, appelez immédiatement le SAMU 1515 ou rendez-vous en maternité."
          }
          onPlayRecord={() => onActionTrack && onActionTrack('audio_listen')}
        />
      </section>

      {/* 2. CARTES DE DIAGNOSTIC VISUEL (4 POINTS CLÉS) */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-headline text-base text-on-surface font-bold">
            {lang === 'wo' ? '4 Mandargay Musiba yu Mag yi' : "Signes d'Alerte Majeurs"}
          </h2>
          <span className="text-[11px] text-on-surface-variant font-medium">4 points clés</span>
        </div>

        {symptoms.map((s) => {
          const isYes = answers[s.id];
          return (
            <article
              key={s.id}
              className={`rounded-2xl p-4 shadow-xs transition-all border ${
                isYes
                  ? 'bg-error-container/20 border-error/50'
                  : 'bg-surface-container-lowest border-outline-variant/20'
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
                    <h3 className="font-bold text-sm text-on-surface truncate">
                      {lang === 'wo' ? s.nameWo : s.nameFr}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isYes
                          ? 'bg-error text-on-error'
                          : 'bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      {s.tagFr}
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                    {lang === 'wo' ? s.descWo : s.descFr}
                  </p>
                </div>
              </div>

              {/* Sélecteur Non / Oui tactile */}
              <div className="mt-3 pt-2 border-t border-outline-variant/15 flex items-center justify-between">
                <span className="text-xs text-on-surface-variant font-medium">
                  {lang === 'wo' ? 'Yaa ngi ko yëg ?' : 'Ressentez-vous cela ?'}
                </span>
                <div className="inline-flex rounded-full bg-surface-container p-1 gap-1">
                  <button
                    type="button"
                    onClick={() => toggleAnswer(s.id, false)}
                    className={`min-h-[38px] min-w-[52px] rounded-full px-3 text-xs font-bold transition-all ${
                      !isYes
                        ? 'bg-surface-container-highest text-on-surface shadow-xs'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {lang === 'wo' ? 'Déedéet' : 'Non'}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleAnswer(s.id, true)}
                    className={`min-h-[38px] min-w-[52px] rounded-full px-3 text-xs font-bold transition-all ${
                      isYes
                        ? 'bg-error text-on-error shadow-sm'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {lang === 'wo' ? 'Waaw' : 'Oui'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* 3. MOTEUR DE DÉCISION & RÉSULTAT DU TRIAGE */}
      <section className="flex flex-col gap-3">
        {hasUrgentSign ? (
          /* PANNEAU ROUGE URGENCE VITALE (STITCH) */
          <div className="bg-error text-on-error rounded-2xl p-4 shadow-xl flex flex-col gap-3 animate-fadeIn border border-error">
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
                {lang === 'wo'
                  ? 'GAWANTAL ! Demal fajuwaay léeg-léeg'
                  : 'ATTENTION : Consultez immédiatement !'}
              </h3>
              <p className="text-xs text-on-error/90 mt-1 leading-relaxed">
                {lang === 'wo'
                  ? 'Gis nanu mandargay musiba ci sa yaram. Bés bu nekk am na solo ci sa wér-gi-yaram ak bu liir bi.'
                  : 'Un signe de complication sévère est détecté. Chaque minute compte pour votre santé et celle de votre enfant.'}
              </p>
            </div>

            {/* Alerte vocale prompt */}
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
                className="w-full min-h-[50px] bg-white text-error rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform"
              >
                <span className="material-symbols-outlined text-[22px]">call</span>
                <span>APPELER LE SAMU (1515) - GRATUIT 24/7</span>
              </a>

              <div className="flex items-center justify-center gap-1.5 py-1.5 bg-white/20 rounded-lg text-center">
                <span className="material-symbols-outlined text-[16px]">dialpad</span>
                <span className="text-[11px] font-bold">Sans Internet : Composez *1515# (Gratuit)</span>
              </div>

              <button
                onClick={onNavigateToEmergency}
                className="w-full min-h-[44px] bg-on-error/15 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-on-error/25 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">local_hospital</span>
                <span>Localiser la maternité la plus proche</span>
              </button>
            </div>
          </div>
        ) : (
          /* PANNEAU VERT RASSURANT */
          <div className="bg-secondary-container text-on-secondary-container rounded-2xl p-4 shadow-sm flex flex-col gap-2.5 border border-secondary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-secondary">check_circle</span>
                <span className="text-xs font-bold">
                  {lang === 'wo' ? 'Jàmm rekk, gisunu benn musiba' : 'Aucun signe de danger détecté'}
                </span>
              </div>
              <span className="text-[10px] bg-surface-container-lowest text-secondary px-2.5 py-0.5 rounded-full font-extrabold shadow-xs">
                Statut Vert
              </span>
            </div>

            <p className="text-xs opacity-90 leading-relaxed">
              {lang === 'wo'
                ? 'Yaram bi mi ngi dox bu baax. Noppalul ci ker gi, naan ndox bu bare te tëye sa rendez-vous CPN yi.'
                : 'Vos réponses indiquent une grossesse paisible. Reposez-vous à l\'ombre, hydratez-vous abondamment et poursuivez votre suivi.'}
            </p>

            <button
              onClick={() => alert("Message vocal Badien Gox : 'Sa birr mi ngi dox bu baax, yaa ngi suturaal sa bop, noppalul te lekkal bu baax.'")}
              className="w-full min-h-[42px] bg-surface-container-lowest text-secondary rounded-xl px-3 py-2 flex items-center justify-between shadow-xs active:scale-[0.98] transition-transform text-left"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-secondary">record_voice_over</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-on-surface">Écouter la marraine Badien Gox</span>
                  <span className="text-[10px] text-on-surface-variant">Message bienveillant (Wolof &amp; FR)</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-secondary">play_circle</span>
            </button>
          </div>
        )}

        {/* 4. COMPRENDRE LE TRIAGE NATIONAL (CARTES ROUGE / ORANGE / VERT) */}
        <div className="bg-surface-container rounded-2xl p-4 flex flex-col gap-2.5 border border-outline-variant/15">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-on-surface">Comprendre le Triage National</h4>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">info</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div className="bg-surface-container-lowest p-2.5 rounded-xl flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-error shrink-0"></span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-on-surface">Rouge : Urgence Immédiate</p>
                <p className="text-[10px] text-on-surface-variant">SAMU 1515 ou évacuation d'urgence sans délai.</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-2.5 rounded-xl flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-tertiary shrink-0"></span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-on-surface">Orange : Avis médical sous 24-48h</p>
                <p className="text-[10px] text-on-surface-variant">Visite conseillée auprès de la Badien Gox ou sage-femme.</p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-2.5 rounded-xl flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-secondary shrink-0"></span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-on-surface">Vert : Grossesse paisible</p>
                <p className="text-[10px] text-on-surface-variant">Continuité des soins préventifs et repos quotidien.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. SOUTIEN BADIEN GOX (ACCOMPAGNEMENT DE PROXIMITÉ) */}
        <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs border border-outline-variant/20">
          <div className="p-3.5 bg-gradient-to-r from-secondary-container to-surface-container flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">diversity_1</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-secondary">
                Soutien Badien Gox
              </span>
              <h4 className="font-bold text-xs text-on-surface">Accompagnement de proximité au Sénégal</h4>
            </div>
          </div>
          <p className="p-3 text-[11px] text-on-surface-variant leading-relaxed">
            Dans chaque quartier et village, votre marraine de santé communautaire veille sur vous dans la discrétion et le respect de votre intimité (Sutura).
          </p>
        </div>

        {/* 6. CONFIDENTIALITÉ & LIGNE D'ÉCOUTE 116 */}
        <div className="bg-surface-container-low rounded-2xl p-3.5 flex flex-col gap-2.5 border border-outline-variant/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">shield</span>
            </div>
            <div>
              <span className="text-xs font-bold text-on-surface">100% Anonyme &amp; Sutura Garanti</span>
              <p className="text-[10px] text-on-surface-variant leading-snug">
                Aucune donnée médicale n'est transmise sans votre accord. Tout fonctionne hors-connexion.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">support_agent</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Ligne d'écoute nationale</span>
                <span className="text-[10px] text-on-surface-variant">Assistance discrète &amp; gratuite</span>
              </div>
            </div>
            <a
              href="tel:116"
              className="px-3.5 py-1.5 bg-primary text-on-primary rounded-full text-xs font-bold flex items-center gap-1 active:opacity-90"
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
