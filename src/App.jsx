import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DispensaryDashboard from './components/DispensaryDashboard';
import ClinicalTriageConsole from './components/ClinicalTriageConsole';
import MotherFileDashboard from './components/MotherFileDashboard';
import PublicImpactMetrics from './components/PublicImpactMetrics';
import PregnancyCalculator from './components/PregnancyCalculator';
import DangerSignsTriage from './components/DangerSignsTriage';
import ReproductiveHealthGuide from './components/ReproductiveHealthGuide';
import DirectoryView from './components/DirectoryView';

export default function App() {
  const [lang, setLang] = useState('wo');
  // Par défaut sur desktop : 'dispensary' (Tableau de Bord & File CPN du dispensaire)
  // Sur mobile, l'utilisateur navigue naturellement entre grossesse, triage, conseils, urgences
  const [activeTab, setActiveTab] = useState('dispensary');

  // Sous-onglet pour la vue Patiente PWA quand activeTab === 'patient' ou sur mobile
  const [patientSubTab, setPatientSubTab] = useState('calculator');

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

  // Navigation Desktop (Dashboards Stitch complets + Mode Patiente)
  const desktopNavItems = [
    { id: 'dispensary', shortLabel: 'Dispensaire CPN', fullLabel: "Tableau de Bord & File d'Attente CPN", icon: 'stethoscope' },
    { id: 'clinical-triage', shortLabel: 'Console SAMU', fullLabel: 'Triage Obstétrique & Urgences SAMU 1515', icon: 'emergency', isEmergency: true },
    { id: 'mother-file', shortLabel: 'Dossier Mère', fullLabel: "Dossier Mère - Fiche d'Admission Desktop", icon: 'folder_shared' },
    { id: 'metrics', shortLabel: 'Impact UNICEF', fullLabel: "Dashboard Public d'Impact DPG Sénégal", icon: 'analytics' },
    { id: 'patient', shortLabel: 'Vue Patiente PWA', fullLabel: 'Calculateur & Conseils Maman (PWA)', icon: 'pregnant_woman' },
  ];

  return (
    <div className="min-h-screen w-screen bg-[#f8f9ff] text-[#171c23] flex flex-col antialiased selection:bg-[#ffdad6] selection:text-[#902e2a]">
      {/* =========================================================================
          1. HEADER DESKTOP SLIM ET ÉPURÉ (Sticky en haut)
          ========================================================================= */}
      <header className="hidden md:flex h-14 shrink-0 sticky top-0 bg-[#f8f9ff]/95 backdrop-blur-xl z-50 border-b border-[#ddc0bd]/40 shadow-[0_1px_4px_rgba(0,0,0,0.03)] px-4 lg:px-8">
        <div className="w-full max-w-7xl mx-auto h-full flex items-center justify-between gap-3">
          {/* Logo compact */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
            onClick={() => setActiveTab('dispensary')}
          >
            <div className="w-8 h-8 rounded-xl bg-[#902e2a] flex items-center justify-center text-white font-serif text-sm font-bold shadow-xs">
              S
            </div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-serif text-base font-bold text-[#902e2a] tracking-tight">
                SuturaSanté
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] font-bold">
                DPG
              </span>
            </div>
          </div>

          {/* MENU CENTRAL COMPACT ET ÉQUILIBRÉ */}
          <nav className="flex items-center bg-[#eaeef8] rounded-full p-1 gap-1 border border-[#ddc0bd]/40 shadow-xs">
            {desktopNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`min-h-[30px] px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
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
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span>{item.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions Droite */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Sélecteur de Langue Segmenté */}
            <div
              aria-label="Choix de langue"
              className="inline-flex items-center bg-[#eaeef8] p-0.5 rounded-full border border-[#ddc0bd]/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
              role="group"
            >
              <button
                type="button"
                onClick={() => setLang('wo')}
                className={`relative min-h-[28px] px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                  lang === 'wo'
                    ? 'bg-[#902e2a] text-white shadow-xs'
                    : 'text-[#574240] hover:text-[#902e2a] hover:bg-white/70'
                }`}
                title="Wolof - Guidage vocal et audio Badien Gox"
              >
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: lang === 'wo' ? "'FILL' 1" : "'FILL' 0" }}
                >
                  record_voice_over
                </span>
                <span>Wolof</span>
                {lang === 'wo' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#aeeecb] animate-pulse"></span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setLang('fr')}
                className={`relative min-h-[28px] px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                  lang === 'fr'
                    ? 'bg-[#902e2a] text-white shadow-xs'
                    : 'text-[#574240] hover:text-[#902e2a] hover:bg-white/70'
                }`}
                title="Français"
              >
                <span className="material-symbols-outlined text-[14px]">translate</span>
                <span>FR</span>
              </button>
            </div>

            {/* SAMU 1515 Direct */}
            <a
              href="tel:1515"
              className="min-h-[30px] px-3 rounded-full bg-[#ba1a1a] hover:bg-[#902e2a] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
            >
              <span className="material-symbols-outlined text-[14px]">call</span>
              <span>1515</span>
            </a>
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
          activeTab={activeTab === 'dispensary' || activeTab === 'clinical-triage' || activeTab === 'mother-file' ? 'dispensary' : activeTab}
          setActiveTab={(tab) => {
            if (tab === 'dispensary') setActiveTab('dispensary');
            else if (tab === 'triage') setActiveTab('clinical-triage');
            else if (tab === 'metrics') setActiveTab('metrics');
            else {
              setActiveTab('patient');
              if (tab === 'pregnancy') setPatientSubTab('calculator');
              else if (tab === 'guide') setPatientSubTab('guide');
              else if (tab === 'emergency') setPatientSubTab('emergency');
            }
          }}
          isFramed={false}
        />
      </div>

      {/* =========================================================================
          3. CONTENU PRINCIPAL EN FLEX NATUREL (Prend la place nécessaire)
          ========================================================================= */}
      <main className="flex-1 w-full pt-20 md:pt-6 pb-24 md:pb-12 bg-[#f8f9ff]">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col gap-6">
          {/* DASHBOARD 1: DISPENSAIRE & FILE D'ATTENTE CPN */}
          {activeTab === 'dispensary' && (
            <DispensaryDashboard
              lang={lang}
              onActionTrack={trackAction}
            />
          )}

          {/* DASHBOARD 2: CONSOLE CLINIQUE & TRIAGE SAMU 1515 */}
          {activeTab === 'clinical-triage' && (
            <ClinicalTriageConsole
              lang={lang}
              onActionTrack={trackAction}
            />
          )}

          {/* DASHBOARD 3: DOSSIER MÈRE FICHE D'ADMISSION & SUIVI */}
          {activeTab === 'mother-file' && (
            <MotherFileDashboard
              lang={lang}
              onActionTrack={trackAction}
            />
          )}

          {/* DASHBOARD 4: IMPACT PUBLIC UNICEF (DPG) */}
          {activeTab === 'metrics' && (
            <PublicImpactMetrics
              metricsData={metrics}
              lang={lang}
            />
          )}

          {/* VUE PATIENTE PWA (Calculateur CPN, Triage rapide, Conseils, Urgences) */}
          {activeTab === 'patient' && (
            <div className="flex flex-col gap-5">
              {/* Sélecteur de sous-page Patiente */}
              <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl shadow-xs border border-[#ddc0bd]/40 flex-wrap gap-2">
                <span className="text-xs font-bold text-[#902e2a] px-2">
                  Vue Patiente (PWA Mobile) :
                </span>
                <div className="flex items-center gap-1.5 bg-[#eaeef8] p-1 rounded-xl flex-wrap">
                  <button
                    type="button"
                    onClick={() => setPatientSubTab('calculator')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      patientSubTab === 'calculator'
                        ? 'bg-[#902e2a] text-white shadow-xs'
                        : 'text-[#574240] hover:text-[#171c23]'
                    }`}
                  >
                    Calculateur CPN
                  </button>
                  <button
                    type="button"
                    onClick={() => setPatientSubTab('triage')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      patientSubTab === 'triage'
                        ? 'bg-[#902e2a] text-white shadow-xs'
                        : 'text-[#574240] hover:text-[#171c23]'
                    }`}
                  >
                    Signes Danger
                  </button>
                  <button
                    type="button"
                    onClick={() => setPatientSubTab('guide')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      patientSubTab === 'guide'
                        ? 'bg-[#902e2a] text-white shadow-xs'
                        : 'text-[#574240] hover:text-[#171c23]'
                    }`}
                  >
                    Conseils Nutrition
                  </button>
                  <button
                    type="button"
                    onClick={() => setPatientSubTab('emergency')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      patientSubTab === 'emergency'
                        ? 'bg-[#ba1a1a] text-white shadow-xs'
                        : 'text-[#ba1a1a] hover:bg-[#ffdad6]/60'
                    }`}
                  >
                    Urgences 1515
                  </button>
                </div>
              </div>

              {patientSubTab === 'calculator' && (
                <PregnancyCalculator
                  onNavigateToTriage={() => setPatientSubTab('triage')}
                  onActionTrack={trackAction}
                />
              )}

              {patientSubTab === 'triage' && (
                <DangerSignsTriage
                  onNavigateToEmergency={() => setPatientSubTab('emergency')}
                  onActionTrack={trackAction}
                />
              )}

              {patientSubTab === 'guide' && (
                <ReproductiveHealthGuide
                  lang={lang}
                  onActionTrack={trackAction}
                />
              )}

              {patientSubTab === 'emergency' && (
                <DirectoryView
                  lang={lang}
                  onActionTrack={trackAction}
                />
              )}
            </div>
          )}

          {/* Footer élégant */}
          <footer className="w-full pt-6 border-t border-[#ddc0bd]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#574240] gap-2">
            <span className="font-bold text-[#902e2a]">SuturaSanté • UNICEF Femtech 2026 Sénégal</span>
            <span className="text-[#2c694e] font-semibold">100% Anonymisé • Protocole Sutura • Licence MIT</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
