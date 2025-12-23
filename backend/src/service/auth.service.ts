import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não definido');
}

export interface JwtPayload {
  id: string;
  code: number;
  name: string;
  admin?: boolean;
}

export function generateToken(payload: JwtPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1d',
  });
}

