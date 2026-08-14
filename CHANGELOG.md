# Changelog

Tous les changements notables du projet sont documentés dans ce fichier.

## [2.0.0] - 24 Juin 2025

### ✨ Ajoutée
- Backend Node.js/Express complet
- API REST pour tous les modules
- Base de données SQLite
- Envoi d'emails automatique (Nodemailer)
- Recherche commissariats dynamique
- Formulaires contact et déclarations fonctionnels
- Module api.js pour requêtes dynamiques
- Documentation complète (README)
- GitHub Actions CI/CD

### 🔄 Modifiée
- Structure du projet refactorisée (backend + frontend)
- Frontend modulaire (séparation api.js)
- Styles CSS optimisés
- Navigation menu hamburger améliorée
- Script principal réorganisé

### 🐛 Corrigée
- Formulaires hardcodés → dynamiques
- Performance images
- Mode sombre persistence
- Responsive design mobile

### ⚠️ Deprecated
- `apply_dark_mode.py` (remplacé par CSS dynamique)
- Données en dur → API

---

## [1.0.0] - 28 Avril 2025

### ✨ Initiale
- Site HTML/CSS/JS vanilla
- 10 pages principales (accueil, histoire, missions, etc.)
- Mode sombre
- Menu hamburger mobile
- Carousels publicitaires
- Responsive design (mobile-first)
- Pages statiques pour commissariats et urgences

---

## Format du Changelog

Ce projet suit [Keep a Changelog](https://keepachangelog.com/).

### Types de changements
- **Added** – nouvelles fonctionnalités
- **Changed** – changements de fonctionnalités existantes
- **Deprecated** – fonctionnalités bientôt supprimées
- **Removed** – fonctionnalités supprimées
- **Fixed** – corrections de bugs
- **Security** – en cas de vulnérabilités

---

## Versions futures

### v2.1.0 (Planifié)
- [ ] Authentification admin (JWT)
- [ ] Dashboard admin
- [ ] Upload de fichiers
- [ ] Notifications email avancées

### v3.0.0 (Long terme)
- [ ] PWA (Application web progressive)
- [ ] GraphQL API
- [ ] Multi-langue
- [ ] Géolocalisation (Google Maps)
- [ ] Mobile app (React Native)
