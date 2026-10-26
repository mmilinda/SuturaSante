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
      status: 'Maternité de garde 24/7',
      features: ['Bloc Césarienne', 'Réanimation Néonatale', 'Badien Gox sur place']
    },
    {
      region: 'dakar',
      name: 'Hôpital Général Idrissa Pouye (HOGIP)',
      location: 'Grand Yoff, Dakar',
      distance: '4.8 km',
      tel: '338694050',
      status: 'Maternité de garde 24/7',
      features: ['Urgences Obstétricales', 'Banque de Sang']
    },
    {
      region: 'dakar',
      name: 'Hôpital Principal de Dakar',
      location: '1 Avenue Nelson Mandela, Dakar Plateau',
      distance: '5.4 km',
      tel: '338395050',
      status: 'Niveau 3 • Référence',
      features: ['Plateau technique complet', 'SAMU Base']
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
    },
    {
      region: 'saint-louis',
      name: 'Hôpital Régional de Saint-Louis',
      location: 'Pointe Sud, Saint-Louis',
      distance: 'Centre Régional',
      tel: '339611050',
      status: 'Garde 24/7',
      features: ['Soins intensifs mère-enfant']
    }
  ];

  const filteredHospitals = hospitals.filter(
    (h) => selectedRegion === 'all' || h.region === selectedRegion
  );

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. EN-TÊTE URGENCE NATIONALE */}
      <div className="bg-[#f0f4fd] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#ddc0bd]/30">
        <div className="flex flex-col gap-1 max-w-2xl">
          <div className="flex items-center gap-1.5" style={{ color: '#902e2a' }}>
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield_with_heart
            </span>
            <span className="text-xs uppercase tracking-wider font-bold">
              Sécurité &amp; Assistance Rapide au Sénégal
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#171c23]">
            Urgences &amp; Annuaire National Obstétrical
          </h1>
          <p className="text-sm text-[#574240]">
            Numéros gratuits d'urgence 24h/24, orientation immédiate par région et maternités de référence.
          </p>
        </div>

        {/* Consigne Vocale Wolof */}
        <div className="bg-white rounded-xl p-3 shadow-xs flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#ffddb8', color: '#724600' }}
            >
              <span className="material-symbols-outlined text-[20px]">volume_up</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#171c23]">
                Déglul : Naka ngay woo 1515
              </span>
              <span className="text-[11px] text-[#574240]">
                Consigne audio d'appel au régulateur
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleAudio}
            className="min-h-[36px] px-3.5 rounded-full bg-[#902e2a] text-white text-xs font-bold flex items-center gap-1 shadow-xs hover:bg-[#72201d] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
            <span>{isPlaying ? 'Stop' : 'Écouter'}</span>
          </button>
        </div>
      </div>

      {/* 2. NUMÉROS D'URGENCE EN 3 COLONNES SUR ORDINATEUR */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ color: '#ba1a1a', fontVariationSettings: "'FILL' 1" }}
            >
              phone_in_talk
            </span>
            <h2 className="text-xl font-serif font-bold text-[#171c23]">
              Numéros d'Urgence Immédiats (Appel Gratuit)
            </h2>
          </div>
          <span
            className="text-xs px-2.5 py-0.5 rounded-full font-bold"
            style={{ backgroundColor: '#ffdad6', color: '#93000a' }}
          >
            Gratuit sans forfait
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* SAMU 1515 */}
          <div
            className="rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-3 border"
            style={{
              backgroundColor: '#ffffff',
              borderColor: 'rgba(186, 26, 26, 0.4)',
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#ba1a1a', color: '#ffffff' }}
              >
                <span className="material-symbols-outlined text-[26px]">emergency</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold font-serif text-[#ba1a1a]">
                    SAMU National
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-bold text-white"
                    style={{ backgroundColor: '#ba1a1a' }}
                  >
                    1515
                  </span>
                </div>
                <span className="text-xs text-[#574240] mt-0.5">
                  Régulation obstétricale médicale 24/7
                </span>
              </div>
            </div>
            <a
              href="tel:1515"
              className="w-full min-h-[44px] rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:bg-[#902e2a] transition-all"
              style={{ backgroundColor: '#ba1a1a' }}
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>APPELER LE 1515</span>
            </a>
          </div>

          {/* Sapeurs-Pompiers 18 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-3 border border-[#ddc0bd]/30">
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#ffdad6', color: '#ba1a1a' }}
              >
                <span className="material-symbols-outlined text-[24px]">fire_truck</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold font-serif text-[#171c23]">
                    Sapeurs-Pompiers
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-[#eaeef8] text-[#171c23]">
                    18
                  </span>
                </div>
                <span className="text-xs text-[#574240] mt-0.5">
                  Évacuation rapide &amp; secours routier
                </span>
              </div>
            </div>
            <a
              href="tel:18"
              className="w-full min-h-[44px] rounded-xl bg-[#eaeef8] text-[#171c23] hover:bg-[#ba1a1a] hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>APPELER LE 18</span>
            </a>
          </div>

          {/* Ligne 116 */}
          <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-3 border border-[#ddc0bd]/30">
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#aeeecb', color: '#2c694e' }}
              >
                <span className="material-symbols-outlined text-[24px]">support_agent</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold font-serif text-[#171c23]">
                    Ligne Dignité Femme
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
                  >
                    116
                  </span>
                </div>
                <span className="text-xs text-[#574240] mt-0.5">
                  Écoute anonyme &amp; soutien psychologique
                </span>
              </div>
            </div>
            <a
              href="tel:116"
              className="w-full min-h-[44px] rounded-xl bg-[#eaeef8] text-[#171c23] hover:bg-[#2c694e] hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>APPELER LE 116</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. MATERNITÉS DE GARDE EN 2 COLONNES SUR ORDINATEUR */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2c694e] text-[22px]">
              local_hospital
            </span>
            <h2 className="text-xl font-serif font-bold text-[#171c23]">
              Maternités de Garde 24/7 au Sénégal
            </h2>
          </div>

          {/* Filtres régionaux */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'dakar', label: 'Dakar' },
              { id: 'thies', label: 'Thiès' },
              { id: 'kaolack', label: 'Kaolack' },
              { id: 'saint-louis', label: 'Saint-Louis' },
              { id: 'all', label: 'Toutes les régions' }
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`min-h-[36px] px-3.5 py-1 rounded-full text-xs font-bold shrink-0 transition-all ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHospitals.map((h, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-[#ddc0bd]/30 flex flex-col justify-between gap-3 hover:border-[#2c694e]/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-base font-bold font-serif text-[#171c23]">
                    {h.name}
                  </span>
                  <span className="text-xs text-[#574240] flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span>{h.location}</span>
                  </span>
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0"
                  style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
                >
                  {h.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {h.features.map((f, j) => (
                  <span
                    key={j}
                    className="text-[11px] px-2 py-0.5 rounded-full bg-[#f0f4fd] text-[#574240] font-medium"
                  >
                    ✓ {f}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#f0f4fd]">
                <span className="text-xs text-[#574240]">Distance estimée : {h.distance}</span>
                <a
                  href={`tel:${h.tel}`}
                  className="min-h-[38px] px-4 rounded-full bg-[#902e2a] hover:bg-[#72201d] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>Appeler Maternité</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
