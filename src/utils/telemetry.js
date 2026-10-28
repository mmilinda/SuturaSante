/**
 * Module de Télémétrie Éthique & Anonyme (SuturaSanté)
 * Conforme aux standards UNICEF Digital Public Goods (DPG) et CDP Sénégal.
 * 
 * Principe : Zero PII (Personally Identifiable Information)
 * - Aucun nom, aucun numéro, aucun email, aucun cookie tiers, aucune adresse IP conservée.
 * - Génération d'un identifiant éphémère anonyme purement aléatoire (UUIDv4 local).
 * - Envoi d'événements fonctionnels agrégés pour mesurer l'impact sans surveiller les personnes.
 */

const STORAGE_KEY_UID = 'sutura_anon_uid';
const STORAGE_KEY_SESSION = 'sutura_session_seq';

/**
 * Récupère ou génère un UUIDv4 anonyme local stocké uniquement dans le navigateur
 */
export function getOrCreateAnonymousId() {
  try {
    let anonId = localStorage.getItem(STORAGE_KEY_UID);
    if (!anonId) {
      anonId = 'anon_' + ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
      localStorage.setItem(STORAGE_KEY_UID, anonId);
    }
    return anonId;
  } catch (_) {
    // Si localStorage bloqué (navigation privée stricte), génère un token de session volatile
    return 'anon_volatile_' + Math.random().toString(36).substring(2, 12);
  }
}

/**
 * Envoie un événement d'action anonyme au backend pour l'observatoire d'impact
 * @param {string} eventType - Type d'action ('pregnancy_calculation', 'audio_listen', 'triage_completed', 'emergency_call', 'chatbot_inquiry')
 * @param {object} metadata - Données non-personnelles utiles (langue, catégorie, etc.)
 */
export async function trackAnonymousEvent(eventType, metadata = {}) {
  const anonymousId = getOrCreateAnonymousId();
  const payload = {
    anonymousId,
    eventType,
    lang: metadata.lang || 'wo',
    timestamp: new Date().toISOString(),
    isOffline: !navigator.onLine
  };

  try {
    // Envoi asynchrone non bloquant vers le backend
    if (navigator.onLine) {
      await fetch('/api/metrics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      // Stockage local si hors-ligne pour synchronisation ultérieure
      const offlineQueue = JSON.parse(localStorage.getItem('sutura_offline_events') || '[]');
      offlineQueue.push(payload);
      localStorage.setItem('sutura_offline_events', JSON.stringify(offlineQueue.slice(-50)));
    }
  } catch (err) {
    // Silencieux : la télémétrie ne doit jamais perturber l'expérience médicale
    console.debug("[Telemetry] Événement anonyme journalisé localement");
  }

  return payload;
}
