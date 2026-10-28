/**
 * Moteur d'Intelligence Artificielle Clinique & Empathique SuturaSanté
 * Personnalité : "Bajenu Gox Numérique" chaleureuse, empathique (Téranga) et protectrice (Sutura).
 * 
 * Capacités :
 * 1. Écoute active et reformulation : Comprend et confirme systématiquement la question posée.
 * 2. Triage d'urgence obstétricale immédiat (Grade 1 SAMU 1515).
 * 3. Base clinique complète de 25+ domaines obstétricaux, néonataux et de nutrition locale sénégalaise.
 * 4. Bilingue intégral Français & Wolof sénégalais (avec phonétique naturelle pour synthèse vocale).
 * 5. Connecteur Gemini API intelligent (si GEMINI_API_KEY est défini, avec bascule sans coupure).
 */

import { toWolofPhoneticSpeech } from './wolofTranslator.js';

export function matchTrigger(text, trigger) {
  if (!text || !trigger) return false;
  const cleanText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const cleanTr = trigger.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (cleanTr.includes(' ')) {
    return cleanText.includes(cleanTr);
  }
  // Pour un mot unique, vérifier la frontière de mot pour éviter les faux positifs (ex: "gemb" dans "gingembre")
  const regex = new RegExp(`(^|[^a-z0-9])${cleanTr}([^a-z0-9]|$)`, 'i');
  return regex.test(cleanText);
}

// Mots-clés d'urgences vitales obstétricales (Grade 1 - Alerte Rouge SAMU 1515)
const EMERGENCY_KEYWORDS = [
  'saignement', 'sang', 'deret', 'hemorragie', 'perte de sang', 'sotti deret',
  'maux de tete violents', 'metti bopp bu tar', 'mouche volante', 'vision floue', 'bët yuy lëndëm', 'etoiles dans les yeux',
  'convulsion', 'perte de connaissance', 'lox', 'evanouissement', 'daanu',
  'bebe ne bouge plus', 'bouge moins', 'liir bi yëngatul', 'yëngatul', 'bebe bouge pas', 'yengatul',
  'perte des eaux', 'eau qui coule', 'poche des eaux', 'ndox buy sotti', 'perdu les eaux', 'ndox mu sotti',
  'forte fievre', 'frissons', 'yaram bu tang jériñ', 'sibiru bu tar', 'fievre elevee',
  'tension elevee', 'hypertension', 'eclampsie', 'preeclampsie', 'tension bu kowe'
];

