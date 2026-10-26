import React from 'react';
import { BarChart3, Users, Volume2, ShieldAlert, Award, Globe2, CheckCircle2 } from 'lucide-react';

export default function PublicImpactMetrics({ t, metricsData, lang }) {
  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-md mb-2">
          <Globe2 className="w-3.5 h-3.5 text-indigo-200" />
          <span>{t.metrics.badge}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold">{t.metrics.title}</h2>
        <p className="text-indigo-100 text-sm mt-1 max-w-xl leading-relaxed">{t.metrics.subtitle}</p>
      </div>

      {/* Cartes Métriques Clés */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
            <Users className="w-4 h-4" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900">{metricsData.totalUsers}</span>
          <p className="text-xs text-slate-500 font-medium mt-1">{t.metrics.stats.users}</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2">
            <Volume2 className="w-4 h-4" />
          </div>
          <span className="text-2xl font-extrabold text-rose-600">{metricsData.audioListens}</span>
          <p className="text-xs text-slate-500 font-medium mt-1">{t.metrics.stats.audioListens}</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
            <BarChart3 className="w-4 h-4" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900">{metricsData.triagesDone}</span>
          <p className="text-xs text-slate-500 font-medium mt-1">{t.metrics.stats.triageCompleted}</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-2">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <span className="text-2xl font-extrabold text-red-600">{metricsData.emergenciesHandled}</span>
          <p className="text-xs text-slate-500 font-medium mt-1">{t.metrics.stats.emergenciesRouted}</p>
        </div>
      </div>

      {/* Détails du projet pilote */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Résultats du Micro-Pilote Terrain (Sénégal)</h3>
          <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-100">
            Phase Pilote Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-medium block">Répartition Linguistique</span>
            <div className="mt-2 space-y-1.5">
              <div className="flex justify-between font-semibold text-slate-700">
                <span>Wolof (Audio & Texte)</span>
                <span className="text-rose-600">72%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '72%' }}></div>
              </div>
              <div className="flex justify-between font-semibold text-slate-700 pt-1">
                <span>Français</span>
                <span>28%</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-medium block">Couverture Géographique Initiale</span>
            <ul className="mt-2 space-y-1 font-semibold text-slate-700">
              <li className="flex justify-between"><span>Dakar & Banlieue (Pikine/Guédiawaye)</span><span>54%</span></li>
              <li className="flex justify-between"><span>Thiès & Périurbain</span><span>28%</span></li>
              <li className="flex justify-between"><span>Kaolack & Autres</span><span>18%</span></li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-slate-400 font-medium block">Conformité UNICEF Innovation Fund</span>
            <div className="mt-2 space-y-1 text-slate-700 font-medium">
              <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Licence Open Source (MIT)</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Anonymisé (No PII)</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Digital Public Good prêt</span>
              </div>
            </div>
          </div>
        </div>

        {/* Note sur la protection des données */}
        <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
          <strong>Engagement de confidentialité (Sutura) :</strong> Aucune donnée personnelle nominative (nom, prénom, numéro de téléphone direct) n'est stockée ni partagée publiquement. Seules les métriques d'usage agrégées et les scores de santé anonymisés sont publiés pour évaluer l'impact et orienter les politiques de santé publique de l'UNICEF et de ses partenaires.
        </div>
      </div>
    </div>
  );
}
