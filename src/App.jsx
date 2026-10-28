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

  // Mode principal :
  // false = Site Public SuturaSanté (par défaut)
  // true = Espace Dashboards Cliniques & Admin (accessible via le bouton en bas dans le footer)
  const [isDashboardMode, setIsDashboardMode] = useState(false);

  // État d'ouverture du Chatbot IA Sutura (vocal et écrit)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Onglet actif pour le site public : 'pregnancy', 'triage', 'guide', 'emergency', 'metrics'
  const [publicTab, setPublicTab] = useState('pregnancy');

  // Onglet actif pour les dashboards : 'dispensary', 'clinical-triage', 'mother-file', 'metrics', 'admin'
  const [dashboardTab, setDashboardTab] = useState('dispensary');

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

  // Menus du site public (en haut sur ordinateur)
  const siteNavItems = [
    { id: 'pregnancy', shortLabel: 'Grossesse', fullLabel: 'Grossesse & CPN', icon: 'pregnant_woman' },
    { id: 'triage', shortLabel: 'Signes Danger', fullLabel: 'Vérification Signes de Danger', icon: 'health_and_safety' },
    { id: 'guide', shortLabel: 'Conseils', fullLabel: 'Conseils & Nutrition Locale', icon: 'menu_book' },
    { id: 'emergency', shortLabel: 'Urgences', fullLabel: 'Urgences SAMU 1515', icon: 'phone_in_talk', isEmergency: true },
    { id: 'metrics', shortLabel: 'Impact DPG', fullLabel: 'Observatoire Impact UNICEF', icon: 'analytics' },
  ];

  // Menus des dashboards (dans la sidebar sur ordinateur)
  const dashboardSidebarItems = [
    {
      id: 'dispensary',
      label: 'Dispensaire CPN',
      icon: 'grid_view',
      desc: 'File d\'attente & Consultations',
    },
    {
      id: 'clinical-triage',
      label: 'Console SAMU 1515',
      icon: 'emergency',
      desc: 'Régulation SONU & Lits réa',
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
  ];

  return (
    <div className="min-h-screen w-screen bg-[#f8f9ff] text-[#171c23] flex flex-col antialiased selection:bg-[#ffdad6] selection:text-[#902e2a]">
      {/* =========================================================================
          UNIVERS 1 : SITE PUBLIC SUTURASANTÉ (Affichage par défaut)
          ========================================================================= */}
      {!isDashboardMode ? (
        <div className="min-h-screen flex flex-col w-full">
          {/* HEADER DU SITE SUR ORDINATEUR (Menu du haut fin et équilibré) */}
          <header className="hidden md:flex h-14 shrink-0 sticky top-0 bg-[#f8f9ff]/95 backdrop-blur-xl z-50 border-b border-[#ddc0bd]/40 shadow-[0_1px_4px_rgba(0,0,0,0.03)] px-4 lg:px-8">
            <div className="w-full max-w-6xl mx-auto h-full flex items-center justify-between gap-3">
              {/* Logo SuturaSanté */}
              <div
                className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
                onClick={() => setPublicTab('pregnancy')}
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

              {/* Menu haut du site */}
              <nav className="flex items-center bg-[#eaeef8] rounded-full p-1 gap-1 border border-[#ddc0bd]/40 shadow-xs">
                {siteNavItems.map((item) => {
                  const isActive = publicTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPublicTab(item.id)}
                      className={`min-h-[30px] px-3.5 py-1 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
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

                {/* Séparateur discret */}
                <span className="w-px h-4 bg-[#ddc0bd]/60 mx-1"></span>

                {/* Accès direct Espace Pro & Admin */}
                <button
                  type="button"
                  onClick={() => setIsDashboardMode(true)}
                  className="min-h-[30px] px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 text-[#902e2a] hover:bg-white hover:shadow-xs"
                  title="Accéder aux tableaux de bord cliniques, file d'attente CPN et console admin"
                >
                  <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                  <span>Espace Pro &amp; Admin</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2c694e] animate-pulse"></span>
                </button>
              </nav>

              {/* Actions Droite : Switcher Langue + SAMU 1515 */}
              <div className="flex items-center gap-2.5 shrink-0">
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

                {/* Bouton Chatbot IA Sutura (Vocal & Écrit) */}
                <button
                  type="button"
                  onClick={() => setIsChatbotOpen((prev) => !prev)}
                  className="min-h-[30px] px-3 rounded-full bg-gradient-to-r from-[#902e2a] to-[#ba1a1a] hover:from-[#7a2420] hover:to-[#902e2a] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                  title="Ouvrir le Chatbot IA Sutura (Vocal & Écrit)"
                >
                  <span className="material-symbols-outlined text-[15px]">smart_toy</span>
                  <span>Chat IA</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#aeeecb] animate-pulse"></span>
                </button>

                <a
                  href="tel:1515"
                  className="min-h-[30px] px-3.5 rounded-full bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <span className="material-symbols-outlined text-[14px]">call</span>
                  <span>1515</span>
                </a>
              </div>
            </div>
          </header>

          {/* HEADER MOBILE (< md) */}
          <div className="md:hidden">
            <Navbar
              lang={lang}
              setLang={setLang}
              activeTab={publicTab}
              setActiveTab={setPublicTab}
              isFramed={false}
              onOpenChatbot={() => setIsChatbotOpen(true)}
              onOpenAdmin={() => setIsDashboardMode(true)}
            />
          </div>

          {/* CONTENU PRINCIPAL DU SITE EN FLEX NATUREL */}
          <main className="flex-1 w-full pt-20 md:pt-6 pb-24 md:pb-12 bg-[#f8f9ff]">
            <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col gap-6">
              {publicTab === 'pregnancy' && (
                <PregnancyCalculator
                  onNavigateToTriage={() => setPublicTab('triage')}
                  onActionTrack={trackAction}
                  lang={lang}
                />
              )}

              {publicTab === 'triage' && (
                <DangerSignsTriage
                  onNavigateToEmergency={() => setPublicTab('emergency')}
                  onActionTrack={trackAction}
                />
              )}

              {publicTab === 'guide' && (
                <ReproductiveHealthGuide
                  lang={lang}
                  onActionTrack={trackAction}
                />
              )}

              {publicTab === 'emergency' && (
                <DirectoryView
                  lang={lang}
                  onActionTrack={trackAction}
                />
              )}

              {publicTab === 'metrics' && (
                <PublicImpactMetrics
                  metricsData={metrics}
                  lang={lang}
                />
              )}

              {/* =========================================================================
                  FOOTER DU SITE : AVEC LE BOUTON ESPACE POUR OUVRIR LES DASHBOARDS
                  ========================================================================= */}
              <footer className="w-full pt-6 mt-4 border-t border-[#ddc0bd]/40 flex flex-col md:flex-row items-center justify-between text-xs text-[#574240] gap-3">
                <span className="font-bold text-[#902e2a]">
                  Sam Corporate • SuturaSanté • UNICEF Femtech 2026 Sénégal
                </span>

                {/* BOUTON ESPACE DASHBOARD DANS LE FOOTER */}
                <button
                  type="button"
                  onClick={() => setIsDashboardMode(true)}
                  className="px-4 py-2 rounded-full bg-[#eaeef8] hover:bg-[#dee2ec] text-[#902e2a] border border-[#ddc0bd]/60 font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
                  title="Accéder aux tableaux de bord cliniques, file d'attente CPN et console admin"
                >
                  <span className="material-symbols-outlined text-[18px]">space_dashboard</span>
                  <span>Espace Dashboards &amp; Clinique</span>
                  <span className="w-2 h-2 rounded-full bg-[#2c694e] animate-pulse"></span>
                </button>

                <span className="text-[#2c694e] font-semibold">
                  Sam Corporate • 100% Anonymisé • Protocole Sutura • Licence MIT
                </span>
              </footer>
            </div>
          </main>
        </div>
      ) : (
        /* =========================================================================
           UNIVERS 2 : ESPACE DASHBOARDS & ADMIN (Avec Sidebar Latérale sur Desktop)
           ========================================================================= */
        <div className="min-h-screen flex flex-col w-full">
          {/* SIDEBAR DESKTOP FIXE À GAUCHE */}
          <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 lg:w-72 bg-[#f0f4fd] z-50 flex-col justify-between py-6 px-4 border-r border-[#ddc0bd]/40 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col gap-4">
              {/* Bouton pour revenir au site public */}
              <button
                type="button"
                onClick={() => setIsDashboardMode(false)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white hover:bg-[#eaeef8] text-[#902e2a] border border-[#ddc0bd]/50 text-xs font-bold transition-all shadow-xs cursor-pointer group"
              >
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-0.5 transition-transform">
                    arrow_back
                  </span>
                  <span>Retour au Site Public</span>
                </span>
                <span className="text-[10px] bg-[#eaeef8] px-2 py-0.5 rounded-full text-[#574240]">
                  Sortir
                </span>
              </button>

              {/* Logo officiel SuturaSanté */}
              <div className="px-2 flex items-center gap-3 select-none">
                <div className="w-10 h-10 rounded-xl bg-[#902e2a] flex items-center justify-center text-white shadow-xs font-serif text-lg font-bold">
                  S
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-serif text-lg font-bold text-[#902e2a] tracking-tight">
                    SuturaSanté
                  </span>
                  <span className="text-[10px] text-[#574240] uppercase tracking-wider font-bold">
                    Espace Clinique Pro
                  </span>
                </div>
              </div>

              {/* Badge Station Dispensaire */}
              <div className="px-3 py-2 rounded-xl bg-[#eaeef8] flex items-center gap-2 border border-[#ddc0bd]/30">
                <span className="material-symbols-outlined text-[#2c694e] text-[18px]">
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

              {/* Navigation des Dashboards */}
              <nav className="flex flex-col gap-1.5 pt-1">
                {dashboardSidebarItems.map((item) => {
                  const isActive = dashboardTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDashboardTab(item.id)}
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

            {/* Bas de Sidebar */}
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

          {/* HEADER DASHBOARD DESKTOP (Décalé à gauche) */}
          <header className="hidden md:flex h-16 shrink-0 sticky top-0 bg-[#f8f9ff]/90 backdrop-blur-xl z-40 border-b border-[#ddc0bd]/40 shadow-[0_1px_4px_rgba(0,0,0,0.03)] md:pl-64 lg:pl-72 px-6">
            <div className="w-full max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
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
                  <span className="text-[#171c23]">District Pikine - Poste Icotaf</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Switcher Langue */}
                <div
                  aria-label="Choix de langue"
                  className="inline-flex items-center bg-[#eaeef8] p-0.5 rounded-full border border-[#ddc0bd]/50"
                >
                  <button
                    type="button"
                    onClick={() => setLang('wo')}
                    className={`min-h-[30px] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                      lang === 'wo' ? 'bg-[#902e2a] text-white shadow-xs' : 'text-[#574240]'
                    }`}
                  >
                    <span>Wolof</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('fr')}
                    className={`min-h-[30px] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                      lang === 'fr' ? 'bg-[#902e2a] text-white shadow-xs' : 'text-[#574240]'
                    }`}
                  >
                    <span>FR</span>
                  </button>
                </div>

                {/* Bouton rapide Retour au Site */}
                <button
                  type="button"
                  onClick={() => setIsDashboardMode(false)}
                  className="min-h-[34px] px-3.5 rounded-xl bg-white hover:bg-[#eaeef8] text-[#902e2a] border border-[#ddc0bd]/60 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Quitter l'Espace</span>
                </button>

                <a
                  href="tel:1515"
                  className="min-h-[34px] px-4 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>1515</span>
                </a>
              </div>
            </div>
          </header>

          {/* BANDEAU SUPÉRIEUR DASHBOARD SUR MOBILE (< md) */}
          <div className="md:hidden bg-white border-b border-[#ddc0bd]/40 p-3 sticky top-0 z-40 flex flex-col gap-2 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm text-[#902e2a]">Espace Dashboards</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] font-bold">Pro</span>
              </div>
              <button
                type="button"
                onClick={() => setIsDashboardMode(false)}
                className="px-3 py-1 rounded-full bg-[#eaeef8] text-[#902e2a] text-xs font-bold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                <span>Retour au Site</span>
              </button>
            </div>

            {/* Menu défilant sur mobile pour les dashboards */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {dashboardSidebarItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDashboardTab(item.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 flex items-center gap-1 ${
                    dashboardTab === item.id
                      ? 'bg-[#902e2a] text-white'
                      : 'bg-[#eaeef8] text-[#574240]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CONTENU DU DASHBOARD ACTIF (Décalé à gauche sur Desktop) */}
          <main className="flex-1 w-full pt-4 md:pt-6 pb-20 md:pb-12 bg-[#f8f9ff] md:pl-64 lg:pl-72">
            <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col gap-6">
              {dashboardTab === 'dispensary' && (
                <DispensaryDashboard
                  lang={lang}
                  onActionTrack={trackAction}
                />
              )}

              {dashboardTab === 'clinical-triage' && (
                <ClinicalTriageConsole
                  lang={lang}
                  onActionTrack={trackAction}
                />
              )}

              {dashboardTab === 'mother-file' && (
                <MotherFileDashboard
                  lang={lang}
                  onActionTrack={trackAction}
                />
              )}

              {dashboardTab === 'metrics' && (
                <PublicImpactMetrics
                  metricsData={metrics}
                  lang={lang}
                />
              )}

              {dashboardTab === 'admin' && (
                <AdminDashboard
                  lang={lang}
                  onActionTrack={trackAction}
                  metrics={metrics}
                  onNavigateTab={(tab) => setDashboardTab(tab)}
                />
              )}

              {/* Footer dans l'espace dashboard */}
              <footer className="w-full pt-6 border-t border-[#ddc0bd]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#574240] gap-3">
                <span className="font-bold text-[#902e2a]">Sam Corporate • Espace Clinique Professionnel • Poste Pikine Icotaf</span>
                <button
                  type="button"
                  onClick={() => setIsDashboardMode(false)}
                  className="px-3.5 py-1 rounded-full bg-white hover:bg-[#eaeef8] text-[#902e2a] border border-[#ddc0bd] font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                  <span>Retourner au Site Public</span>
                </button>
                <span className="text-[#2c694e] font-semibold">Sam Corporate • 100% AES-GCM chiffré</span>
              </footer>
            </div>
          </main>
        </div>
      )}

      {/* CHATBOT IA SUTURA : ASSISTANCE VOCALE ET ÉCRITE BILINGUE */}
      <SuturaAIChatbot
        lang={lang}
        setLang={setLang}
        isOpen={isChatbotOpen}
        setIsOpen={setIsChatbotOpen}
        onNavigateTab={(tab) => {
          setIsDashboardMode(false);
          setPublicTab(tab);
        }}
      />
    </div>
  );
}
