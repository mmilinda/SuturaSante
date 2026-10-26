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

  const navItems = [
    { id: 'pregnancy', shortLabel: 'Grossesse', fullLabel: 'Grossesse & CPN', icon: 'pregnant_woman' },
    { id: 'triage', shortLabel: 'Triage', fullLabel: 'Signes Danger', icon: 'health_and_safety' },
    { id: 'guide', shortLabel: 'Conseils', fullLabel: 'Conseils & Guide', icon: 'menu_book' },
    { id: 'emergency', shortLabel: 'Urgences', fullLabel: 'Urgences 1515', icon: 'phone_in_talk', isEmergency: true },
    { id: 'metrics', shortLabel: 'Impact', fullLabel: 'Impact UNICEF (DPG)', icon: 'analytics' },
  ];

  return (
    <div className="h-screen max-h-screen w-screen overflow-hidden bg-[#f8f9ff] text-[#171c23] flex flex-col antialiased selection:bg-[#ffdad6] selection:text-[#902e2a]">
      {/* =========================================================================
          1. HEADER DESKTOP SLIM ET ULTRA-COMPACT (h-12 = 48px)
          Conçu pour préserver l'espace vertical et éliminer tout défilement
          ========================================================================= */}
      <header className="hidden md:flex h-12 shrink-0 bg-[#f8f9ff]/95 backdrop-blur-xl z-50 border-b border-[#ddc0bd]/40 shadow-[0_1px_3px_rgba(0,0,0,0.03)] px-3 lg:px-6">
        <div className="w-full max-w-7xl mx-auto h-full flex items-center justify-between gap-2 lg:gap-4">
          {/* Logo compact */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none shrink-0"
            onClick={() => setActiveTab('pregnancy')}
          >
            <div className="w-7 h-7 rounded-lg bg-[#902e2a] flex items-center justify-center text-white font-serif text-sm font-bold shadow-xs">
              S
            </div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-serif text-sm font-bold text-[#902e2a] tracking-tight">
                SuturaSanté
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] font-bold">
                DPG
              </span>
            </div>
          </div>

          {/* MENU CENTRAL COMPACT */}
          <nav className="flex items-center bg-[#eaeef8] rounded-xl p-0.5 gap-0.5 border border-[#ddc0bd]/30 shadow-xs">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`min-h-[28px] px-2.5 lg:px-3 py-0.5 rounded-lg font-bold text-[11px] lg:text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? item.isEmergency
                        ? 'bg-[#ba1a1a] text-white shadow-xs'
                        : 'bg-[#902e2a] text-white shadow-xs'
                      : item.isEmergency
                      ? 'text-[#ba1a1a] hover:bg-[#ffdad6]/60'
                      : 'text-[#574240] hover:bg-white hover:text-[#171c23]'
                  }`}
                  title={item.fullLabel}
                >
                  <span
                    className="material-symbols-outlined text-[15px]"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span className="inline lg:hidden">{item.shortLabel}</span>
                  <span className="hidden lg:inline">{item.fullLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions Droite compactes */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Langue WO / FR */}
            <div
              aria-label="Choix de langue"
              className="inline-flex items-center bg-[#eaeef8] rounded-full p-0.5 border border-[#ddc0bd]/40"
              role="group"
            >
              <button
                type="button"
                onClick={() => setLang('wo')}
                className={`min-h-[24px] px-2 py-0.5 rounded-full text-[10px] flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-all ${
                  lang === 'wo'
                    ? 'bg-[#902e2a] text-white font-bold'
                    : 'text-[#171c23] hover:text-[#902e2a] font-medium'
                }`}
                title="Langue Wolof avec guidage audio"
              >
                <span className="material-symbols-outlined text-[12px]">record_voice_over</span>
                <span>WO</span>
              </button>
              <button
                type="button"
                onClick={() => setLang('fr')}
                className={`min-h-[24px] px-2 py-0.5 rounded-full text-[10px] flex items-center justify-center gap-1 transition-all ${
                  lang === 'fr'
                    ? 'bg-[#902e2a] text-white font-bold'
                    : 'text-[#574240] hover:text-[#902e2a] font-medium'
                }`}
                title="Langue Française"
              >
                <span className="material-symbols-outlined text-[12px]">translate</span>
                <span>FR</span>
              </button>
            </div>

            {/* SAMU 1515 Direct */}
            <a
              href="tel:1515"
              className="min-h-[26px] px-2.5 rounded-full bg-[#ba1a1a] hover:bg-[#902e2a] text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition-all"
            >
              <span className="material-symbols-outlined text-[13px]">call</span>
              <span>1515</span>
            </a>

            {/* Avatar */}
            <img
              alt="Profile"
              className="w-6 h-6 rounded-full object-cover ring-1 ring-[#aeeecb]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvavF8-Jf-IsqnS9F4cy8uZvFCqs34hbFzdsbQwmsm5nJWts7NQO10gzM-EW8-kC0cxXmEtC6POZi8SwxbOP90ardcI8n0H7VyqcQxX5w9HjQll-p_vsCMedW6SgYTqSg6j3Jz0tk671vb4LwBrZ4zl1Y5IPXwjmmA3Nwmsx8dmPtDTpxm7udAi3zoPD0Qj1V8TUyjBiyPD1REXhdv3b-GdC4_33O4c1JtRulAKSQ"
            />
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. HEADER MOBILE (Visible uniquement sur mobile < md)
          ========================================================================= */}
      <div className="md:hidden">
        <Navbar
          lang={lang}
          setLang={setLang}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isFramed={false}
        />
      </div>

      {/* =========================================================================
          3. CONTENU PRINCIPAL CALIBRÉ PLEIN ÉCRAN SANS SCROLL SUR ORDINATEUR
          - Mobile / Tablette : overflow-y-auto (scroll naturel avec padding bottom)
          - Ordinateur (lg+) : lg:overflow-hidden (100% visible sans scroll vertical)
          ========================================================================= */}
      <main className="flex-1 w-full pt-20 md:pt-1 pb-20 md:pb-1 bg-[#f8f9ff] overflow-y-auto lg:overflow-hidden flex flex-col justify-between">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 flex-1 flex flex-col justify-between h-full">
          <div className="flex-1 flex flex-col justify-center">
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
          </div>

          {/* Micro Footer 1-ligne sur ordinateur */}
          <footer className="hidden md:flex h-5 shrink-0 items-center justify-between text-[10px] text-[#574240] border-t border-[#ddc0bd]/30 mt-1 pt-0.5">
            <span className="font-bold text-[#902e2a]">SuturaSanté • UNICEF Femtech 2026 Sénégal</span>
            <span className="text-[#2c694e] font-semibold">100% Anonymisé • Protocole Sutura • Licence MIT</span>
          </footer>
        </div>
      </main>
    </div>
  );
}