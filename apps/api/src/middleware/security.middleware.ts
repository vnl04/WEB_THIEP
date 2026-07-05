import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // CORS Headers
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Max-Age', '3600');

    // Security Headers
    res.header('X-Content-Type-Options', 'nosniff'); // Prevent MIME type sniffing
    res.header('X-Frame-Options', 'DENY'); // Prevent clickjacking
    res.header('X-XSS-Protection', '1; mode=block'); // Enable XSS protection
    res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains'); // HTTPS only
    res.header('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'"); // CSP
    res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.header('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  }
}
