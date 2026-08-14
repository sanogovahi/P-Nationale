import express from 'express';
import { queryAsync, runAsync } from '../db.js';
import { sendDeclarationEmail } from '../email.js';
import { validateDeclaration, validateId, handleValidationErrors } from '../validators.js';

const router = express.Router();

// GET toutes les déclarations (admin)
router.get('/', async (req, res, next) => {
  try {
    const declarations = await queryAsync(
      'SELECT * FROM declarations ORDER BY created_at DESC LIMIT 100'
    );
    res.json({
      success: true,
      count: declarations.length,
      data: declarations
    });
  } catch (error) {
    next(error);
  }
});

// GET déclaration par ID
router.get('/:id', validateId, handleValidationErrors, async (req, res, next) => {
  try {
    const declarations = await queryAsync(
      'SELECT * FROM declarations WHERE id = ?',
      [req.params.id]
    );
    if (declarations.length === 0) {
      return res.status(404).json({ error: 'Déclaration non trouvée' });
    }
    res.json(declarations[0]);
  } catch (error) {
    next(error);
  }
});

// POST créer déclaration
router.post('/', validateDeclaration, handleValidationErrors, async (req, res, next) => {
  try {
    const { type, nom, email, telephone, description, lieu, date_incident } = req.body;

    const result = await runAsync(
      'INSERT INTO declarations (type, nom, email, telephone, description, lieu, date_incident) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [type, nom, email, telephone || null, description, lieu || null, date_incident || null]
    );

    // Envoyer email de confirmation
    await sendDeclarationEmail(email, nom, result.id);

    res.status(201).json({
      success: true,
      id: result.id,
      message: 'Déclaration enregistrée avec succès'
    });
  } catch (error) {
    next(error);
  }
});

// PUT mettre à jour statut déclaration (admin)
router.put('/:id', validateId, handleValidationErrors, async (req, res, next) => {
  try {
    const { statut } = req.body;
    if (!['en_attente', 'en_traitement', 'resolu'].includes(statut)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }
    await runAsync(
      'UPDATE declarations SET statut = ? WHERE id = ?',
      [statut, req.params.id]
    );
    res.json({ success: true, message: 'Déclaration mise à jour' });
  } catch (error) {
    next(error);
  }
});

export default router;
