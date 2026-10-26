import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function AudioPlayerButton({ textToSpeak, lang = 'fr', label, onPlayRecord }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = lang === 'wo' ? 'fr-SN' : 'fr-FR'; // Fallback phonétique
      utterance.rate = 0.9; // Débit posé pour compréhension aisée
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        setIsPlaying(true);
        if (onPlayRecord) onPlayRecord(lang);
      };

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Votre navigateur ne supporte pas l'audio automatique. Vous pouvez lire le texte ci-dessous.");
    }
  };

  return (
    <button
      onClick={handleSpeak}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm ${
        isPlaying
          ? 'bg-rose-600 text-white animate-pulse'
          : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
      }`}
      title="Écouter ce message à voix haute"
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-3.5 h-3.5" />
          <span>Arrêter l'audio</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-rose-600" />
          <span>{label || (lang === 'wo' ? "Déglul ci Wolof" : "Écouter l'audio")}</span>
          <Sparkles className="w-3 h-3 text-amber-500" />
        </>
      )}
    </button>
  );
}
