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
    { id: 'hygiene', label: 'Hygiène & Soins' },
    { id: 'postpartum', label: 'Post-Partum' }
  ];

  return (
    <div className="flex flex-col w-full px-4 gap-4">
      {/* 1. EN-TÊTE HÉRO STITCH EXACT */}
      <section className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-3 border border-[#ddc0bd]/30">
        <div className="flex items-center justify-between">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6875rem] font-bold"
            style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
          >
            <span className="material-symbols-outlined text-[14px]">offline_pin</span>
            <span>Contenu 100% hors-ligne (&lt; 2 Mo)</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e4e8f2] text-[#574240] text-[0.6875rem] font-bold">
            <span className="material-symbols-outlined text-[14px]" style={{ color: '#2c694e' }}>
              verified
            </span>
            <span>Ministère Santé SN</span>
          </span>
        </div>

        <div>
          <h1 className="text-[1.375rem] font-serif font-bold text-[#171c23] leading-tight">
            Conseils &amp; Bien-être Maternel
          </h1>
          <p className="text-[0.8125rem] text-[#574240] mt-0.5 leading-snug">
            Fiches pratiques locales, remèdes sains et dignité intime guidés par la tradition bienveillante et la médecine.
          </p>
        </div>

        {/* Master Voice Prompt Capsule Stitch Exact */}
        <div className="p-3.5 rounded-xl bg-[#eaeef8] shadow-xs flex flex-col gap-2 relative overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <button
                aria-label="Écouter l'introduction audio en Wolof"
                onClick={() => toggleAudio()}
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-transform ${
                  isPlaying ? 'animate-pulse' : ''
                }`}
                style={{ backgroundColor: '#902e2a', color: '#ffffff' }}
                type="button"
              >
                <span className="material-symbols-outlined text-[26px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <div className="flex flex-col min-w-0">
                <span className="text-[0.9375rem] text-[#171c23] font-bold font-serif truncate">
                  Déglul ci Wolof : Tànn benn xalaat
                </span>
                <span className="text-[0.6875rem] text-[#574240] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]" style={{ color: '#724600' }}>
                    record_voice_over
                  </span>
                  <span>Voix douce maternelle • 02:15</span>
                </span>
              </div>
            </div>
            <span
              className="text-[0.6875rem] px-2.5 py-0.5 rounded-full font-bold"
              style={{ backgroundColor: '#ffddb8', color: '#2a1700' }}
            >
              Wolof / FR
            </span>
          </div>
        </div>

        {/* Filtres de Thématiques */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTheme(t.id)}
              className={`min-h-[36px] px-3 py-1 rounded-full text-[0.8125rem] font-bold shrink-0 transition-all ${
                activeTheme === t.id
                  ? 'bg-[#902e2a] text-white shadow-xs'
                  : 'bg-[#f0f4fd] text-[#574240] hover:bg-[#eaeef8]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* 2. CARTES CONSEILS NUTRITION LOCALE AVEC IMAGES STITCH */}
      <section className="flex flex-col gap-3">
        {(activeTheme === 'all' || activeTheme === 'nutrition') && (
          <>
            {/* Carte Nutrition 1 : Moringa (Nebeday) & Fer */}
            <article className="bg-white rounded-2xl p-4 shadow-sm border border-[#ddc0bd]/30 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <img
                  className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-xs"
                  alt="Moringa feuilles fraîches et poudre"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHCoABKs967FWzDGsYxNhzIPUuo7vX4EHkZx9ZmkpF61Y1pqqFwXdZDcpa5Ces2_VV9M2lIMZnONbSlGCQFqfPRwbfBg1bq2oK56w-Zh2kRsgc79n6OV6mpHDObe2Xfuu0EbxJlXpL-LKzyDfFIk2A_vaVav3MD0fL971JsUy1GCpkVz0HqbvQtLtvkHqSbd9Z_okvp1x_F5tYJcLrJ440Qr0VoCiPDbHAlHH6Dig"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.6875rem] uppercase font-bold" style={{ color: '#724600' }}>
                      Aliment Miracle Local
                    </span>
                    <span
                      className="text-[0.6875rem] px-2 py-0.5 rounded-full font-bold"
                      style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
                    >
                      Fer &amp; Vitalité
                    </span>
                  </div>
                  <h3 className="text-[1.125rem] font-bold text-[#171c23] font-serif leading-tight mt-0.5">
                    Feuilles de Moringa (Nebeday)
                  </h3>
                  <p className="text-[0.8125rem] text-[#574240] mt-1 leading-snug">
                    Riches en fer, calcium et protéines végétales. Saupoudrez la poudre séchée dans votre soupe ou sauces quotidiennes.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#f0f4fd]">
                <span className="text-[0.6875rem] text-[#574240]">Recommandé dès le 1er trimestre</span>
                <button
                  type="button"
                  onClick={() => toggleAudio("Moringa bi walla nebeday dafa am fer bu bare, baax na lool ci birr bi.")}
                  className="text-[0.8125rem] font-bold inline-flex items-center gap-1"
                  style={{ color: '#902e2a' }}
                >
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                  <span>Audio Wolof</span>
                </button>
              </div>
            </article>

            {/* Carte Nutrition 2 : Jus de Bouye & Vitamine C */}
            <article className="bg-white rounded-2xl p-4 shadow-sm border border-[#ddc0bd]/30 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div
                  className="w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0"
                  style={{ backgroundColor: '#ffddb8', color: '#724600' }}
                >
                  <span className="material-symbols-outlined text-[32px]">local_cafe</span>
                  <span className="text-[0.6875rem] font-bold mt-0.5">Bouye</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.6875rem] uppercase font-bold" style={{ color: '#724600' }}>
                      Énergie Saine
                    </span>
                    <span className="text-[0.6875rem] px-2 py-0.5 rounded-full font-bold bg-[#eaeef8] text-[#171c23]">
                      Vitamine C
                    </span>
                  </div>
                  <h3 className="text-[1.125rem] font-bold text-[#171c23] font-serif leading-tight mt-0.5">
                    Pain de Singe (Jus de Bouye naturel)
                  </h3>
                  <p className="text-[0.8125rem] text-[#574240] mt-1 leading-snug">
                    Facilite l'assimilation du fer et soulage les nausées matinales. À consommer frais et peu sucré.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#f0f4fd]">
                <span className="text-[0.6875rem] text-[#574240]">Anti-nausée éprouvé</span>
                <button
                  type="button"
                  onClick={() => toggleAudio("Naanatal ndoxum bouye mu bañ a bare suukër, dina dindi yaram buy méti.")}
                  className="text-[0.8125rem] font-bold inline-flex items-center gap-1"
                  style={{ color: '#902e2a' }}
                >
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                  <span>Audio Wolof</span>
                </button>
              </div>
            </article>
          </>
        )}

        {(activeTheme === 'all' || activeTheme === 'hygiene') && (
          /* Carte Hygiène & Repos */
          <article className="bg-white rounded-2xl p-4 shadow-sm border border-[#ddc0bd]/30 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div
                className="w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0"
                style={{ backgroundColor: '#ffdad6', color: '#93000a' }}
              >
                <span className="material-symbols-outlined text-[32px]">bedtime</span>
                <span className="text-[0.6875rem] font-bold mt-0.5">Nopalu</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[0.6875rem] uppercase font-bold" style={{ color: '#902e2a' }}>
                    Sommeil &amp; Posture
                  </span>
                  <span className="text-[0.6875rem] px-2 py-0.5 rounded-full font-bold bg-[#ffdad6] text-[#ba1a1a]">
                    Indispensable
                  </span>
                </div>
                <h3 className="text-[1.125rem] font-bold text-[#171c23] font-serif leading-tight mt-0.5">
                  Dormir sur le côté gauche
                </h3>
                <p className="text-[0.8125rem] text-[#574240] mt-1 leading-snug">
                  Améliore la circulation sanguine vers le fœtus et réduit l'œdème aux chevilles sous la chaleur sahélienne.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-[#f0f4fd]">
              <span className="text-[0.6875rem] text-[#574240]">Recommandé par les sages-femmes</span>
              <button
                type="button"
                onClick={() => toggleAudio("Tëddël ci sa wetu cammooñ ngir déret bi di dox bu baax ci liir bi.")}
                className="text-[0.8125rem] font-bold inline-flex items-center gap-1"
                style={{ color: '#902e2a' }}
              >
                <span className="material-symbols-outlined text-[16px]">volume_up</span>
                <span>Audio Wolof</span>
              </button>
            </div>
          </article>
        )}

        {(activeTheme === 'all' || activeTheme === 'postpartum') && (
          /* Carte Post-Partum & Allaitement */
          <article className="bg-white rounded-2xl p-4 shadow-sm border border-[#ddc0bd]/30 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div
                className="w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0"
                style={{ backgroundColor: '#aeeecb', color: '#2c694e' }}
              >
                <span className="material-symbols-outlined text-[32px]">child_friendly</span>
                <span className="text-[0.6875rem] font-bold mt-0.5">Liir bi</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[0.6875rem] uppercase font-bold" style={{ color: '#2c694e' }}>
                    6 Premiers Mois
                  </span>
                  <span
                    className="text-[0.6875rem] px-2 py-0.5 rounded-full font-bold"
                    style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
                  >
                    Exclusif OMS
                  </span>
                </div>
                <h3 className="text-[1.125rem] font-bold text-[#171c23] font-serif leading-tight mt-0.5">
                  Allaitement Maternel Exclusif
                </h3>
                <p className="text-[0.8125rem] text-[#574240] mt-1 leading-snug">
                  Le colostrum (premier lait) est le premier vaccin de votre enfant. Pas d'eau ni de tisane avant 6 mois.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-[#f0f4fd]">
              <span className="text-[0.6875rem] text-[#574240]">Protection immunitaire complète</span>
              <button
                type="button"
                onClick={() => toggleAudio("Mbell mi mooy gën a baax ci wér-gi-yaramu liir bi. Bul ko jox ndox ba mu am juróom-benn weer.")}
                className="text-[0.8125rem] font-bold inline-flex items-center gap-1"
                style={{ color: '#902e2a' }}
              >
                <span className="material-symbols-outlined text-[16px]">volume_up</span>
                <span>Audio Wolof</span>
              </button>
            </div>
          </article>
        )}
      </section>

      {/* 3. PAROLES DE BADIEN GOX (CITATIONS DIGNITÉ & SUTURA) */}
      <section
        className="rounded-2xl p-4 shadow-sm flex flex-col gap-2 border border-[#ffb3ac]/50"
        style={{
          background: 'linear-gradient(135deg, #ffddb8 0%, #ffffff 100%)',
        }}
      >
        <div className="flex items-center gap-2" style={{ color: '#724600' }}>
          <span className="material-symbols-outlined text-[20px]">format_quote</span>
          <span className="text-[0.6875rem] font-bold uppercase tracking-wider">
            Conseil Traditionnel Positif
          </span>
        </div>
        <p className="text-[0.9375rem] font-serif italic text-[#2a1700] leading-snug">
          « Sutura ci wàllu wér-gi-yaram dafay may jigéen bi kersa ak kóolëre. Ñun Badien Gox yi dañu fi nekk ngir jàppale la. »
        </p>
        <span className="text-[0.6875rem] text-[#574240] font-semibold">
          — Réseau National des Badien Gox du Sénégal
        </span>
      </section>
    </div>
  );
}
