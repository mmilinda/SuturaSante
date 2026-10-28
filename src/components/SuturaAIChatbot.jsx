import React, { useState, useEffect, useRef } from 'react';

/**
 * Knowledge Base & Répondeur IA Médicale SuturaSanté
 * Couvre les protocoles officiels de santé maternelle du Sénégal (CPN, triage SONU, nutrition locale, allaitement, urgences)
 */
const KNOWLEDGE_RESPONSES = [
  {
    keywords: ['bonjour', 'salut', 'salam', 'coucou', 'hello', 'nakamou', 'nanga def', 'salaam'],
    category: 'greeting',
    fr: "Salamalékoum ! Je suis **Sutura AI**, votre assistante de santé maternelle et reproductive. Je suis là pour vous écouter avec bienveillance, discrétion (*Sutura*) et sans jugement. Vous pouvez me poser vos questions à l'écrit ou en cliquant sur le micro pour me parler. En quoi puis-je vous aider aujourd'hui ?",
    wo: "Salamalékoum ! Man la **Sutura AI**, sa xarit bu la mën a dimbali ci wàllu wér-gu-yaramu jigéen ak birr bi. Mën nga ma wax sa jafe-jafe ci kàddu walla bind ma ko ci sutura. Lu la naqari walla lu nga bëgg a laaj tay ?",
    suggestions: ['Mes rendez-vous CPN', 'Signes de danger', 'Aliments riches en fer', 'SAMU 1515']
  },
  {
    keywords: ['cpn', 'rendez-vous', 'visite', 'calendrier', 'semaine', 'grossesse', 'date', 'échographie', 'echo', 'carnet', 'saytu', 'waxtu'],
    category: 'cpn',
    fr: "Au Sénégal, le Ministère de la Santé préconise au minimum **4 Consultations Prénatales (CPN)** essentielles :\n\n" +
        "1. **CPN 1 (avant la 12e semaine)** : Confirmation, bilan sanguin (anémie, groupe, VIH), prescription de fer et acide folique.\n" +
        "2. **CPN 2 (20e - 24e semaine)** : Échographie morphologique, écoute du cœur du bébé et 1ère dose de vaccin antitétanique.\n" +
        "3. **CPN 3 (28e - 32e semaine)** : Prévention du paludisme (TPI à la sulfadoxine), mesure de la tension artérielle.\n" +
        "4. **CPN 4 (36e - 38e semaine)** : Planification de l'accouchement, détection de la position du bébé et préparation du transport d'urgence.\n\n" +
        "💡 *Conseil : Utilisez notre Calculateur CPN sur l'onglet 'Grossesse' pour calculer vos dates exactes à partir de vos dernières règles.*",
    wo: "Ci réewum Sénégal, Ministère bu Wér-gi-yaram digale na ñu def lu néew néew **4 saytu CPN** yu am solo :\n\n" +
        "1. **CPN 1 (bala 12 ayu-bës)** : Dëggal birr bi, saytu deret (anémie) ak jël fer.\n" +
        "2. **CPN 2 (diggante 20 ak 24 ayu-bës)** : Xool liir bi ci masin (écho) ak jël ñakk VAT.\n" +
        "3. **CPN 3 (28e ayu-bës)** : Faju sibiru (paludisme TPI) ak saytu tension.\n" +
        "4. **CPN 4 (diggante 36 ak 38 ayu-bës)** : Waajal wàsin bi ak auto bu lay yóbbu fajuwaay.\n\n" +
        "💡 *Xelal : Mën nga jëfandikoo Nattukaayu CPN bi ci wàllu 'Grossesse' ngir xam sa bési CPN ci sa bésu regle.*",
    suggestions: ['Calculer mon terme', 'Quels aliments manger ?', 'Signes de danger']
  },
  {
    keywords: ['saignement', 'sang', 'maux de tete', 'vision floue', 'mouche', 'tension', 'fievre', 'frisson', 'bebe bouge pas', 'bouge moins', 'eau qui coule', 'poche', 'convulsion', 'gonflement', 'oedeme', 'deret', 'metti bopp', 'sibiru', 'musiba'],
    category: 'danger',
    isEmergency: true,
    fr: "🚨 **ATTENTION : SIGNE DE DANGER OBSTÉTRICAL DÉTECTÉ**\n\n" +
        "Ce symptôme nécessite une évaluation médicale immédiate sans attendre :\n" +
        "- Risque d'hémorragie, de pré-éclampsie (hypertension sévère) ou de souffrance fœtale.\n" +
        "- **Ne restez pas seule.** Prévenez un proche ou votre Bajenu Gox.\n\n" +
        "📞 **Action immédiate :**\n" +
        "Appelez gratuitement le **SAMU Sénégal au 1515** ou rendez-vous au centre de santé / maternité le plus proche immédiatement.",
    wo: "🚨 **MOYTU : MANDARGA GU AM MUSIBA LA CI SA YARAM**\n\n" +
        "Li nga wax dafa laaj nga dem fajuwaay léegi te bul yéex :\n" +
        "- Mën na doon deret buy sotti, tension bu kowe (pré-éclampsie) walla liir bi ci biir di sonn.\n" +
        "- **Bul toog yaw rekk.** Wax ko sa mbokk walla sa Bajenu Gox.\n\n" +
        "📞 **Li nga wara def léegi :**\n" +
        "Wóoyal **SAMU Sénégal ci 1515** (feyul dara) walla nga gaaw a dem ci kër docteur bi gën a jege.",
    suggestions: ['Appeler le 1515', 'Centres de santé proches', 'Autres signes']
  },
  {
    keywords: ['manger', 'nutrition', 'aliment', 'nourriture', 'fer', 'anemie', 'moringa', 'nebeday', 'bouye', 'vitamine', 'regime', 'naan', 'lekk'],
    category: 'nutrition',
    fr: "🍲 **Conseils Nutrition Maternelle au Sénégal :**\n\n" +
        "Pour donner de la force à votre sang et aider bébé à bien grandir :\n" +
        "• **Aliments riches en fer** : Feuilles de Moringa (*Nebeday*) dans vos sauces, lentilles, haricots (*ñebbe*), œufs bien cuits, poissons frais et viandes.\n" +
        "• **Vitamine C pour absorber le fer** : Jus de Bouye (pain de singe), oranges, mangues, citron.\n" +
        "• **Comprimés de fer & acide folique** : Prenez-les chaque jour avec un grand verre d'eau (évitez thé ou café dans l'heure qui suit).\n" +
        "• **Hydratation** : Buvez au moins 2 à 3 litres d'eau potable par jour.",
    wo: "🍲 **Digal ci wàllu lekk ngir jox sa yaram doole :**\n\n" +
        "• **Yëf yu am fer** : Xob-u Neverdie (Moringa) ci sa ciin, ñebbe, lanti, nen yu ñor, ak jën yu bees.\n" +
        "• **Vitamine C ngir fer bi duggu bu baax** : Njaan-u Bouye, limon, màngo.\n" +
        "• **Garap u fer** : Naanal sa gàncax u fer ak acide folique bés bu nekk, te bul naan ataaya ci saa si.\n" +
        "• **Ndox** : Naanal lu néew néew 2 ba 3 litru ndox mu sell bés bu nekk.",
    suggestions: ['Que faire contre les nausées ?', 'Prendre mes vitamines', 'Mes CPN']
  },
  {
    keywords: ['nausee', 'vomir', 'vomissement', 'fatigue', 'degout', 'vertige', 'wacc', 'sonn'],
    category: 'symptoms',
    fr: "🌿 **Conseils contre les nausées du 1er trimestre :**\n\n" +
        "1. **Fractionnez vos repas** : Mangez de petites portions plus souvent dans la journée plutôt que de gros repas.\n" +
        "2. **Au réveil** : Mangez un petit biscuit sec ou un morceau de pain avant même de poser le pied par terre.\n" +
        "3. **Gingembre & Citron** : Une infusion légère de gingembre ou une tranche de citron dans de l'eau tiède aide à calmer l'estomac.\n" +
        "4. Évitez les odeurs fortes de cuisine et les aliments trop gras ou trop épicés.\n\n" +
        "⚠️ *Si vous ne parvenez plus à garder le moindre liquide pendant 24h, consultez une sage-femme.*",
    wo: "🌿 **Digal ngir wàññi wàcc ak yaram buy tey ci tàmbalee bi :**\n\n" +
        "1. **Wàññil sa lekk** : Lekkal tuuti tuuti ci bés bi te bul fessal sa biir ci benn yoon.\n" +
        "2. **Bu bët setee** : Lekkal mburu mu wow bala ngay jóg ci lal bi.\n" +
        "3. **Jinjer ak limon** : Jinjer bu xawa saff ak ndox mu tang tuuti mën na dalal sa xol.\n" +
        "4. Moytul ñam yu am diw bu bari walla luy xeeñ lu metti.",
    suggestions: ['Aliments conseillés', 'Calendrier CPN', 'Signes de danger']
  },
  {
    keywords: ['allaitement', 'lait', 'sein', 'nourrir', 'bebe', 'colostrum', 'mammaire', 'nampal', 'meew'],
    category: 'postpartum',
    fr: "🤱 **Allaitement Maternel Exclusif (AME) :**\n\n" +
        "• **Mise au sein immédiate** : Dans l'heure qui suit la naissance, donnez le premier lait jaunâtre appelé **Colostrum** (*Lait d'or*). Il protège bébé contre toutes les infections comme un premier vaccin naturel.\n" +
        "• **6 premiers mois** : Rien d'autre que le lait maternel (pas d'eau, pas de tisane, pas de décoction).\n" +
        "• **À la demande** : Donnez le sein jour et nuit dès que bébé montre des signes de faim.\n" +
        "• En cas de douleurs aux mamelons, vérifiez la bonne prise en bouche avec votre sage-femme ou Bajenu Gox.",
    wo: "🤱 **Nampal liir bi ci jàmm :**\n\n" +
        "• **Tekk liir bi ci ween bi léegi** : Bala waxtu di jàll bu juddoo, nampalal ko meew mu njëkk mi (Colostrum). Mooy garap ak kaalaange liir bi ci jàngoro yépp.\n" +
        "• **6 weer yu njëkk yi** : Meewu ndey ji rekk, bul ko jox ndox, bul ko jox dàq.\n" +
        "• Nampalal liir bi saa yu bëggee ci guddi ak bëccëg.",
    suggestions: ['Alimentation maman', 'Rendez-vous après accouchement', 'Espacement des naissances']
  },
  {
    keywords: ['contraception', 'espacement', 'regle', 'cycle', 'pilule', 'implant', 'sterilet', 'planning', 'grossesse rapprochee', 'garap'],
    category: 'family_planning',
    fr: "🌸 **Planification Familiale & Espacement des Naissances :**\n\n" +
        "Espacer les naissances d'au moins 2 à 3 ans permet à votre corps de récupérer et assure une meilleure croissance pour l'enfant.\n\n" +
        "Plusieurs méthodes gratuites ou très abordables existent au poste de santé :\n" +
        "• **Méthodes réversibles longue durée** : Implant sous-cutané (3 à 5 ans), DIU/Stérilet (5 à 10 ans).\n" +
        "• **Méthodes hormonales** : Pilule quotidienne, injection trimestrielle (Sayana Press).\n" +
        "• **Méthodes barrières** : Préservatifs masculins et féminins (protègent aussi des IST).\n\n" +
        "Discutez-en en toute discrétion avec la sage-femme lors de votre visite post-natale.",
    wo: "🌸 **Wàññi am doom ak dindi birr :**\n\n" +
        "Mayante ci birr yi lu tollu ci 2 ba 3 at dafay dimbali yaramu ndey ji mu dellusi te liir bi dund bu baax.\n\n" +
        "Ay fajuwaay yu bari am na ci kër docteur yi ci sutura :\n" +
        "• **Implant** (3 ba 5 at) walla **Stérilet** (5 ba 10 at)\n" +
        "• **Pilule** bés bu nekk walla **piqûre** ku weer ñatt (Sayana Press)\n" +
        "• **Préservatif** ngir wér-gu-yaram.\n\n" +
        "Mën nga ko waxtaan ak sa sage-femme ci kër docteur bi ci sutura gu mat sëkk.",
    suggestions: ['Allaitement et règles', 'Conseils santé', 'Centres de santé']
  },
  {
    keywords: ['samu', 'urgence', 'hopital', 'numero', '1515', 'ambulance', 'centre', 'fajuwaay', 'gawante'],
    category: 'emergency',
    isEmergency: true,
    fr: "🚑 **Numéros d'Urgence Gratuits au Sénégal (24h/24) :**\n\n" +
        "• **SAMU National : 1515** (Urgence médicale & ambulances de réanimation)\n" +
        "• **Pompiers (BNSP) : 18**\n" +
        "• **Ligne Verte Enfance & Violences Faites aux Femmes : 116** (Écoute et protection gratuite)\n" +
        "• **Hôpital Principal de Dakar** : +221 33 839 50 50\n" +
        "• **Hôpital Dalal Jamm (Guédiawaye)** : +221 33 879 92 92\n" +
        "• **Maternité Roi Baudouin (Guédiawaye)** : +221 33 877 12 12",
    wo: "🚑 **Numéro yu am solo ci Sénégal (24h/24 feyul dara) :**\n\n" +
        "• **SAMU Sénégal : 1515** (Gawante ak ambulance)\n" +
        "• **Sapeurs Pompiers : 18**\n" +
        "• **Numéro 116** (Dimbali jigéen ñi ak xale yi ci sutura)\n" +
        "• **Hôpital Dalal Jamm** : +221 33 879 92 92\n" +
        "• **Roi Baudouin** : +221 33 877 12 12",
    suggestions: ['Appeler le 1515', 'Signes de danger', 'Mes CPN']
  }
];

