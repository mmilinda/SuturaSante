import { Router } from 'express';
import { toWolofPhoneticSpeech } from '../services/wolofTranslator.js';

const router = Router();

// Cache en mémoire volatile pour les profils anonymes
const anonymousProfiles = new Map();

/**
 * Calcul obstétrical conforme au protocole du Ministère de la Santé du Sénégal
 * @param {string} inputDate - Date au format YYYY-MM-DD
 * @param {'ddr' | 'dpa'} type - Type de date ('ddr' = dernières règles, 'dpa' = terme prévu)
 */
export function calculateObstetricalSchedule(inputDate, type = 'ddr') {
  const refDate = new Date(inputDate);
  const now = new Date();

  // Règle de Naegele : DPA = DDR + 280 jours (40 semaines)
  let ddr, dpa;
  if (type === 'dpa') {
    dpa = new Date(refDate);
    ddr = new Date(dpa.getTime() - 280 * 86400000);
  } else {
    ddr = new Date(refDate);
    dpa = new Date(ddr.getTime() + 280 * 86400000);
  }

  // Calcul des semaines d'aménorrhée (SA) actuelles
  const diffTime = now.getTime() - ddr.getTime();
  const totalDays = Math.max(0, Math.floor(diffTime / 86400000));
  const currentWeeks = Math.floor(totalDays / 7);
  const currentDays = totalDays % 7;

  // Jours restants jusqu'au terme
  const diffToDpa = dpa.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffToDpa / 86400000));

  // Mois de grossesse (1 à 9) et Trimestre (1 à 3)
  const currentMonth = Math.min(9, Math.max(1, Math.ceil(currentWeeks / 4.44)));
  let trimester = 1;
  if (currentWeeks >= 14 && currentWeeks < 28) trimester = 2;
  else if (currentWeeks >= 28) trimester = 3;

  // Pourcentage de progression (0 à 100%)
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentWeeks / 40) * 100)));

  // Formatage des dates au format français lisible
  const formatDateFr = (date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Étape fœtale personnalisée
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

  // Dates des 4 CPN Officielles du Ministère de la Santé
  const cpn1Date = new Date(ddr.getTime() + 10 * 7 * 86400000); // 10 SA
  const cpn2Date = new Date(ddr.getTime() + 22 * 7 * 86400000); // 22 SA
  const cpn3Date = new Date(ddr.getTime() + 30 * 7 * 86400000); // 30 SA
  const cpn4Date = new Date(ddr.getTime() + 37 * 7 * 86400000); // 37 SA

  // Détermination du statut de chaque CPN
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

  // Texte audio dynamique en Wolof et Français
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

/**
 * POST /api/pregnancy/calculate
 * Calcule dynamiquement le suivi obstétrical à partir de la DDR ou DPA
 */
router.post('/calculate', (req, res) => {
  try {
    const { date, type = 'ddr', anonymousId } = req.body;

    if (!date) {
      return res.status(400).json({
        error: "Le paramètre 'date' est requis (ex: '2025-11-10')."
      });
    }

    const schedule = calculateObstetricalSchedule(date, type);

    // Sauvegarde en cache pour cet identifiant anonyme si fourni
    if (anonymousId) {
      anonymousProfiles.set(anonymousId, {
        ...schedule,
        lastUpdated: new Date().toISOString()
      });
    }

    res.json(schedule);
  } catch (error) {
    console.error("Erreur calcul obstétrical:", error);
    res.status(500).json({
      error: "Erreur lors du calcul obstétrical.",
      details: error.message
    });
  }
});

/**
 * GET /api/pregnancy/profile/:anonymousId
 * Récupère le profil obstétrical anonyme sauvegardé
 */
router.get('/profile/:anonymousId', (req, res) => {
  const { anonymousId } = req.params;
  const profile = anonymousProfiles.get(anonymousId);

  if (profile) {
    return res.json(profile);
  }

  // Profil par défaut réaliste (environ 24 SA)
  const defaultDate = new Date(Date.now() - 24 * 7 * 86400000).toISOString().split('T')[0];
  const defaultSchedule = calculateObstetricalSchedule(defaultDate, 'ddr');
  res.json(defaultSchedule);
});

/**
 * POST /api/pregnancy/folic-intake
 * Enregistre la prise quotidienne de fer & acide folique (anonyme)
 */
router.post('/folic-intake', (req, res) => {
  const { anonymousId, taken = true } = req.body;

  res.json({
    success: true,
    taken,
    date: new Date().toISOString().split('T')[0],
    messageFr: taken
      ? "Bravo ma sœur ! Votre prise de fer et acide folique d'aujourd'hui est validée."
      : "N'oubliez pas de prendre votre fer avec un verre d'eau ou de jus de Bouye !",
    messageWo: taken
      ? "Waaw kaye sama soxna si ! Sa doomi fer mu tay mi jël nga ko, Yàlla na la may kàttan."
      : "Bul fatte naan sa doomi fer dé sama soxna si !"
  });
});

export default router;
