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
    { id: 'pregnancy', label: 'Grossesse & CPN', icon: 'pregnant_woman' },
    { id: 'triage', label: 'Signes Danger', icon: 'health_and_safety' },
    { id: 'guide', label: 'Conseils & Guide', icon: 'menu_book' },
    { id: 'emergency', label: 'Urgences 1515', icon: 'phone_in_talk', isEmergency: true },
    { id: 'metrics', label: 'Impact UNICEF (DPG)', icon: 'analytics' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#171c23] flex flex-col md:flex-row antialiased">
      {/* =========================================================================
          1. SIDEBAR DESKTOP OFFICIELLE STITCH (Visible à partir de md: >= 768px)
          ========================================================================= */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-72 bg-[#f0f4fd] z-50 flex-col justify-between py-6 px-5 border-r border-[#ddc0bd]/40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col gap-6">
          {/* Logo et Sous-titre officiel Stitch */}
          <div
            className="flex flex-col gap-1 cursor-pointer select-none"
            onClick={() => setActiveTab('pregnancy')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#902e2a] flex items-center justify-center text-white font-serif text-xl font-bold shadow-xs">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-[1.25rem] text-[#902e2a] font-bold tracking-tight leading-none">
                  SuturaSanté
                </span>
                <span className="text-[0.6875rem] text-[#574240] uppercase tracking-wider font-bold mt-0.5">
                  Santé Maternelle • Sénégal
                </span>
              </div>
            </div>

            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#aeeecb] text-[#316e52] w-fit shadow-xs">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span className="text-[0.6875rem] font-bold">DPG Verified #MIT-2026</span>
            </div>
          </div>

          {/* Navigation latérale principale */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-[0.875rem] transition-all text-left ${
                    isActive
                      ? item.isEmergency
                        ? 'bg-[#ba1a1a] text-white font-bold shadow-sm'
                        : 'bg-[#902e2a] text-white font-bold shadow-sm'
                      : item.isEmergency
                      ? 'text-[#ba1a1a] hover:bg-[#ffdad6]/60 font-semibold'
                      : 'text-[#574240] hover:bg-[#eaeef8] hover:text-[#171c23]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.isEmergency && (
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bloc Confidentialité Sutura & Version bas de sidebar */}
        <div className="flex flex-col gap-3">
          <div className="p-3.5 rounded-xl bg-white border border-[#ddc0bd]/40 flex flex-col gap-1 shadow-xs">
            <div className="flex items-center gap-1.5 text-[#2c694e]">
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
              <span className="text-[0.75rem] font-bold">100% Anonymisé</span>
            </div>
            <p className="text-[0.75rem] text-[#574240] leading-snug">
              Zéro donnée nominative stockée conformément au protocole éthique Sutura.
            </p>
          </div>

          <div className="flex items-center justify-between text-[#574240] text-[0.6875rem] pt-1 border-t border-[#ddc0bd]/30">
            <span>UNICEF Femtech 2026</span>
            <span className="font-bold text-[#902e2a]">v2.4-DPG Sénégal</span>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          2. HEADER DESKTOP SUPERIEUR (Visible à partir de md: >= 768px)
          ========================================================================= */}
      <header className="hidden md:flex fixed top-0 left-72 right-0 h-20 bg-[#f8f9ff]/90 backdrop-blur-xl z-40 border-b border-[#ddc0bd]/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="w-full h-full px-8 flex items-center justify-between gap-4">
          {/* Titre & Indicateur Temps Réel */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#eaeef8] text-[#902e2a] font-bold text-[0.75rem]">
                UNICEF
              </span>
              <span className="text-[#8a716f]">×</span>
              <span className="font-serif font-bold text-[#171c23] text-lg">
                Portail National Santé Femtech
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f4fd] text-[#2c694e] border border-[#aeeecb]/60">
              <span className="w-2 h-2 rounded-full bg-[#2c694e] animate-pulse"></span>
              <span className="text-[0.75rem] font-bold">Flux temps réel • Mode hors-ligne prêt</span>
            </div>
          </div>

          {/* Actions : Switch Langue + Bouton SAMU + Profil */}
          <div className="flex items-center gap-3">
            {/* Switch Langue Wolof / Français */}
            <div
              aria-label="Choix de langue"
              className="inline-flex items-center bg-[#eaeef8] rounded-full p-1 border border-[#ddc0bd]/40"
              role="group"
            >
              <button
                type="button"
                onClick={() => setLang('wo')}
                className={`min-h-[36px] px-3 py-1 rounded-full text-[0.8125rem] flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all ${
                  lang === 'wo'
                    ? 'bg-[#902e2a] text-white font-bold'
                    : 'text-[#171c23] hover:text-[#902e2a] font-medium'
                }`}
                title="Langue Wolof avec guidage audio"
              >
                <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
                <span>WO (Wolof)</span>
              </button>
              <button
                type="button"
                onClick={() => setLang('fr')}
                className={`min-h-[36px] px-3 py-1 rounded-full text-[0.8125rem] flex items-center justify-center gap-1 transition-all ${
                  lang === 'fr'
                    ? 'bg-[#902e2a] text-white font-bold'
                    : 'text-[#574240] hover:text-[#902e2a] font-medium'
                }`}
                title="Langue Française"
              >
                <span className="material-symbols-outlined text-[16px]">translate</span>
                <span>FR (Français)</span>
              </button>
            </div>

            {/* Bouton d'Urgence SAMU 1515 Direct */}
            <a
              href="tel:1515"
              className="min-h-[40px] px-4 rounded-full bg-[#ba1a1a] hover:bg-[#902e2a] text-white font-bold text-[0.8125rem] flex items-center gap-2 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>SAMU 1515 (Gratuit 24/7)</span>
            </a>

            {/* Avatar Utilisatrice / Sage-Femme */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#ddc0bd]/40">
              <img
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#aeeecb]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvavF8-Jf-IsqnS9F4cy8uZvFCqs34hbFzdsbQwmsm5nJWts7NQO10gzM-EW8-kC0cxXmEtC6POZi8SwxbOP90ardcI8n0H7VyqcQxX5w9HjQll-p_vsCMedW6SgYTqSg6j3Jz0tk671vb4LwBrZ4zl1Y5IPXwjmmA3Nwmsx8dmPtDTpxm7udAi3zoPD0Qj1V8TUyjBiyPD1REXhdv3b-GdC4_33O4c1JtRulAKSQ"
              />
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          3. NAVBAR MOBILE (Visible uniquement sur mobile < md)
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
          4. CONTENU PRINCIPAL (ADAPTÉ ÉCRAN LARGE SUR ORDINATEUR & FLUIDE SUR MOBILE)
          ========================================================================= */}
      <main className="flex-1 w-full md:pl-72 pt-28 md:pt-24 pb-32 md:pb-12 bg-[#f8f9ff] min-h-screen">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
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
      </main>
    </div>
  );
}
