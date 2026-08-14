import express from 'express';
import { queryAsync, runAsync } from '../db.js';
import { validateCommissariat, validateId, handleValidationErrors } from '../validators.js';

const router = express.Router();

// GET tous les commissariats
router.get('/', async (req, res, next) => {
  try {
    const commissariats = await queryAsync(
      'SELECT * FROM commissariats ORDER BY nom ASC'
    );
    res.json({
      success: true,
      count: commissariats.length,
      data: commissariats
    });
  } catch (error) {
    next(error);
  }
});

// GET commissariat par ID
router.get('/:id', validateId, handleValidationErrors, async (req, res, next) => {
  try {
    const commissariats = await queryAsync(
      'SELECT * FROM commissariats WHERE id = ?',
      [req.params.id]
    );
    if (commissariats.length === 0) {
      return res.status(404).json({ error: 'Commissariat non trouvé' });
    }
    res.json(commissariats[0]);
  } catch (error) {
    next(error);
  }
});

// SEARCH commissariats
router.get('/search/:query', async (req, res, next) => {
  try {
    const query = `%${req.params.query.trim().substring(0, 100)}%`;
    const commissariats = await queryAsync(
      'SELECT * FROM commissariats WHERE nom LIKE ? OR adresse LIKE ? ORDER BY nom ASC',
      [query, query]
    );
    res.json({
      success: true,
      count: commissariats.length,
      data: commissariats
    });
  } catch (error) {
    next(error);
  }
});

// POST créer commissariat
router.post('/', validateCommissariat, handleValidationErrors, async (req, res, next) => {
  try {
    const { nom, adresse, telephone, email, latitude, longitude, horaires } = req.body;
    const result = await runAsync(
      'INSERT INTO commissariats (nom, adresse, telephone, email, latitude, longitude, horaires) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nom, adresse, telephone || null, email || null, latitude || null, longitude || null, horaires || null]
    );
    res.status(201).json({
      success: true,
      id: result.id,
      message: 'Commissariat créé avec succès'
    });
  } catch (error) {
    next(error);
  }
});

// PUT mettre à jour commissariat
router.put('/:id', validateId, validateCommissariat, handleValidationErrors, async (req, res, next) => {
  try {
    const { nom, adresse, telephone, email, latitude, longitude, horaires } = req.body;
    await runAsync(
      'UPDATE commissariats SET nom = ?, adresse = ?, telephone = ?, email = ?, latitude = ?, longitude = ?, horaires = ? WHERE id = ?',
      [nom, adresse, telephone, email, latitude, longitude, horaires, req.params.id]
    );
    res.json({ success: true, message: 'Commissariat mis à jour' });
  } catch (error) {
    next(error);
  }
});

// DELETE commissariat
router.delete('/:id', validateId, handleValidationErrors, async (req, res, next) => {
  try {
    await runAsync('DELETE FROM commissariats WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Commissariat supprimé' });
  } catch (error) {
    next(error);
  }
});

export default router;
