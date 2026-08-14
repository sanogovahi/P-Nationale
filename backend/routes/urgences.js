import express from 'express';
import { queryAsync, runAsync } from '../db.js';
import { validateUrgence, validateId, handleValidationErrors } from '../validators.js';

const router = express.Router();

// GET tous les numéros d'urgence
router.get('/', async (req, res, next) => {
  try {
    const urgences = await queryAsync(
      'SELECT * FROM urgences ORDER BY nom ASC'
    );
    res.json({
      success: true,
      count: urgences.length,
      data: urgences
    });
  } catch (error) {
    next(error);
  }
});

// GET urgence par ID
router.get('/:id', validateId, handleValidationErrors, async (req, res, next) => {
  try {
    const urgences = await queryAsync(
      'SELECT * FROM urgences WHERE id = ?',
      [req.params.id]
    );
    if (urgences.length === 0) {
      return res.status(404).json({ error: 'Urgence non trouvée' });
    }
    res.json(urgences[0]);
  } catch (error) {
    next(error);
  }
});

// POST créer urgence
router.post('/', validateUrgence, handleValidationErrors, async (req, res, next) => {
  try {
    const { nom, numero, description } = req.body;
    const result = await runAsync(
      'INSERT INTO urgences (nom, numero, description) VALUES (?, ?, ?)',
      [nom, numero, description || null]
    );
    res.status(201).json({
      success: true,
      id: result.id,
      message: 'Numéro d\'urgence créé avec succès'
    });
  } catch (error) {
    next(error);
  }
});

// DELETE urgence
router.delete('/:id', validateId, handleValidationErrors, async (req, res, next) => {
  try {
    await runAsync('DELETE FROM urgences WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Urgence supprimée' });
  } catch (error) {
    next(error);
  }
});

export default router;
