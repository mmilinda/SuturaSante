/**
 * Moteur d'Intelligence Artificielle du Chatbot SuturaSanté
 * Gère la compréhension clinique, la détection des urgences obstétricales,
 * la réponse personnalisée en Français ou Wolof, et l'intégration LLM externe optionnelle.
 */

import { translateText } from './wolofTranslator.js';

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

// Protocoles de réponses médicales approfondies
const PROTOCOLS = [
  {
    category: 'cpn',
    triggers: ['cpn', 'consultation', 'rendez-vous', 'visite', 'calendrier', 'semaine', 'date', 'terme', 'echographie', 'echo', 'saytu', 'waxtu'],
    fr: {
      title: "Calendrier des 4 CPN Officielles (Protocole Sénégal)",
      body: "Au Sénégal, le suivi prénatal optimal comprend au minimum 4 consultations clés :\n\n" +
            "• **CPN 1 (avant 12 SA)** : Confirmation de grossesse, dépistage de l'anémie, groupe sanguin, distribution de comprimés de fer et acide folique.\n" +
            "• **CPN 2 (20 à 24 SA)** : Échographie morphologique, écoute des bruits du cœur du fœtus, vaccination antitétanique (VAT).\n" +
            "• **CPN 3 (28 à 32 SA)** : Mesure de la hauteur utérine et tension, prévention du paludisme (TPI à la Sulfadoxine-Pyriméthamine).\n" +
            "• **CPN 4 (36 à 38 SA)** : Préparation du plan d'accouchement, positionnement du bébé et organisation du transport d'urgence.",
      suggestions: ['Calculer mes dates CPN', 'Quels examens sanguins ?', 'Signes de danger']
    },
    wo: {
      title: "Tegalin bu 4 Saytu CPN yi ci Sénégal",
      body: "Ci réewum Sénégal, Ministère bu Wér-gi-yaram digale na ñu def lu néew néew 4 saytu CPN yu am solo :\n\n" +
            "• **CPN 1 (bala 12 ayu-bës)** : Dëggal birr bi, saytu deret ak joxe garap u fer ak acide folique.\n" +
            "• **CPN 2 (20 ba 24 ayu-bës)** : Écho masin, déglu xolu liir bi ak ñakk VAT.\n" +
            "• **CPN 3 (28 ba 32 ayu-bës)** : Saytu tension ak garapu sibiru (TPI).\n" +
            "• **CPN 4 (36 ba 38 ayu-bës)** : Waajal wàsin bi ak auto bu la mën a yóbbu fajuwaay.",
      suggestions: ['Nattal ma sama CPN', 'Saytu deret', 'Mandargay musiba']
    }
  },
  {
    category: 'nutrition',
    triggers: ['manger', 'nutrition', 'aliment', 'nourriture', 'fer', 'anemie', 'moringa', 'nebeday', 'bouye', 'vitamine', 'repas', 'lekk', 'naan', 'ñam'],
    fr: {
      title: "Nutrition Locale Maternelle & Prévention de l'Anémie",
      body: "Une bonne alimentation protège la mère contre l'anémie et fortifie le bébé :\n\n" +
            "• **Aliments riches en fer** : Feuilles de Moringa (*Nebeday*) dans le Thiéboudienne ou sauces, lentilles, haricots (*ñebbe*), œufs bien cuits, poissons et viandes.\n" +
            "• **Vitamine C pour fixer le fer** : Jus de Bouye (pain de singe), oranges, mangues, citron.\n" +
            "• **Comprimés de fer** : À prendre chaque jour avec de l'eau (évitez le thé, le café ou le lait dans l'heure qui suit car ils bloquent le fer).\n" +
            "• **Hydratation** : Buvez 2 à 3 litres d'eau propre par jour.",
      suggestions: ['Nausées du matin', 'Aliments interdits', 'Mes rendez-vous CPN']
    },
    wo: {
      title: "Lekk yu am fer ak doole ci yaram",
      body: "Ñam yu baax daxay may ndey ji doole te tax liir bi dund bu baax :\n\n" +
            "• **Yëf yu am fer** : Xob-u Neverdie (Moringa) ci sa ciin, ñebbe, lanti, nen yu ñor, ak jën yu bees.\n" +
            "• **Vitamine C** : Njaan-u Bouye, limon, màngo.\n" +
            "• **Garap u fer** : Naanal sa garapu fer bés bu nekk ak ndox, te bul naan ataaya ci saa si.\n" +
            "• **Ndox** : Naanal lu néew néew 2 ba 3 litru ndox mu sell bés bu nekk.",
      suggestions: ['Wàññi wàcc', 'Saytu CPN', 'Mandargay musiba']
    }
  },
  {
    category: 'postpartum',
    triggers: ['allaitement', 'lait', 'sein', 'nouveau-ne', 'colostrum', 'maternite', 'bebe', 'nampal', 'meew', 'wasin'],
    fr: {
      title: "Allaitement Maternel Exclusif & Soins Post-partum",
      body: "• **Mise au sein immédiate** : Dans l'heure suivant l'accouchement, donnez le premier lait jaunâtre appelé **Colostrum** (*Lait d'or*). C'est le premier vaccin naturel ultra-riche pour le bébé.\n" +
            "• **6 premiers mois** : Allaitement maternel exclusif sans eau ni tisane.\n" +
            "• **Visite post-natale** : Consultez au poste de santé au 6e jour et à la 6e semaine après l'accouchement pour vérifier la guérison et la santé du bébé.",
      suggestions: ['Espacement des naissances', 'Soins du nombril', 'Alimentation maman']
    },
    wo: {
      title: "Nampal liir bi ak topato ginaaw wàsin",
      body: "• **Tekk liir bi ci ween bi léegi** : Bala waxtu di jàll, nampalal ko meew mu njëkk mi (Colostrum). Mooy kaalaange liir bi ci jàngoro yépp.\n" +
            "• **6 weer yu njëkk yi** : Meewu ndey ji rekk, bul ko jox ndox walla dàq.\n" +
            "• **Saytu ginaaw wàsin** : Dellul kër docteur bi ci 6e bés ak 6e weer ngir xool sa yaram.",
      suggestions: ['Mayante ci birr yi', 'Topato liir bi', 'Lekk yu baax']
    }
  },
  {
    category: 'family_planning',
    triggers: ['contraception', 'planning', 'espacement', 'regle', 'cycle', 'pilule', 'implant', 'sterilet', 'sayana', 'dindi birr'],
    fr: {
      title: "Planification Familiale & Espacement des Naissances",
      body: "Espacer les naissances de 2 à 3 ans protège la vie de la mère et la santé du nourrisson.\n\n" +
            "Méthodes disponibles en toute discrétion (*Sutura*) dans tous les postes de santé du Sénégal :\n" +
            "• **Implants & Stérilets (DIU)** : Protection réversible de longue durée (3 à 10 ans).\n" +
            "• **Injections trimestrielles (Sayana Press)** : Pratiques et confidentielles.\n" +
            "• **Pilules orales & préservatifs** : Accessibles et sûrs.",
      suggestions: ['Prendre rendez-vous', 'Allaitement et règles', 'Conseils CPN']
    },
    wo: {
      title: "Wàññi am doom ak mayante ci birr yi",
      body: "Mayante ci birr yi lu tollu ci 2 ba 3 at dafay dimbali yaramu ndey ji mu dellusi te liir bi dund bu baax.\n\n" +
            "Ay pexey garap am na ci kër docteur yi ci sutura gu mat sëkk :\n" +
            "• **Implant ak Stérilet** (3 ba 10 at)\n" +
            "• **Sayana Press (piqûre weer ñatt)**\n" +
            "• **Pilule bés bu nekk** ak **préservatif**.",
      suggestions: ['Saytu kër docteur', 'Meew ak regle', 'Digal CPN']
    }
  }
];

