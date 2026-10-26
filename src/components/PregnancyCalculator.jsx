import React, { useState } from 'react';
import { Calendar, Baby, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import AudioPlayerButton from './AudioPlayerButton';

export default function PregnancyCalculator({ t, lang, onActionTrack }) {
  const [ddr, setDdr] = useState('');
  const [calcResult, setCalcResult] = useState(null);

  const calculatePregnancy = (e) => {
    e.preventDefault();
    if (!ddr) return;

    const lmpDate = new Date(ddr);
    const today = new Date();
    
    // Calcul de la différence en jours
    const diffTime = today.getTime() - lmpDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0 || diffDays > 300) {
      alert(lang === 'wo' ? "Bés bi nga dugal dafa juray juroom benn wer." : "Veuillez entrer une date valide (dans les 9 derniers mois).");
      return;
    }

    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    // Règle de Naegele pour la DPA : DDR + 1 an - 3 mois + 7 jours
    const dpa = new Date(lmpDate);
    dpa.setDate(dpa.getDate() + 280);

    // Calcul des dates estimées pour les 4 CPN selon le protocole sénégalais
    const cpn1Date = new Date(lmpDate);
    cpn1Date.setDate(cpn1Date.getDate() + (11 * 7)); // Semaine 11

    const cpn2Date = new Date(lmpDate);
    cpn2Date.setDate(cpn2Date.getDate() + (22 * 7)); // Semaine 22

    const cpn3Date = new Date(lmpDate);
    cpn3Date.setDate(cpn3Date.getDate() + (28 * 7)); // Semaine 28

    const cpn4Date = new Date(lmpDate);
    cpn4Date.setDate(cpn4Date.getDate() + (34 * 7)); // Semaine 34

    setCalcResult({
      weeks,
      days,
      dpa: dpa.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      cpnList: [
        { title: "CPN 1", date: cpn1Date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }), desc: t.pregnancy.cpn1, status: weeks >= 12 ? 'passé' : 'à venir' },
        { title: "CPN 2", date: cpn2Date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }), desc: t.pregnancy.cpn2, status: weeks >= 24 ? 'passé' : 'à venir' },
        { title: "CPN 3", date: cpn3Date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }), desc: t.pregnancy.cpn3, status: weeks >= 28 ? 'passé' : 'à venir' },
        { title: "CPN 4", date: cpn4Date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }), desc: t.pregnancy.cpn4, status: weeks >= 36 ? 'passé' : 'à venir' }
      ]
    });

    if (onActionTrack) onActionTrack('pregnancy_calculation');
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl shadow-rose-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-md mb-2">
              <Baby className="w-3.5 h-3.5" />
              <span>Santé Maternelle • Sénégal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">{t.pregnancy.title}</h2>
            <p className="text-rose-100 text-sm mt-1 max-w-xl">{t.pregnancy.subtitle}</p>
          </div>
          <AudioPlayerButton
            textToSpeak={`${t.pregnancy.title}. ${t.pregnancy.subtitle}. ${t.pregnancy.nutritionTip}`}
            lang={lang}
            label={lang === 'wo' ? "Déglu natt bi" : "Écouter l'explication"}
            onPlayRecord={() => onActionTrack && onActionTrack('audio_listen')}
          />
        </div>
      </div>

      {/* Formulaire de calcul */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <form onSubmit={calculatePregnancy} className="space-y-4">
          <label className="block text-sm font-semibold text-slate-800">
            {t.pregnancy.ddrLabel}
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="date"
              value={ddr}
              onChange={(e) => setDdr(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium text-slate-800"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-2xl shadow-lg shadow-rose-200 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.pregnancy.calculateBtn}</span>
            </button>
          </div>
        </form>

        {/* Résultat du calcul */}
        {calcResult && (
          <div className="mt-6 pt-6 border-t border-slate-100 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100">
                <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">{t.pregnancy.resultTerm}</span>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">
                  {calcResult.weeks} <span className="text-base font-medium text-slate-600">{t.pregnancy.weeks}</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">(+ {calcResult.days} jours)</p>
              </div>

              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-100">
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">{t.pregnancy.dueDate}</span>
                <p className="text-xl font-bold text-slate-900 mt-1">{calcResult.dpa}</p>
                <p className="text-xs text-amber-800 mt-1 font-medium">Inch'Allah</p>
              </div>
            </div>

            {/* Calendrier CPN du Sénégal */}
            <div className="mt-6">
              <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>{t.pregnancy.cpnPlanTitle}</span>
              </h3>
              <div className="space-y-3">
                {calcResult.cpnList.map((cpn, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl border border-slate-100 hover:border-rose-200 transition flex items-start gap-3 bg-slate-50/50">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${cpn.status === 'passé' ? 'text-emerald-500' : 'text-slate-300'}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-800">{cpn.title}</h4>
                        <span className="text-xs font-semibold text-slate-500">{cpn.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{cpn.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Conseil nutritionnel local */}
            <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900">
                <p className="font-semibold">{t.pregnancy.nutritionTip}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
