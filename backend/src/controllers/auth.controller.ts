import { Request, Response } from 'express';
import { db } from '../db';
import { usersTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { generateToken } from '../service/auth.service';

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
      admin: user.admin,
    });
    console.log(token);

    return res.json({
      message: 'Login realizado com sucesso',
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

