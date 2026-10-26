import React from 'react';
import { BookOpen, Sparkles, Apple, ShieldCheck, Heart } from 'lucide-react';
import AudioPlayerButton from './AudioPlayerButton';

export default function ReproductiveHealthGuide({ t, lang, onActionTrack }) {
  const articles = [
    {
      titleFr: "Alimentation de la femme enceinte au Sénégal",
      titleWo: "Dundin gu baax ci jigéen ju ëmb ci Sénégal",
      icon: Apple,
      color: "bg-emerald-500",
      contentFr: "Pour prévenir l'anémie et fortifier le fœtus, privilégiez les aliments locaux : feuilles de moringa (Neverdie), haricots (niébé), poisson frais, œufs, lentilles et fruits de saison (mangues, ditaakh). Évitez le thé fort juste après les repas qui bloque l'absorption du fer.",
      contentWo: "Ngir baña am mankiitu deret (anémie) te liir bi dooleel, lekkal ay ñam yu am njariñ : xobu Neverdie (Moringa), ñebbe, jën yu bees, nen, ak foytéef yi ñor. Moytul naan ataaya bu tàkk bala ñam gi di réer ci biir.",
    },
    {
      titleFr: "Hygiène menstruelle & suivi du cycle sans tabou",
      titleWo: "Set-setal ci waxtu regle ak saytu sa cycle",
      icon: Sparkles,
      color: "bg-rose-500",
      contentFr: "Le cycle menstruel dure généralement entre 21 et 35 jours. Il est normal de ressentir de légères crampes, mais une douleur invalidante nécessite une consultation pour dépister l'endométriose. Utilisez des protections propres et changez-les toutes les 4 à 6 heures.",
      contentWo: "Cycle bi ci ñaari fukk ak benn ba fanweer ak juroom bés lay tolloo. So yëgee métit gu tar gu la tax a tëdd, demal seetsi docteur. Saytul sa bop ci set-setal tey soppi sa ser yi ci biir 4 ba 6 waxtu.",
    },
    {
      titleFr: "Préparation de l'accouchement (Plan d'Urgence)",
      titleWo: "Waajal bésu wàsin bi (Plan d'Urgence)",
      icon: ShieldCheck,
      color: "bg-indigo-500",
      contentFr: "Dès le 7ème mois, identifiez votre maternité d'accueil, mettez de côté une réserve financière pour les ordonnances et prévoyez le contact d'un chauffeur fiable disponible de jour comme de nuit.",
      contentWo: "Bala juróom ñaari weer di mat, xamël fooy wàsine, dencal xaalis bu mat ngir garap yi, te amël numéro chauffeur bu mën a jug bëccëg ak guddi.",
    },
    {
      titleFr: "Bien-être mental & soutien post-partum (Nafsa)",
      titleWo: "Xel mu dal ak soutoura ginaaw wàsin",
      icon: Heart,
      color: "bg-purple-500",
      contentFr: "Après l'accouchement, la fatigue et les variations hormonales peuvent provoquer de la tristesse passagère ('baby blues'). N'hésitez pas à demander du soutien à vos proches et à votre sage-femme.",
      contentWo: "Ginaaw wàsin, sonn gu tar ak xel mu jaaxle mën na am. Bul fatt sa xol, waxtaanal ak sa bokk yi mbaa sage-femme bi ngir mu dimbali la.",
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-br from-pink-600 to-rose-700 rounded-3xl p-6 text-white shadow-xl shadow-rose-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-md mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Savoir Médical & Conseils Pratiques</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">
              {lang === 'wo' ? "Digal & Xam-xam ci Wér-gi-yaram" : "Guide Santé Reproductive & Maternelle"}
            </h2>
            <p className="text-rose-100 text-sm mt-1 max-w-xl">
              {lang === 'wo' 
                ? "Ay xibaar yu wér te leer ngir jigéen ñi ak ndaw yi ci Sénégal."
                : "Des conseils médicaux fiables, adaptés aux contextes culturels et nutritionnels du Sénégal."}
            </p>
          </div>
          <AudioPlayerButton
            textToSpeak={lang === 'wo' ? "Digal ak xam-xam ci wér-gi-yaramu jigéen" : "Guide de santé reproductive et maternelle"}
            lang={lang}
            onPlayRecord={() => onActionTrack && onActionTrack('audio_listen')}
          />
        </div>
      </div>

      {/* Cartes conseils */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((art, idx) => {
          const title = lang === 'wo' ? art.titleWo : art.titleFr;
          const content = lang === 'wo' ? art.contentWo : art.contentFr;
          const IconComp = art.icon;

          return (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-2xl ${art.color} flex items-center justify-center text-white shadow-sm`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <AudioPlayerButton
                  textToSpeak={`${title}. ${content}`}
                  lang={lang}
                  label={lang === 'wo' ? "Déglu" : "Écouter"}
                  onPlayRecord={() => onActionTrack && onActionTrack('audio_listen')}
                />
              </div>

              <h3 className="font-bold text-slate-900 text-base">{title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
