import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRouter from './routes/chat.js';
import translateRouter from './routes/translate.js';
import metricsRouter from './routes/metrics.js';
import pregnancyRouter from './routes/pregnancy.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Route de diagnostic / santé
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'SuturaSanté API Backend',
    version: '1.0.0',
    cohort: 'UNICEF Femtech Innovation Fund 2026',
    author: 'MM',
    corporate: 'Sam Corporate',
    services: {
      chatbot: 'active',
      wolofTranslator: 'active',
      metrics: 'active',
      pregnancy: 'active'
    },
    timestamp: new Date().toISOString()
  });
});

// Enregistrement des routes
app.use('/api/chat', chatRouter);
app.use('/api/translate', translateRouter);
app.use('/api/metrics', metricsRouter);
app.use('/api/pregnancy', pregnancyRouter);

// Gestion des routes inconnues
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      error: "Point de terminaison API introuvable."
    });
  }
  next();
});

// Démarrage du serveur si exécuté directement
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[SuturaSanté Backend] Serveur API en écoute sur http://localhost:${PORT}`);
    console.log(`[Services Actifs] Chatbot IA (/api/chat) • Traduction Wolof (/api/translate) • Métriques (/api/metrics)`);
  });
}

export default app;