function findAnswer(query, preferredLang = 'fr') {
  const clean = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // 1. Recherche par mot clé
  for (const item of KNOWLEDGE_RESPONSES) {
    for (const kw of item.keywords) {
      const cleanKw = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (clean.includes(cleanKw)) {
        return {
          text: preferredLang === 'wo' ? item.wo : item.fr,
          rawItem: item,
          isEmergency: !!item.isEmergency,
          suggestions: item.suggestions
        };
      }
    }
  }

  // 2. Réponse générale et bienveillante par défaut
  if (preferredLang === 'wo') {
    return {
      text: "Degg naa sa laaj ci sutura. Man la Sutura AI, sa ndimbal ci wàllu birr ak wér-gu-yaramu jigéen. Ndax mën nga ma gën a leral sa jafe-jafe ci kàddu walla ci bind ? Mën nga ma laaj ci wàllu saytu CPN, lekk yu am fer, walla mandargay musiba ci birr bi.",
      isEmergency: false,
      suggestions: ['Saytu CPN', 'Mandargay musiba', 'Lekk yu am fer', 'Wóoyal 1515']
    };
  }

  return {
    text: "Je vous écoute en toute discrétion et bienveillance. En tant qu'assistante SuturaSanté, je peux vous guider sur vos **rendez-vous de CPN**, les **signes d'alerte et de danger**, la **nutrition locale riche en fer** (Moringa, Bouye), l'**allaitement** ou les **urgences médicales (SAMU 1515)**.\n\nPouvez-vous préciser votre question ou choisir un des sujets ci-dessous ?",
    isEmergency: false,
    suggestions: ['Mes 4 rendez-vous CPN', 'Signes de danger', 'Nutrition & Moringa', 'SAMU 1515 Sénégal']
  };
}

