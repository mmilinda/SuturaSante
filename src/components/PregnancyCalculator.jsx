import React, { useState } from 'react';
import AudioPlayerButton from './AudioPlayerButton';

export default function PregnancyCalculator({ t, lang, onActionTrack, onNavigateToTriage }) {
  const [calcMode, setCalcMode] = useState('ddr');
  const [ddrDate, setDdrDate] = useState('2025-10-15');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [folicTaken, setFolicTaken] = useState(true);

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
    <div className="flex flex-col w-full gap-4 max-w-md mx-auto">
      {/* 1. ASSISTANCE VOCALE GUIDÉE (Fond Pêche Chaud #ffe3c7 + Bouton Play Chocolat #724600) */}
      <AudioPlayerButton
        lang={lang}
        variant="banner"
        label="Déglul ci Wolof"
        subtitle="Explications du calendrier et de votre stade"
        textToSpeak={
          lang === 'wo'
            ? "Asalaam alaykum. Saytul sa birr te nga topp sa 4 saytu CPN yi ci fajuwaay bi. Bul fatte jël sa garapu fer ak acide folique te lekkal xob-u Neverdie ak ñebbe."
            : "Bienvenue sur SuturaSanté. Suivez vos 4 consultations prénatales au poste de santé. Prenez vos comprimés de fer et consommez des aliments riches en fer."
        }
        onPlayRecord={() => onActionTrack && onActionTrack('audio_listen')}
      />

      {/* 2. RACCOURCIS SÉNÉGAL (USSD *1515# & WHATSAPP AUDIO) */}
      <div className="grid grid-cols-2 gap-2.5 w-full">
        <a
          href="tel:*1515%23"
          className="bg-white border border-[#dee2ec] rounded-2xl p-3 flex items-center gap-2.5 shadow-xs hover:bg-[#f0f4fd] transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[#aeeecb] text-[#0e5138] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">dialpad</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-extrabold text-[#2c694e] uppercase tracking-wide">
              Passerelle USSD
            </span>
            <span className="font-bold text-sm text-[#171c23] leading-tight">*1515#</span>
            <span className="text-[10px] text-[#574240] font-medium">Gratuit sans Internet</span>
          </div>
        </a>

        <a
          href="https://wa.me/221770000000?text=Bonjour%20SuturaSante"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-[#dee2ec] rounded-2xl p-3 flex items-center gap-2.5 shadow-xs hover:bg-[#f0f4fd] transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-[#2c694e] text-white flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">forum</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-extrabold text-[#2c694e] uppercase tracking-wide">
              WhatsApp Audio
            </span>
            <span className="font-bold text-sm text-[#171c23] leading-tight">Vocaux 24/7</span>
            <span className="text-[10px] text-[#574240] font-medium">Conseillère santé</span>
          </div>
        </a>
      </div>

      {/* 3. CARTE ÉTAT GESTATIONNEL ACTUEL (Fond Rose Poudré Doux #ffdad6 / #fdeeed) */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-xs flex flex-col gap-3.5 border border-[#dee2ec]">
        {/* Sélecteur DDR / DPA */}
        <div className="flex flex-col gap-1.5">
          <div className="flex bg-[#eaeef8] rounded-xl p-1 w-full justify-between" role="tablist">
            <button
              onClick={() => setCalcMode('ddr')}
              className={`flex-1 min-h-[38px] py-1 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                calcMode === 'ddr'
                  ? 'bg-white text-[#902e2a] shadow-xs'
                  : 'text-[#574240]'
              }`}
            >
              DDR (Dernières Règles)
            </button>
            <button
              onClick={() => setCalcMode('dpa')}
              className={`flex-1 min-h-[38px] py-1 px-2 rounded-lg text-xs font-bold transition-all text-center ${
                calcMode === 'dpa'
                  ? 'bg-white text-[#902e2a] shadow-xs'
                  : 'text-[#574240]'
              }`}
            >
              DPA (Terme Prévu)
            </button>
          </div>

          <div className="flex items-center justify-between bg-[#f0f4fd] rounded-xl px-3.5 py-2 mt-0.5 border border-[#dee2ec]/60">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#902e2a] text-[22px]">calendar_month</span>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#574240] font-semibold">
                  Date enregistrée (DDR)
                </span>
                <span className="font-bold text-sm text-[#171c23]">
                  {new Date(ddrDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="px-3 py-1 rounded-full bg-[#dee2ec] text-[#171c23] text-xs font-bold hover:bg-[#d6dae4] transition-colors"
            >
              {showDatePicker ? 'Fermer' : 'Modifier'}
            </button>
          </div>

          {showDatePicker && (
            <div className="p-3 bg-[#f0f4fd] rounded-xl border border-[#dee2ec] flex items-center gap-2">
              <input
                type="date"
                value={ddrDate}
                onChange={handleDateChange}
                className="flex-1 px-3 py-2 rounded-lg border border-[#dee2ec] text-xs font-bold text-[#171c23]"
              />
            </div>
          )}
        </div>

        {/* Bloc Gestationnel Rose Poudré Chaud #ffdad6 Stitch */}
        <div className="relative bg-[#ffdad6]/40 rounded-2xl p-4 flex flex-col gap-3 overflow-hidden border border-[#ffb3ac]">
          <div className="flex items-start justify-between z-10">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#902e2a] uppercase font-extrabold tracking-wider">
                ÉTAT GESTATIONNEL ACTUEL
              </span>
              <span className="font-headline text-2xl text-[#410003] font-bold leading-tight mt-0.5">
                {stats.weeks} SA (Semaines)
              </span>
              <span className="text-xs text-[#574240] font-semibold">
                {stats.month}ème mois • 2ème Trimestre
              </span>
            </div>
            <div className="px-3 py-1 bg-white text-[#902e2a] rounded-full shadow-xs flex items-center gap-1.5 text-xs font-bold border border-[#ffdad6]">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>J - {stats.daysLeft}</span>
            </div>
          </div>

          {/* Jauge circulaire SVG Bordeaux #902e2a */}
          <div className="flex items-center gap-4 mt-1 z-10">
            <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 72 72">
                <circle
                  className="text-[#dee2ec]"
                  cx="36"
                  cy="36"
                  fill="transparent"
                  r="30"
                  stroke="currentColor"
                  strokeWidth="7"
                />
                <circle
                  className="text-[#902e2a]"
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
                <span className="font-bold text-sm text-[#902e2a]">{stats.progress}%</span>
              </div>
            </div>

            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1 text-[#724600]">
                <span className="material-symbols-outlined text-[18px]">hearing</span>
                <span className="text-[11px] font-bold">Étape Fœtale</span>
              </div>
              <p className="text-xs text-[#171c23] line-clamp-2 mt-0.5">
                Bébé pèse environ <strong className="text-[#902e2a] font-bold">600g</strong>, ses poumons se développent et il perçoit votre voix !
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white rounded-xl px-3 py-2 z-10 text-xs border border-[#ffdad6]">
            <span className="text-[#574240] font-medium">Terme d'accouchement prévu (DPA) :</span>
            <span className="text-[#171c23] font-extrabold">{stats.dpaFormatted}</span>
          </div>
        </div>

        {/* Conseil Sage-Femme avec Photo */}
        <div className="flex items-center gap-3 p-3 bg-[#f0f4fd] rounded-xl border border-[#dee2ec]">
          <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#ffe2de] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#902e2a] text-[32px]">pregnant_woman</span>
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <span className="text-xs font-bold text-[#902e2a]">Conseil de la Sage-Femme</span>
            <span className="text-[11px] text-[#574240] leading-snug">
              Parlez régulièrement au bébé. Les voix douces de la famille renforcent le lien avant l'arrivée.
            </span>
          </div>
        </div>
      </div>

      {/* 4. CONSULTATIONS PRÉNATALES (CPN) STITCH EXACT */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-xs flex flex-col gap-3.5 border border-[#dee2ec]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-headline text-lg text-[#171c23] font-bold">
              Consultations Prénatales (CPN)
            </span>
            <span className="text-[11px] text-[#574240] font-medium">
              Protocole officiel du Ministère de la Santé
            </span>
          </div>
          <span className="material-symbols-outlined text-[#2c694e] text-[24px]">verified</span>
        </div>

        <div className="flex flex-col gap-3 relative">
          {/* CPN 1 (Validée - Vert forêt #2c694e + Badge Menthe #aeeecb) */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-7 h-7 rounded-full bg-[#2c694e] text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <div className="w-0.5 h-full bg-[#aeeecb] mt-1"></div>
            </div>
            <div className="flex-1 bg-[#f0f4fd] rounded-xl p-3 flex flex-col gap-1 border border-[#dee2ec]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[#171c23]">CPN 1</span>
                  <span className="text-[10px] text-[#574240]">Avant 12 SA</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#aeeecb] text-[#0e5138] text-[10px] font-bold">
                  Validée
                </span>
              </div>
              <p className="text-[11px] text-[#171c23]">Effectuée avec succès le 18 Novembre 2025.</p>
              <div className="flex items-center justify-between text-[#574240] bg-[#eaeef8] rounded-lg px-2.5 py-1 text-[10px] mt-1">
                <span>Bilan sanguin &amp; Échographie T1 conformes</span>
                <button
                  onClick={() => alert("Bilan CPN 1 : Pas d'anémie. Traitement en cours.")}
                  className="text-[#2c694e] font-bold inline-flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">volume_up</span> Audio
                </button>
              </div>
            </div>
          </div>

          {/* CPN 2 (À planifier - Bordeaux #902e2a + Fond #ffe2de + Bouton Bordeaux Plein) */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-7 h-7 rounded-full bg-[#902e2a] text-white flex items-center justify-center shadow-sm animate-pulse">
                <span className="material-symbols-outlined text-[16px]">event_note</span>
              </div>
              <div className="w-0.5 h-full bg-[#eaeef8] mt-1"></div>
            </div>
            <div className="flex-1 bg-[#ffe2de]/40 rounded-xl p-3.5 flex flex-col gap-2 border border-[#902e2a]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[#902e2a]">CPN 2</span>
                  <span className="text-[10px] text-[#902e2a] font-semibold">20 à 24 SA</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#902e2a] text-white text-[10px] font-bold shadow-xs">
                  À planifier
                </span>
              </div>
              <p className="text-xs text-[#171c23] font-medium leading-relaxed">
                Recommandée cette semaine. Dépistage diabète, contrôle tension &amp; rappel Fer/Folique.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => alert("Rappel programmé avec succès !")}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#902e2a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
                >
                  <span className="material-symbols-outlined text-[16px]">notifications_active</span>
                  <span>Rappel SMS / WhatsApp</span>
                </button>
                <button
                  onClick={() => alert("Audio CPN 2 Wolof")}
                  className="p-2 rounded-xl bg-white text-[#902e2a] border border-[#902e2a]/30 flex items-center justify-center"
                  title="Écouter en Wolof"
                >
                  <span className="material-symbols-outlined text-[18px]">volume_up</span>
                </button>
              </div>
            </div>
          </div>

          {/* CPN 3 */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-7 h-7 rounded-full bg-[#dee2ec] text-[#574240] flex items-center justify-center">
                <span className="text-[11px] font-bold">3</span>
              </div>
              <div className="w-0.5 h-full bg-[#eaeef8] mt-1"></div>
            </div>
            <div className="flex-1 bg-[#f0f4fd] rounded-xl p-3 flex flex-col gap-1 border border-[#dee2ec]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[#171c23]">CPN 3</span>
                  <span className="text-[10px] text-[#574240]">28 à 32 SA</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#eaeef8] text-[#574240] text-[10px] font-medium">
                  À venir
                </span>
              </div>
              <span className="text-xs text-[#574240]">Prévue autour du 14 Mai 2026</span>
            </div>
          </div>

          {/* CPN 4 */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-7 h-7 rounded-full bg-[#dee2ec] text-[#574240] flex items-center justify-center">
                <span className="text-[11px] font-bold">4</span>
              </div>
            </div>
            <div className="flex-1 bg-[#f0f4fd] rounded-xl p-3 flex flex-col gap-1 border border-[#dee2ec]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[#171c23]">CPN 4</span>
                  <span className="text-[10px] text-[#574240]">36 à 38 SA</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#eaeef8] text-[#574240] text-[10px] font-medium">
                  Dernier mois
                </span>
              </div>
              <span className="text-xs text-[#574240]">Préparation accouchement &amp; valise maternité</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. COMPLÉMENTS & NUTRITION LOCALE */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-xs flex flex-col gap-3 border border-[#dee2ec]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2c694e] text-[22px]">medication</span>
            <span className="font-bold text-sm text-[#171c23]">Compléments &amp; Nutrition Locale</span>
          </div>
          <button
            onClick={() => alert("Moringa ak Bouye : Defal xob-u Neverdie ci ceeb.")}
            className="text-[#2c694e] text-xs inline-flex items-center gap-1 font-bold"
          >
            <span className="material-symbols-outlined text-[16px]">volume_up</span> Wolof
          </button>
        </div>

        {/* Checkbox quotidienne active */}
        <label
          onClick={() => setFolicTaken(!folicTaken)}
          className="flex items-center justify-between bg-[#f0f4fd] rounded-xl p-3 cursor-pointer select-none active:bg-[#eaeef8] transition-colors border border-[#dee2ec]"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={folicTaken}
              onChange={() => {}}
              className="w-5 h-5 rounded text-[#2c694e] focus:ring-0 accent-[#2c694e] cursor-pointer"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#171c23] leading-tight">
                Fer &amp; Acide Folique pris aujourd'hui ?
              </span>
              <span className="text-[10px] text-[#574240] mt-0.5">
                Indispensable pour prévenir l'anémie maternelle
              </span>
            </div>
          </div>
          <span
            className={`material-symbols-outlined text-[22px] ${folicTaken ? 'text-[#2c694e]' : 'text-[#dee2ec]'}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </label>

        {/* Moringa & Bouye */}
        <div className="flex items-center gap-3 bg-[#f0f4fd] rounded-xl p-3 border border-[#dee2ec]">
          <div className="w-12 h-12 rounded-xl bg-[#ffe3c7] text-[#724600] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[24px]">nutrition</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#724600]">Alliés naturels : Moringa &amp; Bissap doux</span>
            <span className="text-[11px] text-[#574240] line-clamp-2">
              Ajoutez des feuilles de moringa (Nebeday) à votre tiéboudienne et consommez du pain de singe (bouye).
            </span>
          </div>
        </div>
      </div>

      {/* 6. CARTE TEST DE DANGER (Pastille Rose #ffdad6) */}
      <button
        onClick={onNavigateToTriage}
        className="w-full bg-[#f0f4fd] text-[#171c23] rounded-2xl p-4 flex items-center justify-between shadow-xs hover:bg-[#eaeef8] transition-colors group text-left border border-[#dee2ec]"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#171c23] group-hover:text-[#902e2a] transition-colors">
              Un doute, des vertiges ou une douleur ?
            </span>
            <span className="text-[11px] text-[#574240]">
              Faire le test d'auto-évaluation rapide en 1 min
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-[#574240] text-[20px] flex-shrink-0">
          arrow_forward
        </span>
      </button>

      {/* 7. BOUTON ROUGE SAMU SÉNÉGAL 1515 EN BAS (Exact Stitch) */}
      <div className="w-full pt-1 pb-4">
        <a
          href="tel:1515"
          className="w-full min-h-[48px] px-4 py-2.5 rounded-full bg-[#ba1a1a] text-white flex items-center justify-between shadow-[0_4px_16px_rgba(186,26,26,0.3)] hover:bg-[#902e2a] transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[22px] animate-bounce">
              e911_emergency
            </span>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-xs font-extrabold tracking-wide uppercase">
                SAMU SÉNÉGAL 1515
              </span>
              <span className="text-[10px] text-white/90">
                Appel gratuit d'urgence obstétricale
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
            <span className="material-symbols-outlined text-[15px]">call</span>
            <span className="text-xs font-extrabold">1515</span>
          </div>
        </a>
      </div>
    </div>
  );
}
