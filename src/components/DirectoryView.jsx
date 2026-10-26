import React, { useState } from 'react';

export default function DirectoryView({ lang, onActionTrack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('dakar');

  const toggleAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const u = new SpeechSynthesisUtterance(
          "Su fekkee danga soxla ndimbal ci saa si, woo leen 1515 ci telefone bu nekk, fekk amoo pass wala internet. Dinañu la wax fajuwaay bi gën a jege sa kër."
        );
        u.lang = 'fr-SN';
        u.rate = 0.9;
        u.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(u);
        setIsPlaying(true);
        if (onActionTrack) onActionTrack('audio_listen');
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const hospitals = [
    {
      region: 'dakar',
      name: 'CHNU Fann - Maternité de Référence',
      location: 'Avenue Cheikh Anta Diop, Dakar',
      distance: '2.1 km',
      tel: '338691818',
      status: 'Garde 24/7',
      features: ['Bloc Césarienne', 'Réanimation Néonatale', 'Badien Gox']
    },
    {
      region: 'dakar',
      name: 'Hôpital Général Idrissa Pouye (HOGIP)',
      location: 'Grand Yoff, Dakar',
      distance: '4.8 km',
      tel: '338694050',
      status: 'Garde 24/7',
      features: ['Urgences Obstétricales', 'Banque de Sang']
    },
    {
      region: 'thies',
      name: 'Hôpital Régional de Thiès',
      location: 'Quartier Dixième, Thiès',
      distance: 'Centre Régional',
      tel: '339511050',
      status: 'Garde 24/7',
      features: ['Bloc opératoire', 'Centre nutritionnel']
    },
    {
      region: 'kaolack',
      name: 'Hôpital El Hadji Ibrahima Niass',
      location: 'Avenue Cheikh Ibrahima Niass, Kaolack',
      distance: 'Centre Régional',
      tel: '339411050',
      status: 'Garde 24/7',
      features: ['Maternité Sonatrach', 'Couvaison kangourou']
    }
  ];

  const filteredHospitals = hospitals.filter(
    (h) => selectedRegion === 'all' || h.region === selectedRegion
  );

  return (
    <div className="w-full flex flex-col gap-2 lg:gap-2.5">
      {/* =========================================================================
          1. EN-TÊTE URGENCE NATIONALE (ULTRA-COMPACT)
          ========================================================================= */}
      <div className="bg-[#f0f4fd] rounded-xl p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-[#ddc0bd]/30">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5" style={{ color: '#902e2a' }}>
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              shield_with_heart
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold">
              Sécurité &amp; Assistance Rapide au Sénégal
            </span>
          </div>
          <h1 className="text-base sm:text-lg lg:text-xl font-serif font-bold text-[#171c23] leading-tight">
            Urgences &amp; Annuaire National Obstétrical
          </h1>
        </div>

        {/* Consigne Vocale Wolof */}
        <div className="bg-white rounded-lg px-2.5 py-1 shadow-xs flex items-center justify-between gap-2 shrink-0">
          <span className="text-xs font-bold text-[#171c23]">Déglul : Naka ngay woo 1515</span>
          <button
            type="button"
            onClick={toggleAudio}
            className="min-h-[26px] px-2.5 rounded-full bg-[#902e2a] text-white text-[10px] font-bold flex items-center gap-1 shadow-xs hover:bg-[#72201d]"
          >
            <span className="material-symbols-outlined text-[13px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
            <span>{isPlaying ? 'Stop' : 'Écouter'}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. NUMÉROS D'URGENCE EN 3 COLONNES
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* SAMU 1515 */}
        <div
          className="rounded-xl p-2.5 shadow-xs flex flex-col justify-between gap-2 border"
          style={{ backgroundColor: '#ffffff', borderColor: '#ba1a1a' }}
        >
          <div className="flex items-start gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#ba1a1a', color: '#ffffff' }}
            >
              <span className="material-symbols-outlined text-[20px]">emergency</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold font-serif text-[#ba1a1a] truncate">SAMU National</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold text-white bg-[#ba1a1a]">1515</span>
              </div>
              <span className="text-[10px] text-[#574240] truncate">Régulation médicale 24/7</span>
            </div>
          </div>
          <a
            href="tel:1515"
            className="w-full py-1.5 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs bg-[#ba1a1a] hover:bg-[#902e2a] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[15px]">call</span>
            <span>APPELER LE 1515</span>
          </a>
        </div>

        {/* Pompiers 18 */}
        <div className="bg-white rounded-xl p-2.5 shadow-xs flex flex-col justify-between gap-2 border border-[#ddc0bd]/30">
          <div className="flex items-start gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#ffdad6', color: '#ba1a1a' }}
            >
              <span className="material-symbols-outlined text-[18px]">fire_truck</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold font-serif text-[#171c23] truncate">Sapeurs-Pompiers</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#eaeef8] text-[#171c23]">18</span>
              </div>
              <span className="text-[10px] text-[#574240] truncate">Évacuation d'urgence</span>
            </div>
          </div>
          <a
            href="tel:18"
            className="w-full py-1.5 rounded-lg bg-[#eaeef8] text-[#171c23] hover:bg-[#ba1a1a] hover:text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">call</span>
            <span>APPELER LE 18</span>
          </a>
        </div>

        {/* Ligne 116 */}
        <div className="bg-white rounded-xl p-2.5 shadow-xs flex flex-col justify-between gap-2 border border-[#ddc0bd]/30">
          <div className="flex items-start gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#aeeecb', color: '#2c694e' }}
            >
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold font-serif text-[#171c23] truncate">Ligne Dignité</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-[#aeeecb] text-[#316e52]">116</span>
              </div>
              <span className="text-[10px] text-[#574240] truncate">Écoute anonyme 24/7</span>
            </div>
          </div>
          <a
            href="tel:116"
            className="w-full py-1.5 rounded-lg bg-[#eaeef8] text-[#171c23] hover:bg-[#2c694e] hover:text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">call</span>
            <span>APPELER LE 116</span>
          </a>
        </div>
      </div>

      {/* =========================================================================
          3. MATERNITÉS DE GARDE 24/7 EN GRILLE COMPACTE
          ========================================================================= */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-serif font-bold text-[#171c23]">
            Maternités de Garde 24/7 par Région
          </span>

          {/* Filtres régionaux */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'dakar', label: 'Dakar' },
              { id: 'thies', label: 'Thiès' },
              { id: 'kaolack', label: 'Kaolack' },
              { id: 'all', label: 'Toutes' }
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`min-h-[24px] px-2.5 rounded-full text-[10px] font-bold shrink-0 transition-all ${
                  selectedRegion === r.id
                    ? 'bg-[#2c694e] text-white shadow-xs'
                    : 'bg-white border border-[#ddc0bd]/40 text-[#574240] hover:bg-[#eaeef8]'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille 2 Colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {filteredHospitals.map((h, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-2.5 shadow-xs border border-[#ddc0bd]/30 flex flex-col justify-between gap-1.5 hover:border-[#2c694e]/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-1.5">
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold font-serif text-[#171c23] truncate">
                    {h.name}
                  </span>
                  <span className="text-[10px] text-[#574240] flex items-center gap-0.5 truncate">
                    <span className="material-symbols-outlined text-[12px] shrink-0">location_on</span>
                    <span className="truncate">{h.location}</span>
                  </span>
                </div>
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold shrink-0 bg-[#aeeecb] text-[#316e52]">
                  {h.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {h.features.map((f, j) => (
                  <span
                    key={j}
                    className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#f0f4fd] text-[#574240] font-medium"
                  >
                    ✓ {f}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#f0f4fd] gap-1">
                <span className="text-[10px] text-[#574240]">Distance : {h.distance}</span>
                <a
                  href={`tel:${h.tel}`}
                  className="min-h-[26px] px-3 rounded-full bg-[#902e2a] hover:bg-[#72201d] text-white font-bold text-[10px] flex items-center gap-1 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[13px]">call</span>
                  <span>Appeler</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}