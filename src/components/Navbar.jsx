import React from 'react';
import { Heart, Globe, Activity, AlertTriangle, BookOpen, PhoneCall, BarChart3 } from 'lucide-react';

export default function Navbar({ lang, setLang, activeTab, setActiveTab, t }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Identité */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('pregnancy')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white shadow-md shadow-rose-200">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-900 tracking-tight">Sutura<span className="text-rose-600">Santé</span></span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">Sénégal 🇸🇳</span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">Digital Public Good • UNICEF Femtech</p>
          </div>
        </div>

        {/* Sélecteur de Langue (Français / Wolof) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'fr' ? 'wo' : 'fr')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition"
          >
            <Globe className="w-3.5 h-3.5 text-rose-600" />
            <span>Passer en : <strong className="text-rose-600">{lang === 'fr' ? 'Wolof (Wolofal)' : 'Français'}</strong></span>
          </button>
        </div>
      </div>

      {/* Barre de navigation mobile & desktop */}
      <nav className="max-w-4xl mx-auto px-2 border-t border-slate-100 flex items-center justify-around overflow-x-auto py-1 scrollbar-none text-xs font-medium">
        <button
          onClick={() => setActiveTab('pregnancy')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition ${
            activeTab === 'pregnancy'
              ? 'bg-rose-50 text-rose-700 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4 text-rose-500" />
          <span>{t.nav.pregnancy}</span>
        </button>

        <button
          onClick={() => setActiveTab('triage')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition ${
            activeTab === 'triage'
              ? 'bg-amber-50 text-amber-800 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>{t.nav.triage}</span>
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition ${
            activeTab === 'guide'
              ? 'bg-rose-50 text-rose-700 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-rose-500" />
          <span>{t.nav.guide}</span>
        </button>

        <button
          onClick={() => setActiveTab('emergency')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition ${
            activeTab === 'emergency'
              ? 'bg-red-50 text-red-700 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <PhoneCall className="w-4 h-4 text-red-500" />
          <span>{t.nav.emergency}</span>
        </button>

        <button
          onClick={() => setActiveTab('metrics')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition ${
            activeTab === 'metrics'
              ? 'bg-indigo-50 text-indigo-700 font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-indigo-500" />
          <span>{t.nav.metrics}</span>
        </button>
      </nav>
    </header>
  );
}
