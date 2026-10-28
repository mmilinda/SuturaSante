import React, { useState } from 'react';
import { toWolofPhoneticSpeech } from './SuturaAIChatbot';

export default function AudioPlayerButton({
  textToSpeak,
  lang = 'wo',
  label = 'Déglul ci Wolof',
  subtitle = 'Explications du calendrier et de votre stade',
  variant = 'banner',
  onPlayRecord
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      window.speechSynthesis.cancel();
      const spokenContent = lang === 'wo' ? toWolofPhoneticSpeech(textToSpeak) : textToSpeak;
      const utterance = new SpeechSynthesisUtterance(spokenContent);
      utterance.lang = lang === 'wo' ? 'fr-SN' : 'fr-FR';
      // Rythme doux, posé et chaleureux d'une Bajenu Gox
      utterance.rate = lang === 'wo' ? 0.88 : 0.9;
      utterance.pitch = lang === 'wo' ? 1.02 : 1.05;

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const preferredVoice = voices.find(v =>
          (v.lang.startsWith('fr') || v.lang.startsWith('wo')) &&
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Amélie') || v.name.includes('Audrey'))
        ) || voices.find(v => v.lang.startsWith('fr'));
        if (preferredVoice) utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        if (onPlayRecord) onPlayRecord(lang);
      };

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Votre navigateur ne supporte pas la synthèse vocale.");
    }
  };

  if (variant === 'banner') {
    return (
      <div className="w-full bg-[#ffe3c7] text-[#2a1700] rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col gap-2 border border-[#fcba67]/40">
        {/* En-tête de la bannière vocale */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[18px] text-[#724600]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              volume_up
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#724600] font-extrabold">
              ASSISTANCE VOCALE GUIDÉE
            </span>
          </div>
          <span className="text-[10px] bg-white/90 text-[#724600] px-2.5 py-0.5 rounded-full font-bold shadow-xs">
            Wolof / FR
          </span>
        </div>

        {/* Ligne principale : Gros bouton Play Brun Chocolat + Titre + Égaliseur */}
        <div className="flex items-center justify-between gap-3 pt-0.5">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={handleSpeak}
              type="button"
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform flex-shrink-0 ${
                isPlaying ? 'bg-[#902e2a] text-white animate-pulse' : 'bg-[#724600] text-white'
              }`}
              title="Lancer la lecture audio"
            >
              <span className="material-symbols-outlined text-[26px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm truncate leading-tight text-[#2a1700]">
                {label}
              </span>
              <span className="text-xs text-[#2a1700]/75 truncate mt-0.5">
                {subtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 h-7 px-2.5 flex-shrink-0 bg-white/75 rounded-full border border-[#fcba67]/30">
            <span className={`w-1 h-3 bg-[#724600] rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></span>
            <span className={`w-1 h-4 bg-[#724600] rounded-full ${isPlaying ? 'animate-bounce' : ''}`}></span>
            <span className={`w-1 h-2 bg-[#724600] rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></span>
            <span className="text-[10px] ml-1 text-[#2a1700] font-bold">
              {isPlaying ? 'Audio' : '01:45'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Format compact
  return (
    <button
      onClick={handleSpeak}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
        isPlaying
          ? 'bg-[#902e2a] text-white shadow-xs'
          : 'bg-[#ffe3c7] text-[#724600] hover:bg-[#724600] hover:text-white'
      }`}
    >
      <span className="material-symbols-outlined text-[15px]">
        {isPlaying ? 'volume_off' : 'volume_up'}
      </span>
      <span>{label}</span>
    </button>
  );
}
