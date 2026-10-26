import React from 'react';

export default function Navbar({ lang, setLang, activeTab, setActiveTab }) {
  const navItems = [
    { id: 'pregnancy', labelFr: 'Grossesse & CPN', labelWo: 'Grossesse & CPN', icon: 'pregnant_woman' },
    { id: 'triage', labelFr: 'Signes Danger', labelWo: 'Signes Danger', icon: 'health_and_safety' },
    { id: 'guide', labelFr: 'Conseils', labelWo: 'Conseils', icon: 'menu_book' },
    { id: 'emergency', labelFr: 'Urgences 1515', labelWo: 'Urgences 1515', icon: 'emergency', isRed: true },
    { id: 'metrics', labelFr: 'Impact UNICEF', labelWo: 'Impact UNICEF', icon: 'analytics', isGreen: true },
  ];

  return (
    <>
      {/* HEADER SUPÉRIEUR STITCH EXACT */}
      <header className="sticky top-0 w-full z-50 bg-[#f8f9ff]/95 backdrop-blur-md border-b border-[#ddc0bd]/40">
        <div className="max-w-md md:max-w-4xl mx-auto px-4 py-3 flex flex-col gap-2">
          {/* Ligne 1 : Logo & Slogan + Switch WO/FR bordeaux + Avatar */}
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => setActiveTab('pregnancy')}
            >
              <div className="w-8 h-8 rounded-xl bg-[#902e2a] text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  favorite
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline text-xl text-[#902e2a] font-bold tracking-tight leading-none">
                    SuturaSanté
                  </span>
                </div>
                <span className="text-[11px] text-[#574240] font-medium leading-tight">
                  Santé &amp; Dignité Maternelle
                </span>
              </div>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center gap-1 bg-[#eaeef8] p-1 rounded-2xl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === item.id
                      ? 'bg-[#902e2a] text-white shadow-xs'
                      : item.isRed
                      ? 'text-[#ba1a1a] hover:bg-[#ffdad6]/40'
                      : 'text-[#171c23] hover:bg-[#dee2ec]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[17px]"
                    style={{ fontVariationSettings: activeTab === item.id ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span>{item.labelFr}</span>
                </button>
              ))}
            </nav>

            {/* Switch Langue Pilule Bordeaux Stitch (Bouton WO bordeaux foncé + FR gris) */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center bg-[#eaeef8] rounded-full p-1 border border-[#ddc0bd]/40">
                <button
                  type="button"
                  onClick={() => setLang('wo')}
                  className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 transition-all ${
                    lang === 'wo'
                      ? 'bg-[#902e2a] text-white shadow-xs'
                      : 'text-[#574240] hover:text-[#171c23]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">record_voice_over</span>
                  <span>WO</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLang('fr')}
                  className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 transition-all ${
                    lang === 'fr'
                      ? 'bg-[#902e2a] text-white shadow-xs'
                      : 'text-[#574240] hover:text-[#171c23]'
                  }`}
                >
                  <span>FR</span>
                </button>
              </div>

              {/* Avatar rond */}
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#ddc0bd] bg-[#ffe3c7] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#724600] text-[18px]">person</span>
              </div>
            </div>
          </div>

          {/* Ligne 2 : Badge Vert Menthe "Mode hors-ligne disponible (Offline)" */}
          <div className="flex items-center justify-between w-full pt-0.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#aeeecb] text-[#0e5138] text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#2c694e] animate-pulse"></span>
              <span>Mode hors-ligne disponible (Offline)</span>
            </div>
            <span className="text-xs font-bold text-[#171c23]">
              {activeTab === 'pregnancy' ? 'Grossesse & CPN' : activeTab === 'triage' ? 'Signes Danger' : 'SuturaSanté'}
            </span>
          </div>
        </div>
      </header>

      {/* BARRE INFÉRIEURE MOBILE PWA (Exactement comme dans Stitch) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 pb-safe bg-white/95 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.06)] border-t border-[#ddc0bd]/30">
        <div className="max-w-md mx-auto flex justify-around items-center h-16 px-1">
          {navItems.slice(0, 4).map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[54px] min-h-[44px] transition-colors ${
                  item.isRed
                    ? 'text-[#ba1a1a] font-bold'
                    : isActive
                    ? 'text-[#171c23] font-bold'
                    : 'text-[#574240]'
                }`}
              >
                <div className="relative">
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  {item.isRed && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                  )}
                </div>
                <span className="text-[10px] text-center leading-none tracking-tight">
                  {item.labelFr}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
