import { body, param, validationResult } from 'express-validator';

// Middleware pour capturer les erreurs de validation
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next()
};

// Validateurs pour Contact
export const validateContact = [
  body('nom')
    .trim()
    .notEmpty().withMessage('Le nom est obligatoire')
    .isLength({ min: 2, max: 100 }).withMessage('Le nom doit avoir entre 2 et 100 caractères'),
  body('email')
    .trim()
    .isEmail().withMessage('Email invalide')
    .normalizeEmail(),
  body('sujet')
    .trim()
    .notEmpty().withMessage('Le sujet est obligatoire')
    .isLength({ min: 5, max: 200 }).withMessage('Le sujet doit avoir entre 5 et 200 caractères'),
  body('message')
    .trim()
    .notEmpty().withMessage('Le message est obligatoire')
    .isLength({ min: 10, max: 5000 }).withMessage('Le message doit avoir entre 10 et 5000 caractères'),
  body('telephone')
    .optional()
    .trim()
    .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Téléphone invalide'),
];

// Validateurs pour Déclarations
export const validateDeclaration = [
  body('type')
    .trim()
    .notEmpty().withMessage('Le type de déclaration est obligatoire')
    .isIn(['plainte', 'vol', 'agression', 'accident', 'autre']).withMessage('Type de déclaration invalide'),
  body('nom')
    .trim()
    .notEmpty().withMessage('Le nom est obligatoire')
    .isLength({ min: 2, max: 100 }).withMessage('Nom invalide'),
  body('email')
    .trim()
    .isEmail().withMessage('Email invalide')
    .normalizeEmail(),
  body('description')
    .trim()
    .notEmpty().withMessage('La description est obligatoire')
    .isLength({ min: 10, max: 10000 }).withMessage('Description invalide'),
  body('telephone')
    .optional()
    .trim()
    .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Téléphone invalide'),
];

// Validateurs pour Commissariats
export const validateCommissariat = [
  body('nom')
    .trim()
    .notEmpty().withMessage('Le nom est obligatoire')
    .isLength({ min: 2, max: 200 }).withMessage('Nom invalide'),
  body('adresse')
    .trim()
    .notEmpty().withMessage('L\'adresse est obligatoire')
    .isLength({ min: 5, max: 300 }).withMessage('Adresse invalide'),
  body('telephone')
    .optional()
    .trim()
    .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Téléphone invalide'),
  body('email')
    .optional()
    .isEmail().withMessage('Email invalide')
    .normalizeEmail(),
  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 }).withMessage('Latitude invalide'),
  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 }).withMessage('Longitude invalide'),
];

// Validateurs pour Actualités
export const validateActualite = [
  body('titre')
    .trim()
    .notEmpty().withMessage('Le titre est obligatoire')
    .isLength({ min: 5, max: 300 }).withMessage('Titre invalide'),
  body('contenu')
    .trim()
    .notEmpty().withMessage('Le contenu est obligatoire')
    .isLength({ min: 20, max: 20000 }).withMessage('Contenu invalide'),
  body('image_url')
    .optional()
    .trim()
    .isURL().withMessage('URL d\'image invalide'),
];

// Validateurs pour Urgences
export const validateUrgence = [
  body('nom')
    .trim()
    .notEmpty().withMessage('Le nom est obligatoire')
    .isLength({ min: 3, max: 100 }).withMessage('Nom invalide'),
  body('numero')
    .trim()
    .notEmpty().withMessage('Le numéro est obligatoire')
    .matches(/^[\d\-\s]+$/).withMessage('Numéro invalide'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description invalide'),
];

// Validateur pour ID
export const validateId = [
  param('id')
    .isInt({ min: 1 }).withMessage('ID invalide'),
];
