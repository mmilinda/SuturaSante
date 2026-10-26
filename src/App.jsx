import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PregnancyCalculator from './components/PregnancyCalculator';
import DangerSignsTriage from './components/DangerSignsTriage';
import ReproductiveHealthGuide from './components/ReproductiveHealthGuide';
import DirectoryView from './components/DirectoryView';
import PublicImpactMetrics from './components/PublicImpactMetrics';
import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('wo'); // Par défaut Wolof
  const [activeTab, setActiveTab] = useState('pregnancy');

  // Métriques d'impact locales persistées
  const [metrics, setMetrics] = useState(() => {
    const saved = localStorage.getItem('sutura_metrics');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
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
    setMetrics((prev) => {
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

  const t = translations[lang] || translations.fr;

  return (
    <div className="bg-surface font-body text-body text-on-surface antialiased flex flex-col min-h-screen">
      {/* Header Responsive */}
      <Navbar
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        t={t}
      />

      {/* Contenu principal : Responsive Mobile (<768px) & Largeur Confortable sur Desktop (max-w-5xl) */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-4 md:py-8 pb-32 md:pb-12">
        {activeTab === 'pregnancy' && (
          <PregnancyCalculator
            t={t}
            lang={lang}
            onActionTrack={trackAction}
            onNavigateToTriage={() => setActiveTab('triage')}
          />
        )}

        {activeTab === 'triage' && (
          <DangerSignsTriage
            t={t}
            lang={lang}
            onActionTrack={trackAction}
            onNavigateToEmergency={() => setActiveTab('emergency')}
          />
        )}

        {activeTab === 'guide' && (
          <ReproductiveHealthGuide
            t={t}
            lang={lang}
            onActionTrack={trackAction}
          />
        )}

        {activeTab === 'emergency' && (
          <DirectoryView
            t={t}
            lang={lang}
            onActionTrack={trackAction}
          />
        )}

        {activeTab === 'metrics' && (
          <PublicImpactMetrics
            t={t}
            metricsData={metrics}
            lang={lang}
          />
        )}
      </main>

      {/* Footer desktop informatif */}
      <footer className="hidden md:block bg-white border-t border-outline-variant/20 py-6 px-4 mt-auto">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">SuturaSanté Sénégal</span>
            <span>• Open Source MIT (Digital Public Good)</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Candidature UNICEF / Suède Femtech 2026</span>
            <button
              onClick={() => setActiveTab('metrics')}
              className="text-secondary font-bold hover:underline"
            >
              Tableau de bord public (/metrics)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
