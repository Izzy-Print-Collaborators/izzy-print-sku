import { Request, Response, NextFunction } from 'express';

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (!req.user || req.user.admin !== true) {
    return res.status(403).json({ error: 'Acesso restrito a administradores' });
  }

  next();
}

