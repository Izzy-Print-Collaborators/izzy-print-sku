import { Request, Response } from 'express';
import { db } from '../db';
import { usersTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { generateToken } from '../service/auth.service';

export async function checkUser(req: Request, res: Response) {
  return res.json({
    id: req.user.sub,
    nome:req.user.name,
    code:req.user.code,
    role: req.user.role,
    isAdmin: req.user.role === 'admin',
  });
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout realizado com sucesso" });
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.name, username));

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(password, user.password);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = generateToken({
      id: user.id,
      code: user.code,
      name: user.name,
      role: user.role,
    });
    console.log(token);

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,      // true em produção (HTTPS)
        sameSite: "lax",
        maxAge: 1000 * 60 * 60,
      })
      .json({
        message: "Login realizado com sucesso",
        code: user.code,
      });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

