import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PregnancyCalculator from './components/PregnancyCalculator';
import DangerSignsTriage from './components/DangerSignsTriage';
import ReproductiveHealthGuide from './components/ReproductiveHealthGuide';
import DirectoryView from './components/DirectoryView';
import PublicImpactMetrics from './components/PublicImpactMetrics';
import { translations } from './data/translations';
import { MessageSquareShare, Heart, Sparkles, ExternalLink } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('fr');
  const [activeTab, setActiveTab] = useState('pregnancy');

  // Métriques d'impact locales persistées
  const [metrics, setMetrics] = useState(() => {
    const saved = localStorage.getItem('sutura_metrics');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      totalUsers: 48,
      audioListens: 93,
      triagesDone: 37,
      emergenciesHandled: 9,
      calculationsDone: 29
    };
  });

  useEffect(() => {
    localStorage.setItem('sutura_metrics', JSON.stringify(metrics));
  }, [metrics]);

  const trackAction = (type) => {
    setMetrics(prev => {
      const updated = { ...prev };
      if (type === 'audio_listen') updated.audioListens += 1;
      if (type === 'pregnancy_calculation') {
        updated.calculationsDone += 1;
        updated.totalUsers += 1;
      }
      if (type === 'emergency_red') {
        updated.emergenciesHandled += 1;
        updated.triagesDone += 1;
      }
      if (type === 'triage_yellow' || type === 'triage_green') {
        updated.triagesDone += 1;
      }
      return updated;
    });
  };

  const t = translations[lang];

  // Partager sur WhatsApp
  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      lang === 'wo'
        ? "Asalaam alaykum ! Seetal plateforme SuturaSanté ngir topato sa birr, saytu sa wér-gi-yaram te déglu ay digal ci Wolof : " + window.location.href
        : "Bonjour ! Découvrez SuturaSanté pour le suivi prénatal, les signaux d'alerte et des conseils en français et wolof : " + window.location.href
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Barre de navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        t={t}
      />

      {/* Contenu principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 pb-24">
        {/* Bandeau d'encouragement au partage WhatsApp */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <MessageSquareShare className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold">
                {lang === 'wo' ? "Partagéel ko ak sa bokk yi ci WhatsApp" : "Partager cette ressource sur WhatsApp"}
              </p>
              <p className="text-[11px] text-emerald-100">
                {lang === 'wo' ? "Sutura ak ndimbal ngir jigéen ñépp" : "Gratuit, discret et accessible sans installation"}
              </p>
            </div>
          </div>
          <button
            onClick={shareOnWhatsApp}
            className="px-3.5 py-1.5 bg-white text-emerald-700 font-bold rounded-xl text-xs hover:bg-emerald-50 transition active:scale-95 flex items-center gap-1.5"
          >
            <span>WhatsApp</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Vues selon l'onglet actif */}
        {activeTab === 'pregnancy' && (
          <PregnancyCalculator t={t} lang={lang} onActionTrack={trackAction} />
        )}

        {activeTab === 'triage' && (
          <DangerSignsTriage t={t} lang={lang} onActionTrack={trackAction} />
        )}

        {activeTab === 'guide' && (
          <ReproductiveHealthGuide t={t} lang={lang} onActionTrack={trackAction} />
        )}

        {activeTab === 'emergency' && (
          <DirectoryView t={t} lang={lang} onActionTrack={trackAction} />
        )}

        {activeTab === 'metrics' && (
          <PublicImpactMetrics t={t} metricsData={metrics} lang={lang} />
        )}
      </main>

      {/* Pied de page UNICEF / Open Source */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="font-semibold text-slate-700">SuturaSanté Sénégal</span>
            <span>• Open Source MIT</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-slate-400">Projet éligible UNICEF / Suède Innovation Fund Femtech</span>
            <button
              onClick={() => setActiveTab('metrics')}
              className="text-rose-600 font-bold hover:underline"
            >
              Voir les données publiques
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
