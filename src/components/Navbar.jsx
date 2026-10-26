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

  const navItems = [
    { id: 'pregnancy', labelFr: 'Grossesse & CPN', labelWo: 'Topato Birr', icon: 'pregnant_woman' },
    { id: 'triage', labelFr: 'Signes Danger', labelWo: 'Mandargay Musiba', icon: 'health_and_safety' },
    { id: 'guide', labelFr: 'Conseils & Nutrition', labelWo: 'Digal & Xam-xam', icon: 'menu_book' },
    { id: 'emergency', labelFr: 'Urgences & Centres', labelWo: 'Fajuwaay yi', icon: 'emergency', isRed: true },
    { id: 'metrics', labelFr: 'Impact UNICEF', labelWo: 'Njariñ UNICEF', icon: 'analytics', isGreen: true },
  ];

  return (
    <>
      {/* HEADER PRINCIPAL RESPONSIVE (MOBILE & DESKTOP) */}
      <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-xs border-b border-outline-variant/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
          {/* Ligne 1 : Logo + Nav Desktop + Langue + Bouton SAMU (Desktop) */}
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setActiveTab('pregnancy')}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-headline text-2xl text-primary font-bold tracking-tight leading-tight">
                    Sutura<span className="text-tertiary">Santé</span>
                  </span>
                  <span className="hidden sm:inline-flex text-[10px] bg-secondary-container text-on-secondary-container font-extrabold px-2 py-0.5 rounded-full">
                    Sénégal 🇸🇳
                  </span>
                </div>
                <span className="text-xs text-on-surface-variant font-medium">
                  Santé &amp; Dignité Maternelle • UNICEF Femtech
                </span>
              </div>
            </div>

            {/* Navigation Desktop visible à partir de md (tablettes / ordinateurs) */}
            <nav className="hidden md:flex items-center gap-1 bg-surface-container-low p-1 rounded-2xl border border-outline-variant/20">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === item.id
                      ? 'bg-primary text-on-primary shadow-xs'
                      : item.isRed
                      ? 'text-error hover:bg-error-container/30'
                      : 'text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: activeTab === item.id ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span>{lang === 'wo' ? item.labelWo : item.labelFr}</span>
                </button>
              ))}
            </nav>

            {/* Actions : Sélecteur Langue + Bouton SAMU 1515 Desktop */}
            <div className="flex items-center gap-2.5">
              {/* Switch Langue tactile */}
              <div
                aria-label="Choix de langue"
                className="inline-flex items-center bg-surface-container rounded-full p-1 border border-outline-variant/30"
                role="group"
              >
                <button
                  type="button"
                  onClick={() => setLang('wo')}
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                    lang === 'wo'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  title="Langue Wolof avec guidage audio"
                >
                  <span className="material-symbols-outlined text-[15px]">record_voice_over</span>
                  <span>WO</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLang('fr')}
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                    lang === 'fr'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                  title="Langue Française"
                >
                  <span className="material-symbols-outlined text-[15px]">translate</span>
                  <span>FR</span>
                </button>
              </div>

              {/* Bouton SAMU 1515 affiché dans le header sur Desktop pour éviter de masquer le contenu en bas */}
              <a
                href="tel:1515"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-error text-on-error font-extrabold text-xs shadow-sm hover:bg-primary transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px] animate-bounce">call</span>
                <span>SAMU 1515 (Gratuit)</span>
              </a>
            </div>
          </div>

          {/* Ligne 2 (Sur Mobile) : Badge Offline et Titre de l'écran en cours */}
          <div className="flex sm:hidden items-center justify-between w-full pt-1 border-t border-outline-variant/15">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              <span>Offline disponible</span>
            </div>
            <div className="font-bold text-xs text-primary truncate">
              {getTabTitle()}
            </div>
          </div>
        </div>
      </header>

      {/* BOUTON SOS D'URGENCE FLOTTANT : VISIBLE UNIQUEMENT SUR MOBILE (< 768px) POUR NE PAS GÊNER SUR ORDINATEUR */}
      <div className="md:hidden fixed bottom-20 inset-x-0 z-40 px-4 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <a
            href="tel:1515"
            className="w-full min-h-[44px] px-4 py-2 rounded-full bg-error text-on-error flex items-center justify-between shadow-[0_4px_16px_rgba(186,26,26,0.35)] active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] animate-bounce">
                e911_emergency
              </span>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[11px] font-extrabold tracking-wide uppercase">
                  SAMU Sénégal 1515
                </span>
                <span className="text-[9px] text-on-error/90 font-medium">
                  Appel gratuit 24/7 • USSD *1515#
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[14px]">call</span>
              <span className="text-xs font-bold">1515</span>
            </div>
          </a>
        </div>
      </div>

      {/* BARRE DE NAVIGATION INFÉRIEURE : VISIBLE UNIQUEMENT SUR MOBILE (< 768px) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 pb-safe bg-white/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-outline-variant/20">
        <div className="max-w-md mx-auto flex justify-around items-center h-16 px-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[50px] min-h-[44px] px-1 transition-colors ${
                activeTab === item.id
                  ? 'text-primary font-bold'
                  : item.isRed
                  ? 'text-error'
                  : 'text-on-surface-variant'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: activeTab === item.id ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="text-[10px] text-center leading-none">
                {lang === 'wo' ? item.labelWo.split(' ')[0] : item.labelFr.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
