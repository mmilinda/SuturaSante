/**
 * Moteur de Traduction Bilingue Français <-> Wolof Authentique & Humain (SuturaSanté)
 * Reproduit la chaleur, l'empathie (Téranga) et les expressions familières des Bajenu Gox au Sénégal.
 * Inclut un convertisseur phonétique pour une prononciation vocale 100% naturelle et humaine.
 */

// Convertit le texte Wolof écrit en représentation phonétique pour les synthétiseurs vocaux web
export function toWolofPhoneticSpeech(wolofText) {
  if (!wolofText || typeof wolofText !== 'string') return '';

  let speech = wolofText;

  // Nettoyage markdown
  speech = speech
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/[#•\-]/g, ' ')
    .replace(/🚨|💡|🍲|🌿|🤱|🌸|🚑|⚠️|📞/g, '');

  // Règles phonétiques pour donner au moteur TTS français une prononciation Wolof sénégalaise authentique :
  // 1. Les consonnes spécifiques Wolof
  speech = speech.replace(/\bci\b/gi, 'tchi');
  speech = speech.replace(/\bca\b/gi, 'tcha');
  speech = speech.replace(/ceeb/gi, 'tchééb');
  speech = speech.replace(/c([aeiou])/gi, 'tch$1');
  speech = speech.replace(/C([aeiou])/g, 'Tch$1');

  // 'j' en Wolof se prononce toujours 'dj' (ex: jàmm -> djamm, jërajëf -> djéradjeuff)
  speech = speech.replace(/j/gi, (m) => m === 'J' ? 'Dj' : 'dj');

  // 'x' en Wolof est la jota / khr guttural (ex: xarit -> kharit, xob -> khob, ndox -> ndokh)
  speech = speech.replace(/x/gi, (m) => m === 'X' ? 'Kh' : 'kh');

  // 'ñ' en Wolof est le 'gn' doux (ex: ñam -> gnam, ñebbe -> gnébbé)
  speech = speech.replace(/ñ/gi, (m) => m === 'Ñ' ? 'Gn' : 'gn');

  // 'w' en Wolof est doux comme 'ou' (ex: wax -> ouakh, wàsin -> ouassine)
  speech = speech.replace(/\bw([aàeéio])/gi, (m, v) => (m[0] === 'W' ? 'Ou' : 'ou') + v);
  speech = speech.replace(/wà/gi, 'oua');

  // 2. Les voyelles spécifiques
  // 'ë' en Wolof correspond au son 'eu' français (ex: yëngatu -> yeungatou)
  speech = speech.replace(/ë/gi, 'eu');

  // 'u' en Wolof se prononce presque toujours 'ou' (ex: sutura -> soutoura, bul -> boul)
  speech = speech.replace(/u/gi, 'ou');

  // Raccourcis et respirations douces pour un rythme sénégalais chaleureux
  speech = speech.replace(/dé(\b|[!?.])/gi, 'déé$1');
  speech = speech.replace(/\bwaaw\b/gi, 'ouaoou');
  speech = speech.replace(/\blool\b/gi, 'lôle');
  speech = speech.replace(/\bsama soxna si\b/gi, 'sama sokhna si');

  return speech;
}

// Dictionnaire de phrases et expressions médicales et familières sénégalaises
const PHRASE_DICTIONARY = [
  // Formules de politesse chaleureuses & empathiques
  { fr: "bonjour", wo: "salamalékoum sama soxna si, nanga def" },
  { fr: "bonjour comment allez-vous", wo: "salamalékoum sama soxna si, nanga def ? Yaram jàmm ?" },
  { fr: "comment allez-vous", wo: "nanga def sama soxna si ? Jàmm nga am ?" },
  { fr: "je vais bien", wo: "mangi fi rekk, jàmm rekk alxamdulilaah" },
  { fr: "merci beaucoup", wo: "jërajëf lool sama xarit, Yàlla na la Yàlla fey" },
  { fr: "merci", wo: "jërajëf sama soxna si" },
  { fr: "s'il vous plaît", wo: "su la neexee dé" },
  { fr: "de rien", wo: "ñoo ko bokk dé, amul benn problème" },
  { fr: "au revoir", wo: "ba beneen yoon ci jàmm ak salaam" },
  { fr: "bienvenue", wo: "dalal ak jàmm ci kër Sutura" },
  { fr: "à bientôt", wo: "ba ci kanam ci jàmm" },
  { fr: "ne vous inquiétez pas", wo: "bul jaaxle mukk dé sama soxna si, lepp dina baax" },
  { fr: "n'ayez pas peur", wo: "bul ci am benn tiit, sutura rekk la" },
  { fr: "doucement", wo: "ndànk ndànk rekk" },
  { fr: "oui", wo: "waaw kaye" },
  { fr: "non", wo: "déedéet" },

  // Expressions courantes de patientes
  { fr: "j'ai mal au ventre", wo: "sama biir dafay metti lool dé" },
  { fr: "j'ai très mal au ventre", wo: "sama biir dafay metti bu tar ci saa si" },
  { fr: "j'ai mal à la tête", wo: "sama bopp dafay metti" },
  { fr: "j'ai des maux de tête violents", wo: "sama bopp dafa metti bu tar te sama bët yiy lëndëm" },
  { fr: "j'ai de la fièvre", wo: "sama yaram dafa tang jériñ" },
  { fr: "je saigne", wo: "deret dafay génn ci sama biir léegi" },
  { fr: "le bébé ne bouge plus", wo: "sama liir bi yëngatul mukk tay" },
  { fr: "le bébé bouge bien", wo: "liir bi mi ngi yëngatu bu baax alxamdulilaah" },
  { fr: "j'ai perdu les eaux", wo: "ndox mu tooy dafa tàcc di sotti ci sama tank yi" },
  { fr: "quand dois-je accoucher", wo: "kañ la wara wàsin sama liir bi" },
  { fr: "quand est ma cpn", wo: "kañ la wara dem saytu CPN kër docteur bi" },
  { fr: "aidez-moi", wo: "dimbali ma ci sutura" },
  { fr: "appelez les urgences", wo: "wóoyal ma SAMU 1515 léegi ci saa si" },

  // Santé maternelle & CPN
  { fr: "consultation prénatale", wo: "saytu CPN ci kër docteur" },
  { fr: "visite prénatale", wo: "saytu CPN" },
  { fr: "femme enceinte", wo: "jigéen bu ëmb" },
  { fr: "enceinte", wo: "ëmb" },
  { fr: "grossesse", wo: "birr bi" },
  { fr: "accouchement", wo: "wàsin bi" },
  { fr: "accoucher", wo: "wàsin ci jàmm" },
  { fr: "bébé", wo: "liir bi" },
  { fr: "nourrisson", wo: "liir bu bees bi" },
  { fr: "sage-femme", wo: "sage-femme bi" },
  { fr: "médecin", wo: "docteur bi" },
  { fr: "poste de santé", wo: "poste de santé bi" },
  { fr: "centre de santé", wo: "kër docteur bi" },
  { fr: "maternité", wo: "fajuwaay bi" },
  { fr: "hôpital", wo: "lopitan bi" },
  { fr: "carnet de santé", wo: "kaye fajuwaay bi" },
  { fr: "échographie", wo: "écho masin bi" },

  // Signes d'alerte et urgences
  { fr: "signes de danger", wo: "mandargay musiba ci birr bi" },
  { fr: "urgence médicale", wo: "gawante faju" },
  { fr: "urgence", wo: "gawante" },
  { fr: "saignement vaginal", wo: "deret buy génn ci biir" },
  { fr: "saignement", wo: "deret buy génn" },
  { fr: "perte de sang", wo: "deret buy sotti" },
  { fr: "maux de tête violents", wo: "metti bopp bu tar" },
  { fr: "maux de tête", wo: "metti bopp" },
  { fr: "vue trouble", wo: "bët yuy lëndëm" },
  { fr: "vision floue", wo: "gisul bu baax" },
  { fr: "forte fièvre", wo: "yaram bu tang jériñ" },
  { fr: "fièvre", wo: "yaram bu tang" },
  { fr: "paludisme", wo: "sibiru" },
  { fr: "perte des eaux", wo: "ndox mu tooy buy sotti" },
  { fr: "poche des eaux rompue", wo: "ndoxum birr bi dafa tàcc" },
  { fr: "contractions douloureuses", wo: "metti biir buy ñëw di dem" },
  { fr: "douleur au ventre", wo: "metti biir" },
  { fr: "douleur", wo: "metti" },
  { fr: "gonflement des pieds", wo: "tank yu fës" },
  { fr: "gonflement du visage", wo: "kanam bu fës" },
  { fr: "convulsions", wo: "yaram buy lox di tey" },
  { fr: "tension artérielle", wo: "tension" },
  { fr: "hypertension", wo: "tension bu kowe" },

  // Nutrition locale & Soins
  { fr: "aliments riches en fer", wo: "ñam yu am fer ngir dindi anémie" },
  { fr: "comprimés de fer", wo: "garap u fer yi" },
  { fr: "acide folique", wo: "acide folique" },
  { fr: "moringa", wo: "xob-u nebeday" },
  { fr: "feuilles de moringa", wo: "xob-u nebeday ci ceeb bi" },
  { fr: "jus de bouye", wo: "njaan-u bouye bu sell" },
  { fr: "pain de singe", wo: "bouye" },
  { fr: "eau potable", wo: "ndox mu sell" },
  { fr: "boire de l'eau", wo: "naan ndox mu bari" },
  { fr: "manger sainement", wo: "lekk ñam yu am doole" },
  { fr: "se reposer", wo: "noppalu bu baax" },
  { fr: "repos", wo: "noppay" },
  { fr: "nausées", wo: "yaram buy tey" },
  { fr: "vomissements", wo: "wàcc" },

  // Allaitement & Post-partum
  { fr: "allaitement maternel exclusif", wo: "nampal liir bi meew rekk 6 weer" },
  { fr: "allaitement maternel", wo: "nampal liir bi" },
  { fr: "donner le sein", wo: "nampal" },
  { fr: "le lait maternel", wo: "meewu ndey ji" },
  { fr: "colostrum", wo: "meew mu njëkk mu mboq mi (colostrum)" },
  { fr: "après l'accouchement", wo: "ginaaw wàsin bi" },

  // Planification familiale & droits
  { fr: "planification familiale", wo: "wàññi am doom ak mayante" },
  { fr: "espacement des naissances", wo: "mayante ci birr yi 2 ba 3 at" },
  { fr: "contraception", wo: "fajuwaay ngir téye birr" },
  { fr: "règles", wo: "regle yi" },
  { fr: "menstruations", wo: "regle yi" },
  { fr: "confidentialité", wo: "sutura" },
  { fr: "discrétion", wo: "sutura gu mat sëkk" },
  { fr: "respect", wo: "yeermaande" }
];

const WORD_MAP_FR_TO_WO = {
  "bonjour": "salamalékoum",
  "santé": "wér-gu-yaram",
  "femme": "jigéen",
  "femmes": "jigéen ñi",
  "mère": "ndey",
  "maman": "yaay",
  "enfant": "xale",
  "bébé": "liir",
  "docteur": "docteur",
  "médicament": "garap",
  "médicaments": "ay garap",
  "hôpital": "lopitan",
  "douleur": "metti",
  "ventre": "biir",
  "tête": "bopp",
  "sang": "deret",
  "eau": "ndox",
  "nourriture": "ñam",
  "manger": "lekk",
  "boire": "naan",
  "dormir": "nelaw",
  "reposer": "noppalu",
  "marcher": "dox",
  "venir": "ñëw",
  "aller": "dem",
  "parler": "wax",
  "écouter": "déglu",
  "comprendre": "dégg",
  "savoir": "xam",
  "peur": "ragal",
  "joie": "mbégte",
  "urgence": "gawante",
  "danger": "musiba",
  "aujourd'hui": "tay",
  "demain": "suba",
  "hier": "démb",
  "jour": "bés",
  "mois": "weer",
  "année": "at",
  "gratuit": "feyul dara",
  "aidez-moi": "dimbali ma",
  "bien": "bu baax",
  "très": "lool",
  "beaucoup": "bari",
  "un": "benn",
  "deux": "ñaar",
  "trois": "ñatt",
  "quatre": "ñent"
};

const WORD_MAP_WO_TO_FR = {};
Object.entries(WORD_MAP_FR_TO_WO).forEach(([fr, wo]) => {
  WORD_MAP_WO_TO_FR[wo.toLowerCase()] = fr;
});

/**
 * Traduit un texte donné entre Français et Wolof avec rendu phonétique vocal
 */
export async function translateText({ text, sourceLang = 'fr', targetLang = 'wo' }) {
  if (!text || typeof text !== 'string' || !text.trim()) {
    return {
      originalText: text,
      translatedText: '',
      phoneticSpeech: '',
      sourceLang,
      targetLang,
      confidence: 1.0,
      engine: 'empty'
    };
  }

  const cleanText = text.trim();

  // 1. API Externe si configurée
  if (process.env.WOLOF_TRANSLATE_API_URL && process.env.WOLOF_TRANSLATE_API_KEY) {
    try {
      const response = await fetch(process.env.WOLOF_TRANSLATE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.WOLOF_TRANSLATE_API_KEY}`
        },
        body: JSON.stringify({
          inputs: cleanText,
          parameters: {
            src_lang: sourceLang === 'fr' ? 'fra_Latn' : 'wol_Latn',
            tgt_lang: targetLang === 'wo' ? 'wol_Latn' : 'fra_Latn'
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const externalTranslation = Array.isArray(data) ? data[0]?.translation_text : data.translation_text;
        if (externalTranslation) {
          return {
            originalText: cleanText,
            translatedText: externalTranslation,
            phoneticSpeech: targetLang === 'wo' ? toWolofPhoneticSpeech(externalTranslation) : externalTranslation,
            sourceLang,
            targetLang,
            confidence: 0.95,
            engine: 'external-nllb'
          };
        }
      }
    } catch (err) {
      console.warn("API de traduction externe en repli local:", err.message);
    }
  }

  // 2. Moteur Contextuel SuturaSanté Chaleureux & Sénégalais
  let result = cleanText;
  let matchesCount = 0;

  if (sourceLang === 'fr' && targetLang === 'wo') {
    const sortedPhrases = [...PHRASE_DICTIONARY].sort((a, b) => b.fr.length - a.fr.length);
    for (const item of sortedPhrases) {
      const regex = new RegExp(`\\b${escapeRegExp(item.fr)}\\b`, 'gi');
      if (regex.test(result)) {
        result = result.replace(regex, item.wo);
        matchesCount++;
      }
    }

    const words = result.split(/(\s+|[,.?!;:])/);
    const translatedWords = words.map(w => {
      const lower = w.toLowerCase().trim();
      if (WORD_MAP_FR_TO_WO[lower]) {
        matchesCount++;
        return isCapitalized(w) ? capitalize(WORD_MAP_FR_TO_WO[lower]) : WORD_MAP_FR_TO_WO[lower];
      }
      return w;
    });
    result = translatedWords.join('');

    // Si phrase interrogative en français, adoucir en Wolof avec "Ndax" ou "dé"
    if (cleanText.endsWith('?') && !result.toLowerCase().startsWith('ndax') && !result.toLowerCase().startsWith('kañ')) {
      result = `Ndax ${result}`;
    }

  } else if (sourceLang === 'wo' && targetLang === 'fr') {
    const sortedPhrases = [...PHRASE_DICTIONARY].sort((a, b) => b.wo.length - a.wo.length);
    for (const item of sortedPhrases) {
      const regex = new RegExp(`\\b${escapeRegExp(item.wo)}\\b`, 'gi');
      if (regex.test(result)) {
        result = result.replace(regex, item.fr);
        matchesCount++;
      }
    }

    const words = result.split(/(\s+|[,.?!;:])/);
    const translatedWords = words.map(w => {
      const lower = w.toLowerCase().trim();
      if (WORD_MAP_WO_TO_FR[lower]) {
        matchesCount++;
        return isCapitalized(w) ? capitalize(WORD_MAP_WO_TO_FR[lower]) : WORD_MAP_WO_TO_FR[lower];
      }
      return w;
    });
    result = translatedWords.join('');
  }

  const confidence = matchesCount > 0 ? Math.min(0.75 + matchesCount * 0.05, 0.99) : 0.65;
  const phoneticSpeech = targetLang === 'wo' ? toWolofPhoneticSpeech(result) : result;

  return {
    originalText: cleanText,
    translatedText: result,
    phoneticSpeech,
    sourceLang,
    targetLang,
    detectedLang: sourceLang,
    matchesCount,
    confidence: Number(confidence.toFixed(2)),
    engine: 'sutura-human-wolof-v2'
  };
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isCapitalized(str) {
  return str && str[0] === str[0].toUpperCase() && str[0] !== str[0].toLowerCase();
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
