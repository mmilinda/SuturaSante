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
    { id: 'all', label: 'Tous les conseils' },
    { id: 'nutrition', label: 'Nutrition Locale' },
    { id: 'hygiene', label: 'Hygiène & Repos' },
    { id: 'postpartum', label: 'Post-Partum' }
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. EN-TÊTE HÉRO */}
      <section className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 flex flex-col gap-4 border border-[#ddc0bd]/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#aeeecb] text-[#316e52] inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">offline_pin</span>
              <span>100% Hors-Ligne (&lt; 2 Mo)</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ffddb8] text-[#2a1700]">
              Wolof / Français
            </span>
          </div>

          <button
            onClick={() => toggleAudio()}
            className="min-h-[40px] px-4 rounded-xl bg-[#eaeef8] hover:bg-[#dee2ec] flex items-center gap-2.5 shadow-xs transition-colors shrink-0"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                isPlaying ? 'animate-pulse' : ''
              }`}
              style={{ backgroundColor: '#902e2a', color: '#ffffff' }}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </div>
            <span className="text-xs font-bold text-[#171c23]">
              {isPlaying ? 'Audio en cours' : 'Déglul ci Wolof'}
            </span>
          </button>
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171c23] leading-tight">
            Conseils Médicaux &amp; Bien-être Maternel
          </h1>
          <p className="text-sm text-[#574240] mt-1">
            Fiches pratiques locales, remèdes sains et dignité intime guidés par la tradition bienveillante et la médecine.
          </p>
        </div>

        {/* Filtres de Thématiques */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#f0f4fd]">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTheme(t.id)}
              className={`min-h-[34px] px-4 py-1 rounded-full text-xs font-bold shrink-0 transition-all ${
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

      {/* 2. GRILLE RESPONSIVE DES FICHES CONSEILS (2 ou 3 colonnes) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(activeTheme === 'all' || activeTheme === 'nutrition') && (
          <>
            {/* Carte Nutrition 1 : Moringa */}
            <article className="bg-white rounded-2xl p-5 shadow-sm border border-[#ddc0bd]/40 flex flex-col justify-between gap-4 hover:border-[#2c694e]/50 transition-colors">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-[#724600]">Aliment Miracle Local</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#aeeecb] text-[#316e52]">
                    Fer &amp; Vitalité
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-xs"
                    alt="Moringa"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHCoABKs967FWzDGsYxNhzIPUuo7vX4EHkZx9ZmkpF61Y1pqqFwXdZDcpa5Ces2_VV9M2lIMZnONbSlGCQFqfPRwbfBg1bq2oK56w-Zh2kRsgc79n6OV6mpHDObe2Xfuu0EbxJlXpL-LKzyDfFIk2A_vaVav3MD0fL971JsUy1GCpkVz0HqbvQtLtvkHqSbd9Z_okvp1x_F5tYJcLrJ440Qr0VoCiPDbHAlHH6Dig"
                  />
                  <h3 className="text-base font-bold font-serif text-[#171c23] leading-tight">
                    Feuilles de Moringa (Nebeday)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#574240] leading-relaxed">
                  Riches en fer, calcium et protéines végétales. Saupoudrez la poudre séchée dans votre soupe ou tiéboudienne quotidienne pour stimuler l'hémoglobine.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#f0f4fd]">
                <span className="text-xs text-[#574240]">Dès le 1er trimestre</span>
                <button
                  type="button"
                  onClick={() => toggleAudio("Moringa bi dafa am fer bu bare, baax na lool ci birr bi.")}
                  className="text-xs font-bold inline-flex items-center gap-1 text-[#902e2a]"
                >
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                  <span>Audio Wolof</span>
                </button>
              </div>
            </article>

            {/* Carte Nutrition 2 : Bouye */}
            <article className="bg-white rounded-2xl p-5 shadow-sm border border-[#ddc0bd]/40 flex flex-col justify-between gap-4 hover:border-[#fcba67]/60 transition-colors">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-[#724600]">Énergie Saine</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#eaeef8] text-[#171c23]">
                    Vitamine C
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#ffddb8', color: '#724600' }}
                  >
                    <span className="material-symbols-outlined text-[28px]">local_cafe</span>
                  </div>
                  <h3 className="text-base font-bold font-serif text-[#171c23] leading-tight">
                    Pain de Singe (Jus de Bouye naturel)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#574240] leading-relaxed">
                  Facilite l'absorption digestive du fer prescrit et calme efficacement les nausées matinales. À consommer frais et modérément sucré.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#f0f4fd]">
                <span className="text-xs text-[#574240]">Anti-nausée</span>
                <button
                  type="button"
                  onClick={() => toggleAudio("Naanatal ndoxum bouye mu bañ a bare suukër.")}
                  className="text-xs font-bold inline-flex items-center gap-1 text-[#902e2a]"
                >
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                  <span>Audio Wolof</span>
                </button>
              </div>
            </article>
          </>
        )}

        {(activeTheme === 'all' || activeTheme === 'hygiene') && (
          /* Carte Sommeil & Posture */
          <article className="bg-white rounded-2xl p-5 shadow-sm border border-[#ddc0bd]/40 flex flex-col justify-between gap-4 hover:border-[#ba1a1a]/50 transition-colors">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-[#902e2a]">Sommeil &amp; Posture</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#ffdad6] text-[#ba1a1a]">
                  Indispensable
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#ffdad6', color: '#93000a' }}
                >
                  <span className="material-symbols-outlined text-[28px]">bedtime</span>
                </div>
                <h3 className="text-base font-bold font-serif text-[#171c23] leading-tight">
                  Dormir sur le côté gauche
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#574240] leading-relaxed">
                Optimise le flux sanguin et l'oxygénation du fœtus via la veine cave inférieure. Réduit la rétention d'eau et les jambes lourdes sous forte chaleur.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#f0f4fd]">
              <span className="text-xs text-[#574240]">Conseil Sage-Femme</span>
              <button
                type="button"
                onClick={() => toggleAudio("Tëddël ci sa wetu cammooñ ngir déret bi di dox bu baax ci liir bi.")}
                className="text-xs font-bold inline-flex items-center gap-1 text-[#902e2a]"
              >
                <span className="material-symbols-outlined text-[16px]">volume_up</span>
                <span>Audio Wolof</span>
              </button>
            </div>
          </article>
        )}

        {(activeTheme === 'all' || activeTheme === 'postpartum') && (
          /* Carte Allaitement Exclusif */
          <article className="bg-white rounded-2xl p-5 shadow-sm border border-[#ddc0bd]/40 flex flex-col justify-between gap-4 hover:border-[#2c694e]/50 transition-colors">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-[#2c694e]">6 Premiers Mois</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#aeeecb] text-[#316e52]">
                  Norme OMS
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#aeeecb', color: '#2c694e' }}
                >
                  <span className="material-symbols-outlined text-[28px]">child_friendly</span>
                </div>
                <h3 className="text-base font-bold font-serif text-[#171c23] leading-tight">
                  Allaitement Maternel Exclusif
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#574240] leading-relaxed">
                Le colostrum doré est le premier vaccin naturel du nouveau-né. Il transmet les anticorps protecteurs contre les diarrhées et infections infantiles.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#f0f4fd]">
              <span className="text-xs text-[#574240]">Protection immunitaire</span>
              <button
                type="button"
                onClick={() => toggleAudio("Mbell mi mooy gën a baax ci wér-gi-yaramu liir bi.")}
                className="text-xs font-bold inline-flex items-center gap-1 text-[#902e2a]"
              >
                <span className="material-symbols-outlined text-[16px]">volume_up</span>
                <span>Audio Wolof</span>
              </button>
            </div>
          </article>
        )}
      </section>

      {/* 3. PAROLES DE BADIEN GOX */}
      <section
        className="rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#ffb3ac]/50"
        style={{ background: 'linear-gradient(135deg, #ffddb8 0%, #ffffff 100%)' }}
      >
        <div className="flex flex-col gap-1.5 max-w-3xl">
          <div className="flex items-center gap-2 text-[#724600]">
            <span className="material-symbols-outlined text-[22px]">format_quote</span>
            <span className="text-xs font-bold uppercase tracking-wider">
              Conseil Traditionnel &amp; Dignité Maternelle
            </span>
          </div>
          <p className="text-base sm:text-lg font-serif italic text-[#2a1700] leading-snug">
            « Sutura ci wàllu wér-gi-yaram dafay may jigéen bi kersa ak kóolëre. Ñun Badien Gox yi dañu fi nekk ngir jàppale la ak teeru la ci fajuwaay yi. »
          </p>
          <span className="text-xs text-[#574240]">
            — Réseau National des Badien Gox du Sénégal (Marraines de Santé Communautaire)
          </span>
        </div>

        <button
          type="button"
          onClick={() => toggleAudio()}
          className="min-h-[42px] px-5 rounded-full bg-[#724600] text-white text-xs font-bold flex items-center gap-2 shrink-0 shadow-sm hover:bg-[#902e2a] transition-colors self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
          <span>Écouter le message</span>
        </button>
      </section>
    </div>
  );
}