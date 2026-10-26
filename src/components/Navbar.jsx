import React from 'react';

export default function Navbar({ lang, setLang, activeTab, setActiveTab }) {
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
      {/* HEADER FIXE SUPÉRIEUR STITCH EXACT */}
      <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-28 px-margin flex flex-col justify-center gap-space-xs max-w-md mx-auto md:max-w-4xl">
          <div className="flex items-center justify-between w-full">
            {/* Logo officiel Stitch */}
            <div
              className="flex items-center gap-space-sm cursor-pointer"
              onClick={() => setActiveTab('pregnancy')}
            >
              <img
                alt="SuturaSanté Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFPtd8KqY2-xQrGB8_kv1mgbSJ0mzPAsPY7N5x_Gx1-fDLQd1sZglBKQEHaUPR3IjIJr85nDj1MPQZgcmPKmmkoMp-WKE8l18IjXtrGlrcFBkgEXBj4qI0vpadZruDfmXAHu0KIA_BVJoFbwKUxJttg9jPdcrlD1DApddWYryCvCNh6jjl1X5S1Ib0j4VWfk6iO81fWSl5ztPdlVlQn8FMqWhbwmkOIwlx3wVAS7A"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-sm text-headline-sm text-primary font-semibold tracking-tight">
                    SuturaSanté
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Santé &amp; Dignité Maternelle
                </span>
              </div>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setActiveTab('pregnancy')}
                className={`px-3 py-1.5 rounded-full font-label-md text-label-md font-bold transition-all ${
                  activeTab === 'pregnancy' ? 'bg-primary text-on-primary' : 'text-on-surface hover:text-primary'
                }`}
              >
                Grossesse &amp; CPN
              </button>
              <button
                onClick={() => setActiveTab('triage')}
                className={`px-3 py-1.5 rounded-full font-label-md text-label-md font-bold transition-all ${
                  activeTab === 'triage' ? 'bg-primary text-on-primary' : 'text-on-surface hover:text-primary'
                }`}
              >
                Signes Danger
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-3 py-1.5 rounded-full font-label-md text-label-md font-bold transition-all ${
                  activeTab === 'guide' ? 'bg-primary text-on-primary' : 'text-on-surface hover:text-primary'
                }`}
              >
                Conseils
              </button>
              <button
                onClick={() => setActiveTab('emergency')}
                className={`px-3 py-1.5 rounded-full font-label-md text-label-md font-bold transition-all ${
                  activeTab === 'emergency' ? 'bg-error text-on-error' : 'text-error'
                }`}
              >
                Urgences 1515
              </button>
              <button
                onClick={() => setActiveTab('metrics')}
                className={`px-3 py-1.5 rounded-full font-label-md text-label-md font-bold transition-all ${
                  activeTab === 'metrics' ? 'bg-secondary text-on-secondary' : 'text-secondary'
                }`}
              >
                Impact UNICEF
              </button>
            </nav>

            {/* Switch Langue & Avatar Stitch Exact */}
            <div className="flex items-center gap-space-sm">
              <div
                aria-label="Choix de langue"
                className="inline-flex items-center bg-surface-container-high rounded-full p-1 shadow-xs border border-outline-variant/30"
                role="group"
              >
                <button
                  type="button"
                  onClick={() => setLang('wo')}
                  className={`min-h-[44px] px-3 py-1.5 rounded-full font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform ${
                    lang === 'wo' ? 'bg-primary text-on-primary' : 'text-on-surface'
                  }`}
                  title="Langue Wolof avec guidage audio"
                >
                  <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
                  <span className="font-bold">WO</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLang('fr')}
                  className={`min-h-[44px] px-3 py-1.5 rounded-full font-label-md text-label-md flex items-center justify-center gap-1 transition-colors ${
                    lang === 'fr' ? 'bg-primary text-on-primary' : 'text-on-surface hover:text-primary'
                  }`}
                  title="Langue Française"
                >
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">translate</span>
                  <span className="font-semibold">FR</span>
                </button>
              </div>

              {/* Photo de Profil officielle Stitch */}
              <button
                aria-label="Profil utilisatrice"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none"
                type="button"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvavF8-Jf-IsqnS9F4cy8uZvFCqs34hbFzdsbQwmsm5nJWts7NQO10gzM-EW8-kC0cxXmEtC6POZi8SwxbOP90ardcI8n0H7VyqcQxX5w9HjQll-p_vsCMedW6SgYTqSg6j3Jz0tk671vb4LwBrZ4zl1Y5IPXwjmmA3Nwmsx8dmPtDTpxm7udAi3zoPD0Qj1V8TUyjBiyPD1REXhdv3b-GdC4_33O4c1JtRulAKSQ"
                />
              </button>
            </div>
          </div>

          {/* Ligne 2 : Mode Hors-ligne & Titre d'écran */}
          <div className="flex items-center justify-between w-full pt-0.5">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-label-sm text-label-sm font-semibold">
                Mode hors-ligne disponible (Offline)
              </span>
            </div>
            <div className="font-title-md text-title-md text-on-surface truncate font-semibold">
              {getTabLabel()}
            </div>
          </div>
        </div>
      </header>

      {/* BOUTON FLOTTANT SAMU 1515 STITCH EXACT */}
      <div className="fixed bottom-20 inset-x-0 z-40 px-margin pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <a
            className="w-full min-h-[44px] px-3.5 py-2 rounded-full bg-error text-on-error flex items-center justify-between shadow-[0_4px_16px_rgba(186,26,26,0.28)] hover:bg-primary transition-colors"
            href="tel:1515"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] animate-bounce">
                e911_emergency
              </span>
              <div className="flex flex-col text-left leading-none">
                <span className="font-label-sm text-label-sm font-bold tracking-wide uppercase">
                  SAMU Sénégal 1515
                </span>
                <span className="text-[10px] text-on-error/85">
                  Appel gratuit d'urgence obstétricale
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span className="font-label-sm text-label-sm font-bold">1515</span>
            </div>
          </a>
        </div>
      </div>

      {/* BARRE INFÉRIEURE DE NAVIGATION STITCH EXACT */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex justify-around items-center h-20 px-space-xs max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('pregnancy')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-2 transition-colors ${
              activeTab === 'pregnancy' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: activeTab === 'pregnancy' ? "'FILL' 1" : "'FILL' 0" }}
            >
              pregnant_woman
            </span>
            <span className="font-label-sm text-label-sm text-center">Grossesse &amp; CPN</span>
          </button>

          <button
            onClick={() => setActiveTab('triage')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-2 transition-colors ${
              activeTab === 'triage' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: activeTab === 'triage' ? "'FILL' 1" : "'FILL' 0" }}
            >
              health_and_safety
            </span>
            <span className="font-label-sm text-label-sm text-center">Signes Danger</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-2 transition-colors ${
              activeTab === 'guide' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: activeTab === 'guide' ? "'FILL' 1" : "'FILL' 0" }}
            >
              menu_book
            </span>
            <span className="font-label-sm text-label-sm text-center">Conseils</span>
          </button>

          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-2 transition-colors ${
              activeTab === 'emergency' ? 'text-error font-bold' : 'text-error'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">emergency</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-error"></span>
            </div>
            <span className="font-label-sm text-label-sm text-center font-bold">Urgences 1515</span>
          </button>
        </div>
      </nav>
    </>
  );
}
