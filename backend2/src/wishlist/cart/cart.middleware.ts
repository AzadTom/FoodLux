import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CartMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        status: 401,
        message: 'Authorization token missing',
        data: null,
      });
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      return res.status(401).json({
        status: 401,
        message: 'Invalid authorization format',
        data: null,
      });
    }

    try {
      const payload = this.jwtService.verify(token);
      req['userInfo'] = payload;
      next();
    } catch (error) {
      return res.status(401).json({
        status: 401,
        message: 'Invalid or expired token',
        data: null,
      });
    }
  }
}
