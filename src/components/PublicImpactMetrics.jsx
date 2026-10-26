import React from 'react';

export default function PublicImpactMetrics({ t, metricsData, lang }) {
  return (
    <div className="flex flex-col w-full gap-4">
      {/* 1. EN-TÊTE UNICEF INNOVATION FUND */}
      <div className="bg-gradient-to-br from-secondary to-[#1e4635] rounded-2xl p-4 text-on-secondary shadow-sm flex flex-col gap-1.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/20 rounded-full text-[10px] font-extrabold backdrop-blur-md w-fit">
          <span className="material-symbols-outlined text-[14px]">public</span>
          <span>Transparence &amp; Open Data UNICEF</span>
        </div>
        <h2 className="font-headline text-xl font-bold leading-tight">
          {lang === 'wo' ? 'Njariñu SuturaSanté ci Réew mi' : "Tableau de Bord Public d'Impact"}
        </h2>
        <p className="text-xs text-on-secondary/90 leading-relaxed">
          Données d'utilisation en temps réel, 100% anonymisées, collectées pour mesurer l'impact sur la santé maternelle et néonatale au Sénégal.
        </p>
      </div>

      {/* 2. CARTES STATISTIQUES CLÉS */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/20 shadow-xs flex flex-col">
          <div className="w-8 h-8 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-1.5">
            <span className="material-symbols-outlined text-[18px]">group</span>
          </div>
          <span className="text-2xl font-extrabold text-on-surface">{metricsData.totalUsers}</span>
          <span className="text-[11px] text-on-surface-variant font-medium mt-0.5">
            Femmes &amp; relais accompagnés
          </span>
        </div>

        <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/20 shadow-xs flex flex-col">
          <div className="w-8 h-8 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mb-1.5">
            <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
          </div>
          <span className="text-2xl font-extrabold text-tertiary">{metricsData.audioListens}</span>
          <span className="text-[11px] text-on-surface-variant font-medium mt-0.5">
            Écoutes audio en Wolof
          </span>
        </div>

        <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/20 shadow-xs flex flex-col">
          <div className="w-8 h-8 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center mb-1.5">
            <span className="material-symbols-outlined text-[18px]">health_and_safety</span>
          </div>
          <span className="text-2xl font-extrabold text-on-surface">{metricsData.triagesDone}</span>
          <span className="text-[11px] text-on-surface-variant font-medium mt-0.5">
            Triages d'alerte effectués
          </span>
        </div>

        <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/20 shadow-xs flex flex-col">
          <div className="w-8 h-8 rounded-xl bg-error-container text-on-error-container flex items-center justify-center mb-1.5">
            <span className="material-symbols-outlined text-[18px]">emergency</span>
          </div>
          <span className="text-2xl font-extrabold text-error">{metricsData.emergenciesHandled}</span>
          <span className="text-[11px] text-on-surface-variant font-medium mt-0.5">
            Alertes SAMU 1515 orientées
          </span>
        </div>
      </div>

      {/* 3. ANALYSE DU MICRO-PILOTE TERRAIN */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/20 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-base text-on-surface font-bold">
            Résultats du Micro-Pilote Terrain (Sénégal)
          </h3>
          <span className="text-[9px] bg-secondary-container text-on-secondary-container font-extrabold px-2 py-0.5 rounded-full">
            Pilote Actif
          </span>
        </div>

        <div className="flex flex-col gap-2.5 text-xs">
          {/* Wolof vs Français */}
          <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
            <span className="text-on-surface-variant font-medium text-[11px]">
              Répartition Linguistique (Inclusion des populations orales)
            </span>
            <div className="flex justify-between font-bold text-on-surface">
              <span>Wolof (Audio &amp; Texte)</span>
              <span className="text-primary">72%</span>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '72%' }}></div>
            </div>
            <div className="flex justify-between text-[11px] text-on-surface-variant pt-0.5">
              <span>Français</span>
              <span>28%</span>
            </div>
          </div>

          {/* Zones */}
          <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
            <span className="text-on-surface-variant font-medium text-[11px]">
              Répartition Géographique
            </span>
            <div className="flex justify-between font-bold text-on-surface">
              <span>Dakar &amp; Banlieue (Pikine / Guédiawaye)</span>
              <span>54%</span>
            </div>
            <div className="flex justify-between font-bold text-on-surface">
              <span>Thiès &amp; Périurbain</span>
              <span>28%</span>
            </div>
            <div className="flex justify-between font-bold text-on-surface">
              <span>Kaolack &amp; Autres régions</span>
              <span>18%</span>
            </div>
          </div>

          {/* Critères UNICEF */}
          <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
            <span className="text-on-surface-variant font-medium text-[11px]">
              Conformité UNICEF / Suède Innovation Fund
            </span>
            <div className="flex items-center gap-1.5 text-secondary font-bold">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Licence Open Source (MIT)</span>
            </div>
            <div className="flex items-center gap-1.5 text-secondary font-bold">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>100% Anonymisé (Respect strict RGPD / Sutura)</span>
            </div>
            <div className="flex items-center gap-1.5 text-secondary font-bold">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Digital Public Good prêt pour l'Afrique de l'Ouest</span>
            </div>
          </div>
        </div>

        {/* Note de confidentialité */}
        <div className="p-3 rounded-xl bg-surface-container text-[11px] text-on-surface-variant leading-relaxed">
          <strong>Principe de Sutura :</strong> Aucune donnée personnelle nominative n'est enregistrée. Seules les statistiques d'usage globales et les scores de santé anonymisés sont publiés pour appuyer les décisions de santé publique de l'UNICEF et du Ministère de la Santé du Sénégal.
        </div>
      </div>
    </div>
  );
}
