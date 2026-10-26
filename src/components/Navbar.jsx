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
      {/* HEADER SUPÉRIEUR STITCH EXACT */}
      <header
        className={`${
          isFramed ? 'absolute' : 'fixed'
        } top-0 left-0 right-0 z-40 pt-safe bg-[#f8f9ff]/95 backdrop-blur-xl border-b border-[#ddc0bd]/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]`}
      >
        <div className="h-28 px-4 flex flex-col justify-center gap-1 w-full max-w-md mx-auto">
          {/* Ligne 1 : Logo + Langue + Profil */}
          <div className="flex items-center justify-between w-full">
            {/* Logo officiel Stitch */}
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setActiveTab('pregnancy')}
            >
              <img
                alt="SuturaSanté Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFPtd8KqY2-xQrGB8_kv1mgbSJ0mzPAsPY7N5x_Gx1-fDLQd1sZglBKQEHaUPR3IjIJr85nDj1MPQZgcmPKmmkoMp-WKE8l18IjXtrGlrcFBkgEXBj4qI0vpadZruDfmXAHu0KIA_BVJoFbwKUxJttg9jPdcrlD1DApddWYryCvCNh6jjl1X5S1Ib0j4VWfk6iO81fWSl5ztPdlVlQn8FMqWhbwmkOIwlx3wVAS7A"
              />
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="font-serif text-[1.25rem] text-[#902e2a] font-bold tracking-tight leading-none">
                    SuturaSanté
                  </span>
                </div>
                <span className="text-[0.6875rem] text-[#574240] font-semibold tracking-wide">
                  Santé &amp; Dignité Maternelle
                </span>
              </div>
            </div>

            {/* Switch Langue & Avatar Stitch Exact */}
            <div className="flex items-center gap-2">
              <div
                aria-label="Choix de langue"
                className="inline-flex items-center bg-[#eaeef8] rounded-full p-0.5 border border-[#ddc0bd]/40"
                role="group"
              >
                <button
                  type="button"
                  onClick={() => setLang('wo')}
                  className={`min-h-[38px] px-2.5 py-1 rounded-full text-[0.8125rem] flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all ${
                    lang === 'wo'
                      ? 'bg-[#902e2a] text-white font-bold'
                      : 'text-[#171c23] hover:text-[#902e2a] font-medium'
                  }`}
                  title="Langue Wolof avec guidage audio"
                >
                  <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
                  <span>WO</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLang('fr')}
                  className={`min-h-[38px] px-2.5 py-1 rounded-full text-[0.8125rem] flex items-center justify-center gap-1 transition-all ${
                    lang === 'fr'
                      ? 'bg-[#902e2a] text-white font-bold'
                      : 'text-[#574240] hover:text-[#902e2a] font-medium'
                  }`}
                  title="Langue Française"
                >
                  <span className="material-symbols-outlined text-[16px]">translate</span>
                  <span>FR</span>
                </button>
              </div>

              {/* Photo de Profil officielle Stitch */}
              <button
                aria-label="Profil utilisatrice"
                className="min-h-[38px] min-w-[38px] flex items-center justify-center focus:outline-none"
                type="button"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#aeeecb]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvavF8-Jf-IsqnS9F4cy8uZvFCqs34hbFzdsbQwmsm5nJWts7NQO10gzM-EW8-kC0cxXmEtC6POZi8SwxbOP90ardcI8n0H7VyqcQxX5w9HjQll-p_vsCMedW6SgYTqSg6j3Jz0tk671vb4LwBrZ4zl1Y5IPXwjmmA3Nwmsx8dmPtDTpxm7udAi3zoPD0Qj1V8TUyjBiyPD1REXhdv3b-GdC4_33O4c1JtRulAKSQ"
                />
              </button>
            </div>
          </div>

          {/* Ligne 2 : Mode Hors-ligne & Titre d'écran */}
          <div className="flex items-center justify-between w-full pt-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52]">
              <span className="w-2 h-2 rounded-full bg-[#2c694e] animate-pulse"></span>
              <span className="text-[0.6875rem] font-bold">
                Mode hors-ligne disponible (Offline)
              </span>
            </div>
            <div className="text-[1.125rem] text-[#171c23] truncate font-bold font-serif">
              {getTabLabel()}
            </div>
          </div>
        </div>
      </header>

      {/* BOUTON FLOTTANT SAMU 1515 STITCH EXACT */}
      <div
        className={`${
          isFramed ? 'absolute' : 'fixed'
        } bottom-20 inset-x-0 z-30 px-4 pointer-events-none`}
      >
        <div className="max-w-md mx-auto pointer-events-auto">
          <a
            className="w-full min-h-[46px] px-3.5 py-2 rounded-full bg-[#ba1a1a] text-white flex items-center justify-between shadow-[0_4px_16px_rgba(186,26,26,0.35)] hover:bg-[#902e2a] active:scale-[0.98] transition-all"
            href="tel:1515"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] animate-bounce text-white">
                e911_emergency
              </span>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[0.6875rem] font-bold tracking-wide uppercase text-white">
                  SAMU Sénégal 1515
                </span>
                <span className="text-[10px] text-white/90">
                  Appel gratuit d'urgence obstétricale • 24/7
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full text-white">
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span className="text-[0.6875rem] font-bold">1515</span>
            </div>
          </a>
        </div>
      </div>

      {/* BARRE INFÉRIEURE DE NAVIGATION STITCH EXACT */}
      <nav
        className={`${
          isFramed ? 'absolute' : 'fixed'
        } bottom-0 left-0 right-0 z-40 pb-safe bg-[#f8f9ff]/95 backdrop-blur-xl border-t border-[#ddc0bd]/40 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]`}
      >
        <div className="flex justify-around items-center h-20 px-1 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab('pregnancy')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[48px] min-h-[48px] px-2 transition-colors ${
              activeTab === 'pregnancy' ? 'text-[#902e2a] font-bold' : 'text-[#574240]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: activeTab === 'pregnancy' ? "'FILL' 1" : "'FILL' 0" }}
            >
              pregnant_woman
            </span>
            <span className="text-[0.6875rem] text-center leading-none">Grossesse &amp; CPN</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('triage')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[48px] min-h-[48px] px-2 transition-colors ${
              activeTab === 'triage' ? 'text-[#902e2a] font-bold' : 'text-[#574240]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: activeTab === 'triage' ? "'FILL' 1" : "'FILL' 0" }}
            >
              health_and_safety
            </span>
            <span className="text-[0.6875rem] text-center leading-none">Signes Danger</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[48px] min-h-[48px] px-2 transition-colors ${
              activeTab === 'guide' ? 'text-[#902e2a] font-bold' : 'text-[#574240]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: activeTab === 'guide' ? "'FILL' 1" : "'FILL' 0" }}
            >
              menu_book
            </span>
            <span className="text-[0.6875rem] text-center leading-none">Conseils</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('emergency')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[48px] min-h-[48px] px-2 transition-colors ${
              activeTab === 'emergency' ? 'text-[#ba1a1a] font-bold' : 'text-[#ba1a1a]'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">emergency</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            </div>
            <span className="text-[0.6875rem] text-center font-bold leading-none">Urgences 1515</span>
          </button>
        </div>
      </nav>
    </>
  );
}