/**
 * Traite la requête utilisateur et génère une réponse IA contextuelle et sécurisée
 */
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
      ? "🚨 **MOYTU : MANDARGA GU AM MUSIBA LA CI SA YARAM !**\n\n" +
        "Li nga wax dafa laaj nga dem fajuwaay léegi te bul yéex :\n" +
        "• Mën na doon deret buy sotti, tension bu kowe (pré-éclampsie) walla liir bi ci biir di sonn.\n" +
        "• **Bul toog yaw rekk.** Wax ko sa mbokk walla sa Bajenu Gox.\n\n" +
        "📞 **Action d'urgence :**\n" +
        "Wóoyal **SAMU Sénégal ci 1515** (feyul dara) walla nga gaaw a dem ci kër docteur bi gën a jege."
      : "🚨 **ATTENTION : SIGNE DE DANGER OBSTÉTRICAL DÉTECTÉ !**\n\n" +
        "Ce symptôme nécessite une évaluation médicale immédiate sans attendre :\n" +
        "• Risque d'hémorragie, de pré-éclampsie (hypertension sévère) ou de souffrance fœtale.\n" +
        "• **Ne restez pas seule.** Prévenez un proche ou votre Bajenu Gox.\n\n" +
        "📞 **Action d'urgence immédiate :**\n" +
        "Appelez gratuitement le **SAMU Sénégal au 1515** ou rendez-vous immédiatement dans la maternité la plus proche.";

    return {
      reply: emergencyReply,
      lang,
      isEmergency: true,
      triageLevel: 'RED',
      suggestions: isWolof
        ? ['Wóoyal 1515 SAMU', 'Fajuwaay yi gën a jege', 'Yeneen mandarga']
        : ['Appeler le 1515 (SAMU)', 'Maternités régionales', 'Autres signes'],
      timestamp: new Date().toISOString()
    };
  }

  // 2. Si une clé API externe LLM (Gemini ou OpenAI) est fournie dans l'environnement
  if (process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY) {
    try {
      const llmResponse = await queryExternalLLM({ message: cleanMsg, lang });
      if (llmResponse) {
        return {
          reply: llmResponse,
          lang,
          isEmergency: false,
          triageLevel: 'GREEN',
          engine: 'external-llm',
          suggestions: lang === 'wo' ? ['Saytu CPN', 'Lekk yu baax', 'Fajuwaay'] : ['Mes CPN', 'Nutrition fer', 'Centres de santé'],
          timestamp: new Date().toISOString()
        };
      }
    } catch (err) {
      console.warn("Repli sur le moteur médical Sutura suite à une erreur LLM externe:", err.message);
    }
  }

  // 3. Moteur Médical Interne SuturaSanté
  for (const protocol of PROTOCOLS) {
    const matched = protocol.triggers.some(tr => lowerMsg.includes(tr));
    if (matched) {
      const content = lang === 'wo' ? protocol.wo : protocol.fr;
      return {
        reply: `${content.title}\n\n${content.body}`,
        lang,
        isEmergency: false,
        triageLevel: 'GREEN',
        category: protocol.category,
        suggestions: content.suggestions,
        timestamp: new Date().toISOString()
      };
    }
  }

  // 4. Salutations
  const greetings = ['bonjour', 'salut', 'salam', 'coucou', 'hello', 'nakamou', 'nanga def', 'salaam'];
  if (greetings.some(g => lowerMsg.includes(g))) {
    return {
      reply: lang === 'wo'
        ? "Salamalékoum ! Man la **Sutura AI**, sa ndimbal ci wàllu birr ak wér-gu-yaramu jigéen. Mën nga ma wax sa jafe-jafe ci kàddu (micro) walla nga bind ma ko ci sutura. Lu la naqari walla lu nga bëgg a laaj tay ?"
        : "Salamalékoum ! Je suis **Sutura AI**, votre assistante confidentielle de santé maternelle et reproductive. Vous pouvez me poser vos questions par écrit ou me parler à la voix via le micro. En quoi puis-je vous aider aujourd'hui ?",
      lang,
      isEmergency: false,
      suggestions: lang === 'wo'
        ? ['Saytu CPN', 'Mandargay musiba', 'Ñam yu am fer', 'Wóoyal 1515']
        : ['Mes 4 CPN', 'Signes de danger', 'Aliments riches en fer', 'SAMU 1515'],
      timestamp: new Date().toISOString()
    };
  }

  // 5. Réponse bienveillante par défaut
  return {
    reply: lang === 'wo'
      ? "Degg naa sa laaj ci sutura. Man la Sutura AI, sa ndimbal ci wàllu birr ak wér-gu-yaram. Ndax mën nga ma gën a leral sa jafe-jafe ci kàddu walla ci bind ? Mën nga ma laaj ci wàllu saytu CPN, lekk yu am fer, walla mandargay musiba ci birr bi."
      : "Je vous écoute en toute bienveillance et confidentialité (*Sutura*). En tant qu'assistante de santé maternelle, je peux vous guider sur vos **rendez-vous de CPN**, les **signes d'alerte**, la **nutrition locale** (Moringa, fer) ou les **urgences (SAMU 1515)**.\n\nQue ressentez-vous ou quel est le sujet de votre question ?",
    lang,
    isEmergency: false,
    suggestions: lang === 'wo'
      ? ['Nattal ma sama CPN', 'Mandargay musiba', 'Lekk yu am fer', 'Wóoyal 1515']
      : ['Calendrier CPN', 'Signes de danger', 'Nutrition & Moringa', 'SAMU 1515'],
    timestamp: new Date().toISOString()
  };
}

/**
 * Appel optionnel aux APIs LLM externes (Gemini / OpenAI)
 */
async function queryExternalLLM({ message, lang }) {
  if (process.env.GEMINI_API_KEY) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const prompt = `Tu es Sutura AI, l'assistante officielle de santé maternelle et reproductive pour le Sénégal (UNICEF Femtech 2026). Ton ton est bienveillant, discret (principe de Sutura), médicalement rigoureux et encourageant. Si la langue demandée est 'wo', réponds en Wolof standard sénégalais. Sinon, réponds en français simple et accessible. En cas de signe de danger (saignement, céphalée intense, absence de mouvements du fœtus), insiste toujours sur l'appel immédiat au SAMU 1515.\n\nQuestion de l'utilisatrice (${lang}): ${message}`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (res.ok) {
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    }
  }

  return null;
}
