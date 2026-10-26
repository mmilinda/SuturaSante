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
    <div className="flex flex-col w-full px-4 gap-4">
      {/* 1. SECTION EN-TÊTE URGENCE NATIONALE STITCH EXACT */}
      <div className="bg-[#f0f4fd] rounded-2xl p-4 flex flex-col gap-2.5 border border-[#ddc0bd]/30">
        <div className="flex items-center gap-1.5" style={{ color: '#902e2a' }}>
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            shield_with_heart
          </span>
          <span className="text-[0.6875rem] uppercase tracking-wider font-bold">
            Sécurité &amp; Assistance Rapide
          </span>
        </div>
        <h1 className="text-[1.375rem] font-serif font-bold text-[#171c23] leading-tight">
          Urgences &amp; Annuaire National
        </h1>
        <p className="text-[0.8125rem] text-[#574240] leading-snug">
          Assistance gratuite 24h/24, appel direct sans crédit et maternités de garde au Sénégal.
        </p>

        {/* Consigne Vocale Wolof */}
        <div className="mt-1 bg-white rounded-xl p-3 shadow-xs flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#ffddb8', color: '#724600' }}
              >
                <span className="material-symbols-outlined text-[20px]">volume_up</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[0.875rem] font-bold text-[#171c23] leading-tight">
                  Déglul ci Wolof : Naka ngay woo 1515
                </span>
                <span className="text-[0.6875rem] text-[#574240]">
                  Comment décrire l'urgence en wolof au régulateur
                </span>
              </div>
            </div>
            <span
              className="px-2 py-0.5 rounded-full text-[0.6875rem] font-bold shrink-0"
              style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
            >
              Audio
            </span>
          </div>

          <button
            type="button"
            onClick={toggleAudio}
            className="w-full min-h-[40px] px-3 py-1.5 rounded-full bg-[#eaeef8] hover:bg-[#dee2ec] flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#902e2a] text-[18px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
              <span className="text-[0.6875rem] font-bold text-[#171c23]">
                {isPlaying ? 'Arrêter la lecture' : 'Écouter le guide audio'}
              </span>
            </div>
            <span className="text-[0.6875rem] text-[#574240] font-medium">01:18</span>
          </button>
        </div>

        {/* Cartes raccourcis USSD et WhatsApp */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <a
            href="tel:*1515%23"
            className="bg-white rounded-xl p-2.5 shadow-xs flex items-center gap-2 border border-[#ddc0bd]/30 active:scale-[0.98] transition-transform"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'rgba(144, 46, 42, 0.1)', color: '#902e2a' }}
            >
              <span className="material-symbols-outlined text-[18px]">dialpad</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[0.8125rem] font-bold text-[#902e2a]">#1515#</span>
                <span
                  className="text-[9px] px-1 rounded font-bold"
                  style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
                >
                  USSD
                </span>
              </div>
              <span className="text-[9px] text-[#574240] truncate">Sans internet ni 4G</span>
            </div>
          </a>

          <a
            href="https://wa.me/221770000000?text=Urgence%20Sutura"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl p-2.5 shadow-xs flex items-center gap-2 border border-[#ddc0bd]/30 active:scale-[0.98] transition-transform"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#aeeecb', color: '#2c694e' }}
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[0.8125rem] font-bold text-[#171c23]">WhatsApp</span>
                <span
                  className="text-[9px] px-1 rounded font-bold"
                  style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
                >
                  Vocal
                </span>
              </div>
              <span className="text-[9px] text-[#574240] truncate">Guide &amp; message vocal</span>
            </div>
          </a>
        </div>
      </div>

      {/* 2. NUMÉROS VERTS IMMÉDIATS STITCH EXACT */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ color: '#ba1a1a', fontVariationSettings: "'FILL' 1" }}
            >
              phone_in_talk
            </span>
            <h2 className="text-[1.25rem] font-serif font-bold text-[#171c23]">
              Numéros Verts Immédiats
            </h2>
          </div>
          <span
            className="text-[0.6875rem] px-2 py-0.5 rounded-full font-bold"
            style={{ backgroundColor: '#ffdad6', color: '#93000a' }}
          >
            Appel Gratuit
          </span>
        </div>

        {/* CARTE PRIORITAIRE 1 : SAMU 1515 */}
        <div
          className="rounded-2xl p-4 shadow-md flex flex-col gap-3 border"
          style={{
            backgroundColor: '#ffffff',
            borderColor: 'rgba(186, 26, 26, 0.4)',
          }}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: '#ba1a1a', color: '#ffffff' }}
              >
                <span className="material-symbols-outlined text-[26px]">emergency</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[1.125rem] font-bold font-serif text-[#ba1a1a]">
                    SAMU National
                  </span>
                  <span
                    className="text-[0.6875rem] px-2 py-0.5 rounded-full font-bold text-white"
                    style={{ backgroundColor: '#ba1a1a' }}
                  >
                    1515
                  </span>
                </div>
                <span className="text-[0.8125rem] text-[#574240]">
                  Régulation obstétricale &amp; ambulances médicalisées
                </span>
              </div>
            </div>
          </div>
          <a
            href="tel:1515"
            className="w-full min-h-[48px] rounded-xl text-white font-bold text-[0.9375rem] flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
            style={{ backgroundColor: '#ba1a1a' }}
          >
            <span className="material-symbols-outlined text-[20px]">call</span>
            <span>APPELER LE 1515 (GRATUIT 24/7)</span>
          </a>
        </div>

        {/* CARTE 2 : Sapeurs-Pompiers 18 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs flex items-center justify-between border border-[#ddc0bd]/30">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#ffdad6', color: '#ba1a1a' }}
            >
              <span className="material-symbols-outlined text-[22px]">fire_truck</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.9375rem] font-bold text-[#171c23]">
                Brigade Nationale des Sapeurs-Pompiers
              </span>
              <span className="text-[0.6875rem] text-[#574240]">
                Évacuation rapide et secours de proximité
              </span>
            </div>
          </div>
          <a
            href="tel:18"
            className="min-h-[40px] px-3.5 rounded-xl bg-[#eaeef8] text-[#171c23] hover:bg-[#ba1a1a] hover:text-white font-bold text-[0.8125rem] flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span>18</span>
          </a>
        </div>

        {/* CARTE 3 : Ligne d'Écoute Éthique Femme 116 */}
        <div className="bg-white rounded-2xl p-4 shadow-xs flex items-center justify-between border border-[#ddc0bd]/30">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#aeeecb', color: '#2c694e' }}
            >
              <span className="material-symbols-outlined text-[22px]">support_agent</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.9375rem] font-bold text-[#171c23]">
                Ligne d'Écoute &amp; Dignité Maternelle
              </span>
              <span className="text-[0.6875rem] text-[#574240]">
                Conseil anonyme, violences basées sur le genre &amp; soutien
              </span>
            </div>
          </div>
          <a
            href="tel:116"
            className="min-h-[40px] px-3.5 rounded-xl bg-[#eaeef8] text-[#171c23] hover:bg-[#2c694e] hover:text-white font-bold text-[0.8125rem] flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span>116</span>
          </a>
        </div>
      </div>

      {/* 3. MATERNITÉS DE GARDE PAR RÉGION AU SÉNÉGAL */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#2c694e] text-[20px]">
              local_hospital
            </span>
            <h2 className="text-[1.25rem] font-serif font-bold text-[#171c23]">
              Maternités de Garde 24/7
            </h2>
          </div>
        </div>

        {/* Sélecteur de Région */}
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
              className={`min-h-[36px] px-3 py-1 rounded-full text-[0.8125rem] font-bold shrink-0 transition-all ${
                selectedRegion === r.id
                  ? 'bg-[#2c694e] text-white shadow-xs'
                  : 'bg-[#f0f4fd] text-[#574240] hover:bg-[#eaeef8]'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Liste des Maternités */}
        <div className="flex flex-col gap-2.5">
          {filteredHospitals.map((h, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#ddc0bd]/30 flex flex-col gap-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[1rem] font-bold font-serif text-[#171c23]">
                      {h.name}
                    </span>
                  </div>
                  <span className="text-[0.8125rem] text-[#574240] flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span>{h.location}</span>
                  </span>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-[0.6875rem] font-bold shrink-0"
                  style={{ backgroundColor: '#aeeecb', color: '#316e52' }}
                >
                  {h.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {h.features.map((f, j) => (
                  <span
                    key={j}
                    className="text-[0.6875rem] px-2 py-0.5 rounded-full bg-[#f0f4fd] text-[#574240] font-medium"
                  >
                    ✓ {f}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#f0f4fd]">
                <span className="text-[0.6875rem] text-[#574240]">Distance : {h.distance}</span>
                <a
                  href={`tel:${h.tel}`}
                  className="min-h-[36px] px-3.5 rounded-full bg-[#902e2a] text-white font-bold text-[0.8125rem] flex items-center gap-1.5 shadow-xs active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
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