export default function SuturaAIChatbot({
  lang = 'fr',
  setLang,
  onNavigateTab,
  isOpen: externalIsOpen,
  setIsOpen: externalSetIsOpen
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen || setInternalIsOpen;
  const [isVoiceCallMode, setIsVoiceCallMode] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeVoiceMsgId, setActiveVoiceMsgId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'assistant',
      time: 'À l\'instant',
      text: lang === 'wo'
        ? "Salamalékoum ! Man la **Sutura AI**, sa xarit bu suturaal ci wàllu birr ak wér-gi-yaram. Mën nga ma laaj ci kàddu (micro) walla nga bind ma. Naka laa la mënee dimbali tay ?"
        : "Salamalékoum ! Je suis **Sutura AI**, votre assistante confidentielle de santé maternelle et reproductive. Vous pouvez me parler à la voix via le micro 🎙️ ou m'écrire. Comment puis-je vous aider aujourd'hui ?",
      suggestions: ['Calendrier CPN', 'Signes de danger', 'Aliments riches en fer', 'SAMU 1515'],
      isEmergency: false
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const currentUtteranceRef = useRef(null);

  // Auto-scroll au bas du chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Initialisation Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = lang === 'wo' ? 'fr-SN' : 'fr-FR';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0].transcript)
            .join('');
          setInputText(transcript);
        };

        recognition.onerror = (event) => {
          console.warn("Erreur reconnaissance vocale:", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } catch (err) {
        console.warn("Impossible d'initialiser SpeechRecognition:", err);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lang]);

  // Synthèse vocale Text-to-Speech
  const speakText = (text, msgId = null) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking && activeVoiceMsgId === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveVoiceMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Nettoyer les emojis et astérisques markdown pour une lecture audio fluide
    const cleanSpeech = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/[#•\-]/g, ' ')
      .replace(/🚨|💡|🍲|🌿|🤱|🌸|🚑|⚠️|📞/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.lang = lang === 'wo' ? 'fr-SN' : 'fr-FR';
    utterance.rate = 0.92;
    utterance.pitch = 1.05;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setActiveVoiceMsgId(msgId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveVoiceMsgId(null);
      // En mode appel vocal continu, réactiver l'écoute après la réponse de l'IA
      if (isVoiceCallMode && recognitionRef.current) {
        setTimeout(() => {
          startListening();
        }, 500);
      }
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setActiveVoiceMsgId(null);
    };

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = lang === 'wo' ? 'fr-SN' : 'fr-FR';
        recognitionRef.current.start();
      } catch (e) {
        console.warn("Microphone déjà en écoute ou non autorisé", e);
      }
    } else {
      alert("Votre navigateur ne supporte pas l'entrée vocale directe. Vous pouvez écrire votre message ci-dessous.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Envoi d'un message utilisateur
  const handleSendMessage = (textToSend = null) => {
    const text = (textToSend !== null ? textToSend : inputText).trim();
    if (!text) return;

    stopListening();

    const userMsgId = `user-${Date.now()}`;
    const userMessage = {
      id: userMsgId,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Temps de réflexion réaliste de l'IA
    setTimeout(() => {
      const answer = findAnswer(text, lang);
      const aiMsgId = `ai-${Date.now()}`;
      const aiMessage = {
        id: aiMsgId,
        sender: 'assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: answer.text,
        suggestions: answer.suggestions,
        isEmergency: answer.isEmergency
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);

      // Si lecture vocale automatique activée ou mode appel vocal
      if (autoSpeak || isVoiceCallMode) {
        speakText(answer.text, aiMsgId);
      }
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const clearChat = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        time: 'À l\'instant',
        text: lang === 'wo'
          ? "Waxtaan bi set na ci sutura. Lan laa la mën a leralat tay ci sa wér-gu-yaram ?"
          : "La discussion a été réinitialisée en toute confidentialité. Que souhaitez-vous savoir sur votre santé ?",
        suggestions: ['Mes rendez-vous CPN', 'Signes de danger', 'Aliments riches en fer', 'SAMU 1515']
      }
    ]);
  };

  return (
    <>
      {/* =========================================================================
          BOUTON FLOTTANT LANCEUR DU CHATBOT (Toujours visible et accessible)
          ========================================================================= */}
      <div className="fixed bottom-24 md:bottom-6 right-3 md:right-6 z-50 flex items-center gap-2 select-none">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#ddc0bd]/60 shadow-[0_4px_16px_rgba(0,0,0,0.08)] animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#2c694e]"></span>
            <span className="text-xs font-bold text-[#902e2a]">
              IA Sutura • Vocal & Écrit
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Ouvrir le Chatbot IA Sutura"
          className={`relative group w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_6px_24px_rgba(144,46,42,0.35)] active:scale-95 transition-all duration-300 cursor-pointer ${
            isOpen
              ? 'bg-[#171c23] text-white rotate-90'
              : 'bg-gradient-to-tr from-[#902e2a] via-[#a83833] to-[#ba1a1a] text-white'
          }`}
          title="Discuter avec l'IA Sutura (Vocale et Écrite)"
        >
          {isOpen ? (
            <span className="material-symbols-outlined text-[28px]">close</span>
          ) : (
            <>
              <span className="material-symbols-outlined text-[30px] group-hover:scale-110 transition-transform">
                smart_toy
              </span>
              {/* Onde pulsante pour inviter à la discussion */}
              <span className="absolute inset-0 rounded-full bg-[#902e2a] animate-ping opacity-25"></span>
              {/* Petit badge micro */}
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#2c694e] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                <span className="material-symbols-outlined text-[12px]">mic</span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* =========================================================================
          TIROIR / FENÊTRE DE DISCUSSION CHATBOT IA
          ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Assistant IA SuturaSanté"
          className="fixed bottom-22 md:bottom-24 right-2 md:right-6 z-50 w-[calc(100vw-1rem)] sm:w-[420px] max-h-[85vh] h-[640px] bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#ddc0bd]/80 shadow-[0_16px_48px_rgba(0,0,0,0.18)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200"
        >
          {/* HEADER CHATBOT */}
          <div className="bg-gradient-to-r from-[#902e2a] via-[#a83833] to-[#7a2420] text-white px-4 py-3 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px] text-white">
                  smart_toy
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#aeeecb] border-2 border-[#902e2a]"></span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif font-bold text-sm text-white truncate">
                    Sutura AI
                  </span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-white/20 text-[#ffe3c7] font-extrabold tracking-wider">
                    Femtech IA
                  </span>
                </div>
                <span className="text-[10px] text-white/80 truncate flex items-center gap-1">
                  <span className="material-symbols-outlined text-[11px] text-[#aeeecb]">lock</span>
                  100% Confidentiel & Discret (Sutura)
                </span>
              </div>
            </div>

            {/* Actions Header */}
            <div className="flex items-center gap-1">
              {/* Bouton Mode Appel Vocal */}
              <button
                type="button"
                onClick={() => {
                  const nextState = !isVoiceCallMode;
                  setIsVoiceCallMode(nextState);
                  setAutoSpeak(nextState);
                  if (nextState) startListening();
                  else stopListening();
                }}
                className={`px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
                  isVoiceCallMode
                    ? 'bg-[#ffe3c7] text-[#724600] shadow-sm animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title="Activer le mode conversation vocale continue"
              >
                <span className="material-symbols-outlined text-[13px]">
                  {isVoiceCallMode ? 'graphic_eq' : 'headset_mic'}
                </span>
                <span>{isVoiceCallMode ? 'Vocal Actif' : 'Mode Voix'}</span>
              </button>

              {/* Switch Langue rapide */}
              <button
                type="button"
                onClick={() => setLang && setLang(lang === 'wo' ? 'fr' : 'wo')}
                className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
                title="Changer de langue"
              >
                <span className="material-symbols-outlined text-[12px]">translate</span>
                <span>{lang === 'wo' ? 'Wolof' : 'FR'}</span>
              </button>

              {/* Réinitialiser conversation */}
              <button
                type="button"
                onClick={clearChat}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="Effacer l'historique de discussion"
              >
                <span className="material-symbols-outlined text-[15px]">restart_alt</span>
              </button>

              {/* Fermer */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors ml-0.5"
                title="Réduire le chatbot"
              >
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
            </div>
          </div>

          {/* BANNIÈRE MODE APPEL VOCAL INTERACTIF */}
          {isVoiceCallMode && (
            <div className="bg-[#ffe3c7] border-b border-[#fcba67]/40 px-3 py-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
                <span className="text-[11px] font-bold text-[#724600]">
                  {isListening
                    ? "À votre écoute... parlez librement"
                    : isSpeaking
                    ? "Sutura AI vous répond à voix haute..."
                    : "Conversation vocale en continu"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1 h-3 bg-[#724600] rounded-full animate-pulse"></span>
                <span className="w-1 h-5 bg-[#724600] rounded-full animate-bounce"></span>
                <span className="w-1 h-2 bg-[#724600] rounded-full animate-pulse"></span>
              </div>
            </div>
          )}

          {/* CORPS DE DISCUSSION : MESSAGES */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-[#f8f9ff]/50">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1 max-w-[90%] ${
                    isUser ? 'ml-auto' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 shadow-xs text-xs leading-relaxed transition-all ${
                      isUser
                        ? 'bg-[#902e2a] text-white rounded-br-xs'
                        : msg.isEmergency
                        ? 'bg-[#ffdad6] text-[#410002] border border-[#ba1a1a]/50 rounded-bl-xs'
                        : 'bg-white text-[#171c23] border border-[#ddc0bd]/40 rounded-bl-xs'
                    }`}
                  >
                    {/* Contenu textuel avec sauts de lignes */}
                    <div className="whitespace-pre-wrap font-sans">
                      {msg.text}
                    </div>

                    {/* Si alerte d'urgence médicale détectée */}
                    {msg.isEmergency && (
                      <div className="mt-2.5 pt-2 border-t border-[#ba1a1a]/30 flex flex-col gap-2">
                        <a
                          href="tel:1515"
                          className="w-full py-1.5 px-3 rounded-full bg-[#ba1a1a] hover:bg-[#902e2a] text-white font-bold text-center flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                        >
                          <span className="material-symbols-outlined text-[16px] animate-bounce">
                            emergency
                          </span>
                          <span>Appeler le SAMU 1515 (Gratuit)</span>
                        </a>
                        {onNavigateTab && (
                          <button
                            type="button"
                            onClick={() => {
                              onNavigateTab('emergency');
                              setIsOpen(false);
                            }}
                            className="text-[11px] text-[#902e2a] font-bold underline text-center"
                          >
                            Voir l'annuaire complet des maternités
                          </button>
                        )}
                      </div>
                    )}

                    {/* Ligne inférieure du message assistant : Écouter l'audio + heure */}
                    {!isUser && (
                      <div className="mt-2 pt-1.5 border-t border-[#ddc0bd]/30 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => speakText(msg.text, msg.id)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                            isSpeaking && activeVoiceMsgId === msg.id
                              ? 'bg-[#902e2a] text-white animate-pulse'
                              : 'bg-[#eaeef8] hover:bg-[#dee2ec] text-[#724600]'
                          }`}
                          title="Écouter ce message à la voix"
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            {isSpeaking && activeVoiceMsgId === msg.id ? 'stop' : 'volume_up'}
                          </span>
                          <span>
                            {isSpeaking && activeVoiceMsgId === msg.id
                              ? 'Lecture...'
                              : lang === 'wo'
                              ? 'Déglul'
                              : 'Écouter'}
                          </span>
                        </button>

                        <span className="text-[9px] text-[#574240]/70">
                          {msg.time}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Suggestions sous la réponse de l'IA */}
                  {!isUser && msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {msg.suggestions.map((sugg, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSuggestionClick(sugg)}
                          className="px-2.5 py-1 rounded-full bg-white hover:bg-[#eaeef8] text-[#902e2a] border border-[#ddc0bd]/70 text-[10px] font-bold transition-colors active:scale-95 shadow-xs"
                        >
                          💬 {sugg}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Indicateur de frappe IA */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#574240] bg-white px-3 py-2 rounded-2xl border border-[#ddc0bd]/40 max-w-[200px] shadow-xs">
                <span className="w-1.5 h-1.5 bg-[#902e2a] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#902e2a] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#902e2a] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[10px] font-bold text-[#902e2a]">Sutura AI réfléchit...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* PRÉVISUALISATION MICROPHONE / VOIX EN COURS */}
          {isListening && (
            <div className="bg-[#ffdad6] border-t border-[#ba1a1a]/40 px-3 py-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-3 h-3 rounded-full bg-[#ba1a1a] animate-ping"></span>
                <span className="text-xs font-bold text-[#ba1a1a] truncate">
                  {inputText ? `"${inputText}"` : "À l'écoute... Parlez maintenant"}
                </span>
              </div>
              <button
                type="button"
                onClick={stopListening}
                className="px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold shrink-0"
              >
                Arrêter
              </button>
            </div>
          )}

          {/* FOOTER & SAISIE (Texte et Microphone) */}
          <div className="p-2.5 bg-white border-t border-[#ddc0bd]/50 flex flex-col gap-1.5 shrink-0">
            {/* Ligne d'outils secondaire */}
            <div className="flex items-center justify-between px-1 text-[10px] text-[#574240]">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoSpeak}
                  onChange={(e) => setAutoSpeak(e.target.checked)}
                  className="rounded text-[#902e2a] focus:ring-[#902e2a] w-3 h-3"
                />
                <span className="font-semibold">
                  {lang === 'wo' ? 'Déglul ci kàddu saa su tontoo' : 'Lecture vocale automatique'}
                </span>
              </label>

              <span className="text-[9px] text-[#2c694e] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2c694e]"></span>
                DPG Ouvert
              </span>
            </div>

            {/* Barre de saisie principale */}
            <div className="flex items-center gap-1.5 bg-[#eaeef8] rounded-2xl p-1 border border-[#ddc0bd]/60 focus-within:border-[#902e2a] focus-within:bg-white transition-all">
              {/* Bouton Microphone */}
              <button
                type="button"
                onClick={toggleListening}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                  isListening
                    ? 'bg-[#ba1a1a] text-white animate-pulse'
                    : 'bg-white hover:bg-[#dee2ec] text-[#902e2a] shadow-xs'
                }`}
                title={isListening ? "Arrêter l'enregistrement" : "Parler au microphone"}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isListening ? 'mic' : 'mic_none'}
                </span>
              </button>

              {/* Champ de texte */}
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  lang === 'wo'
                    ? "Bindal sa laaj walla nga bës ci micro bi..."
                    : "Écrivez ou dictez votre question santé..."
                }
                className="flex-1 bg-transparent border-none outline-none text-xs text-[#171c23] placeholder-[#574240]/60 px-2 py-1.5"
              />

              {/* Bouton Envoyer */}
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                  inputText.trim()
                    ? 'bg-[#902e2a] text-white shadow-xs hover:bg-[#7a2420] active:scale-95'
                    : 'bg-[#ddc0bd]/40 text-[#574240]/40 cursor-not-allowed'
                }`}
                title="Envoyer le message"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
