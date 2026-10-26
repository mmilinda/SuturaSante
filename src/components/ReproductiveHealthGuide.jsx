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
    { id: 'nutrition', label: 'Nutrition Locale Sénégalaise' },
    { id: 'hygiene', label: 'Hygiène & Repos' },
    { id: 'postpartum', label: 'Post-Partum & Allaitement' }
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. EN-TÊTE HÉRO DESKTOP */}
      <section className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4 border border-[#ddc0bd]/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
            >
              <span className="material-symbols-outlined text-[14px]">offline_pin</span>
              <span>Contenu 100% hors-ligne (&lt; 2 Mo)</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e4e8f2] text-[#574240] text-xs font-bold">
              <span className="material-symbols-outlined text-[14px]" style={{ color: '#2c694e' }}>
                verified
              </span>
              <span>Validé Ministère Santé SN</span>
            </span>
          </div>

          <span
            className="text-xs px-3 py-1 rounded-full font-bold w-fit"
            style={{ backgroundColor: '#ffddb8', color: '#2a1700' }}
          >
            Guide Bilingue Wolof / FR
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#171c23]">
              Conseils Médicaux &amp; Bien-être Maternel
            </h1>
            <p className="text-sm text-[#574240] mt-1">
              Fiches pratiques locales, remèdes sains et dignité intime guidés par la tradition bienveillante et la médecine moderne.
            </p>
          </div>

          {/* Master Voice Prompt Capsule */}
          <button
            onClick={() => toggleAudio()}
            className="p-3.5 rounded-xl bg-[#eaeef8] hover:bg-[#dee2ec] shadow-xs flex items-center gap-3 shrink-0 transition-colors cursor-pointer text-left"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                isPlaying ? 'animate-pulse' : ''
              }`}
              style={{ backgroundColor: '#902e2a', color: '#ffffff' }}
            >
              <span className="material-symbols-outlined text-[24px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm text-[#171c23] font-bold font-serif truncate">
                Déglul ci Wolof : Tànn benn xalaat
              </span>
              <span className="text-xs text-[#574240] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]" style={{ color: '#724600' }}>
                  record_voice_over
                </span>
                <span>Voix douce maternelle • 02:15</span>
              </span>
            </div>
          </button>
        </div>

        {/* Filtres de Thématiques */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#f0f4fd]">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTheme(t.id)}
              className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
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

      {/* 2. GRILLE RESPONSIVE 3 COLONNES SUR ORDINATEUR (lg:grid-cols-3) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(activeTheme === 'all' || activeTheme === 'nutrition') && (
          <>
            {/* Carte Nutrition 1 : Moringa */}
            <article className="bg-white rounded-2xl p-5 shadow-sm border border-[#ddc0bd]/30 flex flex-col justify-between gap-4 hover:border-[#2c694e]/40 transition-colors">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold" style={{ color: '#724600' }}>
                    Aliment Miracle Local
                  </span>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-bold"
                    style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
                  >
                    Fer &amp; Vitalité
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-xs"
                    alt="Moringa feuilles fraîches et poudre"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHCoABKs967FWzDGsYxNhzIPUuo7vX4EHkZx9ZmkpF61Y1pqqFwXdZDcpa5Ces2_VV9M2lIMZnONbSlGCQFqfPRwbfBg1bq2oK56w-Zh2kRsgc79n6OV6mpHDObe2Xfuu0EbxJlXpL-LKzyDfFIk2A_vaVav3MD0fL971JsUy1GCpkVz0HqbvQtLtvkHqSbd9Z_okvp1x_F5tYJcLrJ440Qr0VoCiPDbHAlHH6Dig"
                  />
                  <h3 className="text-lg font-bold text-[#171c23] font-serif leading-tight">
                    Feuilles de Moringa (Nebeday)
                  </h3>
                </div>
                <p className="text-xs text-[#574240] leading-relaxed">
                  Riches en fer, calcium et protéines végétales. Saupoudrez la poudre séchée dans votre soupe ou tiéboudienne quotidienne pour stimuler l'hémoglobine.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#f0f4fd]">
                <span className="text-xs text-[#574240]">Dès le 1er trimestre</span>
                <button
                  type="button"
                  onClick={() => toggleAudio("Moringa bi walla nebeday dafa am fer bu bare, baax na lool ci birr bi.")}
                  className="text-xs font-bold inline-flex items-center gap-1"
                  style={{ color: '#902e2a' }}
                >
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                  <span>Audio Wolof</span>
                </button>
              </div>
            </article>

            {/* Carte Nutrition 2 : Bouye */}
            <article className="bg-white rounded-2xl p-5 shadow-sm border border-[#ddc0bd]/30 flex flex-col justify-between gap-4 hover:border-[#fcba67]/60 transition-colors">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold" style={{ color: '#724600' }}>
                    Énergie Saine
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#eaeef8] text-[#171c23]">
                    Vitamine C
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0"
                    style={{ backgroundColor: '#ffddb8', color: '#724600' }}
                  >
                    <span className="material-symbols-outlined text-[32px]">local_cafe</span>
                    <span className="text-xs font-bold mt-0.5">Bouye</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#171c23] font-serif leading-tight">
                    Pain de Singe (Jus de Bouye naturel)
                  </h3>
                </div>
                <p className="text-xs text-[#574240] leading-relaxed">
                  Facilite l'absorption digestive du fer prescrit et calme efficacement les nausées matinales. À consommer frais et modérément sucré.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#f0f4fd]">
                <span className="text-xs text-[#574240]">Anti-nausée éprouvé</span>
                <button
                  type="button"
                  onClick={() => toggleAudio("Naanatal ndoxum bouye mu bañ a bare suukër, dina dindi yaram buy méti.")}
                  className="text-xs font-bold inline-flex items-center gap-1"
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
          /* Carte Sommeil & Posture */
          <article className="bg-white rounded-2xl p-5 shadow-sm border border-[#ddc0bd]/30 flex flex-col justify-between gap-4 hover:border-[#ba1a1a]/40 transition-colors">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold" style={{ color: '#902e2a' }}>
                  Sommeil &amp; Posture
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#ffdad6] text-[#ba1a1a]">
                  Indispensable
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0"
                  style={{ backgroundColor: '#ffdad6', color: '#93000a' }}
                >
                  <span className="material-symbols-outlined text-[32px]">bedtime</span>
                  <span className="text-xs font-bold mt-0.5">Nopalu</span>
                </div>
                <h3 className="text-lg font-bold text-[#171c23] font-serif leading-tight">
                  Dormir sur le côté gauche
                </h3>
              </div>
              <p className="text-xs text-[#574240] leading-relaxed">
                Optimise le flux sanguin et l'oxygénation du fœtus via la veine cave inférieure. Réduit la rétention d'eau et les jambes lourdes sous forte chaleur.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#f0f4fd]">
              <span className="text-xs text-[#574240]">Conseil Sage-Femme</span>
              <button
                type="button"
                onClick={() => toggleAudio("Tëddël ci sa wetu cammooñ ngir déret bi di dox bu baax ci liir bi.")}
                className="text-xs font-bold inline-flex items-center gap-1"
                style={{ color: '#902e2a' }}
              >
                <span className="material-symbols-outlined text-[16px]">volume_up</span>
                <span>Audio Wolof</span>
              </button>
            </div>
          </article>
        )}

        {(activeTheme === 'all' || activeTheme === 'postpartum') && (
          /* Carte Allaitement Exclusif */
          <article className="bg-white rounded-2xl p-5 shadow-sm border border-[#ddc0bd]/30 flex flex-col justify-between gap-4 hover:border-[#2c694e]/40 transition-colors">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold" style={{ color: '#2c694e' }}>
                  6 Premiers Mois
                </span>
                <span
                  className="text-xs px-2.5 py-0.5 rounded-full font-bold"
                  style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
                >
                  Norme OMS
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0"
                  style={{ backgroundColor: '#aeeecb', color: '#2c694e' }}
                >
                  <span className="material-symbols-outlined text-[32px]">child_friendly</span>
                  <span className="text-xs font-bold mt-0.5">Liir bi</span>
                </div>
                <h3 className="text-lg font-bold text-[#171c23] font-serif leading-tight">
                  Allaitement Maternel Exclusif
                </h3>
              </div>
              <p className="text-xs text-[#574240] leading-relaxed">
                Le colostrum doré est le premier vaccin naturel du nouveau-né. Il transmet les anticorps maternels protecteurs contre les diarrhées et infections infantiles.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#f0f4fd]">
              <span className="text-xs text-[#574240]">Protection immunitaire</span>
              <button
                type="button"
                onClick={() => toggleAudio("Mbell mi mooy gën a baax ci wér-gi-yaramu liir bi. Bul ko jox ndox ba mu am juróom-benn weer.")}
                className="text-xs font-bold inline-flex items-center gap-1"
                style={{ color: '#902e2a' }}
              >
                <span className="material-symbols-outlined text-[16px]">volume_up</span>
                <span>Audio Wolof</span>
              </button>
            </div>
          </article>
        )}
      </section>

      {/* 3. PAROLES DE BADIEN GOX (DIGNITÉ & TRADITION SÉNÉGALAISE) */}
      <section
        className="rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#ffb3ac]/50"
        style={{
          background: 'linear-gradient(135deg, #ffddb8 0%, #ffffff 100%)',
        }}
      >
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="flex items-center gap-2" style={{ color: '#724600' }}>
            <span className="material-symbols-outlined text-[24px]">format_quote</span>
            <span className="text-xs font-bold uppercase tracking-wider">
              Conseil Traditionnel &amp; Dignité Maternelle
            </span>
          </div>
          <p className="text-base md:text-lg font-serif italic text-[#2a1700] leading-snug">
            « Sutura ci wàllu wér-gi-yaram dafay may jigéen bi kersa ak kóolëre. Ñun Badien Gox yi dañu fi nekk ngir jàppale la ak teeru la ci fajuwaay yi. »
          </p>
          <span className="text-xs text-[#574240] font-semibold">
            — Réseau National des Badien Gox du Sénégal (Marraines de Santé Communautaire)
          </span>
        </div>

        <button
          type="button"
          onClick={() => toggleAudio()}
          className="min-h-[44px] px-5 rounded-full bg-[#724600] text-white text-xs font-bold flex items-center gap-2 shrink-0 shadow-sm hover:bg-[#902e2a] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
          <span>Écouter le message</span>
        </button>
      </section>
    </div>
  );
}
