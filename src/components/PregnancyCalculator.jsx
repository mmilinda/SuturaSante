import React, { useState } from 'react';

export default function PregnancyCalculator({ onNavigateToTriage, onActionTrack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [calcTab, setCalcTab] = useState('ddr');
  const [folicChecked, setFolicChecked] = useState(true);

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
    }
  };

  return (
    <div className="flex flex-col w-full px-margin gap-space-lg">
      {/* 1. ASSISTANCE VOCALE GUIDÉE STITCH EXACT */}
      <div className="w-full bg-tertiary-fixed text-on-tertiary-fixed rounded-xl p-space-md shadow-sm relative overflow-hidden flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[22px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
              volume_up
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-bold">
              Assistance Vocale Guidée
            </span>
          </div>
          <span className="font-label-sm text-label-sm bg-surface-container-lowest/90 text-on-tertiary-fixed px-2.5 py-1 rounded-full font-bold shadow-xs">
            Wolof / FR
          </span>
        </div>

        <div className="flex items-center justify-between gap-space-sm pt-1">
          <div className="flex items-center gap-space-sm min-w-0">
            <button
              aria-label="Lancer la lecture audio en Wolof"
              onClick={toggleAudio}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform flex-shrink-0 ${
                isPlaying ? 'bg-primary text-on-primary animate-pulse' : 'bg-tertiary text-on-tertiary'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[30px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <div className="flex flex-col min-w-0">
              <span className="font-title-md text-title-md truncate leading-tight font-bold text-on-tertiary-fixed">
                Déglul ci Wolof
              </span>
              <span className="font-body-sm text-body-sm text-on-tertiary-fixed/80 truncate">
                Explications du calendrier et de votre stade
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 h-8 px-2.5 flex-shrink-0 bg-surface-container-lowest/60 rounded-full">
            <span className={`w-1 h-3.5 bg-tertiary rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></span>
            <span className={`w-1 h-5 bg-tertiary rounded-full ${isPlaying ? 'animate-bounce' : ''}`}></span>
            <span className={`w-1 h-2.5 bg-tertiary rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></span>
            <span className={`w-1 h-4 bg-tertiary rounded-full ${isPlaying ? 'animate-bounce' : ''}`}></span>
            <span className="font-label-sm text-label-sm ml-1.5 text-on-tertiary-fixed font-bold">
              {isPlaying ? 'En cours' : '01:45'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. RACCOURCIS USSD & WHATSAPP STITCH EXACT */}
      <div className="grid grid-cols-2 gap-space-sm w-full">
        <a
          href="tel:*1515%23"
          className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-space-sm flex items-center gap-space-sm shadow-xs hover:bg-surface-container-low transition-colors active:scale-98 min-h-[56px]"
        >
          <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">dialpad</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm font-bold text-secondary uppercase tracking-wide">
              Passerelle USSD
            </span>
            <span className="font-title-md text-title-md font-bold text-on-surface leading-tight">*1515#</span>
            <span className="text-[10px] text-on-surface-variant font-medium">Gratuit sans Internet</span>
          </div>
        </a>

        <a
          href="https://wa.me/221770000000?text=Bonjour%20SuturaSante"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-space-sm flex items-center gap-space-sm shadow-xs hover:bg-surface-container-low transition-colors active:scale-98 min-h-[56px]"
        >
          <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">forum</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm font-bold text-secondary uppercase tracking-wide">
              WhatsApp Audio
            </span>
            <span className="font-title-md text-title-md font-bold text-on-surface leading-tight">Vocaux 24/7</span>
            <span className="text-[10px] text-on-surface-variant font-medium">Conseillère santé</span>
          </div>
        </a>
      </div>

      {/* 3. CALCULATEUR GESTATIONNEL & JAUGE SVG STITCH EXACT */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex bg-surface-container rounded-lg p-1 w-full justify-between" role="tablist">
            <button
              onClick={() => setCalcTab('ddr')}
              className={`flex-1 min-h-[44px] py-2 px-1 rounded font-label-md text-label-md font-bold transition-all text-center ${
                calcTab === 'ddr'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant'
              }`}
              type="button"
            >
              DDR (Dernières Règles)
            </button>
            <button
              onClick={() => setCalcTab('dpa')}
              className={`flex-1 min-h-[44px] py-2 px-1 rounded font-label-md text-label-md font-bold transition-all text-center ${
                calcTab === 'dpa'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant'
              }`}
              type="button"
            >
              DPA (Terme Prévu)
            </button>
          </div>

          <div className="flex items-center justify-between bg-surface-container-low rounded-lg px-space-md py-space-sm mt-1">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">calendar_month</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                  Date enregistrée ({calcTab.toUpperCase()})
                </span>
                <span className="font-title-md text-title-md text-on-surface font-bold">
                  15 Octobre 2025
                </span>
              </div>
            </div>
            <button
              onClick={() => alert("Modification de la date DDR")}
              className="min-h-[44px] px-4 py-2 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-bold hover:bg-surface-container-high transition-colors"
              type="button"
            >
              Modifier
            </button>
          </div>
        </div>

        {/* Bloc Gestationnel Stitch avec Jauge SVG */}
        <div className="relative bg-gradient-to-br from-primary-fixed to-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm overflow-hidden">
          <div className="flex items-start justify-between z-10">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                État gestationnel actuel
              </span>
              <span className="font-headline-md-mobile text-headline-md-mobile text-on-primary-fixed font-bold leading-tight mt-0.5">
                24 SA (Semaines)
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                6ème mois • 2ème Trimestre
              </span>
            </div>
            <div className="px-3.5 py-1.5 bg-surface-container-lowest text-primary rounded-full shadow-xs flex items-center gap-1.5 font-label-sm text-label-sm font-bold">
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              <span>J - 112</span>
            </div>
          </div>

          <div className="flex items-center gap-space-md mt-1 z-10">
            <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 72 72">
                <circle
                  className="text-surface-container-highest"
                  cx="36"
                  cy="36"
                  fill="transparent"
                  r="30"
                  stroke="currentColor"
                  strokeWidth="7"
                ></circle>
                <circle
                  className="text-primary"
                  cx="36"
                  cy="36"
                  fill="transparent"
                  r="30"
                  stroke="currentColor"
                  strokeDasharray="188.5"
                  strokeDashoffset="75.4"
                  strokeLinecap="round"
                  strokeWidth="7"
                ></circle>
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-title-md text-title-md font-bold text-primary">60%</span>
              </div>
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1 text-tertiary">
                <span className="material-symbols-outlined text-[20px]">hearing</span>
                <span className="font-label-sm text-label-sm font-bold">Étape Fœtale</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface line-clamp-2 mt-0.5">
                Bébé pèse environ <span className="font-bold text-primary">600g</span>, ses poumons se développent et il perçoit votre voix !
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-surface-container-lowest/80 rounded-lg px-space-md py-2 mt-1 z-10">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Terme d'accouchement prévu (DPA) :
            </span>
            <span className="font-label-md text-label-md text-on-surface font-bold">
              22 Juillet 2026
            </span>
          </div>
        </div>

        {/* Photo officielle Maman Sénégalaise de Stitch */}
        <div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded-lg">
          <img
            alt="Maman Sénégalaise"
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCeg2rd31C_5hdpqvP-vCBNIid_vP6FlVqjLyx14gqNl52MQHq3qQv_crrjuuOE1e2CEAkR-fYQT-fK5eOWBWPEMWh9axyzn5wnn6hc8R9mICKlmCW-KT6pvwrXOVP6FAwCHoL9z-oNSkLg6b-01jcNx0ne7P9VKsWeMwY_qtKIUsOycm2DN0P-LYYmsf99TGuJIwCz-yDawYUopu3sneOpJYr_c1QV9JRt0BPnuE"
          />
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-label-sm text-label-sm font-bold text-primary">
              Conseil de la Sage-Femme
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Parlez régulièrement au bébé. Les voix douces de la famille renforcent le lien avant l'arrivée.
            </span>
          </div>
        </div>
      </div>

      {/* 4. CHRONOLOGIE CPN STITCH EXACT */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Consultations Prénatales (CPN)
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Protocole officiel du Ministère de la Santé
            </span>
          </div>
          <span className="material-symbols-outlined text-secondary text-[26px]">verified</span>
        </div>

        <div className="flex flex-col gap-space-md relative">
          {/* CPN 1 */}
          <div className="flex items-start gap-space-sm relative">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div className="w-0.5 h-full bg-secondary-container mt-1"></div>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-title-md text-title-md text-on-surface font-bold">CPN 1</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Avant 12 SA</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                  Validée
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface">Effectuée avec succès le 18 Novembre 2025.</p>
              <div className="flex items-center justify-between text-on-surface-variant bg-surface-container rounded-lg p-2 font-label-sm text-label-sm">
                <span>Bilan sanguin &amp; Échographie T1 conformes</span>
                <button
                  onClick={() => alert("Bilan CPN 1 : Pas d'anémie. Traitement en cours.")}
                  aria-label="Écouter le résumé CPN 1 en Wolof"
                  className="text-secondary font-bold inline-flex items-center gap-1 min-h-[44px] px-2"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">volume_up</span> Audio
                </button>
              </div>
            </div>
          </div>

          {/* CPN 2 (Active) */}
          <div className="flex items-start gap-space-sm relative">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm animate-pulse">
                <span className="material-symbols-outlined text-[18px]">event_note</span>
              </div>
              <div className="w-0.5 h-full bg-surface-container mt-1"></div>
            </div>
            <div className="flex-1 bg-primary-fixed/30 rounded-xl p-space-md flex flex-col gap-space-sm border border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-title-md text-title-md text-primary font-bold">CPN 2</span>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">20 à 24 SA</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-xs">
                  À planifier
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface font-medium leading-relaxed">
                Recommandée cette semaine. Dépistage diabète, contrôle tension &amp; rappel Fer/Folique.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-xs pt-1">
                <button
                  onClick={() => alert("Rappel CPN 2 programmé sur WhatsApp !")}
                  className="flex-1 min-h-[48px] py-2.5 px-4 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-transform"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                  <span>Rappel SMS / WhatsApp</span>
                </button>
                <button
                  onClick={() => alert("Audio CPN 2 en Wolof")}
                  className="min-h-[48px] px-4 rounded-xl bg-surface-container-lowest text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 shadow-xs border border-primary/20 hover:bg-surface-container-low transition-colors"
                  title="Écouter CPN 2 en Wolof"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">volume_up</span>
                  <span>Audio Wolof</span>
                </button>
              </div>
            </div>
          </div>

          {/* CPN 3 */}
          <div className="flex items-start gap-space-sm relative">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center">
                <span className="font-label-sm text-label-sm font-bold">3</span>
              </div>
              <div className="w-0.5 h-full bg-surface-container mt-1"></div>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-title-md text-title-md text-on-surface font-bold">CPN 3</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">28 à 32 SA</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium">
                  À venir
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Prévue autour du 14 Mai 2026</span>
                <button
                  onClick={() => alert("Audio CPN 3")}
                  className="text-on-surface-variant hover:text-primary font-label-sm text-label-sm inline-flex items-center gap-1 min-h-[44px] px-2"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">volume_up</span> Audio
                </button>
              </div>
            </div>
          </div>

          {/* CPN 4 */}
          <div className="flex items-start gap-space-sm">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center">
                <span className="font-label-sm text-label-sm font-bold">4</span>
              </div>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-title-md text-title-md text-on-surface font-bold">CPN 4</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">36 à 38 SA</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium">
                  Dernier mois
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Préparation accouchement &amp; valise maternité</span>
                <button
                  onClick={() => alert("Audio CPN 4")}
                  className="text-on-surface-variant hover:text-primary font-label-sm text-label-sm inline-flex items-center gap-1 min-h-[44px] px-2"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">volume_up</span> Audio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. COMPLÉMENTS & PHOTO INGRÉDIENTS LOCAUX STITCH EXACT */}
      <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[24px]">medication</span>
            <span className="font-title-md text-title-md text-on-surface font-bold">Compléments &amp; Nutrition Locale</span>
          </div>
          <button
            onClick={() => alert("Conseils nutritionnels : Moringa, bissap et bouye.")}
            aria-label="Conseils nutrition en wolof"
            className="text-secondary font-label-sm text-label-sm inline-flex items-center gap-1.5 min-h-[44px] px-2 font-bold"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">volume_up</span> Wolof
          </button>
        </div>

        <label
          onClick={() => setFolicChecked(!folicChecked)}
          className="flex items-center justify-between bg-surface-container-low rounded-xl p-space-md cursor-pointer select-none active:bg-surface-container transition-colors min-h-[56px]"
        >
          <div className="flex items-center gap-space-sm">
            <input
              checked={folicChecked}
              onChange={() => {}}
              className="w-6 h-6 rounded text-secondary focus:ring-0 accent-secondary"
              type="checkbox"
            />
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-bold leading-tight">
                Fer &amp; Acide Folique pris aujourd'hui ?
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Indispensable pour prévenir l'anémie maternelle
              </span>
            </div>
          </div>
          <span
            className={`material-symbols-outlined text-[24px] ${folicChecked ? 'text-secondary' : 'text-slate-300'}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </label>

        {/* Photo officielle Ingrédients Stitch */}
        <div className="flex items-center gap-space-sm bg-surface-container-low rounded-xl p-space-sm">
          <img
            alt="Ingrédients Sénégalais"
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHCoABKs967FWzDGsYxNhzIPUuo7vX4EHkZx9ZmkpF61Y1pqqFwXdZDcpa5Ces2_VV9M2lIMZnONbSlGCQFqfPRwbfBg1bq2oK56w-Zh2kRsgc79n6OV6mpHDObe2Xfuu0EbxJlXpL-LKzyDfFIk2A_vaVav3MD0fL971JsUy1GCpkVz0HqbvQtLtvkHqSbd9Z_okvp1x_F5tYJcLrJ440Qr0VoCiPDbHAlHH6Dig"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm font-bold text-tertiary">
              Alliés naturels : Moringa &amp; Bissap doux
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Ajoutez des feuilles de moringa (Nebeday) à votre tiéboudienne et buvez du jus de bouye pour l'énergie.
            </span>
          </div>
        </div>
      </div>

      {/* 6. CARTE TEST DE DANGER STITCH EXACT */}
      <div className="w-full mb-space-sm">
        <button
          onClick={onNavigateToTriage}
          className="w-full bg-surface-container-low text-on-surface rounded-xl p-space-md flex items-center justify-between shadow-xs hover:bg-surface-container transition-colors group min-h-[60px] text-left"
          type="button"
        >
          <div className="flex items-center gap-space-sm">
            <div className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">health_and_safety</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-bold group-hover:text-primary transition-colors">
                Un doute, des vertiges ou une douleur ?
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Faire le test d'auto-évaluation rapide en 1 min
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant text-[22px] flex-shrink-0">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
