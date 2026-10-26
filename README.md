# SuturaSanté 🇸🇳 (Digital Public Good - UNICEF Femtech)

> **Plateforme mobile-first de suivi prénatal, santé reproductive et triage d'urgence bilingue (Français & Wolof) pour les femmes et filles au Sénégal.**

Projet développé dans le cadre de l'appel à projets **UNICEF / Suède Innovation Fund (Femtech Cohort)**.

---

## 🎯 Problématique & Justification (Contexte Sénégal)

* **Retards de consultation prénatale (CPN) :** Moins d'une femme sur deux effectue les 4 visites prénatales à temps au Sénégal.
* **Barrière linguistique & orale :** Le wolof parlé est la langue du quotidien pour plus de 80% de la population. Une interface uniquement textuelle en français exclut les femmes les plus vulnérables.
* **Tabous culturels (Sutura) :** Les questions de santé reproductive et de signes de danger restent difficiles à aborder ouvertement en famille ou en public.

---

## 💡 Notre Solution

**SuturaSanté** est une Progressive Web App (PWA) ultra-légère (< 2 Mo) et un pont conversationnel WhatsApp sans barrière à l'entrée :
1. **Bilingue intégrée (Français & Wolofal) :** Synthèse audio instantanée pour chaque conseil et chaque alerte.
2. **Calculateur CPN dynamique :** Calcule les 4 dates clés de consultation selon le protocole officiel du Ministère de la Santé du Sénégal.
3. **Triage Rapide des Signes de Danger :** Algorithme de détection des urgences obstétricales (pré-éclampsie, hémorragies) avec bouton d'appel direct vers le **SAMU National (1515)**.
4. **Annuaire d'urgence :** Numéros verts (SAMU 1515, Ligne d'assistance VBG/Enfance 116) et maternités régionales de référence.
5. **Dashboard Public d'Impact (/metrics) :** Données d'utilisation en temps réel, 100% anonymisées, conformes à l'exigence d'Open Data de l'UNICEF.

---

## 🚀 Démarrage Rapide

### Prérequis
* Node.js v18+ 
* npm ou yarn

### Installation locale
```bash
# Cloner le projet
git clone https://github.com/<votre-organisation>/sutura-sante.git
cd sutura-sante

# Installer les dépendances
npm install

# Lancer le serveur local
npm run dev
```

L'application s'ouvrira sur `http://localhost:3000`.

### Déploiement en 1 clic
Ce projet peut être déployé immédiatement sur **Vercel**, **Netlify** ou **Render** :
```bash
npm run build
```

---

## 📊 Conformité aux Exigences UNICEF Innovation Fund

| Exigence UNICEF | Prise en compte dans SuturaSanté |
| :--- | :--- |
| **Entreprise privée enregistrée** | Porté par une entité enregistrée au Sénégal (NINEA / RCCM). |
| **Technologie Open Source** | Sous licence libre **MIT**, éligible au statut de *Digital Public Good*. |
| **Prototype fonctionnel & Pilote** | Testé auprès d'un premier panel de femmes et relais communautaires à Dakar et Thiès. |
| **Données mesurables publiques** | Onglet public `/metrics` affichant en temps réel les consultations, triages et écoutes audio. |
| **Impact sur les plus vulnérables** | Audio natif en Wolof, zéro coût d'installation, légèreté pour réseaux 2G/3G. |

---

## ⚖️ Licence
Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.
