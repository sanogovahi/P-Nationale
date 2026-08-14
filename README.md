# 🚔 Police Nationale - Site Web Moderne v2.1

Site web moderne et responsive pour la Police Nationale de Côte d'Ivoire avec backend Node.js/Express sécurisé.

## 📋 Changelog v2.1.0

### ✅ Sécurité
- ✨ Rate limiting (100 req/15min)
- ✨ Validation des entrées stricte (express-validator)
- ✨ Protection headers (X-Content-Type-Options, CSP)
- ✨ HPP (HTTP Parameter Pollution) protection
- ✨ CORS configuré avec whitelist
- ✨ Credentials supprimés de .env.example
- ✨ Error handling robuste (500 errors sécurisées)

### ✅ Backend Amélioré
- ✨ Middleware centralisé (security, errors, validation)
- ✨ Gestion d'erreurs 500 avec logging structuré
- ✨ Support compression gzip
- ✨ Health check endpoint (/api/health)
- ✨ Validation stricte de tous les inputs
- ✨ Parameterized queries (prévention SQL injection)

### ✅ Frontend Optimisé
- ✨ Lazy loading images
- ✨ Meta tags SEO complets
- ✨ Accessibilité WCAG AA
- ✨ Dark mode persistent
- ✨ Responsive design mobile-first

### ✅ DevOps Amélioré
- ✨ .env.example sécurisé (sans credentials)
- ✨ .gitignore complet
- ✨ Docker-ready (Dockerfile + docker-compose.yml)
- ✨ CI/CD ready

## 🚀 Installation Rapide

### Prérequis
- Node.js >= 16
- npm >= 8

### Setup

```bash
# 1. Cloner le repo
git clone https://github.com/sanogovahi/site.git
cd site

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# 4. Démarrer le serveur
npm start

# Le site sera accessible sur http://localhost:3000
```

### Mode Développement

```bash
npm run dev
# Avec auto-reload grâce à nodemon
```

## 📁 Structure du Projet

```
site/
├── backend/
│   ├── db.js              # Database initialization
│   ├── email.js           # Email templates
│   ├── middleware.js      # Security & error handling ✨ NEW
│   ├── validators.js      # Input validation ✨ NEW
│   └── routes/
│       ├── commissariats.js  (✨ Updated)
│       ├── actualites.js     (✨ Updated)
│       ├── contact.js        (✨ Updated)
│       ├── declarations.js   (✨ Updated)
│       └── urgences.js       (✨ Updated)
├── Site Provisoire DEFINITIF/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── images/
├── server.js              # ✨ Updated - Middleware intégré
├── package.json           # ✨ Updated - Dépendances sécurité
├── .env.example          # ✨ Fixed - Credentials supprimés
├── .gitignore            # ✨ Updated - Complet
├── SECURITY.md           # ✨ NEW - Guide sécurité
└── README.md
```

## 🔒 Sécurité Implémentée

### Rate Limiting
- Max 100 requêtes par 15 minutes par IP
- Customizable via .env
- Protection contre DDoS

### Validation des Inputs
- Longueur des chaînes
- Format email/téléphone
- Types de données
- Injection SQL prevention (parameterized queries)

### Headers de Sécurité
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Strict-Transport-Security

## 📡 API Endpoints

### Health Check
```bash
GET /api/health  # Status du serveur
```

### Commissariats
```bash
GET    /api/commissariats              # Lister tous
GET    /api/commissariats/:id          # Détails
GET    /api/commissariats/search/:query # Rechercher
POST   /api/commissariats              # Créer (avec validation)
PUT    /api/commissariats/:id          # Mettre à jour
DELETE /api/commissariats/:id          # Supprimer
```

### Actualités
```bash
GET    /api/actualites                 # Lister (max 50)
GET    /api/actualites/:id             # Détails
POST   /api/actualites                 # Créer (avec validation)
PUT    /api/actualites/:id             # Mettre à jour
DELETE /api/actualites/:id             # Supprimer
```

### Contact
```bash
GET    /api/contact                    # Lister
POST   /api/contact                    # Envoyer message (validation stricte)
```

### Déclarations
```bash
GET    /api/declarations               # Lister
GET    /api/declarations/:id           # Détails
POST   /api/declarations               # Créer (validation stricte)
PUT    /api/declarations/:id           # Mettre à jour statut
```

### Urgences
```bash
GET    /api/urgences                   # Lister
GET    /api/urgences/:id               # Détails
POST   /api/urgences                   # Créer (avec validation)
DELETE /api/urgences/:id               # Supprimer
```

## 🎨 Système de Couleurs

- **Bleu Principal:** #0051a2
- **Bleu Foncé:** #052366
- **Or (Accents):** #ffd700
- **Gris (Footer):** #1f2937
- **Backgrounds:** #f5f5f5 (light), #0d1117 (dark)

## 📱 Responsive Breakpoints

- **Desktop:** > 1024px
- **Tablet:** 600px - 1024px
- **Mobile:** < 600px

## 🐛 Troubleshooting

### Erreur de port
```bash
PORT=3001 npm start
```

### Erreur de base de données
```bash
mkdir -p data
```

### Emails non envoyés
1. Vérifier .env (SMTP_*)
2. Utiliser un App Password Google (pas le mot de passe du compte)
3. Vérifier les logs console

## ⚠️ SÉCURITÉ CRITIQUE

**Les credentials suivants étaient exposées et DOIVENT être changées IMMÉDIATEMENT:**
- Email: servicecomdgpn@gmail.com
- App Password: jmtw atyy brnu rqep

✅ **Résolu:** Ces valeurs ont été retirées de .env.example

## 🚀 Performance

- ✅ Compression Gzip activée
- ✅ Cache headers configurés
- ✅ Lazy loading images
- ✅ Rate limiting pour stabilité
- ✅ CDN-ready

## 📄 Licence

MIT License

## 👤 Auteur

**sanogovahi** - Développeur Full Stack

---

**Dernière mise à jour:** Juillet 2026
**Version:** 2.1.0 (Production Ready) ✅
