import React, { useState } from 'react';
import { emergencyContacts, healthCenters } from '../data/healthDirectory';

export default function DirectoryView({ t, lang, onActionTrack }) {
  const [selectedRegion, setSelectedRegion] = useState('Tous');

  const filteredCenters =
    selectedRegion === 'Tous'
      ? healthCenters
      : healthCenters.filter((c) => c.region.toLowerCase().includes(selectedRegion.toLowerCase()));

  const handleCall = (num) => {
    if (onActionTrack) onActionTrack('directory_call');
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {/* 1. EN-TÊTE D'URGENCE & SECOURS */}
      <div className="bg-gradient-to-br from-error to-primary rounded-2xl p-4 text-on-error shadow-sm flex items-start justify-between">
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/20 rounded-full text-[10px] font-bold backdrop-blur-md mb-1.5 w-fit">
            <span className="material-symbols-outlined text-[14px]">emergency</span>
            <span>Secours Médical 24/7</span>
          </div>
          <h2 className="font-headline text-xl font-bold">
            {lang === 'wo' ? 'Numéro Gawante & Fajuwaay yi' : "Numéros Verts & Centres de Santé"}
          </h2>
          <p className="text-xs text-on-error/90 mt-0.5">
            {lang === 'wo'
              ? 'Lignes yu gratuit ci Sénégal ngir wàsin ak gawante'
              : 'Appels gratuits d\'assistance et maternités de référence au Sénégal'}
          </p>
        </div>
      </div>

      {/* 2. NUMÉROS D'URGENCE NATIONAUX SÉNÉGAL */}
      <div className="flex flex-col gap-2.5">
        <h3 className="font-headline text-base text-on-surface font-bold px-1">
          Lignes Gratuites Nationales
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {emergencyContacts.map((contact, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/20 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-error-container text-on-error-container">
                    {contact.badge}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-medium">
                    {contact.type}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-on-surface">{contact.name}</h4>
                <p className="text-[11px] text-on-surface-variant mt-0.5 leading-snug">
                  {contact.desc}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-outline-variant/15 flex items-center justify-between">
                <span className="text-base font-extrabold text-on-surface">{contact.number}</span>
                <a
                  href={`tel:${contact.number.replace(/\s+/g, '')}`}
                  onClick={() => handleCall(contact.number)}
                  className="px-3.5 py-1.5 bg-primary text-on-primary rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-transform flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>Appeler</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MATERNITÉS & CENTRES HOSPITALIERS RÉGIONAUX */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/20 shadow-xs flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-headline text-base text-on-surface font-bold">
              Maternités &amp; Postes de Santé
            </h3>
            <p className="text-[10px] text-on-surface-variant">Prise en charge spécialisée et accouchements</p>
          </div>

          {/* Filtre région */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-bold text-on-surface bg-surface-container-low"
          >
            <option value="Tous">Toutes les régions</option>
            <option value="Dakar">Dakar &amp; Banlieue</option>
            <option value="Thiès">Thiès</option>
            <option value="Kaolack">Kaolack</option>
          </select>
        </div>

        <div className="divide-y divide-outline-variant/15">
          {filteredCenters.map((center, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs text-on-surface truncate">{center.name}</h4>
                  <span className="text-[9px] bg-surface-container text-on-surface-variant font-bold px-1.5 py-0.5 rounded-full shrink-0">
                    {center.region}
                  </span>
                </div>
                <p className="text-[10px] text-on-surface-variant mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-primary">location_on</span>
                  <span>{center.address}</span>
                </p>
              </div>

              <a
                href={`tel:${center.phone.replace(/\s+/g, '')}`}
                onClick={() => handleCall(center.phone)}
                className="px-3 py-1.5 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-container-highest transition-colors flex items-center gap-1 shrink-0"
              >
                <span className="material-symbols-outlined text-[14px]">call</span>
                <span>{center.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
