import React, { useState, useEffect, useRef } from 'react';
import { getOrCreateAnonymousId } from '../utils/telemetry';

/**
 * Phonétique Wolof pour prononciation vocale sénégalaise naturelle
 */
function toWolofPhoneticSpeech(wolofText) {
  if (!wolofText || typeof wolofText !== 'string') return '';
  return wolofText
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/[#•\-]/g, ' ')
    .replace(/ci\b/gi, 'tchi')
    .replace(/ceeb/gi, 'tchééb')
    .replace(/c([aeiou])/gi, 'tch$1')
    .replace(/j/gi, (m) => m === 'J' ? 'Dj' : 'dj')
    .replace(/x/gi, (m) => m === 'X' ? 'Kh' : 'kh')
    .replace(/ñ/gi, (m) => m === 'Ñ' ? 'Gn' : 'gn')
    .replace(/\bw([aàeéio])/gi, (m, v) => (m[0] === 'W' ? 'Ou' : 'ou') + v)
    .replace(/wà/gi, 'oua')
    .replace(/ë/gi, 'eu')
    .replace(/u/gi, 'ou')
    .replace(/dé(\b|[!?.])/gi, 'déé$1')
    .replace(/\bwaaw\b/gi, 'ouaoou')
    .replace(/\blool\b/gi, 'lôle')
    .replace(/\bsama soxna si\b/gi, 'sama sokhna si')
    .replace(/\bsama xarit\b/gi, 'sama kharit')
    .replace(/\byaram jàmm\b/gi, 'yaram djamm')
    .replace(/\bjàmm\b/gi, 'djamm')
    .replace(/\bndànk ndànk\b/gi, 'ndank ndank');
}

/**
 * Moteur de calcul obstétrical local (fallback miroir du backend)
 */
function calculateLocalObstetrical(inputDate, type = 'ddr') {
  const refDate = new Date(inputDate);
  const now = new Date();

  let ddr, dpa;
  if (type === 'dpa') {
    dpa = new Date(refDate);
    ddr = new Date(dpa.getTime() - 280 * 86400000);
  } else {
    ddr = new Date(refDate);
    dpa = new Date(ddr.getTime() + 280 * 86400000);
  }

  const diffTime = now.getTime() - ddr.getTime();
  const totalDays = Math.max(0, Math.floor(diffTime / 86400000));
  const currentWeeks = Math.floor(totalDays / 7);
  const currentDays = totalDays % 7;

  const diffToDpa = dpa.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffToDpa / 86400000));
  const currentMonth = Math.min(9, Math.max(1, Math.ceil(currentWeeks / 4.44)));
  let trimester = 1;
  if (currentWeeks >= 14 && currentWeeks < 28) trimester = 2;
  else if (currentWeeks >= 28) trimester = 3;

  const progressPercent = Math.min(100, Math.max(0, Math.round((currentWeeks / 40) * 100)));

  const formatDateFr = (date) => date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  let fetalStage = {
    weightGrams: 600,
    lengthCm: 28,
    titleFr: "Étape Fœtale Active",
    descFr: "Bébé pèse environ 600g, ses poumons se développent et il perçoit votre voix !",
    descWo: "Liir bi am na 600g, nopp yi di déglu sa baat ak woy yi !",
    adviceFr: "Parlez-lui doucement, les voix bienveillantes renforcent le lien avant l'arrivée.",
    adviceWo: "Waxal ak sa liir ndànk ndànk, sa baat dafay dëgëral xolam."
  };

  if (currentWeeks < 12) {
    fetalStage = {
      weightGrams: 20,
      lengthCm: 6,
      titleFr: "Premier Trimestre : Organogenèse",
      descFr: "Le cœur de bébé bat régulièrement, ses petits doigts et orteils sont formés.",
      descWo: "Xol-u liir bi di tëgg, baaram yi feeñ nañu, yaram bi di juddu.",
      adviceFr: "Prenez impérativement vos comprimés d'acide folique pour protéger son cerveau.",
      adviceWo: "Naanal bés bu nekk doomi acide folique ngir xelu liir bi."
    };
  } else if (currentWeeks < 20) {
    fetalStage = {
      weightGrams: 300,
      lengthCm: 16,
      titleFr: "Deuxième Trimestre : Premiers Mouvements",
      descFr: "Bébé bouge librement dans sa poche, vous commencez à sentir ses petits coups.",
      descWo: "Liir bi am na 300g, buy yëngu ci biir ndox mi te di la tàccu.",
      adviceFr: "Buvez beaucoup de jus de Bouye et mangez du Moringa pour fortifier votre sang.",
      adviceWo: "Naanal njaan-u Bouye te lekk xob-u Nebeday ngir deret ji."
    };
  } else if (currentWeeks < 28) {
    fetalStage = {
      weightGrams: 600,
      lengthCm: 28,
      titleFr: "Deuxième Trimestre : Développement Sensoriel",
      descFr: "Bébé pèse environ 600g, ses poumons mûrissent et il perçoit la voix de sa maman.",
      descWo: "Liir bi am na 600g, nopp yi di dégg sa baat ak woy yi !",
      adviceFr: "Dormez sur le côté gauche avec un coussin entre vos genoux pliés.",
      adviceWo: "Tëddal ci sa wetu càmmooñ (côté gauche) ngir noppalu."
    };
  } else if (currentWeeks < 36) {
    fetalStage = {
      weightGrams: 1800,
      lengthCm: 42,
      titleFr: "Troisième Trimestre : Maturation & Poids",
      descFr: "Bébé prend du poids rapidement (environ 1,8 kg). Ses os se renforcent grâce au fer.",
      descWo: "Liir bi am na 1,8 kilo, yax yi di dëgër bu baax.",
      adviceFr: "Surveillez les gonflements des mains et du visage, prenez votre tension à chaque CPN.",
      adviceWo: "Saytul sa kanam ndax gémbul, te xool sa tension bés bu nekk."
    };
  } else {
    fetalStage = {
      weightGrams: 3200,
      lengthCm: 50,
      titleFr: "Dernier Mois : Prêt pour l'Accouchement",
      descFr: "Bébé est à terme (environ 3,2 kg), il est descendu dans le bassin prêt à naître !",
      descWo: "Liir bi mat na sëkk (3,2 kilo), waxtu wàsin bi jot na ci jàmm !",
      adviceFr: "Préparez votre valise maternité et organisez le moyen de transport rapide.",
      adviceWo: "Waajalal sa yére wàsin ak auto bu lay yóbbu kër docteur."
    };
  }

  const cpn1Date = new Date(ddr.getTime() + 10 * 7 * 86400000);
  const cpn2Date = new Date(ddr.getTime() + 22 * 7 * 86400000);
  const cpn3Date = new Date(ddr.getTime() + 30 * 7 * 86400000);
  const cpn4Date = new Date(ddr.getTime() + 37 * 7 * 86400000);

  const getCpnStatus = (minSA, maxSA) => {
    if (currentWeeks > maxSA) return 'validated';
    if (currentWeeks >= minSA && currentWeeks <= maxSA) return 'current';
    return 'upcoming';
  };

  const cpnMilestones = [
    {
      id: 1,
      title: "CPN 1",
      weeksLabel: "Avant 12 SA",
      minSA: 4,
      maxSA: 13,
      dateFormatted: formatDateFr(cpn1Date),
      status: getCpnStatus(4, 13),
      summaryFr: "Confirmation de grossesse, bilan sanguin, prescription gratuite de fer & acide folique.",
      summaryWo: "Dëggal birr bi, xool deret bi ci masin, ak joxe doomi fer feyul dara.",
      badge: currentWeeks > 13 ? "Validée" : currentWeeks >= 4 ? "À Réaliser" : "À Venir"
    },
    {
      id: 2,
      title: "CPN 2",
      weeksLabel: "20 à 24 SA",
      minSA: 20,
      maxSA: 24,
      dateFormatted: formatDateFr(cpn2Date),
      status: getCpnStatus(20, 24),
      summaryFr: "Échographie morphologique, dépistage de l'hypertension, injection vaccin antitétanique (VAT).",
      summaryWo: "Écho masin, déglu xol-u liir bi, saytu tension ak ñakk VAT tétanos.",
      badge: currentWeeks > 24 ? "Validée" : currentWeeks >= 20 ? "À Réaliser" : "À Venir"
    },
    {
      id: 3,
      title: "CPN 3",
      weeksLabel: "28 à 32 SA",
      minSA: 28,
      maxSA: 32,
      dateFormatted: formatDateFr(cpn3Date),
      status: getCpnStatus(28, 32),
      summaryFr: "Traitement préventif intermittent du paludisme (TPI gratuit) et contrôle de croissance fœtale.",
      summaryWo: "Garapu sibiru TPI feyul dara, saytu liir bi ndax buy màgg bu baax.",
      badge: currentWeeks > 32 ? "Validée" : currentWeeks >= 28 ? "À Réaliser" : "À Venir"
    },
    {
      id: 4,
      title: "CPN 4",
      weeksLabel: "36 à 38 SA",
      minSA: 36,
      maxSA: 40,
      dateFormatted: formatDateFr(cpn4Date),
      status: getCpnStatus(36, 40),
      summaryFr: "Planification sereine de l'accouchement, choix de la maternité et organisation du transport d'urgence.",
      summaryWo: "Waajal wàsin bi ci jàmm, xam ana ban maternité ngay dem ak auto bu lay yóbbu.",
      badge: currentWeeks >= 36 ? "Dernier Mois" : "À Venir"
    }
  ];

  const audioTextFr = `Bonjour ma sœur. Vous êtes actuellement à ${currentWeeks} semaines d'aménorrhée, dans votre ${currentMonth}ème mois de grossesse. Votre terme prévu est le ${formatDateFr(dpa)}, il reste ${daysRemaining} jours. ${fetalStage.descFr} N'oubliez pas vos comprimés de fer et votre repos sur le côté gauche.`;
  const audioTextWo = `Salamalékoum sama soxna si. Yaa ngi ci ${currentWeeks} ayu-bës (SA), ci sa ${currentMonth}e weeru ëmb. Wàsin bi ci ${formatDateFr(dpa)} la war a am, des na ${daysRemaining} fan. ${fetalStage.descWo} Bul fatte sa doomi fer ak tëdd ci wetu càmmooñ dé !`;

  return {
    type,
    ddr: ddr.toISOString().split('T')[0],
    ddrFormatted: formatDateFr(ddr),
    dpa: dpa.toISOString().split('T')[0],
    dpaFormatted: formatDateFr(dpa),
    currentWeeks,
    currentDays,
    currentMonth,
    trimester,
    daysRemaining,
    progressPercent,
    fetalStage,
    cpnMilestones,
    audioTextFr,
    audioTextWo,
    phoneticSpeechWo: toWolofPhoneticSpeech(audioTextWo),
    calculatedAt: new Date().toISOString()
  };
}

