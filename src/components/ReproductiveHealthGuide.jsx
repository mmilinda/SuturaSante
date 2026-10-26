import React from 'react';
import AudioPlayerButton from './AudioPlayerButton';

export default function ReproductiveHealthGuide({ t, lang, onActionTrack }) {
  const articles = [
    {
      titleFr: "Alimentation de la femme enceinte au Sénégal",
      titleWo: "Dundin gu baax ci jigéen ju ëmb ci Sénégal",
      badgeFr: "Nutrition Locale",
      icon: "nutrition",
      colorClass: "bg-secondary-container text-on-secondary-container",
      contentFr: "Pour prévenir l'anémie et fortifier le fœtus, privilégiez les aliments locaux : feuilles de moringa (Neverdie), haricots (niébé), poisson frais, œufs, lentilles et fruits de saison (mangues, ditaakh). Évitez le thé fort juste après les repas qui bloque l'absorption du fer.",
      contentWo: "Ngir baña am mankiitu deret (anémie) te liir bi dooleel, lekkal ay ñam yu am njariñ : xobu Neverdie (Moringa), ñebbe, jën yu bees, nen, ak foytéef yi ñor. Moytul naan ataaya bu tàkk bala ñam gi di réer ci biir.",
    },
    {
      titleFr: "Hygiène menstruelle & cycle sans tabou",
      titleWo: "Set-setal ci waxtu regle ak saytu sa cycle",
      badgeFr: "Santé Reproductive",
      icon: "spa",
      colorClass: "bg-primary-fixed text-primary",
      contentFr: "Le cycle menstruel dure généralement entre 21 et 35 jours. Il est normal de ressentir de légères crampes, mais une douleur invalidante nécessite une consultation pour dépister l'endométriose. Utilisez des protections propres et changez-les toutes les 4 à 6 heures.",
      contentWo: "Cycle bi ci ñaari fukk ak benn ba fanweer ak juroom bés lay tolloo. So yëgee métit gu tar gu la tax a tëdd, demal seetsi docteur. Saytul sa bop ci set-setal tey soppi sa ser yi ci biir 4 ba 6 waxtu.",
    },
    {
      titleFr: "Plan d'Urgence pour l'accouchement",
      titleWo: "Waajal bésu wàsin bi (Plan d'Urgence)",
      badgeFr: "Préparation",
      icon: "shield_with_heart",
      colorClass: "bg-tertiary-fixed text-on-tertiary-fixed",
      contentFr: "Dès le 7ème mois, identifiez votre maternité d'accueil, mettez de côté une réserve financière pour les ordonnances et prévoyez le contact d'un chauffeur fiable disponible de jour comme de nuit.",
      contentWo: "Bala juróom ñaari weer di mat, xamël fooy wàsine, dencal xaalis bu mat ngir garap yi, te amël numéro chauffeur bu mën a jug bëccëg ak guddi.",
    },
    {
      titleFr: "Bien-être mental & post-partum (Nafsa)",
      titleWo: "Xel mu dal ak soutoura ginaaw wàsin (Nafsa)",
      badgeFr: "Bien-être & Soutien",
      icon: "favorite",
      colorClass: "bg-surface-container-highest text-on-surface",
      contentFr: "Après l'accouchement, la fatigue et les variations hormonales peuvent provoquer de la tristesse passagère ('baby blues'). N'hésitez pas à demander du soutien à vos proches et à votre sage-femme.",
      contentWo: "Ginaaw wàsin, sonn gu tar ak xel mu jaaxle mën na am. Bul fatt sa xol, waxtaanal ak sa bokk yi mbaa sage-femme bi ngir mu dimbali la ci sutura.",
    }
  ];

  return (
    <div className="flex flex-col w-full gap-4">
      {/* En-tête vocal */}
      <AudioPlayerButton
        lang={lang}
        variant="banner"
        label={lang === 'wo' ? "Digal & Xam-xam ci Wér-gi-yaram" : "Guide Santé Reproductive & Maternelle"}
        subtitle={
          lang === 'wo'
            ? "Ay digal yu am solo ci ñam, wàsin ak sutura"
            : "Des conseils médicaux validés, adaptés aux réalités du Sénégal"
        }
        textToSpeak={
          lang === 'wo'
            ? "Deglul ay digal ci dundin gu baax ci jigéen ju ëmb, set-setal, ak waajal wàsin bi ci sutura."
            : "Guide de santé maternelle et reproductive adapté au Sénégal : nutrition locale, moringa, hygiène et préparation de l'accouchement."
        }
        onPlayRecord={() => onActionTrack && onActionTrack('audio_listen')}
      />

      {/* Liste des cartes d'articles Stitch */}
      <div className="flex flex-col gap-3">
        {articles.map((art, idx) => {
          const title = lang === 'wo' ? art.titleWo : art.titleFr;
          const content = lang === 'wo' ? art.contentWo : art.contentFr;

          return (
            <article
              key={idx}
              className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/20 shadow-xs flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${art.colorClass}`}>
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {art.icon}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                    {art.badgeFr}
                  </span>
                </div>

                <AudioPlayerButton
                  variant="chip"
                  textToSpeak={`${title}. ${content}`}
                  lang={lang}
                  label={lang === 'wo' ? 'Déglu' : 'Écouter'}
                  onPlayRecord={() => onActionTrack && onActionTrack('audio_listen')}
                />
              </div>

              <div>
                <h3 className="font-headline text-base text-on-surface font-bold leading-snug">
                  {title}
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  {content}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
