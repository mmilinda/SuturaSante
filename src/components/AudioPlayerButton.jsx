import React, { useState } from 'react';

export default function AudioPlayerButton({
  textToSpeak,
  lang = 'wo',
  label,
  subtitle,
  variant = 'banner', // 'banner' (grand format Stitch) ou 'chip' (format compact)
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
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = lang === 'wo' ? 'fr-SN' : 'fr-FR';
      utterance.rate = 0.9;
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        setIsPlaying(true);
        if (onPlayRecord) onPlayRecord(lang);
      };

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Votre navigateur ne supporte pas l'audio automatique.");
    }
  };

  if (variant === 'banner') {
    return (
      <div className="w-full bg-tertiary-fixed text-on-tertiary-fixed rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[20px] text-tertiary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              volume_up
            </span>
            <span className="text-[11px] uppercase tracking-wider text-tertiary font-extrabold">
              Assistance Vocale Guidée
            </span>
          </div>
          <span className="text-[10px] bg-surface-container-lowest/90 text-on-tertiary-fixed px-2.5 py-0.5 rounded-full font-bold shadow-xs">
            {lang === 'wo' ? 'Wolof (Wolofal)' : 'Français'}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={handleSpeak}
              type="button"
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform flex-shrink-0 ${
                isPlaying ? 'bg-primary text-on-primary animate-pulse' : 'bg-tertiary text-on-tertiary'
              }`}
              title="Lancer la lecture audio"
            >
              <span className="material-symbols-outlined text-[26px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm truncate leading-tight text-on-tertiary-fixed">
                {label || (lang === 'wo' ? 'Déglul ci Wolof' : 'Écouter en Français')}
              </span>
              <span className="text-xs text-on-tertiary-fixed/80 truncate">
                {subtitle || (lang === 'wo' ? 'Saytu sa birr ak waxtu CPN' : 'Explications détaillées à la voix')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 h-7 px-2.5 flex-shrink-0 bg-surface-container-lowest/60 rounded-full">
            <span className={`w-1 h-3 bg-tertiary rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></span>
            <span className={`w-1 h-4 bg-tertiary rounded-full ${isPlaying ? 'animate-bounce' : ''}`}></span>
            <span className={`w-1 h-2 bg-tertiary rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></span>
            <span className="text-[10px] ml-1 text-on-tertiary-fixed font-bold">
              {isPlaying ? 'Audio ON' : '01:45'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Format compact (pour cartes et éléments de liste)
  return (
    <button
      onClick={handleSpeak}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
        isPlaying
          ? 'bg-primary text-on-primary animate-pulse shadow-sm'
          : 'bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary hover:text-on-tertiary'
      }`}
      title="Écouter ce passage en Wolof"
    >
      <span className="material-symbols-outlined text-[16px]">
        {isPlaying ? 'volume_off' : 'volume_up'}
      </span>
      <span>{label || (lang === 'wo' ? 'Déglul' : 'Écouter')}</span>
    </button>
  );
}