export default function PregnancyCalculator({ onNavigateToTriage, onActionTrack, lang = 'wo' }) {
  // 1. Initialisation de la date enregistrée (priorité au localStorage)
  const [calcTab, setCalcTab] = useState(() => {
    return localStorage.getItem('sutura_calc_tab') || 'ddr';
  });

  const [dateValue, setDateValue] = useState(() => {
    const saved = localStorage.getItem('sutura_pregnancy_date');
    if (saved) return saved;
    // Par défaut : 24 semaines avant aujourd'hui (terme actuel ~24 SA)
    const d = new Date(Date.now() - 24 * 7 * 86400000);
    return d.toISOString().split('T')[0];
  });

  const [isEditingDate, setIsEditingDate] = useState(false);
  const [tempDate, setTempDate] = useState(dateValue);
  const [isLoading, setIsLoading] = useState(false);
  const [pregnancyData, setPregnancyData] = useState(() => {
    return calculateLocalObstetrical(dateValue, calcTab);
  });

  // État vocal
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCpnPlaying, setActiveCpnPlaying] = useState(null);

  // Prise de fer quotidienne
  const [folicChecked, setFolicChecked] = useState(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    return localStorage.getItem('sutura_folic_date') === todayStr;
  });
  const [folicToast, setFolicToast] = useState('');

  // 2. Appel au backend Express pour calculer et synchroniser
  const fetchBackendCalculation = async (dateToCalc, typeToCalc) => {
    setIsLoading(true);
    const anonId = getOrCreateAnonymousId();

    try {
      const response = await fetch('/api/pregnancy/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: dateToCalc,
          type: typeToCalc,
          anonymousId: anonId
        })
      });

      if (response.ok) {
        const data = await response.json();
        setPregnancyData(data);
        localStorage.setItem('sutura_pregnancy_date', dateToCalc);
        localStorage.setItem('sutura_calc_tab', typeToCalc);
        if (onActionTrack) {
          onActionTrack('pregnancy_calculation', `Calcul CPN (${data.currentWeeks} SA)`);
        }
      } else {
        // Fallback local instantané
        const localData = calculateLocalObstetrical(dateToCalc, typeToCalc);
        setPregnancyData(localData);
      }
    } catch (_) {
      // Résilience hors-ligne totale
      const localData = calculateLocalObstetrical(dateToCalc, typeToCalc);
      setPregnancyData(localData);
    } finally {
      setIsLoading(false);
    }
  };

  // Re-calcul initial au montage
  useEffect(() => {
    fetchBackendCalculation(dateValue, calcTab);
  }, []);

  // Gestion du basculement DDR / DPA
  const handleTabChange = (newTab) => {
    setCalcTab(newTab);
    localStorage.setItem('sutura_calc_tab', newTab);

    // Si on passe à DPA, on utilise la date d'accouchement calculée
    let newDate = dateValue;
    if (newTab === 'dpa' && pregnancyData?.dpa) {
      newDate = pregnancyData.dpa;
    } else if (newTab === 'ddr' && pregnancyData?.ddr) {
      newDate = pregnancyData.ddr;
    }
    setDateValue(newDate);
    setTempDate(newDate);
    fetchBackendCalculation(newDate, newTab);
  };

  // Enregistrement de la nouvelle date
  const handleSaveDate = () => {
    setDateValue(tempDate);
    setIsEditingDate(false);
    fetchBackendCalculation(tempDate, calcTab);
  };

  // Préréglage rapide par trimestre
  const applyPresetWeeks = (weeks) => {
    const d = new Date(Date.now() - weeks * 7 * 86400000);
    const iso = d.toISOString().split('T')[0];
    setTempDate(iso);
    setDateValue(iso);
    setCalcTab('ddr');
    setIsEditingDate(false);
    fetchBackendCalculation(iso, 'ddr');
  };

  // Gestion de la prise de fer / acide folique
  const handleToggleFolic = async () => {
    const nextState = !folicChecked;
    setFolicChecked(nextState);
    const todayStr = new Date().toISOString().split('T')[0];

    if (nextState) {
      localStorage.setItem('sutura_folic_date', todayStr);
      setFolicToast(lang === 'wo' ? "Waaw kaye ! Sa doomi fer mu tay mi jël nga ko." : "Bravo ! Prise de fer & acide folique validée.");
    } else {
      localStorage.removeItem('sutura_folic_date');
      setFolicToast('');
    }

    try {
      await fetch('/api/pregnancy/folic-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          anonymousId: getOrCreateAnonymousId(),
          taken: nextState
        })
      });
      if (nextState && onActionTrack) onActionTrack('folic_intake');
    } catch (_) {}

    setTimeout(() => setFolicToast(''), 4000);
  };

  // Synthèse vocale humaine
  const toggleAudio = (customText = null, cpnId = null) => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setActiveCpnPlaying(null);
        return;
      }

      const textToSpeak = customText || (lang === 'wo' ? pregnancyData?.phoneticSpeechWo || pregnancyData?.audioTextWo : pregnancyData?.audioTextFr);
      if (!textToSpeak) return;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = lang === 'wo' ? 'fr-SN' : 'fr-FR';
      utterance.rate = lang === 'wo' ? 0.88 : 0.92;
      utterance.pitch = 1.02;

      // Voix naturelle
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const preferred = voices.find(v =>
          (v.lang.startsWith('fr') || v.lang.startsWith('wo')) &&
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Amélie'))
        ) || voices.find(v => v.lang.startsWith('fr'));
        if (preferred) utterance.voice = preferred;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        if (cpnId) setActiveCpnPlaying(cpnId);
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setActiveCpnPlaying(null);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setActiveCpnPlaying(null);
      };

      window.speechSynthesis.speak(utterance);
      if (onActionTrack) onActionTrack('audio_listen', `Écoute suivi grossesse (${pregnancyData?.currentWeeks} SA)`);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Calcul du tracé circulaire du cercle SVG (circonférence = 188.5)
  const circumference = 188.5;
  const progressPercent = pregnancyData?.progressPercent || 60;
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* =========================================================================
          EN-TÊTE DE LA PAGE AVEC BADGES DYNAMIQUES
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ddc0bd]/40 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171c23] leading-tight">
            Suivi Prénatal &amp; Calendrier CPN
          </h1>
          <p className="text-sm text-[#574240] mt-1">
            Calculateur obstétrical conforme au protocole du Ministère de la Santé du Sénégal.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1 rounded-full bg-[#aeeecb] text-[#316e52] text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2c694e] animate-pulse"></span>
            Mode Hors-Ligne Prêt
          </span>
          <span className="px-3 py-1 rounded-full bg-white text-[#902e2a] border border-[#ddc0bd]/50 text-xs font-bold shadow-xs">
            {pregnancyData?.currentWeeks || 24} SA • {pregnancyData?.currentMonth || 6}ème mois
          </span>
        </div>
      </div>

      {/* =========================================================================
          GRILLE PRINCIPALE (2 Colonnes spacieuses sur bureau)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =========================================================
            COLONNE GAUCHE (lg:col-span-7) : Audio, Calculateur & Chronologie CPN
            ========================================================= */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* 1. ASSISTANCE VOCALE GUIDÉE DYNAMIQUE */}
          <div
            className="w-full rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col gap-3 border border-[#724600]/20 transition-all"
            style={{ backgroundColor: '#ffddb8', color: '#2a1700' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ color: '#724600', fontVariationSettings: "'FILL' 1" }}
                >
                  volume_up
                </span>
                <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#724600' }}>
                  Assistance Vocale Guidée
                </span>
              </div>
              <span className="text-xs px-3 py-0.5 rounded-full bg-white/90 text-[#2a1700] font-bold shadow-xs">
                {lang === 'wo' ? 'Wolof (Olof)' : 'Français'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-3.5 min-w-0">
                <button
                  aria-label="Lancer la lecture audio personnalisée"
                  onClick={() => toggleAudio()}
                  className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform shrink-0 cursor-pointer ${
                    isPlaying && !activeCpnPlaying ? 'animate-pulse' : ''
                  }`}
                  style={{ backgroundColor: isPlaying && !activeCpnPlaying ? '#902e2a' : '#724600', color: '#ffffff' }}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[30px] text-white">
                    {isPlaying && !activeCpnPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <div className="flex flex-col min-w-0">
                  <span className="text-base sm:text-lg font-bold font-serif leading-tight" style={{ color: '#2a1700' }}>
                    {lang === 'wo' ? 'Déglul ci Wolof' : 'Écouter le Guidage'}
                  </span>
                  <span className="text-xs sm:text-sm opacity-80 mt-0.5 truncate">
                    Explications personnalisées à votre stade ({pregnancyData?.currentWeeks || 24} SA)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 h-8 px-3 shrink-0 rounded-full bg-white/70">
                <span className={`w-1 h-3 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ backgroundColor: '#724600' }}></span>
                <span className={`w-1 h-4.5 rounded-full ${isPlaying ? 'animate-bounce' : ''}`} style={{ backgroundColor: '#724600' }}></span>
                <span className={`w-1 h-2 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ backgroundColor: '#724600' }}></span>
                <span className={`w-1 h-3.5 rounded-full ${isPlaying ? 'animate-bounce' : ''}`} style={{ backgroundColor: '#724600' }}></span>
                <span className="text-xs ml-1 font-bold" style={{ color: '#2a1700' }}>
                  {isPlaying ? 'En lecture' : 'Audio IA'}
                </span>
              </div>
            </div>
          </div>

          {/* 2. CALCULATEUR DDR / DPA & CARTE ÉTAT GESTATIONNEL DYNAMIQUE */}
          <div className="w-full bg-white rounded-2xl p-5 shadow-sm border border-[#ddc0bd]/40 flex flex-col gap-5">
            {/* Onglets DDR / DPA */}
            <div className="flex flex-col gap-3">
              <div className="flex bg-[#eaeef8] rounded-xl p-1 w-full justify-between" role="tablist">
                <button
                  onClick={() => handleTabChange('ddr')}
                  className={`flex-1 min-h-[40px] py-2 px-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
                    calcTab === 'ddr'
                      ? 'bg-white text-[#902e2a] shadow-xs'
                      : 'text-[#574240] hover:text-[#171c23]'
                  }`}
                  type="button"
                >
                  DDR (Dernières Règles)
                </button>
                <button
                  onClick={() => handleTabChange('dpa')}
                  className={`flex-1 min-h-[40px] py-2 px-2 rounded-lg text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
                    calcTab === 'dpa'
                      ? 'bg-white text-[#902e2a] shadow-xs'
                      : 'text-[#574240] hover:text-[#171c23]'
                  }`}
                  type="button"
                >
                  DPA (Terme Prévu)
                </button>
              </div>

              {/* Date enregistrée & Éditeur interactif */}
              <div className="flex flex-col gap-3 bg-[#f0f4fd] rounded-xl px-4 py-3 border border-[#ddc0bd]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="material-symbols-outlined text-[#902e2a] text-[24px]">calendar_month</span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs text-[#574240] font-semibold">
                        Date enregistrée ({calcTab === 'ddr' ? 'DDR' : 'DPA'})
                      </span>
                      <span className="text-base text-[#171c23] font-bold font-serif truncate">
                        {calcTab === 'ddr'
                          ? pregnancyData?.ddrFormatted || '15 Octobre 2025'
                          : pregnancyData?.dpaFormatted || '22 Juillet 2026'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setTempDate(calcTab === 'ddr' ? (pregnancyData?.ddr || dateValue) : (pregnancyData?.dpa || dateValue));
                      setIsEditingDate(!isEditingDate);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-[#dee2ec] hover:bg-[#eaeef8] text-[#171c23] text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    type="button"
                  >
                    {isEditingDate ? 'Annuler' : 'Modifier'}
                  </button>
                </div>

                {/* Formulaire de modification étendu */}
                {isEditingDate && (
                  <div className="pt-3 border-t border-[#ddc0bd]/40 flex flex-col gap-3 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="date"
                        value={tempDate}
                        onChange={(e) => setTempDate(e.target.value)}
                        className="flex-1 text-sm font-bold text-[#171c23] bg-white px-3 py-2 rounded-xl border border-[#902e2a] shadow-xs outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleSaveDate}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-xl bg-[#902e2a] hover:bg-[#b0453f] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">check</span>
                        <span>{isLoading ? 'Calcul en cours...' : 'Calculer & Enregistrer'}</span>
                      </button>
                    </div>

                    {/* Raccourcis rapides de stade */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] uppercase font-bold text-[#574240] mr-1">Raccourcis :</span>
                      <button
                        type="button"
                        onClick={() => applyPresetWeeks(8)}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#ddc0bd] text-[#574240] hover:text-[#902e2a] text-[10px] font-bold cursor-pointer"
                      >
                        8 SA (Mois 2)
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPresetWeeks(16)}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#ddc0bd] text-[#574240] hover:text-[#902e2a] text-[10px] font-bold cursor-pointer"
                      >
                        16 SA (Mois 4)
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPresetWeeks(24)}
                        className="px-2 py-0.5 rounded-md bg-[#902e2a] text-white text-[10px] font-bold cursor-pointer shadow-xs"
                      >
                        24 SA (Mois 6)
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPresetWeeks(34)}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#ddc0bd] text-[#574240] hover:text-[#902e2a] text-[10px] font-bold cursor-pointer"
                      >
                        34 SA (Mois 8)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Carte État Gestationnel Exact Stitch & Dynamique */}
            <div
              className="rounded-2xl p-5 shadow-xs flex flex-col gap-4 border border-[#ffb3ac]/40 transition-all"
              style={{ background: 'linear-gradient(135deg, #ffdad6 0%, #f0f4fd 100%)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider" style={{ color: '#902e2a' }}>
                    État gestationnel actuel
                  </span>
                  <div className="text-xl sm:text-2xl font-serif font-bold leading-tight mt-0.5" style={{ color: '#410003' }}>
                    {pregnancyData?.currentWeeks || 24} SA (Semaines)
                  </div>
                  <span className="text-xs text-[#574240] font-semibold">
                    {pregnancyData?.currentMonth || 6}ème mois • {pregnancyData?.trimester || 2}ème Trimestre
                  </span>
                </div>
                <div className="px-3.5 py-1.5 bg-white text-[#902e2a] rounded-full shadow-xs flex items-center gap-1.5 text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>J - {pregnancyData?.daysRemaining ?? 112}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 mt-1">
                {/* SVG Cercle Jauge Dynamique */}
                <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 72 72">
                    <circle cx="36" cy="36" r="30" fill="transparent" stroke="#dee2ec" strokeWidth="7" />
                    <circle
                      cx="36"
                      cy="36"
                      r="30"
                      fill="transparent"
                      stroke="#902e2a"
                      strokeWidth="7"
                      strokeDasharray="188.5"
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <span className="absolute text-base font-bold font-serif" style={{ color: '#902e2a' }}>
                    {progressPercent}%
                  </span>
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1 text-[#724600]">
                    <span className="material-symbols-outlined text-[18px]">hearing</span>
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {pregnancyData?.fetalStage?.titleFr || 'Étape Fœtale'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#171c23] mt-1 leading-snug">
                    {lang === 'wo'
                      ? pregnancyData?.fetalStage?.descWo || "Liir bi am na 600g, nopp yi di dégg sa baat !"
                      : pregnancyData?.fetalStage?.descFr || "Bébé pèse environ 600g, ses poumons se développent et il perçoit votre voix !"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-2.5 text-xs gap-2">
                <span className="text-[#574240] font-medium">Terme d'accouchement prévu (DPA) :</span>
                <span className="text-[#171c23] font-bold font-serif">
                  {pregnancyData?.dpaFormatted || '22 Juillet 2026'}
                </span>
              </div>
            </div>
          </div>

          {/* 3. CHRONOLOGIE CPN OFFICIELLE (TIMELINE DYNAMIQUE DU MINISTÈRE) */}
          <div className="w-full bg-white rounded-2xl p-5 shadow-sm border border-[#ddc0bd]/40 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-[#171c23]">
                  Consultations Prénatales (CPN)
                </h2>
                <span className="text-xs text-[#574240]">
                  Protocole national en 4 étapes clés adaptées à votre calendrier
                </span>
              </div>
              <span className="material-symbols-outlined text-[#2c694e] text-[26px]">
                verified
              </span>
            </div>

            <div className="flex flex-col gap-4 relative">
              {pregnancyData?.cpnMilestones?.map((cpn, idx) => {
                const isCurrent = cpn.status === 'current';
                const isValidated = cpn.status === 'validated';

                return (
                  <div key={cpn.id || idx} className="flex items-start gap-3.5 relative">
                    <div className="flex flex-col items-center shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xs text-xs font-bold transition-all ${
                          isValidated
                            ? 'bg-[#2c694e] text-white'
                            : isCurrent
                            ? 'bg-[#902e2a] text-white animate-pulse shadow-sm'
                            : 'bg-[#dee2ec] text-[#574240]'
                        }`}
                      >
                        {isValidated ? (
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        ) : isCurrent ? (
                          <span className="material-symbols-outlined text-[18px]">event_note</span>
                        ) : (
                          cpn.id
                        )}
                      </div>
                      {idx < 3 && (
                        <div
                          className={`w-0.5 h-full mt-1 ${
                            isValidated ? 'bg-[#aeeecb]' : 'bg-[#eaeef8]'
                          }`}
                        ></div>
                      )}
                    </div>

                    <div
                      className={`flex-1 rounded-xl p-3.5 sm:p-4 flex flex-col gap-2 transition-all ${
                        isCurrent
                          ? 'border shadow-xs'
                          : 'bg-[#f0f4fd]'
                      }`}
                      style={
                        isCurrent
                          ? { backgroundColor: 'rgba(255, 218, 214, 0.45)', borderColor: '#902e2a' }
                          : {}
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-base font-serif font-bold ${
                              isCurrent ? 'text-[#902e2a]' : 'text-[#171c23]'
                            }`}
                          >
                            {cpn.title}
                          </span>
                          <span className="text-xs text-[#574240] font-semibold">
                            {cpn.weeksLabel}
                          </span>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold shadow-xs ${
                            isValidated
                              ? 'bg-[#aeeecb] text-[#316e52]'
                              : isCurrent
                              ? 'bg-[#902e2a] text-white'
                              : 'bg-[#eaeef8] text-[#574240]'
                          }`}
                        >
                          {isValidated
                            ? 'Validée'
                            : isCurrent
                            ? 'À Réaliser'
                            : 'À Venir'}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#171c23] leading-relaxed">
                        {lang === 'wo' ? cpn.summaryWo : cpn.summaryFr}
                      </p>

                      <div className="flex items-center justify-between text-[#574240] bg-white/70 rounded-lg p-2 text-xs gap-2 flex-wrap">
                        <span className="font-semibold text-[#171c23]">
                          Date cible : {cpn.dateFormatted}
                        </span>
                        <div className="flex items-center gap-2">
                          {isCurrent && (
                            <a
                              href={`https://wa.me/?text=${encodeURIComponent(
                                `Bonjour, rappel pour ma CPN ${cpn.id} prévue autour du ${cpn.dateFormatted} (Suivi SuturaSanté).`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-[#2c694e] hover:underline inline-flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-[15px]">send</span>
                              <span>Partager WhatsApp</span>
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              toggleAudio(
                                lang === 'wo'
                                  ? `${cpn.title}. ${cpn.summaryWo} Waxtu bi ci ${cpn.dateFormatted} la war a am.`
                                  : `${cpn.title}. ${cpn.summaryFr} Prévue autour du ${cpn.dateFormatted}.`,
                                cpn.id
                              )
                            }
                            className="font-bold text-[#902e2a] inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">volume_up</span>
                            <span>{activeCpnPlaying === cpn.id && isPlaying ? 'Stop' : 'Audio'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================
            COLONNE DROITE (lg:col-span-5) : Urgences, Sage-Femme & Nutrition
            ========================================================= */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* 1. CARTE D'APPEL DIRECT SAMU 1515 */}
          <div
            className="w-full rounded-2xl p-5 shadow-sm flex flex-col gap-3 text-white border"
            style={{ backgroundColor: '#ba1a1a', borderColor: '#93000a' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] animate-bounce">e911_emergency</span>
                <span className="text-xs font-bold uppercase tracking-wider">Urgence Vitale 24/7</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">Gratuit</span>
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">SAMU Sénégal 1515</h3>
              <p className="text-xs text-white/90 mt-1 leading-snug">
                En cas de perte de sang, forte fièvre ou maux de tête violents, contactez directement le SAMU sans frais.
              </p>
            </div>
            <a
              href="tel:1515"
              onClick={() => {
                if (onActionTrack) onActionTrack('emergency_call', 'Appel 1515 depuis calculateur grossesse');
              }}
              className="w-full min-h-[46px] rounded-xl bg-white text-[#ba1a1a] font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#f0f4fd] active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              <span>APPELER LE 1515 MAINTENANT</span>
            </a>
          </div>

          {/* 2. RACCOURCIS USSD & WHATSAPP */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <a
              href="tel:*1515%23"
              className="bg-white border border-[#ddc0bd]/40 rounded-2xl p-4 flex flex-col items-start gap-2 shadow-xs hover:bg-[#f0f4fd] transition-colors active:scale-95"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
              >
                <span className="material-symbols-outlined text-[22px]">dialpad</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#2c694e]">
                  Passerelle USSD
                </span>
                <span className="text-base font-bold text-[#171c23] leading-tight">*1515#</span>
                <span className="text-[11px] text-[#574240]">Sans Internet</span>
              </div>
            </a>

            <a
              href="https://wa.me/221770000000?text=Bonjour%20SuturaSante"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[#ddc0bd]/40 rounded-2xl p-4 flex flex-col items-start gap-2 shadow-xs hover:bg-[#f0f4fd] transition-colors active:scale-95"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#2c694e', color: '#ffffff' }}
              >
                <span className="material-symbols-outlined text-[22px]">forum</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#2c694e]">
                  WhatsApp Audio
                </span>
                <span className="text-base font-bold text-[#171c23] leading-tight">Vocaux 24/7</span>
                <span className="text-[11px] text-[#574240]">Conseillère santé</span>
              </div>
            </a>
          </div>

          {/* 3. CONSEIL DE LA SAGE-FEMME AVEC PHOTO */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#ddc0bd]/40 shadow-sm flex flex-col">
            <div className="w-full h-44 sm:h-48 overflow-hidden relative">
              <img
                className="w-full h-full object-cover object-center"
                alt="Mère sénégalaise épanouie à Dakar"
                src="/images/advice/breastfeeding.webp"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/95 text-[#902e2a] text-xs font-bold uppercase tracking-wider shadow-xs">
                  Conseil de la Sage-Femme
                </span>
                <span className="text-[11px] text-white font-bold bg-black/40 px-2 py-0.5 rounded-full">
                  Semaine {pregnancyData?.currentWeeks || 24}
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-1.5">
              <p className="text-xs sm:text-sm font-serif italic text-[#171c23] leading-relaxed">
                « {lang === 'wo'
                  ? pregnancyData?.fetalStage?.adviceWo || "Waxal ak sa liir ndànk ndànk, sa baat dafay dëgëral xolam."
                  : pregnancyData?.fetalStage?.adviceFr || "Parlez régulièrement au bébé. Les voix douces de la famille renforcent le lien d'attachement avant l'arrivée."} »
              </p>
              <span className="text-[11px] text-[#574240]">
                Pratique recommandée par les sages-femmes du Ministère de la Santé
              </span>
            </div>
          </div>

          {/* 4. COMPLÉMENTS & NUTRITION LOCALE AVEC SUIVI FER & ACIDE FOLIQUE */}
          <div className="w-full bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-3.5 border border-[#ddc0bd]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-[#2c694e]">
                  medication
                </span>
                <span className="text-base text-[#171c23] font-bold font-serif">
                  Compléments &amp; Nutrition
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  toggleAudio(
                    lang === 'wo'
                      ? "Doomi fer ak acide folique dafa am solo dé sama soxna si. Naanko bés bu nekk ak ndox mu sell walla njaan-u Bouye. Bul naan ataaya ci saa si dé !"
                      : "Le fer et l'acide folique sont indispensables pour éviter l'anémie. Prenez-les chaque jour avec de l'eau ou du jus de Bouye riche en vitamine C."
                  )
                }
                className="text-xs inline-flex items-center gap-1 font-bold text-[#2c694e] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">volume_up</span>
                <span>Wolof</span>
              </button>
            </div>

            {/* Notification Toast Folic */}
            {folicToast && (
              <div className="p-2.5 rounded-xl bg-[#aeeecb] text-[#316e52] text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>{folicToast}</span>
              </div>
            )}

            {/* Case à cocher Fer & Acide Folique Interactive */}
            <div
              onClick={handleToggleFolic}
              className="flex items-center justify-between bg-[#f0f4fd] rounded-xl p-3.5 cursor-pointer select-none hover:bg-[#eaeef8] transition-colors border border-[#ddc0bd]/20 active:scale-98"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors shadow-xs ${
                    folicChecked ? 'bg-[#2c694e] text-white' : 'border-2 border-[#8a716f] bg-white'
                  }`}
                >
                  {folicChecked && <span className="material-symbols-outlined text-[16px]">check</span>}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs sm:text-sm text-[#171c23] font-bold leading-tight">
                    Fer &amp; Acide Folique pris aujourd'hui ?
                  </span>
                  <span className="text-xs text-[#574240] mt-0.5">
                    {folicChecked ? "✓ Validé aujourd'hui (Anti-anémie)" : "Cliquez pour valider la prise du jour"}
                  </span>
                </div>
              </div>
              <span
                className={`material-symbols-outlined text-[24px] ${
                  folicChecked ? 'text-[#2c694e]' : 'text-[#8a716f]'
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {folicChecked ? 'check_circle' : 'radio_button_unchecked'}
              </span>
            </div>

            {/* Moringa & Bouye */}
            <div className="flex items-center gap-3 bg-[#f0f4fd] rounded-xl p-3 border border-[#ddc0bd]/20">
              <img
                className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-xs"
                alt="Moringa et Bouye sénégalais"
                src="/images/advice/moringa.webp"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#724600]">
                  Alliés naturels : Moringa &amp; Bouye
                </span>
                <span className="text-xs text-[#574240] leading-snug mt-0.5">
                  Ajoutez du Moringa (Nebeday) à vos sauces et buvez du jus de bouye frais pour fixer le fer.
                </span>
              </div>
            </div>
          </div>

          {/* 5. BANNIÈRE AUTO-ÉVALUATION TRIAGE */}
          <div
            onClick={onNavigateToTriage}
            className="w-full bg-[#f0f4fd] hover:bg-[#eaeef8] text-[#171c23] rounded-2xl p-4 flex items-center justify-between shadow-xs cursor-pointer group border border-[#ddc0bd]/40 active:scale-95 transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#ffdad6', color: '#93000a' }}
              >
                <span className="material-symbols-outlined text-[20px]">health_and_safety</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-sm font-bold group-hover:text-[#902e2a] transition-colors leading-tight">
                  Un doute, des vertiges ou une douleur ?
                </span>
                <span className="text-xs text-[#574240]">
                  Faire le test d'auto-évaluation rapide en 1 min
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#574240] text-[20px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}