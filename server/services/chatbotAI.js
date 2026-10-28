/**
 * Moteur d'Intelligence Artificielle du Chatbot SuturaSanté
 * Personnalité : "Bajenu Gox Numérique" chaleureuse, empathique (Téranga) et protectrice (Sutura).
 * Fournit des explications humaines, douces et précises en Wolof sénégalais et en Français.
 */

import { toWolofPhoneticSpeech } from './wolofTranslator.js';

// Mots clés d'urgences obstétricales graves (Grade 1 - Alerte Rouge)
const EMERGENCY_KEYWORDS = [
  'saignement', 'sang', 'deret', 'hemorragie',
  'maux de tete violents', 'metti bopp bu tar', 'mouche volante', 'vision floue', 'bët yuy lëndëm',
  'convulsion', 'perte de connaissance', 'lox',
  'bebe ne bouge plus', 'bouge moins', 'liir bi yëngatul', 'yëngatul',
  'perte des eaux', 'eau qui coule', 'poche des eaux', 'ndox buy sotti',
  'forte fievre', 'frissons', 'yaram bu tang jériñ', 'sibiru bu tar',
  'tension elevee', 'hypertension', 'eclampsie', 'preeclampsie', 'tension bu kowe'
];

// Protocoles de réponses médicales humanisées
const PROTOCOLS = [
  {
    category: 'cpn',
    triggers: ['cpn', 'consultation', 'rendez-vous', 'visite', 'calendrier', 'semaine', 'date', 'terme', 'echographie', 'echo', 'saytu', 'waxtu'],
    fr: {
      title: "Calendrier des 4 CPN Officielles au Sénégal",
      body: "Chère sœur, le suivi régulier de votre grossesse est le plus beau cadeau pour vous et votre futur bébé :\n\n" +
            "• **CPN 1 (avant la 12e semaine)** : C'est la confirmation. La sage-femme vérifie votre sang contre l'anémie et vous remet gratuitement vos comprimés de fer et d'acide folique.\n" +
            "• **CPN 2 (entre la 20e et 24e semaine)** : On fait l'échographie pour voir grandir bébé, écouter les battements de son cœur et faire le vaccin antitétanique.\n" +
            "• **CPN 3 (vers la 28e semaine)** : Contrôle essentiel de votre tension artérielle et traitement préventif contre le paludisme (TPI).\n" +
            "• **CPN 4 (entre la 36e et 38e semaine)** : Préparation sereine de l'accouchement, choix de la maternité et du moyen de transport pour le grand jour.\n\n" +
            "Gardez toujours précieusement votre carnet de santé avec vous !",
      suggestions: ['Calculer mes dates CPN', 'Quels aliments manger ?', 'Signes de danger']
    },
    wo: {
      title: "Saytu CPN yi ci kër docteur : 4 waxtu yu am solo dé sama soxna si !",
      body: "Waaw kaye sama soxna si, deggluma bu baax dé ! Birr bi dafa laaj ñu koy saytu ndànk ndànk ci jàmm :\n\n" +
            "• **CPN 1 (bala weer bi di jàll / 12 ayu-bës)** : Dangay dem dëggal birr bi, xool sa deret ndax amul anémie, te jël sa doomi fer ak acide folique.\n" +
            "• **CPN 2 (diggante 20 ak 24 ayu-bës)** : Dangay xool liir bi ci masin (écho), déglu xolam buy tëgg, ak jël ñakk VAT.\n" +
            "• **CPN 3 (ci 28e ayu-bës)** : Saytu tension bi ak jël garapu sibiru (TPI) ngir faju màngo.\n" +
            "• **CPN 4 (diggante 36 ak 38 ayu-bës)** : Waajal wàsin bi ci jàmm, xam ana auto bu lay yóbbu kër docteur bu waxtu bi jotee.\n\n" +
            "Bul fatte dé sama soxna si, kaye fajuwaay bi dafa wara nekk sa kanam saa yu ngay dem !",
      suggestions: ['Nattal ma sama CPN', 'Saytu deret', 'Mandargay musiba']
    }
  },
  {
    category: 'nutrition',
    triggers: ['manger', 'nutrition', 'aliment', 'nourriture', 'fer', 'anemie', 'moringa', 'nebeday', 'bouye', 'vitamine', 'repas', 'lekk', 'naan', 'ñam'],
    fr: {
      title: "Nutrition Locale Maternelle & Force pour le Sang",
      body: "Prenez bien soin de vous, car ce que vous mangez donne de la force à votre bébé :\n\n" +
            "• **Aliments riches en fer** : Mettez des feuilles fraîches de Moringa (*Nebeday*) dans vos sauces, consommez du niébé (*ñebbe*), des lentilles, des œufs bien cuits et du poisson frais.\n" +
            "• **Vitamine C pour bien absorber le fer** : Un bon verre de jus de Bouye (pain de singe) ou d'orange aide votre corps à capter tout le fer des aliments.\n" +
            "• **Comprimés de fer du dispensaire** : Prenez-les chaque jour avec de l'eau. Une petite astuce : évitez de boire du thé (*ataaya*) ou du café dans l'heure qui suit car ils empêchent le fer d'agir.\n" +
            "• **Hydratation** : Buvez au moins 2 à 3 litres d'eau propre par jour pour bien oxygéner votre corps.",
      suggestions: ['Nausées du matin', 'Aliments interdits', 'Mes rendez-vous CPN']
    },
    wo: {
      title: "Lekk bu am doole mooy wér-gu-yaramu ndey ak liir bi dé sama soxna si !",
      body: "Deggluma bu baax sama soxna si, lii ngay lekk mooy dundal sa liir te di la may kàttan :\n\n" +
            "• **Yëf yu am fer** : Xob-u Nebeday (Moringa) dugalal ko ci sa ciin, lekk ñebbe bu ñor, lanti, nen, ak jën yu bees.\n" +
            "• **Vitamine C** : Naanal njaan-u Bouye bu sell walla limon ngir fer bi duggu bu baax ci sa yaram.\n" +
            "• **Doomi fer yi kër docteur joxe** : Naanko bés bu nekk ak ndox mu sell. Te bul naan ataaya ci saa si dé ndax dafay dindi fer bi ci biir !\n" +
            "• **Ndox mu sell** : Naanal lu bari, 2 ba 3 litru ndox bés bu nekk ngir sa yaram dal.",
      suggestions: ['Wàññi wàcc', 'Saytu CPN', 'Mandargay musiba']
    }
  },
  {
    category: 'postpartum',
    triggers: ['allaitement', 'lait', 'sein', 'nouveau-ne', 'colostrum', 'maternite', 'bebe', 'nampal', 'meew', 'wasin'],
    fr: {
      title: "Allaitement Maternel & Soins d'Amour pour Bébé",
      body: "Félicitations pour cette belle étape de vie ! Voici les conseils essentiels pour votre trésor :\n\n" +
            "• **Le premier lait d'or (Colostrum)** : Dès la première heure après la naissance, mettez bébé au sein pour lui donner ce premier lait épais et jaunâtre. C'est son premier vaccin naturel, il immunise son estomac contre toutes les infections.\n" +
            "• **Allaitement maternel exclusif pendant 6 mois** : Rien d'autre que votre lait. Pas besoin d'eau ni de tisane, votre lait contient tout ce qu'il faut pour sa soif et sa croissance.\n" +
            "• **Votre consultation post-natale** : Rendez visite à votre sage-femme au 6e jour puis à la 6e semaine pour vérifier votre bonne cicatrisation et la pesée de bébé.",
      suggestions: ['Espacement des naissances', 'Soins du cordon', 'Alimentation maman']
    },
    wo: {
      title: "Nampal liir bi ci jàmm ak yeermaande dé sama soxna si !",
      body: "Yàlla na la Yàlla may jàmm ak liir bu teey ! Deggluma ci li am solo ci liir bi :\n\n" +
            "• **Meew mu njëkk mi (Colostrum)** : Bala waxtu bi di jàll, tekkal liir bi ci sa ween. Meew mu mboq moomu mooy garap ak kaalaange liir bi ci jàngoro yépp !\n" +
            "• **6 weer yu njëkk yi** : Meewu ndey ji rekk ! Bul ko jox ndox, bul ko jox dàq walla ñam, meew mi doy na ko ci ndox ak lekk.\n" +
            "• **Saytu ginaaw wàsin** : Dellul kër docteur bi ci 6e bés ak 6e weer ngir sage-femme bi xool sa wér-gu-yaram ak pèse liir bi.",
      suggestions: ['Mayante ci birr yi', 'Topato liir bi', 'Lekk yu baax']
    }
  },
  {
    category: 'family_planning',
    triggers: ['contraception', 'planning', 'espacement', 'regle', 'cycle', 'pilule', 'implant', 'sterilet', 'sayana', 'dindi birr'],
    fr: {
      title: "Planification Familiale & Espacement Serein des Naissances",
      body: "Donner à son corps 2 à 3 années de repos entre deux grossesses permet à la maman de retrouver toute sa vitalité et assure à l'enfant une enfance épanouie.\n\n" +
            "Toutes les méthodes modernes sont accessibles et gratuites ou à coût symbolique dans nos postes de santé au Sénégal, en toute confidentialité (*Sutura*) :\n" +
            "• **Implants sous la peau & Stérilets (DIU)** : Protection longue durée (3 à 10 ans), discrète et totalement réversible quand vous voudrez un autre enfant.\n" +
            "• **Injections trimestrielles (Sayana Press)** : Une petite injection tous les 3 mois.\n" +
            "• **Pilules orales & préservatifs** : Simples et adaptés à vos choix.\n\n" +
            "La sage-femme est là pour vous conseiller avec douceur et sans jamais vous juger.",
      suggestions: ['Prendre rendez-vous', 'Allaitement et règles', 'Conseils CPN']
    },
    wo: {
      title: "Mayante ci birr yi ngir sa yaram noppalu dé sama soxna si !",
      body: "Mayante 2 ba 3 at diggante ñaari doom dafay tax ndey ji am kàttan te liir bi dund bu rafet ci kër gi :\n\n" +
            "Ay fajuwaay yu bari am na ci kër docteur yi ci sutura gu mat sëkk :\n" +
            "• **Implant ak Stérilet** : Dafa koy téye 3 ba 10 at, te saa yoo bëggee am doomati ñu dindi ko ci saa si.\n" +
            "• **Sayana Press (piqûre weer ñatt)** : Ci sutura rekk ngay ñakk ku weer ñatt.\n" +
            "• **Pilule bés bu nekk** ak **préservatif**.\n\n" +
            "Sage-femme bi dina la deglu bu baax ci sutura te kenn du ko yëg.",
      suggestions: ['Saytu kër docteur', 'Meew ak regle', 'Digal CPN']
    }
  }
];

