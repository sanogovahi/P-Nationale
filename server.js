// ============================================================
// SERVER.JS - VERSION CORRIGÉE
// ============================================================

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import commissariatsRoutes from './backend/routes/commissariats.js';
import actualitesRoutes from './backend/routes/actualites.js';
import contactRoutes from './backend/routes/contact.js';
import declarationsRoutes from './backend/routes/declarations.js';
import urgencesRoutes from './backend/routes/urgences.js';
import { initializeDatabase } from './backend/db.js';

// Configuration
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'Site Provisoire DEFINITIF')));

// ===== ROUTES API =====
app.use('/api/commissariats', commissariatsRoutes);
app.use('/api/actualites', actualitesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/declarations', declarationsRoutes);
app.use('/api/urgences', urgencesRoutes);

// ===== ROUTE PRINCIPALE =====
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Site Provisoire DEFINITIF', 'index.html'));
});

// ===== GESTION D'ERREURS =====
app.use((err, req, res, next) => {
    console.error('❌ Erreur:', err.stack);
    res.status(500).json({ 
        success: false,
        error: 'Erreur serveur interne' 
    });
});

// Route 404
app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        error: 'Route non trouvée' 
    });
});

// ===== DÉMARRAGE =====
async function startServer() {
    try {
        console.log('🔄 Initialisation de la base de données...');
        await initializeDatabase();
        console.log('✅ Base de données initialisée');
        
        app.listen(PORT, () => {
            console.log('');
            console.log('═══════════════════════════════════════');
            console.log(`✅ Serveur démarré avec succès !`);
            console.log(`🌐 URL : http://localhost:${PORT}`);
            console.log(`📁 Dossier : Site Provisoire DEFINITIF`);
            console.log('═══════════════════════════════════════');
        });
    } catch (error) {
        console.error('❌ Erreur au démarrage du serveur :', error.message);
        process.exit(1);
    }
}

startServer();

export default app;