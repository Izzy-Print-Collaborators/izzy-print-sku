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
    const { name, password, role } = req.body;

    const hashedPass = await hashPassword(password);
    const formatedName = name.toLowerCase().replace(/\s/g, "");

    const [user] = await db
      .insert(usersTable)
      .values({ name: formatedName, password: hashedPass, role })
      .returning();

    res.status(201).json(user);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { name } = req.body;

    const formattedName = name.toLowerCase().replace(/\s/g, '');

    const deletedUser = await db
      .delete(usersTable)
      .where(eq(usersTable.name, formattedName))
      .returning();

    if (deletedUser.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(deletedUser[0]);
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
}

export async function changePassword(req: Request, res: Response) {
  try {
    const { name, newPass } = req.body;

    const formattedName = name.toLowerCase().replace(/\s/g, '');
    const hashedNewPass = await hashPassword(newPass);

    const updatedUser = await db
      .update(usersTable)
      .set({ password: hashedNewPass })
      .where(eq(usersTable.name, formattedName))
      .returning();

    if (updatedUser.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Senha atualizada com sucesso' });
  } catch (err) {
    console.error('Erro ao alterar senha:', err);
    res.status(500).json({ error: 'Erro ao alterar senha' });
  }
}