export async function processChatbotMessage({ message, lang = 'fr', history = [] }) {
  const cleanMsg = (message || '').trim();
  const lowerMsg = cleanMsg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 1. Détection des signes de danger (Urgence Grade 1)
  const isEmergency = EMERGENCY_KEYWORDS.some(kw => {
    const cleanKw = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return lowerMsg.includes(cleanKw);
  });

  if (isEmergency) {
    const isWolof = lang === 'wo';
    const emergencyReply = isWolof
      ? "🚨 **HÉ SAMA SOXNA SI, DEGGLUMA BU BAAX DÉ !**\n\n" +
        "Li nga ma wax ni dafa gawa laaj fajuwaay ci saa si ! Bul toog di xalaat mukk dé :\n" +
        "• Mën na doon deret buy sotti, tension bu kowe (pré-éclampsie) walla liir bi ci biir di sonn.\n" +
        "• **Bul toog yaw rekk ci kër gi.** Waxal ak sa borom kër walla sa Bajenu Gox léegi léegi !\n\n" +
        "📞 **Li nga wara def ci saa si :**\n" +
        "Wóoyal **SAMU Sénégal ci 1515** (feyul dara) walla nga gaaw a dem ci kër docteur bi gën a jege. Yàlla na la Yàlla may jàmm, gaawal dem dé !"
      : "🚨 **ATTENTION MA SŒUR : SIGNE DE DANGER OBSTÉTRICAL DÉTECTÉ !**\n\n" +
        "Ce symptôme nécessite une évaluation médicale immédiate sans attendre :\n" +
        "• Risque d'hémorragie, de pré-éclampsie (hypertension sévère) ou de souffrance de votre bébé.\n" +
        "• **Ne restez pas seule.** Prévenez immédiatement un proche ou votre Bajenu Gox.\n\n" +
        "📞 **Action d'urgence immédiate :**\n" +
        "Appelez gratuitement le **SAMU Sénégal au 1515** ou rendez-vous sans attendre dans la maternité la plus proche.";

    return {
      reply: emergencyReply,
      phoneticSpeech: isWolof ? toWolofPhoneticSpeech(emergencyReply) : emergencyReply,
      lang,
      isEmergency: true,
      triageLevel: 'RED',
      suggestions: isWolof
        ? ['Wóoyal 1515 SAMU', 'Kër docteur yi jege', 'Yeneen mandarga']
        : ['Appeler le 1515 (SAMU)', 'Maternités régionales', 'Autres signes'],
      timestamp: new Date().toISOString()
    };
  }

  // 2. Protocoles Médicaux Humanisés
  for (const protocol of PROTOCOLS) {
    const matched = protocol.triggers.some(tr => lowerMsg.includes(tr));
    if (matched) {
      const content = lang === 'wo' ? protocol.wo : protocol.fr;
      const fullReply = `${content.title}\n\n${content.body}`;
      return {
        reply: fullReply,
        phoneticSpeech: lang === 'wo' ? toWolofPhoneticSpeech(fullReply) : fullReply,
        lang,
        isEmergency: false,
        triageLevel: 'GREEN',
        category: protocol.category,
        suggestions: content.suggestions,
        timestamp: new Date().toISOString()
      };
    }
  }

  // 3. Salutations
  const greetings = ['bonjour', 'salut', 'salam', 'coucou', 'hello', 'nakamou', 'nanga def', 'salaam'];
  if (greetings.some(g => lowerMsg.includes(g))) {
    const welcome = lang === 'wo'
      ? "Salamalékoum sama soxna si ! Dalal ak jàmm. Man la sa xarit Sutura AI. Bul ci am benn tiit, lepp sutura la dé. Wax ma, nanga def ? Yaram jàmm ? Lu la metti walla lu nga bëgg a laaj tay sama soxna si ?"
      : "Salamalékoum ma sœur ! Je suis **Sutura AI**, votre assistante bienveillante et confidentielle (*Sutura*). Vous pouvez me parler au micro ou m'écrire en toute tranquillité. Comment vous sentez-vous aujourd'hui ?";

    return {
      reply: welcome,
      phoneticSpeech: lang === 'wo' ? toWolofPhoneticSpeech(welcome) : welcome,
      lang,
      isEmergency: false,
      suggestions: lang === 'wo'
        ? ['Saytu CPN', 'Mandargay musiba', 'Ñam yu am fer', 'Wóoyal 1515']
        : ['Mes 4 CPN', 'Signes de danger', 'Aliments riches en fer', 'SAMU 1515'],
      timestamp: new Date().toISOString()
    };
  }

  // 4. Réponse par défaut chaleureuse
  const defaultReply = lang === 'wo'
    ? "Deggluma bu baax sama soxna si, man la sa xarit Sutura AI. Wax ma sa jafe-jafe ci sutura gu mat sëkk. Mën nga ma laaj ci wàllu saytu CPN, lekk yu am doole, yaram buy metti, walla numéros gawante fajuwaay. Lu la neex a laaj ?"
    : "Je vous écoute avec tout mon cœur et en toute discrétion (*Sutura*). Je suis là pour vous accompagner sur votre calendrier de CPN, votre alimentation, vos petits tracas de santé ou les urgences médicales.\n\nQuelle est votre question, ma sœur ?";

  return {
    reply: defaultReply,
    phoneticSpeech: lang === 'wo' ? toWolofPhoneticSpeech(defaultReply) : defaultReply,
    lang,
    isEmergency: false,
    suggestions: lang === 'wo'
      ? ['Nattal ma sama CPN', 'Mandargay musiba', 'Lekk yu am fer', 'Wóoyal 1515']
      : ['Calendrier CPN', 'Signes de danger', 'Nutrition & Moringa', 'SAMU 1515'],
    timestamp: new Date().toISOString()
  };
}
