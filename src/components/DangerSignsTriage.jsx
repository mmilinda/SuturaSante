import React, { useState } from 'react';

export default function DangerSignsTriage({ onNavigateToEmergency, onActionTrack }) {
  const [answers, setAnswers] = useState({
    bleeding: false,
    headache: false,
    fever: false,
    fetalMovement: false,
  });

  const [audioPlaying, setAudioPlaying] = useState(false);

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

  const toggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (audioPlaying) {
        window.speechSynthesis.cancel();
        setAudioPlaying(false);
      } else {
        const u = new SpeechSynthesisUtterance(
          "So gisee deret buy génn, bop buy métit lool, yaram bu tàng, mbaa liir bi wàññi doxinam, gaawal dem fajuwaay mbaa nga wòoy SAMU 1515."
        );
        u.lang = 'fr-SN';
        u.onend = () => setAudioPlaying(false);
        window.speechSynthesis.speak(u);
        setAudioPlaying(true);
      }
    }
  };

  return (
    <div className="flex flex-col w-full px-margin space-y-space-md">
      {/* 1. SAFETY NOTICE & AUDIO WOLOF GUIDANCE STITCH EXACT */}
      <section className="bg-surface-container-lowest rounded-xl shadow-md p-space-md flex flex-col gap-space-sm relative overflow-hidden">
        <div className="flex items-start justify-between gap-space-xs">
          <div className="flex items-center gap-space-xs text-error font-label-md text-label-md">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              crisis_alert
            </span>
            <span className="tracking-wide uppercase font-bold">Protocole UNICEF Femtech</span>
          </div>
          <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-label-sm text-label-sm flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">offline_pin</span>
            <span>Offline</span>
          </span>
        </div>

        <div>
          <h1 className="font-headline-md-mobile text-headline-md-mobile text-on-surface">
            Vérification Rapide des Symptômes
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Cochez ce que vous ressentez en ce moment. Ne restez jamais avec un doute.
          </p>
        </div>

        {/* Bouton Audio Wolof Pilule Stitch Exact */}
        <button
          onClick={toggleAudio}
          className={`w-full min-h-[52px] rounded-full px-space-md py-space-xs flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform ${
            audioPlaying ? 'bg-tertiary text-on-tertiary' : 'bg-tertiary-fixed text-on-tertiary-fixed'
          }`}
          type="button"
        >
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">
                {audioPlaying ? 'pause' : 'volume_up'}
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-label-lg text-label-lg font-bold">Déglul ci Wolof</span>
              <span className="font-label-sm text-label-sm opacity-80">
                {audioPlaying ? 'Lecture en cours...' : 'Écouter la consigne audio'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-tertiary">
            <span className={`w-1.5 h-3 bg-tertiary rounded-full ${audioPlaying ? 'animate-pulse' : ''}`}></span>
            <span className={`w-1.5 h-5 bg-tertiary rounded-full ${audioPlaying ? 'animate-pulse delay-75' : ''}`}></span>
            <span className={`w-1.5 h-2 bg-tertiary rounded-full ${audioPlaying ? 'animate-pulse delay-150' : ''}`}></span>
          </div>
        </button>
      </section>

      {/* 2. CARTES DE DIAGNOSTIC VISUEL STITCH EXACT */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between px-space-xs">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Signes d'Alerte Majeurs</h2>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">4 points clés</span>
        </div>

        {/* Symptom 1: Saignements */}
        <article className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all">
          <div className="flex items-start gap-space-md">
            <div className="w-16 h-16 rounded-xl bg-error-container text-on-error-container flex flex-col items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                water_drop
              </span>
              <span className="font-label-sm text-label-sm text-center leading-none mt-0.5 font-bold">
                Dérét
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-title-md text-on-surface truncate">Saignements vaginaux</h3>
                <span className="bg-error-container text-on-error-container font-label-sm text-label-sm px-2 py-0.5 rounded-full font-bold">
                  Urgent
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Pertes de sang inhabituelles ou écoulement suspect.
              </p>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">
              Ressentez-vous cela ?
            </span>
            <div className="inline-flex rounded-full bg-surface-container p-1 gap-1">
              <button
                onClick={() => toggleAnswer('bleeding', false)}
                className={`min-h-[44px] min-w-[54px] rounded-full px-3 font-label-md text-label-md font-bold transition-all ${
                  !answers.bleeding
                    ? 'bg-surface-container-highest text-on-surface'
                    : 'text-on-surface-variant'
                }`}
                type="button"
              >
                Non
              </button>
              <button
                onClick={() => toggleAnswer('bleeding', true)}
                className={`min-h-[44px] min-w-[54px] rounded-full px-3 font-label-md text-label-md font-bold transition-all ${
                  answers.bleeding ? 'bg-error text-on-error shadow-sm' : 'text-on-surface-variant'
                }`}
                type="button"
              >
                Oui
              </button>
            </div>
          </div>
        </article>

        {/* Symptom 2: Maux de tête */}
        <article className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all">
          <div className="flex items-start gap-space-md">
            <div className="w-16 h-16 rounded-xl bg-surface-container-highest text-primary flex flex-col items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[32px]">bolt</span>
              <span className="font-label-sm text-label-sm text-center leading-none mt-0.5 font-bold">
                Bop métit
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-title-md text-on-surface truncate">Maux de tête ou vue trouble</h3>
                <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold">
                  Tension
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Éclairs devant les yeux, vertiges violents, gonflement soudain.
              </p>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">
              Ressentez-vous cela ?
            </span>
            <div className="inline-flex rounded-full bg-surface-container p-1 gap-1">
              <button
                onClick={() => toggleAnswer('headache', false)}
                className={`min-h-[44px] min-w-[54px] rounded-full px-3 font-label-md text-label-md font-bold transition-all ${
                  !answers.headache
                    ? 'bg-surface-container-highest text-on-surface'
                    : 'text-on-surface-variant'
                }`}
                type="button"
              >
                Non
              </button>
              <button
                onClick={() => toggleAnswer('headache', true)}
                className={`min-h-[44px] min-w-[54px] rounded-full px-3 font-label-md text-label-md font-bold transition-all ${
                  answers.headache ? 'bg-error text-on-error shadow-sm' : 'text-on-surface-variant'
                }`}
                type="button"
              >
                Oui
              </button>
            </div>
          </div>
        </article>

        {/* Symptom 3: Fièvre */}
        <article className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all">
          <div className="flex items-start gap-space-md">
            <div className="w-16 h-16 rounded-xl bg-tertiary-fixed-dim text-on-tertiary-fixed flex flex-col items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[32px]">device_thermostat</span>
              <span className="font-label-sm text-label-sm text-center leading-none mt-0.5 font-bold">
                Tangoor
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-title-md text-on-surface truncate">Fièvre ou frissons intenses</h3>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold">
                  Infection
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Corps très chaud, frissons incontrôlés (suspicion paludisme).
              </p>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">
              Ressentez-vous cela ?
            </span>
            <div className="inline-flex rounded-full bg-surface-container p-1 gap-1">
              <button
                onClick={() => toggleAnswer('fever', false)}
                className={`min-h-[44px] min-w-[54px] rounded-full px-3 font-label-md text-label-md font-bold transition-all ${
                  !answers.fever
                    ? 'bg-surface-container-highest text-on-surface'
                    : 'text-on-surface-variant'
                }`}
                type="button"
              >
                Non
              </button>
              <button
                onClick={() => toggleAnswer('fever', true)}
                className={`min-h-[44px] min-w-[54px] rounded-full px-3 font-label-md text-label-md font-bold transition-all ${
                  answers.fever ? 'bg-error text-on-error shadow-sm' : 'text-on-surface-variant'
                }`}
                type="button"
              >
                Oui
              </button>
            </div>
          </div>
        </article>

        {/* Symptom 4: Bébé bouge moins */}
        <article className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all">
          <div className="flex items-start gap-space-md">
            <div className="w-16 h-16 rounded-xl bg-secondary-container text-on-secondary-container flex flex-col items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[32px]">child_care</span>
              <span className="font-label-sm text-label-sm text-center leading-none mt-0.5 font-bold">
                Liir bi
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-title-md text-on-surface truncate">Bébé bouge moins / pas du tout</h3>
                <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold">
                  &lt; 10 mouv/12h
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Absence de coups ou baisse nette des mouvements habituels.
              </p>
            </div>
          </div>
          <div className="mt-space-md pt-space-xs flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">
              Ressentez-vous cela ?
            </span>
            <div className="inline-flex rounded-full bg-surface-container p-1 gap-1">
              <button
                onClick={() => toggleAnswer('fetalMovement', false)}
                className={`min-h-[44px] min-w-[54px] rounded-full px-3 font-label-md text-label-md font-bold transition-all ${
                  !answers.fetalMovement
                    ? 'bg-surface-container-highest text-on-surface'
                    : 'text-on-surface-variant'
                }`}
                type="button"
              >
                Non
              </button>
              <button
                onClick={() => toggleAnswer('fetalMovement', true)}
                className={`min-h-[44px] min-w-[54px] rounded-full px-3 font-label-md text-label-md font-bold transition-all ${
                  answers.fetalMovement ? 'bg-error text-on-error shadow-sm' : 'text-on-surface-variant'
                }`}
                type="button"
              >
                Oui
              </button>
            </div>
          </div>
        </article>
      </section>

      {/* 3. MOTEUR DE DÉCISION (PANNEAU ROUGE OU VERT STITCH EXACT) */}
      <section className="flex flex-col gap-space-sm pt-space-xs">
        {hasUrgentSign ? (
          /* PANNEAU ROUGE URGENCE VITALE STITCH */
          <div className="bg-error text-on-error rounded-xl p-space-md shadow-xl flex flex-col gap-space-sm relative overflow-hidden transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white animate-ping"></span>
                <span className="font-label-lg text-label-lg font-bold uppercase tracking-wider">
                  Urgence Vitale Immédiate
                </span>
              </div>
              <span className="material-symbols-outlined text-[28px] animate-bounce">warning</span>
            </div>

            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold">
                ATTENTION : Consultez immédiatement !
              </h3>
              <p className="font-body-sm text-body-sm text-on-error/90 mt-1">
                Un signe de complication est détecté. Chaque minute compte pour votre santé et celle de votre enfant.
              </p>
            </div>

            <div className="bg-white/15 rounded-lg p-space-sm flex items-center justify-between gap-space-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">record_voice_over</span>
                <span className="font-label-sm text-label-sm font-semibold">Alerte vocale Wolof active</span>
              </div>
              <span className="font-label-sm text-label-sm font-bold bg-white/20 px-2 py-0.5 rounded-full">
                Automatique
              </span>
            </div>

            <div className="flex flex-col gap-space-xs pt-space-xs">
              <a
                className="w-full min-h-[52px] bg-white text-error rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md active:opacity-90"
                href="tel:1515"
              >
                <span className="material-symbols-outlined text-[24px]">call</span>
                <span>APPELER LE SAMU (1515) - GRATUIT 24/7</span>
              </a>

              <div className="flex items-center justify-center gap-2 py-1 bg-white/20 rounded-lg text-center">
                <span className="material-symbols-outlined text-[18px]">dialpad</span>
                <span className="font-label-sm text-label-sm font-bold">
                  Sans smartphone ni réseau internet : Composez *1515# (Gratuit)
                </span>
              </div>

              <button
                onClick={onNavigateToEmergency}
                className="w-full min-h-[48px] bg-on-error/15 text-white rounded-xl font-label-md text-label-md font-semibold flex items-center justify-center gap-2"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">local_hospital</span>
                <span>Localiser la maternité la plus proche</span>
              </button>
            </div>
          </div>
        ) : (
          /* PANNEAU VERT RASSURANT STITCH */
          <div className="bg-secondary-container text-on-secondary-container rounded-xl p-space-md shadow-sm flex flex-col gap-space-xs transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px] text-secondary">check_circle</span>
                <span className="font-label-lg text-label-lg font-bold">Aucun signe de danger détecté</span>
              </div>
              <span className="font-label-sm text-label-sm bg-surface-container-lowest text-secondary px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                Statut Vert
              </span>
            </div>

            <p className="font-body-sm text-body-sm opacity-90">
              Vos réponses indiquent des sensations courantes et saines. Reposez-vous à l'ombre, hydratez-vous abondamment et poursuivez votre grossesse en toute sérénité.
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => alert("Message bienveillant de la marraine Badien Gox.")}
                type="button"
                className="w-full min-h-[44px] bg-surface-container-lowest text-secondary rounded-lg px-3 py-2 flex items-center justify-between shadow-sm active:scale-[0.98] transition-transform"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-secondary">record_voice_over</span>
                  <div className="flex flex-col text-left">
                    <span className="font-label-md text-label-md font-bold text-on-surface">
                      Écouter la marraine Badien Gox
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Message audio bienveillant (Wolof &amp; FR)
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px] text-secondary">play_circle</span>
              </button>
            </div>
          </div>
        )}

        {/* Explication du Triage Tripolaire */}
        <div className="bg-surface-container rounded-xl p-space-md flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <h4 className="font-title-md text-title-md text-on-surface">Comprendre le Triage National</h4>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">info</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-error shrink-0"></span>
              <div className="min-w-0">
                <p className="font-label-md text-label-md font-bold text-on-surface truncate">
                  Rouge : Urgence Immédiate
                </p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  SAMU 1515 ou évacuation d'urgence sans délai.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-tertiary shrink-0"></span>
              <div className="min-w-0">
                <p className="font-label-md text-label-md font-bold text-on-surface truncate">
                  Orange : Avis médical sous 24-48h
                </p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Visite conseillée auprès de la Badien Gox ou sage-femme.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-secondary shrink-0"></span>
              <div className="min-w-0">
                <p className="font-label-md text-label-md font-bold text-on-surface truncate">
                  Vert : Grossesse paisible
                </p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Continuité des soins préventifs et repos quotidien.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Photo officielle Midwife Dakar de Stitch */}
        <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div
            className="bg-cover bg-center w-full h-40 relative"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkm3zVc9aAnErkQf_C7hPFVPcm3S8OpTO9Nd-fUk5jLmFWzRzUyrGaGfPeN1XZVPlR_vBAmIQuQFI9ll2SZzrCbm1VqNbGfZqIzQMGQRsbH0iie5cGJaF2XltpnWVCjxzplUZQcdc4iyROMC4wQPoJHQ9A8cobrySMXWRjOTGaqZDgIj-101c5rh7vsIUg9OTYG3vc2Ny0NFMj-vNAgc4ZJMbwuLOT49hHpvyalS8')"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 text-surface">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-tertiary-fixed">
                Soutien Badien Gox
              </span>
              <h4 className="font-headline-sm text-headline-sm font-semibold leading-tight text-surface-bright">
                Accompagnement de proximité
              </h4>
            </div>
          </div>
          <div className="p-space-md flex flex-col gap-space-xs">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Dans chaque quartier et village, votre marraine de santé communautaire veille sur vous dans la discrétion et le respect de votre intimité.
            </p>
          </div>
        </section>

        {/* Confidentialité & Ligne 116 */}
        <footer className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-md mb-space-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">shield</span>
            </div>
            <div className="min-w-0">
              <h5 className="font-label-lg text-label-lg font-bold text-on-surface">
                100% Anonyme &amp; Sutura Garanti
              </h5>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Aucune donnée médicale n'est transmise sans votre accord. Tout fonctionne hors-connexion.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">support_agent</span>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold text-on-surface">Ligne d'écoute nationale</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Assistance discrète &amp; gratuite</span>
              </div>
            </div>
            <a
              className="min-h-[44px] px-4 py-2 bg-primary text-on-primary rounded-full font-label-md text-label-md font-bold flex items-center gap-1 active:opacity-90"
              href="tel:116"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>116</span>
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
}
