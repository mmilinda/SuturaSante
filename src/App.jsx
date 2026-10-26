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
  const [viewMode, setViewMode] = useState('phone'); // 'phone' | 'fullscreen'

  const [metrics, setMetrics] = useState({
    totalUsers: 48,
    audioListens: 93,
    triagesDone: 37,
    emergenciesHandled: 9,
    calculationsDone: 29,
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

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'pregnancy':
        return (
          <PregnancyCalculator
            onNavigateToTriage={() => setActiveTab('triage')}
            onActionTrack={trackAction}
          />
        );
      case 'triage':
        return (
          <DangerSignsTriage
            onNavigateToEmergency={() => setActiveTab('emergency')}
            onActionTrack={trackAction}
          />
        );
      case 'guide':
        return (
          <ReproductiveHealthGuide
            lang={lang}
            onActionTrack={trackAction}
          />
        );
      case 'emergency':
        return (
          <DirectoryView
            lang={lang}
            onActionTrack={trackAction}
          />
        );
      case 'metrics':
        return (
          <PublicImpactMetrics
            metricsData={metrics}
            lang={lang}
          />
        );
      default:
        return (
          <PregnancyCalculator
            onNavigateToTriage={() => setActiveTab('triage')}
            onActionTrack={trackAction}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4fd] flex flex-col items-center justify-start text-[#171c23]">
      {/* BARRE DE CONTRÔLE SUPÉRIEURE POUR ORDINATEUR (VISIBLE SUR MD+) */}
      <header className="hidden md:flex items-center justify-between w-full max-w-5xl px-6 py-3 mt-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-[#ddc0bd]/40">
        <div className="flex items-center gap-3">
          <img
            alt="SuturaSanté Logo"
            className="h-7 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFPtd8KqY2-xQrGB8_kv1mgbSJ0mzPAsPY7N5x_Gx1-fDLQd1sZglBKQEHaUPR3IjIJr85nDj1MPQZgcmPKmmkoMp-WKE8l18IjXtrGlrcFBkgEXBj4qI0vpadZruDfmXAHu0KIA_BVJoFbwKUxJttg9jPdcrlD1DApddWYryCvCNh6jjl1X5S1Ib0j4VWfk6iO81fWSl5ztPdlVlQn8FMqWhbwmkOIwlx3wVAS7A"
          />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-[#902e2a] leading-none text-base">
              SuturaSanté • Sénégal
            </span>
            <span className="text-[11px] text-[#574240]">
              UNICEF Femtech Innovation Fund 2026 • Design System Stitch
            </span>
          </div>
        </div>

        {/* Sélecteur Rapide des 5 Écrans Stitch */}
        <div className="flex items-center bg-[#eaeef8] rounded-xl p-1 gap-1">
          <button
            onClick={() => setActiveTab('pregnancy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'pregnancy'
                ? 'bg-[#902e2a] text-white shadow-xs'
                : 'text-[#574240] hover:text-[#171c23]'
            }`}
          >
            Grossesse &amp; CPN
          </button>
          <button
            onClick={() => setActiveTab('triage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'triage'
                ? 'bg-[#902e2a] text-white shadow-xs'
                : 'text-[#574240] hover:text-[#171c23]'
            }`}
          >
            Signes Danger
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'guide'
                ? 'bg-[#902e2a] text-white shadow-xs'
                : 'text-[#574240] hover:text-[#171c23]'
            }`}
          >
            Conseils
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'emergency'
                ? 'bg-[#ba1a1a] text-white shadow-xs'
                : 'text-[#ba1a1a] hover:bg-[#ffdad6]/60'
            }`}
          >
            Urgences 1515
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'metrics'
                ? 'bg-[#2c694e] text-white shadow-xs'
                : 'text-[#2c694e] hover:bg-[#aeeecb]/40'
            }`}
          >
            Impact DPG
          </button>
        </div>

        {/* Toggle Mode Smartphone vs Plein Écran */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl bg-[#eaeef8] p-1">
            <button
              onClick={() => setViewMode('phone')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'phone'
                  ? 'bg-white text-[#902e2a] shadow-xs'
                  : 'text-[#574240]'
              }`}
              title="Afficher comme sur un smartphone"
            >
              <span className="material-symbols-outlined text-[16px]">smartphone</span>
              <span>Vue Mobile</span>
            </button>
            <button
              onClick={() => setViewMode('fullscreen')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'fullscreen'
                  ? 'bg-white text-[#902e2a] shadow-xs'
                  : 'text-[#574240]'
              }`}
              title="Afficher en pleine largeur"
            >
              <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
              <span>Plein Écran</span>
            </button>
          </div>
        </div>
      </header>

      {/* CAS 1 : VUE SMARTPHONE ÉLÉGANTE SUR ORDINATEUR */}
      {viewMode === 'phone' ? (
        <div className="w-full flex-1 flex flex-col items-center justify-center p-0 md:py-6">
          <div
            className="w-full md:w-[412px] md:h-[870px] bg-[#f8f9ff] md:rounded-[44px] md:border-[10px] md:border-[#1e232a] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] relative flex flex-col overflow-hidden"
          >
            {/* Encoche / Dynamic Island du téléphone (visible sur ordinateur) */}
            <div className="hidden md:flex absolute top-2 inset-x-0 justify-center z-50 pointer-events-none">
              <div className="w-28 h-4 bg-[#1e232a] rounded-full flex items-center justify-end px-3">
                <span className="w-2 h-2 rounded-full bg-slate-700"></span>
              </div>
            </div>

            {/* Header mobile Stitch */}
            <Navbar
              lang={lang}
              setLang={setLang}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isFramed={true}
            />

            {/* Corps défilable de l'application mobile */}
            <main className="flex-1 overflow-y-auto pt-32 pb-36 bg-[#f8f9ff] relative w-full">
              {renderActiveScreen()}
            </main>
          </div>
        </div>
      ) : (
        /* CAS 2 : VUE PLEIN ÉCRAN RESPONSIVE (OUVERT SUR BUREAU) */
        <div className="w-full flex-1 flex flex-col bg-[#f8f9ff] relative">
          <Navbar
            lang={lang}
            setLang={setLang}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isFramed={false}
          />
          <main className="flex-1 max-w-2xl mx-auto w-full pt-32 pb-36 px-4">
            {renderActiveScreen()}
          </main>
        </div>
      )}
    </div>
  );
}
