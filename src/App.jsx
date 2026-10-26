import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DispensaryDashboard from './components/DispensaryDashboard';
import ClinicalTriageConsole from './components/ClinicalTriageConsole';
import MotherFileDashboard from './components/MotherFileDashboard';
import PublicImpactMetrics from './components/PublicImpactMetrics';
import AdminDashboard from './components/AdminDashboard';
import PregnancyCalculator from './components/PregnancyCalculator';
import DangerSignsTriage from './components/DangerSignsTriage';
import ReproductiveHealthGuide from './components/ReproductiveHealthGuide';
import DirectoryView from './components/DirectoryView';

export default function App() {
  const [lang, setLang] = useState('wo');
  // Onglet actif : 'dispensary', 'clinical-triage', 'mother-file', 'metrics', 'admin', 'patient'
  const [activeTab, setActiveTab] = useState('dispensary');

  // Sous-onglet pour la vue Patiente PWA
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

  // Liste des menus de la Sidebar Desktop (Conforme Stitch Exact)
  const sidebarNavItems = [
    {
      id: 'dispensary',
      label: 'Tableau de Bord CPN',
      icon: 'grid_view',
      desc: 'File d\'attente & Consultations',
    },
    {
      id: 'clinical-triage',
      label: 'Triage & SAMU 1515',
      icon: 'notifications_active',
      desc: 'Console régulation SONU',
      isEmergency: true,
    },
    {
      id: 'mother-file',
      label: 'Dossier Mères',
      icon: 'folder_shared',
      desc: 'Fiches de suivi terrain',
    },
    {
      id: 'metrics',
      label: 'Impact UNICEF (DPG)',
      icon: 'analytics',
      desc: 'Observatoire National DPG',
    },
    {
      id: 'admin',
      label: 'Dashboard Admin',
      icon: 'admin_panel_settings',
      desc: 'Gestion site, centres & badiens',
    },
    {
      id: 'patient',
      label: 'Mode Patiente (PWA)',
      icon: 'phone_iphone',
      desc: 'Vue mobile mamans',
    },
  ];

  return (
    <div className="min-h-screen w-screen bg-[#f8f9ff] text-[#171c23] flex flex-col antialiased selection:bg-[#ffdad6] selection:text-[#902e2a]">
      {/* =========================================================================
          1. SIDEBAR DESKTOP FIXE À GAUCHE (Stitch Exact)
          ========================================================================= */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 lg:w-72 bg-[#f0f4fd] z-50 flex-col justify-between py-6 px-4 border-r border-[#ddc0bd]/40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col gap-5">
          {/* Logo officiel SuturaSanté */}
          <div
            className="px-2 flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setActiveTab('dispensary')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#902e2a] flex items-center justify-center text-white shadow-xs font-serif text-lg font-bold">
              S
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-lg font-bold text-[#902e2a] tracking-tight">
                SuturaSanté
              </span>
              <span className="text-[10px] text-[#574240] uppercase tracking-wider font-bold">
                UNICEF FemTech SN
              </span>
            </div>
          </div>

          {/* Badge Poste Sanitaire / Station Badien Gox */}
          <div className="px-3 py-2.5 rounded-xl bg-[#eaeef8] flex items-center gap-2.5 border border-[#ddc0bd]/30">
            <span className="material-symbols-outlined text-[#2c694e] text-[20px]">
              verified_user
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-[#171c23] font-bold">
                Badien Gox Station
              </span>
              <span className="text-[10px] text-[#574240]">
                Dispensaire Pikine Icotaf
              </span>
            </div>
          </div>

          {/* Navigation Liens de Pages */}
          <nav className="flex flex-col gap-1.5 pt-1">
            {sidebarNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isActive
                      ? item.isEmergency
                        ? 'bg-[#ba1a1a] text-white shadow-xs'
                        : 'bg-[#902e2a] text-white shadow-xs'
                      : item.isEmergency
                      ? 'text-[#ba1a1a] hover:bg-[#ffdad6]/60'
                      : 'text-[#574240] hover:bg-[#eaeef8] hover:text-[#171c23]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] shrink-0 ${
                      isActive ? 'text-white' : item.isEmergency ? 'text-[#ba1a1a]' : 'text-[#902e2a]'
                    }`}
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate leading-tight">
                      {item.label}
                    </span>
                    <span className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-[#574240]'}`}>
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bas de Sidebar : Guidage Vocal Wolof & Système */}
        <div className="flex flex-col gap-3 px-1">
          <div className="p-3 rounded-xl bg-[#aeeecb]/40 border border-[#2c694e]/30 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2c694e] text-[18px]">
                volume_up
              </span>
              <span className="text-xs font-bold text-[#002114]">
                Déglul ci Wolof
              </span>
            </div>
            <p className="text-[11px] text-[#0e5138] leading-snug">
              Guidage vocal actif pour patientes non-lettrées.
            </p>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-[#574240]">
              Sutura Health OS • v2.4 Senegal • MIT
            </span>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          2. HEADER DESKTOP SUPÉRIEUR (Décalé de la largeur de la sidebar)
          ========================================================================= */}
      <header className="hidden md:flex h-16 shrink-0 sticky top-0 bg-[#f8f9ff]/90 backdrop-blur-xl z-40 border-b border-[#ddc0bd]/40 shadow-[0_1px_4px_rgba(0,0,0,0.03)] md:pl-64 lg:pl-72 px-6">
        <div className="w-full max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
          {/* Statut Réseau & Localisation */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#aeeecb] text-[#316e52] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#2c694e] animate-pulse"></span>
              <span className="text-xs font-bold tracking-tight">
                Mode Hors-ligne Actif - 100% AES-GCM
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eaeef8] text-[#574240] text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px] text-[#902e2a]">
                location_city
              </span>
              <span className="text-[#171c23]">District Sanitaire Pikine - Poste Icotaf</span>
            </div>
          </div>

          {/* Switch de Langue & SAMU 1515 */}
          <div className="flex items-center gap-3">
            <div
              aria-label="Choix de langue"
              className="inline-flex items-center bg-[#eaeef8] p-0.5 rounded-full border border-[#ddc0bd]/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <button
                type="button"
                onClick={() => setLang('wo')}
                className={`min-h-[30px] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  lang === 'wo'
                    ? 'bg-[#902e2a] text-white shadow-xs'
                    : 'text-[#574240] hover:text-[#902e2a] hover:bg-white/70'
                }`}
                title="Wolof - Guidage vocal et audio"
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
                className={`min-h-[30px] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
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

            <a
              href="tel:1515"
              className="min-h-[34px] px-4 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>SAMU 1515</span>
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================================
          3. HEADER MOBILE (Visible uniquement sur mobile < md)
          ========================================================================= */}
      <div className="md:hidden">
        <Navbar
          lang={lang}
          setLang={setLang}
          activeTab={activeTab === 'dispensary' || activeTab === 'clinical-triage' || activeTab === 'mother-file' || activeTab === 'admin' ? 'dispensary' : activeTab}
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
          4. CONTENU PRINCIPAL (Décalé sur Desktop par md:pl-64 lg:pl-72)
          ========================================================================= */}
      <main className="flex-1 w-full pt-20 md:pt-6 pb-24 md:pb-12 bg-[#f8f9ff] md:pl-64 lg:pl-72">
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

          {/* DASHBOARD 5: CONSOLE D'ADMINISTRATION DU SITE */}
          {activeTab === 'admin' && (
            <AdminDashboard
              lang={lang}
              onActionTrack={trackAction}
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