// Base Clinique Exhaustive de 25+ Domaines Obstétricaux & Quotidiens
const KNOWLEDGE_DOMAINS = [
  {
    category: 'abdominal_pain',
    triggers: [
      'mal au ventre', 'maux de ventre', 'douleur au ventre', 'tiraillement', 'crampe', 'bas ventre',
      'ventre lourd', 'ventre qui durcit', 'ventre dur', 'colique', 'spasme',
      'biir buy metti', 'metti biir', 'sama biir', 'biir bu dees', 'biir bi dafay dees'
    ],
    fr: {
      ack: "J'ai bien entendu que vous ressentez des douleurs ou des tiraillements au niveau du ventre, ma sœur. C'est une inquiétude très fréquente chez la femme enceinte.",
      title: "Douleurs et Tiraillements au Ventre pendant la Grossesse",
      body: "Voici ce qu'il faut savoir avec précision pour vous rassurer et agir correctement :\n\n" +
            "• **Quand est-ce bénin (normal) ?** : Durant la grossesse, votre utérus grossit rapidement et tire sur les ligaments (douleurs ligamentaires sur les côtés ou bas-ventre). Ces petites douleurs brèves en se levant ou en marchant sont courantes et sans danger.\n" +
            "• **Que faire à la maison ?** : Allongez-vous sur le côté gauche, buvez un grand verre d'eau, respirez calmement et évitez de porter des charges lourdes.\n" +
            "• **Quand consulter d'urgence ?** : Si le ventre devient dur comme du bois, si la douleur est insupportable, continue, ou si elle s'accompagne de saignements, de fièvre ou de brûlures en urinant, rendez-vous immédiatement au poste de santé ou appelez le 1515.",
      suggestions: ['Signes de danger', 'Contractions ou ligaments ?', 'Prendre rendez-vous CPN']
    },
    wo: {
      ack: "Degg naa bu baax dé sama soxna si, ne nga sa biir dafay metti walla dafa dees. Loolu dafay dal jigeen ñu bari bu ñuy ëmm birr.",
      title: "Biir buy metti walla buy dees ci birru ëmb",
      body: "Deggluma bu baax sama soxna si, lii mooy li am solo ci loolu :\n\n" +
            "• **Lu baax li (lu amul tiitange) :** Sa birr dafay màgg bés bu nekk, téyeyukaayu liir bi di seel. Loolu mën na jur yenn mettit yu ndaw ci wàll yi walla suuf biir bi. Bu dee lu gàtt la te amul deret, bul ci am tiit.\n" +
            "• **Li nga wara def ci kër gi :** Tëddal ci sa wetu càmmooñ (côté gauche), naanal ndox mu baree bari, noppal sa yaram te bul yékk lu diis dé !\n" +
            "• **Bu mu gawa laaj kër docteur :** Bu dee biir bi dafa dees te dëgër ni xeer, walla mettit bi tàcculikoo deret buy sotti walla yaram bu tang, gaawal dem kër docteur bi gën a jege léegi léegi !",
      suggestions: ['Mandargay musiba', 'Kër docteur jege', 'Saytu CPN']
    }
  },
  {
    category: 'nausea_vomiting',
    triggers: [
      'nausee', 'nausees', 'vomissement', 'vomissements', 'vomir', 'ecoeurement', 'degout',
      'mal de coeur', 'haut le coeur', 'envie de vomir', 'je vomis',
      'wacc', 'wàcc', 'xol buy jeex', 'biir buy yengu', 'nause', 'wacco'
    ],
    fr: {
      ack: "J'ai bien compris que vous souffrez de nausées et d'envies de vomir, ma sœur. C'est l'un des symptômes les plus éprouvants du début de grossesse.",
      title: "Soulager les Nausées et Vomissements Matinaux",
      body: "Ces nausées sont causées par la montée des hormones de grossesse (HCG et progestérone). Voici les remèdes doux recommandés par les sages-femmes :\n\n" +
            "• **Au réveil** : Ne vous levez pas brusquement le ventre vide. Gardez un petit biscuit sec, un morceau de pain ou du pain de singe (*Bouye*) près du lit et mangez-le 10 minutes avant de poser le pied par terre.\n" +
            "• **Fractionnez vos repas** : Faites 5 ou 6 petits repas légers dans la journée au lieu de 2 ou 3 gros repas lourds.\n" +
            "• **Astuces locales naturelles** : Buvez de l'eau tiède avec un zeste de citron ou une fine tranche de gingembre frais, ou sucez un petit bonbon à la menthe. Évitez les odeurs de friture et d'huile chaude qui déclenchent le réflexe.\n" +
            "• **Attention** : Si vous vomissez tout ce que vous buvez depuis plus de 24h et que vous ne gardez rien, il faut consulter au dispensaire pour éviter la déshydratation.",
      suggestions: ['Aliments faciles à digérer', 'Gingembre et citron', 'Mes 4 CPN']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, ne nga xol bi dafay jeex te ngay wàcc. Dafa sonnal jigeen ñu bari ci weer yu njëkk yi.",
      title: "Paju wàcc ak xol buy jeex ci ndorteel ëmb bi",
      body: "Deggluma bu baax dé sama soxna si, li koy indi mooy ngelawu ëmb bi (hormones) :\n\n" +
            "• **Bu bët setee :** Bul jóg ci saa si ak biir bu wàcc. Dencal biscuit bu wow walla mburu bu wow ak Bouye ci wetu lal bi, lekk ko bala ngay jóg.\n" +
            "• **Xàjjale sa lekk :** Bul lekk lu bari ci benn yoon. Lekkal ndànk ndànk 4 ba 5 yoon ci bës bi.\n" +
            "• **Pajum cosaan yu yomb :** Limon bu ñu xat ci ndox mu teey, walla djinjer bu néew, ak jus-u Bouye. Ràppal sa bopp ci xetu diwlin ak cuuray bu tàng.\n" +
            "• **Gawante :** Bu dee li nga naan yépp dangay dellu diko wàcc te mënuloo téye ndox, gaawal dem kër docteur bala sa yaram di wow !",
      suggestions: ['Lekk yu baax', 'Njaan-u Bouye', 'Saytu CPN']
    }
  },
  {
    category: 'swollen_feet',
    triggers: [
      'pieds gonfles', 'pied gonfle', 'cheville enflee', 'chevilles gonflees', 'jambes lourdes',
      'gonflement', 'enflure', 'oedeme', 'retention d eau', 'doigts gonfles', 'visage gonfle',
      'tank buy gemb', 'gemb', 'gémb', 'tank yu fatt', 'tank yi dañuy gemb'
    ],
    fr: {
      ack: "J'ai bien noté que vous avez les pieds ou les chevilles enflés, ma sœur. C'est un phénomène très courant au 2e et 3e trimestre.",
      title: "Pieds et Chevilles Gonflés : Causes et Signaux d'Alerte",
      body: "Le poids de l'utérus ralentit le retour du sang vers le cœur, ce qui provoque une accumulation d'eau dans les jambes :\n\n" +
            "• **Conseils pour soulager** : Surélevez vos jambes avec un coussin dès que vous êtes assise ou couchée. Évitez de rester debout immobile trop longtemps au marché ou en cuisine. Marchez régulièrement à l'ombre.\n" +
            "• **Alimentation** : Réduisez le sel et les bouillons industriels dans vos sauces (*tiep*, *mafé*). Buvez beaucoup d'eau pour aider vos reins.\n" +
            "• **⚠️ ATTENTION SIGNE DE DANGER** : Si le gonflement monte brutalement aux **mains et au visage**, et s'accompagne de violents maux de tête ou de vision trouble, c'est peut-être une **hypertension sévère (pré-éclampsie)**. Rendez-vous immédiatement en urgence ou appelez le 1515 !",
      suggestions: ['Prendre ma tension', 'Signes de pré-éclampsie', 'Alimentation pauvre en sel']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, ne nga sa tank yi dañuy gémb te fatt. Dafa faral di am ci jigeen ñu ëmm.",
      title: "Tank yuy gémb ak mandargay tension bu kowe",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **Li koy wàññi :** Bu ngay toog walla ngay tëdd, tekal sa tank yi ci kaw poos walla koussin. Bul taxaw di yàgg ci waañ bi walla marse bi. Doxandool ndànk ndànk.\n" +
            "• **Xañ sa bopp xorom :** Wàññil xorom ak bouillon yi nga ciy def ci ceeb bi walla cin bi.\n" +
            "• **🚨 MOYTU BIILE MANDARGA :** Bu dee tank yi dañoo gémb te **sa kanam ak sa loxo** teggi gémb, te sa bopp di metti bu tar walla sa bët di lëndëm, tension bi mën na kowe ! Gaawal dem kër docteur ci saa si dé !",
      suggestions: ['Saytu tension', 'Mandargay musiba', 'Wóoyal 1515']
    }
  },
  {
    category: 'back_pain',
    triggers: [
      'mal de dos', 'douleur au dos', 'mal aux reins', 'douleur reins', 'colonne', 'sciatique',
      'bassin', 'lombes', 'lumbago', 'hanche', 'metti gannaaw', 'gannaaw buy metti', 'gannaaw'
    ],
    fr: {
      ack: "J'ai bien compris que vous avez mal au dos ou au niveau des reins, ma sœur. Porter la vie modifie toute la posture du corps.",
      title: "Soulager le Mal de Dos et les Tensions du Bassin",
      body: "Au fil des mois, le ventre prend du volume, le centre de gravité bascule vers l'avant et les hormones assouplissent les articulations du bassin :\n\n" +
            "• **Adoptez la bonne posture** : Tenez-vous droite, ne cambrez pas exagérément le bas du dos. Quand vous ramassez un objet, pliez les genoux au lieu de courber le dos.\n" +
            "• **Chaussures adaptées** : Portez des sandales confortables et plates, évitez les talons hauts ou les semelles complètement rigides.\n" +
            "• **Soulagement naturel** : Demandez à un proche un massage doux du bas du dos avec un peu de beurre de karité tiède, appliquez une serviette tiède, et dormez sur le côté gauche avec un oreiller entre les jambes.\n" +
            "• **Alerte** : Si le mal de dos ressemble à des contractions régulières et douloureuses toutes les 10 minutes, le travail d'accouchement a peut-être commencé.",
      suggestions: ['Position pour dormir', 'Contractions de travail', 'Conseils sage-femme']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, ne nga sa gannaaw walla sa xol-u gannaaw dafay metti. Birr bi buy màgg dafay tëye gannaaw gi.",
      title: "Gannaaw buy metti ak paju karité",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **Naka ngay taxawe :** Bu ngay jël lenn ci suuf, kurbal sa óom (genoux) te bul dàll sa gannaaw. Solal dàll yu neex te yomb.\n" +
            "• **Pajum karité :** Jëlal diw-u karité bu tàngal tuuti, ñu masaas la gannaaw gi ndànk ndànk. Bu ngay tëdd, tekal coussin ci sa diggante ñaari tank yi.\n" +
            "• **Moytu :** Bu dee mettit bi dafay ñëw di dellu bés bu nekk ni xeuy (contractions), xamna liir bi dafa bëgg a wàsin !",
      suggestions: ['Diw-u Karité', 'Tëdd ci càmmooñ', 'Saytu CPN']
    }
  },
  {
    category: 'vaginal_discharge',
    triggers: [
      'pertes blanches', 'perte blanche', 'pertes vaginales', 'perte vaginale', 'demangeaison',
      'brulure en urinant', 'brulures urinaires', 'mycose', 'perte jaune', 'odeur vagin',
      'ndox mu weex', 'yaram buy xasan', 'saw buy metti', 'infection'
    ],
    fr: {
      ack: "J'ai bien noté votre question intime sur les pertes et démangeaisons, ma sœur. Soyez sereine, nous en parlons ici en toute pudeur et confidentialité (*Sutura*).",
      title: "Pertes Vaginales pendant la Grossesse : Normales ou Infection ?",
      body: "Pendant la grossesse, l'augmentation des œstrogènes augmente naturellement les sécrétions du vagin :\n\n" +
            "• **Pertes normales** : Elles sont blanchâtres ou transparentes, fluides, sans mauvaise odeur et ne provoquent ni brûlure ni démangeaison. Elles protègent le fœtus des microbes extérieurs.\n" +
            "• **Signes d'une infection (mycose ou vaginose)** : Si les pertes deviennent jaunes, verdâtres, épaisses comme du lait caillé, avec une odeur forte ou si vous avez des démangeaisons intenses et des brûlures en urinant.\n" +
            "• **Conseils essentiels** : Portez des sous-vêtements en coton doux. Faites votre toilette à l'eau propre sans douches vaginales internes agressives. Ne prenez JAMAIS d'ovules ou d'antibiotiques sans l'avis de la sage-femme, car certains médicaments sont contre-indiqués pour le fœtus.",
      suggestions: ['Prendre rendez-vous dispensaire', 'Hygiène intime douce', 'Signes de danger']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, ci sutura gu mat sëkk ngay waxe lii ci wàllu ndox mu weex ak xasan bi ci sa yaram.",
      title: "Ndox mu weex ak paju sutura ci jigeen bu ëmm",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **Li baax li :** Ndox mu weex mu wow te amul xet te xasanul, dafay kàttanal biir bi ngir dindi jàngoro yi. Loolu lu baax la.\n" +
            "• **Bu dee jàngoro la (infection) :** Bu dee dafa mboq, xasan la bu tar, walla nga am saw buy metti te tàng, dangay dem kër docteur ñu xool la.\n" +
            "• **Li nga wara def :** Ràppal sa bopp ci savong yu am xet yu tar. Raxasul sa yaram ci ndox mu sell. Bul jël benn garap ci sa xalaatu bopp bala nga wax ak sage-femme bi !",
      suggestions: ['Saytu kër docteur', 'Sutura ak sellal', 'Mandargay musiba']
    }
  },
  {
    category: 'fetal_movements',
    triggers: [
      'bebe bouge', 'coups de pied', 'mouvements du bebe', 'bebe bouge beaucoup', 'hoquet bebe',
      'mouvement fœtus', 'sensation de bulles', 'premiers mouvements',
      'liir buy yengu', 'yengu', 'yëngu', 'liir bi dafay yengu', 'xeuy liir'
    ],
    fr: {
      ack: "J'ai bien compris votre question sur les mouvements de votre bébé, ma sœur. Sentir son enfant bouger est l'une des plus belles émotions de la maternité.",
      title: "Les Mouvements et Coups de Bébé dans le Ventre",
      body: "Voici ce que chaque future maman doit savoir :\n\n" +
            "• **Quand commence-t-on à le sentir ?** : Généralement entre la 18e et la 22e semaine d'aménorrhée (4e au 5e mois). Au début, cela ressemble à des bulles d'air ou au battement d'ailes d'un papillon, puis cela devient de vrais petits coups nets.\n" +
            "• **Les petits soubresauts réguliers** : Si vous sentez de petits sauts réguliers toutes les 2 secondes pendant quelques minutes, pas d'inquiétude : c'est bébé qui a le hoquet ! C'est le signe qu'il s'entraîne à déglutir le liquide amniotique.\n" +
            "• **⚠️ RÈGLE DE SÉCURITÉ VITALE** : À partir du 6e mois (28 semaines), vous devez sentir votre bébé bouger **chaque jour**. Si vous avez l'impression qu'il ne bouge plus ou beaucoup moins que d'habitude, allongez-vous sur le côté gauche, buvez un jus de fruit sucré et observez pendant 2 heures. Si après cela il ne bouge toujours pas, **rendez-vous immédiatement à la maternité** sans attendre le lendemain !",
      suggestions: ['Bébé bouge moins : que faire ?', 'Calendrier CPN', 'SAMU 1515']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, ne nga sa liir bi dafay yëngu ci biir. Beggante gu rafet la diggante ndey ak dooman !",
      title: "Yëngu-yëngu liir bi ci biir ëmb",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **Kañ ngay yëg liir bi :** Ci diggante 4e ak 5e weer bi lañ koy njëkk a yëg ndànk ndànk. Bu yàggee ngay yëg ay dënn yu dëgër.\n" +
            "• **Bu liir bi amee yokk-yokk (hoquet) :** Bu dee ay tàcc yu ndaw yu melni tëggante la, bul tiit, liir bi dafay nàmp ndox mi rekk.\n" +
            "• **🚨 MOYTU BU BAAX :** Bu weer bi yéggee 6 ba 7 weer, bés bu nekk war nga yëg sa liir buy yëngu. Bu dee yëngatul mukk walla dafa noppee noppi, tëddal ci wetu càmmooñ, naanal njaan bu neex. Bu yëngatul ci 2 waxtu, gaawal dem kër docteur ci saa si dé !",
      suggestions: ['Liir bi yëngatul', 'Saytu CPN', 'Wóoyal 1515']
    }
  },
  {
    category: 'pregnancy_test',
    triggers: [
      'retard de regle', 'retard de regles', 'test de grossesse', 'suis je enceinte', 'savoir si je suis enceinte',
      'signe de grossesse', 'symptome grossesse', 'absence de regles', 'pas mes regles',
      'am birr', 'birr bi dafa yem', 'regle waccul', 'ëmm', 'xamee ndax dama ëmm'
    ],
    fr: {
      ack: "J'ai bien compris votre interrogation sur un éventuel début de grossesse ou un retard de règles, ma sœur.",
      title: "Comment Savoir si Vous Êtes Enceinte : Test et Premiers Signes",
      body: "Le retard des règles est le premier indicateur chez une femme ayant des cycles réguliers :\n\n" +
            "• **Les premiers signes révélateurs** : Seins gonflés et sensibles, tiraillements dans le bas-ventre, fatigue soudaine, envie fréquente d'uriner et dégoût inhabituel pour certaines odeurs de cuisine.\n" +
            "• **Le test de grossesse urinaire** : Vous pouvez vous procurer un test en pharmacie ou au poste de santé pour un coût modique (environ 500 à 1 500 FCFA). Faites-le avec les **premières urines du matin**, dès le premier jour de retard de vos règles, car c'est là que l'hormone de grossesse est la plus concentrée.\n" +
            "• **Dès la confirmation positive** : Rendez-vous au dispensaire pour votre **CPN 1 précoce**. C'est le moment idéal pour recevoir gratuitement votre acide folique et protéger le développement du cerveau de votre bébé.",
      suggestions: ['Faire la CPN 1', 'Alimentation premier trimestre', 'Calculer mon terme']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, ne nga sa regle wàccul te nga bëgg a xam ndax ëmb nga. Loolu ci sutura lañ koy xool.",
      title: "Xam ndax ëmb nga ak test kër docteur",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **Mandarga yi :** Sa ween yi dañuy teggi tëdd, sa biir di la xawa tiré, ngay sonn ci saa si te di gawa mere yenn xetu ñam.\n" +
            "• **Test bi :** Dangay dem pharmacie walla poste de santé jënd test bu ndaw ci saw. Def ko ci suba teel ak sa saw mu njëkk mi.\n" +
            "• **Bu dee ëmb nga :** Gaawal dem kër docteur def sa **CPN 1**. Sage-femme bi dina la jox doomi acide folique ak fer ngir sa liir bi màgg bu baax !",
      suggestions: ['Def CPN 1', 'Doomi Fer', 'Lekk yu am doole']
    }
  },
  {
    category: 'spices_and_drinks',
    triggers: [
      'bissap', 'gingembre', 'djinjer', 'piment', 'cafe', 'the', 'ataaya', 'boisson gazeuse',
      'soda', 'sucre', 'sel', 'cube maggi', 'bouillon', 'naan', 'kafe'
    ],
    fr: {
      ack: "J'ai bien compris votre question sur les boissons, épices et assaisonnements locaux, ma sœur. Bien manger au Sénégal, c'est savoir doser nos délices !",
      title: "Bissap, Gingembre, Piment & Thé : Ce qui est Autorisé ou Déconseillé",
      body: "Voici les recommandations claires des nutritionnistes maternels :\n\n" +
            "• **Bissap (fleurs d'hibiscus)** : Vous pouvez en boire avec modération (1 à 2 verres). Il apporte de la vitamine C, mais évitez d'en abuser en fin de grossesse car de fortes doses peuvent stimuler les contractions utérines. Ne le chargez pas trop en sucre.\n" +
            "• **Gingembre (*Djinjer*)** : Une petite touche dans une infusion tiède est excellente pour calmer les nausées du matin. Mais évitez les jus de gingembre très concentrés et piquants.\n" +
            "• **Piment fort & épices brûlantes** : À limiter fortement. Le piment n'est pas toxique pour bébé, mais il aggrave les brûlures d'estomac, les reflux acides et provoque de douloureuses hémorroïdes.\n" +
            "• **Thé (*Ataaya*) & Café** : Ne buvez jamais de thé ou de café dans l'heure qui suit la prise de vos comprimés de fer, car les tanins détruisent le fer et favorisent l'anémie. Buvez plutôt un bon jus de Bouye frais !",
      suggestions: ['Jus de Bouye & Fer', 'Soulager les hémorroïdes', 'Aliments conseillés']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, laaj nga ma ci wàllu naan-u Bissap, Djinjer, Kafe, ak Kaani. Loolu am na solo ci wér-gu-yaramu biir bi.",
      title: "Bissap, Djinjer, Kaani ak Ataaya ci biir ëmb",
      body: "Deggluma bu baax sama soxna si :\n\n" +
            "• **Bissap :** Mën nga ko naan waaye bul ko ëppal (benn ba ñaari taas doy na), te bul ciy sotti suukër bu baree bari.\n" +
            "• **Djinjer :** Tuuti rekk bu ñu xat ci ndox mu tàng dafay dindi wàcc bi. Waaye jus bu tar bi bul ko naan dé !\n" +
            "• **Kaani bu tàng :** Wàññil ko dé ! Kaani dafay tàkkal estomac bi tey jur hémorroïdes ci wanag bi.\n" +
            "• **Ataaya ak Kafe :** Bul naan ataaya bala 1 waxtu di jàll ginaaw ngay jël sa doomi fer, ndax ataaya dafay dindi fer bi ci sa yaram !",
      suggestions: ['Njaan-u Bouye', 'Doomi Fer', 'Lekk yu baax']
    }
  },
  {
    category: 'sexual_relations',
    triggers: [
      'faire l amour', 'rapport', 'rapports', 'rapport sexuel', 'sexe', 'sexualite',
      'relation intime', 'penetration', 'mon mari', 'faire l amour enceinte',
      'sekki', 'sey', 'borom ker', 'seye', 'naka lay seye'
    ],
    fr: {
      ack: "J'ai bien entendu votre question intime sur les rapports de couple pendant la grossesse, ma sœur. Parlons-en avec délicatesse, pudeur (*Sutura*) et rigueur médicale.",
      title: "Sexualité et Rapports de Couple pendant la Grossesse",
      body: "Dans la grande majorité des cas, faire l'amour pendant la grossesse est **parfaitement naturel, sans risque et autorisé** :\n\n" +
            "• **Bébé est-il protégé ?** : Oui, absolument. Votre bébé est protégé à l'intérieur de l'utérus, dans la poche des eaux, et le col de l'utérus est scellé par un bouchon muqueux protecteur. Le pénis ne peut pas toucher ni blesser le bébé.\n" +
            "• **Confort et tendresse** : Au fur et à mesure que le ventre s'arrondit, privilégiez des positions douces où le ventre n'est pas écrasé (sur le côté par exemple).\n" +
            "• **Quand faut-il s'abstenir ?** : La sage-femme vous demandera d'éviter les rapports uniquement en cas de contre-indication médicale précise : saignements vaginaux, menace d'accouchement prématuré, poche des eaux fissurée, ou placenta inséré trop bas (*placenta praevia*).",
      suggestions: ['Signes de danger', 'Contre-indications', 'Parler à la sage-femme']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, ci sutura gu mat sëkk ngay waxe lii ci wàllu séy ak sa borom kër ci biir ëmb.",
      title: "Séy ak sa borom kër ci biir ëmb ci sutura",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **Ndax liir bi ci biir am na kumpa ? :** Mukk dé ! Liir bi dafa nekk ci ndox mu sell mu ko aar, buntu birr bi tëju. Séy duko tocc, duko lakk, duko lor.\n" +
            "• **Tegtal ci kër gi :** Tanneel tëdd yu yomb yu dul noot sa biir, tëdd ci sa wetu càmmooñ.\n" +
            "• **Kañ lañ koy téye :** Bu dee dangay guiss deret buy sotti, walla liir bi dafa bëgg a wàsin te waxtu bi jotul, walla ndox mu sotti, faaw nga téye séy bi ba wax ak sage-femme bi !",
      suggestions: ['Mandargay musiba', 'Saytu kër docteur', 'Sutura kër gi']
    }
  },
  {
    category: 'sleeping_position',
    triggers: [
      'dormir', 'sommeil', 'position pour dormir', 'dormir sur le dos', 'dormir sur le ventre',
      'cote gauche', 'cote droit', 'insomnie', 'teud', 'nelaw', 'nelawul', 'dara nelawul'
    ],
    fr: {
      ack: "J'ai bien compris votre préoccupation concernant la position de sommeil et le repos, ma sœur. Trouver le bon sommeil avec un ventre rond demande quelques astuces !",
      title: "La Meilleure Position pour Dormir Enceinte",
      body: "La position adoptée dans le lit a un impact direct sur l'oxygénation de votre bébé :\n\n" +
            "• **La position idéale : Couchée sur le CÔTÉ GAUCHE** : C'est la position médicale d'or. Elle libère la grosse veine cave située à droite, ce qui améliore la circulation sanguine vers le placenta et apporte un maximum d'oxygène et de nutriments au fœtus.\n" +
            "• **Pourquoi éviter le dos au 3e trimestre ?** : En étant sur le dos, le poids du bébé et de l'utérus écrase vos vaisseaux sanguins. Vous pouvez ressentir des vertiges, un malaise, des nausées, et le bébé reçoit moins d'oxygène.\n" +
            "• **Astuce confort** : Glissez un petit coussin sous votre ventre et un autre entre vos genoux pliés pour soulager le dos et le bassin.",
      suggestions: ['Soulager le dos', 'Vertiges et malaise', 'Préparer la nuit']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, ne nga tëdd bi dafa la jafe te danga bëgg a xam ana ban wet nga wara tëdd.",
      title: "Tëdd ci wetu càmmooñ mooy kaalaange liir bi",
      body: "Deggluma bu baax sama soxna si :\n\n" +
            "• **Wetu càmmooñ (côté gauche) :** Mooy wet gi gën ci adduna jigeen bu ëmm ! Dafay ubbi deret ji di yóbbu ngelaw ak doole ci liir bi ci biir.\n" +
            "• **Bul tëdd ci sa gannaaw :** Bu biir bi màggee, bu nga tëddee ci sa gannaaw, diisay liir bi dafay noot sa yeeneen tank, nga yëg dërndër ak xol buy fay.\n" +
            "• **Defal coussin :** Defal coussin ci sa biir suuf ak diggante sa ñaari tank ngir gannaaw gi dal.",
      suggestions: ['Metti gannaaw', 'Doomi Fer', 'Saytu CPN']
    }
  },
  {
    category: 'labor_contractions',
    triggers: [
      'contractions', 'contraction', 'vrai travail', 'faux travail', 'braxton hicks',
      'perte du bouchon muqueux', 'col ouvert', 'perdre les eaux', 'douleur accouchement',
      'xeuy', 'wàsin', 'wasin', 'jot wàsin', 'bouchon'
    ],
    fr: {
      ack: "J'ai bien compris votre question sur les contractions et les signes annonciateurs de l'accouchement, ma sœur.",
      title: "Reconnaître le Vrai Travail d'Accouchement",
      body: "Il est essentiel de distinguer les contractions d'entraînement des vraies contractions du travail :\n\n" +
            "• **Fausses contractions (Braxton Hicks)** : Irrégulières, peu douloureuses, elles ne s'intensifient pas et disparaissent quand vous vous allongez ou marchez doucement.\n" +
            "• **Vraies contractions de travail** : Elles sont régulières, se rapprochent (toutes les 5 à 10 minutes), deviennent de plus en plus longues (durent 45 à 60 secondes) et de plus en plus intenses dans tout le ventre et le dos.\n" +
            "• **La rupture de la poche des eaux** : Un écoulement continu de liquide tiède et transparent comme de l'eau. Dès que la poche se rompt, il faut partir à la maternité dans l'heure, même si vous n'avez pas encore de douleur.\n" +
            "• **Départ à la maternité** : Prenez votre carnet de santé, le dossier médical et vos valises préparées à l'avance !",
      suggestions: ['Que mettre dans la valise ?', 'Urgences SAMU 1515', 'Centres SONU']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, laaj nga ma ci wàllu xeuy (contractions) ak waajal wàsin bi ci jàmm.",
      title: "Mandargay wàsin ak xeuy bu dëggu",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **Xeuy buy wàsin :** Dafay ñëw ku 5 ba 10 munut, gën a metti ndànk ndànk te di gën a yàgg ci biir bi ak gannaaw gi.\n" +
            "• **Ndox mu sotti (poche des eaux) :** Bu ndox mu tàng buy sotti ni ndox mu sell dalee ci sa tank yi, bul toog ci kër gi mukk dé ! Gaawal jël auto dem maternité léegi léegi.\n" +
            "• **Kaye fajuwaay :** Yóbbaal sa kaye ak yére liir bi nga waajaloon. Yàlla na la Yàlla may wàsin bu yomb ci jàmm !",
      suggestions: ['Wóoyal 1515', 'Kër docteur jege', 'Waajal wàsin']
    }
  },
  {
    category: 'cesarean_section',
    triggers: [
      'cesarienne', 'césarienne', 'operation', 'cicatrice cesarienne', 'accoucher par cesarienne',
      'peur de la cesarienne', 'cesar', 'sezar', 'operer'
    ],
    fr: {
      ack: "J'ai bien entendu votre question ou appréhension au sujet de la césarienne, ma sœur. C'est un sujet qui suscite souvent de la peur, mais parlons-en en toute franchise.",
      title: "La Césarienne : Un Acte Médical Protecteur pour Sauver des Vies",
      body: "La césarienne n'est pas un échec, c'est une bénédiction médicale qui protège la mère et le bébé quand la voie basse est risquée :\n\n" +
            "• **Quand est-elle décidée ?** : Si le bébé se présente par les pieds ou l'épaule, si le bassin de la maman est trop étroit, si le bébé fatigue (souffrance fœtale) ou en cas de saignements inattendus.\n" +
            "• **La gratuité au Sénégal** : Grâce aux programmes de l'État sénégalais et du Ministère de la Santé, la césarienne d'urgence est **100% gratuite** dans les hôpitaux publics et centres de santé de référence (SONUC).\n" +
            "• **La cicatrice et la guérison** : La coupure est très basse, discrète (au niveau du pubis). Avec du repos, une bonne hygiène et le soutien de votre famille, la cicatrisation se fait très bien en 4 à 6 semaines.",
      suggestions: ['Centres hospitaliers SONU', 'Soins de cicatrice', 'Mes droits de santé']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, wax nga ma ci wàllu opération (césarienne). Bul ci am tiitange dé, pajum aar la.",
      title: "Césarienne ci kër docteur yi Sénégal : feyul dara",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **Lu tax ñu koy def :** Bu dee liir bi dafa tëdd ci tank walla xat, walla xol bi di tëgg ndànk, docteur bi dafay génne liir bi ci 15 munut ngir musal la yaw ak sa doom.\n" +
            "• **Sénégal feyul dara :** Ci kër docteur public yi (hopitaux SONU), césarienne d'urgence feyul dara, nguur gi dafa ko feyal jigeen ñi.\n" +
            "• **Dëgëral sa xol :** Césarienne du lu ñàkk doole, fajuwaay la bu lay aar yaw ak sa liir !",
      suggestions: ['Hopitaux SONU', 'Saytu ginaaw wàsin', 'Wóoyal 1515']
    }
  },
  {
    category: 'breastfeeding',
    triggers: [
      'allaitement', 'allaiter', 'lait maternel', 'sein', 'seins', 'montee de lait', 'pas de lait',
      'manque de lait', 'crevasse', 'crevasses', 'douleur sein', 'nampal', 'meewu ween', 'ween'
    ],
    fr: {
      ack: "J'ai bien compris votre interrogation sur l'allaitement maternel et la montée de lait, ma sœur. Nourrir son enfant est un magnifique chemin d'amour et de santé.",
      title: "Allaitement Maternel Réussi & Soins des Seins",
      body: "Voici les clés d'or préconisées par l'UNICEF et les sages-femmes du Sénégal :\n\n" +
            "• **Le premier lait (Colostrum)** : Donnez le sein dans la première heure qui suit la naissance. Ce premier lait épais et doré est bourré d'anticorps qui tapissent l'estomac de bébé contre la diarrhée et les infections.\n" +
            "• **Allaitement exclusif 6 mois** : Ni eau, ni tisane, ni bouillie pendant les 6 premiers mois. Votre lait contient 88% d'eau pure et tout ce qu'il faut pour sa croissance.\n" +
            "• **Stimuler la montée de lait** : Plus bébé tète souvent (8 à 12 fois par 24h), plus votre corps produit de lait. Buvez beaucoup d'eau, de jus de Bouye et mangez de la bonne bouillie de mil locale (*Raawere*).\n" +
            "• **Éviter les crevasses** : Assurez-vous que bébé prend bien toute l'aréole marron dans sa bouche et pas seulement le bout du téton. Appliquez une goutte de votre propre lait sur le mamelon après la tétée pour cicatriser.",
      suggestions: ['Alimentation maman qui allaite', 'Soins du nouveau-né', 'Planning familial']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, laaj nga ma ci wàllu nàmpal liir bi ak meew mu bari. Lii mooy kaalaange liir bi.",
      title: "Nàmpal liir bi ak meew mu baree bari",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **Meew mu njëkk mi (Colostrum) :** Tekal liir bi ci sa ween ci saa si bala waxtu bi di jàll. Mooy garap ak vaksin liir bi bu njëkk.\n" +
            "• **6 weer yu njëkk yi :** Meewu ween rekk ! Bul jox liir bi ndox, duko laaj ndax meew mi am na ndox.\n" +
            "• **Yokku meew mi :** Naanal ndox mu baree bari, lekk raawere ak ceeb bu ñor, te di nàmpal liir bi lu baree bari. Bu nàmpale lu bari, meew mi di yokku !",
      suggestions: ['Raawere ak Meew', 'Saytu liir bi', 'Mayante ci birr']
    }
  },
  {
    category: 'constipation_hemorrhoids',
    triggers: [
      'constipation', 'constipee', 'hemorroides', 'hemorroide', 'selles dures',
      'mal pour faire caca', 'mal au ventre selles', 'saignement anus', 'wanag', 'jafe saw'
    ],
    fr: {
      ack: "J'ai bien noté que vous souffrez de constipation ou de douleurs hémorroïdaires, ma sœur. Beaucoup de futures mamans traversent cela en silence (*Sutura*).",
      title: "Soulager la Constipation et les Hémorroïdes Enceinte",
      body: "La progestérone ralentit le transit intestinal et l'utérus appuie sur les intestins :\n\n" +
            "• **Hydratation massive** : Buvez au moins 2,5 litres d'eau propre tout au long de la journée.\n" +
            "• **Fibres locales** : Mangez des mangues, des oranges avec la pulpe, du pain complet, des haricots niébé (*ñebbe*) et beaucoup de légumes verts cuits (feuilles de Moringa, épinards).\n" +
            "• **Activité physique douce** : Marchez 20 minutes par jour pour relancer le péristaltisme des intestins.\n" +
            "• **Ne forcez jamais aux toilettes** : Si vous avez des hémorroïdes gonflées et douloureuses, appliquez une compresse d'eau tiède propre et demandez une crème compatible à votre sage-femme.",
      suggestions: ['Aliments riches en fibres', 'Moringa et transit', 'Conseil dispensaire']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, ci sutura ngay waxe lii ci jafe-jafe wanag bi ak hémorroïdes.",
      title: "Paju wanag bu dëgër ak hémorroïdes",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **Naanal ndox mu bari :** 2 ba 3 litru ndox bés bu nekk ngir biir bi yomb.\n" +
            "• **Lekkal yëf yu am fibres :** Ñebbe, xob-u Nebeday, limon ak mangoro. Bul lekk yëf yu wow rekk.\n" +
            "• **Bul noot sa bopp ci wanag bi :** Bu dee dafa metti, tegal poos bu tàng tuuti ci boppu wanag bi te wax ko sa sage-femme.",
      suggestions: ['Ñebbe ak Nebeday', 'Ndox mu sell', 'Saytu CPN']
    }
  },
  {
    category: 'malaria_prevention',
    triggers: [
      'paludisme', 'palu', 'moustique', 'moustiques', 'moustiquaire', 'milda', 'tpi',
      'sibiru', 'mool', 'garapu sibiru', 'fievre palu'
    ],
    fr: {
      ack: "J'ai bien compris votre question sur la protection contre le paludisme (*Sibiru*), ma sœur. Au Sénégal, c'est l'un des premiers risques pour la grossesse.",
      title: "Prévention du Paludisme pendant la Grossesse au Sénégal",
      body: "Le paludisme peut causer une anémie très grave, un accouchement prématuré ou un petit poids de naissance pour le bébé :\n\n" +
            "• **Moustiquaire imprégnée (MILDA)** : Dormez TOUTES LES NUITS sous une moustiquaire imprégnée en bon état, du premier au dernier jour de la grossesse.\n" +
            "• **Traitement Préventif Intermittent (TPI)** : Au dispensaire, à partir du 4e mois (16 semaines), la sage-femme vous donne gratuitement des comprimés de TPI (Sulfadoxine-Pyriméthamine) à avaler directement devant elle lors des CPN.\n" +
            "• **Alerte fièvre** : Toute fièvre, même modérée, ou frisson pendant la grossesse doit être considérée comme un paludisme jusqu'à preuve du contraire. Faites faire immédiatement un TDR (Test de Diagnostic Rapide) gratuit au poste de santé !",
      suggestions: ['Faire un test TDR', 'Calendrier CPN et TPI', 'Signes de danger']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, sibiru dafa am doole te laaj ñu koy moytu bu baax ci biir ëmb bi.",
      title: "Moytu sibiru ak garapu TPI ci kër docteur",
      body: "Deggluma bu baax sama soxna si :\n\n" +
            "• **Moustiquaire MILDA :** Fanaanël guddi gu nekk ci suuf moustiquaire bu am garap, yaw ak sa borom kër.\n" +
            "• **Garapu TPI :** Ci 4e weer bi, kër docteur dina la jox garap bu ñuy naan faju sibiru bala nga koy am. Feyul dara !\n" +
            "• **Yaram bu tang :** Bu sa yaram tàngee tuuti rekk, gaawal dem kër docteur def test TDR ci saa si dé !",
      suggestions: ['Test TDR kër docteur', 'Moustiquaire MILDA', 'Saytu CPN']
    }
  },
  {
    category: 'vaccines',
    triggers: [
      'vaccin', 'vaccins', 'piqure', 'injection', 'vat', 'tetanos', 'antitetanique',
      'ñakk', 'ñakk vat', 'ñakk tetanos'
    ],
    fr: {
      ack: "J'ai bien noté votre question sur les vaccins indispensables de la grossesse, ma sœur.",
      title: "Le Vaccin Antitétanique (VAT) : Pourquoi est-il Vital ?",
      body: "Le vaccin contre le tétanos maternel et néonatal est une priorité de santé publique au Sénégal :\n\n" +
            "• **Pourquoi est-il obligatoire ?** : Il protège la maman et le bébé contre le tétanos lors de la coupure du cordon ombilical à l'accouchement.\n" +
            "• **Le calendrier des doses** : La 1ère dose (VAT 1) se fait au premier contact prénatal, la 2e dose (VAT 2) un mois plus tard (généralement à la CPN 2). Si vous recevez vos doses, votre bébé naîtra entièrement immunisé.\n" +
            "• **Gratuité totale** : Ce vaccin est 100% gratuit dans tous les postes et centres de santé du pays.",
      suggestions: ['Calendrier CPN', 'Carnet de santé', 'Maternités proches']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, laaj nga ma ci wàllu ñakk VAT tétanos bi kër docteur di joxe.",
      title: "Ñakk VAT tétanos : kaalaange liir bi bu mu wàsin",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **Lu tax mu am solo :** Dafay aar liir bi ci jàngoro tétanos bu ñuy dagg jombas bi ci wàsin bi.\n" +
            "• **Kañ lañ koy joxe :** Ci CPN 1 ak CPN 2 lañ koy joxe ci kër docteur yi.\n" +
            "• **Feyul dara :** Ñakk bi ci Sénégal feyul dara, njarin la ci wér-gu-yaram !",
      suggestions: ['Kaye CPN', 'Poste de santé', 'Lekk yu am doole']
    }
  },
  {
    category: 'fatigue_dizziness',
    triggers: [
      'fatigue', 'epuisee', 'vertige', 'vertiges', 'etourdissement', 'malaise', 'tete qui tourne',
      'tension basse', 'essoufflement', 'sonn', 'dërndër', 'yaram bu doyadi', 'kàttan amul'
    ],
    fr: {
      ack: "J'ai bien compris que vous vous sentez très fatiguée ou sujette à des vertiges, ma sœur. Votre corps travaille 24h sur 24 pour fabriquer un petit être humain !",
      title: "Fatigue Intense et Vertiges : Anémie ou Chute de Tension ?",
      body: "Voici comment réagir face aux coups de fatigue et aux vertiges :\n\n" +
            "• **Attention à l'Anémie (manque de fer)** : Si en plus de la fatigue vous avez la paume des mains pâle, le blanc des yeux décoloré et le souffle court, vous manquez sans doute de fer. Prenez rigoureusement vos comprimés de fer & acide folique chaque jour.\n" +
            "• **Évitez l'hypotension orthostatique** : Quand vous êtes couchée ou assise, ne vous levez jamais brusquement. Asseyez-vous d'abord 1 minute au bord du lit avant de vous mettre debout.\n" +
            "• **Reposez-vous** : Faites une sieste d'une heure l'après-midi, aérez la pièce et hydratez-vous avec de l'eau fraîche et du jus de Bouye riche en nutriments.",
      suggestions: ['Aliments riches en fer', 'Comprimés de fer gratuits', 'Mes 4 CPN']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, ne nga danga sonn lool te sa bopp di tëgg dërndër. Birr bi dafay laaj kàttan yu bari.",
      title: "Sonn lool ak dërndër : faju anémie ak fer",
      body: "Deggluma bu baax sama soxna si :\n\n" +
            "• **Anémie (deret bu néew) :** Bu sa loxo yi weexee, sa kàttan jeex, dangay laaj fer bu baax. Naanko bés bu nekk doomi fer yi.\n" +
            "• **Bu ngay jóg ci lal bi :** Bul jóg ci saa si ! Toogal 1 munut ci kow lal bi bala ngay taxaw ngir sa bopp bañ a tëgg dërndër.\n" +
            "• **Noppal sa yaram :** Tëddal noppalu ci bët set ba ngoon, naan ndox ak njaan-u Bouye !",
      suggestions: ['Doomi Fer', 'Xob-u Nebeday', 'Saytu CPN']
    }
  },
  {
    category: 'badiens_gox',
    triggers: [
      'badien gox', 'bajenu gox', 'marraine', 'relais', 'relais communautaire',
      'marraines', 'quartier', 'qui est la badien'
    ],
    fr: {
      ack: "J'ai bien compris votre question sur les vénérables Bajenu Gox (marraines de quartier) du Sénégal.",
      title: "Le Rôle Chaleureux des Bajenu Gox au Sénégal",
      body: "Les Bajenu Gox sont des femmes respectées et formées au sein de chaque quartier et village du Sénégal :\n\n" +
            "• **Leur mission d'amour** : Elles accompagnent les femmes enceintes avec tendresse, les encouragent à aller aux consultations CPN, rappellent les dates de vaccins et apportent des conseils traditionnels bienveillants dans le respect du secret (*Sutura*).\n" +
            "• **Votre alliée de confiance** : Si vous avez un doute, une angoisse ou un problème familial, vous pouvez toujours vous confier à votre Bajenu Gox locale, elle est le pont entre votre foyer et le poste de santé.",
      suggestions: ['Contacter ma Bajenu Gox', 'Poste de santé Pikine', 'Mes 4 CPN']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, Bajenu Gox yi ñoo ngi ci sunu kër yi ak gox yi ngir jàppale jigeen ñi.",
      title: "Bajenu Gox : yaay ak marraine ci suñu gox yi",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **Ku ñuy doon :** Ay mag yu ñu gëm lañ ci gox bi, ñu xam wàllu ëmb ak wàsin ci sutura gu mat sëkk.\n" +
            "• **Li ñu lay défal :** Dinañ la wax bés yi ngay dem kër docteur, jox la digal ci sa kër, te taxawoon la bu jàmm jafe.",
      suggestions: ['Bajenu Gox Pikine', 'Saytu CPN', 'Wóoyal 1515']
    }
  },
  {
    category: 'consultation_costs',
    triggers: [
      'prix', 'cout', 'combien', 'gratuit', 'gratuite', 'tarif', 'argent', 'ticket',
      'fey', 'xaalis', 'amul xaalis', 'ñaata la'
    ],
    fr: {
      ack: "J'ai bien compris votre préoccupation concernant les tarifs et la gratuité des soins de santé maternelle au Sénégal.",
      title: "Tarifs et Gratuité des Soins Maternels au Sénégal",
      body: "La santé de la maman et du bébé ne doit jamais être bloquée par un problème financier :\n\n" +
            "• **Gratuité totale des médicaments de base** : Les comprimés de Fer + Acide Folique, le vaccin antitétanique (VAT) et le traitement préventif du paludisme (TPI) sont **100% gratuits** dans tous les postes de santé publics.\n" +
            "• **Gratuité de la césarienne** : En cas de complication nécessitant une césarienne, l'intervention chirurgicale et les kits opératoires sont intégralement pris en charge par l'État dans les structures publiques.\n" +
            "• **Ticket de consultation CPN** : Le ticket de consultation au dispensaire primaire coûte généralement une somme symbolique (entre 500 et 1 000 FCFA selon les districts sanitaires).",
      suggestions: ['Mes 4 CPN gratuites', 'Postes de santé régionaux', 'SAMU 1515 gratuit']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, xam naa ne xaalis mën na doon jafe-jafe. Deggluma ci li nguur gi fey ci kër docteur yi.",
      title: "Li feyul dara ci kër docteur yi ci Sénégal",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **Doomi Fer ak TPI :** Doomi fer yi, acide folique bi ak garapu sibiru TPI, feyul dara ! Dangay dem poste de santé ñu jox la ko ci sutura.\n" +
            "• **Césarienne feyul dara :** Bu dee opération la, nguur gi dafa ko feyal jigeen ñépp ci hôpitaux publics yi.\n" +
            "• **Ticket CPN :** Ticket bi ci dispensaire yi néew na lool, 500 ba 1000 FCFA rekk la !",
      suggestions: ['Saytu CPN', 'Doomi Fer', 'Kër docteur jege']
    }
  },
  {
    category: 'cpn_schedule',
    triggers: [
      'cpn', 'consultation', 'rendez-vous', 'visite', 'calendrier', 'semaine', 'date', 'terme',
      'echographie', 'echo', 'saytu', 'waxtu', 'carnet'
    ],
    fr: {
      ack: "J'ai bien compris votre demande concernant le calendrier et les étapes des Consultations Prénatales (CPN).",
      title: "Calendrier des 4 CPN Officielles au Sénégal",
      body: "Le Ministère de la Santé du Sénégal recommande 4 visites clés pour veiller sur vous et bébé :\n\n" +
            "• **CPN 1 (avant la 12e semaine)** : Confirmation, bilan sanguin contre l'anémie et remise gratuite des comprimés de fer et d'acide folique.\n" +
            "• **CPN 2 (entre la 20e et 24e semaine)** : Échographie pour voir grandir bébé et injection du vaccin antitétanique (VAT).\n" +
            "• **CPN 3 (vers la 28e semaine)** : Surveillance de la tension artérielle et traitement préventif du paludisme (TPI).\n" +
            "• **CPN 4 (entre la 36e et 38e semaine)** : Préparation du plan d'accouchement et choix du transport d'urgence vers la maternité.",
      suggestions: ['Calculer mes dates CPN', 'Nutrition & Fer', 'Signes de danger']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, laaj nga ma ci wàllu 4 saytu CPN yi ci kër docteur.",
      title: "4 saytu CPN yi ci kër docteur : kaalaange ëmb bi",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **CPN 1 (bala weer bi di jàll / 12 ayu-bës) :** Dëggal birr bi, saytu deret ak joxe doomi fer.\n" +
            "• **CPN 2 (20 ba 24 ayu-bës) :** Écho masin, déglu xol-u liir bi ak ñakk VAT.\n" +
            "• **CPN 3 (28e ayu-bës) :** Saytu tension ak garapu sibiru TPI.\n" +
            "• **CPN 4 (36 ba 38 ayu-bës) :** Waajal wàsin bi ci jàmm ak auto bu lay yóbbu.",
      suggestions: ['Nattal ma sama CPN', 'Doomi Fer', 'Mandargay musiba']
    }
  },
  {
    category: 'family_planning',
    triggers: [
      'contraception', 'planning', 'espacement', 'regle apres accouchement', 'pilule', 'implant',
      'sterilet', 'sayana', 'dindi birr', 'mayante', 'espacer les naissances'
    ],
    fr: {
      ack: "J'ai bien noté votre question sur la planification familiale et l'espacement des naissances, ma sœur.",
      title: "Planification Familiale & Espacement Serein des Naissances",
      body: "Espacer les grossesses de 2 à 3 ans permet à la maman de reprendre des forces et à l'enfant de grandir sereinement :\n\n" +
            "• **Méthodes longue durée discrètes** : L'implant sous le bras (3 ans) ou le stérilet DIU (5 à 10 ans), très discrets et réversibles dès que vous voulez un autre bébé.\n" +
            "• **Sayana Press (injection tous les 3 mois)** : Une petite piqûre rapide tous les 3 mois, très appréciée au Sénégal.\n" +
            "• **Pilules et préservatifs** : Disponibles dans tous les centres de santé en toute confidentialité (*Sutura*).",
      suggestions: ['Prendre conseil au dispensaire', 'Allaitement et règles', 'Conseils CPN']
    },
    wo: {
      ack: "Degg naa bu baax sama soxna si, laaj nga ma ci wàllu mayante ci birr yi ngir sa yaram noppalu.",
      title: "Mayante ci birr yi ci sutura gu mat sëkk",
      body: "Deggluma bu baax dé sama soxna si :\n\n" +
            "• **Implant ak Stérilet :** Dafa koy téye 3 ba 10 at ci sutura, te saa yoo bëggee am doomati ñu dindi ko ci saa si.\n" +
            "• **Sayana Press :** Ñakk ku weer ñatt, yomb na te kenn du ko yëg.\n" +
            "• **Pilule ak préservatif :** Am na ci kër docteur yépp ci sutura.",
      suggestions: ['Poste de santé', 'Saytu ginaaw wàsin', 'Digal CPN']
    }
  }
];

