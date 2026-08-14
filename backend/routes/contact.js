'use strict';

import express from 'express';

const router = express.Router();

/*
=====================================================
ROUTE CONTACT
=====================================================
*/

// Test de la route
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'API contact opérationnelle'
  });
});

// Envoi d'un message de contact
router.post('/', async (req, res) => {
  try {
    const {
      nom,
      email,
      telephone,
      sujet,
      message
    } = req.body || {};

    // Vérification minimale
    if (!nom || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez renseigner le nom, l’adresse email et le message.'
      });
    }

    /*
    =================================================
    TRAITEMENT DU MESSAGE
    =================================================

    Pour le moment, les données sont simplement
    reçues par l'API.

    Tu pourras ensuite connecter ici Firebase,
    Firestore ou un service d'envoi d'e-mails.
    =================================================
    */

    console.log('Nouveau message de contact :', {
      nom,
      email,
      telephone: telephone || '',
      sujet: sujet || '',
      message
    });

    return res.status(200).json({
      success: true,
      message: 'Votre message a bien été reçu.'
    });

  } catch (error) {
    console.error('Erreur route contact :', error);

    return res.status(500).json({
      success: false,
      message: 'Une erreur interne est survenue.'
    });
  }
});

export default router;