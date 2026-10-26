import React from 'react';

export default function Navbar({ lang, setLang, activeTab, setActiveTab, isFramed = false }) {
  const getTabLabel = () => {
    switch (activeTab) {
      case 'pregnancy':
        return 'Grossesse & Cpn';
      case 'triage':
        return 'Signes Danger';
      case 'guide':
        return 'Conseils';
      case 'emergency':
        return 'Urgences 1515';
      case 'metrics':
        return 'Impact UNICEF';
      default:
        return 'Grossesse & Cpn';
    }
  };

  return (
    <>
      {/* HEADER MOBILE SUPÉRIEUR STITCH ADAPTATIF */}
      <header
        className={`${
          isFramed ? 'absolute' : 'fixed'
        } top-0 left-0 right-0 z-40 pt-safe bg-[#f8f9ff]/95 backdrop-blur-xl border-b border-[#ddc0bd]/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]`}
      >
        <div className="h-26 sm:h-28 px-3 sm:px-4 flex flex-col justify-center gap-1 w-full max-w-lg mx-auto">
          {/* Ligne 1 : Logo + Langue + Profil */}
          <div className="flex items-center justify-between w-full">
            {/* Logo officiel Stitch */}
            <div
              className="flex items-center gap-2 cursor-pointer select-none min-w-0"
              onClick={() => setActiveTab('pregnancy')}
            >
              <img
                alt="SuturaSanté Logo"
                className="h-7 sm:h-8 w-auto object-contain shrink-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFPtd8KqY2-xQrGB8_kv1mgbSJ0mzPAsPY7N5x_Gx1-fDLQd1sZglBKQEHaUPR3IjIJr85nDj1MPQZgcmPKmmkoMp-WKE8l18IjXtrGlrcFBkgEXBj4qI0vpadZruDfmXAHu0KIA_BVJoFbwKUxJttg9jPdcrlD1DApddWYryCvCNh6jjl1X5S1Ib0j4VWfk6iO81fWSl5ztPdlVlQn8FMqWhbwmkOIwlx3wVAS7A"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-[1.125rem] sm:text-[1.25rem] text-[#902e2a] font-bold tracking-tight leading-none truncate">
                  SuturaSanté
                </span>
                <span className="text-[10px] sm:text-[0.6875rem] text-[#574240] font-semibold tracking-wide truncate">
                  Santé &amp; Dignité Maternelle
                </span>
              </div>
            </div>

            {/* Switch Langue & Avatar Stitch Exact */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Sélecteur de Langue Mobile Segmenté */}
              <div
                aria-label="Choix de langue"
                className="inline-flex items-center bg-[#eaeef8] p-0.5 rounded-full border border-[#ddc0bd]/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
                role="group"
              >
                <button
                  type="button"
                  onClick={() => setLang('wo')}
                  className={`min-h-[30px] sm:min-h-[32px] px-2.5 py-1 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 ${
                    lang === 'wo'
                      ? 'bg-[#902e2a] text-white shadow-xs'
                      : 'text-[#574240] hover:text-[#902e2a] hover:bg-white/70'
                  }`}
                  title="Wolof - Guidage audio"
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
                  className={`min-h-[30px] sm:min-h-[32px] px-2.5 py-1 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 ${
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

              {/* Photo de Profil officielle Stitch */}
              <button
                aria-label="Profil utilisatrice"
                className="min-h-[34px] min-w-[34px] flex items-center justify-center focus:outline-none"
                type="button"
              >
                <img
                  alt="Profile"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-[#aeeecb]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvavF8-Jf-IsqnS9F4cy8uZvFCqs34hbFzdsbQwmsm5nJWts7NQO10gzM-EW8-kC0cxXmEtC6POZi8SwxbOP90ardcI8n0H7VyqcQxX5w9HjQll-p_vsCMedW6SgYTqSg6j3Jz0tk671vb4LwBrZ4zl1Y5IPXwjmmA3Nwmsx8dmPtDTpxm7udAi3zoPD0Qj1V8TUyjBiyPD1REXhdv3b-GdC4_33O4c1JtRulAKSQ"
                />
              </button>
            </div>
          </div>

          {/* Ligne 2 : Mode Hors-ligne & Titre d'écran */}
          <div className="flex items-center justify-between w-full pt-0.5 gap-2">
            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] shrink-0">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2c694e] animate-pulse"></span>
              <span className="text-[10px] sm:text-[0.6875rem] font-bold">
                Hors-ligne actif
              </span>
            </div>
            <div className="text-[1rem] sm:text-[1.125rem] text-[#171c23] truncate font-bold font-serif text-right">
              {getTabLabel()}
            </div>
          </div>
        </div>
      </header>

      {/* BOUTON FLOTTANT SAMU 1515 MOBILE */}
      <div
        className={`${
          isFramed ? 'absolute' : 'fixed'
        } bottom-20 inset-x-0 z-30 px-3 sm:px-4 pointer-events-none`}
      >
        <div className="max-w-md mx-auto pointer-events-auto">
          <a
            className="w-full min-h-[44px] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-[#ba1a1a] text-white flex items-center justify-between shadow-[0_4px_16px_rgba(186,26,26,0.35)] hover:bg-[#902e2a] active:scale-[0.98] transition-all"
            href="tel:1515"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px] animate-bounce text-white shrink-0">
                e911_emergency
              </span>
              <div className="flex flex-col text-left leading-none min-w-0">
                <span className="text-[10px] sm:text-[0.6875rem] font-bold tracking-wide uppercase text-white truncate">
                  SAMU Sénégal 1515
                </span>
                <span className="text-[9px] sm:text-[10px] text-white/90 truncate">
                  Appel gratuit d'urgence obstétricale • 24/7
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-2 sm:px-2.5 py-1 rounded-full text-white shrink-0 ml-1">
              <span className="material-symbols-outlined text-[14px] sm:text-[16px]">call</span>
              <span className="text-[11px] sm:text-xs font-bold">1515</span>
            </div>
          </a>
        </div>
      </div>

      {/* BARRE INFÉRIEURE DE NAVIGATION MOBILE STITCH EXACT */}
      <nav
        className={`${
          isFramed ? 'absolute' : 'fixed'
        } bottom-0 left-0 right-0 z-40 pb-safe bg-[#f8f9ff]/95 backdrop-blur-xl border-t border-[#ddc0bd]/40 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]`}
      >
        <div className="grid grid-cols-4 items-center h-18 sm:h-20 px-1 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab('pregnancy')}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-0.5 transition-colors ${
              activeTab === 'pregnancy' ? 'text-[#902e2a] font-bold' : 'text-[#574240]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px] sm:text-[22px]"
              style={{ fontVariationSettings: activeTab === 'pregnancy' ? "'FILL' 1" : "'FILL' 0" }}
            >
              pregnant_woman
            </span>
            <span className="text-[9px] sm:text-[10px] text-center leading-tight truncate w-full">Grossesse</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('triage')}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-0.5 transition-colors ${
              activeTab === 'triage' ? 'text-[#902e2a] font-bold' : 'text-[#574240]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px] sm:text-[22px]"
              style={{ fontVariationSettings: activeTab === 'triage' ? "'FILL' 1" : "'FILL' 0" }}
            >
              health_and_safety
            </span>
            <span className="text-[9px] sm:text-[10px] text-center leading-tight truncate w-full">Signes Danger</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-0.5 transition-colors ${
              activeTab === 'guide' ? 'text-[#902e2a] font-bold' : 'text-[#574240]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px] sm:text-[22px]"
              style={{ fontVariationSettings: activeTab === 'guide' ? "'FILL' 1" : "'FILL' 0" }}
            >
              menu_book
            </span>
            <span className="text-[9px] sm:text-[10px] text-center leading-tight truncate w-full">Conseils</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('emergency')}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-0.5 transition-colors ${
              activeTab === 'emergency' ? 'text-[#ba1a1a] font-bold' : 'text-[#ba1a1a]'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">emergency</span>
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-center font-bold leading-tight truncate w-full">Urgences 1515</span>
          </button>
        </div>
      </nav>
    </>
  );
}
