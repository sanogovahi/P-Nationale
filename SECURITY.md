# 🔒 Politique de Sécurité

## Signaler une vulnérabilité

Si vous découvrez une faille de sécurité, **ne la publiez pas publiquement**. 

Veuillez inclure:
- Description de la vulnérabilité
- Étapes de reproduction
- Impact potentiel
- Suggestions de correctif si possible

## Mesures de Sécurité Implémentées ✅

### 1. Protection des Données
- ✅ Validation stricte des inputs (express-validator)
- ✅ Parameterized queries (prévention SQL injection)
- ✅ Output encoding
- ✅ XSS prevention

### 2. Rate Limiting
- ✅ 100 requêtes par 15 minutes par IP
- ✅ Customizable via .env

### 3. Headers de Sécurité
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Strict-Transport-Security

### 4. CORS
- ✅ Configuré avec whitelist
- ✅ Credentials control

### 5. Error Handling
- ✅ Messages d'erreur sécurisés
- ✅ Logging structuré
- ✅ Stack traces masquées en production

## Checklist Production

- [ ] Variables d'environnement TOUTES configurées
- [ ] Credentials en .env (jamais en repo)
- [ ] HTTPS forcé
- [ ] Database backups
- [ ] Logs centralisés
- [ ] Monitoring d'erreurs

## Dépendances
Mettre à jour régulièrement:
```bash
npm outdated
npm audit
npm audit fix
```

---
**Dernière révision:** Juillet 2026
