import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PregnancyCalculator from './components/PregnancyCalculator';
import DangerSignsTriage from './components/DangerSignsTriage';
import ReproductiveHealthGuide from './components/ReproductiveHealthGuide';
import DirectoryView from './components/DirectoryView';
import PublicImpactMetrics from './components/PublicImpactMetrics';

export default function App() {
  const [lang, setLang] = useState('wo');
  const [activeTab, setActiveTab] = useState('pregnancy');

  const [metrics, setMetrics] = useState({
    totalUsers: 48,
    audioListens: 93,
    triagesDone: 37,
    emergenciesHandled: 9,
    calculationsDone: 29
  });

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
      return updated;
    });
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased flex flex-col min-h-screen">
      {/* Header officiel Stitch */}
      <Navbar
        lang={lang}
        setLang={setLang}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content : Mise en page mobile-first fidèle au code Stitch */}
      <main className="flex flex-col relative w-full pt-28 pb-32 bg-surface min-h-screen max-w-md mx-auto">
        {activeTab === 'pregnancy' && (
          <PregnancyCalculator
            onNavigateToTriage={() => setActiveTab('triage')}
            onActionTrack={trackAction}
          />
        )}

        {activeTab === 'triage' && (
          <DangerSignsTriage
            onNavigateToEmergency={() => setActiveTab('emergency')}
            onActionTrack={trackAction}
          />
        )}

        {activeTab === 'guide' && (
          <ReproductiveHealthGuide
            lang={lang}
            onActionTrack={trackAction}
          />
        )}

        {activeTab === 'emergency' && (
          <DirectoryView
            lang={lang}
            onActionTrack={trackAction}
          />
        )}

        {activeTab === 'metrics' && (
          <PublicImpactMetrics
            metricsData={metrics}
            lang={lang}
          />
        )}
      </main>
    </div>
  );
}
