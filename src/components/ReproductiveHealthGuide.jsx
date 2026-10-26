import React, { useState } from 'react';

export default function ReproductiveHealthGuide({ lang, onActionTrack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTheme, setActiveTheme] = useState('all');

  const toggleAudio = (text) => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const u = new SpeechSynthesisUtterance(
          text || "Dalal ak jamm. Ñun Badien Gox yi ñooy sa nijaat ci wàllu wér-gi-yaram. Lekkal bu baax, naan ndox bu bari te jël sa fer ak acide folique bés bu nekk."
        );
        u.lang = 'fr-SN';
        u.rate = 0.9;
        u.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(u);
        setIsPlaying(true);
        if (onActionTrack) onActionTrack('audio_listen');
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const themes = [
    { id: 'all', label: 'Tous' },
    { id: 'nutrition', label: 'Nutrition Locale' },
    { id: 'hygiene', label: 'Hygiène & Repos' },
    { id: 'postpartum', label: 'Post-Partum' }
  ];

  return (
    <div className="w-full flex flex-col gap-2 lg:gap-2.5">
      {/* =========================================================================
          1. EN-TÊTE HÉRO ULTRA-COMPACT (1 ligne sur grand écran)
          ========================================================================= */}
      <section className="bg-white rounded-xl shadow-xs p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-[#ddc0bd]/30">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#aeeecb] text-[#316e52]">
              100% Hors-Ligne (&lt; 2 Mo)
            </span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#ffddb8] text-[#2a1700]">
              Wolof / FR
            </span>
          </div>
          <h1 className="text-base sm:text-lg lg:text-xl font-serif font-bold text-[#171c23] leading-tight">
            Conseils Médicaux &amp; Bien-être Maternel
          </h1>
        </div>

        {/* Bouton Voice Master */}
        <button
          onClick={() => toggleAudio()}
          className="min-h-[32px] sm:min-h-[34px] px-3 rounded-full bg-[#eaeef8] hover:bg-[#dee2ec] flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
              isPlaying ? 'animate-pulse' : ''
            }`}
            style={{ backgroundColor: '#902e2a', color: '#ffffff' }}
          >
            <span className="material-symbols-outlined text-[15px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </div>
          <span className="text-xs font-bold text-[#171c23]">
            {isPlaying ? 'Audio en cours' : 'Déglul ci Wolof'}
          </span>
        </button>
      </section>

      {/* FILTRES DE THÉMATIQUES */}
      <div className="flex items-center gap-1.5 overflow-x-auto">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTheme(t.id)}
            className={`min-h-[28px] px-3 rounded-full text-xs font-bold shrink-0 transition-all ${
              activeTheme === t.id
                ? 'bg-[#902e2a] text-white shadow-xs'
                : 'bg-white border border-[#ddc0bd]/40 text-[#574240] hover:bg-[#eaeef8]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* =========================================================================
          2. LES 4 FICHES PRATIQUES EN 4 COLONNES SUR BUREAU (SANS SCROLL)
          ========================================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {/* Fiche 1 : Moringa */}
        <article className="bg-white rounded-xl p-2.5 shadow-xs border border-[#ddc0bd]/30 flex flex-col justify-between gap-2 hover:border-[#2c694e]/40 transition-colors">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase font-bold text-[#724600]">Aliment Miracle</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#aeeecb] text-[#316e52]">
                Fer &amp; Vitalité
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10 rounded-lg object-cover shrink-0"
                alt="Moringa"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHCoABKs967FWzDGsYxNhzIPUuo7vX4EHkZx9ZmkpF61Y1pqqFwXdZDcpa5Ces2_VV9M2lIMZnONbSlGCQFqfPRwbfBg1bq2oK56w-Zh2kRsgc79n6OV6mpHDObe2Xfuu0EbxJlXpL-LKzyDfFIk2A_vaVav3MD0fL971JsUy1GCpkVz0HqbvQtLtvkHqSbd9Z_okvp1x_F5tYJcLrJ440Qr0VoCiPDbHAlHH6Dig"
              />
              <h3 className="text-xs font-bold font-serif text-[#171c23] leading-tight">
                Feuilles de Moringa (Nebeday)
              </h3>
            </div>
            <p className="text-[10px] text-[#574240] leading-tight">
              Riches en fer et calcium. Saupoudrez la poudre dans votre soupe pour booster l'hémoglobine.
            </p>
          </div>
          <div className="pt-1.5 border-t border-[#f0f4fd] flex items-center justify-between">
            <span className="text-[9px] text-[#574240]">Dès T1</span>
            <button
              type="button"
              onClick={() => toggleAudio("Moringa bi dafa am fer bu bare, baax na ci birr bi.")}
              className="text-[10px] font-bold inline-flex items-center gap-0.5 text-[#902e2a]"
            >
              <span className="material-symbols-outlined text-[13px]">volume_up</span>
              <span>Audio</span>
            </button>
          </div>
        </article>

        {/* Fiche 2 : Bouye */}
        <article className="bg-white rounded-xl p-2.5 shadow-xs border border-[#ddc0bd]/30 flex flex-col justify-between gap-2 hover:border-[#fcba67]/60 transition-colors">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase font-bold text-[#724600]">Énergie Saine</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#eaeef8] text-[#171c23]">
                Vitamine C
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#ffddb8', color: '#724600' }}
              >
                <span className="material-symbols-outlined text-[20px]">local_cafe</span>
              </div>
              <h3 className="text-xs font-bold font-serif text-[#171c23] leading-tight">
                Pain de Singe (Jus de Bouye)
              </h3>
            </div>
            <p className="text-[10px] text-[#574240] leading-tight">
              Facilite l'absorption digestive du fer prescrit et soulage les nausées matinales.
            </p>
          </div>
          <div className="pt-1.5 border-t border-[#f0f4fd] flex items-center justify-between">
            <span className="text-[9px] text-[#574240]">Anti-nausée</span>
            <button
              type="button"
              onClick={() => toggleAudio("Naanatal ndoxum bouye mu bañ a bare suukër.")}
              className="text-[10px] font-bold inline-flex items-center gap-0.5 text-[#902e2a]"
            >
              <span className="material-symbols-outlined text-[13px]">volume_up</span>
              <span>Audio</span>
            </button>
          </div>
        </article>

        {/* Fiche 3 : Sommeil Côté Gauche */}
        <article className="bg-white rounded-xl p-2.5 shadow-xs border border-[#ddc0bd]/30 flex flex-col justify-between gap-2 hover:border-[#ba1a1a]/40 transition-colors">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase font-bold text-[#902e2a]">Sommeil</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#ffdad6] text-[#ba1a1a]">
                Posture clé
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#ffdad6', color: '#93000a' }}
              >
                <span className="material-symbols-outlined text-[20px]">bedtime</span>
              </div>
              <h3 className="text-xs font-bold font-serif text-[#171c23] leading-tight">
                Dormir sur le côté gauche
              </h3>
            </div>
            <p className="text-[10px] text-[#574240] leading-tight">
              Optimise le flux sanguin et l'oxygénation fœtale en libérant la veine cave.
            </p>
          </div>
          <div className="pt-1.5 border-t border-[#f0f4fd] flex items-center justify-between">
            <span className="text-[9px] text-[#574240]">Conseil Sage-Femme</span>
            <button
              type="button"
              onClick={() => toggleAudio("Tëddël ci sa wetu cammooñ ngir déret bi di dox bu baax.")}
              className="text-[10px] font-bold inline-flex items-center gap-0.5 text-[#902e2a]"
            >
              <span className="material-symbols-outlined text-[13px]">volume_up</span>
              <span>Audio</span>
            </button>
          </div>
        </article>

        {/* Fiche 4 : Allaitement Exclusif */}
        <article className="bg-white rounded-xl p-2.5 shadow-xs border border-[#ddc0bd]/30 flex flex-col justify-between gap-2 hover:border-[#2c694e]/40 transition-colors">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase font-bold text-[#2c694e]">6 Premiers Mois</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#aeeecb] text-[#316e52]">
                Norme OMS
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#aeeecb', color: '#2c694e' }}
              >
                <span className="material-symbols-outlined text-[20px]">child_friendly</span>
              </div>
              <h3 className="text-xs font-bold font-serif text-[#171c23] leading-tight">
                Allaitement Maternel Exclusif
              </h3>
            </div>
            <p className="text-[10px] text-[#574240] leading-tight">
              Le colostrum doré est le premier vaccin naturel du nouveau-né contre les infections.
            </p>
          </div>
          <div className="pt-1.5 border-t border-[#f0f4fd] flex items-center justify-between">
            <span className="text-[9px] text-[#574240]">Immunité bébé</span>
            <button
              type="button"
              onClick={() => toggleAudio("Mbell mi mooy gën a baax ci wér-gi-yaramu liir bi.")}
              className="text-[10px] font-bold inline-flex items-center gap-0.5 text-[#902e2a]"
            >
              <span className="material-symbols-outlined text-[13px]">volume_up</span>
              <span>Audio</span>
            </button>
          </div>
        </article>
      </section>

      {/* =========================================================================
          3. PAROLES DE BADIEN GOX (BANNIÈRE BASSE COMPACTE)
          ========================================================================= */}
      <section
        className="rounded-xl p-2.5 sm:p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-[#ffb3ac]/50"
        style={{ background: 'linear-gradient(135deg, #ffddb8 0%, #ffffff 100%)' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-[20px] text-[#724600] shrink-0">format_quote</span>
          <div className="flex flex-col min-w-0">
            <p className="text-xs font-serif italic text-[#2a1700] truncate">
              « Sutura ci wàllu wér-gi-yaram dafay may jigéen bi kersa ak kóolëre. Ñun Badien Gox yi dañu fi nekk ngir jàppale la. »
            </p>
            <span className="text-[10px] text-[#574240]">
              — Réseau National des Badien Gox du Sénégal
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => toggleAudio()}
          className="min-h-[28px] px-3 rounded-full bg-[#724600] text-white text-xs font-bold flex items-center gap-1 shrink-0 shadow-xs hover:bg-[#902e2a] transition-colors"
        >
          <span className="material-symbols-outlined text-[14px]">record_voice_over</span>
          <span>Écouter</span>
        </button>
      </section>
    </div>
  );
}