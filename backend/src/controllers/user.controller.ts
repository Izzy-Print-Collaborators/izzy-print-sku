import { Request, Response } from 'express';
import { db } from '../db'; // importa a conexão correta
import { usersTable } from '../db/schema';
import {hashPassword} from '../utils/hash';

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await db.select().from(usersTable);
    res.json(users);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { name, password, admin } = req.body;

    const hashedPass = await hashPassword(password);
    const formatedName = name.toLowerCase().replace(/\s/g, "");
    	
    const [user] = await db
      .insert(usersTable)
      .values({ name: formatedName, password: hashedPass, admin })
      .returning();

    res.status(201).json(user);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