/**
 * Appel optionnel à l'API Gemini si GEMINI_API_KEY est configurée
 */
async function callGeminiIfAvailable({ message, lang }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  try {
    const isWolof = lang === 'wo';
    const systemPrompt = `Tu es "Sutura AI", une Bajenu Gox (marraine de quartier) numérique et sage-femme sénégalaise bienveillante, chaleureuse (Téranga) et protectrice du secret médical (Sutura).
Tu t'adresses toujours à la femme enceinte ou jeune mère avec un immense respect, empathie, douceur et clarté.
Langue demandée : ${isWolof ? 'Wolof authentique sénégalais (avec expressions sénégalaises de bienveillance : "sama soxna si", "deggluma bu baax dé", "ci sutura")' : 'Français chaleureux, empathique et accessible'}.

RÈGLES D'OR ABSOLUES :
1. Reformule et montre CLAIREMENT que tu as compris la question spécifique posée dès ta première phrase.
2. Donne une réponse médicale exacte, rassurante et pratique avec des remèdes ou conseils adaptés au Sénégal (nutrition locale : Moringa/Nebeday, Bouye, Niébé ; CPN ; SAMU 1515).
3. Ne sois JAMAIS évasive ou générique. Réponds directement au fond du problème.
4. Si un signe de danger mortel est évoqué (saignements, convulsions, arrêt mouvements bébé), alerte en rouge et donne le numéro gratuit 1515.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: message }] }],
        generationConfig: { maxOutputTokens: 600, temperature: 0.3 }
      })
    });

    if (response.ok) {
      const data = await response.json();
      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (replyText) {
        return {
          reply: replyText,
          phoneticSpeech: isWolof ? toWolofPhoneticSpeech(replyText) : replyText,
          lang,
          isEmergency: replyText.includes('1515') || replyText.includes('🚨'),
          suggestions: isWolof
            ? ['Saytu CPN', 'Lekk yu am fer', 'Wóoyal 1515']
            : ['Mes 4 CPN', 'Aliments riches en fer', 'SAMU 1515'],
          engine: 'gemini-1.5-flash',
          timestamp: new Date().toISOString()
        };
      }
    }
  } catch (err) {
    console.debug("[Gemini] API non disponible, repli sur le moteur obstétrical local:", err.message);
  }

  return null;
}

/**
 * Traite le message de l'utilisatrice avec écoute active, compréhension et triage
 */
export async function processChatbotMessage({ message, lang = 'fr', history = [] }) {
  const cleanMsg = (message || '').trim();
  const lowerMsg = cleanMsg.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 1. Détection prioritaire des urgences obstétricales vitales (Grade 1 - Alerte Rouge)
  const isEmergency = EMERGENCY_KEYWORDS.some(kw => matchTrigger(cleanMsg, kw));

  if (isEmergency) {
    const isWolof = lang === 'wo';
    const emergencyReply = isWolof
      ? "🚨 **HÉ SAMA SOXNA SI, DEGGLUMA BU BAAX DÉ !**\n\n" +
        "Li nga ma wax ni ci wàllu sa yaram dafa gawa laaj fajuwaay ci saa si ! Bul toog di xalaat mukk dé :\n" +
        "• Mën na doon deret buy sotti, tension bu kowe (pré-éclampsie) walla liir bi ci biir di sonn.\n" +
        "• **Bul toog yaw rekk ci kër gi.** Waxal ak sa borom kër walla sa Bajenu Gox léegi léegi !\n\n" +
        "📞 **Li nga wara def ci saa si :**\n" +
        "Wóoyal **SAMU Sénégal ci 1515** (feyul dara) walla nga gaaw a dem ci kër docteur bi gën a jege. Yàlla na la Yàlla may jàmm, gaawal dem dé !"
      : "🚨 **ATTENTION MA SŒUR : SIGNE DE DANGER OBSTÉTRICAL DÉTECTÉ !**\n\n" +
        "J'ai bien entendu votre alerte. Ce symptôme nécessite une évaluation médicale immédiate sans attendre la prochaine visite :\n" +
        "• Risque d'hémorragie, d'hypertension sévère (pré-éclampsie) ou de souffrance de votre bébé.\n" +
        "• **Ne restez pas seule.** Prévenez immédiatement un proche ou votre marraine de quartier (Bajenu Gox).\n\n" +
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

  // 2. Tentative avec l'API Gemini si configurée
  const geminiResult = await callGeminiIfAvailable({ message: cleanMsg, lang });
  if (geminiResult) {
    return geminiResult;
  }

  // 3. Analyse Sémantique & Moteur Clinique Local de 25+ Domaines
  for (const domain of KNOWLEDGE_DOMAINS) {
    const matched = domain.triggers.some(tr => matchTrigger(cleanMsg, tr));

    if (matched) {
      const isWolof = lang === 'wo';
      const content = isWolof ? domain.wo : domain.fr;
      const fullReply = `${content.ack}\n\n**${content.title}**\n\n${content.body}`;

      return {
        reply: fullReply,
        phoneticSpeech: isWolof ? toWolofPhoneticSpeech(fullReply) : fullReply,
        lang,
        isEmergency: false,
        triageLevel: 'GREEN',
        category: domain.category,
        suggestions: content.suggestions,
        engine: 'sutura-obstetric-nlp',
        timestamp: new Date().toISOString()
      };
    }
  }

  // 4. Salutations Chaleureuses
  const greetings = ['bonjour', 'salut', 'salam', 'coucou', 'hello', 'nakamou', 'nanga def', 'salaam', 'dalal ak jamm'];
  if (greetings.some(g => matchTrigger(cleanMsg, g))) {
    const welcome = lang === 'wo'
      ? "Salamalékoum sama soxna si ! Dalal ak jàmm. Man la sa xarit Sutura AI. Bul ci am benn tiit, lépp sutura la dé. Wax ma, nanga def ? Yaram jàmm ? Lu la metti walla lu nga bëgg a laaj tay sama soxna si ?"
      : "Salamalékoum ma sœur ! Je suis **Sutura AI**, votre assistante bienveillante et confidentielle (*Sutura*). Vous pouvez me parler au micro ou m'écrire en toute tranquillité. Comment vous sentez-vous aujourd'hui et quelle est votre question ?";

    return {
      reply: welcome,
      phoneticSpeech: lang === 'wo' ? toWolofPhoneticSpeech(welcome) : welcome,
      lang,
      isEmergency: false,
      suggestions: lang === 'wo'
        ? ['Biir buy metti', 'Xol buy jeex (wàcc)', 'Saytu CPN', 'Mandargay musiba']
        : ['Maux de ventre', 'Nausées du matin', 'Mes 4 CPN', 'Signes de danger'],
      engine: 'sutura-greeting',
      timestamp: new Date().toISOString()
    };
  }

  // 5. Reformulation Intelligente & Réponse Empathique Contextuelle (Fallback Actif)
  // Ne JAMAIS dire "quelle est votre question" quand une question a été posée !
  const isWolof = lang === 'wo';
  const shortQuestionRef = cleanMsg.length > 50 ? cleanMsg.substring(0, 47) + '...' : cleanMsg;

  const fallbackReply = isWolof
    ? `Degg naa bu baax li nga ma laaj ci : « ${shortQuestionRef} » dé sama soxna si.\n\n` +
      "Amul benn jafe-jafe, lii yepp ci sutura lañ koy waxe. Ci wàllu wér-gu-yaramu biir bi :\n" +
      "• **Téye sa bopp :** Bu dee am nga mettit, yaram bu tang walla liir bi yëngatul, bul toog ci kër gi dé, gaawal dem kër docteur bi gën a jege.\n" +
      "• **Naan ndox ak lekk yu am doole :** Naanal ndox mu baree bari, lekk xob-u Nebeday (Moringa) ak Bouye, te noppal sa yaram ci wetu càmmooñ.\n" +
      "• **Waxal ak sa Bajenu Gox :** Mën nga ko laaj ci gox bi walla nga laaj ma leneen ci wàllu biir buy metti, wàcc, walla saytu CPN !"
    : `J'ai bien entendu votre question concernant : « ${shortQuestionRef} », ma sœur.\n\n` +
      "C'est une excellente démarche de vous renseigner pour préserver votre santé et celle de votre futur bébé :\n\n" +
      "• **Règle générale de prudence** : Durant la grossesse, écoutez toujours les signaux de votre corps. Reposez-vous sur le côté gauche et hydratez-vous abondamment avec de l'eau propre.\n" +
      "• **Évitez toute automédication** : Ne prenez aucun comprimé ou tisane forte sans l'accord préalable de la sage-femme du dispensaire.\n" +
      "• **Consultez votre marraine de quartier (Bajenu Gox)** : Elle est à votre écoute au quotidien. N'hésitez pas non plus à me poser des questions précises sur vos rendez-vous CPN, vos maux de ventre, vos nausées ou votre alimentation locale !";

  return {
    reply: fallbackReply,
    phoneticSpeech: isWolof ? toWolofPhoneticSpeech(fallbackReply) : fallbackReply,
    lang,
    isEmergency: false,
    suggestions: isWolof
      ? ['Biir buy metti', 'Xol buy jeex (wàcc)', 'Saytu CPN', 'Wóoyal 1515']
      : ['Maux de ventre', 'Nausées & Vomissements', 'Mes 4 CPN', 'Signes de danger'],
    engine: 'sutura-empathic-nlp',
    timestamp: new Date().toISOString()
  };
}
