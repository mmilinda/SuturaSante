import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PregnancyCalculator from './components/PregnancyCalculator';
import DangerSignsTriage from './components/DangerSignsTriage';
import ReproductiveHealthGuide from './components/ReproductiveHealthGuide';
import DirectoryView from './components/DirectoryView';
import PublicImpactMetrics from './components/PublicImpactMetrics';
import DispensaryDashboard from './components/DispensaryDashboard';
import ClinicalTriageConsole from './components/ClinicalTriageConsole';
import MotherFileDashboard from './components/MotherFileDashboard';
import AdminDashboard from './components/AdminDashboard';
import SuturaAIChatbot from './components/SuturaAIChatbot';
import { trackAnonymousEvent } from './utils/telemetry';

export default function App() {
  const [lang, setLang] = useState('wo');

  // État d'ouverture du Chatbot IA Sutura (vocal et écrit)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Onglet actif unifié (accessible directement sans aucun écran caché)
  // 'pregnancy' | 'triage' | 'guide' | 'emergency' | 'dispensary' | 'clinical-triage' | 'mother-file' | 'metrics' | 'admin'
  const [activeTab, setActiveTab] = useState('pregnancy');

  const [metrics, setMetrics] = useState({
    totalUsers: 48,
    audioListens: 93,
    triagesDone: 37,
    emergenciesHandled: 9,
    calculationsDone: 29,
  });

  // Récupération des métriques réelles depuis l'API backend au chargement
  useEffect(() => {
    fetch('/api/metrics')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.totalUsers) {
          setMetrics((prev) => ({
            ...prev,
            totalUsers: data.totalUsers,
            audioListens: data.audioListens,
            triagesDone: data.triagesDone,
            emergenciesHandled: data.emergenciesHandled,
            calculationsDone: data.calculationsDone,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const trackAction = (type, label = null) => {
    // Télémétrie éthique : envoi anonymisé d'événement sans PII ni compte
    trackAnonymousEvent(type, { lang, label });

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

  // Modules Mères & Patientes (Site Public)
  const patientNavItems = [
    { id: 'pregnancy', label: 'Grossesse', icon: 'pregnant_woman' },
    { id: 'triage', label: 'Signes Danger', icon: 'health_and_safety' },
    { id: 'guide', label: 'Conseils', icon: 'menu_book' },
    { id: 'emergency', label: '1515 Urgence', icon: 'phone_in_talk', isEmergency: true },
  ];

  // Modules Professionnels, SAMU & Administration (Espace Clinique)
  const proNavItems = [
    { id: 'dispensary', label: 'Dispensaire', icon: 'grid_view' },
    { id: 'clinical-triage', label: 'SAMU 1515', icon: 'emergency', isEmergency: true },
    { id: 'mother-file', label: 'Dossiers', icon: 'folder_shared' },
    { id: 'metrics', label: 'Impact DPG', icon: 'analytics' },
    { id: 'admin', label: 'Admin', icon: 'admin_panel_settings', hasBadge: true },
  ];

  return (
    <div className="min-h-screen w-screen bg-[#f8f9ff] text-[#171c23] flex flex-col antialiased selection:bg-[#ffdad6] selection:text-[#902e2a]">
      {/* =========================================================================
          HEADER DESKTOP DOUBLE-NIVEAU HAUT DE GAMME (Toutes sections visibles sans coupure)
          ========================================================================= */}
      <header className="hidden md:flex flex-col shrink-0 sticky top-0 bg-[#f8f9ff]/95 backdrop-blur-xl z-50 border-b border-[#ddc0bd]/40 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
        {/* LIGNE 1 : Identité, badges de sécurité, langue, IA et appel d'urgence */}
        <div className="w-full max-w-7xl mx-auto h-13 px-4 lg:px-8 flex items-center justify-between border-b border-[#ddc0bd]/25">
          {/* Logo & Identité */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
            onClick={() => setActiveTab('pregnancy')}
          >
            <div className="w-9 h-9 rounded-xl bg-[#902e2a] flex items-center justify-center text-white font-serif text-base font-bold shadow-xs">
              S
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-[#902e2a] tracking-tight">
                  SuturaSanté
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] font-bold">
                  UNICEF DPG
                </span>
              </div>
              <span className="text-[11px] text-[#574240] font-semibold">
                Santé &amp; Dignité Maternelle • District Pikine Icotaf
              </span>
            </div>
          </div>

          {/* Badges de conformité & Actions rapides */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#aeeecb]/60 text-[#2c694e] text-xs font-bold border border-[#2c694e]/20">
              <span className="w-2 h-2 rounded-full bg-[#2c694e] animate-pulse"></span>
              <span>100% Anonymisé • AES-GCM 256</span>
            </div>

            {/* Switcher Langue */}
            <div
              aria-label="Choix de langue"
              className="inline-flex items-center bg-[#eaeef8] p-0.5 rounded-full border border-[#ddc0bd]/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <button
                type="button"
                onClick={() => setLang('wo')}
                className={`relative min-h-[28px] px-3 py-0.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  lang === 'wo'
                    ? 'bg-[#902e2a] text-white shadow-xs'
                    : 'text-[#574240] hover:text-[#902e2a] hover:bg-white/70'
                }`}
                title="Wolof - Guidage vocal et audio"
              >
                <span
                  className="material-symbols-outlined text-[15px]"
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
                className={`relative min-h-[28px] px-3 py-0.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  lang === 'fr'
                    ? 'bg-[#902e2a] text-white shadow-xs'
                    : 'text-[#574240] hover:text-[#902e2a] hover:bg-white/70'
                }`}
                title="Français"
              >
                <span className="material-symbols-outlined text-[15px]">translate</span>
                <span>FR</span>
              </button>
            </div>

            {/* Bouton Chatbot IA Sutura (Vocal & Écrit) */}
            <button
              type="button"
              onClick={() => setIsChatbotOpen((prev) => !prev)}
              className="min-h-[30px] px-3.5 rounded-full bg-gradient-to-r from-[#902e2a] to-[#ba1a1a] hover:from-[#7a2420] hover:to-[#902e2a] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
              title="Ouvrir le Chatbot IA Sutura (Vocal & Écrit)"
            >
              <span className="material-symbols-outlined text-[15px]">smart_toy</span>
              <span>Chat IA Sutura</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#aeeecb] animate-pulse"></span>
            </button>

            {/* Bouton Appel d'urgence SAMU 1515 */}
            <a
              href="tel:1515"
              className="min-h-[30px] px-3.5 rounded-full bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
              title="Appel direct d'urgence médicale SAMU 1515"
            >
              <span className="material-symbols-outlined text-[15px]">call</span>
              <span>SAMU 1515</span>
            </a>
          </div>
        </div>

        {/* LIGNE 2 : BARRE DE NAVIGATION COMPLÈTE (Tous les 9 modules 100% visibles sans débordement) */}
        <div className="w-full max-w-7xl mx-auto h-11 px-2 sm:px-4 lg:px-8 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
          {/* Groupe 1 : Mères & Patientes */}
          <div className="flex items-center bg-[#eaeef8] rounded-full p-0.5 gap-0.5 border border-[#ddc0bd]/40 shadow-xs shrink-0">
            {patientNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`min-h-[28px] px-2.5 py-0.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? item.isEmergency
                        ? 'bg-[#ba1a1a] text-white shadow-xs'
                        : 'bg-[#902e2a] text-white shadow-xs'
                      : item.isEmergency
                      ? 'text-[#ba1a1a] hover:bg-[#ffdad6]/60'
                      : 'text-[#574240] hover:bg-white hover:text-[#171c23]'
                  }`}
                  title={item.label}
                >
                  <span
                    className="material-symbols-outlined text-[15px]"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Séparateur discret */}
          <div className="flex items-center px-1 shrink-0 text-[#ddc0bd] text-xs select-none">
            •
          </div>

          {/* Groupe 2 : Soignants, SAMU & Admin */}
          <div className="flex items-center bg-[#eaeef8] rounded-full p-0.5 gap-0.5 border border-[#ddc0bd]/40 shadow-xs shrink-0">
            {proNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`min-h-[28px] px-2.5 py-0.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? item.isEmergency
                        ? 'bg-[#ba1a1a] text-white shadow-xs'
                        : 'bg-[#902e2a] text-white shadow-xs'
                      : item.isEmergency
                      ? 'text-[#ba1a1a] hover:bg-[#ffdad6]/60'
                      : 'text-[#574240] hover:bg-white hover:text-[#171c23]'
                  }`}
                  title={item.label}
                >
                  <span
                    className="material-symbols-outlined text-[15px]"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.hasBadge && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2c694e] animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* =========================================================================
          HEADER & NAVIGATION MOBILE (< md)
          ========================================================================= */}
      <div className="md:hidden">
        <Navbar
          lang={lang}
          setLang={setLang}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isFramed={false}
          onOpenChatbot={() => setIsChatbotOpen(true)}
          onOpenAdmin={() => setActiveTab('admin')}
        />
      </div>

      {/* =========================================================================
          CONTENU PRINCIPAL UNIFIÉ (Spacieux, aéré et centré)
          ========================================================================= */}
      <main className="flex-1 w-full pt-20 md:pt-6 pb-24 md:pb-12 bg-[#f8f9ff]">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col gap-6">
          {/* Module 1 : Calculateur de Grossesse & Calendrier CPN */}
          {activeTab === 'pregnancy' && (
            <PregnancyCalculator
              onNavigateToTriage={() => setActiveTab('triage')}
              onActionTrack={trackAction}
              lang={lang}
            />
          )}

          {/* Module 2 : Signes de Danger & Triage Obstétrical */}
          {activeTab === 'triage' && (
            <DangerSignsTriage
              onNavigateToEmergency={() => setActiveTab('emergency')}
              onActionTrack={trackAction}
            />
          )}

          {/* Module 3 : Guide Santé Reproductive & Nutrition */}
          {activeTab === 'guide' && (
            <ReproductiveHealthGuide
              lang={lang}
              onActionTrack={trackAction}
            />
          )}

          {/* Module 4 : Annuaire d'Urgence & SAMU 1515 */}
          {activeTab === 'emergency' && (
            <DirectoryView
              lang={lang}
              onActionTrack={trackAction}
            />
          )}

          {/* Module 5 : File d'attente & Dispensaire CPN */}
          {activeTab === 'dispensary' && (
            <DispensaryDashboard
              lang={lang}
              onActionTrack={trackAction}
            />
          )}

          {/* Module 6 : Console SAMU 1515 & Régulation Lits SONU */}
          {activeTab === 'clinical-triage' && (
            <ClinicalTriageConsole
              lang={lang}
              onActionTrack={trackAction}
            />
          )}

          {/* Module 7 : Dossier Mères & Fiches Cliniques */}
          {activeTab === 'mother-file' && (
            <MotherFileDashboard
              lang={lang}
              onActionTrack={trackAction}
            />
          )}

          {/* Module 8 : Observatoire National Impact UNICEF (DPG) */}
          {activeTab === 'metrics' && (
            <PublicImpactMetrics
              metricsData={metrics}
              lang={lang}
            />
          )}

          {/* Module 9 : Dashboard Admin & Mémos des Marraines Badien Gox */}
          {activeTab === 'admin' && (
            <AdminDashboard
              lang={lang}
              onActionTrack={trackAction}
              metrics={metrics}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {/* FOOTER OFFICIEL GLOBAL */}
          <footer className="w-full pt-8 mt-4 border-t border-[#ddc0bd]/40 flex flex-col md:flex-row items-center justify-between text-xs text-[#574240] gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#902e2a]">
                Sam Corporate • SuturaSanté
              </span>
              <span className="text-[#ddc0bd]">|</span>
              <span>UNICEF Femtech 2026 Sénégal</span>
              <span className="text-[#ddc0bd]">|</span>
              <span className="font-semibold text-[#171c23]">Auteur MM (Milinda Mendy)</span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-[#2c694e] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2c694e]"></span>
                <span>100% Anonymisé • Protocole Sutura</span>
              </span>
              <span className="text-[#ddc0bd]">|</span>
              <span className="text-[#574240]">Licence MIT Open Source</span>
            </div>
          </footer>
        </div>
      </main>

      {/* =========================================================================
          CHATBOT IA SUTURA (FLOTTANT BILINGUE VOCAL & ÉCRIT)
          ========================================================================= */}
      <SuturaAIChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        lang={lang}
        onNavigate={(tab) => setActiveTab(tab)}
        onActionTrack={trackAction}
      />
    </div>
  );
}
