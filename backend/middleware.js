import rateLimit from 'express-rate-limit';
import hpp from 'hpp';

// Rate Limiting
export const limiter = rateLimit({
  windowMs: parseInt(process.env.RATELIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 min
  max: parseInt(process.env.RATELIMIT_MAX_REQUESTS) || 100,
  message: 'Trop de requêtes, veuillez réessayer plus tard.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Prevent HTTP Parameter Pollution
export const hppMiddleware = hpp();

// Security Headers
export const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
};

// Error handler
export const errorHandler = (err, req, res, next) => {
  console.error('🔴 Erreur:', {
    message: err.message,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  const status = err.status || 500;
  const message = err.message || 'Erreur serveur interne';

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
