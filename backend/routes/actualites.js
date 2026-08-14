import express from 'express';
import { queryAsync, runAsync } from '../db.js';
import { validateActualite, validateId, handleValidationErrors } from '../validators.js';

const router = express.Router();

// GET toutes les actualités
router.get('/', async (req, res, next) => {
  try {
    const actualites = await queryAsync(
      'SELECT * FROM actualites ORDER BY date_publication DESC LIMIT 50'
    );
    res.json({
      success: true,
      count: actualites.length,
      data: actualites
    });
  } catch (error) {
    next(error);
  }
});

// GET actualité par ID
router.get('/:id', validateId, handleValidationErrors, async (req, res, next) => {
  try {
    const actualites = await queryAsync(
      'SELECT * FROM actualites WHERE id = ?',
      [req.params.id]
    );
    if (actualites.length === 0) {
      return res.status(404).json({ error: 'Actualité non trouvée' });
    }
    res.json(actualites[0]);
  } catch (error) {
    next(error);
  }
});

// POST créer actualité
router.post('/', validateActualite, handleValidationErrors, async (req, res, next) => {
  try {
    const { titre, contenu, image_url, auteur } = req.body;
    const result = await runAsync(
      'INSERT INTO actualites (titre, contenu, image_url, auteur) VALUES (?, ?, ?, ?)',
      [titre, contenu, image_url || null, auteur || 'Admin']
    );
    res.status(201).json({
      success: true,
      id: result.id,
      message: 'Actualité créée avec succès'
    });
  } catch (error) {
    next(error);
  }
});

// PUT mettre à jour actualité
router.put('/:id', validateId, validateActualite, handleValidationErrors, async (req, res, next) => {
  try {
    const { titre, contenu, image_url, auteur } = req.body;
    await runAsync(
      'UPDATE actualites SET titre = ?, contenu = ?, image_url = ?, auteur = ? WHERE id = ?',
      [titre, contenu, image_url, auteur, req.params.id]
    );
    res.json({ success: true, message: 'Actualité mise à jour' });
  } catch (error) {
    next(error);
  }
});

// DELETE actualité
router.delete('/:id', validateId, handleValidationErrors, async (req, res, next) => {
  try {
    await runAsync('DELETE FROM actualites WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Actualité supprimée' });
  } catch (error) {
    next(error);
  }
});

export default router;
