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
    <div className="min-h-screen bg-[#f8f9ff] text-[#171c23] flex flex-col antialiased overflow-x-hidden selection:bg-[#ffdad6] selection:text-[#902e2a]">
      {/* =========================================================================
          1. HEADER DESKTOP & TABLETTE (Visible à partir de md: >= 768px)
          Adaptatif : Tablette (768px-1024px), Laptop (1024px-1440px), Grand Écran (1440px+)
          ========================================================================= */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 h-20 bg-[#f8f9ff]/95 backdrop-blur-xl z-50 border-b border-[#ddc0bd]/40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 xl:px-8 h-full flex items-center justify-between gap-2 lg:gap-4">
          {/* Logo et Identité à Gauche */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
            onClick={() => setActiveTab('pregnancy')}
          >
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-[#902e2a] flex items-center justify-center text-white font-serif text-lg lg:text-xl font-bold shadow-xs">
              S
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-base lg:text-[1.25rem] text-[#902e2a] font-bold tracking-tight leading-none">
                  SuturaSanté
                </span>
                <span className="hidden xl:inline text-[9px] px-1.5 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] font-bold">
                  DPG Verified
                </span>
              </div>
              <span className="text-[10px] lg:text-[0.6875rem] text-[#574240] font-semibold leading-tight">
                Santé Maternelle • Sénégal
              </span>
            </div>
          </div>

          {/* MENU DE NAVIGATION HAUT (Responsive : s'adapte de tablette à grand écran) */}
          <nav className="flex items-center bg-[#eaeef8] rounded-2xl p-1 gap-0.5 lg:gap-1 border border-[#ddc0bd]/40 shadow-xs overflow-x-auto">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`min-h-[38px] lg:min-h-[40px] px-2.5 lg:px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? item.isEmergency
                        ? 'bg-[#ba1a1a] text-white shadow-sm'
                        : 'bg-[#902e2a] text-white shadow-sm'
                      : item.isEmergency
                      ? 'text-[#ba1a1a] hover:bg-[#ffdad6]/60'
                      : 'text-[#574240] hover:bg-white hover:text-[#171c23]'
                  }`}
                  title={item.fullLabel}
                >
                  <span
                    className="material-symbols-outlined text-[17px] lg:text-[18px]"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  {/* Affichage court sur tablette, long sur grand écran */}
                  <span className="inline lg:hidden">{item.shortLabel}</span>
                  <span className="hidden lg:inline">{item.fullLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions Droite : Langue + SAMU 1515 + Profil */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            {/* Switch Langue Wolof / Français */}
            <div
              aria-label="Choix de langue"
              className="inline-flex items-center bg-[#eaeef8] rounded-full p-0.5 border border-[#ddc0bd]/40"
              role="group"
            >
              <button
                type="button"
                onClick={() => setLang('wo')}
                className={`min-h-[32px] lg:min-h-[34px] px-2.5 lg:px-3 py-1 rounded-full text-xs flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all ${
                  lang === 'wo'
                    ? 'bg-[#902e2a] text-white font-bold'
                    : 'text-[#171c23] hover:text-[#902e2a] font-medium'
                }`}
                title="Langue Wolof avec guidage audio"
              >
                <span className="material-symbols-outlined text-[14px]">record_voice_over</span>
                <span>WO</span>
              </button>
              <button
                type="button"
                onClick={() => setLang('fr')}
                className={`min-h-[32px] lg:min-h-[34px] px-2.5 lg:px-3 py-1 rounded-full text-xs flex items-center justify-center gap-1 transition-all ${
                  lang === 'fr'
                    ? 'bg-[#902e2a] text-white font-bold'
                    : 'text-[#574240] hover:text-[#902e2a] font-medium'
                }`}
                title="Langue Française"
              >
                <span className="material-symbols-outlined text-[14px]">translate</span>
                <span>FR</span>
              </button>
            </div>

            {/* Bouton d'Urgence SAMU 1515 Direct */}
            <a
              href="tel:1515"
              className="min-h-[36px] lg:min-h-[38px] px-2.5 lg:px-3.5 rounded-full bg-[#ba1a1a] hover:bg-[#902e2a] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span className="hidden lg:inline">1515 (SAMU)</span>
              <span className="inline lg:hidden">1515</span>
            </a>

            {/* Avatar */}
            <div className="flex items-center pl-1">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#aeeecb]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvavF8-Jf-IsqnS9F4cy8uZvFCqs34hbFzdsbQwmsm5nJWts7NQO10gzM-EW8-kC0cxXmEtC6POZi8SwxbOP90ardcI8n0H7VyqcQxX5w9HjQll-p_vsCMedW6SgYTqSg6j3Jz0tk671vb4LwBrZ4zl1Y5IPXwjmmA3Nwmsx8dmPtDTpxm7udAi3zoPD0Qj1V8TUyjBiyPD1REXhdv3b-GdC4_33O4c1JtRulAKSQ"
              />
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. HEADER MOBILE (Visible uniquement sur mobile < md: < 768px)
          Adapté pour smartphones de petite à grande taille (320px - 767px)
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
          3. CONTENU PRINCIPAL RESPONSIVE
          Fluide sur mobile (pt-28 pb-32), spacieux sur tablette et bureau (md:pt-28 md:pb-16)
          ========================================================================= */}
      <main className="flex-1 w-full pt-28 md:pt-28 pb-36 md:pb-16 bg-[#f8f9ff]">
        <div className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
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

          {/* Pied de page institutionnel responsive */}
          <footer className="mt-12 pt-6 border-t border-[#ddc0bd]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#574240] gap-3 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="font-bold text-[#902e2a]">SuturaSanté</span>
              <span>•</span>
              <span>UNICEF Femtech Innovation Fund 2026 (Sénégal)</span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5">
              <span className="inline-flex items-center gap-1 text-[#2c694e] font-semibold">
                <span className="material-symbols-outlined text-[14px]">lock_open</span>
                100% Anonymisé • Protocole Sutura
              </span>
              <span>•</span>
              <span>Licence MIT</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
