import { Router } from 'express';
import { processChatbotMessage } from '../services/chatbotAI.js';

const router = Router();

/**
 * POST /api/chat
 * Body: { message: string, lang?: 'fr' | 'wo', history?: Array }
 */
router.post('/', async (req, res) => {
  try {
    const { message, lang = 'fr', history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: "Le champ 'message' est requis."
      });
    }

    const response = await processChatbotMessage({
      message,
      lang: lang === 'wo' ? 'wo' : 'fr',
      history
    });

    return res.json(response);
  } catch (error) {
    console.error("Erreur dans /api/chat:", error);
    return res.status(500).json({
      error: "Une erreur interne s'est produite lors du traitement du message.",
      details: error.message
    });
  }
});

export default router;
