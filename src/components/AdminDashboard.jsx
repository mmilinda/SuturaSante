import React, { useState } from 'react';

export default function AdminDashboard({ lang = 'wo', onActionTrack }) {
  const [activeSection, setActiveSection] = useState('centers');
  const [offlineSyncEnabled, setOfflineSyncEnabled] = useState(true);
  const [encryptionAudit, setEncryptionAudit] = useState(true);

  const [centers, setCenters] = useState([
    { id: 1, name: 'Poste de Santé Pikine Icotaf', district: 'Pikine Est', type: 'Dispensaire Primaire', bedsAvailable: 4, sonuLevel: 'SONUB', status: 'Opérationnel' },
    { id: 2, name: 'Centre de Santé Dominique', district: 'Pikine Centre', type: 'Centre de Référence', bedsAvailable: 2, sonuLevel: 'SONUB Avancé', status: 'Opérationnel' },
    { id: 3, name: 'Hôpital National Dalal Jamm', district: 'Guédiawaye', type: 'Centre Hospitalier Universitaire', bedsAvailable: 3, sonuLevel: 'SONUC Réa', status: 'Fluide' },
    { id: 4, name: 'Hôpital National de Pikine', district: 'Camp Militaire', type: 'Centre Hospitalier Régional', bedsAvailable: 0, sonuLevel: 'SONUC', status: 'Saturé' },
  ]);

  const [badiens, setBadiens] = useState([
    { id: 1, name: 'Fatou Ndiaye', quartier: 'Tally Bou Mack', femmes: 42, activeMemos: 6, lastSync: 'Il y a 4 min', status: 'Active' },
    { id: 2, name: 'Khadija Diop', quartier: 'Pikine Ouest', femmes: 38, activeMemos: 4, lastSync: 'Il y a 12 min', status: 'Active' },
    { id: 3, name: 'Aminata Sow', quartier: 'Icotaf 1 & 2', femmes: 51, activeMemos: 8, lastSync: 'Il y a 20 min', status: 'Active' },
    { id: 4, name: 'Seynabou Sène', quartier: 'Marché Syndicat', femmes: 29, activeMemos: 3, lastSync: 'Il y a 35 min', status: 'Active' },
  ]);

  const [stocks, setStocks] = useState([
    { item: 'Fer + Acide Folique 60mg (Plaquettes 30cp)', current: 22, threshold: 50, unit: 'boîtes', alert: true },
    { item: 'Bandelettes Urinaires Albuminurie / Protéinurie', current: 180, threshold: 100, unit: 'tests', alert: false },
    { item: 'Kits d\'Accouchement d\'Urgence Stériles', current: 14, threshold: 20, unit: 'kits', alert: true },
    { item: 'Sulfate de Magnésium (MgSO4) Ampoules IV', current: 36, threshold: 25, unit: 'ampoules', alert: false },
  ]);

  const handleUpdateStock = (index, delta) => {
    setStocks(prev => {
      const copy = [...prev];
      copy[index].current = Math.max(0, copy[index].current + delta);
      copy[index].alert = copy[index].current <= copy[index].threshold;
      return copy;
    });
  };

  const handleToggleBed = (centerId) => {
    setCenters(prev => prev.map(c => {
      if (c.id === centerId) {
        const nextBeds = c.bedsAvailable > 0 ? c.bedsAvailable - 1 : 3;
        return {
          ...c,
          bedsAvailable: nextBeds,
          status: nextBeds === 0 ? 'Saturé' : nextBeds < 3 ? 'Opérationnel' : 'Fluide'
        };
      }
      return c;
    }));
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. Header Admin Hero */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#902e2a] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#902e2a]">
              Console d'Administration & Gestion du Site
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] text-[10px] font-bold">
              Root / Superviseur
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#171c23] mt-1">
            Gouvernance Clinique & Territoriale SuturaSanté
          </h1>
          <p className="text-xs sm:text-sm text-[#574240]">
            Paramétrage des structures hospitalières, supervision du réseau des Badien Gox et approvisionnement des dispensaires.
          </p>
        </div>

        {/* Global Action Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => alert("Sauvegarde complète des configurations chiffrées réussie.")}
            className="px-4 py-2 rounded-xl bg-[#902e2a] hover:bg-[#b0453f] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">sync_saved_locally</span>
            <span>Sauvegarder l'État</span>
          </button>
        </div>
      </section>

      {/* 2. Security & Compliance Ribbon */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#ddc0bd]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#574240]">Chiffrement Sutura</span>
            <div className="font-serif text-lg font-bold text-[#2c694e] flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#2c694e] animate-pulse"></span>
              AES-GCM 256
            </div>
            <span className="text-[10px] text-[#574240]">100% Anonymisé (Zéro PII)</span>
          </div>
          <span className="material-symbols-outlined text-[#2c694e] text-[28px]">shield_lock</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ddc0bd]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#574240]">Cache PWA Hors-Ligne</span>
            <div className="font-serif text-lg font-bold text-[#171c23] mt-0.5">
              1.8 Mo (Léger)
            </div>
            <span className="text-[10px] text-[#2c694e] font-semibold">ServiceWorker Actif</span>
          </div>
          <span className="material-symbols-outlined text-[#724600] text-[28px]">offline_pin</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ddc0bd]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#574240]">Marraines en Ligne</span>
            <div className="font-serif text-lg font-bold text-[#902e2a] mt-0.5">
              1 240 Badien Gox
            </div>
            <span className="text-[10px] text-[#2c694e] font-semibold">5 Pôles Régionaux</span>
          </div>
          <span className="material-symbols-outlined text-[#902e2a] text-[28px]">diversity_1</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#ddc0bd]/40 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#574240]">Standard UNICEF</span>
            <div className="font-serif text-lg font-bold text-[#316e52] mt-0.5">
              DPG Validé
            </div>
            <span className="text-[10px] text-[#574240]">Licence MIT Open Source</span>
          </div>
          <span className="material-symbols-outlined text-[#316e52] text-[28px]">verified</span>
        </div>
      </section>

      {/* 3. Navigation Onglets Admin */}
      <div className="flex items-center bg-[#eaeef8] p-1 rounded-2xl gap-1 w-fit overflow-x-auto border border-[#ddc0bd]/40">
        <button
          type="button"
          onClick={() => setActiveSection('centers')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeSection === 'centers'
              ? 'bg-[#902e2a] text-white shadow-xs'
              : 'text-[#574240] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">local_hospital</span>
          <span>Centres & Lits SONU ({centers.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('badiens')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeSection === 'badiens'
              ? 'bg-[#902e2a] text-white shadow-xs'
              : 'text-[#574240] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">diversity_1</span>
          <span>Réseau Badien Gox ({badiens.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('stocks')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeSection === 'stocks'
              ? 'bg-[#902e2a] text-white shadow-xs'
              : 'text-[#574240] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">inventory_2</span>
          <span>Stocks PNA & Dotations</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('settings')}
          className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeSection === 'settings'
              ? 'bg-[#902e2a] text-white shadow-xs'
              : 'text-[#574240] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">tune</span>
          <span>Paramètres Sutura & DPG</span>
        </button>
      </div>

      {/* SECTION 1 : Centres & Lits SONU */}
      {activeSection === 'centers' && (
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#171c23]">
                Gestion des Établissements Hospitaliers & Lits Maternité
              </h3>
              <p className="text-xs text-[#574240]">
                Mettez à jour la disponibilité des lits réa SONUC pour la régulation d'urgence SAMU 1515.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert("Formulaire d'ajout d'une nouvelle structure sanitaire.")}
              className="px-3.5 py-1.5 rounded-xl bg-[#eaeef8] hover:bg-[#dee2ec] text-[#171c23] text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Ajouter un Centre</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#ddc0bd]/30">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#eaeef8] text-[#171c23] font-bold">
                  <th className="py-3 px-4">Établissement</th>
                  <th className="py-3 px-3">District</th>
                  <th className="py-3 px-3">Plateau SONU</th>
                  <th className="py-3 px-3">Lits Disponibles</th>
                  <th className="py-3 px-3">Statut Triage</th>
                  <th className="py-3 px-4 text-right">Action Rapide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaeef8]">
                {centers.map(center => (
                  <tr key={center.id} className="hover:bg-[#f0f4fd] transition-colors">
                    <td className="py-3 px-4 font-bold text-[#171c23]">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#902e2a] text-[18px]">domain</span>
                        <span>{center.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-[#574240]">{center.district}</td>
                    <td className="py-3 px-3 font-semibold text-[#2c694e]">{center.sonuLevel}</td>
                    <td className="py-3 px-3">
                      <span className="font-serif font-bold text-sm text-[#171c23] px-2.5 py-0.5 rounded-md bg-[#eaeef8]">
                        {center.bedsAvailable} lits
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        center.status === 'Saturé'
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : center.status === 'Fluide'
                          ? 'bg-[#aeeecb] text-[#316e52]'
                          : 'bg-[#ffddb8] text-[#724600]'
                      }`}>
                        {center.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleToggleBed(center.id)}
                        className="px-2.5 py-1 rounded-lg bg-[#f0f4fd] hover:bg-[#eaeef8] text-[#902e2a] font-bold text-[11px] transition-colors cursor-pointer"
                        title="Modifier la disponibilité des lits"
                      >
                        Ajuster Lits
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* SECTION 2 : Réseau Badien Gox */}
      {activeSection === 'badiens' && (
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#171c23]">
                Registre Opérationnel des Badien Gox (Marraines Communautaires)
              </h3>
              <p className="text-xs text-[#574240]">
                Supervision des rondes de proximité, des mémos vocaux enregistrés et de l'assiduité CPN.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert("Ajout d'une nouvelle marraine Badien Gox assermentée.")}
              className="px-3.5 py-1.5 rounded-xl bg-[#902e2a] hover:bg-[#b0453f] text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              <span>Enrôler Badien Gox</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badiens.map(badien => (
              <div
                key={badien.id}
                className="p-4 rounded-xl bg-[#f0f4fd] border border-[#ddc0bd]/30 flex flex-col justify-between gap-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#902e2a] flex items-center justify-center font-bold text-xs">
                      {badien.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#171c23]">{badien.name}</h4>
                      <span className="text-[11px] text-[#574240] flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] text-[#902e2a]">home_pin</span>
                        {badien.quartier}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#aeeecb] text-[#316e52] text-[10px] font-bold">
                    {badien.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-white shadow-xs">
                    <span className="font-serif text-base font-bold text-[#171c23] block">{badien.femmes}</span>
                    <span className="text-[10px] text-[#574240]">Mères Suivies</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white shadow-xs">
                    <span className="font-serif text-base font-bold text-[#724600] block">{badien.activeMemos}</span>
                    <span className="text-[10px] text-[#574240]">Mémos Vocaux</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#574240] pt-1 border-t border-[#ddc0bd]/20">
                  <span>Dernière synchro : {badien.lastSync}</span>
                  <button
                    type="button"
                    onClick={() => alert(`Détails du secteur de ${badien.name} ouverts.`)}
                    className="text-[#902e2a] font-bold hover:underline"
                  >
                    Gérer Secteur →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3 : Stocks PNA & Intrants */}
      {activeSection === 'stocks' && (
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#171c23]">
                Gestion des Intrants & Réserve Médicale Dispensaire (PNA)
              </h3>
              <p className="text-xs text-[#574240]">
                Surveillance continue des dotations en Fer / Acide Folique, kits et médicaments essentiels.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert("Bon de commande PNA Express généré pour tout le District de Pikine.")}
              className="px-4 py-2 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              <span>Déclencher Réassort Express PNA</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stocks.map((stock, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${
                  stock.alert
                    ? 'bg-[#ffdad6]/20 border-[#ffdad6]'
                    : 'bg-[#f0f4fd] border-[#ddc0bd]/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-[#171c23]">{stock.item}</h4>
                    <span className="text-[10px] text-[#574240]">
                      Seuil d'alerte : {stock.threshold} {stock.unit}
                    </span>
                  </div>
                  {stock.alert && (
                    <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">warning</span>
                      Seuil Critique
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className={`font-serif text-2xl font-bold ${stock.alert ? 'text-[#ba1a1a]' : 'text-[#171c23]'}`}>
                      {stock.current}
                    </span>
                    <span className="text-xs text-[#574240] font-medium">{stock.unit} restants</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleUpdateStock(idx, -5)}
                      className="w-7 h-7 rounded-lg bg-white border border-[#ddc0bd] text-[#574240] font-bold text-xs flex items-center justify-center hover:bg-[#eaeef8] cursor-pointer"
                      title="Déduire 5 unités distribuées"
                    >
                      -5
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateStock(idx, 10)}
                      className="w-7 h-7 rounded-lg bg-[#902e2a] text-white font-bold text-xs flex items-center justify-center hover:bg-[#b0453f] cursor-pointer shadow-xs"
                      title="Ajouter 10 unités reçues"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4 : Paramètres Sutura & DPG */}
      {activeSection === 'settings' && (
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#ddc0bd]/40 flex flex-col gap-5">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#171c23]">
              Paramètres Éthiques Sutura & Bien Public Numérique (DPG)
            </h3>
            <p className="text-xs text-[#574240]">
              Configuration stricte du respect de la vie privée et conformité UNICEF Femtech 2026.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f0f4fd]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#2c694e] text-[22px]">verified_user</span>
                <div>
                  <span className="text-xs font-bold text-[#171c23] block">Protocole de Confidentialité Sutura</span>
                  <span className="text-[10px] text-[#574240]">Interdit tout stockage de nom réel, téléphone en clair ou GPS précis</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#aeeecb] text-[#316e52] text-xs font-bold">
                Verrouillé (Actif)
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f0f4fd]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#724600] text-[22px]">wifi_tethering</span>
                <div>
                  <span className="text-xs font-bold text-[#171c23] block">Synchronisation Locale PWA Offline-First</span>
                  <span className="text-[10px] text-[#574240]">Permet la saisie dans les zones périurbaines sans connexion 4G/3G</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={offlineSyncEnabled}
                onChange={(e) => setOfflineSyncEnabled(e.target.checked)}
                className="w-5 h-5 accent-[#902e2a] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f0f4fd]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#902e2a] text-[22px]">database</span>
                <div>
                  <span className="text-xs font-bold text-[#171c23] block">Purge Médico-Légale des Données Volatiles</span>
                  <span className="text-[10px] text-[#574240]">Efface les mémos vocaux temporaires après transcription et validation</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert("Purge effectuée : 0 trace résiduelle.")}
                className="px-3 py-1.5 rounded-xl bg-[#eaeef8] hover:bg-[#dee2ec] text-[#ba1a1a] text-xs font-bold cursor-pointer"
              >
                Purger Maintenant
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
