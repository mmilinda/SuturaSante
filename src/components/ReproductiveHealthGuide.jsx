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
        u.lang = 'wo';
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
    { id: 'postpartum', label: 'Post-Partum & Bébé' }
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. EN-TÊTE HÉRO */}
      <section className="bg-white rounded-2xl shadow-xs p-5 sm:p-6 flex flex-col gap-4 border border-[#ddc0bd]/40">
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
            className="min-h-[40px] px-4 rounded-xl bg-[#eaeef8] hover:bg-[#dee2ec] flex items-center gap-2.5 shadow-xs transition-colors shrink-0 cursor-pointer"
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
            Conseils Médicaux & Bien-être Maternel
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
              className={`min-h-[34px] px-4 py-1 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
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

      {/* 2. GRILLE RESPONSIVE DES FICHES CONSEILS AVEC IMAGES EXPLICITES */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(activeTheme === 'all' || activeTheme === 'nutrition') && (
          <>
            {/* Carte Nutrition 1 : Moringa (Nebeday) */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#ddc0bd]/40 flex flex-col justify-between hover:border-[#2c694e]/50 transition-all group">
              <div className="relative h-44 w-full overflow-hidden bg-[#eaeef8]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt="Feuilles de Moringa Nebeday"
                  src="/images/advice/moringa.jpg"
                />
                <div className="absolute top-3 left-3 bg-[#aeeecb] text-[#316e52] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  Fer & Vitalité
                </div>
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-semibold">
                  Aliment Miracle
                </div>
              </div>

              <div className="p-5 flex flex-col gap-2.5 flex-1 justify-between">
                <div>
                  <h3 className="text-base font-bold font-serif text-[#171c23] leading-tight">
                    Feuilles de Moringa (Nebeday)
                  </h3>
                  <p className="text-xs text-[#574240] leading-relaxed mt-1.5">
                    Riches en fer végétal, calcium et vitamines. Saupoudrez la poudre séchée dans votre soupe ou tiéboudienne quotidienne pour stimuler l'hémoglobine et prévenir l'anémie.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#f0f4fd] mt-2">
                  <span className="text-[11px] text-[#574240]">Dès le 1er trimestre</span>
                  <button
                    type="button"
                    onClick={() => toggleAudio("Moringa bi dafa am fer bu bare, baax na lool ci birr bi. Saupoudrel ko ci sa ñam.")}
                    className="text-xs font-bold inline-flex items-center gap-1 text-[#902e2a] hover:underline cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">volume_up</span>
                    <span>Audio Wolof</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Carte Nutrition 2 : Bouye (Pain de Singe) */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#ddc0bd]/40 flex flex-col justify-between hover:border-[#fcba67]/60 transition-all group">
              <div className="relative h-44 w-full overflow-hidden bg-[#eaeef8]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt="Pain de Singe Bouye"
                  src="/images/advice/bouye.jpg"
                />
                <div className="absolute top-3 left-3 bg-[#ffddb8] text-[#724600] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  Vitamine C
                </div>
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-semibold">
                  Anti-nausée
                </div>
              </div>

              <div className="p-5 flex flex-col gap-2.5 flex-1 justify-between">
                <div>
                  <h3 className="text-base font-bold font-serif text-[#171c23] leading-tight">
                    Pain de Singe (Jus de Bouye naturel)
                  </h3>
                  <p className="text-xs text-[#574240] leading-relaxed mt-1.5">
                    Facilite l'absorption digestive du fer prescrit et calme efficacement les nausées matinales. À consommer frais et modérément sucré pour éviter les pics glycémiques.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#f0f4fd] mt-2">
                  <span className="text-[11px] text-[#574240]">Matin à jeun ou goûter</span>
                  <button
                    type="button"
                    onClick={() => toggleAudio("Naanatal ndoxum bouye mu bañ a bare suukër, dafay woyofal xol bi.")}
                    className="text-xs font-bold inline-flex items-center gap-1 text-[#902e2a] hover:underline cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">volume_up</span>
                    <span>Audio Wolof</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Carte Nutrition 3 : Jus de Bissap & Fer */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#ddc0bd]/40 flex flex-col justify-between hover:border-[#902e2a]/50 transition-all group">
              <div className="relative h-44 w-full overflow-hidden bg-[#eaeef8]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt="Fleurs d'hibiscus Bissap"
                  src="/images/advice/bissap.jpg"
                />
                <div className="absolute top-3 left-3 bg-[#ffdad6] text-[#ba1a1a] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  Hydratation Active
                </div>
              </div>

              <div className="p-5 flex flex-col gap-2.5 flex-1 justify-between">
                <div>
                  <h3 className="text-base font-bold font-serif text-[#171c23] leading-tight">
                    Infusion de Bissap Pur (Hibiscus)
                  </h3>
                  <p className="text-xs text-[#574240] leading-relaxed mt-1.5">
                    Infusion riche en antioxydants et acides organiques. Ne pas consommer trop glacé ni avec un excès de sucre pour préserver la tension artérielle équilibrée.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#f0f4fd] mt-2">
                  <span className="text-[11px] text-[#574240]">Sans excès de sucre</span>
                  <button
                    type="button"
                    onClick={() => toggleAudio("Bissap bi baax na waaye bul ci def suukër bu bare.")}
                    className="text-xs font-bold inline-flex items-center gap-1 text-[#902e2a] hover:underline cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">volume_up</span>
                    <span>Audio Wolof</span>
                  </button>
                </div>
              </div>
            </article>
          </>
        )}

        {(activeTheme === 'all' || activeTheme === 'hygiene') && (
          <>
            {/* Carte Sommeil & Posture */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#ddc0bd]/40 flex flex-col justify-between hover:border-[#ba1a1a]/50 transition-all group">
              <div className="relative h-44 w-full overflow-hidden bg-[#eaeef8]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt="Posture de repos maternel"
                  src="/images/advice/sleep.jpg"
                />
                <div className="absolute top-3 left-3 bg-[#ffdad6] text-[#ba1a1a] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  Indispensable
                </div>
              </div>

              <div className="p-5 flex flex-col gap-2.5 flex-1 justify-between">
                <div>
                  <h3 className="text-base font-bold font-serif text-[#171c23] leading-tight">
                    Dormir sur le côté gauche (Décubitus Latéral)
                  </h3>
                  <p className="text-xs text-[#574240] leading-relaxed mt-1.5">
                    Optimise le flux sanguin et l'oxygénation du fœtus via la veine cave inférieure. Réduit les œdèmes des jambes sous les fortes chaleurs dakaroises.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#f0f4fd] mt-2">
                  <span className="text-[11px] text-[#574240]">Recommandation Médicale</span>
                  <button
                    type="button"
                    onClick={() => toggleAudio("Tëddël ci sa wetu cammooñ ngir déret bi di dox bu baax ci liir bi.")}
                    className="text-xs font-bold inline-flex items-center gap-1 text-[#902e2a] hover:underline cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">volume_up</span>
                    <span>Audio Wolof</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Carte Hydratation & Eau Saine */}
            <article className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#ddc0bd]/40 flex flex-col justify-between hover:border-[#2c694e]/50 transition-all group">
              <div className="relative h-44 w-full overflow-hidden bg-[#eaeef8]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt="Eau saine et hydratation"
                  src="/images/advice/water.svg"
                />
                <div className="absolute top-3 left-3 bg-[#aeeecb] text-[#316e52] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  2.5 Litres / Jour
                </div>
              </div>

              <div className="p-5 flex flex-col gap-2.5 flex-1 justify-between">
                <div>
                  <h3 className="text-base font-bold font-serif text-[#171c23] leading-tight">
                    Hydratation Continue & Eau Propre
                  </h3>
                  <p className="text-xs text-[#574240] leading-relaxed mt-1.5">
                    Boire régulièrement pour renouveler le liquide amniotique et prévenir les infections urinaires fréquentes en période de gestation.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#f0f4fd] mt-2">
                  <span className="text-[11px] text-[#574240]">Régularité quotidienne</span>
                  <button
                    type="button"
                    onClick={() => toggleAudio("Naanal ndox mu bare bés bu set ngir bañ feebar.")}
                    className="text-xs font-bold inline-flex items-center gap-1 text-[#902e2a] hover:underline cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">volume_up</span>
                    <span>Audio Wolof</span>
                  </button>
                </div>
              </div>
            </article>
          </>
        )}

        {(activeTheme === 'all' || activeTheme === 'postpartum') && (
          /* Carte Allaitement Exclusif */
          <article className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[#ddc0bd]/40 flex flex-col justify-between hover:border-[#2c694e]/50 transition-all group">
            <div className="relative h-44 w-full overflow-hidden bg-[#eaeef8]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt="Allaitement maternel exclusif"
                src="/images/advice/breastfeeding.jpg"
              />
              <div className="absolute top-3 left-3 bg-[#aeeecb] text-[#316e52] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                Norme OMS 6 Mois
              </div>
            </div>

            <div className="p-5 flex flex-col gap-2.5 flex-1 justify-between">
              <div>
                <h3 className="text-base font-bold font-serif text-[#171c23] leading-tight">
                  Allaitement Maternel Exclusif & Colostrum
                </h3>
                <p className="text-xs text-[#574240] leading-relaxed mt-1.5">
                  Le colostrum doré est le premier vaccin naturel du nouveau-né. Il transmet tous les anticorps protecteurs contre les diarrhées et infections infantiles au Sénégal.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#f0f4fd] mt-2">
                <span className="text-[11px] text-[#574240]">Protection immunitaire</span>
                <button
                  type="button"
                  onClick={() => toggleAudio("Mbell mi mooy gën a baax ci wér-gi-yaramu liir bi. Bul ko xañ meew mi.")}
                  className="text-xs font-bold inline-flex items-center gap-1 text-[#902e2a] hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">volume_up</span>
                  <span>Audio Wolof</span>
                </button>
              </div>
            </div>
          </article>
        )}
      </section>

      {/* 3. PAROLES DE BADIEN GOX */}
      <section
        className="rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#ffb3ac]/50"
        style={{ background: 'linear-gradient(135deg, #ffddb8 0%, #ffffff 100%)' }}
      >
        <div className="flex flex-col gap-1.5 max-w-3xl">
          <div className="flex items-center gap-2 text-[#724600]">
            <span className="material-symbols-outlined text-[22px]">format_quote</span>
            <span className="text-xs font-bold uppercase tracking-wider">
              Conseil Traditionnel & Dignité Maternelle
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
          className="min-h-[42px] px-5 rounded-full bg-[#724600] text-white text-xs font-bold flex items-center gap-2 shrink-0 shadow-xs hover:bg-[#902e2a] transition-colors self-start md:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
          <span>Écouter le message</span>
        </button>
      </section>
    </div>
  );
}
