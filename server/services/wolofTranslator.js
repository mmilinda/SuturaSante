/**
 * Moteur de Traduction Bilingue Français <-> Wolof (SuturaSanté)
 * Adapté aux contextes médicaux, communautaires et de santé reproductive au Sénégal.
 * Supporte le mode hors-ligne / embarqué et l'interfaçage avec des APIs externes (NLLB Meta / HuggingFace / Google).
 */

// Dictionnaire de phrases et expressions médicales et de politesse
const PHRASE_DICTIONARY = [
  // Formules de politesse & accueil
  { fr: "bonjour", wo: "salamalékoum" },
  { fr: "bonjour comment allez-vous", wo: "nanga def, jàmm nga am" },
  { fr: "comment allez-vous", wo: "nanga def" },
  { fr: "je vais bien", wo: "mangi fi rekk" },
  { fr: "merci beaucoup", wo: "jërajëf lool" },
  { fr: "merci", wo: "jërajëf" },
  { fr: "s'il vous plaît", wo: "su la neexee" },
  { fr: "de rien", wo: "ñoo ko bokk" },
  { fr: "au revoir", wo: "ba beneen yoon" },
  { fr: "bienvenue", wo: "dalal jàmm" },
  { fr: "à bientôt", wo: "ba ci kanam" },
  { fr: "oui", wo: "waaw" },
  { fr: "non", wo: "déedéet" },

  // Santé maternelle & CPN
  { fr: "consultation prénatale", wo: "saytu CPN" },
  { fr: "visite prénatale", wo: "saytu CPN" },
  { fr: "femme enceinte", wo: "jigéen bu ëmb" },
  { fr: "enceinte", wo: "ëmb" },
  { fr: "grossesse", wo: "birr" },
  { fr: "accouchement", wo: "wàsin" },
  { fr: "accoucher", wo: "wàsin" },
  { fr: "bébé", wo: "liir" },
  { fr: "nourrisson", wo: "liir bu bees" },
  { fr: "sage-femme", wo: "sage-femme" },
  { fr: "médecin", wo: "docteur" },
  { fr: "poste de santé", wo: "poste de santé" },
  { fr: "centre de santé", wo: "kër docteur" },
  { fr: "maternité", wo: "fajuwaay" },
  { fr: "hôpital", wo: "lopitan" },
  { fr: "carnet de santé", wo: "kaye fajuwaay" },
  { fr: "échographie", wo: "écho masin" },

  // Signes d'alerte et urgences
  { fr: "signes de danger", wo: "mandargay musiba" },
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
  { fr: "le bébé ne bouge plus", wo: "liir bi yëngatul" },
  { fr: "le bébé bouge moins", wo: "liir bi yëngatul bu baax" },
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

  // Nutrition & Soins
  { fr: "aliments riches en fer", wo: "ñam yu am fer" },
  { fr: "comprimés de fer", wo: "garap u fer" },
  { fr: "acide folique", wo: "acide folique" },
  { fr: "moringa", wo: "nebeday" },
  { fr: "feuilles de moringa", wo: "xob-u nebeday" },
  { fr: "jus de bouye", wo: "njaan-u bouye" },
  { fr: "pain de singe", wo: "bouye" },
  { fr: "eau potable", wo: "ndox mu sell" },
  { fr: "boire de l'eau", wo: "naan ndox" },
  { fr: "manger sainement", wo: "lekk ñam yu baax" },
  { fr: "se reposer", wo: "noppalu" },
  { fr: "repos", wo: "noppay" },
  { fr: "nausées", wo: "yaram buy tey" },
  { fr: "vomissements", wo: "wàcc" },

  // Allaitement & Post-partum
  { fr: "allaitement maternel exclusif", wo: "nampal liir bi meew rekk" },
  { fr: "allaitement maternel", wo: "nampal liir bi" },
  { fr: "donner le sein", wo: "nampal" },
  { fr: "le lait maternel", wo: "meewu ndey ji" },
  { fr: "colostrum", wo: "meew mu njëkk mi (colostrum)" },
  { fr: "après l'accouchement", wo: "ginaaw wàsin bi" },

  // Planification familiale & droits
  { fr: "planification familiale", wo: "wàññi am doom" },
  { fr: "espacement des naissances", wo: "mayante ci birr yi" },
  { fr: "contraception", wo: "fajuwaay ngir téye birr" },
  { fr: "règles", wo: "regle" },
  { fr: "menstruations", wo: "regle" },
  { fr: "confidentialité", wo: "sutura" },
  { fr: "discrétion", wo: "sutura" },
  { fr: "respect", wo: "yeermaande" }
];

// Lexique mot à mot de secours
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

// Inverse pour traduction Wolof -> Français
const WORD_MAP_WO_TO_FR = {};
Object.entries(WORD_MAP_FR_TO_WO).forEach(([fr, wo]) => {
  WORD_MAP_WO_TO_FR[wo.toLowerCase()] = fr;
});

/**
 * Traduit un texte donné entre Français et Wolof
 * @param {string} text - Le texte à traduire
 * @param {string} sourceLang - 'fr' ou 'wo'
 * @param {string} targetLang - 'wo' ou 'fr'
 * @returns {Promise<object>} Résultat avec traduction et métadonnées
 */
export async function translateText({ text, sourceLang = 'fr', targetLang = 'wo' }) {
  if (!text || typeof text !== 'string' || !text.trim()) {
    return {
      originalText: text,
      translatedText: '',
      sourceLang,
      targetLang,
      confidence: 1.0,
      engine: 'empty'
    };
  }

  const cleanText = text.trim();

  // 1. Si une API externe de traduction est configurée (ex: HuggingFace NLLB / Gemini / Google)
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
            sourceLang,
            targetLang,
            confidence: 0.95,
            engine: 'external-nllb'
          };
        }
      }
    } catch (err) {
      console.warn("Erreur API de traduction externe, repli sur le moteur local Sutura:", err.message);
    }
  }

  // 2. Moteur Local de Traduction Contextuelle SuturaSanté
  let result = cleanText;
  let matchesCount = 0;

  if (sourceLang === 'fr' && targetLang === 'wo') {
    // Remplacement par expressions multi-mots en premier (du plus long au plus court)
    const sortedPhrases = [...PHRASE_DICTIONARY].sort((a, b) => b.fr.length - a.fr.length);
    for (const item of sortedPhrases) {
      const regex = new RegExp(`\\b${escapeRegExp(item.fr)}\\b`, 'gi');
      if (regex.test(result)) {
        result = result.replace(regex, item.wo);
        matchesCount++;
      }
    }

    // Remplacement mot à mot pour les termes restants
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

  } else if (sourceLang === 'wo' && targetLang === 'fr') {
    // Wolof -> Français
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

  const confidence = matchesCount > 0 ? Math.min(0.70 + matchesCount * 0.05, 0.98) : 0.60;

  return {
    originalText: cleanText,
    translatedText: result,
    sourceLang,
    targetLang,
    detectedLang: sourceLang,
    matchesCount,
    confidence: Number(confidence.toFixed(2)),
    engine: 'sutura-linguistic-v1'
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
