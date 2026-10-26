import React from 'react';

export default function Navbar({ lang, setLang, activeTab, setActiveTab, t }) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'pregnancy':
        return lang === 'wo' ? 'Topato Birr & CPN' : 'Grossesse & CPN';
      case 'triage':
        return lang === 'wo' ? 'Mandargay Musiba' : 'Signes Danger';
      case 'guide':
        return lang === 'wo' ? 'Digal & Xelal' : 'Conseils & Nutrition';
      case 'emergency':
        return lang === 'wo' ? 'Gawante & Fajuwaay' : 'Urgences & Annuaire';
      case 'metrics':
        return lang === 'wo' ? 'Njariñ UNICEF' : "Données d'Impact UNICEF";
      default:
        return 'SuturaSanté';
    }
  };

  return (
    <>
      {/* HEADER FIXE SUPÉRIEUR AVEC GLASSMORPHISM */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/20">
        <div className="max-w-md mx-auto h-28 px-4 flex flex-col justify-center gap-1">
          <div className="flex items-center justify-between w-full">
            {/* Logo & Slogan */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('pregnancy')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-xl text-primary font-bold tracking-tight leading-tight">
                  SuturaSanté
                </span>
                <span className="text-[11px] text-on-surface-variant font-medium">
                  Santé &amp; Dignité Maternelle 🇸🇳
                </span>
              </div>
            </div>

            {/* Sélecteur de Langue en pilule tactile */}
            <div className="flex items-center gap-2">
              <div
                aria-label="Choix de langue"
                className="inline-flex items-center bg-surface-container-high rounded-full p-1 shadow-xs border border-outline-variant/30"
                role="group"
              >
                <button
                  type="button"
                  onClick={() => setLang('wo')}
                  className={`min-h-[38px] px-3 py-1 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    lang === 'wo'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface hover:text-primary'
                  }`}
                  title="Langue Wolof avec guidage audio"
                >
                  <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
                  <span>WO</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLang('fr')}
                  className={`min-h-[38px] px-3 py-1 rounded-full text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                    lang === 'fr'
                      ? 'bg-primary text-on-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  title="Langue Française"
                >
                  <span className="material-symbols-outlined text-[16px]">translate</span>
                  <span>FR</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bande d'état hors-ligne & Titre d'écran */}
          <div className="flex items-center justify-between w-full pt-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              <span>Mode hors-ligne disponible (Offline)</span>
            </div>
            <div className="font-bold text-xs text-on-surface truncate">
              {getTabTitle()}
            </div>
          </div>
        </div>
      </header>

      {/* BOUTON SOS D'URGENCE FLOTTANT AU-DESSUS DE LA BARRE DE NAVIGATION */}
      <div className="fixed bottom-20 inset-x-0 z-40 px-4 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <a
            href="tel:1515"
            className="w-full min-h-[46px] px-4 py-2 rounded-full bg-error text-on-error flex items-center justify-between shadow-[0_4px_16px_rgba(186,26,26,0.35)] hover:bg-primary transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[22px] animate-bounce">
                e911_emergency
              </span>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xs font-extrabold tracking-wide uppercase">
                  SAMU Sénégal 1515
                </span>
                <span className="text-[10px] text-on-error/90 font-medium">
                  Appel gratuit 24/7 • USSD *1515#
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full">
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span className="text-xs font-extrabold">1515</span>
            </div>
          </a>
        </div>
      </div>

      {/* BARRE DE NAVIGATION INFÉRIEURE MOBILE (BOTTOM NAV PWA) */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-outline-variant/20">
        <div className="max-w-md mx-auto flex justify-around items-center h-20 px-1">
          <button
            onClick={() => setActiveTab('pregnancy')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[50px] min-h-[44px] px-1 transition-colors ${
              activeTab === 'pregnancy' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: activeTab === 'pregnancy' ? "'FILL' 1" : "'FILL' 0" }}
            >
              pregnant_woman
            </span>
            <span className="text-[10px] text-center leading-none">Grossesse</span>
          </button>

          <button
            onClick={() => setActiveTab('triage')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[50px] min-h-[44px] px-1 transition-colors ${
              activeTab === 'triage' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: activeTab === 'triage' ? "'FILL' 1" : "'FILL' 0" }}
            >
              health_and_safety
            </span>
            <span className="text-[10px] text-center leading-none">Danger</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[50px] min-h-[44px] px-1 transition-colors ${
              activeTab === 'guide' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: activeTab === 'guide' ? "'FILL' 1" : "'FILL' 0" }}
            >
              menu_book
            </span>
            <span className="text-[10px] text-center leading-none">Conseils</span>
          </button>

          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[50px] min-h-[44px] px-1 transition-colors ${
              activeTab === 'emergency' ? 'text-error font-bold' : 'text-on-surface-variant'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">emergency</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-error"></span>
            </div>
            <span className="text-[10px] text-center leading-none">Centres</span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[50px] min-h-[44px] px-1 transition-colors ${
              activeTab === 'metrics' ? 'text-secondary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: activeTab === 'metrics' ? "'FILL' 1" : "'FILL' 0" }}
            >
              analytics
            </span>
            <span className="text-[10px] text-center leading-none">UNICEF</span>
          </button>
        </div>
      </nav>
    </>
  );
}
