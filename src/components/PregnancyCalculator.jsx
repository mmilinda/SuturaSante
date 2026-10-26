import React, { useState } from 'react';
import AudioPlayerButton from './AudioPlayerButton';

export default function PregnancyCalculator({ t, lang, onActionTrack, onNavigateToTriage }) {
  const [calcMode, setCalcMode] = useState('ddr'); // 'ddr' ou 'dpa'
  const [ddrDate, setDdrDate] = useState('2025-10-15');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [folicTaken, setFolicTaken] = useState(true);

  // Calcul dynamique des semaines et DPA
  const calculateStats = () => {
    const lmp = new Date(ddrDate);
    const today = new Date();
    const diffDays = Math.max(0, Math.floor((today - lmp) / (1000 * 60 * 60 * 24)));
    const weeks = Math.min(40, Math.floor(diffDays / 7) || 24);
    const daysLeft = Math.max(0, 280 - diffDays);
    const progress = Math.min(100, Math.round((weeks / 40) * 100));

    const dpaDate = new Date(lmp);
    dpaDate.setDate(dpaDate.getDate() + 280);

    return {
      weeks,
      month: Math.min(9, Math.ceil(weeks / 4.3)),
      daysLeft: daysLeft || 112,
      progress: progress || 60,
      dpaFormatted: dpaDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    };
  };

  const stats = calculateStats();

  const handleDateChange = (e) => {
    setDdrDate(e.target.value);
    setShowDatePicker(false);
    if (onActionTrack) onActionTrack('pregnancy_calculation');
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {/* 1. ASSISTANCE VOCALE GUIDÉE BANNER */}
      <AudioPlayerButton
        lang={lang}
        variant="banner"
        label={lang === 'wo' ? 'Déglul ci Wolof' : 'Écouter les explications'}
        subtitle={
          lang === 'wo'
            ? 'Xamël sa waxtu CPN ak ni liir bi di màgge'
            : 'Explications du calendrier et de votre stade'
        }
        textToSpeak={
          lang === 'wo'
            ? "Asalaam alaykum. Saytul sa birr te nga topp sa 4 saytu CPN yi ci fajuwaay bi. Bul fatte jël sa garapu fer ak acide folique te lekkal xob-u Neverdie ak ñebbe."
            : "Bienvenue sur SuturaSanté. Suivez vos 4 consultations prénatales au poste de santé. Prenez vos comprimés de fer et consommez des aliments riches en micronutriments."
        }
        onPlayRecord={() => onActionTrack && onActionTrack('audio_listen')}
      />

      {/* 2. RACCOURCIS RAPIDES SÉNÉGAL (USSD *1515# & WHATSAPP AUDIO) */}
      <div className="grid grid-cols-2 gap-2.5 w-full">
        <a
          href="tel:*1515%23"
          className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-3 flex items-center gap-2.5 shadow-xs hover:bg-surface-container-low transition-colors active:scale-98 min-h-[56px]"
        >
          <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">dialpad</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-extrabold text-secondary uppercase tracking-wide">
              Passerelle USSD
            </span>
            <span className="font-bold text-sm text-on-surface leading-tight">*1515#</span>
            <span className="text-[10px] text-on-surface-variant font-medium">
              Gratuit sans Internet
            </span>
          </div>
        </a>

        <a
          href="https://wa.me/221770000000?text=Bonjour%20SuturaSante"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-3 flex items-center gap-2.5 shadow-xs hover:bg-surface-container-low transition-colors active:scale-98 min-h-[56px]"
        >
          <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">forum</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-extrabold text-secondary uppercase tracking-wide">
              WhatsApp Audio
            </span>
            <span className="font-bold text-sm text-on-surface leading-tight">Vocaux 24/7</span>
            <span className="text-[10px] text-on-surface-variant font-medium">
              Conseillère santé
            </span>
          </div>
        </a>
      </div>

      {/* 3. CARTE ÉTAT GESTATIONNEL ACTUEL */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-3.5 border border-outline-variant/20">
        {/* Sélecteur DDR / DPA */}
        <div className="flex flex-col gap-1.5">
          <div className="flex bg-surface-container rounded-xl p-1 w-full justify-between" role="tablist">
            <button
              onClick={() => setCalcMode('ddr')}
              className={`flex-1 min-h-[38px] py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                calcMode === 'ddr'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant'
              }`}
            >
              DDR (Dernières Règles)
            </button>
            <button
              onClick={() => setCalcMode('dpa')}
              className={`flex-1 min-h-[38px] py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                calcMode === 'dpa'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant'
              }`}
            >
              DPA (Terme Prévu)
            </button>
          </div>

          <div className="flex items-center justify-between bg-surface-container-low rounded-xl px-3.5 py-2.5 mt-0.5">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary text-[22px]">calendar_month</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-on-surface-variant font-semibold">
                  Date enregistrée ({calcMode.toUpperCase()})
                </span>
                <span className="font-bold text-sm text-on-surface">
                  {new Date(ddrDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface text-xs font-bold hover:bg-surface-container-high transition-colors"
            >
              {showDatePicker ? 'Fermer' : 'Modifier'}
            </button>
          </div>

          {showDatePicker && (
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-center gap-2">
              <input
                type="date"
                value={ddrDate}
                onChange={handleDateChange}
                className="flex-1 px-3 py-2 rounded-lg border border-outline-variant/40 text-xs font-bold text-on-surface"
              />
            </div>
          )}
        </div>

        {/* Bloc Gestationnel stylisé Stitch */}
        <div className="relative bg-gradient-to-br from-primary-fixed to-surface-container-low rounded-2xl p-4 flex flex-col gap-3 overflow-hidden border border-primary/15">
          <div className="flex items-start justify-between z-10">
            <div className="flex flex-col">
              <span className="text-[10px] text-primary uppercase font-extrabold tracking-wider">
                État gestationnel actuel
              </span>
              <span className="font-headline text-2xl text-on-primary-fixed font-bold leading-tight mt-0.5">
                {stats.weeks} SA (Semaines)
              </span>
              <span className="text-xs text-on-surface-variant font-semibold">
                {stats.month}ème mois • 2ème Trimestre
              </span>
            </div>
            <div className="px-3 py-1.5 bg-surface-container-lowest text-primary rounded-full shadow-xs flex items-center gap-1.5 text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>J - {stats.daysLeft}</span>
            </div>
          </div>

          {/* Jauge circulaire SVG Stitch */}
          <div className="flex items-center gap-4 mt-1 z-10">
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
                />
                <circle
                  className="text-primary"
                  cx="36"
                  cy="36"
                  fill="transparent"
                  r="30"
                  stroke="currentColor"
                  strokeDasharray="188.5"
                  strokeDashoffset={188.5 - (188.5 * stats.progress) / 100}
                  strokeLinecap="round"
                  strokeWidth="7"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-bold text-sm text-primary">{stats.progress}%</span>
              </div>
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1 text-tertiary">
                <span className="material-symbols-outlined text-[18px]">hearing</span>
                <span className="text-[11px] font-bold">Étape Fœtale</span>
              </div>
              <p className="text-xs text-on-surface line-clamp-2 mt-0.5">
                Bébé pèse environ <strong className="text-primary font-bold">600g</strong>, ses poumons se développent et il perçoit votre voix !
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-surface-container-lowest/90 rounded-xl px-3 py-2 z-10 text-xs">
            <span className="text-on-surface-variant font-medium">Terme d'accouchement prévu (DPA) :</span>
            <span className="text-on-surface font-extrabold">{stats.dpaFormatted}</span>
          </div>
        </div>

        {/* Conseil Sage-Femme avec Photo */}
        <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
          <div className="w-14 h-14 rounded-xl bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0">
            <span className="material-symbols-outlined text-[28px]">pregnant_woman</span>
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <span className="text-xs font-bold text-primary">Conseil de la Sage-Femme</span>
            <span className="text-[11px] text-on-surface-variant leading-relaxed">
              Parlez régulièrement au bébé. Les voix douces de la famille renforcent le lien et apaisent avant l'arrivée.
            </span>
          </div>
        </div>
      </div>

      {/* 4. CONSULTATIONS PRÉNATALES (CPN) SELON MINISTÈRE DE LA SANTÉ DU SÉNÉGAL */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-3.5 border border-outline-variant/20">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-headline text-lg text-on-surface font-bold">
              Consultations Prénatales (CPN)
            </span>
            <span className="text-[11px] text-on-surface-variant font-medium">
              Protocole officiel du Ministère de la Santé du Sénégal
            </span>
          </div>
          <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
        </div>

        {/* Chronologie verticale Stitch */}
        <div className="flex flex-col gap-3 relative">
          {/* CPN 1 */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <div className="w-0.5 h-full bg-secondary-container mt-1"></div>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-xl p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-on-surface">CPN 1</span>
                  <span className="text-[10px] text-on-surface-variant">Avant 12 SA</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                  Validée
                </span>
              </div>
              <p className="text-[11px] text-on-surface">Effectuée avec succès au poste de santé.</p>
              <div className="flex items-center justify-between text-on-surface-variant bg-surface-container rounded-lg px-2 py-1.5 text-[10px] mt-1">
                <span>Bilan sanguin &amp; Échographie T1 conformes</span>
                <button
                  onClick={() => alert("Bilan CPN 1 : Pas d'anémie constatée. Poursuite du fer.")}
                  className="text-secondary font-bold inline-flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">volume_up</span> Audio
                </button>
              </div>
            </div>
          </div>

          {/* CPN 2 (Active) */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-sm animate-pulse">
                <span className="material-symbols-outlined text-[16px]">event_note</span>
              </div>
              <div className="w-0.5 h-full bg-surface-container mt-1"></div>
            </div>
            <div className="flex-1 bg-primary-fixed/30 rounded-xl p-3.5 flex flex-col gap-2 border border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-primary">CPN 2</span>
                  <span className="text-[10px] text-primary font-semibold">20 à 24 SA</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold shadow-xs">
                  À planifier
                </span>
              </div>
              <p className="text-xs text-on-surface font-medium leading-relaxed">
                Recommandée cette semaine. Dépistage diabète, contrôle tension artérielle &amp; rappel Fer/Folique.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                <button
                  onClick={() => alert("Rappel programmé avec succès par SMS et WhatsApp !")}
                  className="flex-1 py-2 px-3 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
                >
                  <span className="material-symbols-outlined text-[16px]">notifications_active</span>
                  <span>Rappel SMS / WhatsApp</span>
                </button>
                <button
                  onClick={() => alert("Audio Wolof : Waxtu CPN 2 jott na, demal seetsi sa sage-femme ngir mu saytu sa tension ak deret.")}
                  className="py-2 px-3 rounded-xl bg-surface-container-lowest text-primary text-xs font-bold flex items-center justify-center gap-1 shadow-xs border border-primary/20"
                >
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                  <span>Audio Wolof</span>
                </button>
              </div>
            </div>
          </div>

          {/* CPN 3 */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center">
                <span className="text-[11px] font-bold">3</span>
              </div>
              <div className="w-0.5 h-full bg-surface-container mt-1"></div>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-xl p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-on-surface">CPN 3</span>
                  <span className="text-[10px] text-on-surface-variant">28 à 32 SA</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-medium">
                  À venir
                </span>
              </div>
              <span className="text-xs text-on-surface-variant">
                Prévention paludisme (TPI) &amp; surveillance fœtale
              </span>
            </div>
          </div>

          {/* CPN 4 */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center">
                <span className="text-[11px] font-bold">4</span>
              </div>
            </div>
            <div className="flex-1 bg-surface-container-low rounded-xl p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-on-surface">CPN 4</span>
                  <span className="text-[10px] text-on-surface-variant">36 à 38 SA</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-medium">
                  Dernier mois
                </span>
              </div>
              <span className="text-xs text-on-surface-variant">
                Préparation accouchement &amp; transport d'urgence
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SUIVI COMPLÉMENTS & NUTRITION LOCALE DU SÉNÉGAL */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">medication</span>
            <span className="font-bold text-sm text-on-surface">Compléments &amp; Nutrition Locale</span>
          </div>
          <button
            onClick={() => alert("Moringa ak Bouye : Defal xob-u Neverdie ci sa ceeb te naan jus de bouye.")}
            className="text-secondary text-xs inline-flex items-center gap-1 font-bold"
          >
            <span className="material-symbols-outlined text-[16px]">volume_up</span> Wolof
          </button>
        </div>

        {/* Checkbox quotidienne interactive */}
        <label
          onClick={() => setFolicTaken(!folicTaken)}
          className="flex items-center justify-between bg-surface-container-low rounded-xl p-3 cursor-pointer select-none active:bg-surface-container transition-colors min-h-[52px]"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={folicTaken}
              onChange={() => {}}
              className="w-5 h-5 rounded text-secondary focus:ring-0 accent-secondary cursor-pointer"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-on-surface leading-tight">
                Fer &amp; Acide Folique pris aujourd'hui ?
              </span>
              <span className="text-[10px] text-on-surface-variant mt-0.5">
                Indispensable pour prévenir l'anémie maternelle
              </span>
            </div>
          </div>
          <span
            className={`material-symbols-outlined text-[22px] ${folicTaken ? 'text-secondary' : 'text-slate-300'}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </label>

        {/* Alliés naturels */}
        <div className="flex items-center gap-3 bg-surface-container-low rounded-xl p-3">
          <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">nutrition</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-tertiary">Alliés naturels : Moringa &amp; Bissap doux</span>
            <span className="text-[11px] text-on-surface-variant line-clamp-2">
              Ajoutez des feuilles de moringa (Nebeday) à votre tiéboudienne et consommez du pain de singe (bouye) pour l'énergie.
            </span>
          </div>
        </div>
      </div>

      {/* 6. CARTE D'APPEL VERS LE TRIAGE DE DANGER */}
      <div className="w-full">
        <button
          onClick={onNavigateToTriage}
          className="w-full bg-surface-container-low text-on-surface rounded-2xl p-4 flex items-center justify-between shadow-xs hover:bg-surface-container transition-colors group text-left border border-outline-variant/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-error-container text-on-error-container flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                Un doute, des vertiges ou une douleur ?
              </span>
              <span className="text-[11px] text-on-surface-variant">
                Faire le test d'auto-évaluation rapide en 1 min
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant text-[20px] flex-shrink-0">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
