import { Router } from 'express';
import { translateText } from '../services/wolofTranslator.js';

const router = Router();

/**
 * POST /api/translate
 * Body: { text: string, sourceLang?: 'fr' | 'wo', targetLang?: 'wo' | 'fr' }
 */
router.post('/', async (req, res) => {
  try {
    const { text, sourceLang = 'fr', targetLang = 'wo' } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        error: "Le champ 'text' est requis."
      });
    }

    const result = await translateText({
      text,
      sourceLang: sourceLang === 'wo' ? 'wo' : 'fr',
      targetLang: targetLang === 'fr' ? 'fr' : 'wo'
    });

    return res.json(result);
  } catch (error) {
    console.error("Erreur dans /api/translate:", error);
    return res.status(500).json({
      error: "Une erreur interne s'est produite lors de la traduction.",
      details: error.message
    });
  }
});

/**
 * GET /api/translate/languages
 */
router.get('/languages', (req, res) => {
  res.json({
    languages: [
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'wo', name: 'Wolof (Wolofal)', flag: '🇸🇳' }
    ],
    defaultPair: { source: 'fr', target: 'wo' }
  });
});

export default router;
