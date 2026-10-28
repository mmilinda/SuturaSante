import React, { useState, useEffect, useRef } from 'react';

/**
 * Convertit le texte Wolof écrit en représentation phonétique pour les synthétiseurs vocaux web
 * Permet d'obtenir une prononciation sénégalaise 100% humaine, chaleureuse et fluide
 */
export function toWolofPhoneticSpeech(wolofText) {
  if (!wolofText || typeof wolofText !== 'string') return '';
  let speech = wolofText
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/[#•\-]/g, ' ')
    .replace(/🚨|💡|🍲|🌿|🤱|🌸|🚑|⚠️|📞/g, '');

  speech = speech.replace(/\bci\b/gi, 'tchi');
  speech = speech.replace(/\bca\b/gi, 'tcha');
  speech = speech.replace(/ceeb/gi, 'tchééb');
  speech = speech.replace(/c([aeiou])/gi, 'tch$1');
  speech = speech.replace(/C([aeiou])/g, 'Tch$1');
  speech = speech.replace(/j/gi, (m) => m === 'J' ? 'Dj' : 'dj');
  speech = speech.replace(/x/gi, (m) => m === 'X' ? 'Kh' : 'kh');
  speech = speech.replace(/ñ/gi, (m) => m === 'Ñ' ? 'Gn' : 'gn');
  speech = speech.replace(/\bw([aàeéio])/gi, (m, v) => (m[0] === 'W' ? 'Ou' : 'ou') + v);
  speech = speech.replace(/wà/gi, 'oua');
  speech = speech.replace(/ë/gi, 'eu');
  speech = speech.replace(/u/gi, 'ou');
  speech = speech.replace(/dé(\b|[!?.])/gi, 'déé$1');
  speech = speech.replace(/\bwaaw\b/gi, 'ouaoou');
  speech = speech.replace(/\blool\b/gi, 'lôle');
  speech = speech.replace(/\bsama soxna si\b/gi, 'sama sokhna si');
  speech = speech.replace(/\bsama xarit\b/gi, 'sama kharit');
  speech = speech.replace(/\byaram jàmm\b/gi, 'yaram djamm');
  speech = speech.replace(/\bjàmm\b/gi, 'djamm');
  speech = speech.replace(/\bndànk ndànk\b/gi, 'ndank ndank');

  return speech;
}

/**
 * Knowledge Base locale de secours humanisée (utilisée si le backend est hors-ligne)
 */
const LOCAL_KNOWLEDGE = [
  {
    keywords: ['bonjour', 'salut', 'salam', 'coucou', 'hello', 'nakamou', 'nanga def', 'salaam'],
    fr: "Salamalékoum ma sœur ! Je suis **Sutura AI**, votre assistante de santé maternelle et reproductive. Je suis là pour vous écouter avec bienveillance, discrétion (*Sutura*) et sans jugement. Vous pouvez me poser vos questions à l'écrit ou en cliquant sur le micro pour me parler. En quoi puis-je vous aider aujourd'hui ?",
    wo: "Salamalékoum sama soxna si ! Dalal ak jàmm. Man la sa xarit Sutura AI. Bul ci am benn tiit dé, lii yepp ci sutura la. Wax ma, nanga def ? Yaram jàmm ? Lu la metti walla lu nga bëgg a laaj tay sama soxna si ?",
    suggestions: ['Mes rendez-vous CPN', 'Signes de danger', 'Aliments riches en fer', 'SAMU 1515']
  },
  {
    keywords: ['cpn', 'rendez-vous', 'visite', 'calendrier', 'semaine', 'grossesse', 'date', 'echographie', 'echo', 'carnet', 'saytu', 'waxtu'],
    fr: "Au Sénégal, le Ministère de la Santé préconise au minimum **4 Consultations Prénatales (CPN)** essentielles :\n\n" +
        "1. **CPN 1 (avant 12 SA)** : Confirmation, bilan d'anémie, prescription de fer & acide folique.\n" +
        "2. **CPN 2 (20 à 24 SA)** : Échographie morphologique, mouvements fœtaux, vaccin antitétanique.\n" +
        "3. **CPN 3 (28 à 32 SA)** : Prévention du paludisme (TPI), surveillance de la tension.\n" +
        "4. **CPN 4 (36 à 38 SA)** : Plan d'accouchement et organisation du transport d'urgence.",
    wo: "Waaw kaye sama soxna si, deggluma bu baax dé ! Birr bi dafa laaj ñu koy saytu ndànk ndànk ci jàmm :\n\n" +
        "• **CPN 1 (bala weer bi di jàll)** : Dëggal birr bi, saytu deret ak joxe fer.\n" +
        "• **CPN 2 (20 ba 24 ayu-bës)** : Écho masin ak ñakk VAT.\n" +
        "• **CPN 3 (28 ba 32 ayu-bës)** : Saytu tension ak garapu sibiru.\n" +
        "• **CPN 4 (36 ba 38 ayu-bës)** : Waajal wàsin bi ak auto bu lay yóbbu.\n\n" +
        "Bul fatte kaye fajuwaay bi dé !",
    suggestions: ['Calculer mon terme', 'Quels aliments manger ?', 'Signes de danger']
  },
  {
    keywords: ['saignement', 'sang', 'maux de tete', 'vision floue', 'tension', 'fievre', 'frisson', 'bebe bouge pas', 'bouge moins', 'eau qui coule', 'deret', 'metti bopp', 'musiba'],
    isEmergency: true,
    fr: "🚨 **ATTENTION : SIGNE DE DANGER OBSTÉTRICAL DÉTECTÉ**\n\n" +
        "Ce symptôme nécessite une évaluation médicale immédiate sans attendre :\n" +
        "- Risque d'hémorragie, de pré-éclampsie ou de souffrance fœtale.\n" +
        "- **Ne restez pas seule.** Prévenez un proche ou votre Bajenu Gox.\n\n" +
        "📞 **Action immédiate :**\n" +
        "Appelez gratuitement le **SAMU Sénégal au 1515** ou rendez-vous au centre de santé le plus proche.",
    wo: "🚨 **HÉ SAMA SOXNA SI, DEGGLUMA BU BAAX DÉ !**\n\n" +
        "Li nga ma wax ni dafa gawa laaj fajuwaay ci saa si ! Bul toog di xalaat mukk dé :\n" +
        "- Mën na doon deret buy sotti, tension bu kowe walla liir bi di sonn.\n" +
        "- **Bul toog yaw rekk ci kër gi.** Wax ko sa borom kër walla sa Bajenu Gox léegi léegi !\n\n" +
        "📞 **Li nga wara def ci saa si :**\n" +
        "Wóoyal **SAMU Sénégal ci 1515** (feyul dara) walla nga gaaw a dem ci kër docteur bi gën a jege. Yàlla na la Yàlla may jàmm, gaawal dem dé !",
    suggestions: ['Appeler le 1515', 'Centres de santé proches', 'Autres signes']
  }
];

function fallbackFindAnswer(query, preferredLang = 'fr') {
  const clean = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const item of LOCAL_KNOWLEDGE) {
    for (const kw of item.keywords) {
      const cleanKw = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (clean.includes(cleanKw)) {
        return {
          text: preferredLang === 'wo' ? item.wo : item.fr,
          isEmergency: !!item.isEmergency,
          suggestions: item.suggestions
        };
      }
    }
  }

  return {
    text: preferredLang === 'wo'
      ? "Degg naa sa laaj ci sutura. Man la Sutura AI, sa ndimbal ci wàllu birr ak wér-gu-yaram. Mën nga ma laaj ci saytu CPN, lekk yu am fer, walla mandargay musiba."
      : "Je vous écoute en toute confidentialité (*Sutura*). En tant qu'assistante SuturaSanté, je peux vous guider sur vos **rendez-vous de CPN**, les **signes d'alerte**, la **nutrition locale** (Moringa, fer) ou les **urgences (SAMU 1515)**.\n\nEn quoi puis-je vous aider ?",
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

  // Onglet interne du drawer : 'chat' (Discussion IA) ou 'translator' (Traducteur Wolof)
  const [activeTabMode, setActiveTabMode] = useState('chat');

  // État vocal
  const [isVoiceCallMode, setIsVoiceCallMode] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeVoiceMsgId, setActiveVoiceMsgId] = useState(null);

  // État saisie chat
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [translatingMsgId, setTranslatingMsgId] = useState(null);

  // État Traducteur Dédié
  const [transSourceText, setTransSourceText] = useState('');
  const [transResult, setTransResult] = useState(null);
  const [transSourceLang, setTransSourceLang] = useState('fr');
  const [transTargetLang, setTransTargetLang] = useState('wo');
  const [isTranslating, setIsTranslating] = useState(false);

  // Messages du chat
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

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const currentUtteranceRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && activeTabMode === 'chat') {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping, activeTabMode]);

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
          if (activeTabMode === 'chat') {
            setInputText(transcript);
          } else {
            setTransSourceText(transcript);
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } catch (err) {
        console.warn("SpeechRecognition non supporté:", err);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (_) {}
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lang, activeTabMode]);

  // Synthèse vocale TTS adaptée à la phonétique Wolof sénégalaise
  const speakText = (text, msgId = null, targetLang = null, phoneticOverride = null) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking && activeVoiceMsgId === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveVoiceMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();

    const spokenLang = targetLang || lang;
    let cleanSpeech = '';

    if (spokenLang === 'wo') {
      // Pour le Wolof, on utilise la translitération phonétique pour une prononciation sénégalaise naturelle
      cleanSpeech = phoneticOverride || toWolofPhoneticSpeech(text);
    } else {
      cleanSpeech = text
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/[#•\-]/g, ' ')
        .replace(/🚨|💡|🍲|🌿|🤱|🌸|🚑|⚠️|📞/g, '');
    }

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.lang = spokenLang === 'wo' ? 'fr-SN' : 'fr-FR';
    // Rhythme doux, posé et chaleureux d'une Bajenu Gox
    utterance.rate = spokenLang === 'wo' ? 0.88 : 0.92;
    utterance.pitch = spokenLang === 'wo' ? 1.02 : 1.05;

    // Détection de voix naturelle féminine / française si disponible
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const preferred = voices.find(v =>
        (v.lang.startsWith('fr') || v.lang.startsWith('wo')) &&
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Amélie') || v.name.includes('Audrey'))
      ) || voices.find(v => v.lang.startsWith('fr'));
      if (preferred) utterance.voice = preferred;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setActiveVoiceMsgId(msgId);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveVoiceMsgId(null);
      if (isVoiceCallMode && recognitionRef.current) {
        setTimeout(() => startListening(), 500);
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
      } catch (_) {}
    } else {
      alert("Votre navigateur ne supporte pas l'entrée vocale directe. Vous pouvez écrire votre message ci-dessous.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) {}
    }
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) stopListening();
    else startListening();
  };

  // Envoi d'un message avec appel API Backend (/api/chat)
  const handleSendMessage = async (textToSend = null) => {
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

    try {
      // 1. Appel API Backend /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          lang: lang
        })
      });

      let aiResult;
      if (response.ok) {
        const data = await response.json();
        aiResult = {
          text: data.reply,
          phoneticSpeech: data.phoneticSpeech,
          suggestions: data.suggestions || [],
          isEmergency: !!data.isEmergency,
          engine: data.engine || 'backend-api'
        };
      } else {
        const fallback = fallbackFindAnswer(text, lang);
        aiResult = {
          ...fallback,
          phoneticSpeech: lang === 'wo' ? toWolofPhoneticSpeech(fallback.text) : fallback.text
        };
      }

      const aiMsgId = `ai-${Date.now()}`;
      const aiMessage = {
        id: aiMsgId,
        sender: 'assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: aiResult.text,
        phoneticSpeech: aiResult.phoneticSpeech,
        suggestions: aiResult.suggestions,
        isEmergency: aiResult.isEmergency
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);

      if (autoSpeak || isVoiceCallMode) {
        speakText(aiResult.text, aiMsgId, lang, aiResult.phoneticSpeech);
      }
    } catch (err) {
      console.warn("Backend API indisponible, utilisation du moteur local de secours:", err.message);
      const fallback = fallbackFindAnswer(text, lang);
      const phonetic = lang === 'wo' ? toWolofPhoneticSpeech(fallback.text) : fallback.text;
      const aiMsgId = `ai-${Date.now()}`;
      const aiMessage = {
        id: aiMsgId,
        sender: 'assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: fallback.text,
        phoneticSpeech: phonetic,
        suggestions: fallback.suggestions,
        isEmergency: fallback.isEmergency
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);

      if (autoSpeak || isVoiceCallMode) {
        speakText(fallback.text, aiMsgId, lang, phonetic);
      }
    }
  };

  // Traduction d'un message spécifique du chat via l'API /api/translate
  const handleTranslateMessage = async (msgId, text, currentMsgLang) => {
    const target = currentMsgLang === 'wo' ? 'fr' : 'wo';
    setTranslatingMsgId(msgId);

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sourceLang: currentMsgLang,
          targetLang: target
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? {
                  ...m,
                  translation: {
                    text: data.translatedText,
                    phoneticSpeech: data.phoneticSpeech,
                    targetLang: target,
                    confidence: data.confidence,
                    engine: data.engine
                  }
                }
              : m
          )
        );
      }
    } catch (err) {
      console.error("Erreur de traduction:", err);
    } finally {
      setTranslatingMsgId(null);
    }
  };

  // Traduction dédiée dans l'onglet Traducteur
  const handleExecuteTranslation = async (customText = null) => {
    const textToTranslate = (customText !== null ? customText : transSourceText).trim();
    if (!textToTranslate) return;

    setIsTranslating(true);
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToTranslate,
          sourceLang: transSourceLang,
          targetLang: transTargetLang
        })
      });

      if (res.ok) {
        const data = await res.json();
        setTransResult(data);
      }
    } catch (err) {
      console.error("Erreur appel traduction:", err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSwapTranslationLanguages = () => {
    const prevSrc = transSourceLang;
    const prevTgt = transTargetLang;
    setTransSourceLang(prevTgt);
    setTransTargetLang(prevSrc);
    if (transResult?.translatedText) {
      setTransSourceText(transResult.translatedText);
      setTransResult(null);
    }
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
              IA Sutura • Vocal, Écrit & Traduction
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
              <span className="absolute inset-0 rounded-full bg-[#902e2a] animate-ping opacity-25"></span>
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
          className="fixed bottom-22 md:bottom-24 right-2 md:right-6 z-50 w-[calc(100vw-1rem)] sm:w-[440px] max-h-[85vh] h-[660px] bg-white/95 backdrop-blur-2xl rounded-3xl border border-[#ddc0bd]/80 shadow-[0_16px_48px_rgba(0,0,0,0.18)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200"
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
                    API Active
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
                <span>{isVoiceCallMode ? 'Vocal' : 'Voix'}</span>
              </button>

              <button
                type="button"
                onClick={() => setLang && setLang(lang === 'wo' ? 'fr' : 'wo')}
                className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold flex items-center gap-1 transition-colors"
                title="Changer de langue principale"
              >
                <span className="material-symbols-outlined text-[12px]">translate</span>
                <span>{lang === 'wo' ? 'Wolof' : 'FR'}</span>
              </button>

              <button
                type="button"
                onClick={clearChat}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                title="Effacer la discussion"
              >
                <span className="material-symbols-outlined text-[15px]">restart_alt</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors ml-0.5"
                title="Réduire"
              >
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>
            </div>
          </div>

          {/* SÉLECTEUR DE MODE : DISCUSSION IA vs TRADUCTEUR WOLOF */}
          <div className="bg-[#eaeef8] px-3 py-1.5 border-b border-[#ddc0bd]/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-full border border-[#ddc0bd]/50">
              <button
                type="button"
                onClick={() => setActiveTabMode('chat')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                  activeTabMode === 'chat'
                    ? 'bg-[#902e2a] text-white shadow-xs'
                    : 'text-[#574240] hover:text-[#902e2a]'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">chat</span>
                <span>Discussion IA</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabMode('translator')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all ${
                  activeTabMode === 'translator'
                    ? 'bg-[#902e2a] text-white shadow-xs'
                    : 'text-[#574240] hover:text-[#902e2a]'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">translate</span>
                <span>Traducteur Wolof API</span>
              </button>
            </div>

            <span className="text-[10px] text-[#2c694e] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2c694e] animate-pulse"></span>
              Backend API
            </span>
          </div>

          {/* =========================================================================
              VUE 1 : DISCUSSION CHATBOT IA
              ========================================================================= */}
          {activeTabMode === 'chat' && (
            <>
              {isVoiceCallMode && (
                <div className="bg-[#ffe3c7] border-b border-[#fcba67]/40 px-3 py-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
                    <span className="text-[11px] font-bold text-[#724600]">
                      {isListening
                        ? "À votre écoute... parlez librement"
                        : isSpeaking
                        ? "Sutura AI vous répond à voix haute..."
                        : "Conversation vocale active"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-3 bg-[#724600] rounded-full animate-pulse"></span>
                    <span className="w-1 h-5 bg-[#724600] rounded-full animate-bounce"></span>
                    <span className="w-1 h-2 bg-[#724600] rounded-full animate-pulse"></span>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-[#f8f9ff]/50">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1 max-w-[92%] ${
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
                        <div className="whitespace-pre-wrap font-sans">
                          {msg.text}
                        </div>

                        {/* Bloc de Traduction Automatique (si demandée) */}
                        {msg.translation && (
                          <div className="mt-2.5 pt-2 border-t border-[#ddc0bd]/40 bg-[#f8f9ff] p-2.5 rounded-xl flex flex-col gap-1">
                            <div className="flex items-center justify-between text-[10px] text-[#724600] font-bold">
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[13px]">g_translate</span>
                                Traduction ({msg.translation.targetLang === 'wo' ? 'Wolof' : 'Français'}) :
                              </span>
                              <span className="text-[9px] text-[#574240]/80">
                                {Math.round(msg.translation.confidence * 100)}% précision
                              </span>
                            </div>
                            <div className="text-xs text-[#171c23] font-medium italic">
                              {msg.translation.text}
                            </div>
                            <button
                              type="button"
                              onClick={() => speakText(msg.translation.text, `trans-${msg.id}`, msg.translation.targetLang, msg.translation.phoneticSpeech)}
                              className="self-start text-[10px] text-[#902e2a] font-bold flex items-center gap-1 mt-1 hover:underline cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[13px]">volume_up</span>
                              Écouter la traduction
                            </button>
                          </div>
                        )}

                        {/* Si alerte d'urgence */}
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
                          </div>
                        )}

                        {/* Barre d'actions du message */}
                        <div className="mt-2 pt-1.5 border-t border-[#ddc0bd]/30 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            {!isUser && (
                              <button
                                type="button"
                                onClick={() => speakText(msg.text, msg.id, lang, msg.phoneticSpeech)}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                                  isSpeaking && activeVoiceMsgId === msg.id
                                    ? 'bg-[#902e2a] text-white animate-pulse'
                                    : 'bg-[#eaeef8] hover:bg-[#dee2ec] text-[#724600]'
                                }`}
                                title="Écouter à la voix"
                              >
                                <span className="material-symbols-outlined text-[13px]">
                                  {isSpeaking && activeVoiceMsgId === msg.id ? 'stop' : 'volume_up'}
                                </span>
                                <span>{lang === 'wo' ? 'Déglul' : 'Écouter'}</span>
                              </button>
                            )}

                            {/* Bouton Traduire via l'API Wolof */}
                            {!msg.translation && (
                              <button
                                type="button"
                                onClick={() => handleTranslateMessage(msg.id, msg.text, lang)}
                                disabled={translatingMsgId === msg.id}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#eaeef8] hover:bg-[#dee2ec] text-[#902e2a] transition-all cursor-pointer"
                                title="Traduire ce message avec l'API Wolof"
                              >
                                <span className="material-symbols-outlined text-[12px]">translate</span>
                                <span>
                                  {translatingMsgId === msg.id
                                    ? 'Traduction...'
                                    : lang === 'wo'
                                    ? 'Farañse'
                                    : 'Wolof'}
                                </span>
                              </button>
                            )}
                          </div>

                          <span className="text-[9px] text-[#574240]/70">{msg.time}</span>
                        </div>
                      </div>

                      {/* Suggestions sous la bulle */}
                      {!isUser && msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {msg.suggestions.map((sugg, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleSendMessage(sugg)}
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

              {/* Prévisualisation microphone */}
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

              {/* Saisie texte & micro */}
              <div className="p-2.5 bg-white border-t border-[#ddc0bd]/50 flex flex-col gap-1.5 shrink-0">
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
                  <span className="text-[9px] text-[#2c694e] font-bold">API Backend Connectée</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#eaeef8] rounded-2xl p-1 border border-[#ddc0bd]/60 focus-within:border-[#902e2a] focus-within:bg-white transition-all">
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isListening
                        ? 'bg-[#ba1a1a] text-white animate-pulse'
                        : 'bg-white hover:bg-[#dee2ec] text-[#902e2a] shadow-xs'
                    }`}
                    title="Parler au micro"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isListening ? 'mic' : 'mic_none'}
                    </span>
                  </button>

                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder={
                      lang === 'wo'
                        ? "Bindal sa laaj walla nga bës ci micro bi..."
                        : "Écrivez ou dictez votre question santé..."
                    }
                    className="flex-1 bg-transparent border-none outline-none text-xs text-[#171c23] placeholder-[#574240]/60 px-2 py-1.5"
                  />

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
            </>
          )}

          {/* =========================================================================
              VUE 2 : TRADUCTEUR DÉDIÉ WOLOF <-> FRANÇAIS (API BACKEND)
              ========================================================================= */}
          {activeTabMode === 'translator' && (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 bg-[#f8f9ff]/70">
              {/* Sélecteur de direction de traduction */}
              <div className="bg-white p-2.5 rounded-2xl border border-[#ddc0bd]/60 shadow-xs flex items-center justify-between">
                <span className="text-xs font-bold text-[#902e2a] flex items-center gap-1.5">
                  <span className="text-base">{transSourceLang === 'fr' ? '🇫🇷' : '🇸🇳'}</span>
                  <span>{transSourceLang === 'fr' ? 'Français' : 'Wolof'}</span>
                </span>

                <button
                  type="button"
                  onClick={handleSwapTranslationLanguages}
                  className="w-8 h-8 rounded-full bg-[#eaeef8] hover:bg-[#dee2ec] text-[#902e2a] flex items-center justify-center transition-all active:rotate-180"
                  title="Inverser les langues"
                >
                  <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
                </button>

                <span className="text-xs font-bold text-[#2c694e] flex items-center gap-1.5">
                  <span className="text-base">{transTargetLang === 'wo' ? '🇸🇳' : '🇫🇷'}</span>
                  <span>{transTargetLang === 'wo' ? 'Wolof (Wolofal)' : 'Français'}</span>
                </span>
              </div>

              {/* Zone de texte source */}
              <div className="flex flex-col gap-1.5 bg-white p-3 rounded-2xl border border-[#ddc0bd]/60 shadow-xs">
                <div className="flex items-center justify-between text-[11px] text-[#574240] font-semibold">
                  <span>Texte à traduire :</span>
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isListening ? 'bg-[#ba1a1a] text-white animate-pulse' : 'bg-[#eaeef8] text-[#902e2a]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px]">mic</span>
                    <span>Dicter</span>
                  </button>
                </div>

                <textarea
                  rows={3}
                  value={transSourceText}
                  onChange={(e) => setTransSourceText(e.target.value)}
                  placeholder={
                    transSourceLang === 'fr'
                      ? "Ex : J'ai des maux de tête violents et de la fièvre..."
                      : "Ex : Metti bopp bu tar ak yaram bu tang..."
                  }
                  className="w-full text-xs text-[#171c23] outline-none resize-none border-none bg-transparent"
                />

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => handleExecuteTranslation()}
                    disabled={isTranslating || !transSourceText.trim()}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#902e2a] to-[#ba1a1a] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {isTranslating ? 'sync' : 'translate'}
                    </span>
                    <span>{isTranslating ? 'Traduction API...' : 'Traduire en direct'}</span>
                  </button>
                </div>
              </div>

              {/* Résultat de la traduction */}
              {transResult && (
                <div className="bg-gradient-to-br from-[#ffe3c7]/60 to-[#ffd1b3]/40 border border-[#fcba67]/50 p-3.5 rounded-2xl shadow-xs flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#724600]">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">verified</span>
                      Traduction officielle Sutura API ({transResult.targetLang === 'wo' ? 'Wolof' : 'Français'})
                    </span>
                    <span className="text-[10px] bg-white/80 px-2 py-0.5 rounded-full">
                      Score : {Math.round(transResult.confidence * 100)}%
                    </span>
                  </div>

                  <div className="text-sm text-[#2a1700] font-serif font-bold leading-relaxed">
                    {transResult.translatedText}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#fcba67]/30">
                    <button
                      type="button"
                      onClick={() => speakText(transResult.translatedText, 'trans-box', transResult.targetLang, transResult.phoneticSpeech)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#724600] text-white text-xs font-bold shadow-xs active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[15px]">volume_up</span>
                      <span>Écouter la prononciation</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(transResult.translatedText);
                        alert("Texte traduit copié dans le presse-papier !");
                      }}
                      className="text-[10px] text-[#724600] font-bold hover:underline"
                    >
                      Copier
                    </button>
                  </div>
                </div>
              )}

              {/* Suggestions de phrases médicales courantes */}
              <div className="flex flex-col gap-1.5 pt-2">
                <span className="text-[11px] font-bold text-[#574240]">Phrases médicales rapides :</span>
                <div className="flex flex-wrap gap-1">
                  {[
                    "Consultation prénatale",
                    "J'ai des maux de tête",
                    "Saignement vaginal",
                    "Aliments riches en fer",
                    "Allaitement maternel",
                    "Appelez le SAMU 1515"
                  ].map((phrase, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setTransSourceText(phrase);
                        setTransSourceLang('fr');
                        setTransTargetLang('wo');
                        handleExecuteTranslation(phrase);
                      }}
                      className="px-2.5 py-1 rounded-full bg-white hover:bg-[#eaeef8] text-[#902e2a] border border-[#ddc0bd]/60 text-[10px] font-semibold shadow-xs"
                    >
                      ⚡ {phrase}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
