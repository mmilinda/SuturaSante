import React, { useState } from 'react';
import { PhoneCall, MapPin, Building2, ShieldAlert } from 'lucide-react';
import { emergencyContacts, healthCenters } from '../data/healthDirectory';

export default function DirectoryView({ t, lang, onActionTrack }) {
  const [selectedRegion, setSelectedRegion] = useState('Tous');

  const filteredCenters = selectedRegion === 'Tous'
    ? healthCenters
    : healthCenters.filter(c => c.region.toLowerCase().includes(selectedRegion.toLowerCase()));

  const handleCall = (num) => {
    if (onActionTrack) onActionTrack('directory_call');
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-3xl p-6 text-white shadow-xl shadow-red-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-md mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Secours & Orientation Médicale</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold">
          {lang === 'wo' ? "Numéro Gawante & Fajuwaay yi" : "Numéros d'Urgence & Centres de Référence"}
        </h2>
        <p className="text-red-100 text-sm mt-1 max-w-xl">
          {lang === 'wo'
            ? "Ay numéro yu am solo yu la mën a dimbali léeg-léeg ci Sénégal."
            : "Lignes d'assistance gratuites et maternités de référence au Sénégal accessibles 24h/24."}
        </p>
      </div>

      {/* Numéros d'urgence nationaux */}
      <div>
        <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-red-600" />
          <span>{lang === 'wo' ? "Numéro gawante yi" : "Numéros Verts d'Urgence (Appel direct)"}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {emergencyContacts.map((contact, idx) => (
            <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-50 text-red-700">
                    {contact.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{contact.type}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm">{contact.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{contact.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                <span className="text-lg font-extrabold text-slate-900">{contact.number}</span>
                <a
                  href={`tel:${contact.number.replace(/\s+/g, '')}`}
                  onClick={() => handleCall(contact.number)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-200 transition active:scale-95 flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Appeler</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Maternités & Hôpitaux régionaux */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-700" />
            <span>Maternités & Centres Hospitaliers au Sénégal</span>
          </h3>

          {/* Filtre région */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Région :</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="Tous">Toutes les régions</option>
              <option value="Dakar">Dakar & Banlieue</option>
              <option value="Thiès">Thiès</option>
              <option value="Kaolack">Kaolack</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredCenters.map((center, idx) => (
            <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-800">{center.name}</h4>
                  <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                    {center.region}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>{center.address}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{center.services}</p>
              </div>

              <a
                href={`tel:${center.phone.replace(/\s+/g, '')}`}
                onClick={() => handleCall(center.phone)}
                className="self-start sm:self-center px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-slate-600" />
                <span>{center.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
