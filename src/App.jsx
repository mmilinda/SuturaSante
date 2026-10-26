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
    <div className="min-h-screen bg-[#f8f9ff] text-[#171c23] flex flex-col antialiased">
      {/* =========================================================================
          1. HEADER PRINCIPAL DESKTOP AVEC MENU HAUT COMPLET (md: >= 768px)
          (Suppression de la sidebar à la demande de l'utilisateur)
          ========================================================================= */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 h-20 bg-[#f8f9ff]/95 backdrop-blur-xl z-50 border-b border-[#ddc0bd]/40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="w-full max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">
          {/* Logo et Identité à Gauche */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
            onClick={() => setActiveTab('pregnancy')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#902e2a] flex items-center justify-center text-white font-serif text-xl font-bold shadow-xs">
              S
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif text-[1.25rem] text-[#902e2a] font-bold tracking-tight leading-none">
                  SuturaSanté
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] font-bold">
                  DPG Verified
                </span>
              </div>
              <span className="text-[0.6875rem] text-[#574240] font-semibold">
                Santé Maternelle • Sénégal
              </span>
            </div>
          </div>

          {/* MENU DE NAVIGATION CENTRAL AU HAUT SUR ORDINATEUR */}
          <nav className="flex items-center bg-[#eaeef8] rounded-2xl p-1 gap-1 border border-[#ddc0bd]/40 shadow-xs">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? item.isEmergency
                        ? 'bg-[#ba1a1a] text-white shadow-sm'
                        : 'bg-[#902e2a] text-white shadow-sm'
                      : item.isEmergency
                      ? 'text-[#ba1a1a] hover:bg-[#ffdad6]/60'
                      : 'text-[#574240] hover:bg-white hover:text-[#171c23]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions Droite : Langue + SAMU 1515 + Profil */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Switch Langue Wolof / Français */}
            <div
              aria-label="Choix de langue"
              className="inline-flex items-center bg-[#eaeef8] rounded-full p-0.5 border border-[#ddc0bd]/40"
              role="group"
            >
              <button
                type="button"
                onClick={() => setLang('wo')}
                className={`min-h-[34px] px-3 py-1 rounded-full text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all ${
                  lang === 'wo'
                    ? 'bg-[#902e2a] text-white font-bold'
                    : 'text-[#171c23] hover:text-[#902e2a] font-medium'
                }`}
                title="Langue Wolof avec guidage audio"
              >
                <span className="material-symbols-outlined text-[15px]">record_voice_over</span>
                <span>WO</span>
              </button>
              <button
                type="button"
                onClick={() => setLang('fr')}
                className={`min-h-[34px] px-3 py-1 rounded-full text-xs flex items-center justify-center gap-1 transition-all ${
                  lang === 'fr'
                    ? 'bg-[#902e2a] text-white font-bold'
                    : 'text-[#574240] hover:text-[#902e2a] font-medium'
                }`}
                title="Langue Française"
              >
                <span className="material-symbols-outlined text-[15px]">translate</span>
                <span>FR</span>
              </button>
            </div>

            {/* Bouton d'Urgence SAMU 1515 Direct */}
            <a
              href="tel:1515"
              className="min-h-[38px] px-3.5 rounded-full bg-[#ba1a1a] hover:bg-[#902e2a] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>1515 (SAMU)</span>
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
          3. CONTENU PRINCIPAL PLEINE LARGEUR CENTRÉ (SANS SIDEBAR)
          ========================================================================= */}
      <main className="flex-1 w-full pt-28 md:pt-28 pb-32 md:pb-16 bg-[#f8f9ff]">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
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

          {/* Pied de page institutionnel discret sur ordinateur */}
          <footer className="mt-12 pt-6 border-t border-[#ddc0bd]/40 flex flex-col md:flex-row items-center justify-between text-xs text-[#574240] gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#902e2a]">SuturaSanté</span>
              <span>•</span>
              <span>Candidature UNICEF Femtech Innovation Fund 2026 (Sénégal)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-[#2c694e] font-semibold">
                <span className="material-symbols-outlined text-[14px]">lock_open</span>
                100% Anonymisé &amp; Conforme Sutura
              </span>
              <span>•</span>
              <span>Licence MIT Open Source</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
