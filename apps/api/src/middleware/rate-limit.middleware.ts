import { Injectable, NestMiddleware, TooManyRequestsException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requests: Map<string, number[]> = new Map();
  private readonly WINDOW_MS = 15 * 60 * 1000; // 15 minutes
  private readonly MAX_REQUESTS = 100; // requests per window

  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const key = `${ip}`;

    const now = Date.now();
    const windowStart = now - this.WINDOW_MS;

    // Get existing requests for this IP
    let requests = this.requests.get(key) || [];

    // Filter out requests outside the window
    requests = requests.filter(timestamp => timestamp > windowStart);

    if (requests.length >= this.MAX_REQUESTS) {
      throw new TooManyRequestsException(
        'Too many requests, please try again later.'
      );
    }

    // Add current request
    requests.push(now);
    this.requests.set(key, requests);

    // Cleanup old entries periodically
    if (Math.random() < 0.01) {
      this.cleanup();
    }

    next();
  }

  private cleanup() {
    const now = Date.now();
    const windowStart = now - this.WINDOW_MS;

    for (const [key, requests] of this.requests.entries()) {
      const filtered = requests.filter(timestamp => timestamp > windowStart);
      if (filtered.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, filtered);
      }
    }
  }
}
